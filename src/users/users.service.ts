import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/create.user.dto';
import { UserUpdateDTO } from './dto/update.user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepo: Repository<User>){}
    //Ahora ya tenemos el CRUD

    async createUser(user: UserCreateDTO){

        const userFound= await this.userRepo.findOne({
            where:{
                username : user.username
            }
        })

        if(userFound){
            return new HttpException("User already exist", HttpStatus.CONFLICT)
        }
                
        const newUser = this.userRepo.create(user)
        return this.userRepo.save(newUser)
    }

    getUsers(){
        return this.userRepo.find()
    }

    async getUser(id: number){
        const userFound= await this.userRepo.findOne({
            where: {
                id
            }
        })

        if(!userFound){
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        }

        return userFound
    }

    async deleteUser(id: number){
        const result = await this.userRepo.delete({id})

        if(result.affected === 0){
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        }

        return result;
    }

    async updateUser(id:number, user: UserUpdateDTO ){
        const result = await this.userRepo.update({id: id}, user);
        
        if(result.affected===0){
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        
        return result;

    }
}
