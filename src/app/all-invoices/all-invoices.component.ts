import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import autoTable from 'jspdf-autotable';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';


export interface PeriodicElement {
  name: string;
  phone_Number: number;
  Total: number;
  created_at: string;
  _id: string;
  myFormArray: {
    selectedOption: string,
    input2: string,
    input1: string,


  }[];
}
const ELEMENT_DATA: PeriodicElement[] = []

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css'],

})
export class AllInvoicesComponent  implements AfterViewInit {
  totalQtyAndProduct:any;
  myForm: FormGroup;
  currentClickedRowID:any;
  clickedRows = new Set<PeriodicElement>()
  data:any;

  displayedColumns: string[] = [ 'name', 'phone_Number','Total', 'created_at', '_id', 'myFormArray'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  apiUrl = environment.api_url+'/AllSalesInvoice';


  constructor(private _liveAnnouncer: LiveAnnouncer, private http:HttpClient,
    private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name:[''],
      phone_Number:[''],
      myFormArray: this.fb.array([]),
      Total: this.totalQtyAndProduct
    });

  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllData()



  }
  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAllData() {
    this.getData().subscribe(
      (response) => {
        this.data = response;
        console.log("This is the data");

// this.ELEMENT_DATA = this.data
        console.table(this.data);
        this.dataSource.data = this.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setClickedRow(clickedRow: any){
    console.log('Clicked Row data:', clickedRow);
    console.log('Clicked Row data:', clickedRow._id);
    this.currentClickedRowID = clickedRow._id
  }

  printInvoice(){
    this.http.get(environment.api_url+"/Invoice/"+this.currentClickedRowID).subscribe(
      (response) => {
        this.data = response;
        console.log("This is the data");

// this.ELEMENT_DATA = this.data
        console.table(this.data);
        console.log(this.data[0].Total);

        // this.dataSource.data = this.data;

        const doc = new jsPDF()
        doc.addImage("/assets/HBLOGO.png", "JPEG", 0, 0,100,100)
        // this.myForm.get('name')?.value = this.data[0].name
        const nameValue = this.data[0].name
        doc.text(nameValue, 10, 100)
        const phoneNumberValue = this.data[0].phone_Number
        doc.text(phoneNumberValue, 10, 110)
        const myFormArray: FormArray = this.myForm.get('myFormArray') as FormArray;
        this.data[0].myFormArray.forEach((item:any) => {
          myFormArray.push(
            this.fb.group({
              input1: item.input1,
              input2: item.input2,
              qtyandproduct: item.qtyandproduct,
              selectedOption: item.selectedOption,
            })
          );
        });



          const data = myFormArray.controls.map(control => [
            control.value.selectedOption,
            control.value.input2,
            control.value.qtyandproduct
          ]);
          data.push(['Total','',this.data[0].Total])
        var columns=[[

          'Product', 'QTY', 'Total'
        ]
        ]
            // doc.text(regularArray, 5, 120)
        autoTable(doc , {
        head: columns,
        body : data,
        didDrawCell: (data) => { },
          startY:120
        })
            doc.save("a4.pdf")
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
