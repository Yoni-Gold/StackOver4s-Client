import { Button } from './Styles';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

function SignOut({ firebase }) {
  const [redirect , setRedirect] = useState(false);
  const signOut = () => {
    firebase.auth().signOut().then(() => setRedirect(true));
  };
  return <>{redirect ? <Redirect to="/"/> : <Button onClick={signOut}>Sign Out</Button>}</>
}

export default SignOut;