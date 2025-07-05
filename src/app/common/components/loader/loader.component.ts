import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../services/loder.service';

@Component({
    selector: 'loader-spinner',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {
  // This component can be used to display a loading spinner or animation
  // when data is being fetched or processed.

  isLoading$ = this.loaderService.loaderState$;

  constructor(private loaderService: LoaderService) {}


}
