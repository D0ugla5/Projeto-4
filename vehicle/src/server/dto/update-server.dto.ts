

import { IsString, IsEmail, IsUrl, IsOptional } from "class-validator";
import { IsPort } from "../validacoes/isPort";
import { IsFolderPath } from "../validacoes/isFolderPath";
import { ArePortsUnique } from "../validacoes/ArePortsUnique";

//A Porta Kafka já está sendo utilizada logo não pode estar sendo utilizada novamente

export class UpdateServerDto {
    
    @IsOptional()
    @IsPort()
    @ArePortsUnique()
    databasePort?: Number;

    
    @IsOptional()
    @IsPort()
    @ArePortsUnique()
    kafkaPort?: Number;
  
    
    
    @IsOptional()
    @IsPort()
    @ArePortsUnique()
    webserverPort?: Number;
  
    
    @IsOptional()
    @IsPort()
    @ArePortsUnique()
    iotHandlerPort?: Number;
  
    @IsOptional()
    @IsString()
    @IsUrl()
    serverAddress?: String;
  
    @IsOptional()
    @IsString()
    @IsFolderPath({ message: 'storageDirectory must be a valid folder path' })
    storageDirectory?: String; // deve ser um folder /example/folder
      
    @IsOptional()
    @IsString()
    @IsEmail()
    emailAddress?: String
}
