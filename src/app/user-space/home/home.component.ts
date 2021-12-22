import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from 'src/app/user-space/add-book/add-book.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
      trigger('slidedown', [
          transition('void => *', [
              style({transform: 'translateY(-100%)'}),
              animate('0.5s')
          ])
          
      ])
  ]
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
