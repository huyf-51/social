import { IsPhoneNumber, IsStrongPassword, Validate } from 'class-validator';
import { CustomIsStrongPassword } from 'src/common/validation/password.validation';

export class LoginDto {
  @IsPhoneNumber('VN', { message: 'invalid phone number' })
  phoneNumber: string;

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
}
