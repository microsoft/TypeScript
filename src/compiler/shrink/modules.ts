/// <reference path="../binder.ts" />

// TODO: This is *basically* AMD, so ... converting to a module system might
// not be that hard.
/* @internal */
namespace ts {
    export function moduleConstructor(
        { createSymbol, getSymbolCount }: {
            createSymbol: (flags: SymbolFlags, name: string) => Symbol,
            getSymbolCount: (host: TypeCheckerHost) => void
        }) {
        function moduleStub1() {
        }
        function moduleStub2() {
        }
        return { moduleStub1, moduleStub2 };
    }
}
