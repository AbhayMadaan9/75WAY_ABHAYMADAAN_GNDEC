import mongoose, { Schema } from "mongoose";
import { Istudent } from "../Interfaces/Istudent";
const StudentSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        status: {
            type: String,
            default: "In Home"
        },
        homework: {
            type: {
                subject:
                {
                    type: String
                },
                details: {
                    type: String
                },
                deadline: {
                    type: Date
                }

            }
        },
        attendence: {
            type: Number,
            default: 0
        },
        password: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);
const Student = mongoose.model<Istudent>("Student", StudentSchema);
export default Student;