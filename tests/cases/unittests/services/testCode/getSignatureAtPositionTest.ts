//Comment
class sampleCls { constructor (str: string, num: number) { } }
var x = new sampleCls("", 5);   // new() test
sampleCls();    // negative test

function fnTest(str: string, num: number) { }
fnTest();   // simple function test

function fnOverload();
function fnOverload(test: string); function fnOverload(test: string) { }
fnOverload()
fnOverload("")

class clsOverload { constructor (); constructor (test: string); constructor (test?: string) { } }
var x = new clsOverload();
var x = new clsOverload("");

module SimpleTests {
    module CallExpressions {
        class Foo {
            public f1() { }
            public f2(n: number) { }
            public f3(n: number, s: string) { }

        }

        var x = new Foo();
        x.f1();
        x.f2(5);
        x.f3(5, "");
        x.f1(
        x.f2(5,
        x.f3(5,
        }

    module NewExpressions {

    }
}

module OverloadTests {
    module CallExpressions {
        function foo(callback: (a: number, b: string) => string) {
            callback(5, "");
        }
    }
}

module AnonymousFunctionTest {
    var x2 = function (n: number, s: string): (a: number, b: string) => string {
        return null;
    }
    x2(5, "")(1, "");
}

module ObjectLiteralTest {
    var x = { n: 5, s: "", f: (a: number, b: string) => "" };
    x.f(4, "");
}

module SuperCallTest {
    class base {
        constructor(s: string);
        constructor(n: number);
        constructor(a: any) { }
    }
    class A extends base {
        constructor() {
            super("");
        }
    }

    class B extends base {
    }
    class B2 extends B {
    }
    class B3 extends B2 {
        constructor() {
            super("");
        }
    }

}


