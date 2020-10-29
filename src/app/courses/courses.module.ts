import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CoursesService } from './services/courses/courses.service';
import { CourseResolver } from './resolvers/course/course.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        CoursesRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CourseListComponent,
        CourseDetailsComponent,
    ],
    providers: [
        CoursesService,
        CourseResolver
    ]
})
export class CoursesModule {
}
