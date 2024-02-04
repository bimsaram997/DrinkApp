import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../models/drinks/ingredient';
import { Language } from '../../../models/shared/language';
import { DrinkServiceService } from '../../../services/drinks/drink-service.service';
import { ConfigService } from '../../../services/shared/config-service';

@Component({
  selector: 'app-view-drink',
  templateUrl: './view-drink.component.html',
  styleUrls: ['./view-drink.component.css'],
})
export class ViewDrinkComponent implements OnInit {
  drinkId: number;
  subscription: Subscription[] = [];
  drinkItem: any;
  drinkItems: any[] = [];
  ingredients: Ingredient[] = [];
  indgredientImages: string[] = [];
  languages: Language[] = [];
  insutructionList: any[] = [];
  instructions: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private drinkServiceService: DrinkServiceService,
    private configService: ConfigService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.loadConfigData();
    this.route.params.subscribe((params) => {
      const id: number = +params['id'];
      if (id !== null) {
        this.drinkId = id;
        this.loadAlcoholicDrinkById(this.drinkId);
      }
    });
  }

  loadConfigData(): void {
    this.subscription.push(
      this.configService.getConfig().subscribe((config: any) => {
        this.indgredientImages = config.ingredientImages;
        this.languages = config.languages;
      })
    );
  }

  loadAlcoholicDrinkById(id: number): void {
    this.subscription.push(
      this.drinkServiceService
        .getAlcoholicDrinkById(this.drinkId)
        .subscribe((res: any) => {
          this.drinkItem = res.drinks[0];
          this.getInstructions();
          for (let i = 1; i <= 15; i++) {
            const ingredientName = this.drinkItem[`strIngredient${i}`];
            const randomIconIndex = Math.floor(
              Math.random() * this.indgredientImages.length
            );
            const ingredientImage = this.indgredientImages[randomIconIndex];
            if (ingredientName !== null) {
              this.ingredients.push({
                Name: ingredientName,
                Image: ingredientImage,
              });
            }
          }
        })
    );
  }

  getInstructions(): void {
    const languages = [
      { key: 1, lang: 'strInstructions' },
      { key: 2, lang: 'strInstructionsDE' },
      { key: 3, lang: 'strInstructionsES' },
      { key: 4, lang: 'strInstructionsFR' },
      { key: 5, lang: 'strInstructionsIT' },
      { key: 6, lang: 'strInstructionsZH-HANS' },
      { key: 7, lang: 'strInstructionsZH-HAN' }
    ];

    languages.forEach(language => {
      const instruction = this.drinkItem[language.lang];
      if (instruction) {
        this.insutructionList.push({ lang: language.lang, instruction, key: language.key });
      }
    });
  }

  onSelectLangauge(event: any): void {
    this.instructions = [];
    const selectedInstruction = this.insutructionList.find(item => item.key === (+event.value));
    if (selectedInstruction) {
      this.instructions.push(selectedInstruction.instruction);
    } else {
      this.toastr.warning('No instruction found!');
    }
  }


}
