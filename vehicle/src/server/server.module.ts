import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Servers, ServersSchema } from './schemas/server-schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Servers.name, schema: ServersSchema }])],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
