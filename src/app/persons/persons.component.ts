import { PersonModalComponent } from '../person-modal/person-modal.component';
import { PersonService } from '../person.service';
import { MatDialog } from '@angular/material/dialog';
import { Person } from '../entity/person';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  providers: [PersonService],
})
export class PersonsComponent implements OnInit {
  title = 'Persons';
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  isNewPerson = true;
  persons: Array<Person> | any;
  status = {
    message: '',
    importance: '',
  };
  constructor(private serv: PersonService, public dialog: MatDialog) {
    this.persons = new Array<Person>();
  }
  ngOnInit(): void {
    this.loadPersons();
  }

  /**
   * Загрузка пользователей
   */
  private loadPersons(): void {
    this.serv.getPersons().subscribe((result) => {
      this.persons = result;
    });
  }

  /**
   * Редактирует пользователя
   * @param Person - Пользователь
   */
  editPerson(person: Person): void {
    this.isNewPerson = false;
    this.openDialog(person);
  }

  /**
   * Добавляет нового пользователя
   */
  addPerson(): void {
    this.isNewPerson = true;
    this.openDialog();
  }

  /**
   * Удаляет пользователя
   * @param Person - Пользователь
   */
  deletePerson(person: Person): void {
    this.serv.deletePerson(person.id).subscribe(
      (data) => {
        this.status = {
          message: `Сотрудник ${person.firstName} ${person.lastName} успешно удален`,
          importance: 'warn',
        };
        this.loadPersons();
        this.showToast();
      },
      (error) => {
        this.handleError(error);
        this.showToast();
      }
    );
  }

  /**
   * Открывает модальное окно
   * @param Person - Пользователь
   */
  openDialog(person: Person = new Person()): void {
    const dialogRef = this.dialog.open(PersonModalComponent, {
      width: '250px',
      data: {
        person: {
          id: person.id,
          firstName: person.firstName,
          lastName: person.lastName,
        },
        isNewPerson: this.isNewPerson,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.status.importance = 'primary';
        if (this.isNewPerson) {
          this.serv.createPerson(res.person).subscribe(
            (data) => {
              this.status.message = `Сотрудник ${res.person.firstName} ${res.person.lastName} успешно добавлен`;
              this.loadPersons();
            },
            (error) => {
              this.handleError(error);
            }
          );
        } else {
          this.serv.updatePerson(res.person).subscribe(
            (data) => {
              this.status.message = 'Сотрудник изменен';
              this.loadPersons();
            },
            (error) => {
              this.handleError(error);
            }
          );
        }
        this.showToast();
      }
    });
  }

  /**
   * Обработка http error code
   * @param error - Ошибка
   */
  handleError(error: any): void {
    this.status.importance = 'danger';
    switch (error.status) {
      case 404: {
        this.status.message =
          'Такого пользователя нет в системе, обновите страницу и попробуйте снова';
        break;
      }
      case 500: {
        this.status.message = 'Произошла ошибка на сервере';
        break;
      }
      case 400: {
        this.status.message = 'Неверный запрос';
        break;
      }
      default: {
        this.status.message = 'Неизвестная ошибка';
      }
    }
  }
  /**
   * Показывает всплывающее окно
   */
  showToast(): void {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.className = 'show';
    }

    setTimeout(() => {
      if (toast) {
        toast.className = toast.className.replace('show', '');
      }
    }, 3000);
  }
}
