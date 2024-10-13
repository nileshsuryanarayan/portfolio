import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';

const routes: Routes = [
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'template-1', component: TemplateComponent },
  { path: 'family-tree', component: FamilyTreeComponent },
  { path: '**', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
