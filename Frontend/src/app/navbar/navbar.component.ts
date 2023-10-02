import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // isNavMenuVisible = false;
  // isScrolled = false;

  // ngOnInit() {
  //   // Kode JavaScript untuk menampilkan dan menyembunyikan menu
  //   const navToggle = document.getElementById("nav-toggle");
  //   const navClose = document.getElementById("nav-close");
  //   const navLink = document.querySelectorAll(".nav__link");

  //   if (navToggle) {
  //     navToggle.addEventListener("click", () => {
  //       this.isNavMenuVisible = true;
  //     });
  //   }

  //   if (navClose) {
  //     navClose.addEventListener("click", () => {
  //       this.isNavMenuVisible = false;
  //     });
  //   }

  //   navLink.forEach((n: Element) => {
  //     n.addEventListener("click", () => {
  //       this.isNavMenuVisible = false;
  //     });
  //   });

  //   // Kode JavaScript untuk mengontrol header saat menggulir
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY >= 50) {
  //       this.isScrolled = true;
  //     } else {
  //       this.isScrolled = false;
  //     }
  //   });
  // }

  // toggleNavMenu() {
  //   this.isNavMenuVisible = !this.isNavMenuVisible;
  // }

  // closeNavMenu() {
  //   this.isNavMenuVisible = false;
  // }
}
