class Contact < ApplicationRecord
  enum :subject, {
    general: 0,  # 一般のお問い合わせ
    support: 1,  # サポート
    feedback: 2, # フィードバック
    other: 3     # その他
  }

  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :subject, presence: true
end
