import { Injectable } from '@angular/core';
import { S3  } from 'aws-sdk';
import { environment } from 'environments/environment';
import { Observable, from, map,catchError,throwError,pipe } from 'rxjs';
import { ListObjectsV2Command,S3Client } from '@aws-sdk/client-s3';
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
 
  client = new S3Client({});


  constructor() {
    this.s3Client = new S3({
      region: this.REGION,
      credentials: this.credentials,
    });   }

  //  getObjeto(key: string): Observable<any> {
  //   return this.s3Client.getObject({ Bucket: environment.aws.bucket, Key: key }).promise()
  //   .then(data => {
  //     return data.Body['data'];
  //   })      .catch(error => console.error(error));
  // }

  getObjeto(key: string): Observable<any> {
    return from(this.s3Client.getObject({ Bucket: environment.aws.bucket, Key: key }).promise());
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

  listBucketObjects(): Promise<S3.Object[]> {
    const command = new ListObjectsV2Command({
      Bucket: environment.aws.bucket,
      MaxKeys: 1000,
    });
    let  a = this.client.send(command)
    .then(response => {
      console.log("Response:", response); // Added this line
      const objects = response.Contents;
      let isTruncated = response.IsTruncated;
      let nextToken = response.NextContinuationToken;
      return objects;
    });
    console.log("aaa: " + JSON.stringify(a))
    return this.client.send(command)
      .then(response => {
        const objects = response.Contents;
        let isTruncated = response.IsTruncated;
        let nextToken = response.NextContinuationToken;
        return objects;
      });
  }

  async listBucketObjects1(bucketName: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 1000, // Adjust as needed
    });
  
    let isTruncated = true;
    let contents = "";
  
    try {
      while (isTruncated) {
        const { Contents, IsTruncated, NextContinuationToken } = await this.client.send(command);
        const contentsList = Contents.map((c) => c.Key); // Extract just the keys
        contents += contentsList.join("\n") + "\n";
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      return contents.trim().split("\n"); // Return an array of object keys
    } catch (err) {
      throw err;
    }
  }
}

