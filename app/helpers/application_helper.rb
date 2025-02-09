module ApplicationHelper
  def flash_class(level)
    case level.to_sym
    when :notice then "bg-blue-100 border-blue-500 text-blue-700"
    when :success then "bg-green-100 border-green-500 text-green-700"
    when :error then "bg-red-100 border-red-500 text-red-700"
    when :alert then "bg-yellow-100 border-yellow-500 text-yellow-700"
    else "bg-gray-100 border-gray-500 text-gray-700"
    end
  end

  def default_meta_tags
    {
      site: 'Pluspo',
      title: '筋肉は全てを解決する',
      reverse: true,
      charset: 'utf-8',
      description: 'Pluspoは、AIが最適な筋トレメニューを提案し、トレーニングを楽しく継続できるサービスです。',
      keywords: '筋トレ, フィットネス, トレーニング, ワークアウト',
      canonical: request.original_url,
      separator: '|',
      og: {
        site_name: :site,
        title: :title,
        description: :description,
        type: 'website',
        url: request.original_url,
        image: image_url('ogp.png'), # OGP画像のパス（適宜変更）
        locale: 'ja-JP'
      },
      # Twitter用の設定
      twitter: {
        card: 'summary_large_image', # 大きめの画像を表示するカード形式
        site: '@your_twitter_account', # 公式Twitterアカウント（必要に応じて変更）
        image: image_url('ogp.png') # OGP画像のパス（適宜変更）
      }
    }
  end
end
