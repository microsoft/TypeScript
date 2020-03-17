//// [tests/cases/compiler/inferenceLimit.ts] ////

//// [file1.ts]
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

//// [mymodule.ts]
export interface MyModel {
    id: number;
}

//// [mymodule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file1.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokenClass = void 0;
class BrokenClass {
    constructor() { }
    brokenMethod(field, value) {
        return new Promise((resolve, reject) => {
            let result = [];
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
                .then((orders) => {
                resolve(orders);
            });
        });
    }
    doStuff(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.BrokenClass = BrokenClass;
