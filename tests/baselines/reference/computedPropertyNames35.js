//// [computedPropertyNames35.ts]
function foo<T>() { return '' }
interface I<T> {
    bar(): string;
    [foo<T>()](): void;
}

//// [computedPropertyNames35.js]
function foo() { return ''; }
