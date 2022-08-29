import React, { useState, useEffect } from 'react'
import Tombstone from './Tombstone'

function Graveyard() {
    const [deadHeroes, setDeadHeroes] = useState([])

    useEffect(()=>{fetch('http://localhost:9393/heros/dead')
    .then(r=>r.json())
    .then(setDeadHeroes)}
    ,[])

    function forgetHero(id){
      fetch(`http://localhost:9393/heros/${id}`,{
        method: 'DELETE'
      })
      .then(r=>r.json())
      .then(setDeadHeroes)
    }

  return (
    <div>
        <h1>Welcome to the graveyard, where we look back on heroes passed.</h1>
        <p>Forgetting a hero will erase all memory of them and their quests...</p>
        <div className="imgWrapper">{deadHeroes.map(hero => <Tombstone key={hero.id} hero={hero} forgetHero={forgetHero}/>)}</div>
    </div>
  )
}

export default Graveyard