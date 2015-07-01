// @target: ES5
// @experimentaldecorators: true
module M {
    class C {
        decorator(target: Object, key: string): void { }

        @this.decorator
        method() { }
    }
}