import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserComponent } from '../../user/user.component';
import { AwsService } from 'app/services/aws.service';
import { S3 } from '@aws-sdk/client-s3';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {ImageModule} from 'primeng/image';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    CardModule,
    TableModule,
    DialogModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule,
    ImageModule,
    ButtonModule,
    TooltipModule,
  ],
  declarations: [
    UserComponent,
  ],
  providers: [AwsService,S3],

})

export class AdminLayoutModule {}
