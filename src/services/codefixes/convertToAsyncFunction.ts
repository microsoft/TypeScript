import * as ts from "../_namespaces/ts";

const fixId = "convertToAsyncFunction";
const errorCodes = [ts.Diagnostics.This_may_be_converted_to_an_async_function.code];
let codeActionSucceeded = true;
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context: ts.CodeFixContext) {
        codeActionSucceeded = true;
        const changes = ts.textChanges.ChangeTracker.with(context, (t) => convertToAsyncFunction(t, context.sourceFile, context.span.start, context.program.getTypeChecker()));
        return codeActionSucceeded ? [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Convert_to_async_function, fixId, ts.Diagnostics.Convert_all_to_async_functions)] : [];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, err) => convertToAsyncFunction(changes, err.file, err.start, context.program.getTypeChecker())),
});

const enum SynthBindingNameKind {
    Identifier,
    BindingPattern,
}

type SynthBindingName = SynthBindingPattern | SynthIdentifier;

interface SynthBindingPattern {
    readonly kind: SynthBindingNameKind.BindingPattern;
    readonly elements: readonly SynthBindingName[];
    readonly bindingPattern: ts.BindingPattern;
    readonly types: ts.Type[];
}

interface SynthIdentifier {
    readonly kind: SynthBindingNameKind.Identifier;
    readonly identifier: ts.Identifier;
    readonly types: ts.Type[];
    /** A declaration for this identifier has already been generated */
    hasBeenDeclared: boolean;
    hasBeenReferenced: boolean;
}

interface Transformer {
    readonly checker: ts.TypeChecker;
    readonly synthNamesMap: ts.ESMap<string, SynthIdentifier>; // keys are the symbol id of the identifier
    readonly setOfExpressionsToReturn: ts.ReadonlySet<number>; // keys are the node ids of the expressions
    readonly isInJSFile: boolean;
}

interface PromiseReturningCallExpression<Name extends string> extends ts.CallExpression {
    readonly expression: ts.PropertyAccessExpression & {
        readonly escapedText: Name;
    };
}

function convertToAsyncFunction(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, position: number, checker: ts.TypeChecker): void {
    // get the function declaration - returns a promise
    const tokenAtPosition = ts.getTokenAtPosition(sourceFile, position);
    let functionToConvert: ts.FunctionLikeDeclaration | undefined;

    // if the parent of a FunctionLikeDeclaration is a variable declaration, the convertToAsync diagnostic will be reported on the variable name
    if (ts.isIdentifier(tokenAtPosition) && ts.isVariableDeclaration(tokenAtPosition.parent) &&
        tokenAtPosition.parent.initializer && ts.isFunctionLikeDeclaration(tokenAtPosition.parent.initializer)) {
        functionToConvert = tokenAtPosition.parent.initializer;
    }
    else {
        functionToConvert = ts.tryCast(ts.getContainingFunction(ts.getTokenAtPosition(sourceFile, position)), ts.canBeConvertedToAsync);
    }

    if (!functionToConvert) {
        return;
    }

    const synthNamesMap = new ts.Map<string, SynthIdentifier>();
    const isInJavascript = ts.isInJSFile(functionToConvert);
    const setOfExpressionsToReturn = getAllPromiseExpressionsToReturn(functionToConvert, checker);
    const functionToConvertRenamed = renameCollidingVarNames(functionToConvert, checker, synthNamesMap);
    if (!ts.returnsPromise(functionToConvertRenamed, checker)) {
        return;
    }

    const returnStatements = functionToConvertRenamed.body && ts.isBlock(functionToConvertRenamed.body) ? getReturnStatementsWithPromiseHandlers(functionToConvertRenamed.body, checker) : ts.emptyArray;
    const transformer: Transformer = { checker, synthNamesMap, setOfExpressionsToReturn, isInJSFile: isInJavascript };
    if (!returnStatements.length) {
        return;
    }

    const pos = ts.skipTrivia(sourceFile.text, ts.moveRangePastModifiers(functionToConvert).pos);
    changes.insertModifierAt(sourceFile, pos, ts.SyntaxKind.AsyncKeyword, { suffix: " " });

    for (const returnStatement of returnStatements) {
        ts.forEachChild(returnStatement, function visit(node) {
            if (ts.isCallExpression(node)) {
                const newNodes = transformExpression(node, node, transformer, /*hasContinuation*/ false);
                if (hasFailed()) {
                    return true; // return something truthy to shortcut out of more work
                }
                changes.replaceNodeWithNodes(sourceFile, returnStatement, newNodes);
            }
            else if (!ts.isFunctionLike(node)) {
                ts.forEachChild(node, visit);
                if (hasFailed()) {
                    return true; // return something truthy to shortcut out of more work
                }
            }
        });
        if (hasFailed()) {
            return; // shortcut out of more work
        }
    }
}

function getReturnStatementsWithPromiseHandlers(body: ts.Block, checker: ts.TypeChecker): readonly ts.ReturnStatement[] {
    const res: ts.ReturnStatement[] = [];
    ts.forEachReturnStatement(body, ret => {
        if (ts.isReturnStatementWithFixablePromiseHandler(ret, checker)) res.push(ret);
    });
    return res;
}

