import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from './database/module.schema';
import { UserSchema } from './database/user.schema';
import { ReflectionSchema } from './database/reflection.schema';

import { ModuleRepository } from './repositories/module.repository';
import { UserRepository } from './repositories/user.repository';
import { ReflectionRepository } from './repositories/reflection.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Module', schema: ModuleSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Reflection', schema: ReflectionSchema },
    ]),
  ],
  providers: [
    { provide: 'IModuleRepository', useClass: ModuleRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IReflectionRepository', useClass: ReflectionRepository },
  ],
  exports: [
    'IModuleRepository',
    'IUserRepository',
    'IReflectionRepository',
  ],
})
export class RepositoryModule {}
