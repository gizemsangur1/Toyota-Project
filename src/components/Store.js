import { legacy_createStore as createStore } from "redux";
const initialState = {
  termname: "",
  partname: "",
  coord: "",
  shift:"",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TERMNAME":
      return { ...state, termname: action.termname };
    case "SET_PARTNAME":
      return { ...state, partname: action.partname };
    case "SET_COORD":
      return { ...state, coord: action.coord };
      case "SET_SHIFT":
      return { ...state, shift: action.shift };
    case "RESET_ALL":
      return { termname: "", partname: ""};
    default:
      return state;
  }
}

export function resetAll() {
  return { type: "RESET_ALL" };
}
const store = createStore(reducer);
export default store;
