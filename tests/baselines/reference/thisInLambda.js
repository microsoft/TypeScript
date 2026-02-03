//// [tests/cases/compiler/thisInLambda.ts] ////

//// [thisInLambda.ts]
class Foo {
    x = "hello";
    bar() {
        this.x; // 'this' is type 'Foo'
        var f = () => this.x; // 'this' should be type 'Foo' as well
    }
}

function myFn(a:any) { }
class myCls {
    constructor () {
        myFn(() => {
            myFn(() => {
                var x = this;
            });
        });
    }
}

//// [thisInLambda.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.x = "hello";
    }
    Foo.prototype.bar = function () {
        var _this = this;
        this.x; // 'this' is type 'Foo'
        var f = function () { return _this.x; }; // 'this' should be type 'Foo' as well
    };
    return Foo;
}());
function myFn(a) { }
var myCls = /** @class */ (function () {
    function myCls() {
        var _this = this;
        myFn(function () {
            myFn(function () {
                var x = _this;
            });
        });
    }
    return myCls;
}());
