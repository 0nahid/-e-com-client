// actions.ts

import { SET_SELECTED_CATEGORY_ID } from "./actionTypes";

export const setSelectedCategoryId = (categoryId: string | null) => {
  return {
    type: SET_SELECTED_CATEGORY_ID,
    payload: categoryId,
  };
};
