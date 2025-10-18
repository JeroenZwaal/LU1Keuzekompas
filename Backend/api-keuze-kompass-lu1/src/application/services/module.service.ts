import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Module as ModuleEntity } from '../../domain/entities/module.entity';
import type { IModuleRepository } from '../../domain/repositories/i.module.repository';

@Injectable()
export class ModuleService {
  constructor(@Inject('IModuleRepository') private readonly moduleRepository: IModuleRepository) {}

    async getAllModules(): Promise<ModuleEntity[]> {
        return await this.moduleRepository.findAll();
    }

    async getModuleById(id: string): Promise<ModuleEntity> {
        const module = await this.moduleRepository.findById(id);
        if (!module) {
            throw new NotFoundException(`Module with id ${id} not found`);
        }
        return module;
    }

    async getFilteredModules(filters: {
        studycredit?: number;
        location?: string;
        level?: string;
        name?: string;
    }): Promise<ModuleEntity[]> {
        return await this.moduleRepository.findFiltered(filters);
    }

}