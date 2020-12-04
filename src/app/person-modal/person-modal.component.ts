import { Person } from './../entity/person';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent implements OnInit {
  personForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<PersonModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { person: Person; isNewPerson: boolean }
  ) {}
  get firstName(): any {
    return this.personForm.get('firstName');
  }
  get lastName(): any {
    return this.personForm.get('lastName');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.personForm = new FormGroup({
      firstName: new FormControl(this.data.person.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(this.data.person.lastName, [
        Validators.required,
      ]),
    });
  }
  onSubmit(): void {
    this.data.person = {
      id: this.data.person.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
  }
}
