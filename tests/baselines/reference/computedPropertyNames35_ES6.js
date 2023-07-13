//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames35_ES6.ts] ////

//// [computedPropertyNames35_ES6.ts]
function foo<T>() { return '' }
interface I<T> {
    bar(): string;
    [foo<T>()](): void;
}

//// [computedPropertyNames35_ES6.js]
function foo() { return ''; }
