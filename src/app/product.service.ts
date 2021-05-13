import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    this.itemsRef =  this.db.list('/products');

    this.items = this.itemsRef.snapshotChanges()
    .pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.items;  
  }

  get(productId) {
    return this.db.object('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.payload.val()
        })
      )
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
  
}
