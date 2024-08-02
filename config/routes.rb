Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  get 'home/index'
  root 'home#index'
  
  get 'login' => 'sessions#new', as: :login
  post 'login' => "sessions#create"
  delete 'logout' => 'sessions#destroy', as: :logout
  
  # こちらを修正
  get 'users/sign_up', to: 'users#new', as: 'new_user_registration'
  post 'users', to: 'users#create'
end
