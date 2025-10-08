import { Module } from '@nestjs/common';
import { ModuleController } from './controllers/module.controller';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [ModuleController],
})
export class InterfaceModule {}