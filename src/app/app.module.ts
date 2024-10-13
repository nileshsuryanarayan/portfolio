import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResumeComponentsModule } from './resume-components/resume-components.module';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CssGridTreeComponent } from './family-tree/css-grid-tree/css-grid-tree.component';
import { CdkHierarchyComponent } from './family-tree/cdk-hierarchy/cdk-hierarchy.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    TemplateComponent,
    FamilyTreeComponent,
    CssGridTreeComponent,
    CdkHierarchyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResumeComponentsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
