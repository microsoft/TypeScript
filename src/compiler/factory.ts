/// <reference path="parser.ts"/>
/// <reference path="factory.generated.ts" />
module ts {
    export module Factory {
        // expressions
        export function createNodeArray<TNode extends Node>(elements: TNode[] = [], location?: TextRange): NodeArray<TNode> {
            var nodeArray = <NodeArray<TNode>>elements;
            if (location) {
                nodeArray.pos = location.pos;
                nodeArray.end = location.end;
            } else if (!("pos" in nodeArray && "end" in nodeArray)) {
                nodeArray.pos = -1;
                nodeArray.end = -1;
            }
            return nodeArray;
        }

        export function createVoidZero(location?: TextRange, flags?: NodeFlags): VoidExpression {
            return Factory.createVoidExpression(Factory.createNumericLiteral(0, location, flags), location, flags);
        }

        export function makeLeftHandSideExpression(expression: Expression): LeftHandSideExpression {
            if (isLeftHandSideExpression(expression)) {
                return <LeftHandSideExpression>expression;
            }

            return Factory.createParenthesizedExpression(expression);
        }

        export function createPropertyOrElementAccessExpression(expression: LeftHandSideExpression, propName: Identifier | LiteralExpression): LeftHandSideExpression {
            if (propName.kind !== SyntaxKind.Identifier) {
                return createElementAccessExpression(expression, propName);
            }
            return createPropertyAccessExpression(expression, <Identifier>propName);
        }

        export function updateFunctionLikeDeclaration(node: FunctionLikeDeclaration, name: DeclarationName, body: Expression | Block, parameters: ParameterDeclaration[]): FunctionLikeDeclaration {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                        return createFunctionDeclaration(<Identifier>name, <Block>body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.MethodDeclaration:
                        return createMethodDeclaration(name, <Block>body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.GetAccessor:
                        return createGetAccessor(name, <Block>body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.FunctionExpression:
                        return createFunctionExpression(<Identifier>name, body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.ArrowFunction:
                        return createArrowFunction(body, parameters, node, node.flags, node.modifiers);
                }
            }
            return node;
        }

        // statements
        export function getExpressionForEntityName(name: EntityName): LeftHandSideExpression {
            if (!name) {
                return finishNode(beginNode<LeftHandSideExpression>(SyntaxKind.NullKeyword));
            }

            if (name.kind === SyntaxKind.Identifier) {
                return createIdentifier((<Identifier>name).text);
            }
            else {
                return createPropertyAccessExpression(getExpressionForEntityName((<QualifiedName>name).left), createIdentifier((<QualifiedName>name).right.text));
            }
        }

        export function createTokenNode(token: SyntaxKind, location?: TextRange, flags?: NodeFlags): Node {
            return finishNode(beginNode(token), location, flags);
        }

        export function beginNode<TNode extends Node>(kind: SyntaxKind): TNode {
            var ctor = getNodeConstructor(kind);
            var node = <TNode>(new ctor());
            return node;
        }

        export function finishNode<TNode extends Node>(node: TNode, location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): TNode {
            if (location) {
                node.pos = location.pos;
                node.end = location.end;
            }
            else {
                node.pos = -1;
                node.end = -1;
            }

            if (flags) {
                node.flags = flags;
            }

            if (modifiers) {
                node.modifiers = <ModifiersArray>modifiers;
                node.flags |= node.modifiers.flags;
            }

            forEachChild(node, child => childAdded(node, child));
            return node;
        }

        function childAdded(parent: Node, child: Node): void {
            if (child && !child.parent) {
                child.parent = parent;
            }
        }
    }

    export module Visitor {
        export function ignore<TNode extends Node>(node: TNode): TNode {
            return node;
        }
    }
}