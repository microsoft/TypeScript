//// [genericClassesInModule2.ts]
export class A<T1>{
    constructor( public callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
    AAA( callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
}

export interface C<T1>{
    child: B<T1>;
    (self: C<T1>): void;
    new(callback: (self: C<T1>) => void)
}

export class B<T2> {
    constructor(public parent: T2) { }
}



//// [genericClassesInModule2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var A = (function () {
        function A(callback) {
            this.callback = callback;
            var child = new B(this);
        }
        A.prototype.AAA = function (callback) {
            var child = new B(this);
        };
        return A;
    }());
    exports.A = A;
    var B = (function () {
        function B(parent) {
            this.parent = parent;
        }
        return B;
    }());
    exports.B = B;
});
