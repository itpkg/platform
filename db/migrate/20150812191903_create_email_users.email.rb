# This migration comes from email (originally 20150812185759)
class CreateEmailUsers < ActiveRecord::Migration
  def change
    create_table :email_users do |t|
      t.integer :domain_id, null: false
      t.string :email, null: false
      t.string :password, null: false
      t.timestamps null: false
    end
    add_index :email_users, :email, unique: true
  end
end
