///<reference path='references.ts' />

interface Array<T> {
    __data: number;

    kind: TypeScript.SyntaxKind;
    parent: TypeScript.ISyntaxElement;
}

module TypeScript {
    export interface ISeparatedSyntaxList<T extends ISyntaxNodeOrToken> extends Array<ISyntaxNodeOrToken> {
        //separatorCount(): number;
        //separatorAt(index: number): TypeScript.ISyntaxToken;

        //nonSeparatorCount(): number;
        //nonSeparatorAt(index: number): T;
    }
}

module TypeScript {
    export function separatorCount(list: ISeparatedSyntaxList<ISyntaxNodeOrToken>) {
        return list === undefined ? 0 : list.length >> 1;
    }

    export function nonSeparatorCount(list: ISeparatedSyntaxList<ISyntaxNodeOrToken>) {
        return list === undefined ? 0 : (list.length + 1) >> 1;
    }

    export function separatorAt(list: ISeparatedSyntaxList<ISyntaxNodeOrToken>, index: number): ISyntaxToken {
        return <ISyntaxToken>list[(index << 1) + 1];
    }

    export function nonSeparatorAt<T extends ISyntaxNodeOrToken>(list: ISeparatedSyntaxList<T>, index: number): T {
        return <T>list[index << 1];
    }
}

module TypeScript.Syntax {
    function addArrayPrototypeValue(name: string, val: any) {
        if (Object.defineProperty && (<any>Array.prototype)[name] === undefined) {
            Object.defineProperty(Array.prototype, name, { value: val, writable: false, enumerable: false });
        }
        else {
            (<any>Array.prototype)[name] = val;
        }
    }

    addArrayPrototypeValue("kind", SyntaxKind.List);

    export function list<T extends ISyntaxNodeOrToken>(nodes: T[]): T[] {
        return nodes;
    }

    export function separatedList<T extends ISyntaxNodeOrToken>(nodesAndTokens: ISyntaxNodeOrToken[]): ISeparatedSyntaxList<T> {
        return <ISeparatedSyntaxList<T>>nodesAndTokens;
    }
}