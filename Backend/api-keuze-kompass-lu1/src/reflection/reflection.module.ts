import { Module } from '@nestjs/common';
import { ReflectionController } from '../interfaces/controllers/reflection.controller';
import { ReflectionService } from '../application/services/reflection.service';
import { ReflectionRepository } from '../infrastructure/repositories/reflection.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [ReflectionController],
  providers: [
    ReflectionService,
    {
      provide: 'IReflectionRepository',
      useClass: ReflectionRepository,
    },
  ],
  exports: [
    ReflectionService,
    {
      provide: 'IReflectionRepository',
      useClass: ReflectionRepository,
    },
  ],
})
export class ReflectionModule {}