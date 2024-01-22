import { Router } from "express";
const Studentouter: Router = Router();
 import { login } from "../Controllers/TeacherController";
import { isAuthorized } from "../Middlewares/AuthUser";
import { gethomework } from "../Controllers/StudentController";
 


//register api is not created for teacher and parent(not written on assigment) 
//isAuthorized will work then according to accesstoken and refreshtoken on teacher logins the website


//Parent login
Studentouter.post("/login", login('student')); 
//get homework of his/her child
Studentouter.get('/homework', isAuthorized('student'), gethomework)

export default Studentouter;