import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  //filteredProducts: any[];
 // subscription: Subscription;

  dtOptions: DataTables.Settings = {};


  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) {
    // this.subscription = this.productService.getAll().
    //   subscribe(
    //     products => {
    //       this.filteredProducts = this.products = products;
    //      // this.initializeTable(products);
      
    //     }
    //   );
  }


  // filter(query: string) {
  //   this.filteredProducts = (query) ? 
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  //     this.products;
  // }

  ngOnInit(): void {
    this.productService.getAll()
    .subscribe(data => {
      this.products = data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  ngOnDestroy() {
 //   this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
