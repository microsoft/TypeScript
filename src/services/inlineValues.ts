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

    /**
     * We think block is not a 'strong scope' because many statement/expression/etc has shadow block.
     * We should try to ignore them to provide more useful info.
     * But we also need to limit max scope for performance reason.
     */
    const maxStrongScopeCount = 2;
    const maxScopeCount = 4;

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

        function appendEvaluatableExpressionValue(expr: Expression): void {
            if (expr.end <= currentToken.pos) {
                values.push({
                    type: InlineValueType.EvaluatableExpression,
                    span: createTextSpanFromNode(expr),
                    expression: expr.getText()
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
                if (node.end > currentToken.pos) {
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
                case SyntaxKind.ExpressionStatement:
                    visitExpressionStatement(node as ExpressionStatement);
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

        function visitExpressionStatement(stmt: ExpressionStatement) {
            if (!isAssignmentExpression(stmt.expression)) {
                return;
            }

            if (isIdentifier(stmt.expression.left)) {
                appendVariableLookup(stmt.expression.left);
            }
            else {
                appendEvaluatableExpressionValue(stmt.expression.left);
            }
            visitor(stmt.expression);
        }

        function visitPropertyAssignment(assignment: PropertyAssignment) {
            appendEvaluatableExpressionValue(assignment.initializer);
        }

        function visitShorthandPropertyAssignment(assignment: ShorthandPropertyAssignment) {
            appendEvaluatableExpressionValue(assignment.name);
        }

        function visitCaseOrDefaultClause(clause: CaseOrDefaultClause) {
            if (isCaseClause(clause)) {
                appendEvaluatableExpressionValue(clause.expression);
            }
            clause.statements.forEach(visitor);
        }

        function visitIfStatement(stmt: IfStatement) {
            appendEvaluatableExpressionValue(stmt.expression);

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
                if (isBinaryExpression(stmt.incrementor) && stmt.incrementor.operatorToken.kind === SyntaxKind.CommaToken) {
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
            visitor(stmt.statement);
        }

        function visitDoStatement(stmt: DoStatement) {
            appendEvaluatableExpressionValue(stmt.expression);
            visitor(stmt.statement);
        }

        function visitSwitchStatement(stmt: SwitchStatement) {
            appendEvaluatableExpressionValue(stmt.expression);
            visitor(stmt.caseBlock);
        }

        function visitCatchClause(clause: CatchClause) {
            if (clause.variableDeclaration) {
                visitVariableOrParameterDeclaration(clause.variableDeclaration);
            }
            visitor(clause.block);
        }

        function visitFunctionLike(node: FunctionLikeDeclaration) {
            if (isFunctionDeclaration(node) && node.name) {
                appendVariableLookup(node.name);
            }

            if (scopeSet.has(node)) {
                node.parameters.forEach(visitVariableOrParameterDeclaration);
                visitor(node.body);
            }
        }

        function visitClassLike(node: ClassLikeDeclaration) {
            // TODO: support class members;
            if (isClassDeclaration(node) && node.name) {
                appendVariableLookup(node.name);
            }

            if (scopeSet.has(node)) {
                node.members.forEach(visitor);
            }
        }

        function visitForInOrOfStatement(stmt: ForInOrOfStatement) {
            visitForInitializer(stmt.initializer);
            appendEvaluatableExpressionValue(stmt.expression);
            visitor(stmt.statement);
        }
    }
}
