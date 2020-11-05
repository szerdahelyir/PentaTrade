import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { delay} from 'rxjs/operators';




@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  users =[
    {"email":"dummy1234@gmail.com", "password":"asd123"},
    {"email":"asd123@freemail.hu", "password":"asdasd"},
    {"email":"qwerty@citromail.hu", "password":"password"}
  ];
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  constructor(
    private http: HttpClient
    ) {}

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;
    if (url.endsWith("/authenticate") && method === "POST") {
      const { body } = req.clone();
      if(this.users.some(user=>user.email==body["email"] && user.password==body["password"])){
        return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
      }
      else{
        return of(new HttpResponse({ status: 404, body })).pipe(delay(500));
      }
    }
    return next.handle(req);
  }

}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};