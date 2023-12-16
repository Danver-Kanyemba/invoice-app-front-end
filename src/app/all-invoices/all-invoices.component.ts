import { Component } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  clickedRows = new Set<PeriodicElement>()
  data:any;
  displayedColumns: string[] = [ 'name', 'phone_Number','Total', 'created_at', '_id', 'myFormArray'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  apiUrl = 'http://localhost:8080/AllSalesInvoice';

  constructor(private _liveAnnouncer: LiveAnnouncer, private http:HttpClient) {}

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
}
