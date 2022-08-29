import React from 'react'
import { NavLink} from 'react-router-dom'

function NavBar() {
  return (
    <div className = 'navWrapper'>
      <NavLink className="navLinks" exact to = '/'>
      ⚔️Available Heroes⚔️
      </NavLink>
      <NavLink className="navLinks" exact to = '/graveyard'>
      💀Hero Graveyard💀
      </NavLink>
      <NavLink className="navLinks" exact to = '/custom'>
      Custom Hero
      </NavLink>
    </div>
  )
}

export default NavBar