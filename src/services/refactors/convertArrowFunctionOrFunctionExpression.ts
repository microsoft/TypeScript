/* @internal */
namespace ts.refactor.convertArrowFunctionOrFunctionExpression {
    const refactorName = "Convert arrow function or function expression";
    const refactorDescription = Diagnostics.Convert_arrow_function_or_function_expression.message;

    const toAnonymousFunctionActionName = "Convert to anonymous function";
    const toNamedFunctionActionName = "Convert to named function";
    const toArrowFunctionActionName = "Convert to arrow function";

    const toAnonymousFunctionActionDescription = Diagnostics.Convert_to_anonymous_function.message;
    const toNamedFunctionActionDescription = Diagnostics.Convert_to_named_function.message;
    const toArrowFunctionActionDescription = Diagnostics.Convert_to_arrow_function.message;

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface Info {
        fromVarDecl: boolean;
        func: FunctionExpression | ArrowFunction;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {

        const { file, startPosition } = context;
        const info = getInfo(file, startPosition);

        if (!info) return undefined;
        const { fromVarDecl, func } = info;
        const possibleActions: RefactorActionInfo[] = [];

        if (fromVarDecl || (isArrowFunction(func) && isVariableDeclaration(func.parent))) {
            possibleActions.push({
                name: toNamedFunctionActionName,
                description: toNamedFunctionActionDescription
            });
        }

        if (!fromVarDecl && isArrowFunction(func)) {
            possibleActions.push({
                name: toAnonymousFunctionActionName,
                description: toAnonymousFunctionActionDescription
            });
        }

        if (isFunctionExpression(func)) {
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

        let body: Block | ConciseBody;
        let newNode: ArrowFunction | FunctionExpression;
        let edits: FileTextChanges[] = [];

        switch (actionName) {
            case toAnonymousFunctionActionName:

                if (isExpression(func.body)) {
                    const statements: Statement[] = [createReturn(func.body)];
                    body = createBlock(statements, /* multiLine */ true);
                }
                else {
                    body = func.body;
                }

                newNode = createFunctionExpression(func.modifiers, func.asteriskToken, /* name */ undefined, func.typeParameters, func.parameters, func.type, body);
                edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
                break;

            case toNamedFunctionActionName:

                if (isExpression(func.body)) {
                    const statements: Statement[] = [createReturn(func.body)];
                    body = createBlock(statements, /* multiLine */ true);
                }
                else {
                    body = func.body;
                }

                const variableDeclaration = func.parent;
                if (isVariableDeclaration(variableDeclaration) && isVariableDeclarationInVariableStatement(variableDeclaration) && isIdentifier(variableDeclaration.name)) {

                    const varDeclList = findAncestor(variableDeclaration, n => n.kind === SyntaxKind.VariableDeclarationList)!;
                    if (!isVariableDeclarationList(varDeclList)) return undefined;

                    const statement = findAncestor(variableDeclaration, n => n.kind === SyntaxKind.VariableStatement)!;
                    if (!isVariableStatement(statement)) return undefined;

                    if (varDeclList.declarations.length === 0) return undefined;
                    if (varDeclList.declarations.length === 1) {

                        const newNode1 = createFunctionDeclaration(func.decorators, statement.modifiers, func.asteriskToken, variableDeclaration.name, func.typeParameters, func.parameters, func.type, body);
                        const edits1 = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, statement, newNode1));
                        return { renameFilename: undefined, renameLocation: undefined, edits: edits1 };
                    }
                    else {
                        const newNode1 = createFunctionDeclaration(func.decorators, statement.modifiers, func.asteriskToken, variableDeclaration.name, func.typeParameters, func.parameters, func.type, body);

                        const edits1 = textChanges.ChangeTracker.with(context, t => {
                            t.delete(file, variableDeclaration);
                            t.insertNodeAfter(file, statement, newNode1);
                        });
                        return { renameFilename: undefined, renameLocation: undefined, edits: edits1 };
                    }


                }

                return undefined;

            case toArrowFunctionActionName:

                if (!isFunctionExpression(func)) return undefined;

                const statements = func.body.statements;
                const head = statements[0];
                if (func.body.statements.length === 1 && (isReturnStatement(head) || isExpressionStatement(head))) {
                    body = head.expression!;

                    suppressLeadingAndTrailingTrivia(body);
                    copyComments(head, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
                }
                else {
                    body = func.body;
                }

                newNode = createArrowFunction(func.modifiers, func.typeParameters, func.parameters, func.type, /* equalsGreaterThanToken */ undefined, body);
                edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
                break;

            default:
                Debug.fail("invalid action");
                break;
        }

        return { renameFilename: undefined, renameLocation: undefined, edits };


    }

    function getInfo(file: SourceFile, startPosition: number): Info | undefined {
        const token = getTokenAtPosition(file, startPosition);

        const declFunc = extractArrowFnFromDecl(token.parent);
        if (!!declFunc) return { fromVarDecl: true, func: declFunc };

        const maybeFunc = getContainingFunction(token);
        if (!!maybeFunc && (isFunctionExpression(maybeFunc) || isArrowFunction(maybeFunc)) && !rangeContainsRange(maybeFunc.body, token)) {
                return { fromVarDecl: false, func: maybeFunc };
        }

        return undefined;
    }

    function extractArrowFnFromDecl(parent: Node): ArrowFunction | undefined {
        if (!(isVariableDeclaration(parent) || (isVariableDeclarationList(parent) && parent.declarations.length === 1))) return undefined;
        const varDecl = isVariableDeclaration(parent) ? parent : parent.declarations[0];

        if (!varDecl.initializer || !isArrowFunction(varDecl.initializer)) return undefined;
        return varDecl.initializer;
    }
}
