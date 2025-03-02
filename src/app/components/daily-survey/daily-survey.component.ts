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
import {Question} from '../../model/Question'
import { Router } from '@angular/router';

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
  questions = signal<Question[]>([]);
  currentQuestionIndex = signal(0);
  progress = computed(() => ((this.currentQuestionIndex() + 1) / this.questions().length) * 100);

  surveyForm: FormGroup;
  responses: { [key: string]: any } = {};

  constructor(
    private fb: FormBuilder, 
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      employee_id: ['', Validators.required],
      survey_date: [new Date().toISOString().split('T')[0], Validators.required],
      answer: ['', Validators.required] // Single control for the current question
    });
  }
  
  ngOnInit(): void {
    this.surveyService.getSurveyQuestions().subscribe((data: any[]) => {
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

    // Ensure `questions` is properly accessed from WritableSignal
    const questionList: Question[] = this.questions(); // ✅ Read Signal correctly

    // Format responses safely
    const formattedResponses = Object.entries(this.responses).map(([index, answer]) => {
        const question = questionList[parseInt(index, 10)]; // Ensure valid index
        if (!question || !question.id) {
            console.warn(`Skipping response at index ${index}: Missing question or question_id`);
            return null;
        }

        return {
            question_id: question.id, // ✅ Ensure `question_id` exists
            answer: answer ?? "" // ✅ Ensure answer is never undefined
        };
    }).filter(response => response !== null); // ✅ Remove any null responses

    // Construct the payload
    const payload = {
        employee_id: parseInt(this.surveyForm.value.employee_id, 10) || Number(localStorage.getItem("employee_id")),
        survey_date: this.surveyForm.value.survey_date || new Date().toISOString().split("T")[0],
        responses: formattedResponses
    };

    console.log("Submitting survey with payload:", JSON.stringify(payload, null, 2));

    this.surveyService.submitSurvey(payload).subscribe(
        response => {
            console.log("Survey submitted successfully:", response);
            this.router.navigate(['/user/thank-you']); // ✅ Redirect to Thank You page

        },
        error => {
            console.error("Survey submission failed:", error);
            alert("Survey submission failed. Please check your answers.");
        }
    );
}

}