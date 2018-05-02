function foo () {
    const a: number = 1 + 2;
    const foo = {
        a: 123
    }
    const bar = {
        a
    }
    class Foo {
        a = 456
    }
    class Bar {
        get a () {
            return 1
        }
        set a (v) {

        }
    }
    class Baz {
        get [a] () {
            return a
        }
        set [a] (a) {

        }
    }

    function baz (a) {

    }
    if (a) {
        // nothing
    }
    if (a === 2) {
        // todo
    }
    const b = a + 1
    if (b) {
        // ...
    }
    const c = a + b
    if (c) {

    }
    if (foo.a) {
        a.toString()
    }
    if (foo[a]) {
        a['toString']()
    }
}
