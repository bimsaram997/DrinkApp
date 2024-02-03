import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { ViewDrinkComponent } from './view-drink/view-drink.component';
;


const routes: Routes = [
  { path: '', component: DrinksListComponent },
  { path: 'view/:id', component: ViewDrinkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrinksRoutingModule { }
