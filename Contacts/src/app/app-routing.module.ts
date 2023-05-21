import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContactComponent } from './list-contact/list-contact.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: '', component: ListContactComponent},
  {path: 'contact/:id', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


