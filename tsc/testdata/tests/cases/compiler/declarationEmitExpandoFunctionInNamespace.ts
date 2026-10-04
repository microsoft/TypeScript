// @declaration: true
// @emitDeclarationOnly: true

namespace NS {
    export function f(): void {}
    f.a = "";
}

namespace Outer {
    export namespace Inner {
        export function g(): void {}
        g.b = 0;
    }
}
