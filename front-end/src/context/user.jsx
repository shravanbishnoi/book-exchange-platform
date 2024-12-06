import {createContext, useContext, useEffect, useState} from 'react';
import auth from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import showSwalAlert from '../utilities/AlertComponents';
import {BASE_SERVER_URL, AUTH_ENDPOINT, API} from '../Constants';

const UserContext = createContext ();

export function useUser () {
  return useContext (UserContext);
}

export function UserProvider (props) {
  const [user, setUser] = useState (null);
  const [loading, setLoading] = useState (true);

  async function login (email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword (
        auth,
        email,
        password
      );
      setUser (userCredential.user);
      return userCredential;
    } catch (error) {
      showSwalAlert ({icon: 'error', title: error.code, text: error.message});
    }
  }

  async function logout () {
    try {
      await signOut (auth);
      setUser (null);
      showSwalAlert ({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully!',
      });
    } catch (error) {
      showSwalAlert ({icon: 'error', title: error.code, text: error.message});
    }
  }

  async function signup (email, password, name) {
    const baseUrl = BASE_SERVER_URL + AUTH_ENDPOINT + 'signup/';

    try {
      const userCredential = await createUserWithEmailAndPassword (
        auth,
        email,
        password
      );
      const signupData = new FormData ();
      signupData.append ('userid', userCredential.user.uid);
      signupData.append ('email', email);
      signupData.append ('name', name);
      const data = {
        userid: userCredential.user.uid,
        email: email,
        name: name,
      };
      const response = await fetch (`${BASE_SERVER_URL}${API}users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (data),
      });
      // await sendData(baseUrl, signupData);
      return userCredential;
    } catch (error) {
      console.log ('error', error);
      showSwalAlert ({icon: 'error', title: error.code, text: error.message});
    }
  }

  useEffect (() => {
    const unsubscribe = onAuthStateChanged (auth, user => {
      if (user) {
        setUser (user);
        setLoading (false);
        // showSwalAlert({ icon: "success", title: "Welcome!", text: "You are already logged in." });
      } else {
        setUser (null);
        setLoading (false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe ();
  }, []);

  return (
    <UserContext.Provider
      value={{current: user, login, logout, signup, loading}}
    >
      {props.children}
    </UserContext.Provider>
  );
}