/*
    Finds all of the expressions of promise type that should not be saved in a variable during the refactor
*/
function getAllPromiseExpressionsToReturn(func: ts.FunctionLikeDeclaration, checker: ts.TypeChecker): ts.Set<number> {
    if (!func.body) {
        return new ts.Set();
    }

    const setOfExpressionsToReturn = new ts.Set<number>();
    ts.forEachChild(func.body, function visit(node: ts.Node) {
        if (isPromiseReturningCallExpression(node, checker, "then")) {
            setOfExpressionsToReturn.add(ts.getNodeId(node));
            ts.forEach(node.arguments, visit);
        }
        else if (isPromiseReturningCallExpression(node, checker, "catch") ||
            isPromiseReturningCallExpression(node, checker, "finally")) {
            setOfExpressionsToReturn.add(ts.getNodeId(node));
            // if .catch() or .finally() is the last call in the chain, move leftward in the chain until we hit something else that should be returned
            ts.forEachChild(node, visit);
        }
        else if (isPromiseTypedExpression(node, checker)) {
            setOfExpressionsToReturn.add(ts.getNodeId(node));
            // don't recurse here, since we won't refactor any children or arguments of the expression
        }
        else {
            ts.forEachChild(node, visit);
        }
    });

    return setOfExpressionsToReturn;
}

function isPromiseReturningCallExpression<Name extends string>(node: ts.Node, checker: ts.TypeChecker, name: Name): node is PromiseReturningCallExpression<Name> {
    if (!ts.isCallExpression(node)) return false;
    const isExpressionOfName = ts.hasPropertyAccessExpressionWithName(node, name);
    const nodeType = isExpressionOfName && checker.getTypeAtLocation(node);
    return !!(nodeType && checker.getPromisedTypeOfPromise(nodeType));
}

// NOTE: this is a mostly copy of `isReferenceToType` from checker.ts. While this violates DRY, it keeps
// `isReferenceToType` in checker local to the checker to avoid the cost of a property lookup on `ts`.
function isReferenceToType(type: ts.Type, target: ts.Type) {
    return (ts.getObjectFlags(type) & ts.ObjectFlags.Reference) !== 0
        && (type as ts.TypeReference).target === target;
}

function getExplicitPromisedTypeOfPromiseReturningCallExpression(node: PromiseReturningCallExpression<"then" | "catch" | "finally">, callback: ts.Expression, checker: ts.TypeChecker) {
    if (node.expression.name.escapedText === "finally") {
        // for a `finally`, there's no type argument
        return undefined;
    }

    // If the call to `then` or `catch` comes from the global `Promise` or `PromiseLike` type, we can safely use the
    // type argument supplied for the callback. For other promise types we would need a more complex heuristic to determine
    // which type argument is safe to use as an annotation.
    const promiseType = checker.getTypeAtLocation(node.expression.expression);
    if (isReferenceToType(promiseType, checker.getPromiseType()) ||
        isReferenceToType(promiseType, checker.getPromiseLikeType())) {
        if (node.expression.name.escapedText === "then") {
            if (callback === ts.elementAt(node.arguments, 0)) {
                // for the `onfulfilled` callback, use the first type argument
                return ts.elementAt(node.typeArguments, 0);
            }
            else if (callback === ts.elementAt(node.arguments, 1)) {
                // for the `onrejected` callback, use the second type argument
                return ts.elementAt(node.typeArguments, 1);
            }
        }
        else {
            return ts.elementAt(node.typeArguments, 0);
        }
    }
}

function isPromiseTypedExpression(node: ts.Node, checker: ts.TypeChecker): node is ts.Expression {
    if (!ts.isExpression(node)) return false;
    return !!checker.getPromisedTypeOfPromise(checker.getTypeAtLocation(node));
}

