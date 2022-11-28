import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];
  dataLoaded = false;
  filterText = "";

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['categoryId']){
        return this.getProductsByCategory(params['categoryId']);
      } else {
        return this.getProducts();
      }
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      (response) =>{
        this.products = response.data
        this.dataLoaded = true
      });
  }

  getProductsByCategory(categoryId: number){
    this.productService.getProductsByCategory(categoryId).subscribe(
      (response) =>{
        this.products = response.data
        this.dataLoaded = true
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
