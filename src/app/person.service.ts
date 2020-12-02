import { Person } from './entity/person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PersonService {
    private url = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getPersons(): Observable<any> {
        return this.http.get(this.url);
    }

    createPerson(person: Person): Observable<any> {
        return this.http.post(this.url, {
            firstName: person.firstName,
            lastName: person.lastName,
        });
    }
    updatePerson(person: Person): Observable<any> {
        return this.http.put(this.url + '/' + person.id, {
            firstName: person.firstName,
            lastName: person.lastName,
        });
    }
    deletePerson(id: number): Observable<any> {
        return this.http.delete(this.url + '/' + id);
    }
}
