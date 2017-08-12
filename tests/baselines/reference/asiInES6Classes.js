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
var Foo = (function () {
    function Foo() {
        this.defaults = {
            done: false
        };
    }
    var proto_1 = Foo.prototype;
    proto_1.bar = function () {
        return 3;
    };
    return Foo;
}());
