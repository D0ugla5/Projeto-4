import { IsString, IsEmail, IsUrl, IsNotEmpty, IsInt, } from 'class-validator';
import { IsFolderPath } from '../validacoes/isFolderPath';
import { IsPort } from '../validacoes/isPort';
import { ArePortsUnique } from '../validacoes/ArePortsUnique';


export class CreateServerDto {
  @IsInt()
  @IsNotEmpty()
  @IsPort()
  @ArePortsUnique()
  databasePort: number;

  @IsInt()
  @IsNotEmpty()
  @IsPort()
  @ArePortsUnique()
  kafkaPort: number;

  //@IsInt({min: 1, máx: 65535})
  @IsInt()
  @IsNotEmpty()
  @IsPort()
  @ArePortsUnique()
  webserverPort: number;

  @IsInt()
  @IsNotEmpty()
  @IsPort()
  @ArePortsUnique()
  iotHandlerPort: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  serverAddress: string;

  @IsString()
  @IsNotEmpty()
  @IsFolderPath({ message: 'storageDirectory must be a valid folder path' })
  storageDirectory: string; // deve ser um folder /example/folder

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;
}
