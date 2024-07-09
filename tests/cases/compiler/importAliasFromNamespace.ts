// @declaration: true
// @filename: internal.ts
namespace My.Internal {
    export function getThing(): void {}
    export const enum WhichThing {
        A, B, C
    }
}

// @filename: usage.ts
/// <reference path="./internal.ts" preserve="true" />
namespace SomeOther.Thing {
    import Internal = My.Internal;
    export class Foo {
        private _which: Internal.WhichThing;
        constructor() {
            Internal.getThing();
            Internal.WhichThing.A ? "foo" : "bar";
        }
    }
}