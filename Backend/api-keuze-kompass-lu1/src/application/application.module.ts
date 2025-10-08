import { Module } from '@nestjs/common';
import { ModuleService } from './Services/module.service';
import { RepositoryModule } from '../infrastructure/repositories/repositoy.module';

@Module({
  imports: [RepositoryModule],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ApplicationModule {}