// @target: ES5
// @experimentaldecorators: true
namespace M {
    class C {
        decorator(target: Object, key: string): void { }

        @(this.decorator)
        method() { }
    }
}