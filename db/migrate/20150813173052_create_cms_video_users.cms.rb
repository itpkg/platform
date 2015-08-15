# This migration comes from cms (originally 20150813034738)
class CreateCmsVideoUsers < ActiveRecord::Migration
  def change
    create_table :cms_video_users do |t|
      t.string :name, null: false
      t.integer :flag, null: false, default: 0
      t.timestamps null: false
    end
    add_index :cms_video_users, [:name, :flag], unique: true
  end
end
