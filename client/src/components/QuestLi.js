import React from 'react'

function QuestLi({quest, hero, acceptQuest}) {
  return (
    <li>{quest.description}
    <p>The enemy has {quest.enemy.strength} strength and {quest.enemy.cunning} cunning. The Reward is {quest.gold_reward} gold, should {hero.name} succeed.</p>
    <button onClick={()=>acceptQuest(quest)}>Accept</button>
    </li>

  )
}

export default QuestLi