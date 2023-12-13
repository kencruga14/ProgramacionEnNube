import { Component, OnInit } from "@angular/core";
import { AwsService } from "app/services/aws.service";
import { S3 } from "aws-sdk";
import { ListObjectsV2Command,S3Client } from '@aws-sdk/client-s3';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  selectedValues: any;
  value3: any;
  imageUrl: any;
  constructor(private s3Service: AwsService,private s3: S3Client) {}

  async ngOnInit() {
    // this.s3Service.getObjeto("imagen-1702435537925.jpg").subscribe(
    //   (data) => {
    //     this.imageUrl = data.Body.toString("base64");
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    
    const objects = await this.s3Service.listBucketObjects1('awsunibe');
    for (const object of objects) {
      console.log(object);
    }
  }

  subirImagen() {
    const imagen = document.getElementById("imagen") as HTMLInputElement;
    const file = imagen.files[0];
    try {
      this.s3Service.subirImagen(file).then(
        () => console.log("Imagen subida"),
        (error) => console.error(error)
      );
    } catch (error) {
      console.log("error: " + error);
    }
  }
}
