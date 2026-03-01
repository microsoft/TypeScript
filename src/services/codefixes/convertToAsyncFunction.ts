import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    ArrowFunction,
    AwaitExpression,
    BindingName,
    BindingPattern,
    Block,
    CallExpression,
    canBeConvertedToAsync,
    canHaveSymbol,
    CodeFixContext,
    concatenate,
    createMultiMap,
    Debug,
    Diagnostics,
    elementAt,
    emptyArray,
    every,
    Expression,
    factory,
    firstOrUndefined,
    flatMap,
    forEach,
    forEachChild,
    forEachReturnStatement,
    FunctionExpression,
    FunctionLikeDeclaration,
    GeneratedIdentifierFlags,
    getContainingFunction,
    getNodeId,
    getObjectFlags,
    getOriginalNode,
    getSymbolId,
    getSynthesizedDeepClone,
    getSynthesizedDeepCloneWithReplacements,
    getTokenAtPosition,
    hasPropertyAccessExpressionWithName,
    Identifier,
    idText,
    isBindingElement,
    isBlock,
    isCallExpression,
    isExpression,
    isFixablePromiseHandler,
    isFunctionLike,
    isFunctionLikeDeclaration,
    isGeneratedIdentifier,
    isIdentifier,
    isInJSFile,
    isObjectBindingPattern,
    isOmittedExpression,
    isParameter,
    isPropertyAccessExpression,
    isReturnStatement,
    isReturnStatementWithFixablePromiseHandler,
    isVariableDeclaration,
    lastOrUndefined,
    moveRangePastModifiers,
    Node,
    NodeFlags,
    ObjectFlags,
    PropertyAccessExpression,
    returnsPromise,
    ReturnStatement,
    returnTrue,
    Signature,
    SignatureKind,
    skipTrivia,
    SourceFile,
    Statement,
    Symbol,
    SyntaxKind,
    textChanges,
    tryCast,
    TryStatement,
    Type,
    TypeChecker,
    TypeNode,
    TypeReference,
    UnionReduction,
} from "../_namespaces/ts.js";

const fixId = "convertToAsyncFunction";
const errorCodes = [Diagnostics.This_may_be_converted_to_an_async_function.code];
let codeActionSucceeded = true;
registerCodeFix({
    errorCodes,
    getCodeActions(context: CodeFixContext) {
        codeActionSucceeded = true;
        const changes = textChanges.ChangeTracker.with(context, t => convertToAsyncFunction(t, context.sourceFile, context.span.start, context.program.getTypeChecker()));
        return codeActionSucceeded ? [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_async_function, fixId, Diagnostics.Convert_all_to_async_functions)] : [];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncFunction(changes, err.file, err.start, context.program.getTypeChecker())),
});

const enum SynthBindingNameKind {
    Identifier,
    BindingPattern,
}

type SynthBindingName = SynthBindingPattern | SynthIdentifier;

interface SynthBindingPattern {
    readonly kind: SynthBindingNameKind.BindingPattern;
    readonly elements: readonly SynthBindingName[];
    readonly bindingPattern: BindingPattern;
    readonly types: Type[];
}

interface SynthIdentifier {
    readonly kind: SynthBindingNameKind.Identifier;
    readonly identifier: Identifier;
    readonly types: Type[];
    /** A declaration for this identifier has already been generated */
    hasBeenDeclared: boolean;
    hasBeenReferenced: boolean;
}

interface Transformer {
    readonly checker: TypeChecker;
    readonly synthNamesMap: Map<string, SynthIdentifier>; // keys are the symbol id of the identifier
    readonly setOfExpressionsToReturn: ReadonlySet<number>; // keys are the node ids of the expressions
    readonly isInJSFile: boolean;
}

interface PromiseReturningCallExpression<Name extends string> extends CallExpression {
    readonly expression: PropertyAccessExpression & {
        readonly escapedText: Name;
    };
}

