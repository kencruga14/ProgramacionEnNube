import { Injectable } from '@angular/core';
// import { S3  } from 'aws-sdk';
import { environment } from 'environments/environment';
import { Observable, from, map,catchError,throwError,pipe } from 'rxjs';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { S3 } from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  //private s3Client: S3;
  // objects: S3.ListObjectsOutput;
  // REGION = 'us-east-2';
  // credentials = {
  //   accessKeyId: 'AKIATHGZBEJMMY44HIP2',
  //   secretAccessKey: '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',
  // };
 
  // client = new S3Client({});


  // constructor(private s3: S3) {
  //   this.s3Client = new S3({
  //     region: this.REGION,
  //     credentials: this.credentials,
  //   });   }

  //  getObjeto(key: string): Observable<any> {
  //   return this.s3Client.getObject({ Bucket: environment.aws.bucket, Key: key }).promise()
  //   .then(data => {
  //     return data.Body['data'];
  //   })      .catch(error => console.error(error));
  // }

  // getObjeto(key: string): Observable<any> {
  //   return from(this.s3Client.getObject({ Bucket: environment.aws.bucket, Key: key }).promise());
  // }


  // subirImagen(imagen: File): Promise<void> {
  //   const key = `imagen-${Date.now()}.jpg`;
  //   const body = new Blob([imagen], { type: 'image/jpg' });

  //   return this.s3Client.putObject({
  //     Bucket: environment.aws.bucket,
  //     Key: key,
  //     Body: body
  //   }).promise()
  //     .then(() => console.log('Imagen subida'))
  //     .catch(error => console.error(error));
  // }



}

