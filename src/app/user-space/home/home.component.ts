import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {  
    this.user=this.authService.getCurrentUser();   
  }

  ngOnInit(): void {
 
  }
}
