class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    user_params = params[:user] || {}
    email = user_params[:email]
    password = user_params[:password]
    remember_me = user_params[:remember_me]

    @user = login(email, password, remember_me)

    if @user
      redirect_back_or_to(root_path, notice: 'ログインに成功しました')
    else
      flash.now[:alert] = 'ログインに失敗しました'
      render action: 'new'
    end
  end

  def destroy
    remember_me!
    forget_me!
    logout
    redirect_to(login_path, notice: 'ログアウトしました')
  end
end
