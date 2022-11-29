import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MguserComponent } from './mguser/mguser.component'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'gis',
    loadChildren: () => import('./gis/gis.module').then((m) => m.GisModule),
    data: {
      systemId: 'GIS',
    },
  },
  {path : 'user',component:MguserComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
