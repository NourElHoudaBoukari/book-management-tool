import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSpaceRoutingModule } from './user-space-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, AddBookComponent],
  imports: [
    CommonModule,
    UserSpaceRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserSpaceModule { }
