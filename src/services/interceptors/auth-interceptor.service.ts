import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthappService } from '../authapp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private BasicAuth: AuthappService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
    let UserId: string = "Admin";
    let Password: string = "VerySecretPwd";
    */
    let AuthHeader = "";
    var AuthToken = sessionStorage.getItem("AuthToken");
    if(AuthToken != null)
      AuthHeader = AuthToken;

    if(this.BasicAuth.loggedUser() != "")
    {
      req = req.clone(
        {
          setHeaders: {Authorization: AuthHeader}
        }
      );
    }
    

    return next.handle(req);
  }
}
