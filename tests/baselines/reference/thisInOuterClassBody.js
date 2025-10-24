//// [tests/cases/compiler/thisInOuterClassBody.ts] ////

//// [thisInOuterClassBody.ts]
class Foo {

    x = this;

    static y = this;

    bar() {
 
        this.x; // 'this' is type 'Foo'
 
        var f = () => this.x; // 'this' should be type 'Foo' as well
        var p = this.y;
        return this;
    }

    static bar2() {
        var a = this.y;
        var b = this.x;
    }
}

//// [thisInOuterClassBody.js]
var _a;
class Foo {
    constructor() {
        this.x = this;
    }
    bar() {
        this.x; // 'this' is type 'Foo'
        var f = () => this.x; // 'this' should be type 'Foo' as well
        var p = this.y;
        return this;
    }
    static bar2() {
        var a = this.y;
        var b = this.x;
    }
}
_a = Foo;
Foo.y = _a;
