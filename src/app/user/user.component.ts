import { Component, OnInit } from "@angular/core";
import { AwsService } from "app/services/aws.service";

const formatosImagenes = ["jpg", "jpeg", "png", "gif"];

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  archivos: any;
  archivo: any;
  modalImage: Boolean = false;
  constructor(private awsService: AwsService) {}

  ngOnInit() {
    this.listarObjetos();
  }

  listarObjetos() {
    this.awsService.listarObjetos().subscribe(
      (content) => {
        this.archivos = content;
      },
      (err) => {
        console.log("error: " + err.error);
      }
    );
  }

  cargarArchivo() {
    const fileForm = new FormData();
    const archivo = document.getElementById("archivo") as HTMLInputElement;
    const file = archivo.files[0];
    fileForm.append("file", file);
    this.awsService.guardarArhivo(fileForm).subscribe(
      (responde) => {
        console.log("archivo guardado exitosamente:");
        this.listarObjetos();
      },
      (err) => {
        console.log("error al guardar archivo: " + err.error);
      }
    );
  }

  obtenerArchivo(key) {
    this.awsService.obtenerArchivo(key).subscribe(
      (response) => {
        this.visualizar(response);
      },
      (err) => {
        console.log("error al traer archivo: " + err.error);
      }
    );
  }

  visualizar(archivo) {
    if (formatosImagenes.includes(archivo.extension)) {
      this.archivo = archivo.url;
      this.modalImage = true;
    }else if(archivo.extension ==='pdf'){
      window.open(archivo.url, '_blank');
    }else{
      window.open(archivo.url, 'download');
    }
  }

  descargarArchivo(key: string) {
    this.awsService.downloadFileFromS3(key).subscribe((blob) => {
      const contentType = blob.type;
      const file = new File([blob], key, { type: contentType });
      window.open(URL.createObjectURL(file), 'download');
    }, err =>{
      console.log("error al descargar el archivo: " + err.error);
    })
  }
}
