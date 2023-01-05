import axios from "axios";

const baseAxiosInterceptors = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

baseAxiosInterceptors.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status===401){
        throw Error("Lütfen önce giriş yapınız")
    }
    throw Error("Bir Hata Oluştu");
  });
export default baseAxiosInterceptors;