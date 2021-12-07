import { createContext, useContext } from 'react';

import { User } from './components/Register/Register';

export type LoginContextType = {
    loggedIn: boolean;
    loggedInUser: User;
    userBeingRegistered: UserRegistration;
    setLoggedIn:(loggedIn: boolean) => void;
    setLoggedInUser:(loggedInUser: User) => void;
    setUserBeingRegistered:(userBeingRegistered:UserRegistration)=>void;
}

export type UserRegistration = {
    username: String;
    password: String;
}

export const defaultUser = {
    firstName: "Default",
    lastName: "Default",
    username: "Default",
    password: "Default",
    image: 'Default'
}

export const defaultUserRegistration = {
    username: "",
    password: ""
}

export const LoginContext = createContext<LoginContextType>({ loggedIn:false, loggedInUser:defaultUser, userBeingRegistered:defaultUserRegistration, setLoggedIn: loggedIn => console.warn('no loggedIn provided'), setLoggedInUser: loggedInUser => console.warn('no loggedInUser provided'), setUserBeingRegistered: userBeingRegistered => console.warn('no userBeingRegistered provided') });
export const useLogin = () => useContext(LoginContext);