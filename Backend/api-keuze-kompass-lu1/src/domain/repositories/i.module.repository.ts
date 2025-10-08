import { Module } from '../entities/module.entity';

export interface IModuleRepository {
    findAll(): Promise<Module[]>;
    // findById(id: string): Promise<Module | null>;
    // create(module: Module): Promise<Module>;
    // update(id: string, module: Partial<Module>): Promise<Module | null>;
    // delete(id: string): Promise<boolean>;
}