/*
    Renaming of identifiers may be necessary as the refactor changes scopes -
    This function collects all existing identifier names and names of identifiers that will be created in the refactor.
    It then checks for any collisions and renames them through getSynthesizedDeepClone
*/
function renameCollidingVarNames(nodeToRename: ts.FunctionLikeDeclaration, checker: ts.TypeChecker, synthNamesMap: ts.ESMap<string, SynthIdentifier>): ts.FunctionLikeDeclaration {
    const identsToRenameMap = new ts.Map<string, ts.Identifier>(); // key is the symbol id
    const collidingSymbolMap = ts.createMultiMap<ts.Symbol>();
    ts.forEachChild(nodeToRename, function visit(node: ts.Node) {
        if (!ts.isIdentifier(node)) {
            ts.forEachChild(node, visit);
            return;
        }
        const symbol = checker.getSymbolAtLocation(node);
        if (symbol) {
            const type = checker.getTypeAtLocation(node);
            // Note - the choice of the last call signature is arbitrary
            const lastCallSignature = getLastCallSignature(type, checker);
            const symbolIdString = ts.getSymbolId(symbol).toString();

            // If the identifier refers to a function, we want to add the new synthesized variable for the declaration. Example:
            //   fetch('...').then(response => { ... })
            // will eventually become
            //   const response = await fetch('...')
            // so we push an entry for 'response'.
            if (lastCallSignature && !ts.isParameter(node.parent) && !ts.isFunctionLikeDeclaration(node.parent) && !synthNamesMap.has(symbolIdString)) {
                const firstParameter = ts.firstOrUndefined(lastCallSignature.parameters);
                const ident = firstParameter?.valueDeclaration
                    && ts.isParameter(firstParameter.valueDeclaration)
                    && ts.tryCast(firstParameter.valueDeclaration.name, ts.isIdentifier)
                    || ts.factory.createUniqueName("result", ts.GeneratedIdentifierFlags.Optimistic);
                const synthName = getNewNameIfConflict(ident, collidingSymbolMap);
                synthNamesMap.set(symbolIdString, synthName);
                collidingSymbolMap.add(ident.text, symbol);
            }
            // We only care about identifiers that are parameters, variable declarations, or binding elements
            else if (node.parent && (ts.isParameter(node.parent) || ts.isVariableDeclaration(node.parent) || ts.isBindingElement(node.parent))) {
                const originalName = node.text;
                const collidingSymbols = collidingSymbolMap.get(originalName);

                // if the identifier name conflicts with a different identifier that we've already seen
                if (collidingSymbols && collidingSymbols.some(prevSymbol => prevSymbol !== symbol)) {
                    const newName = getNewNameIfConflict(node, collidingSymbolMap);
                    identsToRenameMap.set(symbolIdString, newName.identifier);
                    synthNamesMap.set(symbolIdString, newName);
                    collidingSymbolMap.add(originalName, symbol);
                }
                else {
                    const identifier = ts.getSynthesizedDeepClone(node);
                    synthNamesMap.set(symbolIdString, createSynthIdentifier(identifier));
                    collidingSymbolMap.add(originalName, symbol);
                }
            }
        }
    });

    return ts.getSynthesizedDeepCloneWithReplacements(nodeToRename, /*includeTrivia*/ true, original => {
        if (ts.isBindingElement(original) && ts.isIdentifier(original.name) && ts.isObjectBindingPattern(original.parent)) {
            const symbol = checker.getSymbolAtLocation(original.name);
            const renameInfo = symbol && identsToRenameMap.get(String(ts.getSymbolId(symbol)));
            if (renameInfo && renameInfo.text !== (original.name || original.propertyName).getText()) {
                return ts.factory.createBindingElement(
                    original.dotDotDotToken,
                    original.propertyName || original.name,
                    renameInfo,
                    original.initializer);
            }
        }
        else if (ts.isIdentifier(original)) {
            const symbol = checker.getSymbolAtLocation(original);
            const renameInfo = symbol && identsToRenameMap.get(String(ts.getSymbolId(symbol)));
            if (renameInfo) {
                return ts.factory.createIdentifier(renameInfo.text);
            }
        }
    });
}

function getNewNameIfConflict(name: ts.Identifier, originalNames: ts.ReadonlyESMap<string, ts.Symbol[]>): SynthIdentifier {
    const numVarsSameName = (originalNames.get(name.text) || ts.emptyArray).length;
    const identifier = numVarsSameName === 0 ? name : ts.factory.createIdentifier(name.text + "_" + numVarsSameName);
    return createSynthIdentifier(identifier);
}

function hasFailed() {
    return !codeActionSucceeded;
}

function silentFail() {
    codeActionSucceeded = false;
    return ts.emptyArray;
}

