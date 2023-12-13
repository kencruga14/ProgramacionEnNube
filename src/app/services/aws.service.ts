import { Injectable } from '@angular/core';
import { S3 } from 'aws-sdk';
import { environment } from 'environments/environment';
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
 
  constructor() {
    this.s3Client = new S3({
      region: this.REGION,
      credentials: this.credentials,
    });   }

   getObjeto(key: string): Promise<any> {
    return this.s3Client.getObject({ Bucket: environment.aws.bucket, Key: key }).promise()
      .then(data => data.Body)
      .catch(error => console.error(error));
  }

  subirImagen(imagen: File): Promise<void> {
    const key = `imagen-${Date.now()}.jpg`;
    const body = new Blob([imagen], { type: 'image/jpg' });

    return this.s3Client.putObject({
      Bucket: environment.aws.bucket,
      Key: key,
      Body: body
    }).promise()
      .then(() => console.log('Imagen subida'))
      .catch(error => console.error(error));
  }
}
