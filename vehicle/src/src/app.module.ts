import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [
    //Conecta ao Mongo Pelo Shell
    /* mongosh "mongodb+srv://vehicles-cluster.3hwozjm.mongodb.net/" --apiVersion 1 --username Douglas */
    
    MongooseModule.forRoot('mongodb+srv://DG:Dg@servettest.4gwc4.mongodb.net/'), // Conecta ao MongoDB pelo modo VS Code + mongoDB
    //VehiclesModule,
    ServerModule,
  ],
})
export class AppModule {}