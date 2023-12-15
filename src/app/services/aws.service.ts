import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, from, map,catchError,throwError,pipe } from 'rxjs';
import { S3,GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const contentTypeMap = {
  'image/jpeg': 'image/jpeg',
  'image/png': 'image/png',
  'application/pdf': 'application/pdf',
};
@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private s3Client: S3;
  REGION = 'us-east-2';
  credentials = {
    accessKeyId: 'AKIATHGZBEJMMY44HIP2',
    secretAccessKey: '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',
  };
 

  constructor(private s3: S3) {
    this.s3Client = new S3({
      region: this.REGION,
      credentials: this.credentials,
    });   }

    
    getObjeto(key: string): Promise<any> {
      return this.s3Client.getObject({ Bucket: environment.aws.bucket, Key: key })
        .then(data => {
        console.log("Dataservoe: " + JSON.stringify(data))
          data.Body
        })
        .catch(error => console.error(error));
    }

    // async getObject(objectKey: string) {
    //   const params = {
    //     Bucket: environment.aws.bucket,
    //     Key: objectKey,
    //   };
    //   const data = await this.s3C.getObject(params);
    //   console.log("data: " +JSON.stringify(data))
    //   return data.Body.toString();
    // }

   subirArchivo(archivo: File): Promise<void> {
    const filename = archivo.name;
    const key = `${filename}`;
    const contentType = contentTypeMap[archivo.type];
    const body = new Blob([archivo], { type: archivo.type });

    return this.s3Client.putObject({
      Bucket: environment.aws.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }).then(() => console.log('Imagen subida'))
        .catch(error => console.error(error));
  }

}

