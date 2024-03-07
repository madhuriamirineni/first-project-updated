import { CanActivateFn} from '@angular/router';
import { Router } from '@angular/router';
import {inject} from '@angular/core';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let status:boolean;
  const router=inject(Router);
  const userService=inject(UserService)
  userService.getUserLoginStatus().subscribe({
    next:(loginStatus)=>{status=loginStatus}
  })
  // userService.getAuthorLoginStatus().subscribe({
  //   next:(loginStatus)=>{status=loginStatus}
  // })
  if(status){
    return true
  }
  else{
    return router.navigate(['/login'])
  }
};
