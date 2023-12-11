// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
//@target: ES6
var symbol = Symbol.for('myThing');

class Bar {
    [symbol]() {
        return super[symbol]();
    }
}