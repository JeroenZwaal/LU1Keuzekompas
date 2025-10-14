import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    collection: 'reflections',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

export class ReflectionDocument extends Document {
    @Prop({ required: true })
    module_id: string;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    rating: number; // 1-5 sterren

    created_at: Date;
    updated_at: Date;
}

export const ReflectionSchema = SchemaFactory.createForClass(ReflectionDocument);