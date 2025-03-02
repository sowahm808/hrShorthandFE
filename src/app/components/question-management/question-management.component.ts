import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { CommonModule } from '@angular/common';

// Angular Material modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class QuestionManagementComponent implements OnInit {
  questionForm: FormGroup;
  questions: any[] = [];
  editing: boolean = false;
  currentQuestionId: number | null = null;
  questions$!: Observable<any[]>;

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {
    this.questionForm = this.fb.group({
      text: ['', Validators.required],
      type: ['text', Validators.required],
      is_required: [true],
      order: [null]
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
    //this.questions$ = this.surveyService.getSurveyQuestions();

  }

  /**
   * Fetch questions from the backend
   */
  // loadQuestions(): void {
  //   this.surveyService.getSurveyQuestions().subscribe(data => {
  //     // this.questions = data;
  //     this.questions = data.data || data;

  //   });
  // }
  loadQuestions(): void {
    this.surveyService.getSurveyQuestions().subscribe((data: any[]) => {
      console.log("Fetched Questions:", data);
      // Ensure response is an array of objects, not just text
      if (Array.isArray(data) && typeof data[0] === 'string') {
        this.questions = data.map((text, index) => ({
          id: index, // Temporary id
          text: text,
          type: 'text', // Default type if missing
          is_required: true, // Default required
          order: index + 1 // Temporary order
        }));
      } else {
        this.questions = data; // If response is already an object, use it directly
      }
    }, error => {
      console.error("Error fetching questions:", error);
    });
  }
  
  /**
   * Add or Update Question
   */
  submitQuestion(): void {
    if (this.questionForm.valid) {
      if (this.editing && this.currentQuestionId !== null) {
        // Update existing question
        // this.updateQuestion(this.currentQuestionId);
        this.updateQuestion();

      } else {
        // Add new question
        this.addQuestion();
      }
    }
  }

  /**
   * Add a new question
   */
  addQuestion(): void {
    this.surveyService.addQuestion(this.questionForm.value).subscribe(response => {
      this.questions.push(response.question);
      this.questionForm.reset();
      this.questionForm.patchValue({ type: 'text', is_required: true }); // Reset to defaults
    });
  }

  /**
   * Populate form with question details for editing.
   */
  editQuestion(question: any): void {
    this.editing = true;
    this.currentQuestionId = question.id;
    this.questionForm.patchValue({
      text: question.text,
      type: question.type,
      is_required: question.is_required,
      order: question.order
    });
  }

  /**
   * Update an existing question
   */
  // updateQuestion(id: number): void {
  //   this.surveyService.updateQuestion(id, this.questionForm.value).subscribe(response => {
  //     this.loadQuestions(); // Reload questions after update
  //     this.cancelEdit();
  //   });
  // }
  updateQuestion(): void {
    if (!this.currentQuestionId) return;
  
    this.surveyService.updateQuestion(this.currentQuestionId, this.questionForm.value).subscribe(response => {
      console.log('Updated successfully:', response);
      this.loadQuestions();  // Refresh list after update
      this.cancelEdit();     // Reset form
    }, error => {
      console.error('Update failed:', error);
    });
  }
  

  /**
   * Delete question
   */
  deleteQuestion(id: number): void {
    this.surveyService.deleteQuestion(id).subscribe(() => {
      this.questions = this.questions.filter(q => q.id !== id);
    });
  }

  /**
   * Cancel editing mode
   */
  cancelEdit(): void {
    this.editing = false;
    this.currentQuestionId = null;
    this.questionForm.reset();
    this.questionForm.patchValue({ type: 'text', is_required: true }); // Reset to defaults
  }

 

  /**
   * Reset form to default values.
   */
  resetForm(): void {
    this.questionForm.reset({
      text: '',
      type: 'text',
      is_required: true,
      order: null
    });
    this.editing = false;
    this.currentQuestionId = null;
  }
}
