import { Main , PostDiv , SideText , SideTitle , ProfileDiv , Button } from './Styles';
import React , {useState , useEffect , useRef} from 'react';
import axios from 'axios';
import Loading from './Loading';
import Post from './Post';

function ProfilePage({ user })
{
    const [profileInfo , setInfo] = useState();
    const [savedPosts , setSavedPosts] = useState();
    const [myPosts , setMyPosts] = useState();

    const getData = () => {
        user && axios.get(`http://localhost:3001/users/${user.uid}`)
        .then((result) => setInfo(result.data))
        .then(async () => {
            await axios.get(`http://localhost:3001/saved/${user.uid}?offset=5`).then((result) => setSavedPosts(result.data));
            axios.get(`http://localhost:3001/posts?uid=${user.uid}&offset=5&userFilter=${user.uid}`).then((result) => setMyPosts(result.data));
        })
    };

    const loadMyPosts = () => {
        if (myPosts.length > myPosts.data.length)
        {
            axios.get(`http://localhost:3001/posts?uid=${user.uid}&offset=${myPosts.data.length + 3}&userFilter=${user.uid}`)
            .then(result => setMyPosts(result.data))
            .catch(error => console.log(error));
        }
    };

    const loadSavedPosts = () => {
        if (savedPosts.length > savedPosts.data.length)
        {
            axios.get(`http://localhost:3001/saved/${user.uid}?offset=${savedPosts.data.length + 3}`)
            .then(result => setSavedPosts(result.data))
            .catch(error => console.log(error));
        }
    };

    useEffect(getData , []);

    return <>{profileInfo ? 
            <Main>
            <PostDiv>
                <Main>
                <ProfileDiv><SideTitle>{user.providerData[0].displayName}</SideTitle></ProfileDiv>
                <ProfileDiv><SideText>Rank: {profileInfo.rank}</SideText></ProfileDiv>
                <ProfileDiv><SideText>Posts: {profileInfo.postsCount}</SideText></ProfileDiv>
                <ProfileDiv><SideText>Comments: {profileInfo.commentsCount}</SideText></ProfileDiv>
                </Main>
            </PostDiv>
            
            <ProfileDiv><SideTitle>Saved Posts</SideTitle></ProfileDiv>
            {savedPosts ? savedPosts.data.map((post , index) => <Post user={user} key={index} post={post} />) : <Loading />}
            {savedPosts ? <Button onClick={loadSavedPosts} style={{display: savedPosts.length > savedPosts.data.length ? 'block' : 'none'}}>Load More Posts</Button> : null}
            <ProfileDiv><SideTitle>Your Posts</SideTitle></ProfileDiv>
            {myPosts ? myPosts.data.map((post , index) => <Post user={user} key={index} post={post} />) : <Loading />}
            {myPosts ? <Button onClick={loadMyPosts} style={{display: myPosts.length > myPosts.data.length ? 'block' : 'none'}}>Load More Posts</Button> : null}
            </Main>
            :
            <Loading />}</>
            
   
}

export default ProfilePage;