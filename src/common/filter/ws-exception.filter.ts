import { Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter<WsException> {
  handleError(client: { emit: Function }, exception: Error): void {
    console.log('error', exception.stack);
    client.emit('error', exception.message);
  }
}
