class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.integer :user_id, null:false
      t.string :message, null:false
      t.integer :flag, null:false, default:0
      t.datetime :created_at, null: false
    end
  end
end
