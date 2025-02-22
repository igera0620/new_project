require 'rails_helper'

RSpec.describe Contact, type: :model do
  describe 'バリデーション' do
    it '名前が必須であること' do
      contact = Contact.new(name: nil, email: "test@example.com", subject: "general")
      expect(contact).not_to be_valid
    end

    it 'メールが必須であること' do
      contact = Contact.new(name: "テスト", email: nil, subject: "general")
      expect(contact).not_to be_valid
    end

    it 'メールのフォーマットが正しいこと' do
      contact = Contact.new(name: "テスト", email: "invalid_email", subject: "general")
      expect(contact).not_to be_valid
    end

    it '件名が必須であること' do
      contact = Contact.new(name: "テスト", email: "test@example.com", subject: nil)
      expect(contact).not_to be_valid
    end
  end

  describe '列挙型の値' do
    it 'subject に適切な値が設定されること' do
      contact = Contact.new(name: "テスト", email: "test@example.com", subject: "general")
      expect(contact.general?).to be true
    end
  end
end
