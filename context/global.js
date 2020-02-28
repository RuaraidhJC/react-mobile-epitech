import React, { createContext, useReducer, useContext } from 'react';

/* Action Types */
const SET_USER = 'SET_USER';
const SET_NOTIFICATION_TOKEN = 'SET_NOTIFICATION_TOKEN';
const SET_EMAIL = 'SET_EMAIL';

/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

const initialState = {
    user: {
        id: null,
        email: null,
        profileUrl: null,
        notificationToken: null,
        Positions: [],
        FriendReqs: [],
        Friends: [],
    },
};

const globalStateReducer = (state, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state,
                user: {...state.user, email: action.payload}
            };
        case SET_NOTIFICATION_TOKEN:
            return {
                ...state,
                user: {...state.user, notificationToken: action.payload}
            };
        case SET_USER:
            return {
                ...state,
                user: { ...action.payload },
            };

        default:
            return state;
    }
};

/* Export a component to provide the context to its children. This is used in our _app.js file */

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        globalStateReducer,
        initialState
    );

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    );
};

/*
Default export is a hook that provides a simple API for updating the global state.
This also allows us to keep all of this state logic in this one file
*/

const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalStateContext);

    const setNotificationToken = (notificationToken) => {
        dispatch({
            type: SET_NOTIFICATION_TOKEN,
            payload: notificationToken
        })
    };

    const setEmail = (email) => {
        dispatch({
            type: SET_EMAIL,
            payload: email
        })
    };

    const setUser = ({id, email, profileUrl, Positions, FriendReqs, Friends, notificationToken}) => {
        dispatch({
            type: SET_USER,
            payload: {
                id,
                email,
                profileUrl,
                notificationToken,
                Positions,
                FriendReqs,
                Friends
            }
        });
    };

    return {
        setUser,
        setEmail,
        setNotificationToken,
        user: { ...state.user },
    };
};

export default useGlobalState;