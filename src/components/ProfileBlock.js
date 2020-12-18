import { ProfileDiv , MainImage , Button , ProfileSubTitle } from './Styles';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { Link } from 'react-router-dom';

function ProfileBlock({ user , firebase })
{
    return user ? <ProfileDiv>
        
        <MainImage url={user.photoURL} />
        <ProfileSubTitle>hello, {user.providerData[0].displayName}</ProfileSubTitle>
        <div><Link to='/create'><Button>create post</Button></Link> <Link to='/profile'><Button>view profile</Button></Link></div>
        <SignOut firebase={firebase} />
        
        </ProfileDiv>
        : 
        <ProfileDiv>
        <ProfileSubTitle>↓ Sign in using Github ↓</ProfileSubTitle>    
        <SignIn firebase={firebase} />
        </ProfileDiv>
}

export default ProfileBlock;