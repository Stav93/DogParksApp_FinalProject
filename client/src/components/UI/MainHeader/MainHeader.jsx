import React from 'react'
import Navigation from '../Navigation/Navigation'
import classes from "./MainHeader.module.css"
import { useUsersContext } from "../../../Context/user-context"

function Header() {
  const { isLoggedIn, onSignUp } = useUsersContext();
  return (
    <header className={classes['main-header']}>
      <h1>Dogs Park App</h1>
      <div>
      {!isLoggedIn && <button onClick={onSignUp}>Sign Up</button>}
      </div>
    </header>
  )
}

export default Header