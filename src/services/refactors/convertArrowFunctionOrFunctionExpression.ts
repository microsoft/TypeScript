/* @internal */
namespace ts.refactor.convertArrowFunctionOrFunctionExpression {
const refactorName = "Convert arrow function or function expression";
const refactorDescription = ts.getLocaleSpecificMessage(ts.Diagnostics.Convert_arrow_function_or_function_expression);

const toAnonymousFunctionAction = {
    name: "Convert to anonymous function",
    description: ts.getLocaleSpecificMessage(ts.Diagnostics.Convert_to_anonymous_function),
    kind: "refactor.rewrite.function.anonymous",
};
const toNamedFunctionAction = {
    name: "Convert to named function",
    description: ts.getLocaleSpecificMessage(ts.Diagnostics.Convert_to_named_function),
    kind: "refactor.rewrite.function.named",
};
const toArrowFunctionAction = {
    name: "Convert to arrow function",
    description: ts.getLocaleSpecificMessage(ts.Diagnostics.Convert_to_arrow_function),
    kind: "refactor.rewrite.function.arrow",
};
ts.refactor.registerRefactor(refactorName, {
    kinds: [
        toAnonymousFunctionAction.kind,
        toNamedFunctionAction.kind,
        toArrowFunctionAction.kind
    ],
    getEditsForAction: getRefactorEditsToConvertFunctionExpressions,
    getAvailableActions: getRefactorActionsToConvertFunctionExpressions
});

interface FunctionInfo {
    readonly selectedVariableDeclaration: boolean;
    readonly func: ts.FunctionExpression | ts.ArrowFunction;
}

interface VariableInfo {
    readonly variableDeclaration: ts.VariableDeclaration;
    readonly variableDeclarationList: ts.VariableDeclarationList;
    readonly statement: ts.VariableStatement;
    readonly name: ts.Identifier;
}

function getRefactorActionsToConvertFunctionExpressions(context: ts.RefactorContext): readonly ts.ApplicableRefactorInfo[] {
    const { file, startPosition, program, kind } = context;
    const info = getFunctionInfo(file, startPosition, program);

    if (!info) return ts.emptyArray;
    const { selectedVariableDeclaration, func } = info;
    const possibleActions: ts.RefactorActionInfo[] = [];
    const errors: ts.RefactorActionInfo[] = [];
    if (ts.refactor.refactorKindBeginsWith(toNamedFunctionAction.kind, kind)) {
        const error = selectedVariableDeclaration || (ts.isArrowFunction(func) && ts.isVariableDeclaration(func.parent)) ?
            undefined : ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_convert_to_named_function);
        if (error) {
            errors.push({ ...toNamedFunctionAction, notApplicableReason: error });
        }
        else {
            possibleActions.push(toNamedFunctionAction);
        }
    }

    if (ts.refactor.refactorKindBeginsWith(toAnonymousFunctionAction.kind, kind)) {
        const error = !selectedVariableDeclaration && ts.isArrowFunction(func) ?
            undefined: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_convert_to_anonymous_function);
        if (error) {
            errors.push({ ...toAnonymousFunctionAction, notApplicableReason: error });
        }
        else {
            possibleActions.push(toAnonymousFunctionAction);
        }
    }

    if (ts.refactor.refactorKindBeginsWith(toArrowFunctionAction.kind, kind)) {
        const error = ts.isFunctionExpression(func) ? undefined : ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_convert_to_arrow_function);
        if (error) {
            errors.push({ ...toArrowFunctionAction, notApplicableReason: error });
        }
        else {
            possibleActions.push(toArrowFunctionAction);
        }
    }

    return [{
        name: refactorName,
        description: refactorDescription,
        actions: possibleActions.length === 0 && context.preferences.provideRefactorNotApplicableReason ?
            errors : possibleActions
    }];
}

function getRefactorEditsToConvertFunctionExpressions(context: ts.RefactorContext, actionName: string): ts.RefactorEditInfo | undefined {
    const { file, startPosition, program } = context;
    const info = getFunctionInfo(file, startPosition, program);

    if (!info) return undefined;
    const { func } = info;
    const edits: ts.FileTextChanges[] = [];

    switch (actionName) {
        case toAnonymousFunctionAction.name:
            edits.push(...getEditInfoForConvertToAnonymousFunction(context, func));
            break;

        case toNamedFunctionAction.name:
            const variableInfo = getVariableInfo(func);
            if (!variableInfo) return undefined;

            edits.push(...getEditInfoForConvertToNamedFunction(context, func, variableInfo));
            break;

        case toArrowFunctionAction.name:
            if (!ts.isFunctionExpression(func)) return undefined;
            edits.push(...getEditInfoForConvertToArrowFunction(context, func));
            break;

        default:
            return ts.Debug.fail("invalid action");
    }

    return { renameFilename: undefined, renameLocation: undefined, edits };
}

function containingThis(node: ts.Node): boolean {
    let containsThis = false;
    node.forEachChild(function checkThis(child) {

        if (ts.isThis(child)) {
            containsThis = true;
            return;
        }

        if (!ts.isClassLike(child) && !ts.isFunctionDeclaration(child) && !ts.isFunctionExpression(child)) {
            ts.forEachChild(child, checkThis);
        }
    });

    return containsThis;
}

