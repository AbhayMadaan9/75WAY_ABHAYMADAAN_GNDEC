import { Router } from "express";
const Parentrouter: Router = Router();
 import { login } from "../Controllers/TeacherController";
import { isAuthorized } from "../Middlewares/AuthUser";
import { getattendence, gethomework, updatestatus } from "../Controllers/ParentController";


//register api is not created for teacher and parent(not written on assigment) 
//isAuthorized will work then according to accesstoken and refreshtoken on teacher logins the website


//Parent login
Parentrouter.post("/login", login('parent')); 
//get homework of his/her child
Parentrouter.get('/childhomework', isAuthorized('parent'), gethomework)
//get attendence of his/her child
Parentrouter.get('/childattendence', isAuthorized('parent'), getattendence)
//update status of his/her child
Parentrouter.get('/updatestatus', isAuthorized('parent'), updatestatus)
export default Parentrouter;