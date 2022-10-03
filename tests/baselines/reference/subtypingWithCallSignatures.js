//// [subtypingWithCallSignatures.ts]
module CallSignature {
    declare function foo1(cb: (x: number) => void): typeof cb;
    declare function foo1(cb: any): any;
    var r = foo1((x: number) => 1); // ok because base returns void
    var r2 = foo1(<T>(x: T) => ''); // ok because base returns void

    declare function foo2(cb: (x: number, y: number) => void): typeof cb;
    declare function foo2(cb: any): any;
    var r3 = foo2((x: number, y: number) => 1); // ok because base returns void
    var r4 = foo2(<T>(x: T) => ''); // ok because base returns void
}

//// [subtypingWithCallSignatures.js]
var CallSignature;
(function (CallSignature) {
    var r = foo1(function (x) { return 1; }); // ok because base returns void
    var r2 = foo1(function (x) { return ''; }); // ok because base returns void
    var r3 = foo2(function (x, y) { return 1; }); // ok because base returns void
    var r4 = foo2(function (x) { return ''; }); // ok because base returns void
})(CallSignature || (CallSignature = {}));
