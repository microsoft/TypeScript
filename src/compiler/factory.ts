/// <reference path="types.ts"/>
/// <reference path="utilities.ts"/>
/* @internal */
namespace ts {
    export function createNodeArray<T extends Node>(elements?: T[], location?: TextRange): NodeArray<T>;
    export function createNodeArray<T extends Node, TArray extends NodeArray<T>>(elements: TArray, location?: TextRange): TArray;
    export function createNodeArray<T extends Node, TArray extends NodeArray<T>>(elements?: T[], location?: TextRange): TArray {
        const array = <TArray>(elements || []);
        if (location) {
            array.pos = location.pos;
            array.end = location.end;
        }
        else if (array.pos === undefined || array.end === undefined) {
            array.pos = -1;
            array.end = -1;
        }

        return array;
    }

    export function createNodeArrayNode<T extends Node>(elements?: (T | NodeArrayNode<T>)[]): NodeArrayNode<T> {
        const array = <NodeArrayNode<T>>createNodeArray(elements);
        array.kind = SyntaxKind.NodeArrayNode;
        return array;
    }

    export function createReturn(expression?: Expression): ReturnStatement {
        const node = <ReturnStatement>createSynthesizedNode(SyntaxKind.ReturnStatement);
        node.expression = expression;
        return node;
    }

    export function createStatement(expression: Expression): ExpressionStatement {
        const node = <ExpressionStatement>createSynthesizedNode(SyntaxKind.ExpressionStatement);
        node.expression = expression;
        return node;
    }

    export function createVariableStatement(declarationList: VariableDeclarationList): VariableStatement {
        const node = <VariableStatement>createSynthesizedNode(SyntaxKind.VariableStatement);
        node.declarationList = declarationList;
        return node;
    }

    export function createVariableDeclarationList(declarations: VariableDeclaration[]): VariableDeclarationList {
        const node = <VariableDeclarationList>createSynthesizedNode(SyntaxKind.VariableDeclarationList);
        node.declarations = createNodeArray(declarations);
        return node;
    }

    export function createBlock(statements: Statement[]): Block {
        const block = <Block>createSynthesizedNode(SyntaxKind.Block);
        block.statements = createNodeArray(statements);
        return block;
    }
}