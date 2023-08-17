import { createReducer, on } from '@ngrx/store';
import { LoadAnnotationsSuccess, LoadImageSuccess } from "../actions/actions";

export interface Annotation {
  id: string;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
}

export interface AnnotationsState {
  annotations: Annotation[];
  image: any;
}

const initialState: AnnotationsState = {
  annotations: [],
  image: null,
};

export const annotationsReducer = createReducer(
  initialState,
  on(LoadImageSuccess, (state, { image }) => ({ ...state, image })),
  on(LoadAnnotationsSuccess, (state, { annotations }) => ({ ...state, annotations })),
);
