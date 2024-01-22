import { Document } from "mongoose";

export interface Iparent extends Document {
  username: string;
  fullname: string;
  email: string;
  password: string;
}