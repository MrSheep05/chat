import React, { useContext, useState, useEffect } from 'react';
import { AppState } from '../App';
import MessageBox from './MessageBox';
const ws = new WebSocket('ws://localhost:4000');

const ChatView = () => {
  const { state, dispatch } = useContext(AppState);
  const [message, setMessege] = useState<string>();

  //saving message to reducer

  const sendMessege = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({ type: 'setMessege', payload: message! });
    //event.target.querySelector('input').value = '';
  };

  //Sending messages to web socket

  useEffect(() => {
    if (state.message !== '') {
      const json = JSON.stringify({
        username: state.userName,
        message: state.message,
      });
      ws.send(json);
    }
  }, [state.message]);

  //Generate message boxes from array of messages

  const renderBox = () => {
    return state.allMessage.map(({ user, value }, index) => (
      <MessageBox
        key={`messageContainer${index}`}
        user={user}
        message={value}
        index={index}
      ></MessageBox>
    ));
  };

  //WebSocket here
  ws.onopen = () => {
    console.log('Web socket is activated!');
  };

  //Gathering messages from WebSocket and save them to reducer
  ws.onmessage = (JSONmessage) => {
    console.log(JSONmessage);
    const data = JSON.parse(JSONmessage.data).utf8Data;
    const { username, message } = JSON.parse(data);
    dispatch({ type: 'addToAll', user: username, payload: message });
  };

  return (
    <div>
      <div>{renderBox()}</div>
      <form onSubmit={sendMessege}>
        Chat View
        <label>
          {' '}
          Chat with users:{' '}
          <input
            onChange={({ target }) => {
              setMessege(target.value);
            }}
          ></input>
        </label>
      </form>
    </div>
  );
};

export default ChatView;
