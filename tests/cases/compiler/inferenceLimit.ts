// @target: es6
// @module: commonjs
// @filename: file1.ts
"use strict";
import * as MyModule from "./mymodule";

export class BrokenClass {

  constructor() {}

  public brokenMethod(field: string, value: string) {
  return new Promise<Array<MyModule.MyModel>>((resolve, reject) => {

    let result: Array<MyModule.MyModel> = [];

    let populateItems = (order) => {
      return new Promise((resolve, reject) => {
        this.doStuff(order.id)
          .then((items) => {
            order.items = items;
            resolve(order);
          });
      });
    };

    return Promise.all(result.map(populateItems))
      .then((orders: Array<MyModule.MyModel>) => {
        resolve(orders);
      });
    });
  }

  public async doStuff(id: number) {
    return;
  }
}

// @filename: mymodule.ts
export interface MyModel {
    id: number;
}