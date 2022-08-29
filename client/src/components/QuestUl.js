import React from 'react'
import QuestLi from './QuestLi'

function QuestUl({quests, hero, acceptQuest}) {
  return (
    <ul>
        {quests.filter(quest=>quest.hero_id === null).map(quest => <QuestLi key={quest.id} quest={quest} hero={hero} acceptQuest={acceptQuest}/>)}
    </ul>
  )
}

export default QuestUl