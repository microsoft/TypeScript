//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldClassExpression.ts] ////

//// [privateNameFieldClassExpression.ts]
class B {
    #foo = class {
        constructor() {
            console.log("hello");
        }
        static test = 123;
    };
    #foo2 = class Foo {
        static otherClass = 123;
    };
}




//// [privateNameFieldClassExpression.js]
class B {
    #foo = class {
        constructor() {
            console.log("hello");
        }
        static test = 123;
    };
    #foo2 = class Foo {
        static otherClass = 123;
    };
}
