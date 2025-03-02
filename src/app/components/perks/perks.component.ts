import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PerksService } from '../../services/perks.service';

@Component({
  selector: 'app-perks',
  templateUrl: './perks.component.html',
  styleUrls: ['./perks.component.scss'],
  imports:[
    CommonModule
  ]
})
export class PerksComponent implements OnInit {
  perks: any[] = [];

  constructor(private perksService: PerksService) {}

  ngOnInit(): void {
    this.loadPerks();
  }

  loadPerks(): void {
    this.perksService.getPerks().subscribe(
      (data) => {
        // Assuming the response format: { perks: [ ... ] }
        this.perks = data.perks;
        console.log('Perks:', this.perks);
      },
      (error) => {
        console.error('Error loading perks:', error);
      }
    );
  }
}
