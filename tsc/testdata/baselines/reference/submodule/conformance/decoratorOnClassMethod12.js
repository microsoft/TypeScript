//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod12.ts] ////

//// [decoratorOnClassMethod12.ts]
module M {
    class S {
        decorator(target: Object, key: string): void { }
    }
    class C extends S {
        @(super.decorator)
        method() { }
    }
}

//// [decoratorOnClassMethod12.js]
var M;
(function (M) {
    class S {
        decorator(target, key) { }
    }
    class C extends S {
        @(super.decorator)
        method() { }
    }
})(M || (M = {}));
