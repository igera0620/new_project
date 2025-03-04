class Contact < ApplicationRecord
  enum :subject, {
    general: 0,
    support: 1,
    feedback: 2,
    other: 3
  }

  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :subject, presence: true
end
