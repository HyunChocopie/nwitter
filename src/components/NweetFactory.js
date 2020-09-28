import React,{useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {dbService,storageService} from '../fbase';

const NweetFactory = ({userObj }) => {
    const [nweet, setNweet] = useState('')
    
    const [attachment, setAttachment] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl='';
        if(attachment!==''){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, 'data_url');
            attachmentUrl = await response.ref.getDownloadURL();
        }
        
        const nweetObj = {
            nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection('nweets').add(nweetObj);
        setNweet('');
        setAttachment('');
        // dbService.collection('nweets').add({
        //     nweet,
        //     createAt: Date.now(),
        //     creatorId:userObj.uid,
        // })
        // setNweet('')

    }
    const onChange = (e) => {
        const { target: { value }, } = e
        setNweet(value);
    }

    const onFileChange = (e) => {
        const { target: { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);

    }
    const onClearAttachmentClick = () => {
        setAttachment(null)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type='text' placeholder="What's on your mind" maxLength={120} />
                <input type='file' accept='image/*' onChange={onFileChange} />
                <input type='submit' value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height='50px' />
                        <button onClick={onClearAttachmentClick}> clear </button>
                    </div>
                )}
            </form>

        </div>
    )

}

export default NweetFactory;