import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DrinkServiceService } from '../../../services/drinks/drink-service.service';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfigService } from 'src/app/services/shared/config-service';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.css'],
})
export class DrinksListComponent implements OnInit {
  subscription: Subscription[] = [];
  drinkItems: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['your_columns']; // Replace with actual column names
  obs: Observable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  indgredients: string[] = [];
  categories: string[] = [];
  is: boolean = false;
  glasses: any;
  constructor(
    private router: Router,
    private drinkServiceService: DrinkServiceService,
    private changeDetectorRef: ChangeDetectorRef,
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
}
