class User < ApplicationRecord
  authenticates_with_sorcery!

  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :reset_password_token, presence: true, uniqueness: true, allow_nil: true

  has_many :workouts, dependent: :destroy

  has_one_attached :avatar

  has_many :authentications, :dependent => :destroy
  accepts_nested_attributes_for :authentications
end
