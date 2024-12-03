import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataInterface } from './interface/datainterface';
import { DataService } from './service/data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DUALMEDIA';
  searchValue = '';
  data: DataInterface[] = [];
  dataPackage: any = [];
  searchForm;
  dataForm;
  testdata: any;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.searchForm = this.fb.nonNullable.group({
      searchValue: '',
    });
    this.dataForm = this.fb.nonNullable.group({
      productName: '',
      popularityValue: '',
      isPreorder: '',
      type: '',
      price: 0,
      currency: '',
      seller: '',
      activeStockNumber: '',
    });
  }

  fetchData(): void {
    this.dataService.getData(this.searchValue).subscribe((apidata) => {
      this.dataPackage = apidata;
      this.data = this.dataPackage._embedded.kinguinOffer;
    });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }

  openModal(data: any) {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
    this.testdata = data;
    console.log(this.testdata);
    const priceModified = this.testdata.price.amount / 100;

    this.dataForm.setValue({
      productName: this.testdata.productName,
      popularityValue: this.testdata.popularityValue,
      isPreorder: this.testdata.isPreorder,
      type: this.testdata.type,
      price: priceModified,
      currency: this.testdata.price.currency,
      seller: this.testdata.seller.name,
      activeStockNumber: this.testdata.activeStockNumber,
    });
  }

  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
    console.log('test 57 close modal ');
  }

  clearPrice() {
    this.dataForm.patchValue({
      price: 0,
    });
  }

  changePopularity() {
    const checkbox = document.getElementById('is-preorder') as HTMLInputElement;
    if (checkbox != null && checkbox.checked) {
      this.dataForm.patchValue({
        popularityValue: '0',
      });
      const popularityInput = document.getElementById('popularity-value');
      if (popularityInput != null) {
        popularityInput.setAttribute('readonly', '');
      }
    } else if (checkbox != null && checkbox.checked == false) {
      const popularityInput = document.getElementById('popularity-value');
      if (popularityInput != null) {
        popularityInput.removeAttribute('readonly');
        this.dataForm.patchValue({
          popularityValue: this.testdata.popularityValue,
        });
      }
    }
  }
}
