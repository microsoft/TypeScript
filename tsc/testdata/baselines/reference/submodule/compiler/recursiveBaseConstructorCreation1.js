//// [tests/cases/compiler/recursiveBaseConstructorCreation1.ts] ////

//// [recursiveBaseConstructorCreation1.ts]
class C1 {
public func(param: C2): any { }
}
class C2 extends C1 { }
var x = new C2(); // Valid


//// [recursiveBaseConstructorCreation1.js]
class C1 {
    func(param) { }
}
class C2 extends C1 {
}
var x = new C2();
