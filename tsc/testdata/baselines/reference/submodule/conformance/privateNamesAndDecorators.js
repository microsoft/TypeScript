//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndDecorators.ts] ////

//// [privateNamesAndDecorators.ts]
declare function dec<T>(target: T): T;

class A {
    @dec                // Error
    #foo = 1;
    @dec                // Error
    #bar(): void { }
}


//// [privateNamesAndDecorators.js]
class A {
    @dec // Error
    #foo = 1;
    @dec // Error
    #bar() { }
}
