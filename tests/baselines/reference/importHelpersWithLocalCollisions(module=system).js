//// [tests/cases/compiler/importHelpersWithLocalCollisions.ts] ////

//// [a.ts]
declare var dec: any, __decorate: any;
@dec export class A {

}

const o = { a: 1 };
const y = { ...o };

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;


//// [a.js]
System.register(["tslib"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, A, o, y;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            }
        ],
        execute: function () {
            A = class A {
            };
            A = tslib_1.__decorate([
                dec
            ], A);
            exports_1("A", A);
            o = { a: 1 };
            y = Object.assign({}, o);
        }
    };
});
