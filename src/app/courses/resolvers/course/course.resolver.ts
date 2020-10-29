import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetail } from '../../models/course-detail';

@Injectable()
export class CourseResolver implements Resolve<CourseDetail> {
    constructor(private coursesService: CoursesService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<CourseDetail> {
        const courseId: number = parseInt(route.paramMap.get('id'), 10);

        return this.coursesService.getCourseDetailsById(courseId);
    }
}
