
import {IsArray, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import { vehicleDrivers } from '../dto/create-vehicle.dto';


export class UpdateVehicleDto {
  //Vai apenas ler
  @IsOptional()
  @IsString()
  readonly plate?: string;

  @IsOptional()
  @IsString()
  readonly brand?: string;

  @IsOptional()
  @IsNumber()
  readonly fuelSize?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => vehicleDrivers)
  readonly drivers: Array<vehicleDrivers>
}