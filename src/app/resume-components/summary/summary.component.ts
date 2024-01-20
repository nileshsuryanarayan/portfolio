import { Component, OnInit } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

@Component({
    selector: 'summary-component',
    templateUrl: './summary.component.html',
    styleUrls: [ './summary.component.scss' ]
})
export class SummaryComponent implements OnInit {

    sectionTitle = '';
    sectionContent = '';

    isEditMode = false;

    constructor(
        public service: ResumeComponentService
    ) {

    }

    ngOnInit(): void {
        this.staticSetup();
    }

    staticSetup() {
        this.sectionTitle = 'Summary';
        this.sectionContent = `Procient, skilled, philomath and ambitious Software Engineer with 5 years
        of experience in developing high-performance web applications based on
        micro-service architecture and Angular 7. Experience in development, testing
        and deployment automation using CI/CD. Seeking position in a reputed
        organization where my skills and knowledge can be leveraged as an asset to
        seek solutions for real world problems.`;
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

}
