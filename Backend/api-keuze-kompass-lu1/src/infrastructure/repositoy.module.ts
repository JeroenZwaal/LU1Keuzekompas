import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from './database/module.schema';
import { ModuleRepository } from './repositories/module.repository';
import { UserSchema } from './database/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Module', schema: ModuleSchema },
      { name: 'User', schema: UserSchema },
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