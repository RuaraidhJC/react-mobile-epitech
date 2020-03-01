import React, { createContext, useReducer, useContext } from 'react';
import { Notifications } from 'expo';
import Network from '../utils/Network';

/* Action Types */
const SET_USER = 'SET_USER';
const SET_NOTIFICATION_TOKEN = 'SET_NOTIFICATION_TOKEN';
const SET_EMAIL = 'SET_EMAIL';
const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';

/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

const initialState = {
  user: {
    id: null,
    email: null,
    profileUrl: null,
    notificationToken: null,
    Positions: [],
    OpenFriendReqs: [],
    Friends: [],
  },
  currentPosition: null,
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        user: { ...state.user, email: action.payload },
      };
    case SET_NOTIFICATION_TOKEN:
      return {
        ...state,
        user: { ...state.user, notificationToken: action.payload },
      };
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload },
      };
    case SET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.payload,
      };

    default:
      return state;
  }
};

/* Export a component to provide the context to its children. This is used in our _app.js file */

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    globalStateReducer,
    initialState,
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
      payload: notificationToken,
    });
  };

  const setCurrentPosition = (currentPosition) => {
    dispatch({
      type: SET_CURRENT_POSITION,
      payload: currentPosition,
    });
  };

  const setEmail = (email) => {
    dispatch({
      type: SET_EMAIL,
      payload: email,
    });
  };

  const setUser = ({
    id, email, profileUrl, Positions, OpenFriendReqs, Friends, notificationToken,
  }) => {
    dispatch({
      type: SET_USER,
      payload: {
        id,
        email,
        profileUrl,
        notificationToken,
        Positions,
        OpenFriendReqs,
        Friends,
      },
    });
  };

  return {
    setCurrentPosition,
    setUser,
    setEmail,
    setNotificationToken,
    user: { ...state.user },
    currentPosition: state.currentPosition,
  };
};

export default useGlobalState;
