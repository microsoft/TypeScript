//// [tests/cases/compiler/recursiveIdenticalOverloadResolution.ts] ////

//// [recursiveIdenticalOverloadResolution.ts]
module M {

   interface I { (i: I): I; }

   function f(p: I) { return f };

   var i: I;

   f(i);

   f(f(i));

   f((f(f(i))));

}


//// [recursiveIdenticalOverloadResolution.js]
var M;
(function (M) {
    function f(p) { return f; }
    ;
    var i;
    f(i);
    f(f(i));
    f((f(f(i))));
})(M || (M = {}));
