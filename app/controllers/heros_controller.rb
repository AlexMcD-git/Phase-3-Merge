class HerosController < ApplicationController

  # GET: /heros
  get "/heros" do
    Hero.all.to_json(include: :items)
  end

  # GET: /heros/alive
  get "/heros/alive" do
    Hero.where("failed_quests < '3'").to_json(include: :items)
  end

  # GET: /heros/dead
  get "/heros/dead" do
    Hero.where("failed_quests >= '3'").to_json(include: :items)
  end

  # GET: /heros/5
  get "/heros/:id" do
    Hero.find(params[:id]).to_json(include: :items)
  end

  # DELETE: /heros/5
  delete "/heros/:id" do
    hero = Hero.find(params[:id])
    hero.items.destroy_all
    hero.quests.each {|q| q.enemy.destroy}
    hero.quests.destroy_all
    hero.enemies.destroy_all
    hero.destroy
    Hero.where("failed_quests >= '3'").to_json(include: :items)
  end

  # PATCH: /heros/5
  patch "/heros/:id" do
    hero= Hero.find(params[:id])
    hero.update(
      successful_quests: params[:successful_quests],
      failed_quests: params[:failed_quests],
      gold: params[:gold]
    )
    Hero.all.to_json(include: :items)
  end

  patch "/heros/:id/buy" do
    hero= Hero.find(params[:id])
    random_float = rand
    if random_float > 0.5
        item = Item.create(name: Faker::Games::ElderScrolls.weapon, str_boost: rand(1..5), int_boost: rand(1..5), hero: hero)
    else
        item = Item.create(name: Faker::Games::ElderScrolls.jewelry, str_boost: rand(1..5), int_boost: rand(1..5), hero: hero)
    end
    hero.update(
      gold: params[:gold]
    )
    Hero.all.to_json(include: :items)
  end

  # GET: /heros/5/items
  get "/heros/:id/items" do
    Hero.find(params[:id]).items.to_json
  end

  # GET: /heros/5/quests
  get "/heros/:id/items" do
    Hero.find(params[:id]).quests.to_json
  end
  
    # POST: /heros
    post "/heros" do
      puts params
      name = params[:name]
      if name == ""
        name=Faker::Fantasy::Tolkien.character
      end
      hero = Hero.create(
        name: name,
        strength: params[:strength],
        intelligence: params[:intelligence],
        gold: rand(25...100),
        successful_quests: 0,
        failed_quests: 0
      )
    end

end
