import { createAction, props } from '@ngrx/store';
import { Annotation } from "../store/reducer";

export const DrawImageAndAnnotationsButtonClicked = createAction('[Annotations] Draw Button Clicked');
export const LoadImageSuccess = createAction('[Annotations] Load Image Success', props<{ image: any }>());
export const LoadImageError = createAction('[Annotations] Load Image Error', props<{ error: string }>());
export const LoadAnnotationsSuccess = createAction('[Annotations] Load Annotations Success', props<{ annotations: Annotation[] }>());
export const LoadAnnotationsError = createAction('[Annotations] Load Annotations Error', props<{ error: string }>());
