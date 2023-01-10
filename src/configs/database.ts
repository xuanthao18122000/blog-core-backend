import { join } from 'path';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const DatabaseConfig = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root123',
  database: 'blog-core-db',
  // entities: [__dirname + '/database/**/*.entity{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts', 'dist/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
  dropSchema: false,
} as TypeOrmModuleAsyncOptions;

export default DatabaseConfig;
