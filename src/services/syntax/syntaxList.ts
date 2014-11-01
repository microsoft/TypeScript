///<reference path='references.ts' />

interface Array<T> {
    data: number;

    kind(): TypeScript.SyntaxKind;
    parent: TypeScript.ISyntaxElement;

    childCount(): number;
    childAt(index: number): TypeScript.ISyntaxNodeOrToken;
}

module TypeScript {
    export interface ISeparatedSyntaxList<T extends ISyntaxNodeOrToken> extends Array<ISyntaxNodeOrToken> {
        separatorCount(): number;
        separatorAt(index: number): TypeScript.ISyntaxToken;

        nonSeparatorCount(): number;
        nonSeparatorAt(index: number): T;
    }
}

module TypeScript.Syntax {
    var _emptyList: ISyntaxNodeOrToken[] = [];

    function assertEmptyLists() {
        // Debug.assert(_emptyList.length === 0);
        // var separators = _emptySeparatedList.separators;
        // Debug.assert(!separators || separators.length === 0);
    }

    function addArrayFunction(name: string, func: Function) {
        if (Object.defineProperty) {
            Object.defineProperty(Array.prototype, name, { value: func, writable: true });
        }
        else {
            (<any>Array.prototype)[name] = func;
        }
    }

    addArrayFunction("kind", function () {
        return SyntaxKind.List;
    });

    addArrayFunction("childCount", function (): number {
        return this.length;
    });

    addArrayFunction("childAt", function (index: number): ISyntaxNodeOrToken {
        return this[index];
    });

    addArrayFunction("separatorCount", function (): number {
        assertEmptyLists();
        // Debug.assert(this.kind === SyntaxKind.SeparatedList);
        return this.length >> 1;
    });

    addArrayFunction("nonSeparatorCount", function (): number {
        assertEmptyLists();
        // Debug.assert(this.kind === SyntaxKind.SeparatedList);
        return (this.length + 1) >> 1;
    });

    addArrayFunction("separatorAt", function (index: number): ISyntaxToken {
        assertEmptyLists();
        // Debug.assert(this.kind === SyntaxKind.SeparatedList);
        // Debug.assert(index >= 0 && index < this.separators.length);
        return this[(index << 1) + 1];
    });

    addArrayFunction("nonSeparatorAt", function (index: number): ISyntaxToken {
        assertEmptyLists();
        // Debug.assert(this.kind === SyntaxKind.SeparatedList);
        // Debug.assert(index >= 0 && index < this.separators.length);
        return this[index << 1];
    });

    export function emptyList<T extends ISyntaxNodeOrToken>(): T[] {
        return <T[]>_emptyList;
    }

    export function emptySeparatedList<T extends ISyntaxNodeOrToken>(): ISeparatedSyntaxList<T> {
        return <ISeparatedSyntaxList<T>>_emptyList;
    }

    export function list<T extends ISyntaxNodeOrToken>(nodes: T[]): T[] {
        if (!nodes || nodes.length === 0) {
            return emptyList<T>();
        }

        for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].parent = nodes;
        }

        return nodes;
    }

    export function separatedList<T extends ISyntaxNodeOrToken>(nodesAndTokens: ISyntaxNodeOrToken[]): ISeparatedSyntaxList<T> {
        if (!nodesAndTokens || nodesAndTokens.length === 0) {
            return <ISeparatedSyntaxList<T>>emptyList<ISyntaxNodeOrToken>();
        }

        // Debug.assert(separators.length === nodes.length || separators.length == (nodes.length - 1));

        for (var i = 0, n = nodesAndTokens.length; i < n; i++) {
            nodesAndTokens[i].parent = nodesAndTokens;
        }

        return <ISeparatedSyntaxList<T>>nodesAndTokens;
    }

    export function nonSeparatorIndexOf<T extends ISyntaxNodeOrToken>(list: T[], ast: ISyntaxNodeOrToken): number {
        for (var i = 0, n = list.length; i < n; i++) {
            if (list[i] === ast) {
                return i;
            }
        }

        return -1;
    }
}