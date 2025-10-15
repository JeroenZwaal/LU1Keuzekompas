export interface Module {
  id: string;
  name: string;
  shortdescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string;
  contact_id: string;
  level: string;
  learningoutcomes: string;
  favorited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleFilter {
  studycredit?: number;
  location?: string;
  level?: string;
  name?: string;
}