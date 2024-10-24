import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ServerModule } from './server/server.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    //Conecta ao Mongo Pelo Shell
    /* mongosh "mongodb+srv://vehicles-cluster.3hwozjm.mongodb.net/" --apiVersion 1 --username Douglas */
    //Nova
    imports: [
      MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.oidkrao.mongodb.net/serttest?retryWrites=true&w=majority`,
    ),
    ServerModule,
  ],
})
export class AppModule {}