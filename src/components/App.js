import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../fbase';

function App() {
  // eslint-disable-next-line
  const [init, setInit] = useState(false);
  // eslint-disable-next-line
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj]=useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {  //로긘하면 실행됨
      if (user) {
        //setIsLoggedIn(true);


        //setUserObj(user);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args)=>user.updateProfile(args),
        })

      } else{
        setUserObj(null)
      }
      // else {
      //   setIsLoggedIn(false)
      // }
      setInit(true)
    })
  }, [])

  const refreshUser=()=>{
    const user=authService.currentUser;

    //setUserObj(Object.assign({},user));
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(args)=>user.updateProfile(args), 
    });
   
  }

  // console.log(authService.currentUser)
  // setInterval(()=>{
  //   console.log(authService.currentUser)

  // },2000)
  return (
    <div>
      {/* {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : 'Initializing...'} */}
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : 'Initializing...'}
      <footer>&copy;Nwitter</footer>
    </div>
  );
}

export default App;
