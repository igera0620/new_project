class WorkoutsController < ApplicationController
  before_action :require_login
  
  def index
    @workouts = current_user.workouts.order(created_at: :desc).limit(1)
  
    respond_to do |format|
      format.html { render :index }
      format.json do
        render json: @workouts.map { |workout|
          {
            id: workout.id,
            title: workout.title || "ワークアウト",
            start: workout.start_time&.strftime("%Y-%m-%d") || workout.date&.strftime("%Y-%m-%d"),
            end: workout.end_time&.strftime("%Y-%m-%d") || workout.date&.strftime("%Y-%m-%d"),
            description: workout.description || "詳細なし",
            completed: workout.completed.present? ? workout.completed : false
          }
        }
      end
    end
  end         

  def generate_menu
    chatgpt_service = ChatGptService.new
    body_part = params[:body_part]
    prompt = "ユーザーは#{body_part}を重点的に鍛えたいです。おすすめのトレーニングメニューを提案してください。"
    @custom_menu = chatgpt_service.chat(prompt, current_user)

    @workout = current_user.workouts.find_or_initialize_by(start_time: Time.zone.now.beginning_of_day)

    @workout.assign_attributes(
      title: body_part,
      description: @custom_menu,
      start_time: Date.today,
      end_time: Date.today
    )
    @workout.save!

    redirect_url = show_menu_workouts_path

    respond_to do |format|
      format.html { redirect_to redirect_url, notice: "AI生成メニューが追加されました。" }
      format.json { render json: { message: "AI生成メニューが追加されました", workout: @workout, redirect_url: redirect_url }, status: :ok }
    end
  end

  def show_menu
    @workout = current_user.workouts.order(created_at: :desc).first
    render :show_menu
  end  

  def feedback
    @workout = current_user.workouts.find_by(date: Date.today)
    @workout ||= current_user.workouts.new(date: Date.today)
  end

  def submit_feedback
    @workout = current_user.workouts.find_or_initialize_by(date: Date.today)
    @workout.completed = params[:completed] == 'true'

    if @workout.save
      puts "✅ ワークアウトID: #{@workout.id} の `completed` が #{@workout.completed} に更新されました！"
  
      respond_to do |format|
        format.html do
          if @workout.completed
            redirect_to workout_completed_workouts_path, notice: 'フィードバックが送信されました。'
          else
            redirect_to workout_not_completed_workouts_path, notice: 'フィードバックが送信されました。'
          end
        end
        format.json do
          render json: { message: "フィードバックが送信されました", workout: @workout }, status: :ok
        end
      end
    else
      flash.now[:alert] = "フィードバックの送信に失敗しました。"
      render :feedback
    end
  end

  def workout_completed
    @video_url = "https://www.youtube.com/embed/Wiho_VPbhZU?list=PL6lqpAyR_3TpQGzHLe4i8-ats_yL6ZlqW"
    render :workout_completed
  end

  def workout_not_completed
    @video_url = "https://www.youtube.com/embed/QuqnzCtz3aw"
    render :workout_not_completed
  end

  def destroy
    @workout = current_user.workouts.find_by(id: params[:id])
  
    if @workout
      @workout.destroy
      respond_to do |format|
        format.json { render json: { message: "ワークアウトが削除されました", success: true }, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: { message: "ワークアウトが見つかりません", success: false }, status: :not_found }
      end
    end
  end  
end
