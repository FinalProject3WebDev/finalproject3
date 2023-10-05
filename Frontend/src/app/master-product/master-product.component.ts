import { DataTableDirective } from 'angular-datatables';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  lastValueFrom,
  map,
} from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../interfaces/productCategory';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-master-product',
  templateUrl: './master-product.component.html',
  styleUrls: ['./master-product.component.css'],
})
export class MasterProductComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement?: DataTableDirective;

  uploadedFiles: any = null;

  productsApi: Product[] = [];
  products: Product[] = [];
  categories: ProductCategory[] = [];

  dtOptions: DataTables.Settings = {
    data: this.products,
  };
  dtTrigger: Subject<any> = new Subject<any>();

  faTrash = faTrash;
  faPencil = faPencil;
  faPlus = faPlus;

  is: { [key: string]: any } = {};
  formProduct: any = {};

  formatter = (result: any) => result.categoryName;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        this.categories
          .filter((v) =>
            v.categoryName.toLowerCase().startsWith(term.toLocaleLowerCase())
          )
          .splice(0, 10)
      )
    );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}
  ngOnInit(): void {
    this.productCategoryService
      .getCategories()
      .subscribe((data: ProductCategory[]) => {
        this.categories = data;
      });
  }

  ngAfterViewInit(): void {
    this.getProduct();
  }

  async getProduct(rerender = false) {
    await lastValueFrom<Product[]>(this.productService.getAllProducts())
      .then((data) => {
        return data.map((product) => {
          product.category = this.categories.find(
            (val) => val.id == product.categoryId
          );

          return product;
        });
      })
      .then((data) => {
        if (rerender) {
          this.productsApi = data;
        } else {
          this.products = data;
        }
      })
      .then(() =>
        setTimeout(() => {
          if (rerender) {
            this.rerender();
          } else {
            this.dtTrigger.next(true);
          }
        }, 100)
      );
  }

  ngOnDestroy(): void {
    // do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  deleteProduct(id: string | number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe((data: any) => {
        alert(data.message);
        setTimeout(() => {
          this.getProduct(true);
        }, 1000);
      });
    }
  }

  editProduct(product: Product) {
    this.is['edit'] = true;
    this.is['create'] = false;
    this.uploadedFiles = null;
    this.formProduct = product;
  }

  createProduct() {
    this.is['edit'] = false;
    this.is['create'] = true;
    this.uploadedFiles = null;
    this.formProduct = {};
  }

  cancelForm() {
    this.is['edit'] = false;
    this.is['create'] = false;
    this.uploadedFiles = null;
    this.formProduct = {};
  }

  onSubmit() {
    switch (true) {
      case this.is['edit']:
        this.productService
          .editProduct(this.formProduct.id, {
            productName: this.formProduct.productName,
            productDescription: this.formProduct.productDescription,
            price: this.formProduct.price,
            stock: this.formProduct.stock,
            categoryId: this.formProduct.categoryId,
          })
          .subscribe((data: any) => {
            if (!!this.uploadedFiles) {
              this.upload(this.formProduct.id).subscribe(
                (res) => {
                  alert(data.message);
                  setTimeout(() => {
                    this.getProduct(true);
                  }, 1000);
                  this.cancelForm();
                },
                (error) => {
                  alert(error);
                }
              )
            } else {
              alert(data.message);
              setTimeout(() => {
                this.getProduct(true);
              }, 1000);
              this.cancelForm();
            }
          });
        break;

      case this.is['create']:
        if (!this.formProduct.productName) {
          alert('name field required!');
          return;
        }

        if (!this.formProduct.category) {
          alert('category field required!');
          return;
        }

        if (!this.formProduct.productDescription) {
          alert('description field required!');
          return;
        }

        if (!this.formProduct.price) {
          alert('price field required!');
          return;
        }

        if (!this.formProduct.stock) {
          alert('stock field required!');
          return;
        }

        if (!this.uploadedFiles) {
          alert('image field required!');
          return;
        }

        this.productService
          .createProduct({
            categoryId: this.formProduct.category,
            productName: this.formProduct.productName,
            productDescription: this.formProduct.productDescription,
            price: this.formProduct.price,
            stock: this.formProduct.stock,
          })
          .subscribe((data: any) => {
            this.upload(data.id).subscribe(
              (res) => {
                alert('Product has been created successfully');
                setTimeout(() => {
                  this.getProduct(true);
                }, 1000);
                this.cancelForm();
              },
              (error) => {
                alert(error);
              }
            )
            setTimeout(() => {
              this.getProduct(true);
            }, 1000);
          });
        break;

      default:
        this.cancelForm();
        break;
    }
  }
  rerender(): void {
    this.products = this.productsApi.slice();
    const that = this;
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(true);
    });
  }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  upload(productId: number) {
    let formData = new FormData();
      formData.append(
        'uploads',
        this.uploadedFiles[0],
        this.uploadedFiles[0].name
      );

     return this.productService.uploadImageProduct(formData, {productId: productId.toString()})
  }
}
