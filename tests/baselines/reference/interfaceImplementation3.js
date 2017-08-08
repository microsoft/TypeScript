//// [interfaceImplementation3.ts]
interface I1 {
    iObj:{ };
    iNum:number;
    iAny:any;
    iFn():void;
}

class C4 implements I1 {
    public iObj:{ };
    public iNum:number;
    public iFn() { }
}




//// [interfaceImplementation3.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var C4 = (function () {
    function C4() {
    }
    C4.prototype.iFn = function () { };
    __names(C4.prototype, ["iFn"]);
    return C4;
}());
