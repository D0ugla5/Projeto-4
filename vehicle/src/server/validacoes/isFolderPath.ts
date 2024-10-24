import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsFolderPath(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFolderPath',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          // Regex para verificar se o valor é um caminho de diretório válido
          const folderPathRegex = /^(\/|\\|([a-zA-Z]:\\))(.*)$/;
          return folderPathRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid folder path`;
        },
      },
    });
  };
}