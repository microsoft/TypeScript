/// <reference path="core.ts"/>
/// <reference path="factory.generated.ts" />
namespace ts {
    let nodeConstructors = new Array<new () => Node>(SyntaxKind.Count);

    export function getNodeConstructor(kind: SyntaxKind): new () => Node {
        return nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind));
    }
    
    export function createNode<T extends Node>(kind: SyntaxKind): T {
        return factory.createNode<T>(kind);
    }
    
    // @internal
    export namespace factory {
        export function setTextRange<T extends TextRange>(node: T, range: TextRange): T {
            if (!node || !range) {
                return node;
            }
            
            node.pos = range.pos;
            node.end = range.end;
            return node;
        }

        export function setModifiers<TNode extends Node>(node: TNode, modifiers: Node[]): TNode {
            if (modifiers) {
                node.modifiers = createModifiersArray(modifiers);
                node.flags |= node.modifiers.flags;
            }
            
            return node;
        }
        
        export function updateFrom<T extends Node>(oldNode: T, newNode: T): T {
            let flags = oldNode.flags;
            if (oldNode.modifiers) {
                flags &= oldNode.modifiers.flags;
            }
            
            if (newNode.modifiers) {
                flags |= newNode.modifiers.flags;
            }
            
            newNode.flags = flags;
            newNode.pos = oldNode.pos;
            newNode.end = oldNode.end;
            newNode.parent = oldNode.parent;
            return newNode;
        }
        
        export function createNode<T extends Node>(kind: SyntaxKind): T {
            return <T>new (getNodeConstructor(kind))();
        }
        
        export function createNodeArray<TNode extends Node>(elements?: TNode[]) {
            let nodes = <NodeArray<TNode>>(elements || []);
            if (nodes.pos === undefined) {
                nodes.pos = -1;
                nodes.end = -1;
            }
            
            return nodes;
        }
        
        export function createModifiersArray(elements?: Node[]) {
            let modifiers = <ModifiersArray>(elements || []);
            if (modifiers.flags === undefined) {
                let flags = 0;
                for (let modifier of modifiers) {
                    flags |= modifierToFlag(modifier.kind);
                }
                
                modifiers.flags = flags;
            }
            
            return modifiers;
        }
        
        export function createSourceFile(): SourceFile {
            let node = <SourceFile>createNode(SyntaxKind.SourceFile);
            return node;
        }
        
        export function createNumericLiteral2(value: number): LiteralExpression {
            let node = factory.createNumericLiteral(String(value));
            return node;
        }

        export function createPropertyAccessExpression2(expression: Expression, name: Identifier) {
            return factory.createPropertyAccessExpression(
                factory.parenthesizeForAccess(expression),
                factory.createNode(SyntaxKind.DotToken),
                name
            );
        }

        export function parenthesizeForAccess(expr: Expression): LeftHandSideExpression {
            // When diagnosing whether the expression needs parentheses, the decision should be based
            // on the innermost expression in a chain of nested type assertions.
            while (expr.kind === SyntaxKind.TypeAssertionExpression || expr.kind === SyntaxKind.AsExpression) {
                expr = (<AssertionExpression>expr).expression;
            }

            // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
            // to parenthesize the expression before a dot. The known exceptions are:
            //
            //    NewExpression:
            //       new C.x        -> not the same as (new C).x
            //    NumberLiteral
            //       1.x            -> not the same as (1).x
            //
            if (isLeftHandSideExpression(expr) &&
                expr.kind !== SyntaxKind.NewExpression &&
                expr.kind !== SyntaxKind.NumericLiteral) {

                return <LeftHandSideExpression>expr;
            }
            
            return factory.createParenthesizedExpression(expr);
        }

        export function createCallExpression2(expression: LeftHandSideExpression, _arguments?: Expression[]) {
            return factory.createCallExpression(
                expression,
                /*typeArguments*/ undefined,
                factory.createNodeArray(_arguments));
        }

        export function createBinaryExpression2(left: Expression, operator: SyntaxKind, right: Expression) {
            return factory.createBinaryExpression(
                left,
                factory.createNode(operator),
                right
            );
        }
        
        export function createConditionalExpression2(condition: Expression, whenTrue: Expression, whenFalse: Expression) {
            return factory.createConditionalExpression(
                condition,
                factory.createNode(SyntaxKind.QuestionToken),
                whenTrue,
                factory.createNode(SyntaxKind.ColonToken),
                whenFalse
            );
        }

        export function createVoidZeroExpression(): VoidExpression {
            return factory.createVoidExpression(factory.createNumericLiteral2(0));
        }

        export function cloneIdentifier(node: Identifier) {
            return factory.createIdentifier(
                node.text);
        }

        export function cloneIdentifierOrLiteralExpression(node: Identifier | LiteralExpression) {
            let newNode = factory.createNode<Identifier | LiteralExpression>(node.kind);
            newNode.text = node.text;
            return newNode;
        }

        export function createPropertyOrElementAccessExpression(expression: Expression, propName: Identifier | LiteralExpression): LeftHandSideExpression {
            if (!nodeIsSynthesized(propName)) {
                propName = cloneIdentifierOrLiteralExpression(propName);
            }
            
            if (propName.kind !== SyntaxKind.Identifier) {
                return createElementAccessExpression2(expression, propName);
            }
            
            return createPropertyAccessExpression2(expression, <Identifier>propName);
        }
        
        export function createElementAccessExpression2(expression: Expression, argumentExpression: Expression): ElementAccessExpression {
            return factory.createElementAccessExpression(
                factory.parenthesizeForAccess(expression),
                argumentExpression
            );
        }

        export function createElementAccessExpression3(expression: Expression, index: number): ElementAccessExpression {
            return factory.createElementAccessExpression2(
                expression,
                factory.createNumericLiteral2(index)
            );
        }

        export function createSliceCall(value: Expression, sliceIndex: number): CallExpression {
            return factory.createCallExpression2(
                factory.createPropertyAccessExpression2(
                    factory.parenthesizeForAccess(value),
                    factory.createIdentifier("slice")
                ),
                [
                    factory.createNumericLiteral2(sliceIndex)
                ]
            );
        }
    }
}