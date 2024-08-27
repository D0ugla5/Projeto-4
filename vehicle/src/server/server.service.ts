import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Servers, ServersDocument} from './schemas/server-schema';
import { Model } from 'mongoose';


@Injectable()
export class ServerService {
    //A criação deve conter um armazenamento da primeira versão 
    constructor(@InjectModel(Servers.name) private serversModel: Model<ServersDocument>) {}
  
  async create(createServerDto: CreateServerDto): Promise<Servers> {
  
    const newServers = new this.serversModel({
      ...createServerDto,
    });
    //testando
    console.log('Using insert');
    return newServers.save();
  }

  findAll() {
    return `This action returns all server`;
  }

  findOne(id: number) {
    return `This action returns a #${id} server`;
  }

  update(id: number, updateServerDto: UpdateServerDto) {
    return `This action updates a #${id} server`;
  }

  remove(id: number) {
    return `This action removes a #${id} server`;
  }
}
