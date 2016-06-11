//// [a.ts]
declare var dec: any;
@dec export class A {

}

//// [a.js]
import * as tslib_1 from "tslib";
let A = class A {
};
A = tslib_1.__decorate([
    dec
], A);
export { A };
