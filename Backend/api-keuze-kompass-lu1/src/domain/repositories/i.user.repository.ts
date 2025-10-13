import { User, UserFavorite } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  addFavorite(userId: string, favorite: UserFavorite): Promise<User>;
  removeFavorite(userId: string, moduleId: string): Promise<User>;
}