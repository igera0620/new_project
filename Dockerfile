FROM ruby:3.2.2

RUN apt-get update -qq \
  && apt-get install -y nodejs postgresql-client npm vim lsof libvips libvips-dev openssh-client \
  && rm -rf /var/lib/apt/lists/* \
  && npm install --global yarn

RUN yarn add tailwindcss postcss autoprefixer

RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

RUN ssh-keyscan -t rsa,dsa,ecdsa,ed25519 github.com > /root/.ssh/known_hosts 2>/dev/null || true

RUN echo -e "Host github.com\n  IdentityFile /root/.ssh/id_ed25519\n  User git\n  StrictHostKeyChecking=no" > /root/.ssh/config && chmod 600 /root/.ssh/config

RUN mkdir /myapp
WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN bundle install

ADD . /myapp

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh


CMD eval "$(ssh-agent -s)" && \
    if [ -f /root/.ssh/id_ed25519 ]; then ssh-add /root/.ssh/id_ed25519; fi && \
    rails server -b "0.0.0.0"
