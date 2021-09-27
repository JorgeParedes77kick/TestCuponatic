import * as types from "redux/types";

// shopping:{
// 	titulo:
// 	cantidad:
// 	precio:
// }
const initialState = {
  shopping: [],
  discounts: [],
  amount: 0,
  order: "titulo asc",
  page: 1,
  max: 1,
  failed: false,
  success: false,
  waiting: false,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DATA_INIT: {
      return { ...state, failed: false, success: false, waiting: true };
    }
    case types.DATA_INIT_FAILED: {
      return {
        ...state,
        failed: true,
        success: false,
        waiting: false,
      };
    }
    case types.DATA_INIT_SUCCESS: {
      const { pagination, maxPage: max } = action.payload;
      return {
        ...state,
        discounts: pagination,
        max,
        failed: false,
        success: true,
        waiting: false,
      };
    }
    case types.ADD_AMOUNT: {
      const {
        amount: cantidad,
        discount: { id, titulo, precio, imagen },
      } = action.payload;
      let { shopping } = state;
      const index = shopping.findIndex((x) => x.id == id);
      if (index != -1) {
        let item = shopping[index];
        item.cantidad = item.cantidad + cantidad;
        shopping[index] = item;
      } else {
        shopping = [...shopping, { id, imagen, titulo, precio, cantidad }];
      }
      return {
        ...state,
        amount: state.amount + cantidad,
        shopping,
      };
    }
    case types.UPDATE_AMOUNT: {
      const { amount: cantidad, id } = action.payload;
      let { shopping, amount } = state;
      const index = shopping.findIndex((x) => x.id == id);
      let item = shopping[index];
      if (cantidad == 0) {
        shopping.splice(index, 1);
      } else {
        amount = amount - item.cantidad + cantidad;
        shopping[index].cantidad = cantidad;
      }
      return {
        ...state,
        amount,
        shopping,
      };
    }
    case types.UPDATE_ORDER_PAGE: {
      const { order, page } = action.payload;
      return {
        ...state,
        order,
        page,
      };
    }
    default:
      return { ...state };
  }
};
export default cartReducer;
