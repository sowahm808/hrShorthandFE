// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { Chart } from 'chart.js';
// import { ReportsService } from '../../services/reports.service';
// import { SurveyService } from '../../services/survey.service';

// @Component({
//   selector: 'app-reports-analytics',
//   templateUrl: './reports-analytics.component.html',
//   styleUrls: ['./reports-analytics.component.scss'],
//   standalone: true,
//   imports: [CommonModule, MatCardModule]
// })
// export class ReportsAnalyticsComponent implements OnInit {
//   constructor(private reportsService: SurveyService) {}

//   ngOnInit(): void {
//     this.reportsService.getSurveyTrends().subscribe(data => {
//       this.createChart(data);
//     });
//   }

//   createChart(data: any) {
//     new Chart('surveyChart', {
//       type: 'bar',
//       data: {
//         labels: data.labels,
//         datasets: [{
//           label: 'Survey Submissions',
//           data: data.counts,
//           backgroundColor: 'blue'
//         }]
//       }
//     });
//   }
// }
