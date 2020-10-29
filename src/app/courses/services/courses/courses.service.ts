import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { environment } from '../../../../environments/environment';
import { CourseDetail } from '../../models/course-detail';

@Injectable()
export class CoursesService {

    constructor(private httpClient: HttpClient) {
    }

    getCourses(): Observable<Course[]> {
        return this.httpClient.get<Course[]>(`${environment.apiUrl}/api/courses`);
    }

    getCourseDetailsById(id: number): Observable<CourseDetail> {
        return this.httpClient.get<CourseDetail>(`${environment.apiUrl}/api/courses/${id}`);
    }
}
