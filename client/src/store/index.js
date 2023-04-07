import {createStore, combineReducers} from "redux"
import CartReducer from "./reducers/CartReducer"
import { devToolsEnhancer } from 'redux-devtools-extension';
const root = combineReducers({
    CartReducer
});
const store = createStore(root, devToolsEnhancer());
export default store;