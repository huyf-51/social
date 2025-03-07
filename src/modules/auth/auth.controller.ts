import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body(new ValidationPipe()) createUser: LoginDto) {
    const resData = await this.authService.login(createUser);
    return resData;
  }

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) createUser: CreateAccountDto) {
    await this.authService.signUp(createUser);
    return 'signup success';
  }
}
