
import { IsNumber, IsEmpty, IsPort, IsString, IsIP, IsEmail, IsUrl } from "class-validator";


export class CreateServerDto {
    //ports não podem repetir
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
