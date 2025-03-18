//// [tests/cases/compiler/duplicateIdentifierRelatedSpans2.ts] ////

//// [file1.ts]
class A { }
class B { }
class C { }
class D { }
class E { }
class F { }
class G { }
class H { }
class I { }
//// [file2.ts]
class A { }
class B { }
class C { }
class D { }
class E { }
class F { }
class G { }
class H { }
class I { }


//// [file1.js]
class A {
}
class B {
}
class C {
}
class D {
}
class E {
}
class F {
}
class G {
}
class H {
}
class I {
}
//// [file2.js]
class A {
}
class B {
}
class C {
}
class D {
}
class E {
}
class F {
}
class G {
}
class H {
}
class I {
}
