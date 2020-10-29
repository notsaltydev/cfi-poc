import { TestBed } from '@angular/core/testing';
import { CourseResolver } from './course.resolver';
import { CoursesService } from '../../services/courses/courses.service';
import { of } from 'rxjs';
import { CourseDetail } from '../../models/course-detail';
import SpyObj = jasmine.SpyObj;

const mockCourseDetail: CourseDetail = {
    id: 1,
    name: 'any-course-name',
    images: ['any-image'],
    instructors: [
        {
            name: 'any-instructor-name',
            image: 'any-instructor-image'
        }
    ]
};

describe('CourseResolver', () => {
    let service: CourseResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CourseResolver,
                {
                    provide: CoursesService,
                    useFactory: () => {
                        const coursesService: SpyObj<CoursesService> = jasmine.createSpyObj('CoursesService', ['getCourseDetailsById']);

                        coursesService.getCourseDetailsById.and.returnValue(of(mockCourseDetail));

                        return coursesService;
                    }
                }
            ]
        });

        service = TestBed.inject(CourseResolver);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
