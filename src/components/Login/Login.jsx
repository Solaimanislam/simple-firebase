import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../FireBase/firebase.init';
import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    // console.log(auth);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGithubSingIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }


    return (

        <div>
            {/* user ? logout: signIn */}

            {user ?
                <button onClick={handleGoogleSignOut}>Sign Out</button> :
                <div>
                    <button onClick={handleGoogleSignIn} >Google login</button>
                    <button onClick={handleGithubSingIn} >GitHub Login</button>
                </div>
            }

            {user &&
                <div>
                    <h3>User:{user.displayName} </h3>
                    <h4>Email:{user.email} </h4>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;