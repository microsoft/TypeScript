/* @internal */
namespace ts.refactor.convertArrowFunctionOrFunction {
    const refactorName = "Convert arrow function or anonymous function";
    const refactorDescription = Diagnostics.Convert_arrow_function_or_anonymous_function.message;

    const toAnonymousFunctionActionName = "Convert to anonymous function";
    const toNamedFunctionActionName = "Convert to named function";
    const toArrowFunctionActionName = "Convert to arrow function";

    const toAnonymousFunctionActionDescription = Diagnostics.Convert_to_anonymous_function.message;
    const toNamedFunctionActionDescription = Diagnostics.Convert_to_named_function.message;
    const toArrowFunctionActionDescription = Diagnostics.Convert_to_arrow_function.message;

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface Info {
        func: FunctionExpression | ArrowFunction;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {

        const { file, startPosition } = context;
        const info = getInfo(file, startPosition);

        if (!info) return undefined;
        const { func } = info;

        const possibleActions: RefactorActionInfo[] = [];

        if (isArrowFunction(func)) {
            if (isVariableDeclaration(func.parent)) {
                possibleActions.push({
                    name: toNamedFunctionActionName,
                    description: toNamedFunctionActionDescription
                });
            }

            possibleActions.push({
                name: toAnonymousFunctionActionName,
                description: toAnonymousFunctionActionDescription
            });
        }
        else {
            possibleActions.push({
                name: toArrowFunctionActionName,
                description: toArrowFunctionActionDescription
            });
        }

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: possibleActions
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const info = getInfo(file, startPosition);

        if (!info) return undefined;
        const { func } = info;

        switch (actionName) {
            case toAnonymousFunctionActionName:
                let body: Block;

                if (isExpression(func.body)) {
                    const statements: Statement[] = [createReturn(func.body)];
                    body = createBlock(statements, /* multiLine */ true);
                }
                else {
                    body = func.body;
                }

                const newNode = createFunctionExpression(func.modifiers, func.asteriskToken, /* name */ undefined, func.typeParameters, func.parameters, func.type, body);
                const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
                return { renameFilename: undefined, renameLocation: undefined, edits };

            case toNamedFunctionActionName:
                let body2: Block;

                if (isExpression(func.body)) {
                    const statements: Statement[] = [createReturn(func.body)];
                    body2 = createBlock(statements, /* multiLine */ true);
                }
                else {
                    body2 = func.body;
                }

                const variableDeclaration = func.parent;
                if (isVariableDeclaration(variableDeclaration) && isVariableDeclarationInVariableStatement(variableDeclaration) && isIdentifier(variableDeclaration.name)) {
                    const statement = findAncestor(variableDeclaration, n => n.kind === SyntaxKind.VariableStatement);

                    const newNode1 = createFunctionDeclaration(func.decorators, func.modifiers, func.asteriskToken, variableDeclaration.name, func.typeParameters, func.parameters, func.type, body2);
                    const edits1 = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, statement!, newNode1));
                    return { renameFilename: undefined, renameLocation: undefined, edits: edits1 };
                }

                return undefined;

            case toArrowFunctionActionName:
                let body1: ConciseBody;

                if (isFunctionExpression(func)) {
                    const statements = func.body.statements;
                    const head = statements[0];
                    if (func.body.statements.length === 1 && (isReturnStatement(head) || isExpressionStatement(head))) {
                        body1 = head.expression!;

                        suppressLeadingAndTrailingTrivia(body1);
                        copyComments(head, body1, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
                    }
                    else {
                        body1 = func.body;
                    }

                    const newNode = createArrowFunction(func.modifiers, func.typeParameters, func.parameters, func.type, /* equalsGreaterThanToken */ undefined, body1);
                    const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
                    return { renameFilename: undefined, renameLocation: undefined, edits };
                }

                return undefined;

            default:
                Debug.fail("invalid action");
                break;
        }

    }

    function getInfo(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);
        if (!func || !(isFunctionExpression(func) || isArrowFunction(func)) || rangeContainsRange(func.body, node)) return undefined;

        return { func };
    }

}
