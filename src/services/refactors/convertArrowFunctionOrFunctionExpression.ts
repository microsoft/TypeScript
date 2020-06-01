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
        readonly selectedVariableDeclaration: boolean;
        readonly func: FunctionExpression | ArrowFunction;
    }

    interface VariableInfo {
        readonly variableDeclaration: VariableDeclaration;
        readonly variableDeclarationList: VariableDeclarationList;
        readonly statement: VariableStatement;
        readonly name: Identifier;
    }

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, program } = context;
        const info = getFunctionInfo(file, startPosition, program);

        if (!info) return emptyArray;
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
        const { file, startPosition, program } = context;
        const info = getFunctionInfo(file, startPosition, program);

        if (!info) return undefined;
        const { func } = info;
        const edits: FileTextChanges[] = [];

        switch (actionName) {
            case toAnonymousFunctionActionName:
                edits.push(...getEditInfoForConvertToAnonymousFunction(context, func));
                break;

            case toNamedFunctionActionName:
                const variableInfo = getVariableInfo(func);
                if (!variableInfo) return undefined;

                edits.push(...getEditInfoForConvertToNamedFunction(context, func, variableInfo));
                break;

            case toArrowFunctionActionName:
                if (!isFunctionExpression(func)) return undefined;
                edits.push(...getEditInfoForConvertToArrowFunction(context, func));
                break;

            default:
                return Debug.fail("invalid action");
        }

        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function containingThis(node: Node): boolean {
        let containsThis = false;
        node.forEachChild(function checkThis(child) {

            if (isThis(child)) {
                containsThis = true;
                return;
            }

            if (!isClassLike(child) && !isFunctionDeclaration(child) && !isFunctionExpression(child)) {
                forEachChild(child, checkThis);
            }
        });

        return containsThis;
    }

    function getFunctionInfo(file: SourceFile, startPosition: number, program: Program): FunctionInfo | undefined {
        const token = getTokenAtPosition(file, startPosition);

        const arrowFunc = getArrowFunctionFromVariableDeclaration(token.parent);
        if (arrowFunc && !containingThis(arrowFunc.body)) return { selectedVariableDeclaration: true, func: arrowFunc };

        const maybeFunc = getContainingFunction(token);
        const typeChecker = program.getTypeChecker();

        if (
            maybeFunc &&
            (isFunctionExpression(maybeFunc) || isArrowFunction(maybeFunc)) &&
            !rangeContainsRange(maybeFunc.body, token) &&
            !containingThis(maybeFunc.body)
        ) {
            if ((isFunctionExpression(maybeFunc) && maybeFunc.name && FindAllReferences.Core.isSymbolReferencedInFile(maybeFunc.name, typeChecker, file))) return undefined;
            return { selectedVariableDeclaration: false, func: maybeFunc };
        }

        return undefined;
    }

    function isSingleVariableDeclaration(parent: Node): parent is VariableDeclarationList {
        return isVariableDeclaration(parent) || (isVariableDeclarationList(parent) && parent.declarations.length === 1);
    }

    function getArrowFunctionFromVariableDeclaration(parent: Node): ArrowFunction | undefined {
        if (!isSingleVariableDeclaration(parent)) return undefined;
        const variableDeclaration = isVariableDeclaration(parent) ? parent : parent.declarations[0];

        const initializer = variableDeclaration.initializer;
        if (!initializer || !isArrowFunction(initializer)) return undefined;
        return initializer;
    }

    function convertToBlock(body: ConciseBody): Block {
        if (isExpression(body)) {
            return createBlock([createReturn(body)], /* multiLine */ true);
        }
        else {
            return body;
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

    function getEditInfoForConvertToAnonymousFunction(context: RefactorContext, func: FunctionExpression | ArrowFunction): FileTextChanges[] {
        const { file } = context;
        const body = convertToBlock(func.body);
        const newNode = createFunctionExpression(func.modifiers, func.asteriskToken, /* name */ undefined, func.typeParameters, func.parameters, func.type, body);
        return textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
    }

    function getEditInfoForConvertToNamedFunction(context: RefactorContext, func: FunctionExpression | ArrowFunction, variableInfo: VariableInfo): FileTextChanges[] {
        const { file } = context;
        const body = convertToBlock(func.body);

        const { variableDeclaration, variableDeclarationList, statement, name } = variableInfo;
        suppressLeadingTrivia(statement);
        const newNode = createFunctionDeclaration(func.decorators, statement.modifiers, func.asteriskToken, name, func.typeParameters, func.parameters, func.type, body);

        if (variableDeclarationList.declarations.length === 1) {
            return textChanges.ChangeTracker.with(context, t => t.replaceNode(file, statement, newNode));
        }
        else {
            return textChanges.ChangeTracker.with(context, t => {
                t.delete(file, variableDeclaration);
                t.insertNodeAfter(file, statement, newNode);
            });
        }
    }

    function getEditInfoForConvertToArrowFunction(context: RefactorContext, func: FunctionExpression): FileTextChanges[] {
        const { file } = context;
        const statements = func.body.statements;
        const head = statements[0];
        let body: ConciseBody;

        if (canBeConvertedToExpression(func.body, head)) {
            body = head.expression!;
            suppressLeadingAndTrailingTrivia(body);
            copyComments(head, body);
        }
        else {
            body = func.body;
        }

        const newNode = createArrowFunction(func.modifiers, func.typeParameters, func.parameters, func.type, createToken(SyntaxKind.EqualsGreaterThanToken), body);
        return textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
    }

    function canBeConvertedToExpression(body: Block, head: Statement): head is ReturnStatement {
        return body.statements.length === 1 && ((isReturnStatement(head) && !!head.expression));
    }
}
