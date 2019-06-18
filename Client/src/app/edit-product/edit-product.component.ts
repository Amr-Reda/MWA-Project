import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId;
  product: Product;
  editForm;
  errorMsg;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private productService: ProductsService,private router: Router) {
    this.editForm = formBuilder.group({

      '_id': [''],
      'name': ['', Validators.required],
      'tags': [''],
      'description': ['', Validators.required],
      'quantity': ['', Validators.required],
      'price': ['', Validators.required],
      'imageId': [''],
      'company': ['', Validators.required]
    });


    route.params.subscribe(p => {
      this.productId = p['id'];
      productService.getProductById(this.productId)
        .subscribe((data: any) => {
          // Bind data to UI
          if (data.success) {
            this.product = data.product;
            this.editForm.setValue(this.product);
          }
          else {
            this.errorMsg = "error"
          }
        },
          error => {
            this.errorMsg = "Item with such id doesn't exist"
          }
        );
    });
  }


  ngOnInit() {
  }

  onSubmit() {
    if (this.productId) {
      console.log("this.productId");
      // Update
      console.log(this.editForm.error);

      this.productService.updateProduct(this.editForm.value)
      .subscribe((data : any)=>{
        if(data.success){
          //redirect to homepage
          this.router.navigate(['']);
         
        }
        
      });
      ;
    }
    else {
      // Add product to database
         this.productService.addProduct(this.editForm.value)
        .subscribe( data => {
          console.log(data);
          this.router.navigate(['']);
        });
      
    }

  }
}
