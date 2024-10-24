import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicles, VehiclesSchema } from './schemas/vehicles.schema';

@Module({
  //Schema  EXATAMENTE ISSO, OQUE ISSO FAZ ?
  // forFeature -> Utilizado para registrar modelos específicos dentro de um módulo. Permite que o módulo NestJS saiba quais modelos Mongoose estarão disponíveis dentro do contexto deste módulo. Modelo Mongoose a ser registrado. 
  
                                                  //Duas propriedades: 
  imports: [MongooseModule.forFeature([{ name: Vehicles.name, schema: VehiclesSchema }])],
  //
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService], // Exporta o serviço se precisar usá-lo em outros módulos
})
export class VehiclesModule {}

