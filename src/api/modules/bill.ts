import httpRequest from "@/api/httpRequest.ts";
import type { BillListReq, BillReq, BillUpdateReq } from '@/types/request/bill';
import type { BillListRes } from '@/types/response/bill';
import type { CommonRes } from '@/types/response/common';

/**
 * @description: 获取账单列表
 * @param {*} params {pageSize/pageNum}
 * @return {*} 返回 Promise
 */
export const getBillList = (params: BillListReq) => {
  return httpRequest.getAction<CommonRes<BillListRes[]>>({
    url: "/bill/list",
    data: params,
  });
};

/**
 * @description: 新增一条账单
 * @param {*} params {payType/billType/amount/remark}
 * @return {*} 返回 Promise
 */
export const addBill = (params: BillReq) => {
  return httpRequest.postAction({
    url: "/bill/create",
    data: params,
  });
};

export const getBillDetail = (id: number) => {
  return httpRequest.getAction({
    url: `/bill/detail?id=${id}`,
  });
};

export const deleteBill = (id: number) => {
  return httpRequest.deleteAction({
    url: `/bill/remove/${id}`,
  });
};

export const updateBill = (params: BillUpdateReq) => {
  return httpRequest.postAction({
    url: "/bill/update",
    data: params,
  });
};
