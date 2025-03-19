//// [tests/cases/compiler/staticVisibility.ts] ////

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
class C1 {
    p;
    static s;
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
    barback = "";
    static get Bar() { return "bar"; } // ok
    static set Bar(bar) { barback = bar; } // not ok
}
