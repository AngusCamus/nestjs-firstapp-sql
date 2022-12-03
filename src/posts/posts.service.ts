import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { PostCreateDTO } from './dto/post.create.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {


    constructor(
        private userService: UsersService,
        @InjectRepository(Post) private postRepo: Repository<Post>,){}
    //Ahora ya tenemos el CRUD

    async createPost(post: PostCreateDTO){
        const userFound = await this.userService.getUser(post.authorId);


        if(!userFound) return new HttpException("User not found", HttpStatus.NOT_FOUND)

            
        const newPost = this.postRepo.create(post)
        return this.postRepo.save(newPost)
    }

    getPosts(){
        return this.postRepo.find({
            relations: ['author']
        })
    }

    // async getUser(id: number){
    //     const postFound= await this.postRepo.findOne({
    //         where: {
    //             id
    //         }
    //     })

    //     if(!postFound){
    //         return new HttpException("Post not found", HttpStatus.NOT_FOUND)
    //     }

    //     return postFound
    // }

    // async deleteUser(id: number){
    //     const result = await this.postRepo.delete({id})

    //     if(result.affected === 0){
    //         return new HttpException("Post not found", HttpStatus.NOT_FOUND)
    //     }

    //     return result;
    // }

    // async updateUser(id:number, user: UserUpdateDTO ){
    //     const result = await this.postRepo.update({id: id}, user);

    //     if(result.affected===0){
    //         return new HttpException("Post not found", HttpStatus.NOT_FOUND)
    //     }
        
    //     return result;

    // }

}