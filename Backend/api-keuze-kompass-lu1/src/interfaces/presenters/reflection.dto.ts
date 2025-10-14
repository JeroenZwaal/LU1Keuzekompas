import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateReflectionDto {
  @IsString()
  content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}

export class UpdateReflectionDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}

export class ReflectionResponseDto {
  id: string;
  moduleId: string;
  userId: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
