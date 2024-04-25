import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class httpInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = localStorage.getItem('access_token');

      if (authToken) {
        const authReq = req.clone({
          setHeaders: {
            Accept : 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        });
        return next.handle(authReq);
      }
        return next.handle(req);
    }
}