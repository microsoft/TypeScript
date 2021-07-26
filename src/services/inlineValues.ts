/* @internal */
namespace ts.InlineValues {

    type ProvideableScope =
        SourceFile |
        Block |
        IfStatement |
        ForStatement |
        WhileStatement |
        DoStatement |
        SwitchStatement |
        ClassStaticBlockDeclaration |
        ModuleDeclaration |
        CatchClause |
        CaseOrDefaultClause |
        ForInOrOfStatement |
        FunctionLikeDeclaration |
        ClassLikeDeclaration;

    type AssignmentLikeExpression = AssignmentExpression<AssignmentOperatorToken> | PrefixUnaryExpression | PostfixUnaryExpression;

    /**
     * We think block is not a 'strong scope' because many statement/expression/etc has shadow block.
     * We should try to ignore them to provide more useful info.
     * But we also need to limit max scope for performance reason.
     */
    const maxStrongScopeCount = 2;
    const maxScopeCount = 4;

    export function provideInlineValues(context: InlineValuesContext): InlineValue[] {
        const { file, span, position } = context;

        const currentToken = getTokenAtPosition(file, position);
        const scopes = findScopes(currentToken);
        const topLevelScope = lastOrUndefined(scopes);
        if (!topLevelScope) {
            return emptyArray;
        }

        const scopeSet = new Set<Node>(scopes);
        const values: InlineValue[] = [];
        visitor(topLevelScope);
        return values;

        function appendEvaluatableExpressionValue(expr: Expression, ignorePosition?: boolean): void {
            if (ignorePosition || expr.end <= currentToken.pos) {
                const printer = createPrinter({ removeComments: true, omitTrailingSemicolon: true });
                const text = usingSingleLineStringWriter(writer => printer.writeNode(EmitHint.Unspecified, expr, expr.getSourceFile(), writer));
                values.push({
                    type: InlineValueType.EvaluatableExpression,
                    span: createTextSpanFromNode(expr),
                    expression: text
                });
            }
        }

        function appendVariableLookup(name: Identifier): void {
            if (name.end <= currentToken.pos) {
                values.push({
                    type: InlineValueType.VariableLookup,
                    span: createTextSpanFromNode(name),
                    variableName: name.text
                });
            }
        }

        function visitor(node: Node | undefined): true | undefined {
            if (!node || node.getFullWidth() === 0) {
                return;
            }

            if (!scopeSet.has(node)) {
                if (node.pos > currentToken.pos) {
                    return;
                }

                if (isBlock(node)) {
                    return;
                }
            }

            if (!textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
                return;
            }

            if (isTypeNode(node)) {
                return;
            }

            switch (node.kind) {
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.Parameter:
                    visitVariableOrParameterDeclaration(node as VariableDeclaration | ParameterDeclaration);
                    break;
                case SyntaxKind.PropertyAssignment:
                    visitPropertyAssignment(node as PropertyAssignment);
                    break;
                case SyntaxKind.ShorthandPropertyAssignment:
                    visitShorthandPropertyAssignment(node as ShorthandPropertyAssignment);
                    break;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    visitFunctionLike(node as FunctionLikeDeclaration);
                    break;
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    visitClassLike(node as ClassLikeDeclaration);
                    break;
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                    visitForInOrOfStatement(node as ForInOrOfStatement);
                    break;
                case SyntaxKind.IfStatement:
                    visitIfStatement(node as IfStatement);
                    break;
                case SyntaxKind.ForStatement:
                    visitForStatement(node as ForStatement);
                    break;
                case SyntaxKind.WhileStatement:
                    visitWhileStatement(node as WhileStatement);
                    break;
                case SyntaxKind.DoStatement:
                    visitDoStatement(node as DoStatement);
                    break;
                case SyntaxKind.SwitchStatement:
                    visitSwitchStatement(node as SwitchStatement);
                    break;
                case SyntaxKind.CatchClause:
                    visitCatchClause(node as CatchClause);
                    break;
                case SyntaxKind.CaseClause:
                    visitCaseOrDefaultClause(node as CaseClause);
                    break;
                case SyntaxKind.PrefixUnaryExpression:
                case SyntaxKind.PostfixUnaryExpression:
                    visitPrefixOrPostfixUnaryExpression(node as PrefixUnaryExpression | PostfixUnaryExpression);
                    break;
                case SyntaxKind.BinaryExpression:
                    visitBinaryExpression(node as BinaryExpression);
                    break;
                default:
                    forEachChild(node, visitor);
                    break;
            }
        }

        function visitVariableOrParameterDeclaration(decl: VariableDeclaration | ParameterDeclaration) {
            if (!decl.name) {
                return;
            }

            if (isIdentifier(decl.name)) {
                appendVariableLookup(decl.name);
            }
            // TODO: class members
            // TODO: binding elements
            visitor(decl.initializer);
        }

        function visitPropertyAssignment(assignment: PropertyAssignment) {
            appendEvaluatableExpressionValue(assignment.initializer);
        }

        function visitShorthandPropertyAssignment(assignment: ShorthandPropertyAssignment) {
            appendEvaluatableExpressionValue(assignment.name);
        }

        function visitCaseOrDefaultClause(clause: CaseOrDefaultClause) {
            if (isCaseClause(clause)) {
                appendEvaluatableExpressionValue(clause.expression, /*ignorePosition*/ true);
            }
            clause.statements.forEach(visitor);
        }

        function visitAssignmentLikeExpression(expr: AssignmentLikeExpression) {
            Debug.assert(isAssignmentLikeExpression(expr), "Must be assignment like expression.");

            const target = isAssignmentExpression(expr) ? expr.left : expr.operand;
            if (isIdentifier(target)) {
                appendVariableLookup(target);
            }
            // TODO: element access

            if (isAssignmentExpression(expr)) {
                visitor(expr.right);
            }
        }

        function visitPrefixOrPostfixUnaryExpression(expr: PrefixUnaryExpression | PostfixUnaryExpression) {
            if (isUnaryExpressionWithWrite(expr)) {
                visitAssignmentLikeExpression(expr);
            }
            else {
                forEachChild(expr, visitor);
            }
        }

        function visitBinaryExpression(expr: BinaryExpression) {
            if (isAssignmentExpression(expr)) {
                visitAssignmentLikeExpression(expr);
            }
            else {
                forEachChild(expr, visitor);
            }
        }

        function visitIfStatement(stmt: IfStatement) {
            if (isParenthesizedExpression(stmt.expression) && isAssignmentLikeExpression(stmt.expression.expression)) {
                visitor(stmt.expression);
            }
            else {
                appendEvaluatableExpressionValue(stmt.expression);
            }

            if (!scopeSet.has(stmt)) {
                return;
            }

            visitor(stmt.thenStatement);
            visitor(stmt.elseStatement);
        }

        function visitForInitializer(initializer: ForInitializer) {
            if (isVariableDeclarationList(initializer)) {
                initializer.declarations.forEach(visitVariableOrParameterDeclaration);
            }
            else {
                appendEvaluatableExpressionValue(initializer);
            }
        }

        function visitForStatement(stmt: ForStatement) {
            if (!scopeSet.has(stmt)) {
                return;
            }

            if (stmt.initializer) {
                visitForInitializer(stmt.initializer);
            }
            if (stmt.condition) {
                appendEvaluatableExpressionValue(stmt.condition);
            }
            if (stmt.incrementor) {
                /**
                 * We may use comma expression to combine multiple incrementor.
                 */
                if (isAssignmentLikeExpression(stmt.incrementor) || isBinaryExpression(stmt.incrementor) && stmt.incrementor.operatorToken.kind === SyntaxKind.CommaToken) {
                    visitor(stmt.incrementor);
                }
                else {
                    appendEvaluatableExpressionValue(stmt.incrementor);
                }
            }

            visitor(stmt.statement);
        }

        function visitWhileStatement(stmt: WhileStatement) {
            appendEvaluatableExpressionValue(stmt.expression);

            if (!scopeSet.has(stmt)) {
                return;
            }

            visitor(stmt.statement);
        }

        function visitDoStatement(stmt: DoStatement) {
            appendEvaluatableExpressionValue(stmt.expression);

            if (!scopeSet.has(stmt)) {
                return;
            }

            visitor(stmt.statement);
        }

        function visitSwitchStatement(stmt: SwitchStatement) {
            appendEvaluatableExpressionValue(stmt.expression);

            if (!scopeSet.has(stmt)) {
                return;
            }

            stmt.caseBlock.clauses.forEach(visitCaseOrDefaultClause);
        }

        function visitCatchClause(clause: CatchClause) {
            if (!scopeSet.has(clause)) {
                return;
            }

            if (clause.variableDeclaration) {
                visitVariableOrParameterDeclaration(clause.variableDeclaration);
            }
            visitor(clause.block);
        }

        function visitFunctionLike(node: FunctionLikeDeclaration) {
            if (isFunctionDeclaration(node) && node.name) {
                appendVariableLookup(node.name);
            }

            if (!scopeSet.has(node)) {
                return;
            }

            node.parameters.forEach(visitVariableOrParameterDeclaration);
            visitor(node.body);
        }

        function visitClassLike(node: ClassLikeDeclaration) {
            // TODO: support class members;
            if (isClassDeclaration(node) && node.name) {
                appendVariableLookup(node.name);
            }

            if (!scopeSet.has(node)) {
                return;
            }

            node.members.forEach(visitor);
        }

        function visitForInOrOfStatement(stmt: ForInOrOfStatement) {
            if (!scopeSet.has(stmt)) {
                return;
            }

            visitForInitializer(stmt.initializer);
            appendEvaluatableExpressionValue(stmt.expression);
            visitor(stmt.statement);
        }
    }

    function isProvideableScope(node: Node): node is ProvideableScope {
        if (isFunctionLikeDeclaration(node) || isClassLike(node) || isForInOrOfStatement(node) || isCaseOrDefaultClause(node)) {
            return true;
        }

        switch (node.kind) {
            case SyntaxKind.SourceFile:
            case SyntaxKind.Block:
            case SyntaxKind.ClassStaticBlockDeclaration:
            case SyntaxKind.IfStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.CatchClause:
                return true;
            default:
                return false;
        }
    }

    function findScopes(node: Node): ProvideableScope[] {
        const results: ProvideableScope[] = [];
        let scopeCount = 0;

        findAncestor(node, node => {
            if (scopeCount >= maxStrongScopeCount || results.length >= maxScopeCount) {
                return "quit";
            }

            if (isProvideableScope(node)) {
                results.push(node);

                if (!isBlock(node)) {
                    scopeCount++;
                }
            }

            return false;
        });

        return results;
    }

    function isAssignmentLikeExpression(expr: Expression): expr is AssignmentLikeExpression {
        return isAssignmentExpression(expr) || isUnaryExpressionWithWrite(expr);
    }
}
