class WorkoutsController < ApplicationController
  def index
    # 必要ならここに処理を追加
  end

  def generate_menu
    chatgpt_service = ChatGptService.new
    body_part = params[:body_part]
    prompt = "ユーザーは#{body_part}を重点的に鍛えたいです。おすすめのトレーニングメニューを提案してください。"
    @custom_menu = chatgpt_service.chat(prompt)

    render :show_menu
  end

  def feedback
    @workout = current_user.workouts.find_by(date: Date.today)
    @workout ||= current_user.workouts.new(date: Date.today) # 見つからなかった場合、新しいオブジェクトを作成
  end

  def submit_feedback
    @workout = current_user.workouts.find_or_initialize_by(date: Date.today)
    @workout.completed = params[:completed] == 'true'  # パラメータを真偽値に変換

    if @workout.save
      if @workout.completed
        redirect_to workout_completed_workouts_path, notice: 'フィードバックが送信されました。'
      else
        redirect_to workout_not_completed_workouts_path, notice: 'フィードバックが送信されました。'
      end
    else
      flash.now[:alert] = "フィードバックの送信に失敗しました。"
      render :feedback
    end
  end  

  def workout_completed
    @video_url = "https://www.youtube.com/embed/Wiho_VPbhZU?list=PL6lqpAyR_3TpQGzHLe4i8-ats_yL6ZlqW
"
    render :workout_completed
  end

  def workout_not_completed
    @video_url = "https://www.youtube.com/embed/QuqnzCtz3aw"
    render :workout_not_completed
  end  
end
