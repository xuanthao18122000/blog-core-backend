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
import { Post } from './post.entity';
import { Role } from 'src/database/entities/role.entity';
import {User} from "./user.entity";

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  metaTitle: string;

  @Column()
  content: string;

  @Column()
  slug: string;

  @ManyToOne(() => Post, (post) => post.metas, {
    onDelete: 'SET NULL',
  })
  postId: Post[];

  @OneToMany(() => User, (user) => user.postId)
  user: User[];

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;
}
