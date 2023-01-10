import { join } from 'path';
import { mySubscriber } from 'src/utils/custom-subcribe';
import { DatabaseType, DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const appDataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root123',
  database: 'blog-core-db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts', 'dist/src/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  subscribers: [mySubscriber],
});

appDataSource.initialize();
