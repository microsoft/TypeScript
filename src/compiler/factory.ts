/// <reference path="core.ts"/>
/// <reference path="utilities.ts"/>

namespace ts {
    let NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
    let SourceFileConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;

    export function createNode(kind: SyntaxKind, pos?: number, end?: number): Node {
        if (kind === SyntaxKind.SourceFile) {
            return new (SourceFileConstructor || (SourceFileConstructor = objectAllocator.getSourceFileConstructor()))(kind, pos, end);
        }
        else {
            return new (NodeConstructor || (NodeConstructor = objectAllocator.getNodeConstructor()))(kind, pos, end);
        }
    }

    /* @internal */
    export function createNodeArray<T extends Node>(elements?: T[], pos?: number, end?: number): NodeArray<T> {
        const array = <NodeArray<T>>(elements || []);
        array.pos = pos;
        array.end = end;
        array.arrayKind = ArrayKind.NodeArray;
        return array;
    }

    /* @internal */
    export function createModifiersArray(elements?: Modifier[], pos?: number, end?: number): ModifiersArray {
        const array = <ModifiersArray>(elements || []);
        array.pos = pos;
        array.end = end;
        array.arrayKind = ArrayKind.ModifiersArray;
        array.flags = 0;
        return array;
    }

    /* @internal */
    export function createSynthesizedNode(kind: SyntaxKind, startsOnNewLine?: boolean): Node {
        const node = <SynthesizedNode>createNode(kind, /*pos*/ -1, /*end*/ -1);
        node.startsOnNewLine = startsOnNewLine;
        return node;
    }

    /* @internal */
    export function createSynthesizedNodeArray<T extends Node>(elements?: T[]): NodeArray<T> {
        return createNodeArray(elements, /*pos*/ -1, /*end*/ -1);
    }

    /* @internal */
    export function createSynthesizedModifiersArray(elements?: Modifier[]): ModifiersArray {
        return createModifiersArray(elements, /*pos*/ -1, /*end*/ -1);
    }

    /**
     * Creates a shallow, memberwise clone of a node. The "kind", "pos", "end", "flags", and "parent"
     * properties are excluded by default, and can be provided via the "location", "flags", and
     * "parent" parameters.
     *
     * @param node The node to clone.
     * @param location An optional TextRange to use to supply the new position.
     * @param flags The NodeFlags to use for the cloned node.
     * @param parent The parent for the new node.
     * @param original An optional pointer to the original source tree node.
     */
    /* @internal */
    export function cloneNode<T extends Node>(node: T, location?: TextRange, flags?: NodeFlags, parent?: Node, original?: Node): T {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).
        const clone = location !== undefined
            ? <T>createNode(node.kind, location.pos, location.end)
            : <T>createSynthesizedNode(node.kind);

        for (const key in node) {
            if (clone.hasOwnProperty(key) || !node.hasOwnProperty(key)) {
                continue;
            }

            (<any>clone)[key] = (<any>node)[key];
        }

        if (flags !== undefined) {
            clone.flags = flags;
        }

        if (parent !== undefined) {
            clone.parent = parent;
        }

        if (original !== undefined) {
            clone.original = original;
        }

        return clone;
    }

    /* @internal */
    export function createNodeArrayNode<T extends Node>(elements: T[]): NodeArrayNode<T> {
        const node = <NodeArrayNode<T>>createSynthesizedNode(SyntaxKind.NodeArrayNode);
        node.nodes = createNodeArray(elements);
        return node;
    }

    /* @internal */
    export function createReturn(expression?: Expression): ReturnStatement {
        const node = <ReturnStatement>createSynthesizedNode(SyntaxKind.ReturnStatement);
        node.expression = expression;
        return node;
    }

    /* @internal */
    export function createStatement(expression: Expression): ExpressionStatement {
        const node = <ExpressionStatement>createSynthesizedNode(SyntaxKind.ExpressionStatement);
        node.expression = expression;
        return node;
    }

    /* @internal */
    export function createVariableStatement(declarationList: VariableDeclarationList): VariableStatement {
        const node = <VariableStatement>createSynthesizedNode(SyntaxKind.VariableStatement);
        node.declarationList = declarationList;
        return node;
    }

    /* @internal */
    export function createVariableDeclarationList(declarations: VariableDeclaration[]): VariableDeclarationList {
        const node = <VariableDeclarationList>createSynthesizedNode(SyntaxKind.VariableDeclarationList);
        node.declarations = createNodeArray(declarations);
        return node;
    }

    /* @internal */
    export function createBlock(statements: Statement[]): Block {
        const block = <Block>createSynthesizedNode(SyntaxKind.Block);
        block.statements = createNodeArray(statements);
        return block;
    }
}