function getFunctionInfo(file: ts.SourceFile, startPosition: number, program: ts.Program): FunctionInfo | undefined {
    const token = ts.getTokenAtPosition(file, startPosition);
    const typeChecker = program.getTypeChecker();
    const func = tryGetFunctionFromVariableDeclaration(file, typeChecker, token.parent);
    if (func && !containingThis(func.body) && !typeChecker.containsArgumentsReference(func)) {
        return { selectedVariableDeclaration: true, func };
    }

    const maybeFunc = ts.getContainingFunction(token);
    if (
        maybeFunc &&
        (ts.isFunctionExpression(maybeFunc) || ts.isArrowFunction(maybeFunc)) &&
        !ts.rangeContainsRange(maybeFunc.body, token) &&
        !containingThis(maybeFunc.body) &&
        !typeChecker.containsArgumentsReference(maybeFunc)
    ) {
        if (ts.isFunctionExpression(maybeFunc) && isFunctionReferencedInFile(file, typeChecker, maybeFunc)) return undefined;
        return { selectedVariableDeclaration: false, func: maybeFunc };
    }

    return undefined;
}

function isSingleVariableDeclaration(parent: ts.Node): parent is ts.VariableDeclarationList {
    return ts.isVariableDeclaration(parent) || (ts.isVariableDeclarationList(parent) && parent.declarations.length === 1);
}

function tryGetFunctionFromVariableDeclaration(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker, parent: ts.Node): ts.ArrowFunction | ts.FunctionExpression | undefined {
    if (!isSingleVariableDeclaration(parent)) {
        return undefined;
    }
    const variableDeclaration = ts.isVariableDeclaration(parent) ? parent : ts.first(parent.declarations);
    const initializer = variableDeclaration.initializer;
    if (initializer && (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer) && !isFunctionReferencedInFile(sourceFile, typeChecker, initializer))) {
        return initializer;
    }
    return undefined;
}

function convertToBlock(body: ts.ConciseBody): ts.Block {
    if (ts.isExpression(body)) {
        const returnStatement = ts.factory.createReturnStatement(body);
        const file = body.getSourceFile();
        ts.suppressLeadingAndTrailingTrivia(returnStatement);
        ts.copyTrailingAsLeadingComments(body, returnStatement, file, /* commentKind */ undefined, /* hasTrailingNewLine */ true);
        return ts.factory.createBlock([returnStatement], /* multiLine */ true);
    }
    else {
        return body;
    }
}

function getVariableInfo(func: ts.FunctionExpression | ts.ArrowFunction): VariableInfo | undefined {
    const variableDeclaration = func.parent;
    if (!ts.isVariableDeclaration(variableDeclaration) || !ts.isVariableDeclarationInVariableStatement(variableDeclaration)) return undefined;

    const variableDeclarationList = variableDeclaration.parent;
    const statement = variableDeclarationList.parent;
    if (!ts.isVariableDeclarationList(variableDeclarationList) || !ts.isVariableStatement(statement) || !ts.isIdentifier(variableDeclaration.name)) return undefined;

    return { variableDeclaration, variableDeclarationList, statement, name: variableDeclaration.name };
}

function getEditInfoForConvertToAnonymousFunction(context: ts.RefactorContext, func: ts.FunctionExpression | ts.ArrowFunction): ts.FileTextChanges[] {
    const { file } = context;
    const body = convertToBlock(func.body);
    const newNode = ts.factory.createFunctionExpression(func.modifiers, func.asteriskToken, /* name */ undefined, func.typeParameters, func.parameters, func.type, body);
    return ts.textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
}

function getEditInfoForConvertToNamedFunction(context: ts.RefactorContext, func: ts.FunctionExpression | ts.ArrowFunction, variableInfo: VariableInfo): ts.FileTextChanges[] {
    const { file } = context;
    const body = convertToBlock(func.body);

    const { variableDeclaration, variableDeclarationList, statement, name } = variableInfo;
    ts.suppressLeadingTrivia(statement);

    const modifiersFlags = (ts.getCombinedModifierFlags(variableDeclaration) & ts.ModifierFlags.Export) | ts.getEffectiveModifierFlags(func);
    const modifiers = ts.factory.createModifiersFromModifierFlags(modifiersFlags);
    const newNode = ts.factory.createFunctionDeclaration(ts.length(modifiers) ? modifiers : undefined, func.asteriskToken, name, func.typeParameters, func.parameters, func.type, body);

    if (variableDeclarationList.declarations.length === 1) {
        return ts.textChanges.ChangeTracker.with(context, t => t.replaceNode(file, statement, newNode));
    }
    else {
        return ts.textChanges.ChangeTracker.with(context, t => {
            t.delete(file, variableDeclaration);
            t.insertNodeAfter(file, statement, newNode);
        });
    }
}

function getEditInfoForConvertToArrowFunction(context: ts.RefactorContext, func: ts.FunctionExpression): ts.FileTextChanges[] {
    const { file } = context;
    const statements = func.body.statements;
    const head = statements[0];
    let body: ts.ConciseBody;

    if (canBeConvertedToExpression(func.body, head)) {
        body = head.expression!;
        ts.suppressLeadingAndTrailingTrivia(body);
        ts.copyComments(head, body);
    }
    else {
        body = func.body;
    }

    const newNode = ts.factory.createArrowFunction(func.modifiers, func.typeParameters, func.parameters, func.type, ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), body);
    return ts.textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, newNode));
}

function canBeConvertedToExpression(body: ts.Block, head: ts.Statement): head is ts.ReturnStatement {
    return body.statements.length === 1 && ((ts.isReturnStatement(head) && !!head.expression));
}

function isFunctionReferencedInFile(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker, node: ts.FunctionExpression): boolean {
    return !!node.name && ts.FindAllReferences.Core.isSymbolReferencedInFile(node.name, typeChecker, sourceFile);
}
}
