import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddBookComponent } from 'src/app/user-space/add-book/add-book.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  loggedin=false;

  constructor(
    private authservice: AuthService,
    private dialog: MatDialog
  ) {  
    this.user=this.authservice.getCurrentUser();   
  }

  ngOnInit(): void {   
  }

  addBook(){
    this.dialog.open(AddBookComponent, { 
      //height: '80%',//this.dialogHeight,
      minWidth: '30%', //this.dialogWidth,
      data: {userID: this.user.uid}
    });
  }
}
