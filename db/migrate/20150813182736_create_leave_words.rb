class CreateLeaveWords < ActiveRecord::Migration
  def change
    create_table :leave_words do |t|
      t.string :message, null:false, limit:1000
      t.datetime :created_at, null:false
    end
  end
end
