//// [implicitAnyDeclareMemberWithoutType2.ts]
// this should be an error
class C {
    public x = null;// error at "x"
    public x1: string  // no error

    constructor(c1, c2, c3: string) { }  // error at "c1, c2"
    funcOfC(f1, f2, f3: number) { }     // error at "f1,f2"
}


//// [implicitAnyDeclareMemberWithoutType2.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
// this should be an error
var C = (function () {
    function C(c1, c2, c3) {
        this.x = null; // error at "x"
    } // error at "c1, c2"
    C.prototype.funcOfC = function (f1, f2, f3) { }; // error at "f1,f2"
    __names(C.prototype, ["funcOfC"]);
    return C;
}());
