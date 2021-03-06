import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private categoryService : CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {

    this.categoryService.getCategories().subscribe(categories => {
      this.categories$ = categories;
    });
    
    this.id = this.route.snapshot.paramMap.get('id');
 
    if(this.id) {
      this.productService.get(this.id).subscribe(res => {
        this.product = res;
      });
    }
  }

  save(product) {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }



  ngOnInit(): void {
  }

}
