interface Foo {
    bar: {
        baz: {
            inner: {
                thing: string
            }
        }
    }
}

async function asyncFoo(): Promise<Foo> {
    return {
        bar: {
            baz: {
                inner: {
                    thing: 1
                }
            }
        }
    }
}