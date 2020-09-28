import React, { useState } from 'react';
import { dbService,storageService } from '../fbase';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.nweet);

    const onDeleteClick = async () => {
        const ok = window.confirm('are you sure you want to delete this nweet?');
        if (ok) {
            console.log(ok)
            console.log()
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (e) => {
        const {
            target: { value },
        } = e
        setNewNweet(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            nweet: newNweet
        })
        setEditing(false)
    }
    return (
        <div>
            {
                editing
                    ?
                    <div>
                        {isOwner &&
                            <div>
                                <form onSubmit={onSubmit}>
                                    <input onChange={onChange} type='text' placeholder='edit your nweet' value={newNweet} required />
                                    <input type='submit' value='update nweet' />

                                </form>
                                <button onClick={toggleEditing}>Cancel</button>
                            </div>
                        }
                    </div>
                    : <div>
                        <h4>{nweetObj.nweet}</h4>
                        {nweetObj.attachmentUrl&&<img src={nweetObj.attachmentUrl} width='50px' height='50px'/>}
                        {isOwner &&
                            <div>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </div>
                        }
                    </div>
            }



        </div>
    )
}

function mapDispatchToProps(dispatch,ownProps){
    
}

export default Nweet;