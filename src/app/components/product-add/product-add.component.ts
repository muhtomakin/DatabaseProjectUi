import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  productAddForm: FormGroup | undefined;
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  add(){
    if(this.productAddForm?.valid){
      let productModel = Object.assign({}, this.productAddForm?.value);
      this.productService.add(productModel).subscribe(data => {
        this.toastrService.success(data.message, "Success");
      }, responseError => {
        if(responseError.error.Errors.length>0){
          for(let i=0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              "Valdiation Error"
            );
          }
        }
      });
    } else {
      this.toastrService.error("Form is not valid!");
    }
  }
}
