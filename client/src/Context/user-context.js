import React, { useState, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"


const UsersContext = React.createContext({});

const UsersContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const loginHandler = async (email, password) => {
    // לשלוח את השם והסיסמא לסרבר ולבדוק אם יש יוזר עם הסיסמא והמייל
    // אם כן הוא מחזיר אותו
    try {
      const respone = await fetch("/api/users/",  
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        }
      );

      const userData = await respone.json();  
      if (userData !== undefined) {
        localStorage.setItem("isLoggedIn","1");
        setIsLoggedIn(true);
        setUser(userData);
      }
     } catch (error) {
        console.log("Error: " + error)
       } 
   } 

    // const signUpHandler = (name, city, email, password) => {
    //   localStorage.setItem("isLoggedIn","1")
    //   setIsLoggedIn(true);
    // };

    const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      // clickLogOutHandler("/")
    }

    const value = useMemo(() => ({
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
      // onSignUp: signUpHandler,
      user: user,
    }), [user, isLoggedIn, logoutHandler, loginHandler]);

    return (
      <UsersContext.Provider value={value}>
        {children}
      </UsersContext.Provider>
    );
  }

  function useUsersContext() {
    return useContext(UsersContext);
  }

  export {
    UsersContextProvider,
    useUsersContext,
  };




// ...........................................................................................

// אם היוזר עשה לוג אין או סיין אפ אז להפוך לטרו
// useEffect(() => {
//   const storedUserLoggedInInformaition = localStorage.getItem('isLoggedIn')

//   if (storedUserLoggedInInformaition === "1") {
//     setIsLoggedIn(true);
//   }
// },[])