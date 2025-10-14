import { Reflection } from '../entities/reflection.entity';

export interface IReflectionRepository {
  findAll(): Promise<Reflection[]>;
  findById(id: string): Promise<Reflection | null>;
  findByModuleId(moduleId: string): Promise<Reflection[]>;
  findByUserIdAndModuleId(userId: string, moduleId: string): Promise<Reflection | null>;
  create(reflection: Reflection): Promise<Reflection>;
  update(id: string, reflectionData: Partial<Reflection>): Promise<Reflection | null>;
  delete(id: string): Promise<boolean>;
}