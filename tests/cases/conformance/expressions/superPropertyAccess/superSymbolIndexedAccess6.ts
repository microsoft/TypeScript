// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
//@target: ES5
var symbol: any;

class Foo {
    static [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    static [symbol]() {
        return super[symbol]();
    }
}