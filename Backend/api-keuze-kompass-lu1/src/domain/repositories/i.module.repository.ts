import { Module } from '../entities/module.entity';

export interface IModuleRepository {
    findAll(): Promise<Module[]>;
    findById(id: string): Promise<Module | null>;
    findFiltered(filters: {
        studycredit?: number;
        location?: string;
        level?: string;
        name?: string;
    }): Promise<Module[]>;
}