const SET_IS_LOADING = 'SET-IS-LOADING';
const SET_IS_MODAL = 'SET-IS-MODAL';

const initialState: InitialStateType = {
  isLoading: true,
  isModal: false
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.value };
    case SET_IS_MODAL:
      return { ...state, isModal: action.value };

    default:
      return { ...state };
  }
};

export const setIsLoading = (value: boolean) => ({ type: SET_IS_LOADING, value });
export const setIsModal = (value: boolean) => ({ type: SET_IS_MODAL, value });

export type InitialStateType = {
  isLoading: boolean;
  isModal: boolean;
};
type ActionType = ReturnType<typeof setIsLoading> | ReturnType<typeof setIsModal>;
