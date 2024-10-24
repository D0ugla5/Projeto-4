import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPort(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPort',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'number' && value >= 1 && value <= 65535;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid port number (1-65535)`;
        },
      },
    });
  };
}
