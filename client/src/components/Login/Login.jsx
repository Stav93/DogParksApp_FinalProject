import React, { useState, useContext, useReducer, useEffect} from "react"
import Input from "../Input/input"
import Button from "../UI/Button/Button"
import classes from "./Login.module.css"
import { useUsersContext } from "../../Context/user-context"

// reducerFunc => (prevState, action) [via dispatchFunc]
// state - האחרון שנמצא שם, לא הראושני, כמו ביוז סטייס
function reducerFunc(prevState, action) {
  switch (action.type) {
    case 'EMAIL_INPUT':
      return {
        ...prevState,
        emailState: { value: action.val, isValid: action.val.includes('@') },
      };
    case 'PASSWORD_INPUT':
      return {
        ...prevState,
        passwordState: { value: action.val, isValid: action.val.trim().length >= 6 },
      };
    case 'EMAIL_BLUR':
      return {
        ...prevState,
        emailState: {value: prevState.emailState.value, isValid: prevState.emailState.value.includes('@')}
      };
    case 'PASSWORD_BLUR':
      return {
        ...prevState,
        passwordState: {value: prevState.passwordState.value, isValid: prevState.passwordState.value.trim().length >= 6}
      };
      default:
        return {
          emailState: { value: "", isValid: false },
          passwordState: {value: "", isValid: false}
        }
  }
}

function Login()  {
  const usersCtx = useUsersContext();
  const [formIsValid, setFormIsValid] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState({});
  //const clickLogInHandler = useNavigate();

  // USE_REDUCER
  // const [state, dispatchFunc] = useReducer(reducerFunc, initialState);
  const [state, dispatchFunc] = useReducer(reducerFunc, {
    emailState: {
      value: '', //state.emailState.value
      isValid: null, //state.emailState.isValid
    },
    passwordState: {
      value: '', //state.passwordState.value
      isValid: null, //state.passwordState.isValid
    },
  })

  const { value: emailValue} = state.emailState;
  const { isValid: emailIsValid} = state.emailState;
  const { value: passwordValue} = state.passwordState;
  const { isValid: passwordIsValid} = state.passwordState;

  useEffect(() => {
    // רוצים לנקות את הטיימר כל פעם שהיוזר סיים להקליד
    const identifier = setTimeout(() => {
      console.log("checking for validity")
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500)
    // מחזירים פונקציה אחת
    // cleanup function
    // תרוץ לפני שיוז אפקט תרוץ פעם הבאה
    // חוץ מבפעם הראשונה
    return () => {
      console.log("cleanup")
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  // FormValidation
  // פונקציות שמשתמשים בהן כדי לשלוח דרך הדיספאצ 
  //  את האובייקט אקשן שבו יש טייפ ומה שנרצה עוד שישפיע על הסטייט החדש
  const emailChangeHandler = (event) => {
    dispatchFunc({type: 'EMAIL_INPUT', val: event.target.value});
  };
  const passwordChangeHandler = (event) => {
    dispatchFunc({type:"PASSWORD_INPUT", val: event.target.value});
  };
  const validateEmailHandler = () => {
    dispatchFunc({type: 'EMAIL_BLUR'});
  };
  const validatePasswordHandler = () => {
    dispatchFunc({type: 'PASSWORD_BLUR'});
  };

  // submit - login
  const submitHandler = async (event) => {
    event.preventDefault();
    usersCtx.onLogin(state.emailState.value, state.passwordState.value);
    // clickLogInHandler("/profile");
  }
  return (
    <>
    <form onSubmit={submitHandler}>
     <Input
      id="email"
      label="Email" 
      type="email" 
      isValid={emailIsValid} 
      value={emailValue}
      onChange={emailChangeHandler}
      onBlur={validateEmailHandler}
      placeholder="Please enter your Email"
      />
      <Input
      id="password"
      label="password" 
      type="password" 
      isValid={passwordIsValid} 
      value={passwordValue}
      onChange={passwordChangeHandler}
      onBlur={validatePasswordHandler}
      placeholder="Please enter your password"
      />
      <div className={classes.actions}>
      <Button type="submit" className={classes.btn} disableBtn={!formIsValid}>
          Login
       </Button>
       {/* <Link to="/sign-up">sign up instead</Link> */}
      </div>
    </form>
  </>
  )
}

export default Login
