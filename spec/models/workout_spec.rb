require 'rails_helper'

RSpec.describe Workout do
  describe '関連付け' do
    it { is_expected.to belong_to(:user) }
  end
end
