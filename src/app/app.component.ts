import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-management-tool';
  loggedin: Boolean;

  constructor(
    private authservice: AuthService
  ){}

  ngOnInit(): void {

    this.authservice.isLoggedIn().subscribe((res)=>{this.loggedin=res});
      
  }

  logout(){
    this.authservice.signOut();
  }

}
