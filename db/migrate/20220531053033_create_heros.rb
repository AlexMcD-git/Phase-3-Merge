class CreateHeros < ActiveRecord::Migration[7.0]
  def change
    create_table :heros do |t|
      t.string :name
      t.integer :gold
      t.integer :strength
      t.integer :intelligence
      t.integer :successful_quests
      t.integer :failed_quests

    end
  end
end
