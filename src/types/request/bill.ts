import type { CommonListReq } from './common';

export interface BillListReq extends CommonListReq {
  startTime: string;
  endTime: string;
}

export interface BillReq {
  payType: number;
  billType: number;
  amount: number;
  remark: string;
}

export interface BillUpdateReq extends BillReq {
  id: number;
}