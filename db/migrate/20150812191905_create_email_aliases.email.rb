# This migration comes from email (originally 20150812185834)
class CreateEmailAliases < ActiveRecord::Migration
  def change
    create_table :email_aliases do |t|
      t.integer :domain_id, null: false
      t.string :source, null: false
      t.string :destination, null: false
      t.timestamps null: false
    end
    add_index :email_aliases, :source
    add_index :email_aliases, :destination
  end
end
