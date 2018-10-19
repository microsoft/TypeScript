/* @internal */
namespace ts.refactor.convertArrowFunctionOrFunctionExpression {
    const refactorName = "Convert arrow function or function expression";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Convert_arrow_function_or_function_expression);

    const toAnonymousFunctionActionName = "Convert to anonymous function";
    const toNamedFunctionActionName = "Convert to named function";
    const toArrowFunctionActionName = "Convert to arrow function";

    const toAnonymousFunctionActionDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_anonymous_function);
    const toNamedFunctionActionDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_named_function);
    const toArrowFunctionActionDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_arrow_function);

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface BasicInfo {
        fromDeclaration: boolean;
        func: FunctionExpression | ArrowFunction;
    }

    interface HeaderInfo {
        variableDeclaration: VariableDeclaration;
        variableDeclarationList: VariableDeclarationList;
        statement: VariableStatement;
        name: Identifier;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {

        const { file, startPosition } = context;
        const info = getInfo(file, startPosition);

        if (!info) return undefined;
        const { fromDeclaration, func } = info;
        const possibleActions: RefactorActionInfo[] = [];

        if (fromDeclaration || (isArrowFunction(func) && isVariableDeclaration(func.parent))) {
            possibleActions.push({
                name: toNamedFunctionActionName,
                description: toNamedFunctionActionDescription
            });
        }

        if (!fromDeclaration && isArrowFunction(func)) {
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
        let newNode: ArrowFunction | FunctionExpression | FunctionDeclaration;
        let edits: FileTextChanges[] = [];

        switch (actionName) {
            case toAnonymousFunctionActionName:

                body = makeBlock(func);
                newNode = createFunctionExpression(func.modifiers, func.asteriskToken, /* name */ undefined, func.typeParameters, func.parameters, func.type, body);
                edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
                break;

            case toNamedFunctionActionName:

                body = makeBlock(func);
                const headInfo = getHeaderInfo(func);
                if (!headInfo) return undefined;

                const { variableDeclaration, variableDeclarationList, statement, name } = headInfo;
                newNode = makeFunctionDeclaration(func, statement, name, body);

                if (variableDeclarationList.declarations.length === 1) {
                    edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, statement, newNode));
                }
                else {
                    edits = textChanges.ChangeTracker.with(context, t => {
                        t.delete(file, variableDeclaration);
                        t.insertNodeAfter(file, statement, newNode);
                    });
                }
                break;

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

    function getInfo(file: SourceFile, startPosition: number): BasicInfo | undefined {
        const token = getTokenAtPosition(file, startPosition);
        let maybeFunc;

        maybeFunc = getArrowFunctionFromDeclaration(token.parent);
        if (!!maybeFunc) return { fromDeclaration: true, func: maybeFunc };

        maybeFunc = getContainingFunction(token);
        if (!!maybeFunc && (isFunctionExpression(maybeFunc) || isArrowFunction(maybeFunc)) && !rangeContainsRange(maybeFunc.body, token)) {
                return { fromDeclaration: false, func: maybeFunc };
        }

        return undefined;
    }

    function getArrowFunctionFromDeclaration(parent: Node): ArrowFunction | undefined {
        if (!(isVariableDeclaration(parent) || (isVariableDeclarationList(parent) && parent.declarations.length === 1))) return undefined;
        const variableDeclaration = isVariableDeclaration(parent) ? parent : parent.declarations[0];

        if (!variableDeclaration.initializer || !isArrowFunction(variableDeclaration.initializer)) return undefined;
        return variableDeclaration.initializer;
    }

    function makeBlock(func: ArrowFunction | FunctionExpression): Block {
        if (isExpression(func.body)) {
            const statements: Statement[] = [createReturn(func.body)];
            return createBlock(statements, /* multiLine */ true);
        }
        else {
            return func.body;
        }
    }

    function makeFunctionDeclaration(func: FunctionExpression | ArrowFunction, statement: VariableStatement, name: Identifier, body: Block) {
        return createFunctionDeclaration(
            func.decorators,
            statement.modifiers,
            func.asteriskToken,
            name,
            func.typeParameters,
            func.parameters,
            func.type,
            body);
    }

    function getHeaderInfo(func: FunctionExpression | ArrowFunction): HeaderInfo | undefined {
        const variableDeclaration = func.parent;
        if (!isVariableDeclaration(variableDeclaration) || !isVariableDeclarationInVariableStatement(variableDeclaration)) return undefined;

        const variableDeclarationList = findAncestor(variableDeclaration, n => isVariableDeclarationList(n))!;
        const statement = findAncestor(variableDeclaration, n => isVariableStatement(n))!;
        if (!isVariableDeclarationList(variableDeclarationList) || !isVariableStatement(statement) || !isIdentifier(variableDeclaration.name)) return undefined;

        return { variableDeclaration, variableDeclarationList, statement, name: variableDeclaration.name };
    }
}
