// @strict: true
// @noEmit: true

class Base {
}

declare const BaseFactory: new() => Base & { c: string }

class Derived extends BaseFactory {
    a = this.b
    b = "abc"
}
