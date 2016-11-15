import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { SkillDetailComponent } from './skill-detail.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        SkillDetailComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }