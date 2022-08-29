import React, { useState, useEffect } from 'react'
import QuestUl from './QuestUl'

function DetailedHero({hero, setActiveHero, setHeroes}) {

  if (hero.failed_quests>=3){
    setActiveHero(null)
  }

    const [quests, setQuests] = useState([])
    useEffect(()=>{fetch('http://localhost:9393/quests')
    .then(r=>r.json())
    .then(setQuests)}
    ,[])

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let reducedStrength = hero.items.reduce((a,item)=>a+item.str_boost, hero.strength)
    let reducedIntelligence = hero.items.reduce((a,item)=>a+item.int_boost, hero.intelligence)

    function acceptQuest(quest){
      let heroRoll = getRandomInt(reducedStrength)
      let enemyRoll = getRandomInt(quest.enemy.strength) + getRandomInt(quest.enemy.strength) 
      const strengthDifference = reducedStrength-quest.enemy.strength
      const intelligenceDifference = reducedIntelligence-quest.enemy.cunning
      //Bigger difference in intelligence means the hero is smart enough to get more attacks in
      if (intelligenceDifference>10){
        heroRoll += getRandomInt(reducedStrength)
      }
      if (intelligenceDifference>0){
        heroRoll += getRandomInt(reducedStrength)
      }

      fetch(`http://localhost:9393/quests/${quest.id}`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "hero_id": hero.id
        })
      })
      .then(r=>r.json())
      .then(setQuests)

      alert(enemyRoll>heroRoll?"Hero defeated":"Hero victorious")
      fetch(`http://localhost:9393/heros/${hero.id}`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "successful_quests": enemyRoll>heroRoll?hero.successful_quests:hero.successful_quests+1,
          "failed_quests": enemyRoll>heroRoll?hero.failed_quests+1:hero.failed_quests,
          "gold": enemyRoll>heroRoll?hero.gold:hero.gold+quest.gold_reward
        })
      })
      .then(r=>r.json())
      .then(setHeroes)
    }

    function newQuests(event){
      let difficulty = event.target.name==="hard"?25:15
      fetch(`http://localhost:9393/quests`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "difficulty": difficulty
        })
      })
      .then(r=>r.json())
      .then(setQuests)

    }

    function buyItem(){
      if (hero.gold < 100){
        alert("Not enough gold.")
      }
      else{
        fetch(`http://localhost:9393/heros/${hero.id}/buy`,{
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "gold": hero.gold-100
          })
        })
        .then(r=>r.json())
        .then(setHeroes)
      }
      
    }

  return (
    <div>
        <button onClick={()=>setActiveHero(null)}>Return to hero list</button>
        <h1>{hero.name}, the {hero.successful_quests>3?"veteran":"novice"} adventurer</h1>
        <h2>Has stats: Strength:{hero.strength}, Intelligence:{hero.intelligence}</h2>
        <ul>Item Inventory:
            {hero.items.map(item=><li>{item.name} (Str:{item.str_boost}, Int:{item.int_boost})</li>)}
        </ul>
        <h2>Bringing their total stats to Strength:{reducedStrength}, Intelligence:{reducedIntelligence}</h2>
        <h3>{hero.name} has {hero.gold} gold.</h3>
        <h3>Purchase a random item for 100g.</h3>
        <button onClick={()=>buyItem()}>Purchase</button>
        
        <h3>Generate more quests</h3><br/>
        <button name="normal" onClick={(e)=>newQuests(e)}>10 Normal Quests</button>
        <button name="hard" onClick={(e)=>newQuests(e)}>10 Hard Quests</button>
        <QuestUl quests={quests} hero={hero} acceptQuest={acceptQuest}/>

    </div>
  )
}

export default DetailedHero