import { Component} from '@angular/core';

import { FormArray, FormBuilder,FormGroup } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
})

export class AddInvoiceComponent {
  myForm: FormGroup;
  // myFormArray: FormArray = this.fb.array([]);
  get myFormArray() {
    return this.myForm.get('myFormArray') as FormArray;
  }
  constructor(private fb: FormBuilder){
    this.myForm = this.fb.group({
      myFormArray: this.fb.array([]),
    });
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.myFormArray = this.fb.array([])

  }
  Rood = [
    {value: '560', viewValue: 'Steak'},
    {value: '134', viewValue: 'Pizza'},
    {value: '45', viewValue: 'Tacos'},
  ];

  value = 0;
  foods: Food[] = [
    {value: '560', viewValue: 'Steak'},
    {value: '450', viewValue: 'Pizza'},
    {value: '600', viewValue: 'Tacos'},
  ];
  increment() {
    this.value++;
  }
  calculateTotal(productValue: string, quantity: string): number {
    const productNumber = +productValue; // Convert the string to a number
    const quantityNumber = +quantity; // Convert the string to a number

    if (!isNaN(productNumber) && !isNaN(quantityNumber)) {
      return productNumber * quantityNumber;
    } else {
      return 0; // Or handle the error in a way that makes sense for your application
    }
  }

  removeRow(index: number) {
  this.myFormArray.removeAt(index);
}

  decrement() {
    if (this.value > 0) {
      this.value--;
    }
  }

  addNewRow() {
    const newRow = this.fb.group({
      input1: [''], // Replace with your control names and default values
      input2: [''],
      // Add more controls as needed
    });
    this.myFormArray.push(newRow);
  }
}
