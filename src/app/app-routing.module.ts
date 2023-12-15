import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';

const routes: Routes = [
  {path: 'add-invoice', component: AddInvoiceComponent},
  {path: 'all-invoices', component: AllInvoicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
