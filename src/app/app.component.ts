import { environment } from './../environments/environment';
import { Person } from './entity/person';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'Persons';

	persons: Array<Person> | any;
	constructor(private http: HttpClient) {
		this.getPerson();
	}

	getPerson() {
		this.http
			.get<Person>(environment.apiUrl + 'persons')
			.subscribe((result) => {
				this.persons = result;
			});
	}
}
