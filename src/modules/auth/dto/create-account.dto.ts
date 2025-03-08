import { IsPhoneNumber, IsStrongPassword, Validate, IsNotEmpty } from 'class-validator';
import { CustomIsStrongPassword } from 'src/common/validation/password.validation';

export class CreateAccountDto {
  @IsNotEmpty({message: 'phonenumber required'})
  @IsPhoneNumber('VN', { message: 'invalid phone number' })
  phoneNumber: string;

  @IsNotEmpty({message: 'password required'})
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 1,
    },
    { message: 'password dont match pattern' },
  )
  @Validate(CustomIsStrongPassword)
  password: string;

  @IsNotEmpty({message: 'firstname required'})
  firstName: string;

  @IsNotEmpty({message: 'lastname required'})
  lastName: string;
}
