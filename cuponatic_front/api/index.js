const URL_BASE = "http://127.0.0.1:8000";
import axios from "axios";
export const getDiscount = async (input) => {
  const { order, page } = input;
  const api = await axios.get(
    `${URL_BASE}/discount/list/${order}?page=${page}`

    // {
    //   headers: {
    //     "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Expose-Headers": "link",
    //     "Cache-Control": "no-cache, private",
    //     "Content-Type": "application/json",
    //   },
    // }
  );
  return api.data;
};
