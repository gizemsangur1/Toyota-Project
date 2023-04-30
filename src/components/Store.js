import { createStore } from "redux";

const initialState = {
  termname: "",
  partname: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TERMNAME":
      return { ...state, termname: action.termname };
    case "SET_PARTNAME":
      return { ...state, partname: action.partname };
    case "RESET_ALL":
      return { termname: "", partname: "" };
    default:
      return state;
  }
}

export function resetAll() {
  return { type: "RESET_ALL" };
}
const store = createStore(reducer);

export default store;
