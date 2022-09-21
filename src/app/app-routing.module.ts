import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './Pages/menus/menus.component';


const routes: Routes = [
  {path: '',   redirectTo: '/meun', pathMatch: 'full'},
  {path: 'meun', component: MenusComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
