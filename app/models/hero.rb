class Hero < ActiveRecord::Base
    has_many :quests
    has_many :enemies, through: :quests
    has_many :items
end