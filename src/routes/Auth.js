import React, { useState } from 'react';
import { authService,firebaseInstance } from '../fbase';
import AuthForm from '../components/AuthForm';

const Auth = () => {
    
    const onSocialClick=async(e)=>{
        //console.log(e.target.name)
        const {
            target:{name},
        }=e;
        let provider;
        if(name==='google'){
            provider=new firebaseInstance.auth.GoogleAuthProvider()
        }else if(name==='github'){

            provider=new firebaseInstance.auth.GithubAuthProvider()
        }
        const data=await authService.signInWithPopup(provider);
        console.log(data)
    }

    return (
        <div>
            <AuthForm/>
            <div>
                <button onClick={onSocialClick}  name='google'>continue with google</button>
                <button onClick={onSocialClick}  name='github'>continue with github</button>
            </div>
        </div>
    )
};

export default Auth;