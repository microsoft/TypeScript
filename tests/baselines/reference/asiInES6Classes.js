//// [asiInES6Classes.ts]
class Foo {

 

    defaults = {

        done: false

    }

 

    bar() {

        return 3;

    }

 

}


//// [asiInES6Classes.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.defaults = {
            done: false
        };
    }
    Foo.prototype.bar = function () {
        return 3;
    };
    return Foo;
}());
