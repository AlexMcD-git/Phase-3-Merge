import React from 'react'

function Tombstone({hero, forgetHero}) {
  return (
    <div className="heroCard">
        <h1>Here Lies {hero.name}</h1>
        <h2>Who died after {hero.successful_quests+hero.failed_quests} quests.</h2>
        <button onClick={()=>forgetHero(hero.id)}>Forget {hero.name}</button>

    </div>
  )
}

export default Tombstone