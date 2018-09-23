//// [nestedModulePrivateAccess.ts]
module a{
       var x:number;
       module b{
               var y = x; // should not be an error
       }
}

//// [nestedModulePrivateAccess.js]
var a = a || (a = {});
(function (a) {
    var x;
    var b = b || (b = {});
    (function (b) {
        var y = x; // should not be an error
    })(b);
})(a);
