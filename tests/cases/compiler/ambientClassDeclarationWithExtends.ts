// @Filename: ambientClassDeclarationExtends_singleFile.ts
declare class A { }
declare class B extends A { }

declare class C {
    public foo;
}
namespace D { var x; }
declare class D extends C { }

var d: C = new D();

// @Filename: ambientClassDeclarationExtends_file1.ts

declare class E {
    public bar;
}
namespace F { var y; }

// @Filename: ambientClassDeclarationExtends_file2.ts

declare class F extends E { }
var f: E = new F();
