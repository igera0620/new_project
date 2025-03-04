class UsersController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]

  def index
    @users = User.all
  end

  def show
    @user = current_user
  end

  def new
    @user = User.new
  end

  def edit
    @user = current_user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      auto_login(@user)
      redirect_to root_path, notice: 'アカウントが作成されました。'
    else
      flash.now[:alert] = 'アカウントの作成に失敗しました。入力内容を確認してください。'
      render :new
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to @user, notice: 'アカウント情報が更新されました。'
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
  end
end
