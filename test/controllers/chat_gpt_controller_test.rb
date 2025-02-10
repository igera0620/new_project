require "test_helper"

class ChatGptControllerTest < ActionDispatch::IntegrationTest
  test "should get ask" do
    get chat_gpt_ask_url
    assert_response :success
  end
end
