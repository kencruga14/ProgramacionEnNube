import { Component, OnInit } from "@angular/core";
import { S3  } from '@aws-sdk/client-s3';
import { environment } from "environments/environment";
import { AwsService } from "app/services/aws.service";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  objects: any;
  imageUrl: any;
  objectContent: string | null;
  params = {
    Bucket: environment.aws.bucket,
  };

  constructor(private s3: S3, private awsService: AwsService) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: environment.aws.accessKeyId,
        secretAccessKey: environment.aws.secretAccessKey,
      },
      region: environment.aws.region,
    });
  }

   ngOnInit() {
   this.listarObjetos();
this.obtenerArhivo();
    //  this.awsService.getObjeto("imagen-1702435537925.jpg").subscribe(
    //   (data) => {
    //     console.log("Data: " + JSON.stringify(data))
    //     this.imageUrl = data.Body.toString("base64");
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

  }

  obtenerArhivo(){

    this.awsService
      .getObjeto('imagen-1702435537925.jpg')
      .then((content) => {
        console.log("content: " + JSON.stringify(content))
        this.objectContent = content.Body.toString("base64");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  listarObjetos(){
    this.s3.listObjectsV2(this.params).then(response => {
      this.objects = response.Contents;
    });
  }

  subirArchivo() {
    const archivo = document.getElementById("archivo") as HTMLInputElement;
    const file = archivo.files[0];
    try {
      this.awsService.subirArchivo(file).then(
        () => console.log("archivo subido"),
        (error) => console.error(error)
      );
    } catch (error) {
      console.log("error: " + error);
    }
  }

}
