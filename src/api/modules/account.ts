import aesCipher from "@/utils/crypto";
import request from "@/api/httpRequest.ts";
import type { AccountLoginReq, AccountBindReq, AccountVisitorLoginReq } from '@/types/request/account';
import type { CommonRes } from '@/types/response/common';

/**
 * @description: 登录
 * @param {*} data {code/iv/encryptedData || username/password}
 * @return {*} 返回 Promise
 */
export const login = (data: AccountLoginReq) => {
  const params = JSON.parse(JSON.stringify(data));
  const { password } = params;
  if (password) {
    // 加密
    params.password = aesCipher.encrypt(password);
  }
  return request.postAction<CommonRes<unknown>>({
    url: "/account/login",
    data: params,
  });
};

/**
 * @description: 账号绑定
 * @param {*} params {username/password}
 * @return {*} Promise
 */
export const bind = (params: AccountBindReq) => {
  let { username, password } = params;
  password = aesCipher.encrypt(password);
  return request.postAction({
    url: "/account/bind",
    data: { username, password },
  });
};

/**
 * @description: 游客登录
 * @param {*} data {username/password}
 * @return {*} 返回 Promise
 */
export const visitorLogin = (data: AccountVisitorLoginReq) => {
  const params = JSON.parse(JSON.stringify(data));
  params.password = aesCipher.encrypt(params.password);
  return request.postAction({
    url: "/account/visitor-login",
    data: params,
  });
};