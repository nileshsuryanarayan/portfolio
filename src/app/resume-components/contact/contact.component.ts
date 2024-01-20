import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

@Component({
    selector: 'contact-component',
    templateUrl: './contact.component.html',
    styleUrls: [ './contact.component.scss' ]
})
export class ContactComponent implements OnInit, OnChanges {

    @Input('preview')
    preview: boolean = false;

    nonPreviewStyles = 'section';
    previewStyles = 'section preview';
    sectionStyle = this.nonPreviewStyles;

    nonPreviewFont = 'f-24';
    previewFont = 'f-24 preview';
    font24Style = this.nonPreviewFont;

    email: string = '';
    contanctNum: string = '';
    address: string = '';
    linkedIn: string = '';

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
            this.sectionStyle = this.previewStyles;
            this.font24Style = this.previewFont;
        }
    }

    staticSetup() {
        this.email = 'nileshsuryanarayan@gmail.com';
        this.contanctNum = '+91-7709827049';
        this.address = 'Ulhasnagar, Thane - 421004';
        this.linkedIn = 'https://www.linkedin.com/in/nilesh-suryanarayan-b45277170/';
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

}
