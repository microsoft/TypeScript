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
        expression: Expression;
    }

    interface MissingParenInfo {
        kind: FixKind.MissingParentheses;
        declaration: ArrowFunction;
        expression: Expression;
    }

    type Info = MissingReturnInfo | MissingParenInfo;

    registerCodeFix({
        errorCodes,
        fixIds: [fixIdAddReturnStatement, fixIdRemoveBlockBodyBrace, fixIdReplaceBraceWithParen, fixIdWrapTheBlockWithParen],
        getCodeActions: context => {
            const { program, sourceFile, span: { start } } = context;
            const info = getInfo(program.getTypeChecker(), sourceFile, start);
            if (!info) return undefined;

            if (info.kind === FixKind.MissingReturnStatement) {
                return concatenate(
                    [getActionForfixAddReturnStatement(context, info.declaration, info.expression)],
                    isArrowFunction(info.declaration) ? [
                        getActionForfixRemoveBlockBodyBrace(context, info.declaration, info.expression),
                        getActionForfixReplaceBraceWithParen(context, info.declaration, info.expression)
                    ] : undefined);
            }
            else {
                return [getActionForfixWrapTheBlockWithParen(context, info.declaration, info.expression)];
            }
        },
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(context.program.getTypeChecker(), diag.file, diag.start);
            if (!info) return undefined;

            switch (context.fixId) {
                case fixIdAddReturnStatement:
                    addReturnStatement(changes, diag.file, info.declaration, info.expression);
                    break;
                case fixIdRemoveBlockBodyBrace:
                    if (!isArrowFunction(info.declaration)) return undefined;
                    removeBlockBodyBrace(changes, diag.file, info.declaration, info.expression, /* withParen */ false);
                    break;
                case fixIdReplaceBraceWithParen:
                    if (!isArrowFunction(info.declaration)) return undefined;
                    removeBlockBodyBrace(changes, diag.file, info.declaration, info.expression, /* withParen */ true);
                    break;
                case fixIdWrapTheBlockWithParen:
                    if (!isArrowFunction(info.declaration)) return undefined;
                    wrapBlockWithParen(changes, diag.file, info.declaration, info.expression);
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
                kind: FixKind.MissingReturnStatement,
                expression: firstStatement.expression
            };
        }
        else if (isLabeledStatement(firstStatement) && isExpressionStatement(firstStatement.statement)) {
            const node = createObjectLiteral([createPropertyAssignment(firstStatement.label, firstStatement.statement.expression)]);
            if (checkFixedAssignableTo(checker, declaration, node, expectType, isFunctionType)) {
                return isArrowFunction(declaration) ? {
                    declaration,
                    kind: FixKind.MissingParentheses,
                    expression: node
                } : {
                        declaration,
                        kind: FixKind.MissingReturnStatement,
                        expression: node
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
                        kind: FixKind.MissingReturnStatement,
                        expression: node
                    };
                }
            }
        }

        return undefined;
    }

    function checkFixedAssignableTo(checker: TypeChecker, declaration: FunctionLikeDeclaration, expr: Expression, type: Type, isFunctionType: boolean) {
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
        return undefined;
    }

    function addReturnStatement(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: FunctionLikeDeclaration, expression: Expression) {
        changes.replaceNode(sourceFile, declaration.body!, createBlock([createReturn(expression)]));
    }

    function removeBlockBodyBrace(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: ArrowFunction, expression: Expression, withParen: boolean) {
        changes.replaceNode(sourceFile, declaration.body, (withParen || needsParentheses(expression)) ? createParen(expression) : expression);
    }

    function wrapBlockWithParen(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: ArrowFunction, expression: Expression) {
        changes.replaceNode(sourceFile, declaration.body, createParen(expression));
    }

    function getActionForfixAddReturnStatement(context: CodeFixContext, declaration: FunctionLikeDeclaration, expression: Expression) {
        const changes = textChanges.ChangeTracker.with(context, t => addReturnStatement(t, context.sourceFile, declaration, expression));
        return createCodeFixAction(fixId, changes, Diagnostics.Add_a_return_statement, fixIdAddReturnStatement, Diagnostics.Surmise_all_return_value);
    }

    function getActionForfixRemoveBlockBodyBrace(context: CodeFixContext, declaration: ArrowFunction, expression: Expression) {
        const changes = textChanges.ChangeTracker.with(context, t => removeBlockBodyBrace(t, context.sourceFile, declaration, expression, /* withParen */ false));
        return createCodeFixAction(fixId, changes, Diagnostics.Remove_block_body_braces, fixIdRemoveBlockBodyBrace, Diagnostics.Surmise_all_return_value);
    }

    function getActionForfixReplaceBraceWithParen(context: CodeFixContext, declaration: ArrowFunction, expression: Expression) {
        const changes = textChanges.ChangeTracker.with(context, t => removeBlockBodyBrace(t, context.sourceFile, declaration, expression, /* withParen */ true));
        return createCodeFixAction(fixId, changes, Diagnostics.Replace_braces_with_parentheses, fixIdReplaceBraceWithParen, Diagnostics.Surmise_all_return_value);
    }

    function getActionForfixWrapTheBlockWithParen(context: CodeFixContext, declaration: ArrowFunction, expression: Expression) {
        const changes = textChanges.ChangeTracker.with(context, t => wrapBlockWithParen(t, context.sourceFile, declaration, expression));
        return createCodeFixAction(fixId, changes, Diagnostics.Wrap_this_block_with_parentheses, fixIdWrapTheBlockWithParen, Diagnostics.Surmise_all_return_value);
    }
}
