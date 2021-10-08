import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from 'jsonwebtoken';
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
     const { sub: user_id } = verify(token, "4408f72f3843ebe391c79589739a6ce0") as IPayload;
     
     const userRepository = new UserRepository();
     const user =  await userRepository.findById(user_id);

     if(!user) {
         throw new AppError("User does not exists!", 401)
     }
     next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}

