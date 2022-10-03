// @noImplicitOverride: true
// @target: esnext

class Foo {
    property = 1
}

class SubFoo extends Foo {
    declare property: number
}
