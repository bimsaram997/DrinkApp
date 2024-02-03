import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DrinkServiceService } from '../../../services/drinks/drink-service.service';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfigService } from '../../../services/shared/config-service';
import { DrinkList } from '../../../models/drinks/drinkList';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.css'],
})
export class DrinksListComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  drinkItems: DrinkList[] = [];
  dataSource: MatTableDataSource<DrinkList>;
  obs: Observable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  indgredients: string[] = [];
  categories: string[] = [];
  is: boolean = false;
  glasses: string[] = [];
  constructor(
    private router: Router,
    private drinkServiceService: DrinkServiceService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.loadConfigData();
    this.loadDrinks();
  }

  loadConfigData(): void {
    this.subscription.push(
      this.configService.getConfig().subscribe((config: any) => {
        this.indgredients = config.ingredients;
        this.categories = config.categories;
        this.glasses = config.glasses;
      })
    );
  }

  loadDrinks(): void {
    this.subscription.push(
      this.drinkServiceService.getAlcoholicDrinks().subscribe((res: any) => {
        this.drinkItems = res.drinks;
        this.dataSource = new MatTableDataSource(this.drinkItems);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      })
    );
  }

  navigateToEditFoodItem() {
    this.router.navigate(['view']);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
