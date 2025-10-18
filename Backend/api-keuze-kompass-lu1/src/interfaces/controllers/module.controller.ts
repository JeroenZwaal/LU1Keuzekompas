import { Controller, Get, Param, Query, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { ModuleResponseDto } from '../presenters/module.dto';
import { ModuleService } from '../../application/services/module.service';
import { Module } from '../../domain/entities/module.entity';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.auth.guard';
import { CurrentUser } from '../decorators/current.user.decorator';
import { User } from '../../domain/entities/user.entity';

@Controller('api/modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getModules(
        @CurrentUser() user: User,
        @Query('studycredit') studycredit?: number,
        @Query('location') location?: string,
        @Query('level') level?: string,
        @Query('name') name?: string,
        ): Promise<(ModuleResponseDto & { favorited: boolean })[]> {
        try {
            // Bouw filter object
            const filters: {
            studycredit?: number;
            location?: string;
            level?: string;
            name?: string;
            } = {};

            if (studycredit !== undefined) filters.studycredit = Number(studycredit);
            if (location) filters.location = location;
            if (level) filters.level = level;
            if (name) filters.name = name;

            // Haal modules op uit de service
            const modules = await this.moduleService.getFilteredModules(filters);

            // Haal favorieten van ingelogde gebruiker
            const userFavoritesIds = user?.favorites.map(fav => fav.moduleId) || [];

            // Map modules naar DTO en voeg favorited veld toe
            return modules.map(module => ({
            ...this.mapToResponseDto(module),
            favorited: userFavoritesIds.includes(module.id),
            }));
        } catch (error) {
            throw new HttpException('Failed to fetch modules', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getModuleById(
        @Param('id') id: string,
        @CurrentUser() user: User
    ): Promise<ModuleResponseDto & { favorited: boolean }> {
        try {
            const module = await this.moduleService.getModuleById(id);  
            if (!module) {
                throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
            }

            // Check of deze module in de favorieten van de gebruiker staat
            const userFavoritesIds = user?.favorites.map(fav => fav.moduleId) || [];
            const favorited = userFavoritesIds.includes(module.id);

            return {
                ...this.mapToResponseDto(module),
                favorited: favorited
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Failed to fetch module', HttpStatus.INTERNAL_SERVER_ERROR);
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