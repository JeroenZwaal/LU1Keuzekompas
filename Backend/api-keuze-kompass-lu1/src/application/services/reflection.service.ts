import { Injectable, Inject, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { Reflection } from '../../domain/entities/reflection.entity';
import type { IReflectionRepository } from '../../domain/repositories/i.reflection.repository';

@Injectable()
export class ReflectionService {
  constructor(@Inject('IReflectionRepository') private readonly reflectionRepository: IReflectionRepository) {}

  async getReflectionsByModuleId(moduleId: string): Promise<Reflection[]> {
    return this.reflectionRepository.findByModuleId(moduleId);
  }

  async createReflection(
    moduleId: string, 
    userId: string, 
    content: string, 
    rating: number
  ): Promise<Reflection> {
    // Check if user already has reflection for this module
    const existingReflection = await this.reflectionRepository.findByUserIdAndModuleId(userId, moduleId);
    if (existingReflection) {
      throw new ConflictException('Je hebt al een reflectie geschreven voor deze module');
    }

    const now = new Date();
    const reflection = new Reflection(
      '',
      moduleId,
      userId,
      content,
      rating,
      now,
      now,
    );

    return await this.reflectionRepository.create(reflection);
  }

  async updateReflection(
    reflectionId: string,
    userId: string,
    content?: string,
    rating?: number
  ): Promise<Reflection> {
    const reflection = await this.reflectionRepository.findById(reflectionId);
    if (!reflection) {
      throw new NotFoundException('Reflectie niet gevonden');
    }

    // Check if user owns this reflection
    if (reflection.userId !== userId) {
      throw new ForbiddenException('Je kunt alleen je eigen reflecties bewerken');
    }

    // Create a new Reflection object with updated values, since properties are read-only
    const updatedReflection = new Reflection(
      reflection.id,
      reflection.moduleId,
      reflection.userId,
      content !== undefined ? content : reflection.content,
      rating !== undefined ? rating : reflection.rating,
      reflection.createdAt,
      new Date() // update the updatedAt timestamp
    );

    const result = await this.reflectionRepository.update(reflectionId, updatedReflection);
    if (!result) {
      throw new NotFoundException('Reflectie kon niet worden bijgewerkt');
    }

    return result;
  }

  async deleteReflection(reflectionId: string, userId: string): Promise<void> {
    const reflection = await this.reflectionRepository.findById(reflectionId);
    if (!reflection) {
      throw new NotFoundException('Reflectie niet gevonden');
    }

    // Check if user owns this reflection
    if (reflection.userId !== userId) {
      throw new ForbiddenException('Je kunt alleen je eigen reflecties verwijderen');
    }

    const deleted = await this.reflectionRepository.delete(reflectionId);
    if (!deleted) {
      throw new NotFoundException('Reflectie kon niet worden verwijderd');
    }
  }
}