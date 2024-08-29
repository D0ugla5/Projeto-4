import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Servers, ServersDocument } from './schemas/server.schema';
import { Model } from 'mongoose';


@Injectable()
export class ServerService {
  constructor(@InjectModel(Servers.name) private serversModel: Model<ServersDocument>) {}

  async create(createServerDto: CreateServerDto): Promise<Servers> {
    const newServer = new this.serversModel(createServerDto);
    var serverBackup = newServer;
    // Backup (opcional)

    console.log('Using insert');
    await serverBackup.save();  //Salvar o backup (se necessário)
    return newServer.save();
  }

  async findAll(): Promise<Servers[]> {
    console.log('Using findAll');
    return this.serversModel.find().exec();
  }

  async findOne(id: string): Promise<Servers> {
    const server = await this.serversModel.findById(id).exec();
    if (!server) {
      throw new NotFoundException(`Server with id ${id} not found`);
    }
    return server;
  }

  async update(id: string, updateServerDto: UpdateServerDto): Promise<Servers> {
    const server = await this.serversModel.findByIdAndUpdate(
      id,
      updateServerDto,
      { new: true, runValidators: true }
    ).exec();

    if (!server) {
      throw new NotFoundException('The server was not found, check all the parameters and try again!');
    }

    console.log('Using the update query');
    return server;
  }

  //Esse é para voltar para o padrão->
  async default(){
    return ('set to default') /* serverBackup */;
  }

  async remove(id: string): Promise<string> {
    const deleted = await this.serversModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Server with id ${id} not found or already deleted!`);
    }

    console.log('Using delete');
    return `Server with id: ${id} deleted`;
  }
}
