import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService){}

  onSwitchMode(){
    this.isLoginMode = ! this.isLoginMode
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    //console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true; 
    if(this.isLoginMode){

    }
    else{
      this.authService.signUp(email,password,true).subscribe(data => {
        console.log(data);
        this.isLoading = false;
      }, 
      errorMessage =>{
        console.log(errorMessage);
        this.error = errorMessage;       
        this.isLoading = false; 
      }); 
    }
   
    form.reset();
  }
}
