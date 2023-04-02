import {
  appReducer,
  InitialStateType,
  setIsLoading,
  setIsModal
} from '../../store/reducers/app-reducer';

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    isLoading: true,
    isModal: false
  };
});

test('correct isLoading should be set', () => {
  const endState = appReducer(startState, setIsLoading(false));

  expect(endState.isLoading).toBe(false);
});

test('correct isModal should be set', () => {
  const endState = appReducer(startState, setIsModal(true));

  expect(endState.isModal).toBe(true);
});
