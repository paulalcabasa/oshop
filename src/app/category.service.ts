import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    this.itemsRef =  this.db.list('/categories', 
      query => query.orderByChild('name')
    );
    
    this.items = this.itemsRef.snapshotChanges()
    .pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return this.items;
  }
}
