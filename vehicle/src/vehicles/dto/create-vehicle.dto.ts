import {IsArray, IsNotEmpty,IsNumber, IsString, ValidateNested } from 'class-validator';


export class CreateVehicleDto {
  //Same
  @IsNotEmpty()
  @IsString()
  readonly plate: string;

  @IsNotEmpty()
  @IsString()
  readonly brand: string;
  
  @IsNotEmpty()
  @IsNumber()
  readonly fuelSize: number;
  
  @IsNotEmpty()
  @IsArray()
  /* @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly drivers: Array<Driver>; */
  readonly drivers: Array<vehicleDrivers>
}
export class vehicleDrivers{
  @IsNotEmpty()
  @IsString()
  name:string;
  @IsNotEmpty()
  @IsString()
  id:string
}