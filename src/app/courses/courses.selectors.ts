import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoursesState} from './reducers/course.reducers';

import * as fromCourses from './reducers/course.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>(
  'course'
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);

export const areCoursesPresent = createSelector(
  selectAllCourses,
  courses => courses.length > 0
);

export const coursesError = createSelector(
  selectCoursesState,
  state => state.error
);

export const areCoursesLoadingFinished = createSelector(
  areCoursesLoaded,
  coursesError,
(loaded, error) => loaded || error
);
