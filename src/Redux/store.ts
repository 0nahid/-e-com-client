import { createStore } from "redux";
import { categoryReducer } from "./reducers";
// store.ts

const store = createStore(categoryReducer);

export default store;
