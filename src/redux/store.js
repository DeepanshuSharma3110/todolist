import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from "./reducer/fetchReducer";
import selectUserReducer from './reducer/userReducer';

const rootReducer = combineReducers({
  fetch: fetchReducer,
  user:selectUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
