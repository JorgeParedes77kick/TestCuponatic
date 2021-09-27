import * as api from "api/index";
import * as types from "redux/types";
const dataInitial = () => {
  return { type: types.DATA_INIT };
};
const dataInitialFailed = () => {
  return { type: types.DATA_INIT_FAILED };
};
const dataInitialSuccess = (payload) => {
  return { type: types.DATA_INIT_SUCCESS, payload };
};

export const addAmount = (amount, discount) => {
  return { type: types.ADD_AMOUNT, payload: { amount, discount } };
};
export const updateAmount = (amount, id) => {
  return { type: types.UPDATE_AMOUNT, payload: { amount, id } };
};
export const updateOrderPage = (order, page) => {
  return { type: types.UPDATE_ORDER_PAGE, payload: { order, page } };
};

export const getDataDiscount = (order = "", page = 1) => {
  return async (dispatch) => {
    dispatch(dataInitial());
    try {
      const { pagination, maxPage } = await api.getDiscount({ order, page });
      dispatch(dataInitialSuccess({ pagination, maxPage }));
    } catch (error) {
      console.log(error);
      dispatch(dataInitial(dataInitialFailed));
    }
  };
};
