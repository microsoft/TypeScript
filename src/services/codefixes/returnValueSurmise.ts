/* @internal */
namespace ts.codefix {
    const fixId = "returnValueSurmise";
    const fixIdAddReturnStatement = "fixAddReturnStatement";
    const fixIdRemoveBlockBodyBrace = "fixRemoveBlockBodyBrace";
    const fixIdReplaceBraceWithParen = "fixReplaceBraceWithParen";
    const fixIdWrapTheBlockWithParen = "fixWrapTheBlockWithParen";
    const errorCodes = [
        Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1.code,
        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code
    ];

    enum FixKind {
        MissingReturnStatement,
        MissingParentheses
    }

    interface MissingReturnInfo {
        kind: FixKind.MissingReturnStatement;
        declaration: FunctionLikeDeclaration;
    }

    interface MissingParenthesesInfo {
        kind: FixKind.MissingParentheses;
        declaration: ArrowFunction;
    }

    type Info = MissingReturnInfo | MissingParenthesesInfo;

    registerCodeFix({
        errorCodes,
        fixIds: [fixIdAddReturnStatement, fixIdRemoveBlockBodyBrace, fixIdReplaceBraceWithParen, fixIdWrapTheBlockWithParen],
        getCodeActions: context => {
            const { program, sourceFile, span: { start } } = context;
            const info = getInfo(program.getTypeChecker(), sourceFile, start);
            if (!info) return undefined;

            if (info.kind === FixKind.MissingReturnStatement) {
                return [
                    getActionForfixAddReturnStatement(context, info.declaration),
                    getActionForfixRemoveBlockBodyBrace(context, info.declaration),
                    getActionForfixReplaceBraceWithParen(context, info.declaration)
                ];
            }
            else {
                return [getActionForfixWrapTheBlockWithParen(context, info.declaration)];
            }
        },
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(context.program.getTypeChecker(), diag.file, diag.start);
            if (!info) return undefined;

            switch (context.fixId) {
                case fixIdAddReturnStatement:
                    addReturnStatement(changes, diag.file, info.declaration);
                    break;
                case fixIdRemoveBlockBodyBrace:
                    removeBlockBodyBrace(changes, diag.file, info.declaration, /* withParen */ false);
                    break;
                case fixIdReplaceBraceWithParen:
                    removeBlockBodyBrace(changes, diag.file, info.declaration, /* withParen */ true);
                    break;
                case fixIdWrapTheBlockWithParen:
                    wrapBlockWithParen(changes, diag.file, <ArrowFunction>info.declaration);
                    break;
                default:
                    Debug.fail(JSON.stringify(context.fixId));
            }
        }),
    });

    function updateFunctionLikeBody(declaration: FunctionLikeDeclaration, body: Block): FunctionLikeDeclaration {
        switch (declaration.kind) {
            case SyntaxKind.FunctionDeclaration:
                return createFunctionDeclaration(declaration.decorators, declaration.modifiers, declaration.asteriskToken, declaration.name, declaration.typeParameters, declaration.parameters, declaration.type, body);
            case SyntaxKind.MethodDeclaration:
                return createMethod(declaration.decorators, declaration.modifiers, declaration.asteriskToken, declaration.name, declaration.questionToken, declaration.typeParameters, declaration.parameters, declaration.type, body);
            case SyntaxKind.GetAccessor:
                return createGetAccessor(declaration.decorators, declaration.modifiers, declaration.name, declaration.parameters, declaration.type, body);
            case SyntaxKind.SetAccessor:
                return createSetAccessor(declaration.decorators, declaration.modifiers, declaration.name, declaration.parameters, body);
            case SyntaxKind.Constructor:
                return createConstructor(declaration.decorators, declaration.modifiers, declaration.parameters, body);
            case SyntaxKind.FunctionExpression:
                return createFunctionExpression(declaration.modifiers, declaration.asteriskToken, declaration.name, declaration.typeParameters, declaration.parameters, declaration.type, body);
            case SyntaxKind.ArrowFunction:
                return createArrowFunction(declaration.modifiers, declaration.typeParameters, declaration.parameters, declaration.type, declaration.equalsGreaterThanToken, body);
        }
    }

    function getFixInfo(checker: TypeChecker, declaration: FunctionLikeDeclaration, expectType: Type, isFunctionType: boolean): Info | undefined {
        if (!declaration.body || !isBlock(declaration.body) || length(declaration.body.statements) !== 1) return undefined;

        const firstStatement = first(declaration.body.statements);
        if (isExpressionStatement(firstStatement) && checkFixedAssignableTo(checker, declaration, firstStatement.expression, expectType, isFunctionType)) {
            return {
                declaration,
                kind: FixKind.MissingReturnStatement
            };
        }
        else if (isArrowFunction(declaration) && isLabeledStatement(firstStatement) && isExpressionStatement(firstStatement.statement)) {
            const node = createObjectLiteral([createPropertyAssignment(firstStatement.label, firstStatement.statement.expression)]);
            if (checkFixedAssignableTo(checker, declaration, node, expectType, isFunctionType)) {
                return {
                    declaration,
                    kind: FixKind.MissingParentheses
                };
            }
        }
        else if (isBlock(firstStatement) && length(firstStatement.statements) === 1) {
            const firstBlockStatement = first(firstStatement.statements);
            if (isLabeledStatement(firstBlockStatement) && isExpressionStatement(firstBlockStatement.statement)) {
                const node = createObjectLiteral([createPropertyAssignment(firstBlockStatement.label, firstBlockStatement.statement.expression)]);
                if (checkFixedAssignableTo(checker, declaration, node, expectType, isFunctionType)) {
                    return {
                        declaration,
                        kind: FixKind.MissingReturnStatement
                    };
                }
            }
        }

        return undefined;
    }

    function checkFixedAssignableTo (checker: TypeChecker, declaration: FunctionLikeDeclaration, expr: Expression, type: Type, isFunctionType: boolean) {
        return checker.isTypeAssignableTo(checker.getTypeAtLocation(isFunctionType ? updateFunctionLikeBody(declaration, createBlock([createReturn(expr)])) : expr), type);
    }

    function getInfo(checker: TypeChecker, sourceFile: SourceFile, position: number): Info | undefined {
        const node = getTokenAtPosition(sourceFile, position);
        if (!node.parent) return undefined;

        const declaration = findAncestor(node.parent, isFunctionLikeDeclaration);
        if (declaration) {
            if (declaration.body && declaration.type && rangeContainsRange(declaration.type, node)) {
                return getFixInfo(checker, declaration, checker.getTypeFromTypeNode(declaration.type), /* isFunctionType */ false);
            }
            else if (isCallExpression(declaration.parent) && declaration.body) {
                const pos = declaration.parent.arguments.indexOf(<Expression>declaration);
                const type = checker.getContextualTypeForArgumentAtIndex(declaration.parent, pos);
                if (!type) return undefined;
                return getFixInfo(checker, declaration, type, /* isFunctionType */ true);
            }
        }
        else if (isDeclarationName(node) && isVariableDeclaration(node.parent) && node.parent.initializer && node.parent.type) {
            const initializer = skipParentheses(node.parent.initializer);
            if (!isFunctionLikeDeclaration(initializer) || !initializer.body) return undefined;
            return getFixInfo(checker, initializer, checker.getTypeFromTypeNode(node.parent.type), /* isFunctionType */ true);
        }
        return Debug.fail("unknow pattern");
    }

    function getReturnExpression (stmt: Statement) {
        if (isExpressionStatement(stmt)) {
            return stmt.expression;
        }
        else if (isBlock(stmt) && length(stmt.statements) === 1) {
            const block = first(stmt.statements);
            if (isLabeledStatement(block) && isExpressionStatement(block.statement)) {
                return block.statement.expression;
            }
        }

        return Debug.fail("unknow statement");
    }

    function addReturnStatement(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: FunctionLikeDeclaration) {
        const body = cast(declaration.body, isBlock);
        const firstStatement = first(body.statements);
        changes.replaceNode(sourceFile, firstStatement, createReturn(getReturnExpression(firstStatement)));
    }

    function removeBlockBodyBrace(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: FunctionLikeDeclaration, withParen: boolean) {
        const body = cast(declaration.body, isBlock);
        const expression = getReturnExpression(first(body.statements));
        changes.replaceNode(sourceFile, body, withParen ? createParen(expression) : expression);
    }

    function wrapBlockWithParen(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: ArrowFunction) {
        const body = cast(declaration.body, isBlock);
        const labeledStatement = cast(first(body.statements), isLabeledStatement);
        const expression = cast(labeledStatement.statement, isExpressionStatement).expression;
        changes.replaceNode(sourceFile, declaration.body, createParen(createObjectLiteral([createPropertyAssignment(labeledStatement.label, expression)])));
    }

    function getActionForfixAddReturnStatement(context: CodeFixContext, declaration: FunctionLikeDeclaration) {
        const changes = textChanges.ChangeTracker.with(context, t => addReturnStatement(t, context.sourceFile, declaration));
        return createCodeFixAction(fixId, changes, Diagnostics.Add_a_return_statement, fixIdAddReturnStatement, Diagnostics.Surmise_all_return_value);
    }

    function getActionForfixRemoveBlockBodyBrace(context: CodeFixContext, declaration: FunctionLikeDeclaration) {
        const changes = textChanges.ChangeTracker.with(context, t => removeBlockBodyBrace(t, context.sourceFile, declaration, /* withParen */ false));
        return createCodeFixAction(fixId, changes, Diagnostics.Remove_block_body_braces, fixIdRemoveBlockBodyBrace, Diagnostics.Surmise_all_return_value);
    }

    function getActionForfixReplaceBraceWithParen(context: CodeFixContext, declaration: FunctionLikeDeclaration) {
        const changes = textChanges.ChangeTracker.with(context, t => removeBlockBodyBrace(t, context.sourceFile, declaration, /* withParen */ true));
        return createCodeFixAction(fixId, changes, Diagnostics.Replace_braces_with_parentheses, fixIdReplaceBraceWithParen, Diagnostics.Surmise_all_return_value);
    }

    function getActionForfixWrapTheBlockWithParen(context: CodeFixContext, declaration: ArrowFunction) {
        const changes = textChanges.ChangeTracker.with(context, t => wrapBlockWithParen(t, context.sourceFile, declaration));
        return createCodeFixAction(fixId, changes, Diagnostics.Wrap_this_block_with_parentheses, fixIdWrapTheBlockWithParen, Diagnostics.Surmise_all_return_value);
    }
}
