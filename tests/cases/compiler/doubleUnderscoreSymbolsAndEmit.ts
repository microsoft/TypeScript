// @jsx: react
// @jsxFactory: __make
// @module: commonjs
// @filename: index.tsx

declare global {
    namespace JSX {
        interface IntrinsicElements {
            __foot: any;
        }
    }
    function __make (params: object): any;
}

enum Foo {
    "__a" = 1,
    "(Anonymous function)" = 2,
    "(Anonymous class)" = 4,
    "__call" = 10
}
namespace Foo {
    export function ___call(): number {
        return 5;
    }
}
function Bar() {
    return "no";
}
namespace Bar {
    export function __call(x: number): number {
        return 5;
    }
}

const thing = <__foot></__foot>;

export * from "./b";
export * from "./c";

function doThing() {
    __call: while (true) {
        aLabel: for (let i = 0; i < 10; i++) {
            if (i === 3) {
                break __call;
            }
            if (i === 5) {
                break aLabel;
            }
        }
    }
}
doThing();

// @filename: b.ts
export function __foo(): number | void {}

// @filename: c.ts
export function __foo(): string | void {}
