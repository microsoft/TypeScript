/*@internal*/
namespace ts {
    export function transformInlineConst(context: TransformationContext) {
        const resolver = context.getEmitResolver();

        return transformSourceFile;

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
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(<VariableDeclaration>node);
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.PrefixUnaryExpression:
                    return visitExpression(<Expression>node);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitVariableStatement(statement: VariableStatement) {
            const visited = visitEachChild(statement, visitor, context);
            return every(visited.declarationList.declarations, declaration => declaration && !!declaration.resolvedValue) ? undefined : visited;
        }

        function visitVariableDeclaration(declaration: VariableDeclaration) {
            const visited = visitEachChild(declaration, visitor, context);
            resolveValueDeclaration(visited);
            return visited.resolvedValue ? undefined : visited;
        }

        function visitIdentifier(identifier: Identifier): VisitResult<Node> {
            const visited = visitEachChild(identifier, visitor, context);
            return shouldIdentifierInline(visited) ? evaluateIdentifier(visited) : visited;
        }

        function visitExpression(expression: Expression) {
            return tryEvaluate(visitEachChild(expression, visitor, context));
        }

        function shouldDeclarationInline(node: VariableDeclaration): boolean {
            return node && node.parent && node.parent.parent && node.couldResolved !== false && node.initializer &&
                isVariableStatement(node.parent.parent) && !!(getCombinedNodeFlags(node) & NodeFlags.Const);
        }

        function shouldIdentifierInline(node: Identifier): boolean {
            if (!node || !node.parent) return false;

            const parent = node.parent;
            if (isPropertyAccessExpression(parent) && parent.name === node) return false;
            if (isVariableDeclaration(parent) && parent.name === node) return false;
            if (isClassElement(parent) && parent.name === node) return false;
            if (isObjectLiteralElementLike(parent) && parent.name === node) return false;
            return true;
        }

        function resolveValueDeclaration(declaration: VariableDeclaration): Expression | undefined {
            if (!shouldDeclarationInline(declaration)) return undefined;

            if (!declaration.resolvedValue) {
                const resolvedValue = tryEvaluate(declaration.initializer);
                if (resolvedValue !== declaration.initializer) {
                    declaration.couldResolved = true;
                    declaration.resolvedValue = resolvedValue;
                }
                else {
                    declaration.couldResolved = false;
                    declaration.resolvedValue = undefined;
                }
            }
            return declaration.resolvedValue;
        }

        function evaluateIdentifier(identifier: Identifier): Expression {
            const declaration = resolver.getReferencedValueDeclaration(identifier);
            if (declaration) {
                if (isVariableDeclaration(declaration)) {
                    return resolveValueDeclaration(declaration) || identifier;
                }
            }
            return identifier;
        }

        function tryEvaluate(node: Expression): Expression {
            const result = evaluate(node);
            return (result && (isStringLiteral(result) || isNumericLiteral(result) || isBooleanLiteral(result))) ? result : node;
        }

        function evaluate(node: Expression): Expression {
            if (!node) return node;
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return evaluateIdentifier(<Identifier>node);
                case SyntaxKind.NumericLiteral:
                    return createLiteral(+(<NumericLiteral>node).text);
                case SyntaxKind.StringLiteral:
                    return createLiteral((<StringLiteral>node).text);
                case SyntaxKind.BinaryExpression:
                    return evaluateBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.ParenthesizedExpression:
                    return evaluate((<ParenthesizedExpression>node).expression);
                case SyntaxKind.PrefixUnaryExpression:
                    return evaluatePrefixUnaryExpression(<PrefixUnaryExpression>node);
                default:
                    return node;
            }
        }

        function evaluateBinaryExpression(node: BinaryExpression): Expression {
            const lhs = evaluate(node.left);
            const rhs = evaluate(node.right);
            if ((isNumericLiteral(lhs) || isStringLiteral(lhs)) && (isNumericLiteral(rhs) || isStringLiteral(rhs))) {
                if (isEqualityOperatorKind(node.operatorToken.kind) || isRelationalOperator(node.operatorToken.kind) &&
                    node.operatorToken.kind !== SyntaxKind.InstanceOfKeyword && node.operatorToken.kind !== SyntaxKind.InKeyword) {
                    return createLiteral(evaluateEqualityOrRelational(node.operatorToken.kind, lhs, rhs));
                }
                const result = evaluateBinary(node.operatorToken.kind, lhs, rhs);
                return result && createLiteral(result) || node;
            }
            return node;
        }

        function evaluatePrefixUnaryExpression(node: PrefixUnaryExpression): Expression {
            const operand = evaluate(node.operand);
            if (isNumericLiteral(operand)) {
                const result = evaluateNumberPrefixUnary(node.operator, operand);
                return result && createLiteral(result) || node;
            }
            return node;
        }

        function evaluateEqualityOrRelational(op: EqualityOperator | RelationalOperator, lhs: NumericLiteral | StringLiteral, rhs: NumericLiteral | StringLiteral): boolean {
            const left = isNumericLiteral(lhs) ? +lhs.text : lhs.text;
            const right = isNumericLiteral(rhs) ? +rhs.text : rhs.text;

            switch (op) {
                // tslint:disable-next-line: triple-equals
                case SyntaxKind.EqualsEqualsToken: return left == right;
                case SyntaxKind.EqualsEqualsEqualsToken: return left === right;
                // tslint:disable-next-line: triple-equals
                case SyntaxKind.ExclamationEqualsToken: return left != right;
                case SyntaxKind.ExclamationEqualsEqualsToken: return left !== right;

                case SyntaxKind.GreaterThanToken: return left > right;
                case SyntaxKind.GreaterThanEqualsToken: return left >= right;
                case SyntaxKind.LessThanToken: return left < right;
                case SyntaxKind.LessThanEqualsToken: return left <= right;

                default:
                    return Debug.fail(`invalid op: ${op}`);
            }
        }

        function evaluateBinary(op: BinaryOperator, lhs: NumericLiteral | StringLiteral, rhs: NumericLiteral | StringLiteral): number | string | undefined {
            if (isNumericLiteral(lhs) && isNumericLiteral(rhs)) {
                const left = +lhs.text;
                const right = + rhs.text;

                switch (op) {
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
                        return undefined;
                }
            }
            else {
                if (op === SyntaxKind.PlusToken) {
                    return lhs.text + rhs.text;
                }
                return undefined;
            }
        }

        function evaluateNumberPrefixUnary(op: PrefixUnaryOperator, operand: NumericLiteral): number | undefined {
            const value = +operand.text;
            switch (op) {
                case SyntaxKind.PlusToken: return value;
                case SyntaxKind.MinusToken: return -value;
                case SyntaxKind.TildeToken: return ~value;
                default:
                    return undefined;
            }
        }
    }
}