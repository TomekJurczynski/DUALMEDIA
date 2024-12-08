import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataInterface } from './interface/datainterface';
import { DataService } from './service/data.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    NgxPermissionsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'DUALMEDIA';
  searchValue = '';
  data: DataInterface[] = [];
  // -- DATA USED TO WORK ON THE TEST API --
  //jsonPlaceholderData: JsonPlaceholder[] = [];
  dataPackage: any = [];
  searchForm;
  dataForm;
  dataContainer: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private permissionService: NgxPermissionsService
  ) {
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

  ngOnInit(): void {
    const perm = ['OPEN'];
    this.permissionService.loadPermissions(perm);
  }

  setReadOnlyMode() {
    if (this.permissionService.getPermission('OPEN')?.name == 'OPEN') {
      this.permissionService.removePermission('OPEN');
    } else {
      const perm = ['OPEN'];
      this.permissionService.loadPermissions(perm);
    }
  }

  fetchData(): void {
    this.dataService.getData(this.searchValue).subscribe((apidata) => {
      this.dataPackage = apidata;
      this.data = this.dataPackage._embedded.kinguinOffer;
      // -- DATA USED TO WORK ON THE TEST API --
      //this.jsonPlaceholderData = apidata;
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
    this.dataContainer = data;
    const priceModified = this.dataContainer.price.amount / 100;

    this.dataForm.setValue({
      productName: this.dataContainer.productName,
      popularityValue: this.dataContainer.popularityValue,
      isPreorder: this.dataContainer.isPreorder,
      type: this.dataContainer.type,
      price: priceModified,
      currency: this.dataContainer.price.currency,
      seller: this.dataContainer.seller.name,
      activeStockNumber: this.dataContainer.activeStockNumber,
    });
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
          popularityValue: this.dataContainer.popularityValue,
        });
      }
    }
  }
}
