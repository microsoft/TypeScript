enum Foo {
    baz = "baz"
}

enum Bar {
    baz = "baz"
}

enum Baz {
    baz = "ba" + "z"
}

interface IFoo {
    type: Foo.baz
    foo: string
}

interface IBar {
    type: Bar.baz
    bar: number
}

interface IBaz {
    type: Baz.baz
    baz: boolean
}

type T = IFoo | IBar | IBaz

function reduce(t: T) {
    switch (t.type) {
        case Foo.baz:
            t.foo
            break
        case Bar.baz:
            t.bar
            break
        case Baz.baz:
            t.baz
    }
}
