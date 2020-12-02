import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PersonModalComponent } from './person-modal/person-modal.component';
import { PersonsComponent } from './persons/persons.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
	declarations: [
		AppComponent,
		PersonModalComponent,
		PersonsComponent,
		ToastComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule

	],

	entryComponents: [],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
