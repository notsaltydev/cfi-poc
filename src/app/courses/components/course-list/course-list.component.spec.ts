import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CoursesService } from '../../services/courses/courses.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseStatus, Instructor } from '../../models';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import SpyObj = jasmine.SpyObj;


const mockAnyCourseInstructor: Instructor = {
    name: 'any-instructor-name',
    image: 'any-instructor-image'
};

const mockCourse1: Course = {
    id: 1,
    name: 'any-course-name-1',
    imageUrl: 'any-image-url-1',
    status: CourseStatus.DRAFT,
    instructors: [
        mockAnyCourseInstructor,
        {
            name: 'any-instructor-name-1-1',
            image: 'any-instructor-image-1-1'
        },
        {
            name: 'any-instructor-name-1-2',
            image: 'any-instructor-image-1-2'
        }
    ],
};

const mockCourseInstructor2: Instructor = {
    name: 'specific-instructor-name',
    image: 'specific-instructor-image'
};

const mockCourse2: Course = {
    id: 2,
    name: 'any-course-name-2',
    imageUrl: 'any-image-url-2',
    status: CourseStatus.PUBLISHED,
    instructors: [
        mockCourseInstructor2,
        mockAnyCourseInstructor,
        {
            name: 'any-instructor-name-2-2',
            image: 'any-instructor-image-2-2'
        },
        {
            name: 'any-instructor-name-1-2',
            image: 'any-instructor-image-1-2'
        }
    ]
};

const mockCourseList: Course[] = [
    mockCourse1,
    mockCourse2
];

class TestCourseDetailsComponent {
}

describe('CourseListComponent', () => {
    let component: CourseListComponent;
    let fixture: ComponentFixture<CourseListComponent>;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    {path: 'courses', pathMatch: 'full', component: CourseListComponent},
                    {path: 'courses/:id', component: TestCourseDetailsComponent}
                ]),
            ],
            declarations: [
                CourseListComponent
            ],
            providers: [
                {
                    provide: CoursesService,
                    useFactory: () => {
                        const coursesService: SpyObj<CoursesService> = jasmine.createSpyObj('CoursesService', ['getCourses']);

                        coursesService.getCourses.and.returnValue(of(mockCourseList));

                        return coursesService;
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListComponent);
        component = fixture.componentInstance;
        location = TestBed.inject(Location);
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should display list of all courses', () => {
        fixture.detectChanges();

        expect(component.filteredCourses$.getValue()).toEqual(mockCourseList);
    });

    it('should redirect to course detail after click on course name', fakeAsync(() => {
        fixture.detectChanges();

        const courseDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.course-name'));
        const firstCourse: HTMLElement = courseDebugElements[0].nativeElement;

        expect(firstCourse.innerText).toEqual(mockCourse1.name);

        firstCourse.click();
        tick();

        expect(location.path()).toEqual(`/courses/${mockCourse1.id}`);
    }));

    describe('Status filter', () => {
        it('should display list of specific courses filtered by status', fakeAsync(() => {
            const expectedResult: Course[] = [mockCourse2];

            fixture.detectChanges();
            component.status.setValue(CourseStatus.PUBLISHED);
            tick(200);

            expect(component.filteredCourses$.getValue()).toEqual(expectedResult);
        }));

        it('should display list of all courses after clear status', fakeAsync(() => {
            const expectedResult: Course[] = [mockCourse2];

            fixture.detectChanges();
            component.status.setValue(CourseStatus.PUBLISHED);
            tick(200);

            expect(component.filteredCourses$.getValue()).toEqual(expectedResult);

            const expectedResultAfterClearStatus: Course[] = mockCourseList;

            component.clearStatus();
            tick(200);

            expect(component.filteredCourses$.getValue()).toEqual(expectedResultAfterClearStatus);
        }));
    });

    describe('Search term filter', () => {
        it('should display list of specific courses filtered by name of course as a search term', fakeAsync(() => {
            const expectedResult: Course[] = [mockCourse1];

            fixture.detectChanges();
            component.searchTerm.setValue(mockCourse1.name);
            tick(200);

            expect(component.filteredCourses$.getValue()).toEqual(expectedResult);
        }));

        it('should display list of specific courses filtered by name of course as a search term', fakeAsync(() => {
            const expectedResult: Course[] = [mockCourse1];

            fixture.detectChanges();
            component.searchTerm.setValue(mockCourse1.name);
            tick(200);

            expect(component.filteredCourses$.getValue()).toEqual(expectedResult);
        }));

        it('should display list of specific courses filtered by name of course instructor as a search term', fakeAsync(() => {
            const expectedResult: Course[] = [mockCourse2];

            fixture.detectChanges();
            component.searchTerm.setValue(mockCourseInstructor2.name);
            tick(200);

            expect(component.filteredCourses$.getValue()).toEqual(expectedResult);
        }));

        it('should display list of specific courses filtered by name of course instructor existing in 2 courses as a search term', fakeAsync(() => {
            const expectedResult: Course[] = mockCourseList;

            fixture.detectChanges();
            component.searchTerm.setValue(mockAnyCourseInstructor.name);
            tick(200);

            expect(component.filteredCourses$.getValue()).toEqual(expectedResult);
        }));
    });


});
