import { Component, OnInit } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

interface Education {
    educationName: string;
    period: string;
    institute?: string;
    university?: string
}

@Component({
    selector: 'education-component',
    templateUrl: './education.component.html',
    styleUrls: [ './education.component.scss' ]
})
export class EducationComponent implements OnInit {

    educations: Education[] = [];

    isEditMode = false;

    constructor(
        public service: ResumeComponentService
    ) {
        
    }

    ngOnInit(): void {
        this.staticSetup();
    }

    staticSetup() {
        const education: Education = {
            educationName: 'B.E. (Electronics and Telecommunication)',
            period: 'Jun 2014 - May 2018',
            institute: '',
            university: 'University of Mumbai'
        };
        this.educations.push(education);
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

    addEducation() {
        let education: Education = {
            educationName: 'Education',
            period: 'Period',
            institute: 'School or Institute',
            university: 'University'
        };
        this.educations.push(education);
    }

    removeExperience(i: number) {
        this.educations.splice(i, 1);
    }

}
