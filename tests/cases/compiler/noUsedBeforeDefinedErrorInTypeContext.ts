// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/8775

interface IThing<T> {
    owner: T;
}

var foo = {
    one: {} as IThing<typeof foo>,
}

let baz = {
    two: {} as IThing<typeof bar>,
}

let bar = {
    three: {} as IThing<typeof bar>,
}

const qwe = {
    four: {} as IThing<typeof qwe>,
}
