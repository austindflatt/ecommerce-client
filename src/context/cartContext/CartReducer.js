const CartReducer = (state, action) => {
	switch (action.type){
	  case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }]
      };
	  case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "EMPTY_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.payload._id),
      }
    default:
      return { ...state }
  }
}
  
export default CartReducer;