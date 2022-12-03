import {Controller, Post, Get, Body} from '@nestjs/common';
import { PostCreateDTO } from './dto/post.create.dto';
import { PostsService } from './posts.service';

@Controller("posts")
export class PostsController{

    constructor(private postsService: PostsService){
    }

    @Post()
    createPost(@Body() newPost: PostCreateDTO){
        return this.postsService.createPost(newPost)
    }

    @Get()
    getPosts(){
        return this.postsService.getPosts();
    }
}