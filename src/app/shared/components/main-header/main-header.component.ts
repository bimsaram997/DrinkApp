import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/shared/config-service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  titleheader: string = '';

  constructor(private configService: ConfigService) {}
  ngOnInit() {
    this.configService.getConfig().subscribe((config: any) => {
      this.titleheader = config.header;
    });
  }
}
