class cls1 {
    private cFunc() { }
    public ceFunc() { }
    public ceVar = 1;
    static csVar = 1;
    static csFunc(){ }
}

cls1.csVar = 2;

function fnc1( ){
    var bar = 1;
    function foob( ){ }
    static foovar;
    static foosfunc( ) { }
} // Not fully implemented yet: static get fooGet( ); static set fooSet( bar );

fnc1.foovar = 1;
 
module mod1 {
    var mX = 1;
    function mFunc() { }
    class mClass { }
    module mMod { }
    interface mInt { }
    export var meX = 1;
    export function meFunc() { }
    export class meClass { }
    export module meMod { export var iMex = 1; }
    export interface meInt { }
} 
   
mod1.meX = 2;

interface int1 {
    (bar:any): any;
    new (bar:any): any;
    [bar:any]: any;
    bar:any;
    foob(bar:any): any;
} // Need to find a way to implement this int1.

var obj1: {
    (bar:any): any;
    new (bar:any): any;
    [bar:any]: any;
    bar:any;
    foob(bar:any): any;
}

obj1.bar = 1;

var cls2 = new cls1();
cls2.ceVar = 2;

class cls3 extends cls1 {
    property zeFunc() {
        super.ceFunc();
    }
}

module mod3 {
    export var hmm = 1;
}

mod3.hmm = 1;

module frmTest {
    var mX;
    export var meX = 1;
    export function meFunc() { }
    export class meClass { }
    export interface meInt { }
    export module frmTest2 {
        export var meX = 1;
        export function meFunc() { }
        export class meClass { }
        export module meMod { }
        export interface meInt { }
    }
}

module frmConfirm {
    import Mod1 = mod1;
    import iMod1 = mod1.meMod;
    Mod1.meX = 1;
    iMod1.iMex = 1; 
}

// Completion after invalid character
module testModule {
    export var foo = 1;
}
@ 
testModule.

// Completion after dot in named type, when the following line has a keyword
module TypeModule1 {
    export class C1 {}
    export class C2 {}
}
var x : TypeModule1.
module TypeModule2 {
    export class Test3 {}
}

// Completion after dot in named type, when the following line has a keyword
TypeModule1.
module TypeModule3 {
    export class Test3 {}
}