import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: AngularFirestore) { }

  addBook(userId, title, author, publicDate, tags){
    const bookRef = this.firestore.collection(`books`);

    return bookRef.add( {
     userId: userId,
     title: title,
     author: author,
     publication_date: publicDate,
     genres: tags
   })
  }
}
