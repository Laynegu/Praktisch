import Http from "@/util/fetch";
// import { getLoginToken } from "./auth";

const request = new Http();

request.globalConfig = {
  baseUrl: "/api",
  // headers: {
  //   'Authorization': `Bearer ${getLoginToken()}`,
  // }
};

export default request;
