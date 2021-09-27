/**
 *
 * @param {*} data
 * @returns boolean de existencia;
 */
export const truthty = (data) => {
  if (data === undefined || data === null || !data || data === "") {
    return false;
  }
  if (Array.isArray(data)) {
    return data.length !== 0;
  }
  if (typeof data !== "string" && !typeof data !== "number") {
    if (typeof data === "object" && !(data instanceof Date)) {
      return Object.keys(data).length !== 0;
    }
  }
  return true;
};

export const objectToUrlPath = function (obj) {
  let str = "";
  for (let key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
};
export const copy = function (x) {
  if (x != null && x != undefined) return JSON.parse(JSON.stringify(x));
  return x;
};
