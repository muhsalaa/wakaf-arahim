import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export function useRequest({ url, method = "GET", data, params } = {}) {
  return axios({
    method,
    url,
    data,
    params,
  });
}
