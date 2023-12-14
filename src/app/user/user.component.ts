import { Component, OnInit } from "@angular/core";
import { S3 } from '@aws-sdk/client-s3';
import { from,map } from "rxjs";
import { environment } from "environments/environment";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  objects: any;

  constructor(private s3: S3) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: environment.aws.accessKeyId,
        secretAccessKey: environment.aws.secretAccessKey,
      },
      region: environment.aws.region,
    });
  }

  ngOnInit() {
    const params = {
      Bucket: environment.aws.bucket,
    };

    this.objects = from(this.s3.listObjectsV2(params)).pipe(
      map((response) => {
        console.log("ASDSA: " + JSON.stringify(response))
      }),
    );
   console.log("size: " + JSON.stringify(this.objects))
  }

}
