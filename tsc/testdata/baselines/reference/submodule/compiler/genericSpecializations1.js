//// [tests/cases/compiler/genericSpecializations1.ts] ////

//// [genericSpecializations1.ts]
interface IFoo<T> {
    foo<T>(x: T): T; // no error on implementors because IFoo's T is different from foo's T
}

class IntFooBad implements IFoo<number> {
    foo(x: string): string { return null; }
}

class StringFoo2 implements IFoo<string> {
    foo(x: string): string { return null; }
}

class StringFoo3 implements IFoo<string> {
    foo<T>(x: T): T { return null; }
}

//// [genericSpecializations1.js]
class IntFooBad {
    foo(x) { return null; }
}
class StringFoo2 {
    foo(x) { return null; }
}
class StringFoo3 {
    foo(x) { return null; }
}
