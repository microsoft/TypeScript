//@target: ES6
function* g() {
    var x = class C extends (yield) {};
}