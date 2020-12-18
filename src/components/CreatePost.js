import { Main , PostDiv , SideText , SideTitle , ProfileDiv , Button , Tag , TextArea , TextInput , SmallButton} from './Styles';
import React , {useState , useRef} from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Redirect } from 'react-router-dom';
import Tags from './Tags';

function CreatePost({ user })
{
    const [submiting , setSubmiting] = useState('none');
    const [tags , setTags] = useState([]);

    const title = useRef();
    const content = useRef();
    const customTag = useRef();

    const submitPost = () => {
        if (!RegExp('^(\\s)*$').test(title.current.value) && !RegExp('^(\\s)*$').test(content.current.value))
        {  
            setSubmiting('pending');
            axios.post(`http://localhost:3001/posts` , {userID: user.uid , title: title.current.value.trim() , content: content.current.value.trim() , date: Date.now() , tags})
            .then(() => setSubmiting('done'));
        }
    };

    const addTag = (tag) => {
        if (!tags.includes(tag) && !RegExp('^(\\s)*$').test(tag) && tags.length < 5)
        {
            let newTags = [tag].concat(tags);
            setTags(newTags);
        }
    };

    return <Main>
        <PostDiv>
            <Main>
        <ProfileDiv><SideTitle>Create Post</SideTitle></ProfileDiv>
        <ProfileDiv><SideText>Post Title</SideText><TextInput ref={title} maxLength={40}/></ProfileDiv>
        <ProfileDiv><SideText>Content</SideText><TextArea ref={content} maxLength={400}/></ProfileDiv>
        <ProfileDiv>
            <SideText>Tags: <select onChange={({ target: { value } }) => addTag(value)}>
            <option value=''>Select tags</option>
            {Tags.sort().map((tag , index) => <option key={index} value={tag}>{tag}</option>)}
            </select></SideText> 
            <SideText>Custom Tags:</SideText> 
            <TextInput ref={customTag} maxLength={16}/>
            <SmallButton onClick={() => {addTag(customTag.current.value.toLowerCase().trim()); customTag.current.value = "";}}>enter tag</SmallButton>
        </ProfileDiv>
        <div>{tags[0] ? <ProfileDiv>{tags.map((tag , index) => <Tag key={index} onClick={() => {
            let newArray = tags.filter(e => e !== tag);
            setTags(newArray);
        }}>tag: {tag}</Tag>)}</ProfileDiv> : null}</div>
        </Main></PostDiv>
        {submiting === 'none' ? <Button onClick={submitPost}>Submit Post</Button> : submiting === 'pending' ? <Loading /> : <Redirect to='/' />}
        </Main>
}

export default CreatePost;