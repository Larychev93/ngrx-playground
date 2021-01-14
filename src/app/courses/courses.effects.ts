import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {courseActions} from './action-types';
import {CoursesHttpService} from './services/courses-http.service';
import {catchError, concatMap, map} from 'rxjs/operators';
import {allCoursesLoaded, allCoursesLoadingFailed} from './course.actions';
import {of} from 'rxjs';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {
  }

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(courseActions.loadAllCourses),
      concatMap(action => this.coursesHttpService.findAllCourses()),
      map(courses => allCoursesLoaded({ courses })),
      catchError(error => of(allCoursesLoadingFailed({ error: 'loading failed' })))
    );
  });

  saveCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(courseActions.courseUpdated),
      concatMap(action =>
      this.coursesHttpService.saveCourse(
        action.update.id, action.update.changes
      ))
    );
  }, { dispatch: false });
}
