class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]

  def create
    @user = login(params[:email], params[:password], params[:remember_me])

    if @user
      redirect_back_or_to(root_path, notice: 'ログインに成功しました')
    else
      flash.now[:alert] = 'ログインに失敗しました'
      render action: 'new'
    end
  end

  def new
    @user = User.new
  end

  def destroy
    remember_me!
    forget_me!
    logout
    redirect_to(login_path, notice: 'ログアウトしました')
  end
end
