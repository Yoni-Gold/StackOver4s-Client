import { Button } from './Styles';
import { Redirect } from "react-router-dom";
import { useState } from 'react';

function SignIn({ firebase }) {
    const [redirect , setRedirect] = useState(false);
    const signInWithGithub = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(() => setRedirect(true));
    }
  return <>{redirect ? <Redirect to="/"/> : <Button onClick={signInWithGithub}>Sign In</Button>}</>
}

export default SignIn;