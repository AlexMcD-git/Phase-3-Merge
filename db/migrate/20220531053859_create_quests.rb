class CreateQuests < ActiveRecord::Migration[7.0]
  def change
    create_table :quests do |t|
      t.integer :gold_reward
      t.integer :hero_id
      t.integer :enemy_id
    end

  end
end
