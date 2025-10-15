export interface Reflection {
  id: string;
  moduleId: string;
  userId: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReflectionDto {
  content: string;
  rating: number;
}