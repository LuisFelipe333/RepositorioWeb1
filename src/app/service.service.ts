import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private REST_API_SERVER = "http://3.85.166.246/";

  constructor(private httpclient : HttpClient ) { }

  public getProduct(nameEndPoint: String){
    return this.httpclient.get(this.REST_API_SERVER + nameEndPoint);
  }

}
