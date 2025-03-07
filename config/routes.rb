Rails.application.routes.draw do
  get 'chat_gpt/ask'

  get 'password_resets/create'
  get 'password_resets/edit'
  get 'password_resets/update'
  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback" 
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy', as: :logout
  get 'home/index'
  root 'home#index'
  
  get 'login' => 'sessions#new', as: :login
  post 'login' => "sessions#create"
  
  get 'users/sign_up', to: 'users#new', as: 'new_user_registration'
  post 'users', to: 'users#create'

  get 'workouts', to: 'workouts#index'
  post 'submit_menu', to: 'workouts#submit_menu'

  get 'new_menu', to: 'workouts#new_menu'
  post 'create_menu', to: 'workouts#create_menu'

  match 'generate_menu', to: 'workouts#generate_menu', via: [:get, :post]

  resources :workouts do
    collection do
      get 'workout_completed'
      get 'workout_not_completed'
      get 'feedback'
      post 'submit_feedback'
      get 'show_menu'
    end
  end

  resources :users, only: [:new, :create, :index, :show, :edit, :update, :destroy]

  resources :password_resets, only: [:new, :create, :edit, :update]

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  post '/chatgpt/ask', to: 'chat_gpt#ask'
  get '/chatgpt/remaining_requests', to: 'chat_gpt#remaining_requests'
  
  get 'calendars', to: 'calendars#index', as: 'calendars'

  get '/terms', to: 'static_pages#terms', as: 'terms'
  get '/privacy', to: 'static_pages#privacy', as: 'privacy'

  resources :contacts, only: [:new, :create]
  post 'contacts/confirm', to: 'contacts#confirm', as: 'confirm'
  get 'contacts/confirm', to: 'contacts#confirm'
  
  post 'contacts/back', to: 'contacts#back', as: 'back'
  get 'done', to: 'contacts#done', as: 'done'
end
