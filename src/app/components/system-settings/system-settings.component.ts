import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
  ]
})



export class SystemSettingsComponent implements OnInit {
  settings: any = {};

  //constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    // this.settingsService.getSettings().subscribe(data => {
    this.settings = {
      app_name:'HRR SHORTHAND',
      max_survey: 'survey'
    }//data;
    // });
  }

  saveSettings(): void {
    // this.settingsService.updateSettings(this.settings).subscribe(() => {
    //   alert('Settings updated successfully!');
    // });
  }
}
