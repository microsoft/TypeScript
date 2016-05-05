/// <reference path="../binder.ts" />

// TODO: Does @internal protected the contents from being publically visible?
/* @internal */
namespace ts {
    let nextSymbolId = 1;
    let nextNodeId = 1;
    export function getNodeId(node: Node): number {
        if (!node.id) {
            node.id = nextNodeId;
            nextNodeId++;
        }
        return node.id;
    }
    export function getSymbolId(symbol: Symbol): number {
        if (!symbol.id) {
            symbol.id = nextSymbolId;
            nextSymbolId++;
        }

        return symbol.id;
    }

    export function symbolConstructor() {
        let symbolCount = 0;
        const Symbol = objectAllocator.getSymbolConstructor();
        function createSymbol(flags: SymbolFlags, name: string): Symbol {
            symbolCount++;
            return new Symbol(flags, name);
        }
        function getSymbolCount(host: TypeCheckerHost) {
            return sum(host.getSourceFiles(), "symbolCount") + symbolCount;
        }
        // TODO: A lot more core symbol things could go here
        return { createSymbol, getSymbolCount };
   }
}
