export class Module {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly shortDescription: string,
        public readonly description: string,
        public readonly content: string,
        public readonly studyCredit: number,
        public readonly location: string,
        public readonly contactId: string,
        public readonly level: string,
        public readonly learningOutcomes: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}
