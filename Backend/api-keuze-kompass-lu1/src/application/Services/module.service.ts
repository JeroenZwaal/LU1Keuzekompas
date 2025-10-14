import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Module } from '../../domain/entities/module.entity';
import type { IModuleRepository } from '../../domain/repositories/i.module.repository';

@Injectable()
export class ModuleService {
  constructor(@Inject('IModuleRepository') private readonly moduleRepository: IModuleRepository) {}

    async getAllModules(): Promise<Module[]> {
        return await this.moduleRepository.findAll();
    }

    async getModuleById(id: string): Promise<Module> {
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
    }): Promise<Module[]> {
        return await this.moduleRepository.findFiltered(filters);
    }

}