import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from '../database/module.schema';
import { ModuleRepository } from './module.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Module', schema: ModuleSchema }
    ]),
  ],
  providers: [
    {
      provide: 'IModuleRepository', 
      useClass: ModuleRepository,
    },
  ],
  exports: ['IModuleRepository'],
})
export class RepositoryModule {}