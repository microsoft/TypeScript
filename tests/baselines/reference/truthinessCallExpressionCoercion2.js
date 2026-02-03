//// [tests/cases/compiler/truthinessCallExpressionCoercion2.ts] ////

//// [truthinessCallExpressionCoercion2.ts]
declare class A {
    static from(): string;
}

declare class B {
    static from(): string;
}

function test(required1: () => boolean, required2: () => boolean, b: boolean, optional?: () => boolean) {
    // error
    required1 && console.log('required');

    // error
    1 && required1 && console.log('required');

    // ok
    required1 && required1();

    // ok
    required1 && 1 && required1();

    // ok
    optional && console.log('optional');

    // ok
    1 && optional && console.log('optional');

    // ok
    !!required1 && console.log('not required');

    // ok
    required1() && console.log('required call');

    // ok
    required1 && required2 && required1() && required2();

    // ok
    [].forEach((f: () => void) => f && f.apply(parent, []));

    // error
    required1 && required2 && required1() && console.log('foo');

    // error
    if (required1 && b) {
    }

    // error
    if (required1 || b) {
    }

    // error
    if (required1 || required2) {
    }

    // error
    if (required1 ?? b) {
    }

    // error
    if (required1 ?? required2) {
    }

    // error
    if (((required1 && b))) {
    }

    // ok
    if (required1 && b) {
        required1();
    }

    // ok
    if (required1 || b) {
        required1();
    }

    // ok
    if (required1 ?? b) {
        required1();
    }

    // ok
    if (b ?? required1) {
        required1();
    }

    // ok
    if (((required1 && b))) {
        required1();
    }

    // error, extra parens are on purpose here
    if ((required1)) {
    }

    // error
    if (b && (required1 || required2)) {
    }

    // error
    if ((required1 || required2) && b) {
    }

    // error
    if (b && (required1 ?? required2)) {
    }

    // error
    if ((required1 ?? required2) && b) {
    }
}

function checksConsole() {
    // error
    typeof window !== 'undefined' && window.console &&
        ((window.console as any).firebug || (window.console.error && window.console.table));
}

function checksPropertyAccess() {
    const x = {
        foo: {
            bar() { return true; }
        }
    }

    // error
    x.foo.bar && console.log('x.foo.bar');

    // error
    1 && x.foo.bar && console.log('x.foo.bar');

    // ok
    x.foo.bar && x.foo.bar();

    // ok
    x.foo.bar && 1 && x.foo.bar();

    // ok
    const y = A.from && (A.from as Function) !== B.from ? true : false;
    y;

    const x1 = {
        a: { b: { c: () => {} } }
    }
    const x2 = {
        a: { b: { c: () => {} } }
    }

    // error
    x1.a.b.c && x2.a.b.c();

    // error, extra parens are on purpose here
    if ((x1.a.b.c)) {
    }

    // error
    if (1 && (x1.a.b.c || x2.a.b.c)) {
    }

    // error
    if ((x1.a.b.c || x2.a.b.c) && 1) {
    }

    // error
    if (1 && (x1.a.b.c ?? x2.a.b.c)) {
    }

    // error
    if ((x1.a.b.c ?? x2.a.b.c) && 1) {
    }
}

class Foo {
    optional?: () => boolean;
    required() {
        return true;
    }
    test() {
        // error
        this.required && console.log('required');

        // error
        1 && this.required && console.log('required');

        // ok
        this.required && this.required();

        // ok
        this.required && 1 && this.required();

        // ok
        1 && this.optional && console.log('optional');
    }
}


//// [truthinessCallExpressionCoercion2.js]
function test(required1, required2, b, optional) {
    // error
    required1 && console.log('required');
    // error
    1 && required1 && console.log('required');
    // ok
    required1 && required1();
    // ok
    required1 && 1 && required1();
    // ok
    optional && console.log('optional');
    // ok
    1 && optional && console.log('optional');
    // ok
    !!required1 && console.log('not required');
    // ok
    required1() && console.log('required call');
    // ok
    required1 && required2 && required1() && required2();
    // ok
    [].forEach(function (f) { return f && f.apply(parent, []); });
    // error
    required1 && required2 && required1() && console.log('foo');
    // error
    if (required1 && b) {
    }
    // error
    if (required1 || b) {
    }
    // error
    if (required1 || required2) {
    }
    // error
    if (required1 !== null && required1 !== void 0 ? required1 : b) {
    }
    // error
    if (required1 !== null && required1 !== void 0 ? required1 : required2) {
    }
    // error
    if (((required1 && b))) {
    }
    // ok
    if (required1 && b) {
        required1();
    }
    // ok
    if (required1 || b) {
        required1();
    }
    // ok
    if (required1 !== null && required1 !== void 0 ? required1 : b) {
        required1();
    }
    // ok
    if (b !== null && b !== void 0 ? b : required1) {
        required1();
    }
    // ok
    if (((required1 && b))) {
        required1();
    }
    // error, extra parens are on purpose here
    if ((required1)) {
    }
    // error
    if (b && (required1 || required2)) {
    }
    // error
    if ((required1 || required2) && b) {
    }
    // error
    if (b && (required1 !== null && required1 !== void 0 ? required1 : required2)) {
    }
    // error
    if ((required1 !== null && required1 !== void 0 ? required1 : required2) && b) {
    }
}
function checksConsole() {
    // error
    typeof window !== 'undefined' && window.console &&
        (window.console.firebug || (window.console.error && window.console.table));
}
function checksPropertyAccess() {
    var _a, _b;
    var x = {
        foo: {
            bar: function () { return true; }
        }
    };
    // error
    x.foo.bar && console.log('x.foo.bar');
    // error
    1 && x.foo.bar && console.log('x.foo.bar');
    // ok
    x.foo.bar && x.foo.bar();
    // ok
    x.foo.bar && 1 && x.foo.bar();
    // ok
    var y = A.from && A.from !== B.from ? true : false;
    y;
    var x1 = {
        a: { b: { c: function () { } } }
    };
    var x2 = {
        a: { b: { c: function () { } } }
    };
    // error
    x1.a.b.c && x2.a.b.c();
    // error, extra parens are on purpose here
    if ((x1.a.b.c)) {
    }
    // error
    if (1 && (x1.a.b.c || x2.a.b.c)) {
    }
    // error
    if ((x1.a.b.c || x2.a.b.c) && 1) {
    }
    // error
    if (1 && ((_a = x1.a.b.c) !== null && _a !== void 0 ? _a : x2.a.b.c)) {
    }
    // error
    if (((_b = x1.a.b.c) !== null && _b !== void 0 ? _b : x2.a.b.c) && 1) {
    }
}
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.required = function () {
        return true;
    };
    Foo.prototype.test = function () {
        // error
        this.required && console.log('required');
        // error
        1 && this.required && console.log('required');
        // ok
        this.required && this.required();
        // ok
        this.required && 1 && this.required();
        // ok
        1 && this.optional && console.log('optional');
    };
    return Foo;
}());
