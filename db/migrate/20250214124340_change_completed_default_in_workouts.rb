class ChangeCompletedDefaultInWorkouts < ActiveRecord::Migration[7.0]
  def change
    change_column_default :workouts, :completed, false
  end
end
