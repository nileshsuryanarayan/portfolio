import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget | null;
// }

@Component({
    selector: 'profile-picture-component',
    templateUrl: './profile-picture.component.html',
    styleUrls: [ './profile-picture.component.scss' ]
})
export class ProfilePictureComponent implements OnChanges {

    @Input('preview')
    preview: boolean = false;

    nonPreviewStyles = 'img-wrapper';
    previewStyles = 'img-wrapper preview';
    imgWrapperStyle = this.nonPreviewStyles;

    isEditMode = false;
    imgSrc = '../../assets/Profile_pic.png';

    constructor(
        public service: ResumeComponentService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let isPreview = changes.preview.currentValue as boolean;
        console.log('Preview mode: ', changes.preview.currentValue);
        if (isPreview) {
            // Preview mode
            this.imgWrapperStyle = this.previewStyles;
        }
    }
    
    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

    readUrl(event: any) {
        console.log('SelectFileEvent: ', event);
        if(event.target?.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.imgSrc = reader.result as string;
            reader.readAsDataURL(file);
        }
    }

}
