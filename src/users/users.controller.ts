import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { ProfileCreateDTO } from './dto/create.profile.dto';
import { UserCreateDTO } from './dto/create.user.dto';
import { UserUpdateDTO } from './dto/update.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    constructor(private userService: UsersService){}


    @Post()
    createUser(@Body() newUser:UserCreateDTO){

        return this.userService.createUser(newUser);
    }

    @Get(":id")
    getById(@Param('id', ParseIntPipe) id: number){
        return this.userService.getUser(id);
    }
    @Get()
    getUsers(): Promise<User[]>{
        return this.userService.getUsers();
    }

    @Delete(":id")
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id);
    }

    @Patch(":id")
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() newUser: UserUpdateDTO){
        return this.userService.updateUser(id, newUser);
    }

    @Post(":id/profile")
    createProfile(@Param('id', ParseIntPipe) id: number, @Body() newProfile: ProfileCreateDTO){
        return this.userService.createProfile(id, newProfile)
    }

}
