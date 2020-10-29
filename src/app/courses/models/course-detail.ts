import { Instructor } from './index';

export interface CourseDetail {
    id: number;
    name: string;
    images: string[];
    instructors: Instructor[];
}
