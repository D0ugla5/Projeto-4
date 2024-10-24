import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServersDocument = Servers & Document;

@Schema()
export class Servers {
    @Prop({ Type: Number, required: true })
    databasePort: Number; // Corrigido de Number para number

    @Prop({ Type: Number, required: true })
    kafkaPort: Number; // Corrigido de Number para number

    @Prop({ Type: Number, required: true })
    webserverPort: Number; // Corrigido de Number para number

    @Prop({ Type: Number, required: true })
    iotHandlerPort: Number; // Corrigido de Number para number

    @Prop({ Type: Number, required: true })
    serverAddress: String; // Corrigido de String para string

    @Prop({ Type: String, required: true })
    storageDirectory: String; // Corrigido de String para string

    @Prop({ Type: String, required: true })
    emailAddress: String; // Corrigido de emailAdress para emailAddress
}

export const ServersSchema = SchemaFactory.createForClass(Servers);
