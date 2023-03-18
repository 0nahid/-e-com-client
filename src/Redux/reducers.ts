import { combineReducers } from "redux";
import { SET_SELECTED_CATEGORY_ID } from "./actionTypes";

interface CategoryState {
  selectedCategoryId: string | null;
}

const initialState: CategoryState = {
  selectedCategoryId: null,
};

const categoryReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY_ID:
      return {
        ...state,
        selectedCategoryId: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  category: categoryReducer,
  
});

export { categoryReducer, rootReducer };
