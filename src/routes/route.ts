import { AuthModule } from 'src/modules/auth/auth.module';
import { PostModule } from 'src/modules/post/post.module';

export const Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'post',
        module: PostModule,
      },
    ],
  },
];
