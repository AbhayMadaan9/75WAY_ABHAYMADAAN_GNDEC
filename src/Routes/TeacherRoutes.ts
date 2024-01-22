import { Router } from "express";
const Teacherrouter: Router = Router();
 import {registerstudent, login, sendhomework, updatestatus, registerparent, registerteacher} from "../Controllers/TeacherController";
import { isAuthorized } from "../Middlewares/AuthUser";
import { validateInputs } from "../Middlewares/ValidateInputs";



//isAuthorized will work then according to accesstoken and refreshtoken on teacher logins the website

//create student account 
Teacherrouter.post("/createstudent", isAuthorized('teacher'), validateInputs, registerstudent);  
//create parent account
Teacherrouter.post("/createparent/:childid", isAuthorized('teacher'), validateInputs, registerparent); 
//create teacher account
Teacherrouter.post("/createteacher", validateInputs,  registerteacher); 
//teacher login
Teacherrouter.post("/login", validateInputs, login('teacher')); 

//send homework to parents
Teacherrouter.post("/sendhomework", isAuthorized('teacher'), sendhomework); 
//add status of reaching school and notify parents
Teacherrouter.post("/updatestatus/:parentid", isAuthorized('teacher'), updatestatus); 
export default Teacherrouter;