import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  confirmButtonColor='#160945';

  constructor() { }

  alertMessage(icon, title, text){

    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: this.confirmButtonColor
    });
  }

  topEndNotif(icon, title){
    Swal.fire({
      position: 'top-end',
      title: title,
      icon: icon,
      width: '400px',
      showConfirmButton: false,
      timer: 2000
    }
    )
  }
}
