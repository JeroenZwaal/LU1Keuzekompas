import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request,HttpStatus,HttpException } from '@nestjs/common';
import { ReflectionService } from '../../application/services/reflection.service';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt.auth.guard';
import { CreateReflectionDto, UpdateReflectionDto, ReflectionResponseDto } from '../presenters/reflection.dto';
import { Reflection } from '../../domain/entities/reflection.entity';
import { User } from '../../domain/entities/user.entity';
import { CurrentUser } from '../decorators/current.user.decorator';

@Controller('api/modules/:moduleId/reflections')
@UseGuards(JwtAuthGuard)
export class ReflectionController {
  constructor(private readonly reflectionService: ReflectionService) {}

  @Get()
  async getReflections(@Param('moduleId') moduleId: string): Promise<ReflectionResponseDto[]> {
    try {
      const reflections = await this.reflectionService.getReflectionsByModuleId(moduleId);
      return reflections.map(reflection => this.mapToResponseDto(reflection));
    } catch (error) {
      throw new HttpException('Kon reflecties niet ophalen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('my-reflection')
  async getMyReflection(
      @Param('moduleId') moduleId: string,
      @CurrentUser() user: User
  ): Promise<ReflectionResponseDto | null> {
    try {
      const reflection = await this.reflectionService.getReflectionByUserIdAndModuleId(user._id, moduleId);
      
      if (!reflection) {
        throw new HttpException('Geen reflectie gevonden', HttpStatus.NOT_FOUND);
      }
      
      return this.mapToResponseDto(reflection);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Kon reflectie niet ophalen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createReflection(
    @Param('moduleId') moduleId: string,
    @CurrentUser() user: User,
    @Body() createReflectionDto: CreateReflectionDto
  ): Promise<ReflectionResponseDto> {
    try {
      // Validate rating
      if (createReflectionDto.rating < 1 || createReflectionDto.rating > 5) {
        throw new HttpException('Rating moet tussen 1 en 5 zijn', HttpStatus.BAD_REQUEST);
      }

      const reflection = await this.reflectionService.createReflection(
        moduleId,
        user._id,
        createReflectionDto.content,
        createReflectionDto.rating
      );

      return this.mapToResponseDto(reflection);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Kon reflectie niet aanmaken', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateReflection(
    @Param('moduleId') moduleId: string,
    @Param('id') reflectionId: string,
    @CurrentUser() user: User,
    @Body() updateReflectionDto: UpdateReflectionDto
  ): Promise<ReflectionResponseDto> {
    try {
      // Validate rating if provided
      if (updateReflectionDto.rating !== undefined && 
          (updateReflectionDto.rating < 1 || updateReflectionDto.rating > 5)) {
        throw new HttpException('Rating moet tussen 1 en 5 zijn', HttpStatus.BAD_REQUEST);
      }

      const reflection = await this.reflectionService.updateReflection(
        reflectionId,
        user._id,
        updateReflectionDto.content,
        updateReflectionDto.rating
      );

      return this.mapToResponseDto(reflection);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Kon reflectie niet bijwerken', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteReflection(
    @Param('moduleId') moduleId: string,
    @Param('id') reflectionId: string,
    @CurrentUser() user: User,
  ): Promise<{ message: string }> {
    try {
      await this.reflectionService.deleteReflection(reflectionId, user._id);
      return { message: 'Reflectie succesvol verwijderd' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Kon reflectie niet verwijderen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private mapToResponseDto(reflection: Reflection): ReflectionResponseDto {
    return {
      id: reflection.id,
      moduleId: reflection.moduleId,
      userId: reflection.userId,
      content: reflection.content,
      rating: reflection.rating,
      createdAt: reflection.createdAt,
      updatedAt: reflection.updatedAt,
    };
  }
}