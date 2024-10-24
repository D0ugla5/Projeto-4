import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Servers, ServersSchema } from './schemas/server.schema';

@Module({
  //forfeature-> Utilizado para registrar modelos específicos dentro de um módulo. Permite que o módulo NestJS saiba quais modelos Mongoose estarão disponíveis dentro do contexto deste módulo. Modelo Mongoose a ser registrado. 
  imports: [MongooseModule.forFeature([{ name: Servers.name, schema: ServersSchema }])],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
