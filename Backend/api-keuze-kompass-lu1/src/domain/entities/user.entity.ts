export class User {
  constructor(
    public readonly _id: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string,
    public readonly favorites: UserFavorite[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export class UserFavorite {
  constructor(
    public readonly moduleId: string,
    public readonly addedAt: Date,
    public readonly moduleName: string,
    public readonly studyCredit: number,
    public readonly location: string,
  ) {}
}