import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';

import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingCart, faInfoCircle);

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    ProductComponent,
    HomepageComponent
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
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
