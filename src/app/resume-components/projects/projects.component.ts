import { Component, OnInit } from "@angular/core";
import { Experience } from "../resume-components.model";
import { ResumeComponentService } from "../resume-components.service";

@Component({
    selector: 'projects-component',
    templateUrl: './projects.component.html',
    styleUrls: [ './projects.component.scss' ]
})
export class ProjectsComponent implements OnInit {

    projects: Experience[] = [];

    isEditMode = false;

    constructor(
        public service: ResumeComponentService
    ) {
        
    }

    ngOnInit(): void {
        this.staticSetup();
    }

    staticSetup() {
        let proj1: Experience = {
            title: 'STAR',
            period: 'Jul 2021 - Present',
            subtitle: '(Specialist Engineer)',
            content: `Suite for Treatment, Adjustment and Reporting (STAR) is a French regional Finance application which caters to MSS Products`,
            bulletPoints: [
                `Receives Trade/Valuation Data from dierent Front office/Bank office systems and accounting data for reconcilliation.`,
                `Application provides enriched data to the downstream systems like Regulatory.`
            ]
        };
        let proj2: Experience = {
            title: 'CAPS (Cards Acquiring Processing System)',
            period: 'Sep 2018 - Apr 2021',
            subtitle: 'Software Engineer',
            content: `Cards Acquiring and Processing System (CAPS) is responsible for onboarding merchants who wish to accept various card payments. Nets
                        provides those merchants online payment services.`,
            bulletPoints: [
                `CAPS maintains the records of the merchants using Nets online
                services, their agreements with Nets for settlement of Invoices.`,
                `Maintains the records of the transactions and provides the
                merchants regular reports through web app and via email reporting
                services.`
            ]
        };

        this.projects.push(proj1);
        this.projects.push(proj2);
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

    addProject() {
        let project: Experience = {
            title: 'Project title',
            period: 'Period',
            subtitle: 'Project subtitle',
            content: `Enter content here`,
            bulletPoints: [
                ``
            ]
        };
        this.projects.push(project);
    }

    removeProject(i: number) {
        this.projects.splice(i, 1);
    }

    addBullet(i: number) {
        this.projects[i].bulletPoints?.push('');
    }

    removeBullet(i: number, j: number) {
        this.projects[i].bulletPoints?.splice(j, 1);
    }

}
