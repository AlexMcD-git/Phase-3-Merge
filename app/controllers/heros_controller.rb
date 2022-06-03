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

  delete "/heros/:id" do
    hero = Hero.find(params[:id])
    hero.items.destroy_all
    hero.quests.destroy_all
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
    redirect "/heros"
  end

  # PATCH: /heros/5
  patch "/heros/:id" do
    redirect "/heros/:id"
  end

  # DELETE: /heros/5/delete
  delete "/heros/:id/delete" do
    redirect "/heros"
  end
end
