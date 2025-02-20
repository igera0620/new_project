class OauthsController < ApplicationController
  include Sorcery::Controller
  skip_before_action :require_login

  def oauth
    login_at(auth_params[:provider])
  rescue => e
  end
  
  def callback
    provider = auth_params[:provider]
    email = auth_params[:email]

    if (@user = login_from(provider))
      redirect_to root_path, notice: "#{provider.titleize}アカウントでログインしました"
    else
      @user = User.find_by(email: email)
      if @user
        @user.update(provider: provider) if @user.provider.nil? 
        reset_session
        auto_login(@user)
        redirect_to root_path, notice: "#{provider.titleize}アカウントでログインしました"
      else
        begin
          signup_and_login(provider)
          redirect_to root_path, notice: "#{provider.titleize}アカウントでログインしました"
        rescue => e
          redirect_to root_path, alert: "#{provider.titleize}アカウントでのログインに失敗しました: #{e.message}"
        end
      end
    end
  end  
  
    private
  
    def auth_params
      params.permit(:code, :provider, :error, :state)
    end
  
    def signup_and_login(provider)
      @user = create_from(provider)
      reset_session
      auto_login(@user)
    end
  end
  