// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
//@target: ES5
var symbol: any;

class Foo {
    [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    [symbol]() {
        return super[symbol]();
    }
}