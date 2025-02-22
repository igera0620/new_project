require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    it 'メールが必須であること' do
      user = User.new(email: nil, password: "password", password_confirmation: "password")
      expect(user).not_to be_valid
    end

    it 'メールが一意であること' do
      create(:user, email: "test@example.com")
      duplicate_user = build(:user, email: "test@example.com")
      expect(duplicate_user).not_to be_valid
    end

    it 'パスワードが3文字以上であること' do
      user = User.new(email: "test@example.com", password: "ab", password_confirmation: "ab")
      expect(user).not_to be_valid
    end

    it 'パスワード確認が必須であること' do
      user = User.new(email: "test@example.com", password: "password", password_confirmation: nil)
      expect(user).not_to be_valid
    end
  end

  describe '関連付け' do
    it { should have_many(:workouts).dependent(:destroy) }
    it { should have_many(:authentications).dependent(:destroy) }
    it { should have_one_attached(:avatar) }
  end

  describe '削除時の挙動' do
    it 'ユーザーを削除すると関連するワークアウトも削除される' do
      user = create(:user)
      create(:workout, user: user) # 変数の代入を削除

      expect { user.destroy }.to change { Workout.count }.by(-1)
    end

    it 'ユーザーを削除すると関連する認証情報も削除される' do
      user = create(:user)
      create(:authentication, user: user) # 変数の代入を削除

      expect { user.destroy }.to change { Authentication.count }.by(-1)
    end
  end
end
