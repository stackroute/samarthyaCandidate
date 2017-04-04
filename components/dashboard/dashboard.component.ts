import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { SamProfileCardService } from './../../services/sam-profile-card.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { SamProfileSectionConfigService } from './../../services/sam-profile-section-config.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PersonalInfoForm } from './../profileSectionForm/personalInfoForm/personalInfoForm.component';
import { JobPreferenceInfoForm } from './../profileSectionForm/jobPreferenceForm/jobPreferenceForm.component';

// import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ProfileService, SamProfileSectionConfigService]
})

export class DashboardComponent implements OnInit {
  profileSections: any[];
  profileData: Object;
  profileCardData: any;
  profileConfig: any;
  profileFormConfig: any;
  profileFormSections: any[];

  constructor(
    public dialog: MdDialog,

    // service for getting data for profile sections
    private SamProfileService: ProfileService,

    // Service for getting rendering config of profile sections
    private SamProfileSectionConfigService: SamProfileSectionConfigService,

    // service for providing sam profile card
    private SamProfileCardService: SamProfileCardService
  ) {
    // this will provide all section related info
    this.profileSections = [
      { 'name': 'personalInfo', 'title': 'Personal Informations', 'align': 'row' },
      { 'name': 'qualifications', 'title': 'Educational Qualification', 'align': 'column' },
      // { 'name': 'jobPreferences', 'title': 'Job Preferences', 'align': 'column' },
      { 'name': 'experiences', 'title': 'Experiences', 'align': 'column' },
      { 'name': 'skills', 'title': 'Skills', 'align': 'row' },
      { 'name': 'projects', 'title': 'Projects', 'align': 'column' },
    ];
  }

  public currentSectionTitle: string;
  public currentSectionAlign: string;
  public currentSectionName: string;
  public personalInfoData: {} = {};
    public jobpreferenceInfoData: {} = {};

  // this function will work when clicked on edit btn
  onEdit(sectionName: string) {
    console.log(sectionName)
    switch (sectionName) {
      case 'personalInfo': this.openPersonalInfoDialog();
      case 'projects':this.openJobPrefereneceInfoDialog();
    }
  }

  openPersonalInfoDialog() {
    let dialogRef = this.dialog.open(PersonalInfoForm, {
      height: '80%',
      // width:'100%',
      data: this.personalInfoData
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }
  openJobPrefereneceInfoDialog() {
    let dialogRef = this.dialog.open(JobPreferenceInfoForm, {
      height: '80%',
      width:'80%',
      data: this.jobpreferenceInfoData
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  ngOnInit() {
    // this will get the data for profile config
    this.SamProfileSectionConfigService.getProfileSectionConfig()
      .subscribe((resEmployeeData: any) => this.profileConfig = resEmployeeData);

    // this will get the data for profile form config
    this.SamProfileSectionConfigService.getProfileSectionFormConfig()
      .subscribe((resEmployeeData: any) => this.profileFormConfig = resEmployeeData);

    this.SamProfileService.getProfile(JSON.parse(localStorage.getItem('currentUser'))['username'])
      .subscribe((resEmployeeData: any) => {this.profileData = resEmployeeData,this.jobpreferenceInfoData=resEmployeeData.jobPreferences, this.personalInfoData = resEmployeeData.personalInfo });

    this.SamProfileCardService.getProfileCard(JSON.parse(localStorage.getItem('currentUser'))['username'])
      .subscribe((resEmployeeData: any) => { this.profileCardData = resEmployeeData });
  }

  // this will provide section config for perticular sections for VIEW profile config section
  getSectionConfig(sectionName: string) {
    return this.profileConfig[sectionName];
  }

  // this will provide section data for perticular sections from profile service
  getSectiondata(sectionName: string) {
    return this.profileData[sectionName];
  }

}
