// @target: esnext, es2022, es2021, es2015
// @noEmitHelpers: true

declare let dec: any;

declare let f: any;

// `this` should point to the outer `this` in both cases.
@dec(this)
class A {
    @dec(this)
    b = 2;
}

// `this` should point to the outer `this`, and maintain the correct evaluation order with respect to computed
// property names.

@dec(this)
class B {
    // @ts-ignore
    [f(this)] = 1;

    @dec(this)
    b = 2;

    // @ts-ignore
    [f(this)] = 3;
}

// The `this` transformation should ensure that decorators inside the class body have privileged access to
// private names.
@dec(this)
class C {
    #a = 1;

    @dec(this, (x: C) => x.#a)
    b = 2;
}