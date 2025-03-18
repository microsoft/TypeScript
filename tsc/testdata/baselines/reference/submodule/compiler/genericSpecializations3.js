//// [tests/cases/compiler/genericSpecializations3.ts] ////

//// [genericSpecializations3.ts]
interface IFoo<T> {
    foo(x: T): T;
}

var iFoo: IFoo<number>;
iFoo.foo(1);

class IntFooBad implements IFoo<number> { // error
    foo(x: string): string { return null; }
}

var intFooBad: IntFooBad;

class IntFoo implements IFoo<number> {
    foo(x: number): number { return null; }
}

var intFoo: IntFoo;

class StringFoo2 implements IFoo<string> {
    foo(x: string): string { return null; }
}

var stringFoo2: StringFoo2;
stringFoo2.foo("hm");


intFoo = stringFoo2; // error
stringFoo2 = intFoo; // error


class StringFoo3 implements IFoo<string> { // error
    foo<T>(x: T): T { return null; }
}
var stringFoo3: StringFoo3;

//// [genericSpecializations3.js]
var iFoo;
iFoo.foo(1);
class IntFooBad {
    foo(x) { return null; }
}
var intFooBad;
class IntFoo {
    foo(x) { return null; }
}
var intFoo;
class StringFoo2 {
    foo(x) { return null; }
}
var stringFoo2;
stringFoo2.foo("hm");
intFoo = stringFoo2;
stringFoo2 = intFoo;
class StringFoo3 {
    foo(x) { return null; }
}
var stringFoo3;
