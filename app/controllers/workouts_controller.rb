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
    @workout.completed = params[:completed]

    if @workout.save
      redirect_to show_video_workouts_path, notice: 'フィードバックが送信されました。'
    else
      flash.now[:alert] = "フィードバックの送信に失敗しました。"
      render :feedback
    end
  end

  def show_video
    @workout = current_user.workouts.find_by(date: Date.today)

    if @workout&.completed
      @video_url = "path_to_funny_video_for_workout_completed.mp4"
    else
      @video_url = "https://www.youtube.com/embed/QuqnzCtz3aw"
    end
  end
end
