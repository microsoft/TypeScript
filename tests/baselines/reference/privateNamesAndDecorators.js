//// [privateNamesAndDecorators.ts]
declare function dec<T>(target: T): T;

class A {
    @dec                // Error
    #foo = 1;
    @dec                // Error
    #bar(): void { }
}


//// [privateNamesAndDecorators.js]
var A = /** @class */ (function () {
    function A() {
        this[] = 1;
    }
    A.prototype[] = function () { };
    return A;
}());
