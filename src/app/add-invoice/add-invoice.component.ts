import { Component} from '@angular/core';

import { FormArray, FormBuilder,FormGroup, AbstractControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
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
  total: number = 0;
  selectedFoodText: string='';
  totalQtyAndProduct: number = 0;

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
    this.myForm.get('myFormArray')?.valueChanges.subscribe((value) => {
      // Update the total whenever qtyandproduct changes
      console.log('qtyandproduct value changed:', value);
      this.totalQtyAndProduct = this.calculateTotalInput1()
    });

    this.addNewRow();
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
  // onSelectionChange(event: MatSelectChange) {
  //   const selectedOption = event.source.selected as MatOption;
  //   this.selectedFoodText = selectedOption.viewValue;
  // }
  onOptionSelected(event: any, group: AbstractControl) {
    // Get the selected value from the event
    const selectedValue = event.source.selected.viewValue;

    // Update the 'selectedOption' FormControl in the form group
    group.get('selectedOption')?.setValue(selectedValue);
  }

  calculateTotalAssign() {
    console.log("INput changed");

    this.totalQtyAndProduct = this.calculateTotalInput1()
    console.log(this.totalQtyAndProduct);

  }


  calculateTotal5(productValue: string, quantity: string, index:number) {
    const productNumber = +productValue; // Convert the string to a number
    const quantityNumber = +quantity; // Convert the string to a number

    if (!isNaN(productNumber) && !isNaN(quantityNumber)) {
      const myFormArray = this.myForm.get('myFormArray') as FormArray;

    // Assuming you have an index (let's say 0 for the first element)

    // Now you can set the value for the specific index
    myFormArray.at(index).patchValue({
      // Your values go here
      qtyandproduct: productNumber * quantityNumber,

    });
      // return productNumber * quantityNumber;
    }
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

  updateTotal() {
    this.total = this.myFormArray.controls.reduce(
      (acc, control) => acc + this.calculateTotal(control.get('myselect')?.value, control.get('qty')?.value),
      0
    );
  }
  removeRow(index: number) {
  this.myFormArray.removeAt(index);
  this.updateTotal();
  }

  decrement() {
    if (this.value > 0) {
      this.value--;
    }
    this.updateTotal();
  }

  addNewRow() {
    const newRow = this.fb.group({
      input1: [''], // Replace with your control names and default values
      input2: [],
      qtyandproduct:[],
      selectedOption: [null],
      // Add more controls as needed
    });
    this.myFormArray.push(newRow);
    this.updateTotal();
  }
  onSubmit() {
    if (this.myForm.valid) {
      // Assuming you want to output the entire form data object
      console.log('Form Data:', this.myForm.value);
    } else {
      console.error('Form is not valid. Please check your inputs.');
    }
  }

   calculateTotalInput1() {
    return this.myFormArray.controls
      .map((group) => group.get('qtyandproduct')?.value || 0) // Use 0 as default value if input1 is null
      .reduce((acc, value) => acc + value, 0);
  }
}
