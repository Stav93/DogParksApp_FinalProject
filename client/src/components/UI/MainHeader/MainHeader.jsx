import React from 'react'
import Navigation from '../Navigation/Navigation'
import classes from "./MainHeader.module.css"

function Header() {
  return (
    <header className={classes['main-header']}>
      <h1>Dogs Park App</h1>
      <Navigation />
    </header>
  )
}

export default Header