import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: AngularFirestore) { }

  addBook(book: Book){
    const bookRef = this.firestore.collection(`books`);

    return bookRef.add( {
     userId: book.userId,
     title: book.title,
     author: book.author,
     publication_date: book.publicDate,
     genres: book.genres,
     created_at: book.created_at
   })
  }

  getMyBooks(userId){
    return this.firestore.collection<Book>('books', ref => ref.where('userId', '==', userId)).snapshotChanges();
  }
}
