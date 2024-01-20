import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

@Component({
    selector: 'title-component',
    templateUrl: './title.component.html',
    styleUrls: [ './title.component.scss' ]
})
export class TitleComponent implements OnInit, OnChanges {

    @Input('preview')
    preview: boolean = false;

    nonPreviewProfName = 'profile-name';
    previewProfName = 'profile-name preview';
    profileName = this.nonPreviewProfName;

    nonPreviewProfTitle = 'profile-title';
    previewProfTitle = 'profile-title preview';
    profileTitle = this.nonPreviewProfTitle;

    name = '';
    title = '';

    isEditMode = false;

    constructor(
        public service: ResumeComponentService
    ) {}

    ngOnInit(): void {
        this.staticSetup();
    }

    ngOnChanges(changes: SimpleChanges): void {
        let isPreview = changes.preview.currentValue as boolean;
        console.log('Contact Component Preview mode: ', changes.preview.currentValue);
        if (isPreview) {
            // Preview mode
            this.profileName = this.previewProfName;
            this.profileTitle = this.previewProfTitle;
        }
    }

    staticSetup() {
        this.name = 'Nilesh Suryanarayan';
        this.title = 'Fullstack developer';
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

    printPage() {
        window.print();
    }

    expand() {
        let leftElement: HTMLElement = document.getElementById('left-panel') as HTMLElement;
        leftElement.style.display = 'grid';
        leftElement.style.gridColumn = '1 / span 12';
        leftElement.style.gridTemplateColumns = '1 / span 12 !important';
        // leftElement.style.width = 'fit-content';

        let rightElement: HTMLElement = document.getElementById('right-window') as HTMLElement;
        rightElement.style.display = 'none';
    }

}
