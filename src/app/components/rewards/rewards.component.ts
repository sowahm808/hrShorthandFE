import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-rewards',
  imports: [MatCardModule,MatToolbarModule],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.scss'
})
export class RewardsComponent implements OnInit {
  rewards: any = {};

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    // Ensure that your SurveyService has a getRewards() method that calls the rewards API.
    this.surveyService.getRewards().subscribe(data => {
      this.rewards = data;
    });
  }
}
