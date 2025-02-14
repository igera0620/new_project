class AddTitleAndDescriptionToWorkouts < ActiveRecord::Migration[7.0]
  def change
    add_column :workouts, :title, :string
    add_column :workouts, :description, :text
    add_column :workouts, :start_time, :datetime
    add_column :workouts, :end_time, :datetime
  end
end
