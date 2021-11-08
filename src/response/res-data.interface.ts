export interface ResData {
  code: Status
  msg: string,
  content?: any
}

export enum Status {
  SUCCESS,
  ERROR
}