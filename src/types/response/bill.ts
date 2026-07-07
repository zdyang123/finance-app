export interface BillRes {
  id: number;
  payType: number;
  billType: number;
  amount: number;
  remark: string;
  createTime: string;
}
export interface AmountTimeRes {
  inAmount: number;
  outAmount: number;
}
export interface BillAmountRes {
  amountDay: AmountTimeRes;
  amountMonth: AmountTimeRes;
  amountYear: AmountTimeRes;
}
export interface BillListRes {
  records: BillRes[];
  amount: BillAmountRes;
}
