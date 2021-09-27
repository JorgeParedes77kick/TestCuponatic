import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import discountReducer from "./discountReducer";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  discountReducer: discountReducer,
});
const reducer = (state, action) => {
  if (action.type === 'persist/REHYDRATE') {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}


export default persistReducer(persistConfig, reducer);
