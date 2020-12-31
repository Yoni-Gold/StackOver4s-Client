import React , {useState , useEffect } from 'react';
import axios from 'axios';
import { HomePageDiv , SearchInput , Tag , BackToTop , SortButton} from './Styles';
import Post from './Post';
import { debounce } from 'lodash';
import Loading from './Loading';

function HomePage({ user , scroll })
{
    const [postList , setList] = useState(); // the list of the posts
    const [offset , setOffset] = useState(10); // state of how many posts are displayed
    const [search , setSearch] = useState(""); // the search query
    const [userFilter , setUserFilter] = useState({userID: "" , userName: ""}); // filter by user
    const [tags , setTags] = useState([]); // filter by tags
    const [sort , setSort] = useState(""); // sort by likes or date
    const [backToTopDisplay , setbackToTopDisplay] = useState("none"); // scroll to top button

    const getData = () => {
        axios.get(`http://localhost:3001/posts?offset=${offset}&search=${search}&userFilter=${userFilter.userID}&sort=${sort}&tags=${tags.join('$')}&uid=${user ? user.uid : ""}`)
        .then(result => setList(result.data))
        .catch(error => console.log(error));
    };

    useEffect(() => {
       if (scroll <= 400 && postList)
       {
        postList.length > postList.data.length && setOffset(offset + 5);
       }
       window.pageYOffset > 800 ? setbackToTopDisplay("block") : setbackToTopDisplay("none");
    } , [scroll]);

    useEffect(getData , [offset , search , tags , userFilter , sort , user]);

    return <HomePageDiv>
        <SearchInput placeholder={'search'} onChange={debounce(({target: { value }}) => setSearch(value) , 500)}></SearchInput>
        <div>
        <SortButton style={{borderColor: sort === "likes" ? "black" : "darkgray" , color: sort === "likes" ? "black" : "darkgray"}} onClick={() => setSort("likes")}>sort by likes</SortButton>
        <SortButton style={{borderColor: sort === "" ? "black" : "darkgray" , color: sort === "" ? "black" : "darkgray"}} onClick={() => setSort("")}>sort by date</SortButton>
        </div>
        <div>{userFilter.userID !== "" ? <Tag onClick={() => setUserFilter({userID: "" , userName: ""})}>user: {userFilter.userName}</Tag> : null}
        {tags[0] ? tags.map((tag , index) => <Tag key={index} onClick={() => {
            let newArray = tags.filter(e => e !== tag);
            setTags(newArray);
        }}>tag: {tag}</Tag>) : null}</div>
        {postList ? postList.data.map((post , index) => <Post user={user} userSearch={() => setUserFilter({userID: post.userID , userName: post.userName})} tagSearch={({target: { textContent }}) => {
            if (tags.length <= 3 && !tags.includes(textContent))
            {
                let newTags = [textContent].concat(tags);
                setTags(newTags);
            }
        }} key={index} post={post}/>) : <Loading />}
        <BackToTop onClick={() => {document.documentElement.scrollTop = 0; setbackToTopDisplay('none');}} style={{display: backToTopDisplay}}>Back To Top</BackToTop>
    </HomePageDiv>
}

export default HomePage;