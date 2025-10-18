import { Module } from '@nestjs/common';
import { ModuleService } from './services/module.service';
import { RepositoryModule } from '../infrastructure/repositoy.module';

@Module({
  imports: [RepositoryModule],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ApplicationModule {}