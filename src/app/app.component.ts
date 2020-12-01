import { PersonService } from './person.service';
import { AddPersonComponent } from './add-person/add-person.component';
import { MatDialog } from '@angular/material/dialog';
import { Person } from './entity/person';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [PersonService]
})
export class AppComponent implements OnInit {
	title = 'Persons';
	faEdit = faEdit;
	faTrash = faTrash;
	isNewPerson = true;

	persons: Array<Person> | any;
	statusMessage = "";
	constructor(private serv: PersonService, public dialog: MatDialog) {
		this.persons = new Array<Person>();
	}
	ngOnInit() {
		this.loadPersons();
	}
	//загрузка пользователей
	private loadPersons() {
		this.serv.getPersons().subscribe((result) => {
			this.persons = result;
		});
	}

	// редактирование пользователя
	editPerson(person: Person) {
		this.isNewPerson = false;
		this.openDialog(person);

	}
	// сохраняем пользователя
	addPerson() {
		this.isNewPerson = true;
		this.openDialog();


	}

	// удаление пользователя
	deletePerson(person: Person) {
		this.serv.deletePerson(person.id).subscribe(data => {
			this.statusMessage = 'Данные успешно удалены',
				this.loadPersons();
		});
	}
	openDialog(person: Person = new Person()): void {
		const dialogRef = this.dialog.open(AddPersonComponent, {
			width: '250px',
			data: { firstName: person.firstName, lastName: person.lastName }
		});
		dialogRef.afterClosed().subscribe(res => {

			if (res) {
				if (this.isNewPerson) {
					this.serv.createPerson(res).subscribe(data => {
						this.statusMessage = 'Данные успешно добавлены',
							this.loadPersons();
					});
				}
				else {
					this.serv.updatePerson({ id: person.id, firstName: res.firstName, lastName: res.lastName }).subscribe(data => {
						this.statusMessage = 'Данные успешно обновлены',
							this.loadPersons();
					});
				}
			}
		})
	}

}
