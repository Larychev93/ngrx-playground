import {compareCourses, Course} from '../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {courseActions} from '../action-types';

/**
 Upsert - update if exists or create if not exists
 */

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
  error: string;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
  error: null
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(courseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, {
      ...state,
      allCoursesLoaded: true
    });
  }),
  on(courseActions.allCoursesLoadingFailed, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(courseActions.courseUpdated, (state, { update }) => {
    return adapter.updateOne(update, state);
  })
);

export const { selectAll } = adapter.getSelectors();



