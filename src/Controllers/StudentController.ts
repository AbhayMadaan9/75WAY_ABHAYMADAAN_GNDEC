
import Parent from "../Models/Parent"
import { Response } from "express"
import Student from "../Models/Student";

export async function gethomework(req: any, res: Response) {
    try {
        const studentinfo: any = Student.find({_id: req.userid}).select('-password')
        if(!studentinfo) {return res.send("no teacher in the database")}
        
        res.status(200).send(studentinfo.homework);
      } catch (error) {
        return res.status(500).send("Error geting homework for the child");
      }
}
