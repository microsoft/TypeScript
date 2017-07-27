namespace Test1 {
    export interface Foo {
        bar: string;
    }

    var x: Foo.bar = "";
}

namespace Test2 {
    export class Foo {
        bar: string;
    }

    var x: Foo.bar = "";
}

namespace Test3 {
    export type Foo = {
        bar: string;
    }

    var x: Foo.bar = "";
}

namespace Test4 {
    export type Foo = { bar: number }
                    | { bar: string }

    var x: Foo.bar = "";
}

namespace Test5 {
    export type Foo = { bar: number }
                    | { wat: string }

    var x: Foo.bar = "";
}