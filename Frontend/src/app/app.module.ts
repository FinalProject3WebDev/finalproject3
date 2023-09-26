import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { ReactiveFormsModule } from '@angular/forms';
=======
import { HttpClientModule } from '@angular/common/http';

>>>>>>> 3136757b19e82116dca6c0c97a7ba73172c71437
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
=======
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
>>>>>>> 3136757b19e82116dca6c0c97a7ba73172c71437

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    NavbarComponent,
<<<<<<< HEAD
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required for toastr animations
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // You can customize the position
      closeButton: true, // Show a close button on the toast
    }),
=======
    OrderComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
>>>>>>> 3136757b19e82116dca6c0c97a7ba73172c71437
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
