export interface AccountLoginReq {
  code?: string;
  iv?: string;
  encryptedData?: string;
  username?: string;
  password?: string;
}

export interface AccountBindReq {
  username: string;
  password: string;
}

export interface AccountVisitorLoginReq {
  username: string;
  password: string;
}