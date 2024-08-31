Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy', as: :logout
  get 'home/index'
  root 'home#index'
  
  get 'login' => 'sessions#new', as: :login
  post 'login' => "sessions#create"
  
  get 'users/sign_up', to: 'users#new', as: 'new_user_registration'
  post 'users', to: 'users#create'

  get 'workouts', to: 'workouts#index' # メニュー選択ページ
  post 'submit_menu', to: 'workouts#submit_menu' # メニュー選択後の処理

  get 'new_menu', to: 'workouts#new_menu'
  post 'create_menu', to: 'workouts#create_menu'

  match 'generate_menu', to: 'workouts#generate_menu', via: [:get, :post]

  resources :workouts do
    collection do
      get 'workout_completed'      # ワークアウト完了時のページ
      get 'workout_not_completed'  # ワークアウト未完了時のページ
      get 'feedback'               # フィードバックページのルート
      post 'submit_feedback'       # フィードバックの送信処理
    end
  end  
end
