import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { loadConfig } from '@/utils/load-config';
import { AuthService } from '@/common/auth/auth.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from '@/common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [loadConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('db.mongo.uri'),
        };
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService],
})
export class AppModule {}
