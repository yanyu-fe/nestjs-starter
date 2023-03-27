import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '@/common/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const token = await this.authService.encrypt({
      sub: '1',
      name: 'John Doe',
    });
    return {
      token,
    };
  }
}
