import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'personalInfo-form',
  templateUrl: './personalInfoForm.component.html',
  styleUrls: ['./personalInfoForm.component.css']
})
export class PersonalInfoForm implements OnInit {

  public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public emailId = '';
  public loading = false;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    public dialogRef: MdDialogRef<PersonalInfoForm>
  ) {
    this.userForm = fb.group({
      name: [this.dialogRef.config.data.name, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      email: [this.dialogRef.config.data.email, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      altemail: [this.dialogRef.config.data.altemail, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      mob: [this.dialogRef.config.data.contact['I'], [Validators.required, Validators.pattern('[0-9]{10}')]],
      phone: [this.dialogRef.config.data.contact['II'], [Validators.required, Validators.pattern('[0-9]{10}')]],
      district: [this.dialogRef.config.data.address['district'], [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      state: [this.dialogRef.config.data.address['state'], [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      dob: [this.dialogRef.config.data.dob, Validators.required],
      aadhar: [this.dialogRef.config.data.identity['aadhar'], [Validators.required, Validators.pattern('[0-9]{12}')]],
      pincode: [this.dialogRef.config.data.address['pincode'], [Validators.required, Validators.pattern('[0-9]{6}')]],

    });
  }

  ngOnInit() {
    console.log(this.dialogRef.config.data);

  }

  onSave() {

    let personalInfoData = this.dialogRef.config.data;
    personalInfoData.name = this.userForm.value.name;
    personalInfoData.email = this.userForm.value.email;
    personalInfoData.altemail = this.userForm.value.altemail;
    personalInfoData.contact.I = this.userForm.value.mob;
    personalInfoData.contact.II = this.userForm.value.phone;
    personalInfoData.address.district = this.userForm.value.district;
    personalInfoData.address.state = this.userForm.value.state;
    personalInfoData.address.pincode = this.userForm.value.pincode;
    personalInfoData.identity.aadhar = this.userForm.value.aadhar;
    personalInfoData.dob = this.userForm.value.dob;

    console.log(personalInfoData)
    // console.log(this.userForm.value);
  }
}

