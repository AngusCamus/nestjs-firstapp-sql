import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';


@Entity({ name: 'posts' })
export class Post {
  
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @Column()
  content: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
  
  @Column()
  authorId: number;

  @ManyToOne(()=>User, user => user.posts)
  author: User
}