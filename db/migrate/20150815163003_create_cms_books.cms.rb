# This migration comes from cms (originally 20150813050539)
class CreateCmsBooks < ActiveRecord::Migration
  def change
    create_table :cms_books do |t|
      t.string :label, null:false, default:'unknown'
      t.string :name, null: false
      t.string :url, null:false
      t.string :title, null: false
      t.string :author, null:false
      t.string :publisher
      t.date :published_at
      t.string :coverage
      t.string :subject
      t.string :description
      t.string :version
      t.integer :flag, null:false, default:0
      t.integer :visits, null:false, default:0
      t.timestamps null: false
    end
    add_index :cms_books, :label
    add_index :cms_books, :version
    add_index :cms_books, :title
    add_index :cms_books, :author
    add_index :cms_books, :name, unique: true
  end
end
