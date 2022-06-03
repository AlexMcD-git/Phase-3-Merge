
puts "🌱 Seeding spices..."
Enemy.destroy_all
Hero.destroy_all
Item.destroy_all
Quest.destroy_all

negative_adjectives=['vile', 'cruel', 'unforgiving', 'scheming', 'belligerent']
bad_deeds=['robbing travelers','comminting murder', 'hunting livestock', 'general no-do-goodery', 'being evil']
# Seed your database here
5.times do
    hero = Hero.create(name: Faker::Fantasy::Tolkien.character, gold: 0, strength: rand(10..20), intelligence: rand(10..20), successful_quests: 0, failed_quests:0)
    2.times do
        random_float = rand
        if random_float > 0.5
            item = Item.create(name: Faker::Games::ElderScrolls.weapon, str_boost: rand(1..5), int_boost: rand(1..5), hero: hero)
        else
            item = Item.create(name: Faker::Games::ElderScrolls.jewelry, str_boost: rand(1..5), int_boost: rand(1..5), hero: hero)
        end
    end
end

25.times do
    name_string = Faker::Name.first_name + " the " + Faker::Games::ElderScrolls.creature
    enemy= Enemy.create(name: name_string, strength: rand(15..25), cunning: rand(15..25))
    description_string = "You need to stop the " + negative_adjectives.sample + " creature known as " + name_string + " for " + bad_deeds.sample
    quest= Quest.create(description: description_string ,gold_reward: enemy.strength+enemy.cunning, enemy:enemy)
end


dead_hero= Hero.create(name: Faker::Fantasy::Tolkien.character, gold: 0, strength: rand(10..20), intelligence: rand(10..20), successful_quests: 0, failed_quests:3)
3.times do
    item = Item.create(name: Faker::Games::ElderScrolls.jewelry, str_boost: rand(1..5), int_boost: rand(1..5), hero: dead_hero)
end
polio=Enemy.create(name: "Polio", strength: 500, cunning: 200)
cure_polio= Quest.create(description: "Cure Polio" ,gold_reward: polio.strength+polio.cunning, enemy:polio, hero: dead_hero)
hunger=Enemy.create(name:"Hunger", strength: 9001, cunning: 0)
end_world_hunger= Quest.create(description: "End world hunger.", gold_reward: hunger.strength+hunger.cunning, enemy:hunger, hero: dead_hero)
css=Enemy.create(name:"CSS", strength: 50, cunning: 250)
understand_css= Quest.create(description: "Do multiple css tasks correctly on the first try.", gold_reward: css.strength+css.cunning, enemy:css, hero: dead_hero)


puts "✅ Done seeding!"