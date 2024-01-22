import { Document } from "mongoose";

export interface Iteacher extends Document {
  username: string;
  fullname: string;
  email: string;
  password: string;
}