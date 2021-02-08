import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  Editor = ClassicEditor;
  showDiscount: boolean = false;
  productForm = new FormGroup({
    productName: new FormControl("", Validators.required),
    productCode: new FormControl("", Validators.required),
    productDescription: new FormControl("", Validators.required),
    productImage: new FormControl("", Validators.required),
    productDiscount: new FormControl("", Validators.max(100)),
    isSale: new FormControl(false)
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }


  public onSubmit(): void{
    console.log(JSON.stringify(this.productForm.value));
    this.productForm.reset();
    this.showDiscount = false;
  }

  // toggling the discount state
  public updateState(): void{
    this.showDiscount = this.showDiscount ? false : true;
  }
  
  public onFileChange(event): void{
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.productForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }


  ngOnInit(): void {}
}
