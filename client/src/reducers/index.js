import { combineReducers } from "redux";
import auth from "./auth";
import pokemon from './pokemon';
import logs from './logs';

export default combineReducers({
  auth,
  pokemon,
  logs
});