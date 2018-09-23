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
var M = M || (M = {});
(function (M) {
    function f(p) { return f; }
    ;
    var i;
    f(i);
    f(f(i));
    f((f(f(i))));
})(M);
