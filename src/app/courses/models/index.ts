export enum CourseStatus {
    DEFAULT = 'DEFAULT',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED'
}

export interface Instructor {
    name: string;
    image: string;
}

export interface State {
    status: CourseStatus;
    searchTerm: string;
}
