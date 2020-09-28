import React ,{useEffect,useState} from 'react';
import { dbService, authService } from '../fbase';
import { useHistory } from 'react-router-dom';

export default ({userObj,refreshUser}) => {
    const history = useHistory();
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }
    const getMyNweets = async () => {
        const nweets = await dbService
            .collection('nweets')
            .where("creatorId", "==", userObj.uid)
            .orderBy('createdAt')
            .get()
        
        console.log(nweets.docs.map((doc)=>doc.data()));
    }
    useEffect(() => {
        getMyNweets();

    }, [])

    const onChange=(e)=>{
        const {target:{value}}=e;
        setNewDisplayName(value);
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        if(userObj.displayName!==newDisplayName){
            //console.log(userObj.updateProfile)
            await userObj.updateProfile({
                displayName:newDisplayName,
            })
        }
        refreshUser();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder='display name' value={newDisplayName} onChange={onChange}/>
                <input type='submit' value='update profile'/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}