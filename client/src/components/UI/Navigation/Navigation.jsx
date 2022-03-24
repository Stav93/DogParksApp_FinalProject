import React, {useContext} from 'react'
import { useUsersContext } from "../../../Context/user-context"
import classes from "./Navigation.module.css"

function Navigation() {
  const { onLogout , isLoggedIn } = useUsersContext()
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">My Profile</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Parks</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation