import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
      minWidth: '30%', 
      data: {userID: this.user.uid}
    });
  }
}
