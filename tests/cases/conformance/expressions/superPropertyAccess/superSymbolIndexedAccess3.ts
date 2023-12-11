// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
//@target: ES6
var symbol = Symbol.for('myThing');

class Foo {
    [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    [symbol]() {
        return super[Bar]();
    }
}