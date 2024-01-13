import { useReducer, createContext, useContext } from "react";
import { IAppState, initialState } from "./initialState";

export const StateContext = createContext<[
  state: IAppState,
  dispatch: React.Dispatch<any>,
]>([ initialState, () => null ]);

const StateProvider = ({ reducer, initialState, children, ...props }: { reducer: (state: IAppState, action: any) => IAppState, initialState: IAppState, props?: any, children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StateContext.Provider
    value={ [ state, dispatch ] }
    { ...props }
  >{ children }</StateContext.Provider>
}

export const useStateValue = () => useContext(StateContext);

export default StateProvider;
