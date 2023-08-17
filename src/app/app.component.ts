import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  LoadAnnotationsError,
  LoadAnnotationsSuccess,
  LoadImageError,
  LoadImageSuccess
} from "./actions/actions";
import { Annotation, AnnotationsState } from "./store/reducer";
import { ImageService } from "./services/image.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('canvasEl', { static: true }) canvasEl!: ElementRef<HTMLCanvasElement>;

  annotations$: Observable<Annotation[]>;
  imageData: any;
  annotationsData: any;

  constructor(private store: Store<AnnotationsState>, private imageService: ImageService) {
    this.annotations$ = this.store.select(state => state.annotations);
  }

  fetchImage() {
    this.imageService.fetchImage().subscribe(
      (imageData: any) => {
        this.imageData = imageData;

        this.store.dispatch(LoadImageSuccess({ image: imageData }));
        this.fetchAnnotations();
      },
      (error) => {
        this.store.dispatch(LoadImageError({ error }));
      }
    );
  }

  fetchAnnotations() {
    this.imageService.fetchAnnotations().subscribe(
      (annotationsData: any) => {
        this.annotationsData = JSON.parse(annotationsData.message)[0];

        this.store.dispatch(LoadAnnotationsSuccess({ annotations: this.annotationsData }));
        this.renderCanvas(this.imageData, this.annotationsData)
      },
      (error) => {
        this.store.dispatch(LoadAnnotationsError({ error }));
      }
    );
  }

  renderCanvas(image: any, annotation: Annotation) {
    const canvas: HTMLCanvasElement = this.canvasEl.nativeElement;
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw annotation
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(annotation.x, annotation.y, annotation.radiusX, annotation.radiusY, 0, 0, 2 * Math.PI);
      ctx.stroke();
    };

    img.src = URL.createObjectURL(image)
  }
}

