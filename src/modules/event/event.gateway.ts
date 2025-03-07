import { UseFilters } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsException,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WsExceptionsFilter } from 'src/common/filter/ws-exception.filter';

@UseFilters(new WsExceptionsFilter())
@WebSocketGateway({ cors: { origin: process.env.CLIENT_URL } })
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;

  handleConnection(socket: Socket) {
    console.log('socket socket id>>>', socket.id);
    console.log(socket.handshake.query);
    try {
      if (socket.handshake.query.token !== 'huy') {
        throw new WsException('authentication failed');
      } else {
        socket.join(socket.handshake.query.userID)
      }
    } catch (error) {
      socket.emit('error', error.error);
    }
  }

  handleDisconnect(socket: Socket) {}

  // socket client connect to server with 3 instance ???
  sendNotification(userID: number, content) {
    this.server.to(String(userID)).emit("notification", JSON.stringify(content))
  }

  @SubscribeMessage('huy')
  handleMessage(socket: Socket, data: string): string {
    return data;
  }
}
