import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException, Patch } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Servers } from './schemas/server.schema';

@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  async create(@Body() createServerDto: CreateServerDto): Promise<Servers> {
    return this.serverService.create(createServerDto);
  }

  @Get()
  async findAll(): Promise<Servers[]> {
    return this.serverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Servers> {
    const server = await this.serverService.findOne(id);
    if (!server) {
      throw new NotFoundException(`Server with id ${id} not found`);
    }
    return server;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto): Promise<Servers> {
    return this.serverService.update(id, updateServerDto);
  }

  /* @Patch(':id')
 async default(@Param('id')){
  return this.serverService.update();}
 */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.serverService.remove(id);
  }
}