// dispatch function to recursively build the refactoring
// should be kept up to date with isFixablePromiseHandler in suggestionDiagnostics.ts
/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows the continuation to which this expression belongs.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformExpression(returnContextNode: ts.Expression, node: ts.Expression, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly ts.Statement[] {
    if (isPromiseReturningCallExpression(node, transformer.checker, "then")) {
        return transformThen(node, ts.elementAt(node.arguments, 0), ts.elementAt(node.arguments, 1), transformer, hasContinuation, continuationArgName);
    }
    if (isPromiseReturningCallExpression(node, transformer.checker, "catch")) {
        return transformCatch(node, ts.elementAt(node.arguments, 0), transformer, hasContinuation, continuationArgName);
    }
    if (isPromiseReturningCallExpression(node, transformer.checker, "finally")) {
        return transformFinally(node, ts.elementAt(node.arguments, 0), transformer, hasContinuation, continuationArgName);
    }
    if (ts.isPropertyAccessExpression(node)) {
        return transformExpression(returnContextNode, node.expression, transformer, hasContinuation, continuationArgName);
    }

    const nodeType = transformer.checker.getTypeAtLocation(node);
    if (nodeType && transformer.checker.getPromisedTypeOfPromise(nodeType)) {
        ts.Debug.assertNode(ts.getOriginalNode(node).parent, ts.isPropertyAccessExpression);
        return transformPromiseExpressionOfPropertyAccess(returnContextNode, node, transformer, hasContinuation, continuationArgName);
    }

    return silentFail();
}

function isNullOrUndefined({ checker }: Transformer, node: ts.Expression) {
    if (node.kind === ts.SyntaxKind.NullKeyword) return true;
    if (ts.isIdentifier(node) && !ts.isGeneratedIdentifier(node) && ts.idText(node) === "undefined") {
        const symbol = checker.getSymbolAtLocation(node);
        return !symbol || checker.isUndefinedSymbol(symbol);
    }
    return false;
}

function createUniqueSynthName(prevArgName: SynthIdentifier): SynthIdentifier {
    const renamedPrevArg = ts.factory.createUniqueName(prevArgName.identifier.text, ts.GeneratedIdentifierFlags.Optimistic);
    return createSynthIdentifier(renamedPrevArg);
}

function getPossibleNameForVarDecl(node: PromiseReturningCallExpression<"then" | "catch" | "finally">, transformer: Transformer, continuationArgName?: SynthBindingName) {
    let possibleNameForVarDecl: SynthIdentifier | undefined;

    // If there is another call in the chain after the .catch() or .finally() we are transforming, we will need to save the result of both paths
    // (try block and catch/finally block). To do this, we will need to synthesize a variable that we were not aware of while we were adding
    // identifiers to the synthNamesMap. We will use the continuationArgName and then update the synthNamesMap with a new variable name for
    // the next transformation step

    if (continuationArgName && !shouldReturn(node, transformer)) {
        if (isSynthIdentifier(continuationArgName)) {
            possibleNameForVarDecl = continuationArgName;
            transformer.synthNamesMap.forEach((val, key) => {
                if (val.identifier.text === continuationArgName.identifier.text) {
                    const newSynthName = createUniqueSynthName(continuationArgName);
                    transformer.synthNamesMap.set(key, newSynthName);
                }
            });
        }
        else {
            possibleNameForVarDecl = createSynthIdentifier(ts.factory.createUniqueName("result", ts.GeneratedIdentifierFlags.Optimistic), continuationArgName.types);
        }

        // We are about to write a 'let' variable declaration, but `transformExpression` for both
        // the try block and catch/finally block will assign to this name. Setting this flag indicates
        // that future assignments should be written as `name = value` instead of `const name = value`.
        declareSynthIdentifier(possibleNameForVarDecl);
    }

    return possibleNameForVarDecl;
}

function finishCatchOrFinallyTransform(node: PromiseReturningCallExpression<"then" | "catch" | "finally">, transformer: Transformer, tryStatement: ts.TryStatement, possibleNameForVarDecl: SynthIdentifier | undefined, continuationArgName?: SynthBindingName) {
    const statements: ts.Statement[] = [];

    // In order to avoid an implicit any, we will synthesize a type for the declaration using the unions of the types of both paths (try block and catch block)
    let varDeclIdentifier: ts.Identifier | undefined;

    if (possibleNameForVarDecl && !shouldReturn(node, transformer)) {
        varDeclIdentifier = ts.getSynthesizedDeepClone(declareSynthIdentifier(possibleNameForVarDecl));
        const typeArray: ts.Type[] = possibleNameForVarDecl.types;
        const unionType = transformer.checker.getUnionType(typeArray, ts.UnionReduction.Subtype);
        const unionTypeNode = transformer.isInJSFile ? undefined : transformer.checker.typeToTypeNode(unionType, /*enclosingDeclaration*/ undefined, /*flags*/ undefined);
        const varDecl = [ts.factory.createVariableDeclaration(varDeclIdentifier, /*exclamationToken*/ undefined, unionTypeNode)];
        const varDeclList = ts.factory.createVariableStatement(/*modifiers*/ undefined, ts.factory.createVariableDeclarationList(varDecl, ts.NodeFlags.Let));
        statements.push(varDeclList);
    }

    statements.push(tryStatement);

    if (continuationArgName && varDeclIdentifier && isSynthBindingPattern(continuationArgName)) {
        statements.push(ts.factory.createVariableStatement(
            /*modifiers*/ undefined,
            ts.factory.createVariableDeclarationList([
                ts.factory.createVariableDeclaration(
                    ts.getSynthesizedDeepClone(declareSynthBindingPattern(continuationArgName)),
                    /*exclamationToken*/ undefined,
                    /*type*/ undefined,
                    varDeclIdentifier
                )],
                ts.NodeFlags.Const)));
    }

    return statements;
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows this continuation.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformFinally(node: PromiseReturningCallExpression<"finally">, onFinally: ts.Expression | undefined, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly ts.Statement[] {
    if (!onFinally || isNullOrUndefined(transformer, onFinally)) {
        // Ignore this call as it has no effect on the result
        return transformExpression(/* returnContextNode */ node, node.expression.expression, transformer, hasContinuation, continuationArgName);
    }

    const possibleNameForVarDecl = getPossibleNameForVarDecl(node, transformer, continuationArgName);

    // Transform the left-hand-side of `.finally` into an array of inlined statements. We pass `true` for hasContinuation as `node` is the outer continuation.
    const inlinedLeftHandSide = transformExpression(/*returnContextNode*/ node, node.expression.expression, transformer, /*hasContinuation*/ true, possibleNameForVarDecl);
    if (hasFailed()) return silentFail(); // shortcut out of more work

    // Transform the callback argument into an array of inlined statements. We pass whether we have an outer continuation here
    // as that indicates whether `return` is valid.
    const inlinedCallback = transformCallbackArgument(onFinally, hasContinuation, /*continuationArgName*/ undefined, /*argName*/ undefined, node, transformer);
    if (hasFailed()) return silentFail(); // shortcut out of more work

    const tryBlock = ts.factory.createBlock(inlinedLeftHandSide);
    const finallyBlock = ts.factory.createBlock(inlinedCallback);
    const tryStatement = ts.factory.createTryStatement(tryBlock, /*catchClause*/ undefined, finallyBlock);
    return finishCatchOrFinallyTransform(node, transformer, tryStatement, possibleNameForVarDecl, continuationArgName);
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows this continuation.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformCatch(node: PromiseReturningCallExpression<"then" | "catch">, onRejected: ts.Expression | undefined, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly ts.Statement[] {
    if (!onRejected || isNullOrUndefined(transformer, onRejected)) {
        // Ignore this call as it has no effect on the result
        return transformExpression(/* returnContextNode */ node, node.expression.expression, transformer, hasContinuation, continuationArgName);
    }

    const inputArgName = getArgBindingName(onRejected, transformer);
    const possibleNameForVarDecl = getPossibleNameForVarDecl(node, transformer, continuationArgName);

    // Transform the left-hand-side of `.then`/`.catch` into an array of inlined statements. We pass `true` for hasContinuation as `node` is the outer continuation.
    const inlinedLeftHandSide = transformExpression(/*returnContextNode*/ node, node.expression.expression, transformer, /*hasContinuation*/ true, possibleNameForVarDecl);
    if (hasFailed()) return silentFail(); // shortcut out of more work

    // Transform the callback argument into an array of inlined statements. We pass whether we have an outer continuation here
    // as that indicates whether `return` is valid.
    const inlinedCallback = transformCallbackArgument(onRejected, hasContinuation, possibleNameForVarDecl, inputArgName, node, transformer);
    if (hasFailed()) return silentFail(); // shortcut out of more work

    const tryBlock = ts.factory.createBlock(inlinedLeftHandSide);
    const catchClause = ts.factory.createCatchClause(inputArgName && ts.getSynthesizedDeepClone(declareSynthBindingName(inputArgName)), ts.factory.createBlock(inlinedCallback));
    const tryStatement = ts.factory.createTryStatement(tryBlock, catchClause, /*finallyBlock*/ undefined);
    return finishCatchOrFinallyTransform(node, transformer, tryStatement, possibleNameForVarDecl, continuationArgName);
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows this continuation.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformThen(node: PromiseReturningCallExpression<"then">, onFulfilled: ts.Expression | undefined, onRejected: ts.Expression | undefined, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly ts.Statement[] {
    if (!onFulfilled || isNullOrUndefined(transformer, onFulfilled)) {
        // If we don't have an `onfulfilled` callback, try treating this as a `.catch`.
        return transformCatch(node, onRejected, transformer, hasContinuation, continuationArgName);
    }

    // We don't currently support transforming a `.then` with both onfulfilled and onrejected handlers, per GH#38152.
    if (onRejected && !isNullOrUndefined(transformer, onRejected)) {
        return silentFail();
    }

    const inputArgName = getArgBindingName(onFulfilled, transformer);

    // Transform the left-hand-side of `.then` into an array of inlined statements. We pass `true` for hasContinuation as `node` is the outer continuation.
    const inlinedLeftHandSide = transformExpression(node.expression.expression, node.expression.expression, transformer, /*hasContinuation*/ true, inputArgName);
    if (hasFailed()) return silentFail(); // shortcut out of more work

    // Transform the callback argument into an array of inlined statements. We pass whether we have an outer continuation here
    // as that indicates whether `return` is valid.
    const inlinedCallback = transformCallbackArgument(onFulfilled, hasContinuation, continuationArgName, inputArgName, node, transformer);
    if (hasFailed()) return silentFail(); // shortcut out of more work

    return ts.concatenate(inlinedLeftHandSide, inlinedCallback);
}

/**
 * Transforms the 'x' part of `x.then(...)`, or the 'y()' part of `y().catch(...)`, where 'x' and 'y()' are Promises.
 */
function transformPromiseExpressionOfPropertyAccess(returnContextNode: ts.Expression, node: ts.Expression, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly ts.Statement[] {
    if (shouldReturn(returnContextNode, transformer)) {
        let returnValue = ts.getSynthesizedDeepClone(node);
        if (hasContinuation) {
            returnValue = ts.factory.createAwaitExpression(returnValue);
        }
        return [ts.factory.createReturnStatement(returnValue)];
    }

    return createVariableOrAssignmentOrExpressionStatement(continuationArgName, ts.factory.createAwaitExpression(node), /*typeAnnotation*/ undefined);
}

function createVariableOrAssignmentOrExpressionStatement(variableName: SynthBindingName | undefined, rightHandSide: ts.Expression, typeAnnotation: ts.TypeNode | undefined): readonly ts.Statement[] {
    if (!variableName || isEmptyBindingName(variableName)) {
        // if there's no argName to assign to, there still might be side effects
        return [ts.factory.createExpressionStatement(rightHandSide)];
    }

    if (isSynthIdentifier(variableName) && variableName.hasBeenDeclared) {
        // if the variable has already been declared, we don't need "let" or "const"
        return [ts.factory.createExpressionStatement(ts.factory.createAssignment(ts.getSynthesizedDeepClone(referenceSynthIdentifier(variableName)), rightHandSide))];
    }

    return [
        ts.factory.createVariableStatement(
            /*modifiers*/ undefined,
            ts.factory.createVariableDeclarationList([
                ts.factory.createVariableDeclaration(
                    ts.getSynthesizedDeepClone(declareSynthBindingName(variableName)),
                    /*exclamationToken*/ undefined,
                    typeAnnotation,
                    rightHandSide)],
                ts.NodeFlags.Const))];
}

function maybeAnnotateAndReturn(expressionToReturn: ts.Expression | undefined, typeAnnotation: ts.TypeNode | undefined): ts.Statement[] {
    if (typeAnnotation && expressionToReturn) {
        const name = ts.factory.createUniqueName("result", ts.GeneratedIdentifierFlags.Optimistic);
        return [
            ...createVariableOrAssignmentOrExpressionStatement(createSynthIdentifier(name), expressionToReturn, typeAnnotation),
            ts.factory.createReturnStatement(name)
        ];
    }
    return [ts.factory.createReturnStatement(expressionToReturn)];
}

// should be kept up to date with isFixablePromiseArgument in suggestionDiagnostics.ts
/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows the continuation to which this callback belongs.
 * @param continuationArgName The argument name for the continuation that follows this call.
 * @param inputArgName The argument name provided to this call
 */
function transformCallbackArgument(func: ts.Expression, hasContinuation: boolean, continuationArgName: SynthBindingName | undefined, inputArgName: SynthBindingName | undefined, parent: PromiseReturningCallExpression<"then" | "catch" | "finally">, transformer: Transformer): readonly ts.Statement[] {
    switch (func.kind) {
        case ts.SyntaxKind.NullKeyword:
            // do not produce a transformed statement for a null argument
            break;
        case ts.SyntaxKind.PropertyAccessExpression:
        case ts.SyntaxKind.Identifier: // identifier includes undefined
            if (!inputArgName) {
                // undefined was argument passed to promise handler
                break;
            }

            const synthCall = ts.factory.createCallExpression(ts.getSynthesizedDeepClone(func as ts.Identifier | ts.PropertyAccessExpression), /*typeArguments*/ undefined, isSynthIdentifier(inputArgName) ? [referenceSynthIdentifier(inputArgName)] : []);

            if (shouldReturn(parent, transformer)) {
                return maybeAnnotateAndReturn(synthCall, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent, func, transformer.checker));
            }

            const type = transformer.checker.getTypeAtLocation(func);
            const callSignatures = transformer.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
            if (!callSignatures.length) {
                // if identifier in handler has no call signatures, it's invalid
                return silentFail();
            }
            const returnType = callSignatures[0].getReturnType();
            const varDeclOrAssignment = createVariableOrAssignmentOrExpressionStatement(continuationArgName, ts.factory.createAwaitExpression(synthCall), getExplicitPromisedTypeOfPromiseReturningCallExpression(parent, func, transformer.checker));
            if (continuationArgName) {
                continuationArgName.types.push(transformer.checker.getAwaitedType(returnType) || returnType);
            }
            return varDeclOrAssignment;

        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction: {
            const funcBody = (func as ts.FunctionExpression | ts.ArrowFunction).body;
            const returnType = getLastCallSignature(transformer.checker.getTypeAtLocation(func), transformer.checker)?.getReturnType();

            // Arrow functions with block bodies { } will enter this control flow
            if (ts.isBlock(funcBody)) {
                let refactoredStmts: ts.Statement[] = [];
                let seenReturnStatement = false;
                for (const statement of funcBody.statements) {
                    if (ts.isReturnStatement(statement)) {
                        seenReturnStatement = true;
                        if (ts.isReturnStatementWithFixablePromiseHandler(statement, transformer.checker)) {
                            refactoredStmts = refactoredStmts.concat(transformReturnStatementWithFixablePromiseHandler(transformer, statement, hasContinuation, continuationArgName));
                        }
                        else {
                            const possiblyAwaitedRightHandSide = returnType && statement.expression ? getPossiblyAwaitedRightHandSide(transformer.checker, returnType, statement.expression) : statement.expression;
                            refactoredStmts.push(...maybeAnnotateAndReturn(possiblyAwaitedRightHandSide, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent, func, transformer.checker)));
                        }
                    }
                    else if (hasContinuation && ts.forEachReturnStatement(statement, ts.returnTrue)) {
                        // If there is a nested `return` in a callback that has a trailing continuation, we don't transform it as the resulting complexity is too great. For example:
                        //
                        // source                               | result
                        // -------------------------------------| ---------------------------------------
                        // function f(): Promise<number> {      | async function f9(): Promise<number> {
                        //     return foo().then(() => {        |     await foo();
                        //         if (Math.random()) {         |     if (Math.random()) {
                        //             return 1;                |         return 1; // incorrect early return
                        //         }                            |     }
                        //         return 2;                    |     return 2; // incorrect early return
                        //     }).then(a => {                   |     const a = undefined;
                        //         return a + 1;                |     return a + 1;
                        //     });                              | }
                        // }                                    |
                        //
                        // However, branching returns in the outermost continuation are acceptable as no other continuation follows it:
                        //
                        // source                               | result
                        //--------------------------------------|---------------------------------------
                        // function f() {                       | async function f() {
                        //     return foo().then(res => {       |     const res = await foo();
                        //       if (res.ok) {                  |     if (res.ok) {
                        //         return 1;                    |         return 1;
                        //       }                              |     }
                        //       else {                         |     else {
                        //         if (res.buffer.length > 5) { |         if (res.buffer.length > 5) {
                        //           return 2;                  |             return 2;
                        //         }                            |         }
                        //         else {                       |         else {
                        //             return 3;                |             return 3;
                        //         }                            |         }
                        //       }                              |     }
                        //     });                              | }
                        // }                                    |
                        //
                        // We may improve this in the future, but for now the heuristics are too complex

                        return silentFail();
                    }
                    else {
                        refactoredStmts.push(statement);
                    }
                }

                return shouldReturn(parent, transformer)
                    ? refactoredStmts.map(s => ts.getSynthesizedDeepClone(s))
                    : removeReturns(
                        refactoredStmts,
                        continuationArgName,
                        transformer,
                        seenReturnStatement);
            }
            else {
                const inlinedStatements = ts.isFixablePromiseHandler(funcBody, transformer.checker) ?
                    transformReturnStatementWithFixablePromiseHandler(transformer, ts.factory.createReturnStatement(funcBody), hasContinuation, continuationArgName) :
                    ts.emptyArray;

                if (inlinedStatements.length > 0) {
                    return inlinedStatements;
                }

                if (returnType) {
                    const possiblyAwaitedRightHandSide = getPossiblyAwaitedRightHandSide(transformer.checker, returnType, funcBody);

                    if (!shouldReturn(parent, transformer)) {
                        const transformedStatement = createVariableOrAssignmentOrExpressionStatement(continuationArgName, possiblyAwaitedRightHandSide, /*typeAnnotation*/ undefined);
                        if (continuationArgName) {
                            continuationArgName.types.push(transformer.checker.getAwaitedType(returnType) || returnType);
                        }
                        return transformedStatement;
                    }
                    else {
                        return maybeAnnotateAndReturn(possiblyAwaitedRightHandSide, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent, func, transformer.checker));
                    }
                }
                else {
                    return silentFail();
                }
            }
        }
        default:
            // If no cases apply, we've found a transformation body we don't know how to handle, so the refactoring should no-op to avoid deleting code.
            return silentFail();
    }
    return ts.emptyArray;
}

function getPossiblyAwaitedRightHandSide(checker: ts.TypeChecker, type: ts.Type, expr: ts.Expression): ts.AwaitExpression | ts.Expression {
    const rightHandSide = ts.getSynthesizedDeepClone(expr);
    return !!checker.getPromisedTypeOfPromise(type) ? ts.factory.createAwaitExpression(rightHandSide) : rightHandSide;
}

function getLastCallSignature(type: ts.Type, checker: ts.TypeChecker): ts.Signature | undefined {
    const callSignatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
    return ts.lastOrUndefined(callSignatures);
}

function removeReturns(stmts: readonly ts.Statement[], prevArgName: SynthBindingName | undefined, transformer: Transformer, seenReturnStatement: boolean): readonly ts.Statement[] {
    const ret: ts.Statement[] = [];
    for (const stmt of stmts) {
        if (ts.isReturnStatement(stmt)) {
            if (stmt.expression) {
                const possiblyAwaitedExpression = isPromiseTypedExpression(stmt.expression, transformer.checker) ? ts.factory.createAwaitExpression(stmt.expression) : stmt.expression;
                if (prevArgName === undefined) {
                    ret.push(ts.factory.createExpressionStatement(possiblyAwaitedExpression));
                }
                else if (isSynthIdentifier(prevArgName) && prevArgName.hasBeenDeclared) {
                    ret.push(ts.factory.createExpressionStatement(ts.factory.createAssignment(referenceSynthIdentifier(prevArgName), possiblyAwaitedExpression)));
                }
                else {
                    ret.push(ts.factory.createVariableStatement(/*modifiers*/ undefined,
                        (ts.factory.createVariableDeclarationList([ts.factory.createVariableDeclaration(declareSynthBindingName(prevArgName), /*exclamationToken*/ undefined, /*type*/ undefined, possiblyAwaitedExpression)], ts.NodeFlags.Const))));
                }
            }
        }
        else {
            ret.push(ts.getSynthesizedDeepClone(stmt));
        }
    }

    // if block has no return statement, need to define prevArgName as undefined to prevent undeclared variables
    if (!seenReturnStatement && prevArgName !== undefined) {
        ret.push(ts.factory.createVariableStatement(/*modifiers*/ undefined,
            (ts.factory.createVariableDeclarationList([ts.factory.createVariableDeclaration(declareSynthBindingName(prevArgName), /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createIdentifier("undefined"))], ts.NodeFlags.Const))));
    }

    return ret;
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows the continuation to which this statement belongs.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformReturnStatementWithFixablePromiseHandler(transformer: Transformer, innerRetStmt: ts.ReturnStatement, hasContinuation: boolean, continuationArgName?: SynthBindingName) {
    let innerCbBody: ts.Statement[] = [];
    ts.forEachChild(innerRetStmt, function visit(node) {
        if (ts.isCallExpression(node)) {
            const temp = transformExpression(node, node, transformer, hasContinuation, continuationArgName);
            innerCbBody = innerCbBody.concat(temp);
            if (innerCbBody.length > 0) {
                return;
            }
        }
        else if (!ts.isFunctionLike(node)) {
            ts.forEachChild(node, visit);
        }
    });
    return innerCbBody;
}

function getArgBindingName(funcNode: ts.Expression, transformer: Transformer): SynthBindingName | undefined {
    const types: ts.Type[] = [];
    let name: SynthBindingName | undefined;

    if (ts.isFunctionLikeDeclaration(funcNode)) {
        if (funcNode.parameters.length > 0) {
            const param = funcNode.parameters[0].name;
            name = getMappedBindingNameOrDefault(param);
        }
    }
    else if (ts.isIdentifier(funcNode)) {
        name = getMapEntryOrDefault(funcNode);
    }
    else if (ts.isPropertyAccessExpression(funcNode) && ts.isIdentifier(funcNode.name)) {
        name = getMapEntryOrDefault(funcNode.name);
    }

    // return undefined argName when arg is null or undefined
    // eslint-disable-next-line local/no-in-operator
    if (!name || "identifier" in name && name.identifier.text === "undefined") {
        return undefined;
    }

    return name;

    function getMappedBindingNameOrDefault(bindingName: ts.BindingName): SynthBindingName {
        if (ts.isIdentifier(bindingName)) return getMapEntryOrDefault(bindingName);
        const elements = ts.flatMap(bindingName.elements, element => {
            if (ts.isOmittedExpression(element)) return [];
            return [getMappedBindingNameOrDefault(element.name)];
        });

        return createSynthBindingPattern(bindingName, elements);
    }

    function getMapEntryOrDefault(identifier: ts.Identifier): SynthIdentifier {
        const originalNode = getOriginalNode(identifier);
        const symbol = getSymbol(originalNode);

        if (!symbol) {
            return createSynthIdentifier(identifier, types);
        }

        const mapEntry = transformer.synthNamesMap.get(ts.getSymbolId(symbol).toString());
        return mapEntry || createSynthIdentifier(identifier, types);
    }

    function getSymbol(node: ts.Node): ts.Symbol | undefined {
        return node.symbol ? node.symbol : transformer.checker.getSymbolAtLocation(node);
    }

    function getOriginalNode(node: ts.Node): ts.Node {
        return node.original ? node.original : node;
    }
}

function isEmptyBindingName(bindingName: SynthBindingName | undefined): boolean {
    if (!bindingName) {
        return true;
    }
    if (isSynthIdentifier(bindingName)) {
        return !bindingName.identifier.text;
    }
    return ts.every(bindingName.elements, isEmptyBindingName);
}

function createSynthIdentifier(identifier: ts.Identifier, types: ts.Type[] = []): SynthIdentifier {
    return { kind: SynthBindingNameKind.Identifier, identifier, types, hasBeenDeclared: false, hasBeenReferenced: false };
}

function createSynthBindingPattern(bindingPattern: ts.BindingPattern, elements: readonly SynthBindingName[] = ts.emptyArray, types: ts.Type[] = []): SynthBindingPattern {
    return { kind: SynthBindingNameKind.BindingPattern, bindingPattern, elements, types };
}

function referenceSynthIdentifier(synthId: SynthIdentifier) {
    synthId.hasBeenReferenced = true;
    return synthId.identifier;
}

function declareSynthBindingName(synthName: SynthBindingName) {
    return isSynthIdentifier(synthName) ? declareSynthIdentifier(synthName) : declareSynthBindingPattern(synthName);
}

function declareSynthBindingPattern(synthPattern: SynthBindingPattern) {
    for (const element of synthPattern.elements) {
        declareSynthBindingName(element);
    }
    return synthPattern.bindingPattern;
}

function declareSynthIdentifier(synthId: SynthIdentifier) {
    synthId.hasBeenDeclared = true;
    return synthId.identifier;
}

function isSynthIdentifier(bindingName: SynthBindingName): bindingName is SynthIdentifier {
    return bindingName.kind === SynthBindingNameKind.Identifier;
}

function isSynthBindingPattern(bindingName: SynthBindingName): bindingName is SynthBindingPattern {
    return bindingName.kind === SynthBindingNameKind.BindingPattern;
}

function shouldReturn(expression: ts.Expression, transformer: Transformer): boolean {
    return !!expression.original && transformer.setOfExpressionsToReturn.has(ts.getNodeId(expression.original));
}
