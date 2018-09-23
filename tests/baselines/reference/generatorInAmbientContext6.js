//// [generatorInAmbientContext6.ts]
module M {
    export function *generator(): any { }
}

//// [generatorInAmbientContext6.js]
var M = M || (M = {});
(function (M) {
    function* generator() { }
    M.generator = generator;
})(M);


//// [generatorInAmbientContext6.d.ts]
declare module M {
    function generator(): any;
}
