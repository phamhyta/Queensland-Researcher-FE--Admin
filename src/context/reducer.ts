import { IAppState } from "./initialState";

export const actionType = {
  // Usage example
  // SET_DATA_GOOGLE_EARTH_ENGINE: 'SET_DATA_GOOGLE_EARTH_ENGINE',
  SET_SNACKBAR: "SET_SNACKBAR",
  SET_DIALOG: "SET_DIALOG",
};

const reducer = (state: IAppState, action: any): IAppState => {
  switch (action.type) {
    // Usage example:
    // case actionType.SET_DATA_GOOGLE_EARTH_ENGINE:
    //   return {
    //     ...state,
    //     dataGoogleEarthEngine: action.dataGoogleEarthEngine,
    //   };
    case actionType.SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case actionType.SET_DIALOG:
      return {
        ...state,
        dialog: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
