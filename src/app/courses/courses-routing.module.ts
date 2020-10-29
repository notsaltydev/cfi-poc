import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseResolver } from './resolvers/course/course.resolver';

const routes: Routes = [
    {
        path: '',
        component: CourseListComponent
    },
    {
        path: ':id',
        component: CourseDetailsComponent,
        resolve: {
            course: CourseResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule {
}
