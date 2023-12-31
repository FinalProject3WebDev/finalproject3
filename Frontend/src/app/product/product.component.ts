import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductCategory } from '../interfaces/productCategory';
import { ProductService } from '../services/product.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductCategoryService } from '../services/product-category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  selectedCategory: ProductCategory | null = null;

  quantity: number = 1;
  faShoppingCart = faShoppingCart;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.getProducts();

    this.productCategoryService.getCategories().subscribe((data: ProductCategory[]) => {
      this.categories  = data;
    });
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  // filterProductsByCategory(categoryName: string) {
  //   this.selectedCategory = categoryName;
  //   // console.log(this.selectedCategory = category)
  // }

  getProductsByCategory(category: ProductCategory) {
    this.selectedCategory = category;
    this.productService.getProductsByCategory(category.id).subscribe((data: any) => {
      this.products = data;
      const firstProduct = data[0];
    });
  }

  // get filteredProducts(): Product[] {
  //   if (!this.selectedCategory) {
  //     return this.products;
  //   }

  //   return this.products.filter(product => product.category && product.category.categoryName === this.selectedCategory);
  // }

  addToCart(productId: number) {
    const cartItem = {
      productId: productId,
      quantity: this.quantity
    };

    this.productService.addToCart(cartItem).subscribe((data: any) => {
      console.log(productId);
    });
  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
