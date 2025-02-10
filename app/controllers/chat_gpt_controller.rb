class ChatGptController < ApplicationController
  before_action :require_login # ユーザーがログインしていることを保証

  def ask
    prompt = params[:prompt]

    service = ChatGptService.new
    response = service.chat(prompt, current_user)

    render json: { message: response }
  end
end
