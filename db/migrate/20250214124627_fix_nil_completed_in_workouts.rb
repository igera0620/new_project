class FixNilCompletedInWorkouts < ActiveRecord::Migration[7.0]
  def up
    Workout.where(completed: nil).update_all(completed: false)
  end

  def down
  end
end
