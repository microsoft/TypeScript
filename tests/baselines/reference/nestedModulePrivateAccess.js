//// [nestedModulePrivateAccess.ts]
module a{
       var x:number;
       module b{
               var y = x; // should not be an error
       }
}

//// [nestedModulePrivateAccess.js]
var a;
(function (a) {
    var x;
    var b;
    (function (b) {
        var y = x; // should not be an error
    })(b || (b = {}));
})(a || (a = {}));
