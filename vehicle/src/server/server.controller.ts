import { Controller, Post, Get, Param, Body, Put, Delete, Patch} from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  async create(@Body() createServerDto: CreateServerDto) {
    return this.serverService.create(createServerDto);
  }

  @Get()
  async findAll() {
    return this.serverService.findAll();
  }

 /*  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
  } */

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(id, updateServerDto);
  }

  @Put(':id/default')
  async default(@Param('id') id: string) {
    return this.serverService.default(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serverService.remove(id);
  }

  @Get('disk-usage')
  async getDiskUsage() {
    return this.serverService.getDiskUsage();
  }
}
