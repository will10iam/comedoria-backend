import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){

    //Receber o token
    const authToken = req.headers.authorization;


    if(!authToken){
        return res.json(401).end();
    }

    const [, token ] = authToken.split(" ")

    try{
        //Validar o token 
        const { sub } = verify(
            token,
            process.env.JWT_SECRET,
        ) as Payload;
        
        // Recuperar o id do token e colcoar dentro de uma variavel user_id dentro da req
        req.user_id = sub;

    } catch(err){
        return res.json(401).end();
    }

return next();

}