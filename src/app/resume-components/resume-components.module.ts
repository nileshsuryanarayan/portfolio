import { NgModule } from "@angular/core";
import { ContactComponent } from "./contact/contact.component";
import { CommonModule } from "@angular/common";
import { SkillsComponent } from "./skills/skills.component";
import { LanguageComponent } from "./language/language.component";
import { HobbiesComponent } from "./hobbies/hobbies.component";
import { ExperiencesComponent } from "./experiences/experiences.component";
import { EducationComponent } from "./education/education.component";
import { ProjectsComponent } from "./projects/projects.component";
import { FormsModule } from "@angular/forms";
import { TitleComponent } from "./title/title.component";
import { SummaryComponent } from "./summary/summary.component";
import { ProfilePictureComponent } from "./profile-picture/profile-picture.component";
import { ResumeComponentService } from "./resume-components.service";

@NgModule({
    declarations: [
        ContactComponent,
        SkillsComponent,
        LanguageComponent,
        HobbiesComponent,
        ExperiencesComponent,
        EducationComponent,
        ProjectsComponent,
        TitleComponent,
        SummaryComponent,
        ProfilePictureComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [ ResumeComponentService ],
    exports: [
        ContactComponent,
        SkillsComponent,
        LanguageComponent,
        HobbiesComponent,
        ExperiencesComponent,
        EducationComponent,
        ProjectsComponent,
        TitleComponent,
        SummaryComponent,
        ProfilePictureComponent
    ]
})
export class ResumeComponentsModule {

}
