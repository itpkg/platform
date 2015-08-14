class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.integer :user_id, null:false
      t.string :lang, null:false, default:'en', limit:5
      t.string :message, null:false, limit:1000
      t.timestamps null: false
    end
  end
end
