import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 //get token from localStorage
 const token = localStorage.getItem('token')
 if (!token) {
   return next(req);
 }
 else {
   //add authorization to headers of req. obj.
   const reqWithToken = req.clone({
     headers: req.headers.set('Authorization', `Bearer ${token}`)
   })
   //send the req.
   return next(reqWithToken)

 }
};
