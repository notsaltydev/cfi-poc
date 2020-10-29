import { CourseStatus, Instructor } from './index';

export interface Course {
    id: number;
    name: string;
    imageUrl: string;
    status: CourseStatus;
    instructors: Instructor[];
}
