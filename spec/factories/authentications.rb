FactoryBot.define do
  factory :authentication do
    provider { "google" }
    uid { "12345" }
    user
  end
end
