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

    interface FunctionInfo {
        selectedVariableDeclaration: boolean;
        func: FunctionExpression | ArrowFunction;
    }

    interface VariableInfo {
        variableDeclaration: VariableDeclaration;
        variableDeclarationList: VariableDeclarationList;
        statement: VariableStatement;
        name: Identifier;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const { file, startPosition } = context;
        const info = getFunctionInfo(file, startPosition);

        if (!info) return undefined;
        const { selectedVariableDeclaration, func } = info;
        const possibleActions: RefactorActionInfo[] = [];

        if (selectedVariableDeclaration || (isArrowFunction(func) && isVariableDeclaration(func.parent))) {
            possibleActions.push({
                name: toNamedFunctionActionName,
                description: toNamedFunctionActionDescription
            });
        }

        if (!selectedVariableDeclaration && isArrowFunction(func)) {
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
        const info = getFunctionInfo(file, startPosition);

        if (!info) return undefined;
        const { func } = info;

        switch (actionName) {
            case toAnonymousFunctionActionName:
                return getEditInfoForConvertToAnonymousFunction(context, func);

            case toNamedFunctionActionName:
                return getEditInfoForConvertToNamedFunction(context, func);

            case toArrowFunctionActionName:
                return getEditInfoForConvertToArrowFunction(context, func);

            default:
                Debug.fail("invalid action");
                break;
        }

        return undefined;
    }

    function getFunctionInfo(file: SourceFile, startPosition: number): FunctionInfo | undefined {
        const token = getTokenAtPosition(file, startPosition);
        let maybeFunc;

        maybeFunc = getArrowFunctionFromVariableDeclaration(token.parent);
        if (!!maybeFunc) return { selectedVariableDeclaration: true, func: maybeFunc };

        maybeFunc = getContainingFunction(token);
        if (!!maybeFunc && (isFunctionExpression(maybeFunc) || isArrowFunction(maybeFunc)) && !rangeContainsRange(maybeFunc.body, token)) {
                return { selectedVariableDeclaration: false, func: maybeFunc };
        }

        return undefined;
    }

    function isSingleVariableDeclaration(parent: Node): parent is VariableDeclarationList {
        return isVariableDeclarationList(parent) && parent.declarations.length === 1;
    }

    function getArrowFunctionFromVariableDeclaration(parent: Node): ArrowFunction | undefined {
        if (!(isVariableDeclaration(parent) || isSingleVariableDeclaration(parent))) return undefined;
        const variableDeclaration = isVariableDeclaration(parent) ? parent : parent.declarations[0];

        const initializer = variableDeclaration.initializer;
        if (!initializer || !isArrowFunction(initializer)) return undefined;
        return initializer;
    }

    function convertToBlock(func: ArrowFunction | FunctionExpression): Block {
        if (isExpression(func.body)) {
            return createBlock([createReturn(func.body)], /* multiLine */ true);
        }
        else {
            return func.body;
        }
    }

    function getVariableInfo(func: FunctionExpression | ArrowFunction): VariableInfo | undefined {
        const variableDeclaration = func.parent;
        if (!isVariableDeclaration(variableDeclaration) || !isVariableDeclarationInVariableStatement(variableDeclaration)) return undefined;

        const variableDeclarationList = variableDeclaration.parent;
        const statement = variableDeclarationList.parent;
        if (!isVariableDeclarationList(variableDeclarationList) || !isVariableStatement(statement) || !isIdentifier(variableDeclaration.name)) return undefined;

        return { variableDeclaration, variableDeclarationList, statement, name: variableDeclaration.name };
    }

    function getEditInfoForConvertToAnonymousFunction(context: RefactorContext, func: FunctionExpression | ArrowFunction): RefactorEditInfo {
        const { file } = context;
        const body = convertToBlock(func);
        const newNode = createFunctionExpression(func.modifiers, func.asteriskToken, /* name */ undefined, func.typeParameters, func.parameters, func.type, body);
        const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function getEditInfoForConvertToNamedFunction(context: RefactorContext, func: FunctionExpression | ArrowFunction): RefactorEditInfo | undefined {
        const { file } = context;
        const body = convertToBlock(func);
        const variableInfo = getVariableInfo(func);
        if (!variableInfo) return undefined;

        const { variableDeclaration, variableDeclarationList, statement, name } = variableInfo;
        const newNode = createFunctionDeclaration(func.decorators, statement.modifiers, func.asteriskToken, name, func.typeParameters, func.parameters, func.type, body);
        let edits: FileTextChanges[];

        if (variableDeclarationList.declarations.length === 1) {
            edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, statement, newNode));
        }
        else {
            edits = textChanges.ChangeTracker.with(context, t => {
                t.delete(file, variableDeclaration);
                t.insertNodeAfter(file, statement, newNode);
            });
        }
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function getEditInfoForConvertToArrowFunction(context: RefactorContext, func: FunctionExpression | ArrowFunction): RefactorEditInfo | undefined {
        const { file } = context;
        if (!isFunctionExpression(func)) return undefined;

        const statements = func.body.statements;
        const head = statements[0];
        let body: ConciseBody;

        if (func.body.statements.length === 1 && ((isReturnStatement(head) && !!head.expression) || isExpressionStatement(head))) {
            body = head.expression!;
            suppressLeadingAndTrailingTrivia(body);
            copyComments(head, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        }
        else {
            body = func.body;
        }

        const newNode = createArrowFunction(func.modifiers, func.typeParameters, func.parameters, func.type, /* equalsGreaterThanToken */ undefined, body);
        const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }
}
