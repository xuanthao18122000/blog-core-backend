import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { includes, isArray, isEmpty } from 'lodash';
import { SendResponse } from 'src/utils/send-response';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
            const roles = this.reflector.get<string[]>('roles', context.getHandler());

            const request = context.switchToHttp().getRequest();

            const user = await UserService.StaticFindUserById(request.user);
            if (!user)
                throw new HttpException(
                    SendResponse.error('FORBIDDEN'),
                    HttpStatus.FORBIDDEN,
                );
            const listRole = user.role.map((o) => o.role_key);

            // if (isEmpty(roles)) {
            //     return true;
            // }

            // if (
            //     !isEmpty(roles) &&
            //     (!user.role || !isArray(user.role) || user.role.length <= 0)
            // )
            //     throw new HttpException(
            //         SendResponse.error('FORBIDDEN'),
            //         HttpStatus.FORBIDDEN,
            //     );


            for (const role of roles) {
                if (includes(listRole, role)) return true;
            }

            throw new HttpException(
                SendResponse.error('FORBIDDEN'),
                HttpStatus.FORBIDDEN,
            );
        }catch(err){
            throw 'BACKEND';
        }
    }
}
