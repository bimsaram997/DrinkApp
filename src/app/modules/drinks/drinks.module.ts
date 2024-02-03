import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { DrinksRoutingModule } from './drinks-routing.modules';
import { ViewDrinkComponent } from './view-drink/view-drink.component';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  declarations: [DrinksListComponent, ViewDrinkComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DrinksRoutingModule,
    ComponentsModule,
  ],
})
export class DrinksModule {}
