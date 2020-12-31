import { Main , PostDiv , SideText , ProfileDiv , Button } from './Styles';
import { useEffect , useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

function ScoreBoard()
{
    const [scoreBoard , setBoard] = useState();

    const getData = (offset) => {
        axios.get(`http://localhost:3001/users?offset=${offset}`)
        .then((result) => {
            setBoard(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const loadMore = () => {
        axios.get(`http://localhost:3001/users?offset=${scoreBoard.data.length + 10}`)
        .then((result) => {
            setBoard(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        getData(10);
    } , []);

    return <div>{scoreBoard ? <Main>
        <PostDiv>
        <Main>
        {scoreBoard.data.map((user , index) => <ProfileDiv key={index}><SideText>{user.rank} - {user.name}</SideText></ProfileDiv>)}
        </Main>
        </PostDiv>
        {scoreBoard ? <Button onClick={loadMore} style={{display: scoreBoard.length > scoreBoard.data.length ? 'block' : 'none'}}>Load More</Button> : null}
    </Main>
    :
    <Loading />}</div>
}


export default ScoreBoard;