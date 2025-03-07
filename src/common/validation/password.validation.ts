import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class CustomIsStrongPassword implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return !/(.)\1\1/.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'The password should not contain three consecutive identical characters';
  }
}
