//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod11.ts] ////

//// [decoratorOnClassMethod11.ts]
module M {
    class C {
        decorator(target: Object, key: string): void { }

        @(this.decorator)
        method() { }
    }
}

//// [decoratorOnClassMethod11.js]
var M;
(function (M) {
    class C {
        decorator(target, key) { }
        @(this.decorator)
        method() { }
    }
})(M || (M = {}));
