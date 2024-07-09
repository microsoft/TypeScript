//// [tests/cases/compiler/contextualTypeAppliedToVarArgs.ts] ////

//// [contextualTypeAppliedToVarArgs.ts]
function delegate(instance: any, method: (...args: any[]) => any, data?: any): (...args: any[]) => any {
    return function () { };
}

class Foo{


    Bar() {
        delegate(this, function (source, args2)
        {
            var a = source.node;
            var b = args2.node;
        } );
    }
}


//// [contextualTypeAppliedToVarArgs.js]
function delegate(instance, method, data) {
    return function () { };
}
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.Bar = function () {
        delegate(this, function (source, args2) {
            var a = source.node;
            var b = args2.node;
        });
    };
    return Foo;
}());