function convertToAsyncFunction(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker): void {
    // get the function declaration - returns a promise
    const tokenAtPosition = getTokenAtPosition(sourceFile, position);
    let functionToConvert: FunctionLikeDeclaration | undefined;

    // if the parent of a FunctionLikeDeclaration is a variable declaration, the convertToAsync diagnostic will be reported on the variable name
    if (
        isIdentifier(tokenAtPosition) && isVariableDeclaration(tokenAtPosition.parent) &&
        tokenAtPosition.parent.initializer && isFunctionLikeDeclaration(tokenAtPosition.parent.initializer)
    ) {
        functionToConvert = tokenAtPosition.parent.initializer;
    }
    else {
        functionToConvert = tryCast(getContainingFunction(getTokenAtPosition(sourceFile, position)), canBeConvertedToAsync);
    }

    if (!functionToConvert) {
        return;
    }

    const synthNamesMap = new Map<string, SynthIdentifier>();
    const isInJavascript = isInJSFile(functionToConvert);
    const setOfExpressionsToReturn = getAllPromiseExpressionsToReturn(functionToConvert, checker);
    const functionToConvertRenamed = renameCollidingVarNames(functionToConvert, checker, synthNamesMap);
    if (!returnsPromise(functionToConvertRenamed, checker)) {
        return;
    }

    const returnStatements = functionToConvertRenamed.body && isBlock(functionToConvertRenamed.body) ? getReturnStatementsWithPromiseHandlers(functionToConvertRenamed.body, checker) : emptyArray;
    const transformer: Transformer = { checker, synthNamesMap, setOfExpressionsToReturn, isInJSFile: isInJavascript };
    if (!returnStatements.length) {
        return;
    }

    const pos = skipTrivia(sourceFile.text, moveRangePastModifiers(functionToConvert).pos);
    changes.insertModifierAt(sourceFile, pos, SyntaxKind.AsyncKeyword, { suffix: " " });

    for (const returnStatement of returnStatements) {
        forEachChild(returnStatement, function visit(node) {
            if (isCallExpression(node)) {
                const newNodes = transformExpression(node, node, transformer, /*hasContinuation*/ false);
                if (hasFailed()) {
                    return true; // return something truthy to shortcut out of more work
                }
                changes.replaceNodeWithNodes(sourceFile, returnStatement, newNodes);
            }
            else if (!isFunctionLike(node)) {
                forEachChild(node, visit);
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

function getReturnStatementsWithPromiseHandlers(body: Block, checker: TypeChecker): readonly ReturnStatement[] {
    const res: ReturnStatement[] = [];
    forEachReturnStatement(body, ret => {
        if (isReturnStatementWithFixablePromiseHandler(ret, checker)) res.push(ret);
    });
    return res;
}

/*
    Finds all of the expressions of promise type that should not be saved in a variable during the refactor
*/
function getAllPromiseExpressionsToReturn(func: FunctionLikeDeclaration, checker: TypeChecker): Set<number> {
    if (!func.body) {
        return new Set();
    }

    const setOfExpressionsToReturn = new Set<number>();
    forEachChild(func.body, function visit(node: Node) {
        if (isPromiseReturningCallExpression(node, checker, "then")) {
            setOfExpressionsToReturn.add(getNodeId(node));
            forEach(node.arguments, visit);
        }
        else if (
            isPromiseReturningCallExpression(node, checker, "catch") ||
            isPromiseReturningCallExpression(node, checker, "finally")
        ) {
            setOfExpressionsToReturn.add(getNodeId(node));
            // if .catch() or .finally() is the last call in the chain, move leftward in the chain until we hit something else that should be returned
            forEachChild(node, visit);
        }
        else if (isPromiseTypedExpression(node, checker)) {
            setOfExpressionsToReturn.add(getNodeId(node));
            // don't recurse here, since we won't refactor any children or arguments of the expression
        }
        else {
            forEachChild(node, visit);
        }
    });

    return setOfExpressionsToReturn;
}

function isPromiseReturningCallExpression<Name extends string>(node: Node, checker: TypeChecker, name: Name): node is PromiseReturningCallExpression<Name> {
    if (!isCallExpression(node)) return false;
    const isExpressionOfName = hasPropertyAccessExpressionWithName(node, name);
    const nodeType = isExpressionOfName && checker.getTypeAtLocation(node);
    return !!(nodeType && checker.getPromisedTypeOfPromise(nodeType));
}

// NOTE: this is a mostly copy of `isReferenceToType` from checker.ts. While this violates DRY, it keeps
// `isReferenceToType` in checker local to the checker to avoid the cost of a property lookup on `ts`.
function isReferenceToType(type: Type, target: Type) {
    return (getObjectFlags(type) & ObjectFlags.Reference) !== 0
        && (type as TypeReference).target === target;
}

function getExplicitPromisedTypeOfPromiseReturningCallExpression(node: PromiseReturningCallExpression<"then" | "catch" | "finally">, callback: Expression, checker: TypeChecker) {
    if (node.expression.name.escapedText === "finally") {
        // for a `finally`, there's no type argument
        return undefined;
    }

    // If the call to `then` or `catch` comes from the global `Promise` or `PromiseLike` type, we can safely use the
    // type argument supplied for the callback. For other promise types we would need a more complex heuristic to determine
    // which type argument is safe to use as an annotation.
    const promiseType = checker.getTypeAtLocation(node.expression.expression);
    if (
        isReferenceToType(promiseType, checker.getPromiseType()) ||
        isReferenceToType(promiseType, checker.getPromiseLikeType())
    ) {
        if (node.expression.name.escapedText === "then") {
            if (callback === elementAt(node.arguments, 0)) {
                // for the `onfulfilled` callback, use the first type argument
                return elementAt(node.typeArguments, 0);
            }
            else if (callback === elementAt(node.arguments, 1)) {
                // for the `onrejected` callback, use the second type argument
                return elementAt(node.typeArguments, 1);
            }
        }
        else {
            return elementAt(node.typeArguments, 0);
        }
    }
}

function isPromiseTypedExpression(node: Node, checker: TypeChecker): node is Expression {
    if (!isExpression(node)) return false;
    return !!checker.getPromisedTypeOfPromise(checker.getTypeAtLocation(node));
}

/*
    Renaming of identifiers may be necessary as the refactor changes scopes -
    This function collects all existing identifier names and names of identifiers that will be created in the refactor.
    It then checks for any collisions and renames them through getSynthesizedDeepClone
*/
function renameCollidingVarNames(nodeToRename: FunctionLikeDeclaration, checker: TypeChecker, synthNamesMap: Map<string, SynthIdentifier>): FunctionLikeDeclaration {
    const identsToRenameMap = new Map<string, Identifier>(); // key is the symbol id
    const collidingSymbolMap = createMultiMap<string, Symbol>();
    forEachChild(nodeToRename, function visit(node: Node) {
        if (!isIdentifier(node)) {
            forEachChild(node, visit);
            return;
        }
        const symbol = checker.getSymbolAtLocation(node);
        if (symbol) {
            const type = checker.getTypeAtLocation(node);
            // Note - the choice of the last call signature is arbitrary
            const lastCallSignature = getLastCallSignature(type, checker);
            const symbolIdString = getSymbolId(symbol).toString();

            // If the identifier refers to a function, we want to add the new synthesized variable for the declaration. Example:
            //   fetch('...').then(response => { ... })
            // will eventually become
            //   const response = await fetch('...')
            // so we push an entry for 'response'.
            if (lastCallSignature && !isParameter(node.parent) && !isFunctionLikeDeclaration(node.parent) && !synthNamesMap.has(symbolIdString)) {
                const firstParameter = firstOrUndefined(lastCallSignature.parameters);
                const ident = firstParameter?.valueDeclaration
                        && isParameter(firstParameter.valueDeclaration)
                        && tryCast(firstParameter.valueDeclaration.name, isIdentifier)
                    || factory.createUniqueName("result", GeneratedIdentifierFlags.Optimistic);
                const synthName = getNewNameIfConflict(ident, collidingSymbolMap);
                synthNamesMap.set(symbolIdString, synthName);
                collidingSymbolMap.add(ident.text, symbol);
            }
            // We only care about identifiers that are parameters, variable declarations, or binding elements
            else if (node.parent && (isParameter(node.parent) || isVariableDeclaration(node.parent) || isBindingElement(node.parent))) {
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
                    const identifier = getSynthesizedDeepClone(node);
                    synthNamesMap.set(symbolIdString, createSynthIdentifier(identifier));
                    collidingSymbolMap.add(originalName, symbol);
                }
            }
        }
    });

    return getSynthesizedDeepCloneWithReplacements(nodeToRename, /*includeTrivia*/ true, original => {
        if (isBindingElement(original) && isIdentifier(original.name) && isObjectBindingPattern(original.parent)) {
            const symbol = checker.getSymbolAtLocation(original.name);
            const renameInfo = symbol && identsToRenameMap.get(String(getSymbolId(symbol)));
            if (renameInfo && renameInfo.text !== (original.name || original.propertyName).getText()) {
                return factory.createBindingElement(
                    original.dotDotDotToken,
                    original.propertyName || original.name,
                    renameInfo,
                    original.initializer,
                );
            }
        }
        else if (isIdentifier(original)) {
            const symbol = checker.getSymbolAtLocation(original);
            const renameInfo = symbol && identsToRenameMap.get(String(getSymbolId(symbol)));
            if (renameInfo) {
                return factory.createIdentifier(renameInfo.text);
            }
        }
    });
}

function getNewNameIfConflict(name: Identifier, originalNames: ReadonlyMap<string, Symbol[]>): SynthIdentifier {
    const numVarsSameName = (originalNames.get(name.text) || emptyArray).length;
    const identifier = numVarsSameName === 0 ? name : factory.createIdentifier(name.text + "_" + numVarsSameName);
    return createSynthIdentifier(identifier);
}

function hasFailed() {
    return !codeActionSucceeded;
}

function silentFail() {
    codeActionSucceeded = false;
    return emptyArray;
}

// dispatch function to recursively build the refactoring
// should be kept up to date with isFixablePromiseHandler in suggestionDiagnostics.ts
/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows the continuation to which this expression belongs.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformExpression(returnContextNode: Expression, node: Expression, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly Statement[] {
    if (isPromiseReturningCallExpression(node, transformer.checker, "then")) {
        return transformThen(node, elementAt(node.arguments, 0), elementAt(node.arguments, 1), transformer, hasContinuation, continuationArgName);
    }
    if (isPromiseReturningCallExpression(node, transformer.checker, "catch")) {
        return transformCatch(node, elementAt(node.arguments, 0), transformer, hasContinuation, continuationArgName);
    }
    if (isPromiseReturningCallExpression(node, transformer.checker, "finally")) {
        return transformFinally(node, elementAt(node.arguments, 0), transformer, hasContinuation, continuationArgName);
    }
    if (isPropertyAccessExpression(node)) {
        return transformExpression(returnContextNode, node.expression, transformer, hasContinuation, continuationArgName);
    }

    const nodeType = transformer.checker.getTypeAtLocation(node);
    if (nodeType && transformer.checker.getPromisedTypeOfPromise(nodeType)) {
        Debug.assertNode(getOriginalNode(node).parent, isPropertyAccessExpression);
        return transformPromiseExpressionOfPropertyAccess(returnContextNode, node, transformer, hasContinuation, continuationArgName);
    }

    return silentFail();
}

function isNullOrUndefined({ checker }: Transformer, node: Expression) {
    if (node.kind === SyntaxKind.NullKeyword) return true;
    if (isIdentifier(node) && !isGeneratedIdentifier(node) && idText(node) === "undefined") {
        const symbol = checker.getSymbolAtLocation(node);
        return !symbol || checker.isUndefinedSymbol(symbol);
    }
    return false;
}

function createUniqueSynthName(prevArgName: SynthIdentifier): SynthIdentifier {
    const renamedPrevArg = factory.createUniqueName(prevArgName.identifier.text, GeneratedIdentifierFlags.Optimistic);
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
            possibleNameForVarDecl = createSynthIdentifier(factory.createUniqueName("result", GeneratedIdentifierFlags.Optimistic), continuationArgName.types);
        }

        // We are about to write a 'let' variable declaration, but `transformExpression` for both
        // the try block and catch/finally block will assign to this name. Setting this flag indicates
        // that future assignments should be written as `name = value` instead of `const name = value`.
        declareSynthIdentifier(possibleNameForVarDecl);
    }

    return possibleNameForVarDecl;
}

function finishCatchOrFinallyTransform(node: PromiseReturningCallExpression<"then" | "catch" | "finally">, transformer: Transformer, tryStatement: TryStatement, possibleNameForVarDecl: SynthIdentifier | undefined, continuationArgName?: SynthBindingName) {
    const statements: Statement[] = [];

    // In order to avoid an implicit any, we will synthesize a type for the declaration using the unions of the types of both paths (try block and catch block)
    let varDeclIdentifier: Identifier | undefined;

    if (possibleNameForVarDecl && !shouldReturn(node, transformer)) {
        varDeclIdentifier = getSynthesizedDeepClone(declareSynthIdentifier(possibleNameForVarDecl));
        const typeArray: Type[] = possibleNameForVarDecl.types;
        const unionType = transformer.checker.getUnionType(typeArray, UnionReduction.Subtype);
        const unionTypeNode = transformer.isInJSFile ? undefined : transformer.checker.typeToTypeNode(unionType, /*enclosingDeclaration*/ undefined, /*flags*/ undefined);
        const varDecl = [factory.createVariableDeclaration(varDeclIdentifier, /*exclamationToken*/ undefined, unionTypeNode)];
        const varDeclList = factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList(varDecl, NodeFlags.Let));
        statements.push(varDeclList);
    }

    statements.push(tryStatement);

    if (continuationArgName && varDeclIdentifier && isSynthBindingPattern(continuationArgName)) {
        statements.push(factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    getSynthesizedDeepClone(declareSynthBindingPattern(continuationArgName)),
                    /*exclamationToken*/ undefined,
                    /*type*/ undefined,
                    varDeclIdentifier,
                ),
            ], NodeFlags.Const),
        ));
    }

    return statements;
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows this continuation.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformFinally(node: PromiseReturningCallExpression<"finally">, onFinally: Expression | undefined, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly Statement[] {
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
    const inlinedCallback = transformCallbackArgument(onFinally, hasContinuation, /*continuationArgName*/ undefined, /*inputArgName*/ undefined, node, transformer);
    if (hasFailed()) return silentFail(); // shortcut out of more work

    const tryBlock = factory.createBlock(inlinedLeftHandSide);
    const finallyBlock = factory.createBlock(inlinedCallback);
    const tryStatement = factory.createTryStatement(tryBlock, /*catchClause*/ undefined, finallyBlock);
    return finishCatchOrFinallyTransform(node, transformer, tryStatement, possibleNameForVarDecl, continuationArgName);
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows this continuation.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformCatch(node: PromiseReturningCallExpression<"then" | "catch">, onRejected: Expression | undefined, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly Statement[] {
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

    const tryBlock = factory.createBlock(inlinedLeftHandSide);
    const catchClause = factory.createCatchClause(inputArgName && getSynthesizedDeepClone(declareSynthBindingName(inputArgName)), factory.createBlock(inlinedCallback));
    const tryStatement = factory.createTryStatement(tryBlock, catchClause, /*finallyBlock*/ undefined);
    return finishCatchOrFinallyTransform(node, transformer, tryStatement, possibleNameForVarDecl, continuationArgName);
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows this continuation.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformThen(node: PromiseReturningCallExpression<"then">, onFulfilled: Expression | undefined, onRejected: Expression | undefined, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly Statement[] {
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

    return concatenate(inlinedLeftHandSide, inlinedCallback);
}

/**
 * Transforms the 'x' part of `x.then(...)`, or the 'y()' part of `y().catch(...)`, where 'x' and 'y()' are Promises.
 */
function transformPromiseExpressionOfPropertyAccess(returnContextNode: Expression, node: Expression, transformer: Transformer, hasContinuation: boolean, continuationArgName?: SynthBindingName): readonly Statement[] {
    if (shouldReturn(returnContextNode, transformer)) {
        let returnValue = getSynthesizedDeepClone(node);
        if (hasContinuation) {
            returnValue = factory.createAwaitExpression(returnValue);
        }
        return [factory.createReturnStatement(returnValue)];
    }

    return createVariableOrAssignmentOrExpressionStatement(continuationArgName, factory.createAwaitExpression(node), /*typeAnnotation*/ undefined);
}

function createVariableOrAssignmentOrExpressionStatement(variableName: SynthBindingName | undefined, rightHandSide: Expression, typeAnnotation: TypeNode | undefined): readonly Statement[] {
    if (!variableName || isEmptyBindingName(variableName)) {
        // if there's no argName to assign to, there still might be side effects
        return [factory.createExpressionStatement(rightHandSide)];
    }

    if (isSynthIdentifier(variableName) && variableName.hasBeenDeclared) {
        // if the variable has already been declared, we don't need "let" or "const"
        return [factory.createExpressionStatement(factory.createAssignment(getSynthesizedDeepClone(referenceSynthIdentifier(variableName)), rightHandSide))];
    }

    return [
        factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    getSynthesizedDeepClone(declareSynthBindingName(variableName)),
                    /*exclamationToken*/ undefined,
                    typeAnnotation,
                    rightHandSide,
                ),
            ], NodeFlags.Const),
        ),
    ];
}

function maybeAnnotateAndReturn(expressionToReturn: Expression | undefined, typeAnnotation: TypeNode | undefined): Statement[] {
    if (typeAnnotation && expressionToReturn) {
        const name = factory.createUniqueName("result", GeneratedIdentifierFlags.Optimistic);
        return [
            ...createVariableOrAssignmentOrExpressionStatement(createSynthIdentifier(name), expressionToReturn, typeAnnotation),
            factory.createReturnStatement(name),
        ];
    }
    return [factory.createReturnStatement(expressionToReturn)];
}

// should be kept up to date with isFixablePromiseArgument in suggestionDiagnostics.ts
/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows the continuation to which this callback belongs.
 * @param continuationArgName The argument name for the continuation that follows this call.
 * @param inputArgName The argument name provided to this call
 */
function transformCallbackArgument(func: Expression, hasContinuation: boolean, continuationArgName: SynthBindingName | undefined, inputArgName: SynthBindingName | undefined, parent: PromiseReturningCallExpression<"then" | "catch" | "finally">, transformer: Transformer): readonly Statement[] {
    switch (func.kind) {
        case SyntaxKind.NullKeyword:
            // do not produce a transformed statement for a null argument
            break;
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.Identifier: // identifier includes undefined
            if (!inputArgName) {
                // undefined was argument passed to promise handler
                break;
            }

            const synthCall = factory.createCallExpression(getSynthesizedDeepClone(func as Identifier | PropertyAccessExpression), /*typeArguments*/ undefined, isSynthIdentifier(inputArgName) ? [referenceSynthIdentifier(inputArgName)] : []);

            if (shouldReturn(parent, transformer)) {
                return maybeAnnotateAndReturn(synthCall, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent, func, transformer.checker));
            }

            const type = transformer.checker.getTypeAtLocation(func);
            const callSignatures = transformer.checker.getSignaturesOfType(type, SignatureKind.Call);
            if (!callSignatures.length) {
                // if identifier in handler has no call signatures, it's invalid
                return silentFail();
            }
            const returnType = callSignatures[0].getReturnType();
            const varDeclOrAssignment = createVariableOrAssignmentOrExpressionStatement(continuationArgName, factory.createAwaitExpression(synthCall), getExplicitPromisedTypeOfPromiseReturningCallExpression(parent, func, transformer.checker));
            if (continuationArgName) {
                continuationArgName.types.push(transformer.checker.getAwaitedType(returnType) || returnType);
            }
            return varDeclOrAssignment;

        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction: {
            const funcBody = (func as FunctionExpression | ArrowFunction).body;
            const returnType = getLastCallSignature(transformer.checker.getTypeAtLocation(func), transformer.checker)?.getReturnType();

            // Arrow functions with block bodies { } will enter this control flow
            if (isBlock(funcBody)) {
                let refactoredStmts: Statement[] = [];
                let seenReturnStatement = false;
                for (const statement of funcBody.statements) {
                    if (isReturnStatement(statement)) {
                        seenReturnStatement = true;
                        if (isReturnStatementWithFixablePromiseHandler(statement, transformer.checker)) {
                            refactoredStmts = refactoredStmts.concat(transformReturnStatementWithFixablePromiseHandler(transformer, statement, hasContinuation, continuationArgName));
                        }
                        else {
                            const possiblyAwaitedRightHandSide = returnType && statement.expression ? getPossiblyAwaitedRightHandSide(transformer.checker, returnType, statement.expression) : statement.expression;
                            refactoredStmts.push(...maybeAnnotateAndReturn(possiblyAwaitedRightHandSide, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent, func, transformer.checker)));
                        }
                    }
                    else if (hasContinuation && forEachReturnStatement(statement, returnTrue)) {
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
                        // --------------------------------------|---------------------------------------
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
                    ? refactoredStmts.map(s => getSynthesizedDeepClone(s))
                    : removeReturns(
                        refactoredStmts,
                        continuationArgName,
                        transformer,
                        seenReturnStatement,
                    );
            }
            else {
                const inlinedStatements = isFixablePromiseHandler(funcBody, transformer.checker) ?
                    transformReturnStatementWithFixablePromiseHandler(transformer, factory.createReturnStatement(funcBody), hasContinuation, continuationArgName) :
                    emptyArray;

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
    return emptyArray;
}

function getPossiblyAwaitedRightHandSide(checker: TypeChecker, type: Type, expr: Expression): AwaitExpression | Expression {
    const rightHandSide = getSynthesizedDeepClone(expr);
    return !!checker.getPromisedTypeOfPromise(type) ? factory.createAwaitExpression(rightHandSide) : rightHandSide;
}

function getLastCallSignature(type: Type, checker: TypeChecker): Signature | undefined {
    const callSignatures = checker.getSignaturesOfType(type, SignatureKind.Call);
    return lastOrUndefined(callSignatures);
}

function removeReturns(stmts: readonly Statement[], prevArgName: SynthBindingName | undefined, transformer: Transformer, seenReturnStatement: boolean): readonly Statement[] {
    const ret: Statement[] = [];
    for (const stmt of stmts) {
        if (isReturnStatement(stmt)) {
            if (stmt.expression) {
                const possiblyAwaitedExpression = isPromiseTypedExpression(stmt.expression, transformer.checker) ? factory.createAwaitExpression(stmt.expression) : stmt.expression;
                if (prevArgName === undefined) {
                    ret.push(factory.createExpressionStatement(possiblyAwaitedExpression));
                }
                else if (isSynthIdentifier(prevArgName) && prevArgName.hasBeenDeclared) {
                    ret.push(factory.createExpressionStatement(factory.createAssignment(referenceSynthIdentifier(prevArgName), possiblyAwaitedExpression)));
                }
                else {
                    ret.push(factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(declareSynthBindingName(prevArgName), /*exclamationToken*/ undefined, /*type*/ undefined, possiblyAwaitedExpression)], NodeFlags.Const)));
                }
            }
        }
        else {
            ret.push(getSynthesizedDeepClone(stmt));
        }
    }

    // if block has no return statement, need to define prevArgName as undefined to prevent undeclared variables
    if (!seenReturnStatement && prevArgName !== undefined) {
        ret.push(factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(declareSynthBindingName(prevArgName), /*exclamationToken*/ undefined, /*type*/ undefined, factory.createIdentifier("undefined"))], NodeFlags.Const)));
    }

    return ret;
}

