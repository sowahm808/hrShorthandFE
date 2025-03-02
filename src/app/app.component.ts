import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hr-shorthandFE';
}
