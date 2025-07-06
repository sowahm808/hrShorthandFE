import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule]
})
export class ThankYouComponent {
  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/user/dashboard']); // ✅ Redirect to dashboard or another page
  }
}
