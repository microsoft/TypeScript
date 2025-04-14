// @declaration: true
export interface Foo {
    item: Bar;
}

interface Bar {
    baz(): void;
}

namespace Bar {
    export function biz() {
        return 0;
    }
}