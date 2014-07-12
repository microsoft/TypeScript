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
define(["require", "exports"], function(require, exports) {
    var A = (function () {
        function A(callback) {
            var child = new B(this);
        }
        return A;
    })();
    exports.A = A;

    var B = (function () {
        function B(parent) {
        }
        return B;
    })();
    exports.B = B;
});
