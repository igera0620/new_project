class OauthsController < ApplicationController
  include Sorcery::Controller
  skip_before_action :require_login

  def oauth
    Rails.logger.info "🔹 login_at 実行前"
    login_at(auth_params[:provider])
    Rails.logger.info "🔹 login_at 実行後"
  rescue => e
    Rails.logger.error "❌ login_at でエラー: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
  end
  
  def callback
    provider = auth_params[:provider]
    # 既存のユーザーをプロバイダ情報を元に検索し、存在すればログイン
    if (@user = login_from(provider))
      redirect_to root_path, notice:"#{provider.titleize}アカウントでログインしました"
    else
      begin
        # ユーザーが存在しない場合はプロバイダ情報を元に新規ユーザーを作成し、ログイン
        signup_and_login(provider)
        redirect_to root_path, notice:"#{provider.titleize}アカウントでログインしました"
      rescue
        redirect_to root_path, alert:"#{provider.titleize}アカウントでのログインに失敗しました"
      end
    end
  end
  
    private
  
    def auth_params
      params.permit(:code, :provider)
    end
  
    def signup_and_login(provider)
      @user = create_from(provider)
      reset_session
      auto_login(@user)
    end
  end
  