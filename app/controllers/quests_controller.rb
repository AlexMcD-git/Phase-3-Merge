class QuestsController < ApplicationController

  # GET: /quests
  get "/quests" do
    Quest.all.to_json(include: :enemy)
  end

  # PATCH: /quests/5
  patch "/quests/:id" do
    quest=Quest.find(params[:id])
    quest.update(
      hero_id: params[:hero_id]
    )
    Quest.all.to_json(include: :enemy)
  end


  post "/quests" do
    negative_adjectives=['vile', 'cruel', 'unforgiving', 'scheming', 'belligerent']
    bad_deeds=['robbing travelers','comminting murder', 'hunting livestock', 'general no-do-goodery', 'being evil']
    10.times do
      name_string = Faker::Name.first_name + " the " + Faker::Games::ElderScrolls.creature
      enemy= Enemy.create(name: name_string, strength: rand(params[:difficulty]..params[:difficulty]+10), cunning: rand(params[:difficulty]..params[:difficulty]+10))
      description_string = "You need to stop the " + negative_adjectives.sample + " creature known as " + name_string + " for " + bad_deeds.sample
      quest= Quest.create(description: description_string ,gold_reward: enemy.strength+enemy.cunning, enemy:enemy)
    end
    Quest.all.to_json(include: :enemy)
  end
  
end