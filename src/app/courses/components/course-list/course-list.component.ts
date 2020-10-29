import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { CourseStatus, Instructor, State } from '../../models';


@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
    filteredCourses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    searchTerm: FormControl = new FormControl('');
    status: FormControl = new FormControl(CourseStatus.DEFAULT);

    private courses: Course[];
    private search$: Subject<void> = new Subject<void>();
    private state: State = {
        searchTerm: '',
        status: CourseStatus.DEFAULT
    };
    private subscription: Subscription = new Subscription();

    constructor(private coursesService: CoursesService) {
    }

    ngOnInit(): void {
        this.subscription.add(
            this.coursesService.getCourses().subscribe((courses: Course[]) => {
                this.courses = courses;
                this.filteredCourses$.next(courses);
            })
        );

        this.subscription.add(
            this.searchTerm.valueChanges.subscribe((searchTerm: string) => this.setSearchCriteria({searchTerm}))
        );

        this.subscription.add(
            this.status.valueChanges.subscribe((status: CourseStatus) => this.setSearchCriteria({status}))
        );

        this.subscription.add(
            this.search$.pipe(
                debounceTime(200),
                switchMap(() => this.search()),
            ).subscribe(result => {
                this.filteredCourses$.next(result);
            })
        );
    }

    clearStatus(): void {
        this.status.reset(CourseStatus.DEFAULT);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private setSearchCriteria(patch: Partial<State>): void {
        Object.assign(this.state, patch);
        this.search$.next();
    }

    private search(): Observable<Course[]> {
        const {status, searchTerm} = this.state;
        const courses = [...this.courses]
            .filter((course: Course) => this.searchTermMatches(course, searchTerm.trim()))
            .filter((course: Course) => this.statusMatches(course, status));

        return of(courses);
    }

    private searchTermMatches(course: Course, searchTerm): boolean {
        return course.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            course.instructors.some((instructor: Instructor) => instructor.name.toLocaleLowerCase().includes(searchTerm));
    }

    private statusMatches(course: Course, status: CourseStatus): boolean {
        return status === CourseStatus.DEFAULT || course.status === status;
    }
}
