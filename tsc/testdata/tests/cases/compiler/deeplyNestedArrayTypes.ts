// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3426

namespace A {
    export type Outer = {
        inners: Inner[];
    }
    export type Inner = {
        mids: Mid[];
    }
    export type Mid = {
        leaves: Leaf[];
    }
    export type Leaf = {
        id: string;
    }
}

namespace B {
    export type Outer = {
        inners: Inner[];
    }
    export type Inner = {
        mids: Mid[];
    }
    export type Mid = {
        leaves: Leaf[];
    }
    export type Leaf = {
        id: number;
    }
}

function test(a: A.Outer, b: B.Outer) {
    a = b
}
