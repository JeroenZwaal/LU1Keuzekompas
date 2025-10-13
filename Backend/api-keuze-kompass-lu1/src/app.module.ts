import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleService } from './application/services/module.service';
import { ModuleController } from './interfaces/controllers/module.controller';
import { UserController } from './interfaces/controllers/user.controller';
import { RepositoryModule } from './infrastructure/repositoy.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserService } from './application/services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    RepositoryModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, ModuleController],
  providers: [
    AppService,
    UserService,
    ModuleService,
  ],
})
export class AppModule {}
