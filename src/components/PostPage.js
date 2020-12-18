import { Main , DivText , PostDiv , SmallInfo , PostTitle , LikeDisplay , SaveButton , InputComment , PostComment , Button } from './Styles';
import React , {useState , useEffect , useRef} from 'react';
import axios from 'axios';
import Loading from './Loading';

function PostPage({ user , match })
{
    const [post , setPost] = useState();
    const [comments , setComments] = useState();
    const [saveState , setSave] = useState(false);

    const commentText = useRef();

    const getData = () => {
        axios.get(`http://localhost:3001/posts/${match.params.id}?uid=${user ? user.uid : ""}`)
        .then(result => {
            setPost(result.data);
            setSave(result.data.didSave);
            axios.get(`http://localhost:3001/comments/${match.params.id}?offset=5&uid=${user ? user.uid : ""}`)
            .then(result => setComments(result.data))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    };

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

    const postComment = () => {
        axios.post(`http://localhost:3001/comments` , {userID: user.uid , date: Date.now() , content: commentText.current.value , postID: post.id})
        .then(() => {
            let newComments = {...comments};
            newComments.data.unshift({userID: user.uid , date: Date.now() , content: commentText.current.value , postID: post.id , likes: 0 , userName: user.providerData[0].displayName});
            newComments.length++;
            commentText.current.value = "";
            setComments(newComments);
        });
    };

    const sendSave = (post) => {
        saveState ? setSave(false) : setSave(true);
        axios.put(`http://localhost:3001/users/${user.uid}` , {post})
        .then(() => console.log('sent post'));
    };

    const loadComments = () => {
        if (comments.length > comments.data.length)
        {
            axios.get(`http://localhost:3001/comments/${match.params.id}?offset=${comments.data.length + 5}&uid=${user ? user.uid : ""}`)
            .then(result => setComments(result.data))
            .catch(error => console.log(error));
        }
    };

    useEffect(getData, []);

    return <div>
        {post ? <Main>
        <PostDiv>
        <SmallInfo><LikeDisplay onClick={({ target }) => (user && user.uid !== post.userID) && sendLike(target , 'post' , user.uid , post.id , post.userID)} style={{color: post.didLike ? "red" : "darkgray", borderColor: post.didLike ? "red" : "darkgray"}}>♥</LikeDisplay>{post.likes} post by {post.userName} at {(new Date(post.date)).toString().slice(4, 24)}</SmallInfo>
        <PostTitle>{post.title}</PostTitle>
        <DivText>{post.content}</DivText>
        <SmallInfo>{post.tags.map((tag , index) => {
                if (index === 0)
                {
                    return <span className="label" key={index}>{tag}</span>
                }

                else
                {
                    return <span className="label"  key={index}> | {tag}</span>
                }
            })}</SmallInfo>
            <SaveButton onClick={() => user && sendSave(post.id)} style={{color: saveState && 'lightblue'}}>{saveState ? 'saved' : 'save'}</SaveButton>
        </PostDiv>
        {user ? <InputComment ref={commentText} placeholder={'Leave a Comment'}></InputComment> : null}
        {user ? <PostComment onClick={postComment}>Submit</PostComment> : null}
        <div>{comments ? comments.data.map((comment , index) => <PostDiv key={index}>
            <SmallInfo><LikeDisplay onClick={({ target }) => (user && user.uid !== comment.userID) && sendLike(target , 'comment' , user.uid , comment.id , comment.userID)} style={{color: comment.didLike ? "red" : "darkgray" , borderColor: comment.didLike ? "red" : "darkgray"}}>♥</LikeDisplay>{comment.likes} comment by {comment.userName} at {(new Date(comment.date)).toString().slice(4, 24)}</SmallInfo>
            <DivText onClick={()=>console.log(comment)}>{comment.content}</DivText>
            </PostDiv>)
            :
            <Loading />
            }</div>
        {comments ? <Button onClick={loadComments} style={{display: comments.length > comments.data.length ? 'block' : 'none'}}>Load More Comments</Button> : null}
        </Main>
        :
        <Loading />
        }
        </div>
        
}

export default PostPage;