# This migration comes from cms (originally 20150813030631)
class CreateCmsTags < ActiveRecord::Migration
  def change
    create_table :cms_tags do |t|
      t.string :name, null: false
      t.integer :visits, null:false, default:0
      t.timestamps null: false
    end
    add_index :cms_tags, :name, unique: true

    create_table :cms_articles_tags, id: false do |t|
      t.belongs_to :tag, index: true
      t.belongs_to :article, index: true
    end
  end
end
