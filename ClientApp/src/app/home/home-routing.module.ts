import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AxLoginGuard } from '@atlasx/core/authentication'

import { HomeComponent } from './home.component'
import { LoginComponent } from './login/login.component'
import { CallbackComponent } from './callback/callback.component'
import { MguserComponent } from '../mguser/mguser.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // If you would like to required authenticate this route, uncomment the `canActivate`
    // to enable authentication before navigates to route.
    // , canActivate: [AxAuthenticationGuard] // <--- Enable HERE
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AxLoginGuard],
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {path: 'user',component: MguserComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
