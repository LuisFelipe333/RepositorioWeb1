import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthServiceService } from '../service/auth/auth-service.service';
import { AuthServiceService } from '../service/Auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _authServiceService: AuthServiceService, private _router: Router) { 
    
  }

  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    })
  }

  toLanding()
  {
    this._router.navigate(['/landing-page']);
  }

  register(): void
  {
        
    const data = this.registerFormGroup.value;
      this._authServiceService.register(data.username,data.email, data.password1,data.password2).subscribe(access => {
        localStorage.setItem('user',JSON.stringify(access));
        this._router.navigate(['login']);
        console.log(data.username);
        console.log(data.email);
        console.log(data.password1);
        console.log(data.password2);
        console.log(access);
        
      }, error => {
        console.log(data.username);
        console.log(data.email);
        console.log(data.password1);
        console.log(data.password2);
        if(error.status==500)
        this._router.navigate(['login']);
        else
        console.log(error);
        
        
      }
      );
  }
}
