import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../App';

const NickNameView = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppState);
  const [userName, setUserName] = useState<string>('');

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    dispatch({ type: 'setUserName', payload: userName });
  };

  useEffect(() => {
    if (state.userName !== '') {
      navigate('/chat');
    }
  }, [state.userName]);

  return (
    <form onSubmit={onSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        ></input>
      </label>
    </form>
  );
};

export default NickNameView;
