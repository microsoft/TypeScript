// @target: ES5, ES2015
// @experimentaldecorators: true
namespace M {
    class S {
        decorator(target: Object, key: string): void { }
    }
    class C extends S {
        @(super.decorator)
        method() { }
    }
}