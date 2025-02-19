# Rubyのバージョンを指定した公式イメージをベースに使用
FROM ruby:3.2.2

# 必要なパッケージのインストール
RUN apt-get update -qq \
  && apt-get install -y nodejs postgresql-client npm vim lsof libvips libvips-dev openssh-client \
  && rm -rf /var/lib/apt/lists/* \
  && npm install --global yarn

# tailwindcss と postcss のインストールを追加
RUN yarn add tailwindcss postcss autoprefixer

# SSH ディレクトリを作成（ビルド時にはSSHキーはまだない）
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

# GitHubのホストキーを事前に登録（エラー回避のため `StrictHostKeyChecking=no` を設定）
RUN ssh-keyscan -t rsa,dsa,ecdsa,ed25519 github.com > /root/.ssh/known_hosts 2>/dev/null || true

# SSH 設定ファイルを作成
RUN echo -e "Host github.com\n  IdentityFile /root/.ssh/id_ed25519\n  User git\n  StrictHostKeyChecking=no" > /root/.ssh/config && chmod 600 /root/.ssh/config

# コンテナの作業ディレクトリを指定
RUN mkdir /myapp
WORKDIR /myapp

# ホストのGemfileとGemfile.lockをコンテナにコピー
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# bundle installを実行
RUN bundle install

# カレントディレクトリのファイルをコンテナにコピー
ADD . /myapp

# コンテナ起動時に実行されるスクリプトをコピーして実行可能にする
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# コンテナが外部に公開するポート番号を指定
EXPOSE 3000

# コンテナ起動時に SSHエージェントをセットアップ
CMD eval "$(ssh-agent -s)" && \
    if [ -f /root/.ssh/id_ed25519 ]; then ssh-add /root/.ssh/id_ed25519; fi && \
    rails server -b "0.0.0.0"
