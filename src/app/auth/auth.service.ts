import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
    idToken: string,
    email	: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn:'root'})
export class  AuthService{

    constructor(private http: HttpClient){}
    signUp(email: string, password: string, returnSecureToken: boolean){
      return  this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADOHJVE3Cp7IZBu01YC2V5OKt3OfqscKE",
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        )
        .pipe(
            catchError(errorRes => {
            let errorMessage = "unknown error occured";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(()=> {
                    new Error(errorMessage);
                });
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exists';
            }
            return throwError(() => {
                new Error(errorMessage);
            }) 
        }));
    }
}