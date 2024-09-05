import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Servers, ServersDocument } from './schemas/server.schema';

@Injectable()
export class ServerService {

  // Propriedade para armazenar o backup temporário
  private backup: ServersDocument | null = null;

  constructor(@InjectModel(Servers.name) private serversModel: Model<ServersDocument>) {}

  async create(createServerDto: CreateServerDto): Promise<Servers> {
    const newServer = new this.serversModel(createServerDto);
    
    // Validação de server
    const { databasePort, kafkaPort, webserverPort, iotHandlerPort } = createServerDto;

    // Procurando se tem algum parecido
    const existingServers = await this.serversModel.find({
      $or: [
        { databasePort },
        { kafkaPort },
        { webserverPort },
        { iotHandlerPort },
      ],
    });

    // Se já existir, lança erro
    if (existingServers.length > 0) {
      throw new BadRequestException('One or more ports are already in use');
    } else {
      // Salva o backup do servidor antes de salvar o novo servidor
      this.backup = await newServer.save();  // Salva o backup do novo servidor
      return newServer;
    }
  }

  async findAll(): Promise<Servers[]> {
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
    // Salva o backup do servidor atual
    const currentServer = await this.serversModel.findById(id).exec();
    if (!currentServer) {
      throw new NotFoundException(`Server with id ${id} not found`);
    }
    this.backup = currentServer;

    // Atualiza o servidor
    const updatedServer = await this.serversModel.findByIdAndUpdate(
      id,
      updateServerDto,
      { new: true, runValidators: true }
    ).exec();

    if (!updatedServer) {
      throw new BadRequestException('Error updating server.');
    }

    return updatedServer;
  }

  async default(id: string): Promise<Servers> {
    // Verifica se o backup está disponível
    if (!this.backup) {
      throw new BadRequestException('No backup found to revert to.');
    }

    // Verifica se o servidor existe
    const existingServer = await this.serversModel.findById(id).exec();
    if (!existingServer) {
      throw new NotFoundException(`Server with id ${id} not found`);
    }

    // Reverte para o backup
    const updatedServer = await this.serversModel.findByIdAndUpdate(
      id,
      this.backup.toObject(),
      { new: true, runValidators: true }
    ).exec();

    if (!updatedServer) {
      throw new BadRequestException('Error updating server to default state.');
    }

    return updatedServer;
  }

  async remove(id: string): Promise<string> {
    const deleted = await this.serversModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Server with id ${id} not found or already deleted!`);
    }

    // Limpa o backup após deltado
    this.backup = null;
    
    return `Server with id: ${id} deleted`;
  }
}
