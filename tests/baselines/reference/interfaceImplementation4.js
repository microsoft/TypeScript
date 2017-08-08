//// [interfaceImplementation4.ts]
interface I1 {
    iObj:{ };
    iNum:number;
    iAny:any;
    iFn():void;
}

class C5 implements I1 {
    public iNum:number;
    public iAny:any;
    public iFn() { }
}


//// [interfaceImplementation4.js]
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
var C5 = (function () {
    function C5() {
    }
    C5.prototype.iFn = function () { };
    __names(C5.prototype, ["iFn"]);
    return C5;
}());
