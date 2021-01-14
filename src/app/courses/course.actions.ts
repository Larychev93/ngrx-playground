import {createAction, props} from '@ngrx/store';
import {Course} from './model/course';
import {Update} from '@ngrx/entity';

export const loadAllCourses = createAction(
  '[Course Resolver] Load all courses'
);

export const allCoursesLoaded = createAction(
'[Load Courses Effect] all courses loaded',
  props<{ courses: Course[] }>()
);

export const allCoursesLoadingFailed = createAction(
'[Load Courses Effect] all courses loaded with error',
  props<{ error: any }>()
);

export const courseUpdated = createAction(
  '[Edit Course Dialog] course pdated',
  props<{ update: Update<Course> }>()
);
