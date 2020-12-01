import { Person } from './../entity/person';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-add-person',
	templateUrl: './add-person.component.html',
	styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<AddPersonComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Person) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
	ngOnInit(): void {
	}

}
