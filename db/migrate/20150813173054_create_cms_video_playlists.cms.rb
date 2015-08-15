# This migration comes from cms (originally 20150813035746)
class CreateCmsVideoPlaylists < ActiveRecord::Migration
  def change
    create_table :cms_video_playlists do |t|
      t.string :pid, null: false
      t.integer :channel_id, null: false
      t.string :title, null: false
      t.text :description
      t.string :thumbnail_default
      t.string :thumbnail_high
      t.string :thumbnail_medium
      t.datetime :published_at, null: false
      t.integer :visits, null:false, default:0
      t.timestamps null: false
    end
    add_index :cms_video_playlists, [:pid, :channel_id], unique: true
    add_index :cms_video_playlists, :title
  end
end
