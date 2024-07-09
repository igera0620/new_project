# サービス概要

筋トレに興味を持たせる。筋トレに興味を持って、やりたいとユーザーが思ったら、筋トレのメニューをAIが提案してくれる。筋トレをやらなかったらサイトのほうから動画が流れ、怒られる。メニューを組む際は、ジム、家でやるメニューで分けることができ、初心者メニュー、中級者メニュー、上級者メニューと選ぶことが出来る。

# このサービスへの思い・作りたい理由

「筋肉は全てを解決する」高校の頃に、私が筋トレが好きな友人から飽きるほど聞かされた言葉です。実際自分が悩んでいた問題はこれで解決することが出来ました。筋トレを含む運動は、エンドルフィン、セロトニン、ドーパミン、オキシトシンといった「幸せホルモン」の分泌を促進し、心身の健康や幸福感の向上に寄与します。これにより、ストレスの軽減、気分の向上、睡眠の質の改善、社交性の向上などの多くのメリットが得られます。
自分は筋トレをしていることにより、メリットしか感じなかったので、このサイトを作って、自分の周りに、少しでも筋トレに興味を持ってもらうことが出来たらいいなと思っています。

# ユーザー層について

老若男女問わず、みんなが笑えて筋トレを好きになるサイトを作りたいと思っています。

# サービスの利用イメージ

ユーザーが、筋トレを継続できるように、継続で来ているユーザー、サボってしまったユーザー、それぞれに応じて笑える動画や画像を流して、筋トレを好きになっていけるようなサイトを作りたいです。

# ユーザーの獲得について

SNSマーケティング

Instagram, Twitter, Facebook, TikTokなど: 筋トレやフィットネスに関するコンテンツを定期的に投稿し、フォロワーを増やす。アプリの利用例や成功事例、筋トレのヒントやトリビアをシェア。
ハッシュタグキャンペーン: 特定のハッシュタグを使ってユーザーが自分の筋トレ成果を投稿するキャンペーンを実施。優れた投稿に対してプレゼントや特典を提供することで参加を促進します。

# サービスの差別化ポイント・推しポイント

筋トレのメニューを組んでくれるサイトはたくさんありますが、筋トレを行った、行っていないとユーザーがフィードバックした際に、激励したり叱責したりするサイトは少ないと思っています。ゆくゆくはユーザー同士の交流ができるようにもなっていったりしたらより面白いと思っています。

# 機能候補

## MVP（Minimum Viable Product）までに実装するもの
1. ユーザー登録・ログイン機能
   - Google認証の導入

2. 筋トレメニューの提案機能
   - 筋トレメニューを組んでくれるAIの導入

3. フィードバック機能
   - ユーザーが筋トレを予定通り行った、サボってしまったといったフィードバックをした際の面白い動画や画像を流す

4. メニューのレベル分け機能
   - 初心者、中級者、上級者ごとに分けたメニューを組める機能の導入

5. ユーザーインターフェース
   - ユーザー一覧画面

## 本リリースまでに実装するもの
1. 掲示板機能
   - ユーザー同士の交流が出来る掲示板機能の導入

2. プロフィール管理機能
   - ユーザーが自身のプロフィールを編集・管理できる機能

3. 通知機能
   - 筋トレのリマインダーやフィードバックに基づいた通知機能

4. 進捗管理機能
   - ユーザーが自身の筋トレの進捗を記録・確認できる機能

# 機能の実装方針予定

## 筋トレメニューを組んでくれるAIの導入
- 方針: TensorFlowやPyTorchを使用してAIモデルを構築し、ユーザーのフィードバックや履歴を基に適切な筋トレメニューを提案する。データの管理にはPostgreSQLなどのリレーショナルデータベースを使用。
- API: 独自のレコメンデーションAPIを作成し、ユーザーからのリクエストに応じて筋トレメニューを返す。

## Google認証の導入
- 方針: Deviseとomniauth-google-oauth2を利用してGoogle認証を実装。ユーザーがGoogleアカウントでログインできるようにする。
- API: Google OAuth 2.0 APIを利用し、ユーザー認証を行う。

## Sorceryの導入
- 方針: Sorceryを使用して簡易なユーザー認証機能を実装。パスワードリセットやアカウントのロック機能も含める。
- API: Sorceryの内蔵機能を利用。

## フィードバック時の面白い動画や画像の表示
- 方針: YouTube APIやGiphy APIを利用して、筋トレを行った場合やサボった場合に適切な動画や画像を表示する。
- API: YouTube Data API v3、Giphy APIを使用。

## 初心者、中級者、上級者ごとのメニューの組み立て
- 方針: ユーザーの選択に応じて、事前に定義されたメニューセットを表示。これらのメニューはJSONファイルやデータベースに保存し、必要に応じて読み込む。
- API: 特定の外部APIは必要なく、内部データベースやファイルからデータを取得。

## ユーザー同士の交流が出来る掲示板機能
- 方針: RailsのAction Cableを使用してリアルタイムの掲示板機能を実装。ユーザーは投稿、コメント、いいね機能を使用できるようにする。
- API: 内部的にRailsのWebSocketを使用し、リアルタイム通信を実現。

# 画面遷移図

[画面遷移図](https://www.figma.com/design/iI4guY9hV9iF5Yt4Lwx7ip/%E7%84%A1%E9%A1%8C?node-id=0-1&t=430NFehQVZY1Zuke-1)

# ER図

[ER図](https://app.diagrams.net/#G1XlPruLIQEjmU2XXZtbf92O9syXALfpEb#%7B%22pageId%22%3A%22R2lEEEUBdFMjLlhIrx00%22%7D)