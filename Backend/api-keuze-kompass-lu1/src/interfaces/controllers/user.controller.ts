import { Controller, Get, Param, Query, HttpStatus, HttpException, UseGuards, Request, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { UserResponseDto } from '../presenters/user.dto';
import { AddFavoriteDto, UpdateEmailDto } from '../presenters/favorites.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt.auth.guard';
import { User, UserFavorite } from 'src/domain/entities/user.entity';
import { CurrentUser } from '../decorators/current.user.decorator';


@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  async addFavorite(@CurrentUser() user: User, @Body() addFavoriteDto: AddFavoriteDto): Promise<UserResponseDto> {
    try {
      const userId = user._id;

      const newFavorite = new UserFavorite(
        addFavoriteDto.module_id,
        new Date(),
        addFavoriteDto.module_name,
        addFavoriteDto.studycredit,
        addFavoriteDto.location,
      );

      const updatedUser = await this.userService.addFavorite(userId, newFavorite);
      
      return this.mapToResponseDto(updatedUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to add favorite', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/:moduleId')
  async removeFavorite(@CurrentUser() user: User, @Param('moduleId') moduleId: string): Promise<UserResponseDto> {
    try {
      const userId = user._id; 

      const updatedUser = await this.userService.removeFavorite(userId, moduleId);
      
      return this.mapToResponseDto(updatedUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to remove favorite', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      favorites: user.favorites.map((fav: UserFavorite) => ({
        module_id: fav.moduleId,
        added_at: fav.addedAt,
        module_name: fav.moduleName,
        studycredit: fav.studyCredit,
        location: fav.location,
      })),
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }
}