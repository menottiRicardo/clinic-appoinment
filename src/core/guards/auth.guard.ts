import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/allow.decorator';

@Injectable()
export class JwtAuthGuard {
  constructor(
    private reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const isRpc = context.getType() === 'rpc';
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      console.log('here')
      if (isPublic || isRpc) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      let token =
        request.headers['authorization'] ?? request.cookies['access_token'];
      if (!token) {
        throw new UnauthorizedException();
      }
      token = token.replace('Bearer ', '');
      const response = await firstValueFrom(
        this.authClient.send('validate_token', token),
      );
      if (!response) {
        console.log('bad');
        throw new UnauthorizedException();
      }
      request.user = response.user;
      return true;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException();
    }
  }
}
