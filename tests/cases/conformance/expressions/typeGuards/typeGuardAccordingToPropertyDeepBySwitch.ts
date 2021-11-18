// @strict: true

interface Foo1 {
    firstKey: number,
    inner: {
        secondKey: number,
        f1: number
    }
}

interface Foo2 {
    firstKey: boolean,
    inner: {
        secondKey: boolean,
        f2: number
    }
}

interface Foo3 {
    firstKey: string;
}

type Union = Foo1 | Foo2 | Foo3;

function f(u: Union) {
    switch (typeof u.firstKey) {
        case 'number':
        case 'boolean':
            u;
            switch (typeof u.inner.secondKey) {
                case 'boolean':
                    u;
            }
    }
}

type Union2 = Foo1 | Foo2;

// fall through
function f2(u: Union2) {
    switch (typeof u.inner["secondKey"]) {
        case 'boolean':
            u;  // never
        case 'bigint':
            u;  // Foo2
        default:
            u;  // Union2
    }
}
