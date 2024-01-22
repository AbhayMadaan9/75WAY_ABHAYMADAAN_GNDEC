import { Document } from "mongoose";

export interface Istudent extends Document {
  parentid: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  status?: string;
  homework?: {
    subject: string;
    details: string;
    deadline: Date;
  },
  attendence?: number;
}