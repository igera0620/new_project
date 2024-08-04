class ApplicationController < ActionController::Base
  before_action :require_login

  private

  def require_login
    unless logged_in?
      flash[:alert] = "ログインしてください。"
      redirect_to login_path
    end
  end

  def not_authenticated
    flash[:warning] = "ログインが必要です"
    redirect_to login_path
  end
end