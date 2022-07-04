import { useContext } from 'react';
import { AppState } from '../App';

const MessageBox = ({
  user,
  message,
  index,
}: {
  user: String;
  message: String;
  index: Number;
}) => {
  const { state } = useContext(AppState);
  return (
    <li id={`messageContainer${index}`}>
      <span>{user}: </span>
      <label>{index === 0 ? `${message} ${state.userName}` : message}</label>
    </li>
  );
};
export default MessageBox;
