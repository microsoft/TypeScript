//// [generatorOverloads1.ts]
module M {
    function* f(s: string): Iterable<any>;
    function* f(s: number): Iterable<any>;
    function* f(s: any): Iterable<any> { }
}

//// [generatorOverloads1.js]
var M;
(function (M) {
    function* f(s) { }
})(M || (M = {}));
