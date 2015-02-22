//// [computedPropertyNames35_ES6.ts]
function foo<T>() { return '' }
interface I<T> {
    bar(): string;
    [foo<T>()](): void;
}

//// [computedPropertyNames35_ES6.js]
function foo() { return ''; }
