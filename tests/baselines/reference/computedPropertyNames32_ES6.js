//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames32_ES6.ts] ////

//// [computedPropertyNames32_ES6.ts]
function foo<T>() { return '' }
class C<T> {
    bar() {
        return 0;
    }
    [foo<T>()]() { }
}

//// [computedPropertyNames32_ES6.js]
function foo() { return ''; }
class C {
    bar() {
        return 0;
    }
    [foo()]() { }
}
