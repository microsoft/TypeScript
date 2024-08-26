// @target: ES5
// @experimentaldecorators: true
module M {
    class S {
        decorator(target: Object, key: string): void { }
    }
    class C extends S {
        @(super.decorator)
        method() { }
    }
}