class ChatGptController < ApplicationController
  before_action :require_login

  def ask
    prompt = params[:prompt]

    service = ChatGptService.new
    response = service.chat(prompt, current_user)

    render json: { message: response }
  end

  def remaining_requests
    remaining = ChatGptService.remaining_requests(current_user)
    render json: { remaining: remaining }
  end
end
