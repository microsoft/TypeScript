//// [nonExportedElementsOfMergedModules.ts]
module One {
    enum A { X }
    module B {
        export var x;
    }
}

module One {
    enum A { Y }
    module B {
        export var y;
    }
    B.x;
    B.y;
}


//// [nonExportedElementsOfMergedModules.js]
var One = One || (One = {});
(function (One) {
    var A = A || (A = {});
    (function (A) {
        A[A["X"] = 0] = "X";
    })(A);
    var B = B || (B = {});
    (function (B) {
    })(B);
})(One);
(function (One) {
    var A = A || (A = {});
    (function (A) {
        A[A["Y"] = 0] = "Y";
    })(A);
    var B = B || (B = {});
    (function (B) {
    })(B);
    B.x;
    B.y;
})(One);
