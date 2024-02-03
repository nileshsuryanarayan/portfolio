import { Component, OnInit } from "@angular/core";
import { ResumeComponentService } from "../resume-components.service";

interface Skill {
    skill: string;
    score: number;
    value: number;
}

@Component({
    selector: 'skills-component',
    templateUrl: './skills.component.html',
    styleUrls: [ './skills.component.scss' ]
})
export class SkillsComponent implements OnInit {

    skills: Skill[] = [];

    isEditMode = false;

    meterClass: string = 'meter ';
    meterValues: string[] = [];

    constructor(
        public service: ResumeComponentService
    ) {
        
    }

    ngOnInit(): void {
        this.staticSetup();
    }

    staticSetup() {
        const skill1: Skill = { skill: 'Java', score: 8, value: 80 };
        const skill2: Skill = { skill: 'Angular', score: 8, value: 80 };
        const skill3: Skill = { skill: 'Spring, Spring-boot', score: 8, value: 80 };
        const skill4: Skill = { skill: 'Devops (Jenkins, Ansible)', score: 6, value: 60 };
        const skill5: Skill = { skill: 'Scripting language (Shell, Groovy, Ansible)', score: 4, value: 40 };
        const skill6: Skill = { skill: 'Version Control (Git)', score: 8, value: 80 };
        const skill7: Skill = { skill: 'IDEs (Sts4, VS Code, Eclipse)', score: 6, value: 60 };

        this.skills.push(skill1);
        this.skills.push(skill2);
        this.skills.push(skill3);
        this.skills.push(skill4);
        this.skills.push(skill5);
        this.skills.push(skill6);
        this.skills.push(skill7);

        this.updateSkillClasses();
    }

    editClicked() {
        this.isEditMode = true;
    }

    saveChanges() {
        this.skills.forEach(skill => {
            skill.value = skill.score * 10;
            this.updateSkillClasses();
        });
        this.isEditMode = false;
    }

    addNewSkill() {
        let skill: Skill = { skill: '', score: 0, value: 0 };
        this.skills.push(skill);
    }

    removeSkill(index: number) {
        this.skills.splice(index, 1);
    }

    updateSkillClasses() {
        for(let i=0; i < this.skills.length; i++) {
            let gridCol = this.calculateGridCol(this.skills[i].score);
            this.meterValues[i] = this.meterClass + 'grid-' + gridCol;
        }
    }

    calculateGridCol(score: number): number {
        let num: number = (score * 12) / 10;
        return Math.floor(num);
    }

}
