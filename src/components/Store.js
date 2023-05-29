/* import { legacy_createStore as createStore } from "redux"; */
const { legacy_createStore } = require("redux");
const initialState = {
  termname: "",
  partname: "",
  coord: "",
  description: "",
  buttonName: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_ALL":
      return { ...state, termname: "", partname: "" };
    case "SET_TERMNAME":
      return { ...state, termname: action.termname };
    case "SET_PARTNAME":
      return { ...state, partname: action.partname };
    case "SET_COORD":
      return { ...state, coord: action.coord };
    case "SET_BUTTONNAME":
      return { ...state, buttonName: action.buttonName };
    default:
      return state;
  }
}

export function resetAll() {
  return { type: "RESET_ALL" };
}
const Store = legacy_createStore(reducer);
export default Store;
