
import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import {  useState, useEffect } from 'react'

function App() {

  const [profile, setProfile] = useState(null)

  const clientId = '852960420457-q63miepd2930j3m8c09ek4pnmk2k99vn.apps.googleusercontent.com'

  useEffect(() => {
    const initclient = () => {
      gapi.client.init({
        clientId : clientId,
        scope : ""
      })
    }
    gapi.load('client:auth2', initclient)
  }, [])

  const  onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log('Success', res)
  }

  const  onFailure = (res) => {
    console.log('Failed')
  }

  const logOut = () => {
    setProfile(null)
  }

  return (
    <div className='App'>
      <h2>React Google Login</h2>
        <br></br>
        {profile ? (
          <div>
             <img  src={profile.imageUrl} alt="user Image"/>
             <h3>User Logged in</h3>
             <p>Name : {profile.name}</p>
             <p>Email : {profile.email}</p>
             <br />
             <br />
             <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut}/>
          </div>
        ) : (
          <GoogleLogin 
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
        )}
    </div>
      

  );
}

export default App;
