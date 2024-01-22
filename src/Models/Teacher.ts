import mongoose, { Schema } from "mongoose";
import { Iteacher } from "../Interfaces/Iteacher";
const TeacherSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    },

    { timestamps: true }
);
const Teacher = mongoose.model<Iteacher>("Teacher", TeacherSchema);
export default Teacher;