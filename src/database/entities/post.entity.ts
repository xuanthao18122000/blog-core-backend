import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Meta } from './meta.entity';
import { Role } from 'src/database/entities/role.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  metaTitle: string;

  @Column()
  slug: string;

  @Column()
  summary: string;

  @Column()
  viewers: number;

  @OneToMany(() => Meta, (meta) => meta.postId)
  metas: Meta[];

  @OneToMany(() => User, (user) => user.postId)
  users: User[];

  @OneToMany(() => Comment, (comment) => comment.postId)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];

  @ManyToMany(() => Category, (tag) => tag.posts)
  categories: Category[];

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;
}
