import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { createContext, useReducer } from 'react';
import NickNameView from './components/NickNameView';
import ChatView from './components/ChatView';
type AllMessage = { user: string; value: string }[];

type State = {
  userName: string;
  message: string;
  allMessage: AllMessage;
};

type Action = {
  type: string;
  payload: string;
  user?: string;
  message?: string;
};

type AppStateContext = {
  state: State;
  dispatch: (action: Action) => void;
};

export const AppState = createContext({} as AppStateContext);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUserName': {
      return { ...state, userName: action.payload! };
    }
    case 'setMessege': {
      return { ...state, message: action.payload! };
    }
    case 'addToAll': {
      const newMessages = [
        ...state.allMessage,
        { user: action.user!, value: action.payload },
      ];
      return { ...state, allMessage: newMessages };
    }
  }
  return { ...state };
};

const initialState: State = {
  userName: '',
  message: '',
  allMessage: [{ user: 'ChatServer', value: 'Welcome in chatroom!' }],
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppState.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          <Route path="/" element={<NickNameView />} />
          <Route path="/chat" element={<ChatView />} />
        </Routes>
      </Router>
    </AppState.Provider>
  );
}
