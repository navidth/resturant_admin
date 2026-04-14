import axios from "axios";

const axiosCall = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY,
      }
})

axiosCall.interceptors.request.use((config) => {
      config.headers["x-api-key"] = process.env.API_KEY!;
      return config;
});

axiosCall.interceptors.response.use(
      (response) => response,
      (error) => {
            if (error.response?.status === 401) {
                  console.log("Unauthorized - maybe logout");
            }

            return Promise.reject(error);
      }
);

export default axiosCall;