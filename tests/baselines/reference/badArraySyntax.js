//// [tests/cases/compiler/badArraySyntax.ts] ////

//// [badArraySyntax.ts]
class Z {
 public x = "";
}

var a1: Z[] = [];
var a2 = new Z[];
var a3 = new Z[]();
var a4: Z[] = new Z[];
var a5: Z[] = new Z[]();
var a6: Z[][] = new   Z     [      ]   [  ];


//// [badArraySyntax.js]
var Z = /** @class */ (function () {
    function Z() {
        this.x = "";
    }
    return Z;
}());
var a1 = [];
var a2 = new Z[];
var a3 = new Z[]();
var a4 = new Z[];
var a5 = new Z[]();
var a6 = new Z[][];
