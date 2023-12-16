import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AwsService {
 constructor(private http: HttpClient) { }

  guardarArhivo(file: FormData) {
    return this.http.post(environment.urlBackend + 'archivo', file);
  }

  listarObjetos(): Observable<any[]> {
    return this.http.get<any[]>(environment.urlBackend +'archivos')
    .pipe(
      map(objects => objects.map(object => object)),
    );
  }

  obtenerArchivo(key):any{
    return this.http.get(environment.urlBackend +'archivos/'+key).pipe(
      map(objects => objects)
    );
  }

  downloadFileFromS3(key):any {
    return this.http.get(environment.urlBackend +'descargarArchivo/'+key, { responseType: 'blob' as 'json' });
  }
}