//// [tests/cases/compiler/innerFunc.ts] ////

//// [innerFunc.ts]
function salt() {
  function pepper() { return 5;}
  return pepper();  
}

module M {
    export function tungsten() {
        function oxygen() { return 6; };
        return oxygen();
    }
}


//// [innerFunc.js]
function salt() {
    function pepper() { return 5; }
    return pepper();
}
var M;
(function (M) {
    function tungsten() {
        function oxygen() { return 6; }
        ;
        return oxygen();
    }
    M.tungsten = tungsten;
})(M || (M = {}));
