import * as ReactRouterDom from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppState } from '../App';
import NickNameView from './NickNameView';

jest.mock('react-router-dom');

describe('Given the NickNameView', () => {
  describe('When it is rendered', () => {
    let dispatchSpy: jest.MockedFunction<any>;
    let navigateSpy: jest.MockedFunction<any>;

    beforeEach(() => {
      navigateSpy = jest.fn();
      dispatchSpy = jest.fn();

      jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(navigateSpy);

      render(
        <AppState.Provider
          value={{
            state: { userName: '', message: '', allMessage: [] },
            dispatch: dispatchSpy,
          }}
        >
          <NickNameView />
        </AppState.Provider>
      );
    });

    it('should render', () => {
      expect(NickNameView).toBeTruthy();
    });

    describe('And the user submits the input', () => {
      beforeEach(() => {
        fireEvent.submit(screen.getByLabelText('Username:'));
      });

      it('should NOT fire a navigate', () => {
        expect(navigateSpy).not.toBeCalled();
      });
    });

    describe('When user types a username', () => {
      let userInput: HTMLInputElement;

      beforeEach(() => {
        userInput = screen.getByLabelText('Username:');
        fireEvent.change(userInput, { target: { value: 'my-username' } });
      });

      it('should show the username', () => {
        expect(userInput.value).toBe('my-username');
      });

      describe('And the user submits the input', () => {
        beforeEach(() => {
          fireEvent.submit(userInput);
        });

        it('should fire a dispatch', () => {
          expect(dispatchSpy).toBeCalledWith({
            type: 'setUserName',
            payload: 'my-username',
          });
        });

        it('should navigate', () => {
          expect(navigateSpy).toBeCalledWith('/chat');
        });
      });
    });
  });
});
