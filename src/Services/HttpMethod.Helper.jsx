import axios from "axios";
axios.interceptors.request.use(
  (configurations) => {
    const configurationsLocal = configurations;
    if (configurations.url ===   'microsoft Acoount Token Api URL ') {
      configurationsLocal.headers.Authorization = "";
    } else {
      configurationsLocal.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("AccountToken")
      )}`;
    }

    return configurationsLocal;
  },
  (error) => {
    Promise.reject(error);
  }
);
export const HttpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
