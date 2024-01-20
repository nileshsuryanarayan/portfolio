import { Component, OnInit } from "@angular/core";
import { Experience } from "../resume-components.model";
import { ResumeComponentService } from "../resume-components.service";

@Component({
    selector: 'experience-component',
    templateUrl: './experiences.component.html',
    styleUrls: [ './experiences.component.scss' ]
})
export class ExperiencesComponent implements OnInit {

    experienceArr: Experience[] = [];

    isEditMode = false;

    constructor(
        public service: ResumeComponentService
    ) {

    }

    ngOnInit(): void {
        this.staticSetup();
    }

    staticSetup() {
        const exp1: Experience = {
            title: 'Associate - Technology (Synechron)',
            period: 'May 2021 - Present',
            subtitle: 'HSBC Bank France - STAR (Finance and Middleware IT)',
            bulletPoints: [
                `Worked with Software architects and business users to re-build a multipage legacy ASP web application into a single page web application, thereby boosting the overall performance of the web application`,
                `Provided additional features of internationalization and SSO further improving user experience`,
                `Automated the code deployment workow using Jenkins CI/CD jobs and Pipeline`,
                `Built a service monitoring dashboard and alerting mechanism to ease the production support for the team`
            ]
        };

        const exp2: Experience = {
            title: 'Software Engineer (LTI)',
            period: 'Jul 2018 - Apr 2021',
            subtitle: 'Nets - CAPS (Cards Acquiring Processing System)',
            bulletPoints: [
                `Worked with Product owners to enhance existing features of web application (built on Servlet-JSP) and add-on functionalities as per user requirement.`,
                `Resolved the Cross-site scripting and CSV Injection security vulnerability in the Web-application.`,
                `Add-on development of SOAP and REST webservices alongwith performance and load testing using JMeter.`
            ]
        };

        this.experienceArr.push(exp1);
        this.experienceArr.push(exp2);
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

    addExperience() {
        let experience: Experience = {
            title: 'Title',
            period: 'Period',
            subtitle: 'Sub-title',
            content: 'Enter content here',
            bulletPoints: [ 'Enter content here' ]
        };
        this.experienceArr.push(experience);
    }

    removeExperience(i: number) {
        this.experienceArr.splice(i, 1);
    }

    addBullet(i: number) {
        this.experienceArr[i].bulletPoints?.push('');
    }

    removeBullet(i: number, j: number) {
        this.experienceArr[i].bulletPoints?.splice(j, 1);
    }

}
