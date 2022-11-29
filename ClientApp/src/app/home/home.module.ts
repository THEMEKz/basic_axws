import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { LoginComponent } from './login/login.component'
import { CallbackComponent } from './callback/callback.component'

@NgModule({
  declarations: [HomeComponent, LoginComponent, CallbackComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HomeRoutingModule],
})
export class HomeModule {}
