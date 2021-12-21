import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertMessage(icon, title, text){

    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

  topEndNotif(icon, title){
    Swal.fire({
      position: 'top-end',
      title: title,
      icon: icon,
      showConfirmButton: false,
      timer: 2000
    }
    )
  }
}
