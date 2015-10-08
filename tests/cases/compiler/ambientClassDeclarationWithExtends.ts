declare class A { }
declare class B extends A { }

declare class C {
    public foo;
}
namespace D { var x; }
declare class D extends C { }

var d: C = new D();
