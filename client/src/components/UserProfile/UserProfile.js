import React from 'react'
import { useUsersContext } from "../../Context/user-context"

function UserProfile() {
  const usersCtx = useUsersContext();

  return (
     <>
      <h1>{usersCtx.user.name}</h1>
      {console.log(usersCtx.user.name)}
    </>
  )
}

export default UserProfile