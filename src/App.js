import firebase from 'firebase';
import { useState , useEffect } from 'react';
import { BrowserRouter as Router , Switch , Route , Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { Main , Title , Title4 , AppDiv } from './components/Styles';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
//import { StickyContainer, Sticky } from 'react-sticky';
import ProfileBlock from './components/ProfileBlock';
import ScoreBoard from './components/ScoreBoard';
import SideDiv from './components/SideDiv';
import Loading from './components/Loading';

firebase.initializeApp({
  apiKey: "AIzaSyC4UD-hpzvEKu4pZrBfzXv1v_bX5l7PVik",
  authDomain: "stackover4s.firebaseapp.com",
  projectId: "stackover4s",
  storageBucket: "stackover4s.appspot.com",
  messagingSenderId: "587321707044",
  appId: "1:587321707044:web:180a422b3c517446efe6b1"
});


function App() {

  const [user , loading] = useAuthState(firebase.auth());
  const [scroll , setScroll] = useState(1);
  const [doneUpdating , setUpdating] = useState(false);
  const [siteInfo , setInfo] = useState();

  useEffect(() => {
    !loading && axios.post(`http://localhost:3001/users` , user && {githubID: user.uid, name: user.providerData[0].displayName, email: user.email})
    .then((result) => {
      setInfo(result.data);
      setUpdating(true);
    });
  } , [loading]);

  return (
    <Router>
    <Main onWheel={() => setScroll(document.body.scrollHeight - window.innerHeight - window.pageYOffset)}>
      <Link to="/"><Title><Title4>S</Title4>tack<Title4>O</Title4>ver<Title4>4</Title4>s</Title></Link>
    <AppDiv>

      <ProfileBlock user={user} firebase={firebase}/>
      
      {!loading && doneUpdating ? 
      <Switch>
      <Route path="/" exact render={(props) => <HomePage scroll={scroll} firebase={firebase} user={user} {...props}/>}/>
      <Route path="/post/:id" exact render={(props) => <PostPage firebase={firebase} user={user} key={props.match.params.id} {...props} />}/> 
      <Route path="/profile" exact render={(props) => <ProfilePage firebase={firebase} user={user} {...props}/>} />
      <Route path="/create" exact render={(props) => <CreatePost firebase={firebase} user={user} {...props}/>} />
      <Route path="/score" exact render={(props) => <ScoreBoard {...props}/>} />
      <Route path="/" render={() => <h1>404 not found</h1>}/>
      </Switch>
      :
      <Loading />}
      
      <SideDiv info={siteInfo}/>

    </AppDiv>
    </Main>
    </Router>
  );
}

export default App;