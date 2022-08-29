import React from 'react'

function HeroCard({hero, setActiveHero}) {
  return (

    <div className="heroCard" onClick={()=>setActiveHero(hero.id)}>
        <h2>{hero.name}</h2>
        <p>Strength: {hero.strength}, Intelligence: {hero.intelligence}</p>
        <p>Items owned: {hero.items.length}</p>
    </div>
  )
}

export default HeroCard