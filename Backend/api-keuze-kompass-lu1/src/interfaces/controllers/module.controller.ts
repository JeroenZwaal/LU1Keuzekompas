import { Controller, Get, Param, Query, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { ModuleResponseDto } from '../presenters/module.response.dto';
import { ModuleService } from '../../application/Services/module.service';
import { Module } from '../../domain/entities/module.entity';

@Controller('api/modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  async getAllModules(): Promise<ModuleResponseDto []> {
    try {
        const modules = await this.moduleService.getAllModules();
        return modules.map(module => this.mapToResponseDto(module));
    } catch (error) {
        throw new HttpException('Failed to fetch modules', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private mapToResponseDto(module: Module): ModuleResponseDto {
    return {
      id: module.id,
      name: module.name,
      shortdescription: module.shortDescription,
      description: module.description,
      content: module.content,
      studycredit: module.studyCredit,
      location: module.location,
      contact_id: module.contactId,
      level: module.level,
      learningoutcomes: module.learningOutcomes,
      created_at: module.createdAt,
      updated_at: module.updatedAt,
    };
  }
}