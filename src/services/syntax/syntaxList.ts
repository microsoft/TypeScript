///<reference path='references.ts' />

interface Array<T> {
    __data: number;

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
        return this.length >> 1;
    });

    addArrayFunction("nonSeparatorCount", function (): number {
        return (this.length + 1) >> 1;
    });

    addArrayFunction("separatorAt", function (index: number): ISyntaxToken {
        return this[(index << 1) + 1];
    });

    addArrayFunction("nonSeparatorAt", function (index: number): ISyntaxToken {
        return this[index << 1];
    });

    export function list<T extends ISyntaxNodeOrToken>(nodes: T[]): T[] {
        for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].parent = nodes;
        }

        return nodes;
    }

    export function separatedList<T extends ISyntaxNodeOrToken>(nodesAndTokens: ISyntaxNodeOrToken[]): ISeparatedSyntaxList<T> {
        for (var i = 0, n = nodesAndTokens.length; i < n; i++) {
            nodesAndTokens[i].parent = nodesAndTokens;
        }

        return <ISeparatedSyntaxList<T>>nodesAndTokens;
    }
}