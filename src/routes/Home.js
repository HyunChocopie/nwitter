import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../fbase'
import Nweet from '../components/Nweet'
import { v4 as uuidv4 } from 'uuid';
import NweetFactory from '../components/NweetFactory';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([])
    
    const getNweets = async () => {
        const dbnweets = await dbService.collection("nweets").get();
        dbnweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,

            }
            setNweets(prev => [nweetObject, ...prev])
        })
    }   //old version 
    useEffect(() => {
        //getNweets();
        dbService.collection('nweets').onSnapshot(snapshot => {
            //console.log(snapshot.docs);
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            console.log(nweetArray)
            setNweets(nweetArray);
        })
    }, [])
    
    return (
        <div>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map((nweet) => (
                    /* <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div> */
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;