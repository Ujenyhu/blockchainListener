import { Request } from "express";

export default interface RequestBase<T> extends Request {
  body: T;
}
