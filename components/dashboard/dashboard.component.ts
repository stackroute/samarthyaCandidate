import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { SamProfileCardService } from './../../services/sam-profile-card.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { SamProfileSectionConfigService } from './../../services/sam-profile-section-config.service';
import { Md2Dialog } from 'md2';
// import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ProfileService, SamProfileSectionConfigService, Md2Dialog]
})

export class DashboardComponent implements OnInit {
  profileSections: any[];
  profileData: Object;
  profileCardData: any;
  profileConfig: any;
  profileFormConfig: any;
  profileFormSections: any[];

  constructor(
    private dialog: Md2Dialog,

    // service for getting data for profile sections
    private SamProfileService: ProfileService,

    // Service for getting rendering config of profile sections
    private SamProfileSectionConfigService: SamProfileSectionConfigService,
    // service for providing sam profile card

    private SamProfileCardService: SamProfileCardService
  ) {
    // this will get the data for profile section according to usename
    this.profileData = SamProfileService.getProfileData(JSON.parse(localStorage.getItem('currentUser'))['username']);

    // this will get the data for profile card according to username
    this.profileCardData = SamProfileCardService.getProfileCardData();


    // this will provide all section related info
    this.profileSections = [
      { 'name': 'personalInfo', 'title': 'Personal Informations', 'align': 'row' },
      { 'name': 'qualifications', 'title': 'Educational Qualification', 'align': 'column' },
      // { 'name': 'jobPreferences', 'title': 'Job Preferences', 'align': 'column' },
      { 'name': 'experiences', 'title': 'Experiences', 'align': 'column' },
      { 'name': 'skills', 'title': 'Skills', 'align': 'row' },
      { 'name': 'projects', 'title': 'Projects', 'align': 'column' },
    ];
    this.profileFormSections = [
      { 'name': 'personalInfo', 'title': 'Personal Informations Form', 'align': 'column' },
      { 'name': 'qualification', 'title': 'Educational Qualification', 'align': 'column' },
      { 'name': 'jobPreferences', 'title': 'Job Preferences', 'align': 'column' },
      { 'name': 'experiences', 'title': 'Experiences', 'align': 'column' },
      { 'name': 'skills', 'title': 'Skills', 'align': 'column' },
      { 'name': 'projects', 'title': 'Projects', 'align': 'column' },
    ];
  }

  public currentSectionTitle: string;
  public currentSectionAlign: string;
  public currentSectionName: string;

  // this function will work when clicked on edit btn
  onEdit(dialog: Md2Dialog, sectionName: string) {
    this.profileFormSections.forEach(section => {
      if (section.name === sectionName) {
        this.currentSectionName = sectionName;
        this.currentSectionTitle = section.title;
        this.currentSectionAlign = section.align;
      }
    });
    // this will open dialog box
    dialog.open();
  }

  ngOnInit() {
    // this will get the data for profile config
    this.SamProfileSectionConfigService.getProfileSectionConfig()
      .subscribe((resEmployeeData: any) => this.profileConfig = resEmployeeData);

    // this will get the data for profile form config
    this.SamProfileSectionConfigService.getProfileSectionFormConfig()
      .subscribe((resEmployeeData: any) => this.profileFormConfig = resEmployeeData);

  }

  // this will provide section config for perticular sections for VIEW profile config section
  getSectionConfig(sectionName: string) {
    return this.profileConfig[sectionName];
  }

  // this will provide section config for perticular sections for  FORM profile config section
  getSectionFormConfig(sectionName: string) {
    return this.profileFormConfig[sectionName];
  }

  // this will provide section data for perticular sections from profile service
  getSectiondata(sectionName: string) {
    return this.profileData[sectionName];
  }

  // this function will get form data from child and save it
  onSaveFromData($event: any) {
    console.log($event);
  }
}
