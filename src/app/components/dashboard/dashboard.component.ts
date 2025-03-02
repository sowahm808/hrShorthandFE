import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule,MatToolbarModule, MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  analytics: any = {};

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getDashboardData().subscribe(data => {
      this.analytics = data;
    });
  }
}
