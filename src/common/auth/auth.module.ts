import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/common/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('jwt.secret'),
          signOptions: {
            expiresIn: config.get('jwt.expiresIn'),
          },
        };
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
