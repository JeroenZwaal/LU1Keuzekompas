export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  favorites: UserFavorite[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFavorite {
  moduleId: string;
  addedAt: Date;
  moduleName: string;
  studycredit: number;
  location: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}