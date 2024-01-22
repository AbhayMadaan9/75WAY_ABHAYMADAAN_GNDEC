import { Iparent } from "../Interfaces/Iparent";
import Parent from "../Models/Parent"
import { Request, Response } from "express"
import Teacher from "../Models/Teacher";
import cron from 'node-cron'
import Student from "../Models/Student";

export async function gethomework(req: any, res: Response) {
    try {
    
        const parentinfo: any =  await Parent.find({_id: req.userid}).select('-password').populate('childid')
        if(!parentinfo) {return res.send("no teacher in the database")}
      console.log(parentinfo);
        res.status(200).send(parentinfo[0].childid.homework);
      } catch (error: any) {
        return res.status(500).send("Error geting homework for the child" + error.message);
      }
}
export async function updatestatus(req: any, res: Response) {
    const parentid: string = req.params.parentid;
    try {
      const Parentinfo: any = await Parent.find({_id: parentid}).select('-password').populate('childid')
      if(Parentinfo.length === 0) {return res.send("no parents in the database")}
     //update status 
     const userid = Parentinfo.childid._id;
     await Student.findOneAndUpdate({_id: userid}, {status: "left home"});
     cron.schedule('0 30', () => {
      console.log("check status if student status is not In school then send mail to parent and teacher");
      
    });
      res.status(200).send("Status updated successfully");
    } catch (error) {
      return res.status(500).send("Error sending homework to the parents");
    }
  }
  export async function getattendence(req: any, res: Response) {
    try {
        const parentinfo: any = Parent.find({_id: req.userid}).select('-password').populate('childid')
        if(!parentinfo) {return res.send("no teacher in the database")}
        
        res.status(200).send(parentinfo.childid.attendence);
      } catch (error) {
        return res.status(500).send("Error geting homework for the child");
      }
  }