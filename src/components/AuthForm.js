import React,{useState} from 'react';
import {authService} from '../fbase';
const AuthFrom = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error,setError]=useState('');

    const onChange = (e) => {
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    
    const toggleAccount=()=>{
        setNewAccount((prev)=>!prev)
    }
    const onSubmit = async (e) => {
        e.preventDefault(); //이거 안하면 새로고침됨
        try {
            let data;

            if (newAccount) {
                //create new account
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                )
            } else {
                //log in 
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                )
            }
            console.log(data)
        } catch (error) {
            console.log(error.message)
            setError(error.message);
        }
    }
    

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <input name='email' type='text' placeholder='Email' required value={email} onChange={onChange} />
                <input name='password' type='password' placeholder='Password' required value={password} onChange={onChange} />
                <input type='submit' value={newAccount ? 'create account' : 'log in '} />
            </form>
            {error}
            <span onClick={toggleAccount}>{newAccount ? 'sign in' : 'create account'}</span>
        </React.Fragment>
    )
}
export default AuthFrom;