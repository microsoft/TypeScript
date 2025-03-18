//// [tests/cases/compiler/quotedPropertyName3.ts] ////

//// [quotedPropertyName3.ts]
class Test {
    "prop1": number;
    foo() {
        var x = () => this["prop1"];
        var y: number = x();
    }
}

//// [quotedPropertyName3.js]
class Test {
    "prop1";
    foo() {
        var x = () => this["prop1"];
        var y = x();
    }
}
