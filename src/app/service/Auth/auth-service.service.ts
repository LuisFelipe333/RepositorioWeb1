  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  //api: String = 'http://localhost:8000/';
  api: String = 'https://backweb-ids.herokuapp.com/';

  constructor( private http: HttpClient ) { }

  isAuthenticated (): boolean {
    let user = JSON.parse(localStorage.getItem('user')); //Pediente user
    if (user){
      return user['token']? true : false //Pediente token
    } else {
      return false
    }
  }

  login(username : string, password: string) : Observable<any> {
    const httpOptions =  {
      headers : new HttpHeaders ({
        'Content-Type' : 'application/json',
      })
    };
    return this.http.post(`${this.api}api/v1/login/`, {username, password}, httpOptions);
  }

  getListUser() : Observable<any>{
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user['token']);

    const httpOptions ={
      headers : new HttpHeaders({
        'Content-Type' : 'Application/json',
        'Authorization' : `Token ${user['token']}`
      })
    }

    console.log(httpOptions.headers);
    return this.http.get(`${this.api}api/v1/profile/userData_get/`,httpOptions)

  }

  postUser(name : String, lastName : String, age : Number, address : String){

    const userPost = JSON.parse(localStorage.getItem('user'));
    const httpOptions ={
      headers : new HttpHeaders({
        'Content-Type' : 'Application/json',
        'Authorization' : `Token ${userPost['token']}`
      })
    }

    this.http.post(`${this.api}api/v1/profile/userData_url/`,{name,lastName,age,address},httpOptions).subscribe((response:[])=>{
      if(response !=null){
        this.getListUser();
      }
    })
  }

  putUser(id:Number,name : String, lastName : String, age : Number, address : String){

    console.log("id: "+ id);
    
    const userPut = JSON.parse(localStorage.getItem('user'));
    const httpOptions ={
      headers : new HttpHeaders({
        'Content-Type' : 'Application/json',
        'Authorization' : `Token ${userPut['token']}`
      })
    }

    this.http.put(`${this.api}api/v1/profile/userData_put/${id}`,{name,lastName,age,address},httpOptions).subscribe((response:[])=>{
      if(response !=null){
        this.getListUser();
      }
    })
  }

  deleteUser(id:Number){
      const deletePut = JSON.parse(localStorage.getItem('user'));
    const httpOptions ={
      headers : new HttpHeaders({
        'Content-Type' : 'Application/json',
        'Authorization' : `Token ${deletePut['token']}`
      })
    }

    this.http.delete(`${this.api}api/v1/profile/userData_delete/${id}`,httpOptions).subscribe((response:[])=>{
      if(response !=null){
        this.getListUser(); 
      }
    })
  }

}