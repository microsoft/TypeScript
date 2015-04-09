// @target: ES5
module M {
    class C {
        decorator(target: Object, key: string): void { }

        @this.decorator
        method() { }
    }
}