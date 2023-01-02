import React, {useEffect, useState} from 'react';
import "./login.scss";
import { handleLogin, handleLogout, isLoggedIn } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = ({processing, setProcessing, success, setSuccess}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()
    setProcessing(true)

    if(!username && !password) {
      setProcessing(false)
      setError("Incorrect username or password, please try again.")
    } else {
      handleLogin(username, password).then((res) => {
        if(res !== undefined && res) {
          localStorage.setItem('username', JSON.stringify(username));
          setProcessing(false);
          setSuccess("You are now logged in");
          alert("success");
          navigate('/');
        } else {
          setProcessing(false)
          setError("User name and password doesn't exist")
          alert("error");
        }
      })
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          {/* {error && <div className="form-error"><p>{error}</p></div>}
          {success && <p>{success}</p>} */}
          {success ? 'success' : 'not success'}<br/>
          {processing ? 'processing' : 'not processing'}
          {success ?
            <button
              onClick={handleLogout}
              className="btn btn-primary brand-btn"
              type="submit">
              Logout
            </button>
          :
            <>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  className="form-control mt-1"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={event =>
                    setUsername(event.target.value)
                  }
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  className="form-control mt-1"
                  name="password"
                  type="password"
                  id="passwordSignin"
                  value={password}
                  placeholder="Password"
                  onChange={event =>
                    setPassword(event.target.value)
                  }
                />
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-primary brand-btn"
                type="submit">
                Login
              </button>
            </>
          }

          {/* <p className="forgot-password text-right mt-2">
            Forgot <a className='link'>password?</a>
          </p> */}
        </div>
      </form>
    </div>
    // <div className="login-page-wrapper">
    //     <h3 className="title-28 text-center Auth-form-title">Login Form</h3>
    //     {error && <div className="form-error"><p>{error}</p></div>}
    //     {success && <p>{success}</p>}
    //     {/* {success && isLoggedIn() !== null ? 'Logout' : 'Login'} */}
    //     <form noValidate className="login" id="logIn">
    //       <div className='Auth-form-content'>
    //         <fieldset>
    //           {success ? ''
    //           :
    //           <div>
    //             <div className="form-element">
    //               <label>Username</label>
    //               <input
    //                 className="form-input"
    //                 name="username"
    //                 type="text"
    //                 placeholder="Username"
    //                 value={username}
    //                 onChange={event =>
    //                   setUsername(event.target.value)
    //                 }
    //               />
    //             </div>
    //             <div className="form-element">
    //               <label>Password</label>
    //               <input
    //                 className="form-input"
    //                 name="password"
    //                 type="password"
    //                 id="passwordSignin"
    //                 value={password}
    //                 placeholder="Password"
    //                 onChange={event =>
    //                   setPassword(event.target.value)
    //                 }
    //               />
    //             </div>
    //           </div>
    //         }

    //           {
    //             processing ?
    //               <div className="text-center">Loading...</div>
    //               :
    //               success && isLoggedIn() !== null ?
    //                 <button
    //                   onClick={handleLogout}
    //                   className="button-black w-full"
    //                   type="submit">
    //                   Logout
    //                 </button>
    //                 :
    //                 <button
    //                   onClick={handleSubmit}
    //                   className="button-black w-full"
    //                   type="submit">
    //                   Login
    //                 </button>
    //           }
    //         </fieldset>
    //       </div>
    //     </form>
    // </div>
  )
}

export default Login;