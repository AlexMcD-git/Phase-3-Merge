class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :str_boost
      t.integer :int_boost
      t.integer :hero_id

    end
  end
end
