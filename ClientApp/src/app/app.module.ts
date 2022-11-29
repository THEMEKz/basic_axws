import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'

import { AxAuthenticationModule } from '@atlasx/core/authentication'
import { AxConfigurationModule } from '@atlasx/core/configuration'
import { AxWebServiceUrl } from '@atlasx/core/http-service'

import { AppComponent } from './app.component'

import { environment } from '../environments/environment'
import { ArcgisjsapiProvider } from './gis/argisjsapi-provider';
import { MguserComponent } from './mguser/mguser.component';
import { FormsModule } from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ToastModule} from 'primeng/toast';
import {KeyFilterModule} from 'primeng/keyfilter';

@NgModule({
  declarations: [AppComponent, MguserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ScrollPanelModule,
    ToastModule,
    KeyFilterModule,

    // Required register, if application use AtlasX configuration pattern.
    // It will load configuration before application initial startup.
    AxConfigurationModule,

    // Required register, if application use authentication.
    AxAuthenticationModule.forRoot(environment),
  ],
  providers: [
    // Required register, if application use AxAuthenticationModule or AxConfigurationModule.
    { provide: AxWebServiceUrl, useValue: environment.webServiceUrl },

    // Requried register, if application use ArcGIS API for JavaScript.
    ArcgisjsapiProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
