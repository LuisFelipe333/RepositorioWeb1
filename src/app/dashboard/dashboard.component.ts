import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthServiceService } from '../service/auth/auth-service.service';
import {AuthServiceService} from '../service/Auth/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})



export class DashboardComponent implements OnInit {
  
  postFormGroup: FormGroup;
  putFormGroup : FormGroup;
  deleteFormGroup : FormGroup;


  displayedColumns: string[] = ['id', 'name', 'lastName', 'age','address'];
  users=[];

  constructor(private authService: AuthServiceService, private _router: Router,private _formBuilder: FormBuilder) {

   }

  ngOnInit(): void {

    this.postFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required]
    })

    this.putFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required]
    })

    this.deleteFormGroup = this._formBuilder.group({
      id: ['', Validators.required]
    })


    this.loadTable();

  }

  loadTable(){
    this.authService.getListUser().subscribe((data:any[])=>{
      
      this.users=data;
    });

    
  }
  
  post(): void{
    const data = this.postFormGroup.value;

    this.authService.postUser(data.name,data.lastName,data.age,data.address).subscribe((data:any[])=>{
      
    this.loadTable();
    });
    

  }

  put(): void{    
    const data = this.putFormGroup.value;
    this.authService.putUser(data.id,data.name,data.lastName,data.age,data.address).subscribe((data:any[])=>{
      
      this.loadTable();
    });
    

  }

  delete(): void{
    const data = this.deleteFormGroup.value;
    
    this.authService.deleteUser(data.id).subscribe((data:any[])=>{
      this.loadTable();
    });
    
  }



}
