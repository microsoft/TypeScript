//// [interfaceImplementation1.ts]
interface I1 {
    iObj:{ };
    iNum:number;
    iAny:any;
    iFn():void;
}

interface I2 {
	iFn(n:number, s:string):void;
}

class C1 implements I1,I2 {
    private iFn();
	private iFn(n?:number, s?:string) { }
    private iAny:any;
    private iNum:number;
    private iObj:{ };
}

interface I3 {
    x: number;
}

interface I4 {
    ():I3;
    new ():I3;
    [call:number]:string;
}

class C2 implements I3 {
    public x = 1;
}

var a:I4 = function(){ 
    return new C2();
}
new a();

/*var b:I4 = C2;
new b();
*/

var c:I4;
c[5];
c["foo"];


//// [interfaceImplementation1.js]
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
var C1 = (function () {
    function C1() {
    }
    C1.prototype.iFn = function (n, s) { };
    __names(C1.prototype, ["iFn"]);
    return C1;
}());
var C2 = (function () {
    function C2() {
        this.x = 1;
    }
    return C2;
}());
var a = function () {
    return new C2();
};
new a();
/*var b:I4 = C2;
new b();
*/
var c;
c[5];
c["foo"];
