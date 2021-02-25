// @noImplicitAny: true

type BaseProtytype = {
    new(): BaseProtytype
    method(x: string): void
}

declare const Base: {
    new(): BaseProtytype
}

class Derived extends Base {
    method(x) { }
}
