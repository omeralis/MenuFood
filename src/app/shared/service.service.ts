import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MENUS } from './model/menus';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://127.0.0.1:8000/api';
  ApiRoutes = {
    MenuRoute: {
      getData: '/menu',
      getfirstItem: '/first-item',
      Add:'/menu',
      edit: '/edit-menu',
      delete:'/delete-menu'
    },
  }

  constructor(public http: HttpClient) { }
// add
AddMenu(MenuData: any) {
  return this.http.post(this.url + this.ApiRoutes.MenuRoute.Add, MenuData);
}
// all data 
getData() {
  return this.http.get(this.url + this.ApiRoutes.MenuRoute.Add);
}
// first-item in hero
firstItem(id:any) {
  return this.http.post(this.url + this.ApiRoutes.MenuRoute.getfirstItem ,id);
}
// Delete item
EditData(data:any) {
  return this.http.post(this.url + this.ApiRoutes.MenuRoute.edit ,data);
}
// Delete item
Delete(id:any) {
  return this.http.post(this.url + this.ApiRoutes.MenuRoute.delete ,id);
}
}
