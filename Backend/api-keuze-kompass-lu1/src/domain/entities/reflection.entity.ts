export class Reflection {
    constructor(
        public readonly id: string,
        public readonly moduleId: string,
        public readonly userId: string,
        public readonly content: string,
        public readonly rating: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}