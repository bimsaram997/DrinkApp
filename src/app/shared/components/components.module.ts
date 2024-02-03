import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MainHeaderComponent } from './main-header/main-header.component';
import { DrinkCardsComponent } from './drink-cards/drink-cards.component';

@NgModule({
  declarations: [MainHeaderComponent, DrinkCardsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MainHeaderComponent, DrinkCardsComponent],
})
export class ComponentsModule {}
