import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/shared/services/book.service';
import { AlertService } from 'src/app/shared/services/alert.service';

export interface Genre {
  name: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  @ViewChild('chipList') chipList: MatChipList;

  bookForm: FormGroup;
  minDate;
  maxDate;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  genres = {
    genres: ['Mystery', 'Sci-Fi']
  }

  constructor(
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {userID: any},
              private bookservice: BookService,
              public dialogRef: MatDialogRef<any>,
              private alertService: AlertService
              ) 
              { 
                  const currentYear = new Date().getFullYear();
                  const currentMonth = new Date().getMonth();
                  const currentDay = new Date().getDate();
                  this.minDate = new Date(currentYear - 1000, 0, 1);
                  this.maxDate = new Date(currentYear, currentMonth, currentDay);

                  this.bookForm=this.fb.group({
                    title: ['', [Validators.required]],
                    author: ['', [Validators.required]],
                    public_date:  [null, [Validators.required]],
                    tags: this.fb.array(this.genres.genres, this.validateArrayNotEmpty)
                  })
  }

  ngOnInit(): void {

    this.bookForm.get('tags').statusChanges.subscribe(
      status => this.chipList.errorState = status === 'INVALID'
    );
  }

  initGenre(genre: string): FormControl {
    return this.fb.control(genre);
  }

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  add(event: MatChipInputEvent, form: FormGroup): void {
    const input = event.input;
    const value = event.value;

    // Add genre
    if ((value || '').trim()) {
      const control = <FormArray>form.get('tags');
      control.push(this.initGenre(value.trim()));
      console.log(control);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(form, index) {
    console.log(form);
    form.get('tags').removeAt(index);
  }

  onSubmit(){

    this.bookservice.addBook(this.data.userID, this.title.value, this.author.value, this.publicDate.value, this.tags.value).then(res => {
      this.dialogRef.close();
      this.alertService.topEndNotif('success', 'Book added successfully.');
  })
  .catch(e => {
      console.log(e);
      this.alertService.alertMessage('error',e.code, e.message);
  });
    

  }

  get title(){
    return this.bookForm.get('title');
  }

  get author(){
    return this.bookForm.get('author');
  }

  get publicDate(){
    return this.bookForm.get('public_date');
  }

  get tags(){
    return this.bookForm.get('tags');
  }


}
