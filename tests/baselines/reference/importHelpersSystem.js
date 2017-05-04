//// [tests/cases/compiler/importHelpersSystem.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import { A } from "./a";
export class B extends A { }

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;


//// [a.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var A;
    return {
        setters: [],
        execute: function () {
            A = (function () {
                function A() {
                }
                return A;
            }());
            exports_1("A", A);
        }
    };
});
//// [b.js]
System.register(["tslib", "./a"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tslib_1, a_1, B;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (a_1_1) {
                a_1 = a_1_1;
            }
        ],
        execute: function () {
            B = (function (_super) {
                tslib_1.__extends(B, _super);
                function B() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return B;
            }(a_1.A));
            exports_1("B", B);
        }
    };
});
