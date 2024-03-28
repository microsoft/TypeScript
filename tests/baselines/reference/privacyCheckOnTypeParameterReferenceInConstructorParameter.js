//// [tests/cases/compiler/privacyCheckOnTypeParameterReferenceInConstructorParameter.ts] ////

//// [privacyCheckOnTypeParameterReferenceInConstructorParameter.ts]
export class A<T1>{
    constructor(callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
}

export class B<T2> {
    constructor(parent: T2) { }
}


//// [privacyCheckOnTypeParameterReferenceInConstructorParameter.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B = exports.A = void 0;
    var A = /** @class */ (function () {
        function A(callback) {
            var child = new B(this);
        }
        return A;
    }());
    exports.A = A;
    var B = /** @class */ (function () {
        function B(parent) {
        }
        return B;
    }());
    exports.B = B;
});


//// [privacyCheckOnTypeParameterReferenceInConstructorParameter.d.ts]
export declare class A<T1> {
    constructor(callback: (self: A<T1>) => void);
}
export declare class B<T2> {
    constructor(parent: T2);
}
