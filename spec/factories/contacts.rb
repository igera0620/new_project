FactoryBot.define do
  factory :contact do
    name { "MyString" }
    email { "MyString" }
    phone_number { "MyString" }
    subject { 1 }
    message { "MyText" }
  end
end
