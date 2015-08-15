# This migration comes from cms (originally 20150813035750)
class CreateCmsVideoItems < ActiveRecord::Migration
  def change
    create_table :cms_video_items do |t|
      t.string :vid, null: false
      t.integer :playlist_id, null: false
      t.string :title, null: false
      t.text :description
      t.string :thumbnail_default
      t.string :thumbnail_high
      t.string :thumbnail_medium
      t.datetime :published_at, null: false
      t.integer :visits, null:false, default:0
      t.timestamps null: false
    end
    add_index :cms_video_items, [:vid, :playlist_id], unique: true
    add_index :cms_video_items, :title
  end
end
