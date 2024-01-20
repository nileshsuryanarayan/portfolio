import { Component, OnInit } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

interface Language {
    name: string;
    score: number;
}

@Component({
    selector: 'language-component',
    templateUrl: './language.component.html',
    styleUrls: [ './language.component.scss' ]
})
export class LanguageComponent implements OnInit {

    languages: Language[] = [];

    isEditMode = false;

    constructor(
        public service: ResumeComponentService
    ) {}

    ngOnInit(): void {
        this.staticSetup();
    }

    staticSetup() {
        const lang1: Language = { name: 'English', score: 4 };
        const lang2: Language = { name: 'Hindi', score: 4 };
        const lang3: Language = { name: 'Marathi', score: 4 };

        this.languages.push(lang1);
        this.languages.push(lang2);
        this.languages.push(lang3);
    }

    isCircleFilled(circleNum: number, index: number): boolean {
        return this.languages[index].score >= circleNum;
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.isEditMode = false;
    }

    addLanguage() {
        const language: Language = { name: '', score: 0 };
        this.languages.push(language);
    }

    removeLanguage(index: number) {
        this.languages.splice(index, 1);
    }

}
