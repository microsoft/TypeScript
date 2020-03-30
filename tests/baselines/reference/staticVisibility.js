//// [staticVisibility.ts]
class C1 {
    
    p: any;
    static s: any;

    constructor() {
        var v = 0;

        s = 1; // should be error
        C1.s = 1; // should be ok

        b(); // should be error
        C1.b(); // should be ok
    }

    static b() {
        v = 1; // should be error
        this.p = 0; // should be error
        C1.s = 1; // should be ok
    }
}

class C2 {
 
barback:string = "";
 



static get Bar() {return "bar";} // ok
 
static set Bar(bar:string) {barback = bar;} // not ok

}



//// [staticVisibility.js]
var C1 = /** @class */ (function () {
    function C1() {
        var v = 0;
        s = 1; // should be error
        C1.s = 1; // should be ok
        b(); // should be error
        C1.b(); // should be ok
    }
    C1.b = function () {
        v = 1; // should be error
        this.p = 0; // should be error
        C1.s = 1; // should be ok
    };
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
        this.barback = "";
    }
    Object.defineProperty(C2, "Bar", {
        get: function () { return "bar"; } // ok
        ,
        set: function (bar) { barback = bar; } // not ok
        ,
        enumerable: false,
        configurable: true
    });
    return C2;
}());
