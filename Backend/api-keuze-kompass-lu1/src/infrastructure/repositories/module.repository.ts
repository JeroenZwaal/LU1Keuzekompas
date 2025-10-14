import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module } from '../../domain/entities/module.entity';
import type { IModuleRepository } from '../../domain/repositories/i.module.repository';
import { ModuleDocument } from '../database/module.schema';

@Injectable()
export class ModuleRepository implements IModuleRepository {
    constructor(@InjectModel('Module') private readonly moduleModel: Model<ModuleDocument>) {}

  async findAll(): Promise<Module[]> {
    const moduleDocs = await this.moduleModel.find();
    return moduleDocs.map(doc => this.mapToEntity(doc));
  }

  async findById(id: string): Promise<Module | null> {
    const moduleDoc = await this.moduleModel.findById(id);
    return moduleDoc ? this.mapToEntity(moduleDoc) : null;
  }

  async findFiltered(filters: {
      studycredit?: number;
      location?: string;
      level?: string;
      name?: string;
  }): Promise<Module[]> {
      const query: any = {};

      if (filters.studycredit !== undefined)
        query.studycredit = filters.studycredit;

      if (filters.location)
        query.location = filters.location;

      if (filters.level)
        query.level = filters.level;

      if (filters.name)
        query.name = { $regex: filters.name, $options: 'i' };

      const moduleDocs = await this.moduleModel.find(query);
      return moduleDocs.map((doc) => this.mapToEntity(doc));
  }

  private mapToEntity(moduleDoc: ModuleDocument): Module {
    return new Module(
      String(moduleDoc._id),
      moduleDoc.name,
      moduleDoc.shortdescription,
      moduleDoc.description,
      moduleDoc.content,
      moduleDoc.studycredit,
      moduleDoc.location,
      moduleDoc.contact_id,
      moduleDoc.level,
      moduleDoc.learningoutcomes,
      moduleDoc.created_at,
      moduleDoc.updated_at,
    );
  }
}