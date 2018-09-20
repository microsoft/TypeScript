/* @internal */
namespace ts.codefix {
    const fixId = "convertToAsyncFunction";
    const errorCodes = [Diagnostics.This_may_be_converted_to_an_async_function.code];
    let codeActionSucceeded = true;
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            codeActionSucceeded = true;
            const changes = textChanges.ChangeTracker.with(context, (t) => convertToAsyncFunction(t, context.sourceFile, context.span.start, context.program.getTypeChecker(), context));
            return codeActionSucceeded ? [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_async_function, fixId, Diagnostics.Convert_all_to_async_functions)] : [];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncFunction(changes, err.file, err.start, context.program.getTypeChecker(), context)),
    });

    interface SynthIdentifier {
        readonly identifier: Identifier;
        readonly types: Type[];
        numberOfAssignmentsOriginal: number; // number of times the variable should be assigned in the refactor
    }

    interface SymbolAndIdentifier {
        readonly identifier: Identifier;
        readonly symbol: Symbol;
    }

    interface Transformer {
        readonly checker: TypeChecker;
        readonly synthNamesMap: Map<SynthIdentifier>; // keys are the symbol id of the identifier
        readonly allVarNames: ReadonlyArray<SymbolAndIdentifier>;
        readonly setOfExpressionsToReturn: ReadonlyMap<true>; // keys are the node ids of the expressions
        readonly constIdentifiers: Identifier[];
        readonly originalTypeMap: ReadonlyMap<Type>; // keys are the node id of the identifier
        readonly isInJSFile: boolean;
    }

    function convertToAsyncFunction(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker, context: CodeFixContextBase): void {
        // get the function declaration - returns a promise
        const tokenAtPosition = getTokenAtPosition(sourceFile, position);
        let functionToConvert: FunctionLikeDeclaration | undefined;

        // if the parent of a FunctionLikeDeclaration is a variable declaration, the convertToAsync diagnostic will be reported on the variable name
        if (isIdentifier(tokenAtPosition) && isVariableDeclaration(tokenAtPosition.parent) &&
            tokenAtPosition.parent.initializer && isFunctionLikeDeclaration(tokenAtPosition.parent.initializer)) {
            functionToConvert = tokenAtPosition.parent.initializer;
        }
        else {
            functionToConvert = tryCast(getContainingFunction(getTokenAtPosition(sourceFile, position)), isFunctionLikeDeclaration);
        }

        if (!functionToConvert) {
            return;
        }

        const synthNamesMap: Map<SynthIdentifier> = createMap();
        const originalTypeMap: Map<Type> = createMap();
        const allVarNames: SymbolAndIdentifier[] = [];
        const isInJavascript = isInJSFile(functionToConvert);
        const setOfExpressionsToReturn = getAllPromiseExpressionsToReturn(functionToConvert, checker);
        const functionToConvertRenamed: FunctionLikeDeclaration = renameCollidingVarNames(functionToConvert, checker, synthNamesMap, context, setOfExpressionsToReturn, originalTypeMap, allVarNames);
        const constIdentifiers = getConstIdentifiers(synthNamesMap);
        const returnStatements = getReturnStatementsWithPromiseHandlers(functionToConvertRenamed);
        const transformer: Transformer = { checker, synthNamesMap, allVarNames, setOfExpressionsToReturn, constIdentifiers, originalTypeMap, isInJSFile: isInJavascript };

        if (!returnStatements.length) {
            return;
        }

        // add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, functionToConvert);

        function startTransformation(node: CallExpression, nodeToReplace: Node) {
            const newNodes = transformExpression(node, transformer, node);
            changes.replaceNodeWithNodes(sourceFile, nodeToReplace, newNodes);
        }

        for (const statement of returnStatements) {
            forEachChild(statement, function visit(node) {
                if (isCallExpression(node)) {
                    startTransformation(node, statement);
                }
                else if (!isFunctionLike(node)) {
                    forEachChild(node, visit);
                }
            });
        }
    }

    // Returns the identifiers that are never reassigned in the refactor
    function getConstIdentifiers(synthNamesMap: ReadonlyMap<SynthIdentifier>): Identifier[] {
        const constIdentifiers: Identifier[] = [];
        synthNamesMap.forEach((val) => {
            if (val.numberOfAssignmentsOriginal === 0) {
                constIdentifiers.push(val.identifier);
            }
        });
        return constIdentifiers;
    }


    /*
        Finds all of the expressions of promise type that should not be saved in a variable during the refactor
    */
    function getAllPromiseExpressionsToReturn(func: FunctionLikeDeclaration, checker: TypeChecker): Map<true> {
        if (!func.body) {
            return createMap<true>();
        }

        const setOfExpressionsToReturn: Map<true> = createMap<true>();

        forEachChild(func.body, function visit(node: Node) {
            if (isPromiseReturningExpression(node, checker, "then")) {
                setOfExpressionsToReturn.set(getNodeId(node).toString(), true);
                forEach((<CallExpression>node).arguments, visit);
            }
            else if (isPromiseReturningExpression(node, checker, "catch")) {
                setOfExpressionsToReturn.set(getNodeId(node).toString(), true);
                // if .catch() is the last call in the chain, move leftward in the chain until we hit something else that should be returned
                forEachChild(node, visit);
            }
            else if (isPromiseReturningExpression(node, checker)) {
                setOfExpressionsToReturn.set(getNodeId(node).toString(), true);
                // don't recurse here, since we won't refactor any children or arguments of the expression
            }
            else {
                forEachChild(node, visit);
            }
        });

        return setOfExpressionsToReturn;
    }


    /*
        Returns true if node is a promise returning expression
        If name is not undefined, node is a promise returning call of name
    */
    function isPromiseReturningExpression(node: Node, checker: TypeChecker, name?: string): boolean {
        const isNodeExpression = name ? isCallExpression(node) : isExpression(node);
        const isExpressionOfName = isNodeExpression && (!name || hasPropertyAccessExpressionWithName(node as CallExpression, name));
        const nodeType = isExpressionOfName && checker.getTypeAtLocation(node);
        return !!(nodeType && checker.getPromisedTypeOfPromise(nodeType));
    }

    function declaredInFile(symbol: Symbol, sourceFile: SourceFile): boolean {
        return symbol.valueDeclaration && symbol.valueDeclaration.getSourceFile() === sourceFile;
    }

    /*
        Renaming of identifiers may be neccesary as the refactor changes scopes -
        This function collects all existing identifier names and names of identifiers that will be created in the refactor.
        It then checks for any collisions and renames them through getSynthesizedDeepClone
    */
    function renameCollidingVarNames(nodeToRename: FunctionLikeDeclaration, checker: TypeChecker, synthNamesMap: Map<SynthIdentifier>, context: CodeFixContextBase, setOfAllExpressionsToReturn: Map<true>, originalType: Map<Type>, allVarNames: SymbolAndIdentifier[]): FunctionLikeDeclaration {

        const identsToRenameMap: Map<Identifier> = createMap(); // key is the symbol id
        const collidingSymbolMap: Map<Symbol[]> = createMap();
        forEachChild(nodeToRename, function visit(node: Node) {
            if (!isIdentifier(node)) {
                forEachChild(node, visit);
                return;
            }

            const symbol = checker.getSymbolAtLocation(node);
            const isDefinedInFile = symbol && declaredInFile(symbol, context.sourceFile);

            if (symbol && isDefinedInFile) {
                const type = checker.getTypeAtLocation(node);
                const lastCallSignature = getLastCallSignature(type, checker);
                const symbolIdString = getSymbolId(symbol).toString();

                // if the identifier refers to a function we want to add the new synthesized variable for the declaration (ex. blob in let blob = res(arg))
                // Note - the choice of the last call signature is arbitrary
                if (lastCallSignature && !isFunctionLikeDeclaration(node.parent) && !synthNamesMap.has(symbolIdString)) {
                    const firstParameter = firstOrUndefined(lastCallSignature.parameters);
                    const ident = firstParameter && isParameter(firstParameter.valueDeclaration) && tryCast(firstParameter.valueDeclaration.name, isIdentifier) || createOptimisticUniqueName("result");
                    const synthName = getNewNameIfConflict(ident, collidingSymbolMap);
                    synthNamesMap.set(symbolIdString, synthName);
                    allVarNames.push({ identifier: synthName.identifier, symbol });
                    addNameToFrequencyMap(collidingSymbolMap, ident.text, symbol);
                }
                // we only care about identifiers that are parameters and declarations (don't care about other uses)
                else if (node.parent && (isParameter(node.parent) || isVariableDeclaration(node.parent))) {
                    const originalName = node.text;
                    const collidingSymbols = collidingSymbolMap.get(originalName);

                    // if the identifier name conflicts with a different identifier that we've already seen
                    if (collidingSymbols && collidingSymbols.some(prevSymbol => prevSymbol !== symbol)) {
                        const newName = getNewNameIfConflict(node, collidingSymbolMap);
                        identsToRenameMap.set(symbolIdString, newName.identifier);
                        synthNamesMap.set(symbolIdString, newName);
                        allVarNames.push({ identifier: newName.identifier, symbol });
                        addNameToFrequencyMap(collidingSymbolMap, originalName, symbol);
                    }
                    else {
                        const identifier = getSynthesizedDeepClone(node);
                        identsToRenameMap.set(symbolIdString, identifier);
                        synthNamesMap.set(symbolIdString, { identifier, types: [], numberOfAssignmentsOriginal: allVarNames.filter(elem => elem.identifier.text === node.text).length/*, numberOfAssignmentsSynthesized: 0*/ });
                        if ((isParameter(node.parent) && isExpressionOrCallOnTypePromise(node.parent.parent)) || isVariableDeclaration(node.parent)) {
                            allVarNames.push({ identifier, symbol });
                            addNameToFrequencyMap(collidingSymbolMap, originalName, symbol);
                        }
                    }
                }
            }
        });

        return getSynthesizedDeepCloneWithRenames(nodeToRename, /*includeTrivia*/ true, identsToRenameMap, checker, deepCloneCallback);

        function isExpressionOrCallOnTypePromise(child: Node): boolean {
            const node = child.parent;
            if (isCallExpression(node) || isIdentifier(node) && !setOfAllExpressionsToReturn.get(getNodeId(node).toString())) {
                const nodeType = checker.getTypeAtLocation(node);
                const isPromise = nodeType && checker.getPromisedTypeOfPromise(nodeType);
                return !!isPromise;
            }

            return false;
        }

        function deepCloneCallback(node: Node, clone: Node) {
            if (isIdentifier(node)) {
                const symbol = checker.getSymbolAtLocation(node);
                const symboldIdString = symbol && getSymbolId(symbol).toString();
                const renameInfo = symbol && synthNamesMap.get(symboldIdString!);

                if (renameInfo) {
                    const type = checker.getTypeAtLocation(node);
                    originalType.set(getNodeId(clone).toString(), type);
                }
            }

            const val = setOfAllExpressionsToReturn.get(getNodeId(node).toString());
            if (val !== undefined) {
                setOfAllExpressionsToReturn.delete(getNodeId(node).toString());
                setOfAllExpressionsToReturn.set(getNodeId(clone).toString(), val);
            }
        }

    }

    function addNameToFrequencyMap(renamedVarNameFrequencyMap: Map<Symbol[]>, originalName: string, symbol: Symbol) {
        if (renamedVarNameFrequencyMap.has(originalName)) {
            renamedVarNameFrequencyMap.get(originalName)!.push(symbol);
        }
        else {
            renamedVarNameFrequencyMap.set(originalName, [symbol]);
        }
    }

    function getNewNameIfConflict(name: Identifier, originalNames: ReadonlyMap<Symbol[]>): SynthIdentifier {
        const numVarsSameName = (originalNames.get(name.text) || emptyArray).length;
        const numberOfAssignmentsOriginal = 0;
        const identifier = numVarsSameName === 0 ? name : createIdentifier(name.text + "_" + numVarsSameName);
        return { identifier, types: [], numberOfAssignmentsOriginal };
    }

    // dispatch function to recursively build the refactoring
    // should be kept up to date with isFixablePromiseHandler in suggestionDiagnostics.ts
    function transformExpression(node: Expression, transformer: Transformer, outermostParent: CallExpression, prevArgName?: SynthIdentifier): ReadonlyArray<Statement> {
        if (!node) {
            return emptyArray;
        }

        const originalType = isIdentifier(node) && transformer.originalTypeMap.get(getNodeId(node).toString());
        const nodeType = originalType || transformer.checker.getTypeAtLocation(node);

        if (isCallExpression(node) && hasPropertyAccessExpressionWithName(node, "then") && nodeType && !!transformer.checker.getPromisedTypeOfPromise(nodeType)) {
            return transformThen(node, transformer, outermostParent, prevArgName);
        }
        else if (isCallExpression(node) && hasPropertyAccessExpressionWithName(node, "catch") && nodeType && !!transformer.checker.getPromisedTypeOfPromise(nodeType)) {
            return transformCatch(node, transformer, prevArgName);
        }
        else if (isPropertyAccessExpression(node)) {
            return transformExpression(node.expression, transformer, outermostParent, prevArgName);
        }
        else if (nodeType && transformer.checker.getPromisedTypeOfPromise(nodeType)) {
            return transformPromiseCall(node, transformer, prevArgName);
        }

        codeActionSucceeded = false;
        return emptyArray;
    }

    function transformCatch(node: CallExpression, transformer: Transformer, prevArgName?: SynthIdentifier): ReadonlyArray<Statement> {
        const func = node.arguments[0];
        const argName = getArgName(func, transformer);
        const shouldReturn = transformer.setOfExpressionsToReturn.get(getNodeId(node).toString());

        /*
            If there is another call in the chain after the .catch() we are transforming, we will need to save the result of both paths (try block and catch block)
            To do this, we will need to synthesize a variable that we were not aware of while we were adding identifiers to the synthNamesMap
            We will use the prevArgName and then update the synthNamesMap with a new variable name for the next transformation step
        */
        if (prevArgName && !shouldReturn) {
            prevArgName.numberOfAssignmentsOriginal = 2; // Try block and catch block
            transformer.synthNamesMap.forEach((val, key) => {
                if (val.identifier.text === prevArgName.identifier.text) {
                    const newSynthName = createUniqueSynthName(prevArgName);
                    transformer.synthNamesMap.set(key, newSynthName);
                }
            });

            // update the constIdentifiers list
            if (transformer.constIdentifiers.some(elem => elem.text === prevArgName.identifier.text)) {
                transformer.constIdentifiers.push(createUniqueSynthName(prevArgName).identifier);
            }
        }

        const tryBlock = createBlock(transformExpression(node.expression, transformer, node, prevArgName));

        const transformationBody = getTransformationBody(func, prevArgName, argName, node, transformer);
        const catchArg = argName ? argName.identifier.text : "e";
        const catchClause = createCatchClause(catchArg, createBlock(transformationBody));

        /*
            In order to avoid an implicit any, we will synthesize a type for the declaration using the unions of the types of both paths (try block and catch block)
        */
        let varDeclList;
        if (prevArgName && !shouldReturn) {
            const typeArray: Type[] = prevArgName.types;
            const unionType = transformer.checker.getUnionType(typeArray, UnionReduction.Subtype);
            const unionTypeNode = transformer.isInJSFile ? undefined : transformer.checker.typeToTypeNode(unionType);
            const varDecl = [createVariableDeclaration(getSynthesizedDeepClone(prevArgName.identifier), unionTypeNode)];
            varDeclList = createVariableStatement(/*modifiers*/ undefined, createVariableDeclarationList(varDecl, NodeFlags.Let));
        }

        const tryStatement = createTry(tryBlock, catchClause, /*finallyBlock*/ undefined);
        return varDeclList ? [varDeclList, tryStatement] : [tryStatement];
    }

    function createUniqueSynthName(prevArgName: SynthIdentifier) {
        const renamedPrevArg = createOptimisticUniqueName(prevArgName.identifier.text);
        const newSynthName = { identifier: renamedPrevArg, types: [], numberOfAssignmentsOriginal: 0 };
        return newSynthName;
    }

    function transformThen(node: CallExpression, transformer: Transformer, outermostParent: CallExpression, prevArgName?: SynthIdentifier): ReadonlyArray<Statement> {
        const [res, rej] = node.arguments;

        if (!res) {
            return transformExpression(node.expression, transformer, outermostParent);
        }

        const argNameRes = getArgName(res, transformer);
        const transformationBody = getTransformationBody(res, prevArgName, argNameRes, node, transformer);

        if (rej) {
            const argNameRej = getArgName(rej, transformer);

            const tryBlock = createBlock(transformExpression(node.expression, transformer, node, argNameRes).concat(transformationBody));

            const transformationBody2 = getTransformationBody(rej, prevArgName, argNameRej, node, transformer);

            const catchArg = argNameRej ? argNameRej.identifier.text : "e";
            const catchClause = createCatchClause(catchArg, createBlock(transformationBody2));

            return [createTry(tryBlock, catchClause, /* finallyBlock */ undefined)];
        }

        return transformExpression(node.expression, transformer, node, argNameRes).concat(transformationBody);
    }

    function getFlagOfIdentifier(node: Identifier, constIdentifiers: ReadonlyArray<Identifier>): NodeFlags {
        const inArr: boolean = constIdentifiers.some(elem => elem.text === node.text);
        return inArr ? NodeFlags.Const : NodeFlags.Let;
    }

    function transformPromiseCall(node: Expression, transformer: Transformer, prevArgName?: SynthIdentifier): ReadonlyArray<Statement> {
        const shouldReturn = transformer.setOfExpressionsToReturn.get(getNodeId(node).toString());
        // the identifier is empty when the handler (.then()) ignores the argument - In this situation we do not need to save the result of the promise returning call
        const originalNodeParent = node.original ? node.original.parent : node.parent;
        if (prevArgName && !shouldReturn && (!originalNodeParent || isPropertyAccessExpression(originalNodeParent))) {
            return createTransformedStatement(prevArgName, createAwait(node), transformer);
        }
        else if (!prevArgName && !shouldReturn && (!originalNodeParent || isPropertyAccessExpression(originalNodeParent))) {
            return [createStatement(createAwait(node))];
        }

        return [createReturn(getSynthesizedDeepClone(node))];
    }

    function createTransformedStatement(prevArgName: SynthIdentifier | undefined, rightHandSide: Expression, transformer: Transformer): ReadonlyArray<Statement> {
        if (!prevArgName || prevArgName.identifier.text.length === 0) {
            // if there's no argName to assign to, there still might be side effects
            return [createStatement(rightHandSide)];
        }

        if (prevArgName.types.length < prevArgName.numberOfAssignmentsOriginal) {
            // if the variable has already been declared, we don't need "let" or "const"
            return [createStatement(createAssignment(getSynthesizedDeepClone(prevArgName.identifier), rightHandSide))];
        }

        return [createVariableStatement(/*modifiers*/ undefined,
            (createVariableDeclarationList([createVariableDeclaration(getSynthesizedDeepClone(prevArgName.identifier), /*type*/ undefined, rightHandSide)], getFlagOfIdentifier(prevArgName.identifier, transformer.constIdentifiers))))];
    }

    // should be kept up to date with isFixablePromiseArgument in suggestionDiagnostics.ts
    function getTransformationBody(func: Expression, prevArgName: SynthIdentifier | undefined, argName: SynthIdentifier | undefined, parent: CallExpression, transformer: Transformer): ReadonlyArray<Statement> {

        const shouldReturn = transformer.setOfExpressionsToReturn.get(getNodeId(parent).toString());
        switch (func.kind) {
            case SyntaxKind.NullKeyword:
                // do not produce a transformed statement for a null argument
                break;
            case SyntaxKind.Identifier: // identifier includes undefined
                if (!argName) {
                    // undefined was argument passed to promise handler
                    break;
                }

                const synthCall = createCall(getSynthesizedDeepClone(func as Identifier), /*typeArguments*/ undefined, argName ? [argName.identifier] : emptyArray);
                if (shouldReturn) {
                    return [createReturn(synthCall)];
                }

                const type = transformer.originalTypeMap.get(getNodeId(func).toString()) || transformer.checker.getTypeAtLocation(func);
                const callSignatures = transformer.checker.getSignaturesOfType(type, SignatureKind.Call);
                if (!callSignatures.length) {
                    // if identifier in handler has no call signatures, it's invalid
                    codeActionSucceeded = false;
                    break;
                }
                const returnType = callSignatures[0].getReturnType();
                const varDeclOrAssignment = createTransformedStatement(prevArgName, createAwait(synthCall), transformer);
                if (prevArgName) {
                    prevArgName.types.push(returnType);
                }
                return varDeclOrAssignment;

            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction: {
                const funcBody = (func as FunctionExpression | ArrowFunction).body;
                // Arrow functions with block bodies { } will enter this control flow
                if (isBlock(funcBody)) {
                    let refactoredStmts: Statement[] = [];
                    let seenReturnStatement = false;

                    for (const statement of funcBody.statements) {
                        if (isReturnStatement(statement)) {
                            seenReturnStatement = true;
                        }

                        if (getReturnStatementsWithPromiseHandlers(statement).length) {
                            refactoredStmts = refactoredStmts.concat(getInnerTransformationBody(transformer, [statement], prevArgName));
                        }
                        else {
                            refactoredStmts.push(statement);
                        }
                    }

                    return shouldReturn ? refactoredStmts.map(s => getSynthesizedDeepClone(s)) :
                        removeReturns(refactoredStmts, prevArgName!.identifier, transformer, seenReturnStatement);
                }
                else {
                    const innerRetStmts = getReturnStatementsWithPromiseHandlers(createReturn(funcBody));
                    const innerCbBody = getInnerTransformationBody(transformer, innerRetStmts, prevArgName);

                    if (innerCbBody.length > 0) {
                        return innerCbBody;
                    }

                    if (!shouldReturn) {
                        const type = transformer.checker.getTypeAtLocation(func);
                        const returnType = getLastCallSignature(type, transformer.checker)!.getReturnType();
                        const rightHandSide = getSynthesizedDeepClone(funcBody);
                        const possiblyAwaitedRightHandSide = !!transformer.checker.getPromisedTypeOfPromise(returnType) ? createAwait(rightHandSide) : rightHandSide;
                        const transformedStatement = createTransformedStatement(prevArgName, possiblyAwaitedRightHandSide, transformer);
                        if (prevArgName) {
                            prevArgName.types.push(returnType);
                        }
                        return transformedStatement;
                    }
                    else {
                        return [createReturn(getSynthesizedDeepClone(funcBody))];
                    }
                }
            }
            default:
                // If no cases apply, we've found a transformation body we don't know how to handle, so the refactoring should no-op to avoid deleting code.
                codeActionSucceeded = false;
                break;
        }
        return emptyArray;
    }

    function getLastCallSignature(type: Type, checker: TypeChecker): Signature | undefined {
        const callSignatures = checker.getSignaturesOfType(type, SignatureKind.Call);
        return lastOrUndefined(callSignatures);
    }


    function removeReturns(stmts: ReadonlyArray<Statement>, prevArgName: Identifier, transformer: Transformer, seenReturnStatement: boolean): ReadonlyArray<Statement> {
        const ret: Statement[] = [];
        for (const stmt of stmts) {
            if (isReturnStatement(stmt)) {
                if (stmt.expression) {
                    const possiblyAwaitedExpression = isPromiseReturningExpression(stmt.expression, transformer.checker) ? createAwait(stmt.expression) : stmt.expression;
                    ret.push(createVariableStatement(/*modifiers*/ undefined,
                        (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, possiblyAwaitedExpression)], getFlagOfIdentifier(prevArgName, transformer.constIdentifiers)))));
                }
            }
            else {
                ret.push(getSynthesizedDeepClone(stmt));
            }
        }

        // if block has no return statement, need to define prevArgName as undefined to prevent undeclared variables
        if (!seenReturnStatement) {
            ret.push(createVariableStatement(/*modifiers*/ undefined,
                (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, createIdentifier("undefined"))], getFlagOfIdentifier(prevArgName, transformer.constIdentifiers)))));
        }

        return ret;
    }


    function getInnerTransformationBody(transformer: Transformer, innerRetStmts: ReadonlyArray<Node>, prevArgName?: SynthIdentifier) {

        let innerCbBody: Statement[] = [];
        for (const stmt of innerRetStmts) {
            forEachChild(stmt, function visit(node) {
                if (isCallExpression(node)) {
                    const temp = transformExpression(node, transformer, node, prevArgName);
                    innerCbBody = innerCbBody.concat(temp);
                    if (innerCbBody.length > 0) {
                        return;
                    }
                }
                else if (!isFunctionLike(node)) {
                    forEachChild(node, visit);
                }
            });
        }
        return innerCbBody;
    }

    function getArgName(funcNode: Expression, transformer: Transformer): SynthIdentifier | undefined {

        const numberOfAssignmentsOriginal = 0;
        const types: Type[] = [];

        let name: SynthIdentifier | undefined;

        if (isFunctionLikeDeclaration(funcNode)) {
            if (funcNode.parameters.length > 0) {
                const param = funcNode.parameters[0].name as Identifier;
                name = getMapEntryOrDefault(param);
            }
        }
        else if (isIdentifier(funcNode)) {
            name = getMapEntryOrDefault(funcNode);
        }

        // return undefined argName when arg is null or undefined
        if (!name || name.identifier.text === "undefined") {
            return undefined;
        }

        return name;

        function getMapEntryOrDefault(identifier: Identifier): SynthIdentifier {
            const originalNode = getOriginalNode(identifier);
            const symbol = getSymbol(originalNode);

            if (!symbol) {
                return { identifier, types, numberOfAssignmentsOriginal };
            }

            const mapEntry = transformer.synthNamesMap.get(getSymbolId(symbol).toString());
            return mapEntry || { identifier, types, numberOfAssignmentsOriginal };
        }

        function getSymbol(node: Node): Symbol | undefined {
            return node.symbol ? node.symbol : transformer.checker.getSymbolAtLocation(node);
        }

        function getOriginalNode(node: Node): Node {
            return node.original ? node.original : node;
        }
    }
}
