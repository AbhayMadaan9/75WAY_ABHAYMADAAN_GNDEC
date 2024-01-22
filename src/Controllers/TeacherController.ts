import express from "express";
import Student from '../Models/Student'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import {Istudent} from '../Interfaces/Istudent'
import { Iparent } from "../Interfaces/Iparent";
import Parent from "../Models/Parent";
import nodemailer from 'nodemailer';
import { Iteacher } from "../Interfaces/Iteacher";
import Teacher from "../Models/Teacher";

export async function registerstudent(req: Request , res: Response) {
  try {
    const { email, password, username, fullname, attendence, status, homework } = req.body;
    if (!email || !password || !username || !fullname) {
      return res.status(400).send("Empty field");
    }

    const existingUser: Istudent[] = await Student.find({ email: email });

    if (existingUser.length > 0) {
      return res.status(400).send("User already exists");
    }

    let encryptedpassword: string = req.body.password; 
    bcrypt.hash(password, 10, function(err, hash) {
      if(err) { return res.status(404).send("Error encrypting password")}
      else {encryptedpassword = hash;}
  });

    const student: Istudent = new Student(
      {
      username: username,
      fullname: fullname,
      email: email,
      homework: homework,
      status: status,
      attendence: attendence,
      password: encryptedpassword
    }
    );
console.log(student);
    await student.save();
   
    return res.status(200).send("Student registered successfully");
  } catch (error: any) {
    return res.status(500).send("Error registering student" + error.message);
  }
}
export async function registerparent(req: Request , res: Response) {
  try {
    const { email, password, username, fullname } = req.body;
    if (!email || !password || !username || !fullname) {
      return res.status(400).send("Empty field");
    }

    const existingUser: Iparent[] = await Parent.find({ email: email });

    if (existingUser.length > 0) {
      return res.status(400).send("User already exists");
    }
    console.log(existingUser);
    let encryptedpassword: string = req.body.password; 
    bcrypt.hash(password, 10, function(err, hash) {
      if(err) { return res.status(404).send("Error encrypting password")}
      else {encryptedpassword = hash;}
  });
console.log(req.params.childid );
if(!req.params.childid) { return res.status(404).send("Child id not present")}
    const parent: Iparent = new Parent(
      {
       childid: req.params.childid, 
      username: username,
      fullname: fullname,
      email: email,
      password: encryptedpassword
    }
    );

    await parent.save();
    return res.status(200).send("Parent registered successfully");
  } catch (error: any) {
    return res.status(500).send("Error registering student" + error.message);
  }
}
export async function registerteacher(req: Request , res: Response) {
  try {
    const { email, password, username, fullname } = req.body;
    if (!email || !password || !username || !fullname) {
      return res.status(400).send("Empty field");
    }

    const existingUser: Iteacher[] = await Teacher.find({ email: email });

    if (existingUser.length > 0) {
      return res.status(400).send("User already exists");
    }

    let encryptedpassword: string = req.body.password; 
    bcrypt.hash(password, 10, function(err, hash) {
      if(err) { return res.status(404).send("Error encrypting password")}
      else {encryptedpassword = hash;}
  });


    const teacher: Iteacher= new Teacher(
      {
      username: username,
      fullname: fullname,
      email: email,
      password: encryptedpassword
    }
    );
    await teacher.save();
    return res.status(200).send("Teacher registered successfully");
  } catch (error) {
    return res.status(500).send("Error registering student");
  }
}
//this login is for all users
export function login(rolee: string){
  return async (req: Request, res: Response)=> {
  
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).send("Empty field");
        }
       
        if(rolee == "student"){
          let existingUser: any = await Student.find({ email: email }); 
         console.log(existingUser);
         if (existingUser.length === 0) {
          return res.status(400).send("User does not exists");
        }

        let hashpassword: string =  existingUser[0].password;
       
        bcrypt.compare(password, hashpassword, function (err) {
          if (err) {
            return res.status(500).send("Error generating encrypted password");
          }
        });
        const { _id } = existingUser[0];
        const salt: string = process.env.JWT_SALT ?? "hii";
        const accesstoken: string = jwt.sign({ userid: _id, role: rolee }, salt, { expiresIn: '15m' });
        const refreshtoken: string = jwt.sign({ userid: _id, role: rolee }, salt, { expiresIn: '24hr' });
        res.cookie("accessToken", accesstoken, {maxAge: 3*24*60*60*1000});
        res.cookie("refreshtoken", refreshtoken, {maxAge: 3*24*60*60*1000});
        }
       else if(rolee == "teacher"){
        let existingUser: any = await Teacher.find({ email: email });
          console.log(existingUser);
          if (existingUser.length === 0) {
           return res.status(400).send("User does not exists");
         }
 
         let hashpassword: string =  existingUser[0].password;
        
         bcrypt.compare(password, hashpassword, function (err) {
           if (err) {
             return res.status(500).send("Error generating encrypted password");
           }
         });
         const { _id } = existingUser[0];
         const salt: string = process.env.JWT_SALT ?? "hii";
         const accesstoken: string = jwt.sign({ userid: _id, role: rolee }, salt, { expiresIn: '15m' });
         const refreshtoken: string = jwt.sign({ userid: _id, role: rolee }, salt, { expiresIn: '24hr' });
         res.cookie("accessToken", accesstoken, {maxAge: 3*24*60*60*1000});
         res.cookie("refreshtoken", refreshtoken, {maxAge: 3*24*60*60*1000});
         }
       else if(rolee == "parent"){
        let existingUser: any = await Parent.find({ email: email });
          console.log(existingUser);
          if (existingUser.length === 0) {
           return res.status(400).send("User does not exists");
         }
 
         let hashpassword: string =  existingUser[0].password;
        
         bcrypt.compare(password, hashpassword, function (err) {
           if (err) {
             return res.status(500).send("Error generating encrypted password");
           }
         });
         const { _id } = existingUser[0];
         const salt: string = process.env.JWT_SALT ?? "hii";
         const accesstoken: string = jwt.sign({ userid: _id, role: rolee }, salt, { expiresIn: '15m' });
         const refreshtoken: string = jwt.sign({ userid: _id, role: rolee }, salt, { expiresIn: '24hr' });
         res.cookie("accessToken", accesstoken, {maxAge: 3*24*60*60*1000});
         res.cookie("refreshtoken", refreshtoken, {maxAge: 3*24*60*60*1000});
         }
        
    
        return res.status(200).json({"login": true, "message": "Login successfull"});
      } catch (error) {
        return res.status(500).send("Error sigining in the user");
      }
    
 
}

}


