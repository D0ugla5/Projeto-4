
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServersDocument = Servers & Document;

@Schema()

export class Servers {
    @Prop({ type:{ type: Number, unique:true, required: true }})
    databasePort: Number;

    @Prop({ type:{ type: Number, unique:true, required: true }})
    kafkaPort: Number;

    @Prop({ type:{ type: Number, unique:true, required: true }})
    webserverPort: Number;

    @Prop({ type:{ type: Number, unique:true, required: true }})
    iotHandlerPort: Number;

    @Prop({ type:{ type: String, unique:true, required: true }})
    serverAddress: String; //Formato de endereço ou de Ip

    @Prop({ type:{ type: String, unique:true, required: true }})
    storageDirectory: String; // /example/folder
    
    @Prop({ type:{ type: String, unique:true, required: true }})
    emailAdress: String
}

export const ServersSchema = SchemaFactory.createForClass(Servers);

