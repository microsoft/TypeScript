//// [tests/cases/compiler/interfacePropertiesWithSameName3.ts] ////

//// [interfacePropertiesWithSameName3.ts]
interface D { a: number; }
interface E { a: string; }
interface F extends E, D { } // error

class D2 { a: number; }
class E2 { a: string; }
interface F2 extends E2, D2 { } // error


//// [interfacePropertiesWithSameName3.js]
class D2 {
    a;
}
class E2 {
    a;
}