/**
 * @param hasContinuation Whether another `then`, `catch`, or `finally` continuation follows the continuation to which this statement belongs.
 * @param continuationArgName The argument name for the continuation that follows this call.
 */
function transformReturnStatementWithFixablePromiseHandler(transformer: Transformer, innerRetStmt: ReturnStatement, hasContinuation: boolean, continuationArgName?: SynthBindingName) {
    let innerCbBody: Statement[] = [];
    forEachChild(innerRetStmt, function visit(node) {
        if (isCallExpression(node)) {
            const temp = transformExpression(node, node, transformer, hasContinuation, continuationArgName);
            innerCbBody = innerCbBody.concat(temp);
            if (innerCbBody.length > 0) {
                return;
            }
        }
        else if (!isFunctionLike(node)) {
            forEachChild(node, visit);
        }
    });
    return innerCbBody;
}

function getArgBindingName(funcNode: Expression, transformer: Transformer): SynthBindingName | undefined {
    const types: Type[] = [];
    let name: SynthBindingName | undefined;

    if (isFunctionLikeDeclaration(funcNode)) {
        if (funcNode.parameters.length > 0) {
            const param = funcNode.parameters[0].name;
            name = getMappedBindingNameOrDefault(param);
        }
    }
    else if (isIdentifier(funcNode)) {
        name = getMapEntryOrDefault(funcNode);
    }
    else if (isPropertyAccessExpression(funcNode) && isIdentifier(funcNode.name)) {
        name = getMapEntryOrDefault(funcNode.name);
    }

    // return undefined argName when arg is null or undefined
    // eslint-disable-next-line local/no-in-operator
    if (!name || "identifier" in name && name.identifier.text === "undefined") {
        return undefined;
    }

    return name;

    function getMappedBindingNameOrDefault(bindingName: BindingName): SynthBindingName {
        if (isIdentifier(bindingName)) return getMapEntryOrDefault(bindingName);
        const elements = flatMap(bindingName.elements, element => {
            if (isOmittedExpression(element)) return [];
            return [getMappedBindingNameOrDefault(element.name)];
        });

        return createSynthBindingPattern(bindingName, elements);
    }

    function getMapEntryOrDefault(identifier: Identifier): SynthIdentifier {
        const originalNode = getOriginalNode(identifier);
        const symbol = getSymbol(originalNode);

        if (!symbol) {
            return createSynthIdentifier(identifier, types);
        }

        const mapEntry = transformer.synthNamesMap.get(getSymbolId(symbol).toString());
        return mapEntry || createSynthIdentifier(identifier, types);
    }

    function getSymbol(node: Node): Symbol | undefined {
        return tryCast(node, canHaveSymbol)?.symbol ?? transformer.checker.getSymbolAtLocation(node);
    }

    function getOriginalNode(node: Node): Node {
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
    return every(bindingName.elements, isEmptyBindingName);
}

function createSynthIdentifier(identifier: Identifier, types: Type[] = []): SynthIdentifier {
    return { kind: SynthBindingNameKind.Identifier, identifier, types, hasBeenDeclared: false, hasBeenReferenced: false };
}

function createSynthBindingPattern(bindingPattern: BindingPattern, elements: readonly SynthBindingName[] = emptyArray, types: Type[] = []): SynthBindingPattern {
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

function shouldReturn(expression: Expression, transformer: Transformer): boolean {
    return !!expression.original && transformer.setOfExpressionsToReturn.has(getNodeId(expression.original));
}
