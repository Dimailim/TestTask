import {useState} from "react";

const useHandleChange = (setAttribute, initialState = '') => {
    let attribute;
    [attribute, setAttribute] = useState(initialState);
    return [attribute, (event) => {
        setAttribute(event.target.value);
    }]
}
export default useHandleChange;