import { Person } from './../entity/person';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
	selector: 'app-person-modal',
	templateUrl: './person-modal.component.html',
	styleUrls: ['./person-modal.component.scss']
})
export class PersonModalComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<PersonModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { person: Person, isNewPerson: boolean }) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
	ngOnInit(): void {
	}


}
