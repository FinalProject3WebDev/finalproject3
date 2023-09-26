import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
<<<<<<< HEAD
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
=======
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
>>>>>>> 3136757b19e82116dca6c0c97a7ba73172c71437

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
<<<<<<< HEAD
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},

=======
  { path: 'orders', component: OrderComponent }
>>>>>>> 3136757b19e82116dca6c0c97a7ba73172c71437
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
