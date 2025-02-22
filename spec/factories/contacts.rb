FactoryBot.define do
  factory :contact do
    name { "Test Contact" }
    email { "test@example.com" }
    subject { "general" }
  end
end
