//@target: ES6
var symbol = Symbol.for('myThing');

class Bar {
    [symbol]() {
        return super[symbol]();
    }
}