async function sendmail(to: string, from: string, subject: string, body: string, frompassword: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAILACC,
      pass: process.env.GMAILPASS
    },
    logger: true
  });

  // send mail with defined transport object
   await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    // html: body // html body
  });
  
}
export async function  sendhomework(req: any, res: Response) {
  try {
    const teacherinfo: any = Teacher.find({_id: req.userid}).select('-password')
    if(!teacherinfo) {return res.send("no teacher in the database")}
    const existingParents = await Parent.find().select('-password').populate('childid')
    if(existingParents.length === 0) {return res.send("no parents in the database")}
    //please add dummy data for the parents- I have limited time 
   
    existingParents.map((parent: any)=>{
      console.log(parent);
     sendmail(parent.email, teacherinfo.email, "Homework of your child", parent.childid.homework, "gmailpassword")
    })

    res.status(200).send("Mails send to all parents successfully");
  } catch (error: any) {
    return res.status(500).send("Error sending homework to the parents" + error.message);
  }
}
export async function updatestatus(req: any, res: Response) {
  const parentid: string = req.params.parentid;
  try {
    const teacherinfo: any = Teacher.find({_id: req.userid}).select('-password')
    if(!teacherinfo) {return res.send("no teacher in the database")}
    const Parentinfo: any = await Parent.find({_id: parentid}).select('-password').populate('childid')
    if(Parentinfo.length === 0) {return res.send("no parents in the database")}
   //update status

   await Student.findOneAndUpdate({_id: Parentinfo[0].childid._id}, {status: "In school"});
 await sendmail(Parentinfo.email, teacherinfo.email, "Student status", "Student has reached the school", "gmailpassword")

    res.status(200).send("Mails send to all parents successfully");
  } catch (error: any) {
    return res.status(500).send("Error updaing status" + error.message);
  }
}
