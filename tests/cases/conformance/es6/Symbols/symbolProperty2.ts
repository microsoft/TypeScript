//@target: ES6
var s = Symbol();
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
}