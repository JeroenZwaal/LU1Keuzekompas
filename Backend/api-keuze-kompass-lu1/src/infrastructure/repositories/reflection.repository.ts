import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reflection } from '../../domain/entities/reflection.entity';
import type { IReflectionRepository } from '../../domain/repositories/i.reflection.repository';
import { ReflectionDocument } from '../database/reflection.schema';

@Injectable()
export class ReflectionRepository implements IReflectionRepository {
    constructor(
        @InjectModel('Reflection') private readonly reflectionModel: Model<ReflectionDocument>,
    ) {}

    async findAll(): Promise<Reflection[]> {
        const reflectionDocs = await this.reflectionModel.find();
        return reflectionDocs.map(doc => this.mapToEntity(doc));
    }

    async findById(id: string): Promise<Reflection | null> {
        const reflectionDoc = await this.reflectionModel.findById(id);
        return reflectionDoc ? this.mapToEntity(reflectionDoc) : null;
    }

    async findByModuleId(moduleId: string): Promise<Reflection[]> {
        const reflectionDocs = await this.reflectionModel.find({ module_id: moduleId });
        return reflectionDocs.map(doc => this.mapToEntity(doc));
    }

    async findByUserIdAndModuleId(userId: string, moduleId: string): Promise<Reflection | null> {
        const reflectionDoc = await this.reflectionModel.findOne({ 
            user_id: userId, 
            module_id: moduleId 
        });
        return reflectionDoc ? this.mapToEntity(reflectionDoc) : null;
    }

    async create(reflection: Reflection): Promise<Reflection> {
        const reflectionDoc = new this.reflectionModel({
            module_id: reflection.moduleId,
            user_id: reflection.userId,
            content: reflection.content,
            rating: reflection.rating,
            created_at: reflection.createdAt,
            updated_at: reflection.updatedAt,
        });
        
        console.log('Saving reflection:', reflectionDoc);
        const savedDoc = await reflectionDoc.save();
        console.log('Saved reflection:', savedDoc);
        return this.mapToEntity(savedDoc);
    }

    async update(id: string, reflectionData: Partial<Reflection>): Promise<Reflection | null> {
        const updateData: Record<string, any> = {
            updated_at: new Date()
        };
        
        if (reflectionData.content !== undefined) updateData.content = reflectionData.content;
        if (reflectionData.rating !== undefined) updateData.rating = reflectionData.rating;

        const reflectionDoc = await this.reflectionModel.findByIdAndUpdate(id, updateData, { new: true });
        return reflectionDoc ? this.mapToEntity(reflectionDoc) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.reflectionModel.findByIdAndDelete(id);
        return !!result;
    }

    private mapToEntity(reflectionDoc: ReflectionDocument): Reflection {
        return new Reflection(
            String(reflectionDoc._id),
            reflectionDoc.module_id,
            reflectionDoc.user_id,
            reflectionDoc.content,
            reflectionDoc.rating,
            reflectionDoc.created_at,
            reflectionDoc.updated_at,
        );
    }
}