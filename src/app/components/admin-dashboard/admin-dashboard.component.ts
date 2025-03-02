import { Constructor } from './../../../../node_modules/@angular/cdk/schematics/update-tool/migration.d';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';  // Fix: Import MatIconModule
import { MatListModule } from '@angular/material/list'; // Fix: Import MatListModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, // Fix: Explicitly declare as a standalone component
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule, // Fix: Import as module
    MatListModule  // Fix: Import as module
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'] // Fix: Correct plural name
})
export class AdminDashboardComponent  implements OnInit{
  isSidebarOpen = true; // Controls sidebar toggle

  Constructor( ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
