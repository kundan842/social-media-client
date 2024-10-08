import React from 'react';
import './UpdateProfile.scss';
import userImg from '../../assets/user.png'
import './UpdateProfile.scss'
import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, updateMyProfile } from "../../redux/slices/appConfigSlice";
function UpdateProfile() {

    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [userImg, setUserImg] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setUserImg(myProfile?.avatar?.url || '')
    }, [myProfile]);

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if(fileReader.readyState === fileReader.DONE) {
                setUserImg(fileReader.result)
                // console.log('img data', fileReader.result);
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('inside handle submit , userImg', userImg )
        dispatch(updateMyProfile({
            name,
            bio,
            userImg
        }));
    }

    return (
        <div>
        <div className="UpdateProfile">
            <div className="container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label htmlFor="inputImg" className="labelImg">
                            <img src={userImg} alt={name} />
                        </label>
                        <input
                            className="inputImg"
                            id="inputImg"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="right-part">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={name}
                            type="text"
                            placeholder="Your Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            value={bio}
                            type="text"
                            placeholder="Your Bio"
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <input type="submit" className="btn-primary" onClick={handleSubmit}/>
                    </form>

                <button className="delete-account btn-primary">Delete Account</button>
                    <button className="delete-account btn-primary">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
    ;
}

  


export default UpdateProfile