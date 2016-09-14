// @allowUnreachableCode: true

// ~ operator on any type

var ANY: any;
var ANY1;
var ANY2: any[] = ["", ""];
var obj: () => {}
var obj1 = { x:"", y: () => { }};

function foo(): any {
    var a;
    return a;
}
class A {
    public a: any;
    static foo() {
        var a;
        return a;
    }
}
module M {
    export var n: any;
}
var objA = new A();

// any other type var
var ResultIsNumber = ~ANY1;
var ResultIsNumber1 = ~ANY2;
var ResultIsNumber2 = ~A;
var ResultIsNumber3 = ~M;
var ResultIsNumber4 = ~obj;
var ResultIsNumber5 = ~obj1;

// any type literal
var ResultIsNumber6 = ~undefined;
var ResultIsNumber7 = ~null;

// any type expressions
var ResultIsNumber8 = ~ANY2[0]
var ResultIsNumber9 = ~obj1.x;
var ResultIsNumber10 = ~obj1.y;
var ResultIsNumber11 = ~objA.a;
var ResultIsNumber12 = ~M.n;
var ResultIsNumber13 = ~foo();
var ResultIsNumber14 = ~A.foo();
var ResultIsNumber15 = ~(ANY + ANY1);
var ResultIsNumber16 = ~(null + undefined);
var ResultIsNumber17 = ~(null + null);
var ResultIsNumber18 = ~(undefined + undefined);

// multiple ~ operators
var ResultIsNumber19 = ~~ANY;
var ResultIsNumber20 = ~~~(ANY + ANY1);

//miss assignment operators
~ANY;
~ANY1;
~ANY2[0];
~ANY, ANY1;
~obj1.y;
~objA.a;
~M.n;
~~obj1.x;