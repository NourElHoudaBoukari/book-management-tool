import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookService } from 'src/app/shared/services/book.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit{

  myBooks: Book[];
  isEmpty=true;

  dataSource = new MatTableDataSource();

  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  user: any;

  displayedColumns: string[] = ['position', 'title', 'author', 'publication date', 'genres'];

  constructor(
          private authservice: AuthService,
          private bookservice: BookService
  ) { 
    this.user=this.authservice.getCurrentUser();
   
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.myBooks);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  ngOnInit(): void {
    this.bookservice.getMyBooks(this.user.uid).subscribe((data)=>{
      this.myBooks=[];
      if(data.length!=0) this.isEmpty=false;
      data.forEach(element => {

        this.myBooks.push(element.payload.doc.data())
        
      });
      this.dataSource = new MatTableDataSource(this.myBooks);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    })
  }

  color(index){
    if(index%3==0) return 'accent';
    else if (index%3==1) return 'gray';
    else return 'primary';
  }

}
