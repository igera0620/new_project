class FixNilCompletedInWorkouts < ActiveRecord::Migration[7.0]
  def up
    Workout.where(completed: nil).update_all(completed: false)  # ✅ `nil` → `false` に更新
  end

  def down
    # `down` では元に戻す処理は不要
  end
end
