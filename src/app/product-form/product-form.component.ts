import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } 
    from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public Editor = ClassicEditor;
//   public model = {
//     editorData: ''
// };
//   onSubmit(){
//     console.log(this.model.editorData);
//   }

  // public product = {
  //   productName: '',
  //   productDescription: '',
  //   productCode:'',
  //   productImage:''
  // }

  public showDiscount:boolean = false;
  productForm = new FormGroup({
    productName: new FormControl("", Validators.required),
    productCode: new FormControl("", Validators.required),
    productDescription: new FormControl("", Validators.required),
    productImage: new FormControl("", Validators.required),
    productDiscount: new FormControl("", Validators.max(100)),
    isSale: new FormControl(false)
});

constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}


  onSubmit(){
    // console.log(JSON.stringify(this.product));
    // console.log(this.productForm.value);
    console.log(JSON.stringify(this.productForm.value));
    this.productForm.reset();
    this.showDiscount = false;
  }

  updateState(){

    if(this.showDiscount){
      this.showDiscount = false;
      // console.log('false');

    }
    else{
      this.showDiscount = true;
      // console.log('true');
    }
  }

  
  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
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
  
  ngOnInit() {
    // console.log(this.showDiscount);
  }

}
