import express from "express"
import jwt, { decode } from "jsonwebtoken";
import {Request, Response, NextFunction } from "express";



const salt: string = process.env.JWT_SALT ?? "hii";
async function renewtoken(req: any, res: Response): Promise<boolean> {
  const refreshtoken: string = req.cookies.refreshtoken;
  try {
    if (!refreshtoken) return false;

    const decoded = jwt.verify(refreshtoken, salt) as { userid: string };
    if (decoded) {
      const newAccessToken: string = jwt.sign({ userid: decoded.userid }, salt, { expiresIn: '5m' }); 
      res.cookie('accessToken', newAccessToken, { maxAge: 3 * 24 * 60 * 60 * 1000 });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login again");
    return false;
  }
}
export const isAuthorized =  (role: string) => {
    return async(req: any, res: Response, next: NextFunction) => {
        try {
          const accessToken: string = req.cookies.accessToken
          if (!accessToken) {
             return res.status(403).send("Token not found");

        //    async function renew() {
        //     const isrenewed: boolean  = await renewtoken(req, res)
        //      if(isrenewed)
        //      {
        //        next();
        //      }
        //      else {return res.status(400).send("Login please"); }
        //     }
        //    renew()

          }
          
           jwt.verify(accessToken, salt, async (err, decoded: any) => {
            if (err) {
                
                    // const isrenewed: boolean  =  await renewtoken(req, res)
                    //  if(isrenewed)
                    //  {
                    //    next();
                    //  }
                    //  else {return res.status(400).send("Login please"); }
                    
                    return res.status(400).send("Login please");
        
            }
           
            // else if(decoded.role == role){
            //   console.log(decoded);
            //   console.log(decoded.role);
            //   req.userid = decoded.userid;
            // }
              else{
              console.log(decoded);
              console.log(decoded.role);
              req.userid = decoded.userid;
            }
          
          });
          if(req.userid) { next();}
          else 
          {
            return res.status(500).send("invaid user");
          }
         
        } catch (error) {
          return res.status(500).send("Error authenticating user: " );
        }
      };
    }

