require 'rails_helper'

RSpec.describe Workout, type: :model do
  describe '関連付け' do
    it { should belong_to(:user) }
  end
end
