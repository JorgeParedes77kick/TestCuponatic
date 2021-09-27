import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import localforage from "localforage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import reducer from "./reducer";
const persistConfig = {
  key: "root",
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const makeStore = () => {
  const store=createStore(
    persistedReducer,
    compose(
      applyMiddleware(
        thunk
        // ,logger
      ),
      typeof window === "object" &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );
  store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
};
// export const persistor = persistStore(makeStore);
export const wrapper = createWrapper(makeStore);
// export default { store, persistor };
// const makeStore = ({ isServer }) => {
//   if (isServer) {
//     //If it's on server side, create a store
//     return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
//   } else {
//     //If it's on client side, create a store which will persist
//     const { persistStore, persistReducer } = require("redux-persist");
//     const storage = require("redux-persist/lib/storage").default;

//     const persistConfig = {
//       key: "nextjs",
//       whitelist: ["counter"], // only counter will be persisted, add other reducers if needed
//       storage, // if needed, use a safer storage
//     };

//     const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

//     const store = createStore(
//       persistedReducer,
//       bindMiddleware([thunkMiddleware])
//     ); // Creating the store again

//     store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

//     return store;
//   }
// };

// Export the wrapper & wrap the pages/_app.js with this wrapper only
// export const wrapper = createWrapper(makeStore);
