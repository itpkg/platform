# This migration comes from cms (originally 20150813030627)
class CreateCmsArticles < ActiveRecord::Migration
  def change
    create_table :cms_articles do |t|
      t.string :title, null: false
      t.string :summary, null: false
      t.text :body, null: false
      t.integer :visits, null:false, default:0
      t.timestamps null: false
    end
    add_index :cms_articles, :title
  end
end
