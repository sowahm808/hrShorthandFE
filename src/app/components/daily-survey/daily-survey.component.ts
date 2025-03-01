import { Component, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-daily-survey',
  templateUrl: './daily-survey.component.html',
  styleUrls: ['./daily-survey.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class DailySurveyComponent implements OnInit {
  // Using Signals for state management
  questions = signal<string[]>([]);
  currentQuestionIndex = signal(0);
  progress = computed(() => ((this.currentQuestionIndex() + 1) / this.questions().length) * 100);

  surveyForm: FormGroup;
  responses: { [key: string]: any } = {};

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {
    this.surveyForm = this.fb.group({
      employee_id: ['', Validators.required],
      survey_date: [new Date().toISOString().split('T')[0], Validators.required],
      answer: ['', Validators.required] // Single control for the current question
    });
  }

  ngOnInit(): void {
    this.surveyService.getSurveyQuestions().subscribe((data: string[]) => {
      this.questions.set(data);
    });
  }

  next(): void {
    // Save current answer before moving to the next question
    this.saveCurrentAnswer();

    if (this.currentQuestionIndex() < this.questions().length - 1) {
      this.currentQuestionIndex.update(value => value + 1);
      this.loadCurrentAnswer(); // Load the saved answer if it exists
    }
  }

  previous(): void {
    this.saveCurrentAnswer();

    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update(value => value - 1);
      this.loadCurrentAnswer(); // Load the saved answer if it exists
    }
  }

  // Save the current answer to the responses object
  saveCurrentAnswer(): void {
    const currentIndex = this.currentQuestionIndex();
    this.responses[currentIndex] = this.surveyForm.value.answer;
  }

  // Load the saved answer (or empty if not answered yet)
  loadCurrentAnswer(): void {
    const currentIndex = this.currentQuestionIndex();
    const savedAnswer = this.responses[currentIndex] || '';
    this.surveyForm.patchValue({ answer: savedAnswer });
  }

  goToSummary(): void {
    this.submitSurvey();
  }

  submitSurvey(): void {
    // Save the last question's answer
    this.saveCurrentAnswer();
  
    const payload = {
      employee_id: parseInt(this.surveyForm.value.employee_id, 10), // Convert to integer
      survey_date: this.surveyForm.value.survey_date,
      responses: this.responses
    };
  
    this.surveyService.submitSurvey(payload).subscribe(response => {
      console.log('Survey submitted', response);
      alert('Survey submitted successfully!');
    });
  }
  
}
