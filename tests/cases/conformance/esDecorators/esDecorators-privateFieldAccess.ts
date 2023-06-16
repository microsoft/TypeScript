// @target: esnext
// @noEmitHelpers: true

declare let dec: any;

@dec(x => x.#foo) // error
class Foo {
    #foo = 3;

    @dec(this, (x: Foo) => x.#foo) // ok
    m() {}
}
