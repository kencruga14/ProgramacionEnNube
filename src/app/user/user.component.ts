import { Component, OnInit } from '@angular/core';
import { AwsService } from 'app/services/aws.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selectedValues: any;
  value3: any;
  imageUrl: any;
  constructor(private s3Service: AwsService) { }

  ngOnInit() {
    this.s3Service.getObjeto('imagen-1702435537925.jpg').then(
      (data) => {
        this.imageUrl = btoa(data.Body);
        console.log("objeto: " + JSON.stringify( this.imageUrl));
      },
      (error) => {
        console.error(error);
      });
  }

  subirImagen() {
    const imagen = document.getElementById('imagen') as HTMLInputElement;
    const file = imagen.files[0];
    try{
    this.s3Service.subirImagen(file).then(
      () => console.log('Imagen subida'),
      error => console.error(error)
    );
    }catch(error){
console.log("error: " +error)
    }
  }

}
