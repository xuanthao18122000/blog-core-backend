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
import { Account } from './account.entity';
import { Role } from 'src/database/entities/role.entity';
import {Post} from "./post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  published: string;

  @Column()
  content: string;

  @Column()
  parentId: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'SET NULL',
  })
  post: Post[];

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;
}
