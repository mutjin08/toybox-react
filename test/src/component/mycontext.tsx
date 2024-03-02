import { useReducer, createContext, Dispatch } from "react";
import { StateType, LogonAction } from "./type/commonType";

const initialState: StateType = { userid: "", username: "", isLogon: false };

function LogonReducer(state: StateType, action: LogonAction): StateType {
  try {
    switch (action.type) {
      case "LOGON": {
        let newState = { ...state, ...action.value, isLogon: true };
        console.log(newState);
        saveStateToLocalStorage("appState", newState);
        return newState;
      }
      case "LOGOUT": {
        let newState = { ...state, userid: "", username: "", isLogon: false };
        saveStateToLocalStorage("appState", newState);
        return newState;
      }
      case "RESET":
        return initialState;
      default: {
        throw new Error("Unknown action type");
      }
    }
  } catch (error) {
    throw new Error("Error in reducer");
  }
}

export const AppProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(LogonReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<LogonAction>;
}>({ state: initialState, dispatch: () => null });

export const saveStateToLocalStorage = (key: string, state: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

export const getStateFromLocalStorage = (key: string) => {
  try {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : undefined;
  } catch (error) {
    console.error("Error retrieving from local storage:", error);
    return undefined;
  }
};