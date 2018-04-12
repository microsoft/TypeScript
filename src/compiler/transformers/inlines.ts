/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformInlineConst(context: TransformationContext) {
        const resolver = context.getEmitResolver();

        return transformSourceFile

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return visitIdentifier(<Identifier>node);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitIdentifier(identifier: Identifier): VisitResult<Node> {
            if (!shouldIdentifierInline(identifier)) return identifier
            
            return resolveValue(identifier)
        }

        function shouldDeclarationInline(node: VariableDeclaration): boolean {
            return node.couldResolved !== false && node.initializer && !!(getCombinedNodeFlags(node) & NodeFlags.Const)
        }

        function shouldIdentifierInline(node: Identifier): boolean {
            if (!node || !node.parent) return false
            switch (node.parent.kind) {
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.IfStatement:
                    return true
                default:
                    return false
            }
        }

        function resolveValue (identifier: Identifier) : Identifier | Expression {
            const declaration = resolver.getReferencedValueDeclaration(identifier);
            if (!declaration || !isVariableDeclaration(declaration) || !shouldDeclarationInline(declaration)) return identifier;
            if (!declaration.resolvedValue) {
                const resolvedValue = evaluate(declaration.initializer)
                if (resolvedValue !== declaration.initializer) {
                    declaration.couldResolved = true
                    declaration.resolvedValue = resolvedValue
                }
                else {
                    declaration.couldResolved = false
                    return identifier
                }
            }

            return declaration.resolvedValue;
        }

        function evaluate(node: Expression): Expression {
            if (!node) return node
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return resolveValue(<Identifier>node);
                case SyntaxKind.NumericLiteral:
                    return createLiteral(+(<NumericLiteral>node).text)
                case SyntaxKind.BinaryExpression:
                    return evaluateBinaryExpression(<BinaryExpression>node);
                default:
                    return node;
            }
        }

        function evaluateBinaryExpression(node: BinaryExpression): Expression {
            const lhs = evaluate(node.left)
            const rhs = evaluate(node.right)
            if (isNumericLiteral(lhs) && isNumericLiteral(rhs)) {
                return createLiteral(evaluateNumber(node.operatorToken, +lhs.text, +rhs.text))
            }
            return node
        }

        function evaluateNumber (op: BinaryOperatorToken, left: number, right: number): number {
            switch (op.kind) {
                case SyntaxKind.BarToken: return left | right;
                case SyntaxKind.AmpersandToken: return left & right;
                case SyntaxKind.GreaterThanGreaterThanToken: return left >> right;
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken: return left >>> right;
                case SyntaxKind.LessThanLessThanToken: return left << right;
                case SyntaxKind.CaretToken: return left ^ right;
                case SyntaxKind.AsteriskToken: return left * right;
                case SyntaxKind.SlashToken: return left / right;
                case SyntaxKind.PlusToken: return left + right;
                case SyntaxKind.MinusToken: return left - right;
                case SyntaxKind.PercentToken: return left % right;
                case SyntaxKind.AsteriskAsteriskToken: return left ** right;
                default:
                    return Debug.fail(`invalid op: ${op.kind}`)
            }
        }
    }
}