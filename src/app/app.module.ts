import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResumeComponentsModule } from './resume-components/resume-components.module';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResumeComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
