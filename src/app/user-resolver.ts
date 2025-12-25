// import { ResolveFn, Router } from '@angular/router';
// import { inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { map, of } from 'rxjs';
// import { AuthService } from './auth-service';


// export const userResolver: ResolveFn<boolean> = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   const platformId = inject(PLATFORM_ID);

//   // SSR: allow rendering
//   if (!isPlatformBrowser(platformId)) {
//     return of(true);
//   }

//   return auth.loadUser().pipe(
//     map(user => {
//       if (user) {
//         return true;
//       }
//       router.navigateByUrl('/signin');
//       return false;
//     })
//   );
// };
