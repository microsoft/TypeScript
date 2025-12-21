//// [tests/cases/compiler/issue55217.ts] ////

//// [types.ts]
export type ProductName = 'a' | 'b'

export type SubproductNameForProductName<P extends ProductName> = P extends unknown
  ? keyof EntitiesByProductName[P]
  : never

type EntitiesByProductName = {
  a: { a1: { value: 'a-a1' } }
  b: { b1: { value: 'b-b1' } }
}

export type DiscriminatedUnion<
  P extends ProductName = ProductName,
  E extends SubproductNameForProductName<P> = SubproductNameForProductName<P>,
> = P extends ProductName
    ? E extends SubproductNameForProductName<P>
    // ? E extends unknown // With unknown, the exception doesn't happen. 
      ? EntitiesByProductName[P][E]
      : never
    : never

//// [app.ts]
import { SubproductNameForProductName, DiscriminatedUnion, ProductName } from './types'

export const bug = <P extends ProductName>() => {
  const subproducts: DiscriminatedUnion<P, SubproductNameForProductName<P>>[] = []
  subproducts.map((_: DiscriminatedUnion) => null)
}


//// [types.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bug = void 0;
var bug = function () {
    var subproducts = [];
    subproducts.map(function (_) { return null; });
};
exports.bug = bug;
