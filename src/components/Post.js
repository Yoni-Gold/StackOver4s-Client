import { PostDiv , SmallInfo , PostTitle , LikeDisplay , LinkSpan , SaveButton} from './Styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Post({ user , post , userSearch , tagSearch})
{
    const [saveState , setSave] = useState(post.didSave);

    const sendLike = (element , type , userID , postID , reciverID) => {
        if (element.style.color === 'red')
        {
            element.style.color = 'darkgray';
            element.style.borderColor = 'darkgray';
        }

        else
        {
            element.style.color = 'red';
            element.style.borderColor = 'red';
        }
        axios.post(`http://localhost:3001/likes` , {type , userID , postID , reciverID})
        .then(() => console.log('sent like'));
    };

    const sendSave = (post) => {
        saveState ? setSave(false) : setSave(true);
        axios.put(`http://localhost:3001/users/${user.uid}` , {post})
        .then(() => console.log('sent post'));
    };

    return <PostDiv>
            <SmallInfo><LikeDisplay  onClick={({ target }) => (user && user.uid !== post.userID) && sendLike(target , 'post' , user.uid , post.id , post.userID)} style={{color: post.didLike ? "red" : "darkgray", borderColor: post.didLike ? "red" : "darkgray"}}>♥</LikeDisplay>{post.likes} post by <LinkSpan onClick={userSearch}>{post.userName}</LinkSpan> at {(new Date(post.date)).toString().slice(4, 24)}</SmallInfo>
            <Link to={`/post/${post.id}`}><PostTitle>{post.title}</PostTitle></Link>
            <SmallInfo>{post.tags.map((tag , index) => {
                if (index === 0)
                {
                    return <LinkSpan onClick={tagSearch} key={index}>{tag}</LinkSpan>
                }

                else
                {
                    return <span key={index}> | <LinkSpan onClick={tagSearch}>{tag}</LinkSpan></span>
                }
            })}</SmallInfo>
            <SaveButton onClick={() => user && sendSave(post.id)} style={{color: saveState && 'lightblue'}}>{saveState ? 'saved' : 'save'}</SaveButton>
            </PostDiv>
}

export default Post;