import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
       name: string;
       email: string; 
    },
    token: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository  
    ){}

    async execute({ email, password}: IRequest): Promise<IResponse> {

       const user = await  this.usersRepository.findByEmail(email);
       
       if(!user) {
           throw new Error("Email or password incorrect!")
       }

       const passwordMatch = await compare(password, user.password);

       if(!passwordMatch) {
        throw new Error("Email or password incorrect!")
       }

       const token = sign({}, "4408f72f3843ebe391c79589739a6ce0", {
           subject: user.id,
           expiresIn: "1d"
       })

       return {
           user,
           token,
       }
    }
}

export { AuthenticateUserUseCase }