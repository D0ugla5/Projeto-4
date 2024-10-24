
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Servers } from '../schemas/server.schema';

export function ArePortsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'arePortsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { databasePort, kafkaPort, webserverPort, iotHandlerPort } = args.object as Servers;
          const ports = { databasePort, kafkaPort, webserverPort, iotHandlerPort };
          const values = Object.values(ports);
          const uniqueValues = new Set(values);
          
          if (uniqueValues.size !== values.length) {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const { databasePort, kafkaPort, webserverPort, iotHandlerPort } = args.object as Servers;
          const ports = { databasePort, kafkaPort, webserverPort, iotHandlerPort };
          const values = Object.values(ports);
          const duplicates = values.filter((item, index) => values.indexOf(item) !== index);
          const duplicatePorts = Object.entries(ports)
            .filter(([key, value]) => duplicates.includes(value))
            .map(([key, value]) => `${key} (${value})`)
            .join(', ');
          
          return `Ports must be unique within the object. Duplicate ports found: ${duplicatePorts}`;
        },
      },
    });
  };
}