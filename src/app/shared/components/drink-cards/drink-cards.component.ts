import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-cards',
  templateUrl: './drink-cards.component.html',
  styleUrls: ['./drink-cards.component.css'],
})
export class DrinkCardsComponent {
  @Input() drinkItem: any;
  constructor(
    private router: Router,
  ) {}

  naviagatetoItem(id: string): void {
    this.router.navigate(['view', +id]);
  }
}
