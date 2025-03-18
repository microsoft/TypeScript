//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames35_ES5.ts] ////

//// [computedPropertyNames35_ES5.ts]
function foo<T>() { return '' }
interface I<T> {
    bar(): string;
    [foo<T>()](): void;
}

//// [computedPropertyNames35_ES5.js]
function foo() { return ''; }
