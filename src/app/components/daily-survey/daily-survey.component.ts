import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-daily-survey',
  templateUrl: './daily-survey.component.html',
  styleUrls: ['./daily-survey.component.scss'],
  imports:[CommonModule,MatToolbarModule,ReactiveFormsModule, MatFormFieldModule,MatProgressBarModule]
})
export class DailySurveyComponent implements OnInit {
  surveyForm: FormGroup;
  questions: string[] = [];
  currentQuestionIndex = 0;
  progress = 0;

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {
    this.surveyForm = this.fb.group({
      employee_id: ['', Validators.required],
      survey_date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.surveyService.getSurveyQuestions().subscribe((data: string[]) => {
      this.questions = data;
      // Dynamically add controls for each question.
      this.questions.forEach((q, index) => {
        this.surveyForm.addControl('q' + index, this.fb.control('', Validators.required));
      });
      this.updateProgress();
    });
  }

  next(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateProgress();
    }
  }

  previous(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.updateProgress();
    }
  }

  updateProgress(): void {
    this.progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  goToSummary(): void {
    this.submitSurvey();
  }

  submitSurvey(): void {
    const responses = {};
    this.questions.forEach((q, index) => {
      responses[index] = this.surveyForm.get('q' + index)?.value;
    });

    const payload = {
      employee_id: this.surveyForm.value.employee_id,
      survey_date: this.surveyForm.value.survey_date,
      responses: responses
    };

    this.surveyService.submitSurvey(payload).subscribe(response => {
      console.log('Survey submitted', response);
      // Here you could navigate to a confirmation screen or display a snackbar message.
    });
  }
}
