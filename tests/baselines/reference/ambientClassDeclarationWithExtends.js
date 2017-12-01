//// [tests/cases/compiler/ambientClassDeclarationWithExtends.ts] ////

//// [ambientClassDeclarationExtends_singleFile.ts]
declare class A { }
declare class B extends A { }

declare class C {
    public foo;
}
namespace D { var x; }
declare class D extends C { }

var d: C = new D();

//// [ambientClassDeclarationExtends_file1.ts]
declare class E {
    public bar;
}
namespace F { var y; }

//// [ambientClassDeclarationExtends_file2.ts]
declare class F extends E { }
var f: E = new F();


//// [ambientClassDeclarationExtends_singleFile.js]
var D;
(function (D) {
    var x;
})(D || (D = {}));
var d = new D();
//// [ambientClassDeclarationExtends_file1.js]
var F;
(function (F) {
    var y;
})(F || (F = {}));
//// [ambientClassDeclarationExtends_file2.js]
var f = new F();
