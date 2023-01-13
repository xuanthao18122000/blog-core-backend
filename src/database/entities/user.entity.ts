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
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  phone: number;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;

  @ManyToOne(() => Post, (post) => post.users, {
    onDelete: 'SET NULL',
  })
  postId: Post[];

  @OneToMany(() => Account, (account) => account.user, {
    onDelete: 'SET NULL',
  })
  accounts: Account[];

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'role_id',
    },
  })
  role: Role[];
}
