import { PartialType } from '@nestjs/mapped-types';
import { CreateServerDto } from './create-server.dto';
import { IsNumber, IsEmpty, IsPort, IsString, IsIP, IsEmail, IsUrl } from "class-validator";
import{  } from "class-transformer";



export class UpdateServerDto extends PartialType(CreateServerDto) {

    @IsNumber()
    @IsEmpty()
    @IsPort()
    databasePort: Number;

    @IsNumber()
    @IsEmpty()
    @IsPort()
    kafkaPort: Number;

    @IsNumber()
    @IsEmpty()
    @IsPort()
    webserverPort: Number;

    @IsNumber()
    @IsEmpty()
    @IsPort()
    iotHandlerPort: Number;

    @IsString()
    @IsEmpty()
    @IsUrl()
    @IsIP()
    serverAddress: String; //Formato de endereço ou de Ip

    @IsString()
    @IsEmpty()
    storageDirectory: String; // /example/folder
    
    @IsString()
    @IsEmail()
    @IsEmpty()
    emailAdress: String
}
