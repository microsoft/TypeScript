//// [assignToFn.ts]
module M {
    interface I {
	f(n:number):boolean;
    }

    var x:I={ f:function(n) { return true; } };

    x.f="hello";
}


//// [assignToFn.js]
var M = M || (M = {});
(function (M) {
    var x = { f: function (n) { return true; } };
    x.f = "hello";
})(M);
