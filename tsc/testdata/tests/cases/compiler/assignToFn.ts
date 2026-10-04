// @target: es2015
namespace M {
    interface I {
	f(n:number):boolean;
    }

    var x:I={ f:function(n) { return true; } };

    x.f="hello";
}
