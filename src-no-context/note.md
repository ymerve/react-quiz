### useReducer => compext state management.

useState ile benzer islemi yapar.
const [state, dispatch] = useReducer(reducer, { age: 42 });

function reducer(state, action) {
// ...
}

-   dispatch : state yeni bir degere guncelemeyi ve yeniden render saglar. (function)
