import mongoose, { Schema } from "mongoose";
import { Iparent } from "../Interfaces/Iparent";
const ParentSchema: Schema = new Schema(
    {
        childid: {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        },
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
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);
const Parent = mongoose.model<Iparent>("Parent", ParentSchema);
export default Parent;