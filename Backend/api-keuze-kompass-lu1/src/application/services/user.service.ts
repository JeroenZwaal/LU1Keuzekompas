import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User, UserFavorite } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/i.user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async addFavorite(userId: string, favorite: UserFavorite): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    // Check if favorite already exists
    const existingFavorite = user.favorites.find(fav => fav.moduleId === favorite.moduleId);
    if (existingFavorite) {
      return user; // Already in favorites, return unchanged
    }
    
    // Create new favorites array with the added favorite
    const updatedFavorites = [...user.favorites, favorite];
    
    const updatedUser = await this.userRepository.update(userId, { 
      favorites: updatedFavorites,
      updatedAt: new Date()
    });
    
    if (!updatedUser) {
      throw new NotFoundException(`Failed to update user with ID ${userId}`);
    }
    
    return updatedUser;
  }

  async removeFavorite(userId: string, moduleId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    // Create new favorites array without the specified moduleId
    const updatedFavorites = user.favorites.filter(fav => fav.moduleId !== moduleId);
    
    const updatedUser = await this.userRepository.update(userId, { 
      favorites: updatedFavorites,
      updatedAt: new Date()
    });
    
    if (!updatedUser) {
      throw new NotFoundException(`Failed to update user with ID ${userId}`);
    }
    
    return updatedUser;
  }
}