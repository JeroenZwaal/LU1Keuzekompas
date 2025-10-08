import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleService } from './application/Services/module.service';
import { ModuleController } from './interfaces/controllers/module.controller';
import { RepositoryModule } from './infrastructure/repositories/repositoy.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    RepositoryModule,
  ],
  controllers: [
    AppController, 
    ModuleController
  ],
  providers: [
    AppService,
    ModuleService,
  ],
})
export class AppModule {}
