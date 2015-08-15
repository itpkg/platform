# This migration comes from email (originally 20150812185819)
class CreateEmailDomains < ActiveRecord::Migration
  def change
    create_table :email_domains do |t|
      t.string :name, null: false
      t.timestamps null: false
    end
    add_index :email_domains, :name, unique: true
  end
end
