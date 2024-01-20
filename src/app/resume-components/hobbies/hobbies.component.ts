import { Component, OnInit } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

@Component({
    selector: 'hobbies-component',
    templateUrl: './hobbies.component.html',
    styleUrls: [ './hobbies.component.scss' ]
})
export class HobbiesComponent implements OnInit {

    hobbies: string[] = [];

    isEditMode = false;

    constructor(
        public service: ResumeComponentService
    ) {

    }

    ngOnInit(): void {
        this.staticSetup();
    }

    staticSetup() {
        this.hobbies.push('Reading');
        this.hobbies.push('Drawing');
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

    addHobby() {
        this.hobbies.push('');
    }

    removeHobby(index: number) {
        this.hobbies.splice(index, 1);
    }

}
