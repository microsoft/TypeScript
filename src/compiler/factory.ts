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
            return createVoidExpression(createNumericLiteral(0, location, flags), location, flags);
        }

        export function makeLeftHandSideExpression(expression: Expression): LeftHandSideExpression {
            if (isLeftHandSideExpression(expression)) {
                return <LeftHandSideExpression>expression;
            }

            return createParenthesizedExpression(expression);
        }

        export function createPropertyOrElementAccessExpression(expression: LeftHandSideExpression, propName: Identifier | LiteralExpression): LeftHandSideExpression {
            if (propName.kind !== SyntaxKind.Identifier) {
                return createElementAccessExpression(expression, propName);
            }
            return createPropertyAccessExpression(expression, <Identifier>propName);
        }

        export function updateFunctionLikeDeclaration(node: FunctionLikeDeclaration, name: DeclarationName, body: Expression | Block, parameters: ParameterDeclaration[]): FunctionLikeDeclaration {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                    return updateFunctionDeclaration(<FunctionDeclaration>node, <Identifier>name, parameters, <Block>body);
                case SyntaxKind.MethodDeclaration:
                    return updateMethodDeclaration(<MethodDeclaration>node, name, parameters, <Block>body);
                case SyntaxKind.GetAccessor:
                    return updateGetAccessor(<AccessorDeclaration>node, name, parameters, <Block>body);
                case SyntaxKind.FunctionExpression:
                    return updateFunctionExpression(<FunctionExpression>node, <Identifier>name, parameters, body);
                case SyntaxKind.ArrowFunction:
                    return updateArrowFunction(<FunctionExpression>node, parameters, body);
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

    export interface Visitor { <TNode extends Node>(node: TNode, state?: any): TNode; }

    export module Visitor {
        export function visit<TNode extends Node>(node: TNode, cbNode: Visitor, state?: any): TNode {
            if (!cbNode || !node) {
                return node;
            }

            return <TNode>cbNode(node, state);
        }

        export function visitNodes<TNode extends Node>(nodes: NodeArray<TNode>, cbNode: Visitor, state?: any, shouldCacheNode?: (node: Node, state: any) => boolean, cacheNode?: (node: TNode, state: any) => TNode, removeMissingNodes?: boolean): NodeArray<TNode> {
            if (!nodes || !cbNode) {
                return nodes;
            }

            var updatedNodes: TNode[];
            var updatedOffset = 0;
            var cacheOffset = 0;

            for (var i = 0; i < nodes.length; i++) {
                var updatedIndex = i - updatedOffset;
                var node = nodes[i];
                if (shouldCacheNode && shouldCacheNode(node, state)) {
                    if (!updatedNodes) {
                        updatedNodes = nodes.slice(0, i);
                    }
                    if (cacheNode) {
                        while (cacheOffset < updatedIndex) {
                            updatedNodes[cacheOffset] = cacheNode(updatedNodes[cacheOffset], state);
                            cacheOffset++;
                        }
                    }
                    cacheOffset = updatedIndex;
                }
                var updatedNode = <TNode>visit(node, cbNode, state);
                if ((updatedNodes || updatedNode !== node || (!updatedNode && removeMissingNodes))) {
                    if (!updatedNodes) {
                        updatedNodes = nodes.slice(0, i);
                    }
                    if (!updatedNode && removeMissingNodes) {
                        updatedOffset++;
                    }
                    else {
                        updatedNodes[i - updatedOffset] = updatedNode;
                    }
                }
            }
            if (updatedNodes) {
                return Factory.createNodeArray(updatedNodes, nodes);
            }
            return nodes;
        }
    }
}