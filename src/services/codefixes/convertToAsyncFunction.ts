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
    }

    interface Transformer {
        readonly checker: TypeChecker;
        readonly synthNamesMap: Map<string, SynthIdentifier>; // keys are the symbol id of the identifier
        readonly setOfExpressionsToReturn: ReadonlySet<number>; // keys are the node ids of the expressions
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

        const synthNamesMap: Map<string, SynthIdentifier> = new Map();
        const isInJavascript = isInJSFile(functionToConvert);
        const setOfExpressionsToReturn = getAllPromiseExpressionsToReturn(functionToConvert, checker);
        const functionToConvertRenamed = renameCollidingVarNames(functionToConvert, checker, synthNamesMap, context.sourceFile);
        const returnStatements = functionToConvertRenamed.body && isBlock(functionToConvertRenamed.body) ? getReturnStatementsWithPromiseHandlers(functionToConvertRenamed.body) : emptyArray;
        const transformer: Transformer = { checker, synthNamesMap, setOfExpressionsToReturn, isInJSFile: isInJavascript };

        if (!returnStatements.length) {
            return;
        }

        // add the async keyword
        changes.insertLastModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, functionToConvert);

        for (const returnStatement of returnStatements) {
            forEachChild(returnStatement, function visit(node) {
                if (isCallExpression(node)) {
                    const newNodes = transformExpression(node, transformer);
                    changes.replaceNodeWithNodes(sourceFile, returnStatement, newNodes);
                }
                else if (!isFunctionLike(node)) {
                    forEachChild(node, visit);
                }
            });
        }
    }

    function getReturnStatementsWithPromiseHandlers(body: Block): readonly ReturnStatement[] {
        const res: ReturnStatement[] = [];
        forEachReturnStatement(body, ret => {
            if (isReturnStatementWithFixablePromiseHandler(ret)) res.push(ret);
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
            else if (isPromiseReturningCallExpression(node, checker, "catch")) {
                setOfExpressionsToReturn.add(getNodeId(node));
                // if .catch() is the last call in the chain, move leftward in the chain until we hit something else that should be returned
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

    function isPromiseReturningCallExpression(node: Node, checker: TypeChecker, name: string): node is CallExpression {
        if (!isCallExpression(node)) return false;
        const isExpressionOfName = hasPropertyAccessExpressionWithName(node, name);
        const nodeType = isExpressionOfName && checker.getTypeAtLocation(node);
        return !!(nodeType && checker.getPromisedTypeOfPromise(nodeType));
    }

    function isPromiseTypedExpression(node: Node, checker: TypeChecker): node is Expression {
        if (!isExpression(node)) return false;
        return !!checker.getPromisedTypeOfPromise(checker.getTypeAtLocation(node));
    }

    function declaredInFile(symbol: Symbol, sourceFile: SourceFile): boolean {
        return symbol.valueDeclaration && symbol.valueDeclaration.getSourceFile() === sourceFile;
    }

    /*
        Renaming of identifiers may be neccesary as the refactor changes scopes -
        This function collects all existing identifier names and names of identifiers that will be created in the refactor.
        It then checks for any collisions and renames them through getSynthesizedDeepClone
    */
    function renameCollidingVarNames(nodeToRename: FunctionLikeDeclaration, checker: TypeChecker, synthNamesMap: Map<string, SynthIdentifier>, sourceFile: SourceFile): FunctionLikeDeclaration {
        const identsToRenameMap = new Map<string, Identifier>(); // key is the symbol id
        const collidingSymbolMap = createMultiMap<Symbol>();
        forEachChild(nodeToRename, function visit(node: Node) {
            if (!isIdentifier(node)) {
                forEachChild(node, visit);
                return;
            }

            const symbol = checker.getSymbolAtLocation(node);
            const isDefinedInFile = symbol && declaredInFile(symbol, sourceFile);

            if (symbol && isDefinedInFile) {
                const type = checker.getTypeAtLocation(node);
                // Note - the choice of the last call signature is arbitrary
                const lastCallSignature = getLastCallSignature(type, checker);
                const symbolIdString = getSymbolId(symbol).toString();

                // If the identifier refers to a function, we want to add the new synthesized variable for the declaration. Example:
                //   fetch('...').then(response => { ... })
                // will eventually become
                //   const response = await fetch('...')
                // so we push an entry for 'response'.
                if (lastCallSignature && !isFunctionLikeDeclaration(node.parent) && !synthNamesMap.has(symbolIdString)) {
                    const firstParameter = firstOrUndefined(lastCallSignature.parameters);
                    const ident = firstParameter && isParameter(firstParameter.valueDeclaration) && tryCast(firstParameter.valueDeclaration.name, isIdentifier) || factory.createUniqueName("result", GeneratedIdentifierFlags.Optimistic);
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

        return getSynthesizedDeepCloneWithRenames(nodeToRename, /*includeTrivia*/ true, identsToRenameMap, checker);
    }

    function getNewNameIfConflict(name: Identifier, originalNames: ReadonlyMap<string, Symbol[]>): SynthIdentifier {
        const numVarsSameName = (originalNames.get(name.text) || emptyArray).length;
        const identifier = numVarsSameName === 0 ? name : factory.createIdentifier(name.text + "_" + numVarsSameName);
        return createSynthIdentifier(identifier);
    }

    function silentFail() {
        codeActionSucceeded = false;
        return emptyArray;
    }

    // dispatch function to recursively build the refactoring
    // should be kept up to date with isFixablePromiseHandler in suggestionDiagnostics.ts
    function transformExpression(node: Expression, transformer: Transformer, prevArgName?: SynthBindingName): readonly Statement[] {
        if (isPromiseReturningCallExpression(node, transformer.checker, "then")) {
            if (node.arguments.length === 0) return silentFail();
            return transformThen(node, transformer, prevArgName);
        }
        if (isPromiseReturningCallExpression(node, transformer.checker, "catch")) {
            if (node.arguments.length === 0) return silentFail();
            return transformCatch(node, transformer, prevArgName);
        }
        if (isPropertyAccessExpression(node)) {
            return transformExpression(node.expression, transformer, prevArgName);
        }

        const nodeType = transformer.checker.getTypeAtLocation(node);
        if (nodeType && transformer.checker.getPromisedTypeOfPromise(nodeType)) {
            Debug.assertNode(node.original!.parent, isPropertyAccessExpression);
            return transformPromiseExpressionOfPropertyAccess(node, transformer, prevArgName);
        }

        return silentFail();
    }

    function transformCatch(node: CallExpression, transformer: Transformer, prevArgName?: SynthBindingName): readonly Statement[] {
        const func = node.arguments[0];
        const argName = getArgBindingName(func, transformer);
        let possibleNameForVarDecl: SynthIdentifier | undefined;

        /*
            If there is another call in the chain after the .catch() we are transforming, we will need to save the result of both paths (try block and catch block)
            To do this, we will need to synthesize a variable that we were not aware of while we were adding identifiers to the synthNamesMap
            We will use the prevArgName and then update the synthNamesMap with a new variable name for the next transformation step
        */
        if (prevArgName && !shouldReturn(node, transformer)) {
            if (isSynthIdentifier(prevArgName)) {
                possibleNameForVarDecl = prevArgName;
                transformer.synthNamesMap.forEach((val, key) => {
                    if (val.identifier.text === prevArgName.identifier.text) {
                        const newSynthName = createUniqueSynthName(prevArgName);
                        transformer.synthNamesMap.set(key, newSynthName);
                    }
                });
            }
            else {
                possibleNameForVarDecl = createSynthIdentifier(factory.createUniqueName("result", GeneratedIdentifierFlags.Optimistic), prevArgName.types);
            }

            // We are about to write a 'let' variable declaration, but `transformExpression` for both
            // the try block and catch block will assign to this name. Setting this flag indicates
            // that future assignments should be written as `name = value` instead of `const name = value`.
            possibleNameForVarDecl.hasBeenDeclared = true;
        }

        const tryBlock = factory.createBlock(transformExpression(node.expression, transformer, possibleNameForVarDecl));
        const transformationBody = getTransformationBody(func, possibleNameForVarDecl, argName, node, transformer);
        const catchArg = argName ? isSynthIdentifier(argName) ? argName.identifier.text : argName.bindingPattern : "e";
        const catchVariableDeclaration = factory.createVariableDeclaration(catchArg);
        const catchClause = factory.createCatchClause(catchVariableDeclaration, factory.createBlock(transformationBody));

        /*
            In order to avoid an implicit any, we will synthesize a type for the declaration using the unions of the types of both paths (try block and catch block)
        */
        let varDeclList: VariableStatement | undefined;
        let varDeclIdentifier: Identifier | undefined;
        if (possibleNameForVarDecl && !shouldReturn(node, transformer)) {
            varDeclIdentifier = getSynthesizedDeepClone(possibleNameForVarDecl.identifier);
            const typeArray: Type[] = possibleNameForVarDecl.types;
            const unionType = transformer.checker.getUnionType(typeArray, UnionReduction.Subtype);
            const unionTypeNode = transformer.isInJSFile ? undefined : transformer.checker.typeToTypeNode(unionType, /*enclosingDeclaration*/ undefined, /*flags*/ undefined);
            const varDecl = [factory.createVariableDeclaration(varDeclIdentifier, /*exclamationToken*/ undefined, unionTypeNode)];
            varDeclList = factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList(varDecl, NodeFlags.Let));
        }

        const tryStatement = factory.createTryStatement(tryBlock, catchClause, /*finallyBlock*/ undefined);
        const destructuredResult = prevArgName && varDeclIdentifier && isSynthBindingPattern(prevArgName)
            && factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(getSynthesizedDeepCloneWithRenames(prevArgName.bindingPattern), /*exclamationToken*/ undefined, /*type*/ undefined, varDeclIdentifier)], NodeFlags.Const));
        return compact([varDeclList, tryStatement, destructuredResult]);
    }

    function createUniqueSynthName(prevArgName: SynthIdentifier): SynthIdentifier {
        const renamedPrevArg = factory.createUniqueName(prevArgName.identifier.text, GeneratedIdentifierFlags.Optimistic);
        return createSynthIdentifier(renamedPrevArg);
    }

    function transformThen(node: CallExpression, transformer: Transformer, prevArgName?: SynthBindingName): readonly Statement[] {
        const [onFulfilled, onRejected] = node.arguments;
        const onFulfilledArgumentName = getArgBindingName(onFulfilled, transformer);
        const transformationBody = getTransformationBody(onFulfilled, prevArgName, onFulfilledArgumentName, node, transformer);

        if (onRejected) {
            const onRejectedArgumentName = getArgBindingName(onRejected, transformer);
            const tryBlock = factory.createBlock(transformExpression(node.expression, transformer, onFulfilledArgumentName).concat(transformationBody));
            const transformationBody2 = getTransformationBody(onRejected, prevArgName, onRejectedArgumentName, node, transformer);
            const catchArg = onRejectedArgumentName ? isSynthIdentifier(onRejectedArgumentName) ? onRejectedArgumentName.identifier.text : onRejectedArgumentName.bindingPattern : "e";
            const catchVariableDeclaration = factory.createVariableDeclaration(catchArg);
            const catchClause = factory.createCatchClause(catchVariableDeclaration, factory.createBlock(transformationBody2));

            return [factory.createTryStatement(tryBlock, catchClause, /* finallyBlock */ undefined)];
        }

        return transformExpression(node.expression, transformer, onFulfilledArgumentName).concat(transformationBody);
    }

    /**
     * Transforms the 'x' part of `x.then(...)`, or the 'y()' part of `y().catch(...)`, where 'x' and 'y()' are Promises.
     */
    function transformPromiseExpressionOfPropertyAccess(node: Expression, transformer: Transformer, prevArgName?: SynthBindingName): readonly Statement[] {
        if (shouldReturn(node, transformer)) {
            return [factory.createReturnStatement(getSynthesizedDeepClone(node))];
        }

        return createVariableOrAssignmentOrExpressionStatement(prevArgName, factory.createAwaitExpression(node), /*typeAnnotation*/ undefined);
    }

    function createVariableOrAssignmentOrExpressionStatement(variableName: SynthBindingName | undefined, rightHandSide: Expression, typeAnnotation: TypeNode | undefined): readonly Statement[] {
        if (!variableName || isEmptyBindingName(variableName)) {
            // if there's no argName to assign to, there still might be side effects
            return [factory.createExpressionStatement(rightHandSide)];
        }

        if (isSynthIdentifier(variableName) && variableName.hasBeenDeclared) {
            // if the variable has already been declared, we don't need "let" or "const"
            return [factory.createExpressionStatement(factory.createAssignment(getSynthesizedDeepClone(variableName.identifier), rightHandSide))];
        }

        return [
            factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(
                        getSynthesizedDeepClone(getNode(variableName)),
                        /*exclamationToken*/ undefined,
                        typeAnnotation,
                        rightHandSide)],
                    NodeFlags.Const))];
    }

    function maybeAnnotateAndReturn(expressionToReturn: Expression | undefined, typeAnnotation: TypeNode | undefined): readonly Statement[] {
        if (typeAnnotation && expressionToReturn) {
            const name = factory.createUniqueName("result", GeneratedIdentifierFlags.Optimistic);
            return [
                ...createVariableOrAssignmentOrExpressionStatement(createSynthIdentifier(name), expressionToReturn, typeAnnotation),
                factory.createReturnStatement(name)
            ];
        }
        return [factory.createReturnStatement(expressionToReturn)];
    }

    // should be kept up to date with isFixablePromiseArgument in suggestionDiagnostics.ts
    function getTransformationBody(func: Expression, prevArgName: SynthBindingName | undefined, argName: SynthBindingName | undefined, parent: CallExpression, transformer: Transformer): readonly Statement[] {
        switch (func.kind) {
            case SyntaxKind.NullKeyword:
                // do not produce a transformed statement for a null argument
                break;
            case SyntaxKind.Identifier: // identifier includes undefined
                if (!argName) {
                    // undefined was argument passed to promise handler
                    break;
                }

                const synthCall = factory.createCallExpression(getSynthesizedDeepClone(func as Identifier), /*typeArguments*/ undefined, isSynthIdentifier(argName) ? [argName.identifier] : []);
                if (shouldReturn(parent, transformer)) {
                    return maybeAnnotateAndReturn(synthCall, parent.typeArguments?.[0]);
                }

                const type = transformer.checker.getTypeAtLocation(func);
                const callSignatures = transformer.checker.getSignaturesOfType(type, SignatureKind.Call);
                if (!callSignatures.length) {
                    // if identifier in handler has no call signatures, it's invalid
                    return silentFail();
                }
                const returnType = callSignatures[0].getReturnType();
                const varDeclOrAssignment = createVariableOrAssignmentOrExpressionStatement(prevArgName, factory.createAwaitExpression(synthCall), parent.typeArguments?.[0]);
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
                            if (isReturnStatementWithFixablePromiseHandler(statement)) {
                                refactoredStmts = refactoredStmts.concat(getInnerTransformationBody(transformer, [statement], prevArgName));
                            }
                            else {
                                refactoredStmts.push(...maybeAnnotateAndReturn(statement.expression, parent.typeArguments?.[0]));
                            }
                        }
                        else {
                            refactoredStmts.push(statement);
                        }
                    }

                    return shouldReturn(parent, transformer)
                        ? refactoredStmts.map(s => getSynthesizedDeepClone(s))
                        : removeReturns(
                            refactoredStmts,
                            prevArgName,
                            transformer,
                            seenReturnStatement);
                }
                else {
                    const innerRetStmts = isFixablePromiseHandler(funcBody) ? [factory.createReturnStatement(funcBody)] : emptyArray;
                    const innerCbBody = getInnerTransformationBody(transformer, innerRetStmts, prevArgName);

                    if (innerCbBody.length > 0) {
                        return innerCbBody;
                    }

                    const type = transformer.checker.getTypeAtLocation(func);
                    const returnType = getLastCallSignature(type, transformer.checker)!.getReturnType();
                    const rightHandSide = getSynthesizedDeepClone(funcBody);
                    const possiblyAwaitedRightHandSide = !!transformer.checker.getPromisedTypeOfPromise(returnType) ? factory.createAwaitExpression(rightHandSide) : rightHandSide;
                    if (!shouldReturn(parent, transformer)) {
                        const transformedStatement = createVariableOrAssignmentOrExpressionStatement(prevArgName, possiblyAwaitedRightHandSide, /*typeAnnotation*/ undefined);
                        if (prevArgName) {
                            prevArgName.types.push(returnType);
                        }
                        return transformedStatement;
                    }
                    else {
                        return maybeAnnotateAndReturn(possiblyAwaitedRightHandSide, parent.typeArguments?.[0]);
                    }
                }
            }
            default:
                // If no cases apply, we've found a transformation body we don't know how to handle, so the refactoring should no-op to avoid deleting code.
                return silentFail();
        }
        return emptyArray;
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
                    else {
                        ret.push(factory.createVariableStatement(/*modifiers*/ undefined,
                            (factory.createVariableDeclarationList([factory.createVariableDeclaration(getNode(prevArgName), /*exclamationToken*/ undefined, /*type*/ undefined, possiblyAwaitedExpression)], NodeFlags.Const))));
                    }
                }
            }
            else {
                ret.push(getSynthesizedDeepClone(stmt));
            }
        }

        // if block has no return statement, need to define prevArgName as undefined to prevent undeclared variables
        if (!seenReturnStatement && prevArgName !== undefined) {
            ret.push(factory.createVariableStatement(/*modifiers*/ undefined,
                (factory.createVariableDeclarationList([factory.createVariableDeclaration(getNode(prevArgName), /*exclamationToken*/ undefined, /*type*/ undefined, factory.createIdentifier("undefined"))], NodeFlags.Const))));
        }

        return ret;
    }


    function getInnerTransformationBody(transformer: Transformer, innerRetStmts: readonly Node[], prevArgName?: SynthBindingName) {
        let innerCbBody: Statement[] = [];
        for (const stmt of innerRetStmts) {
            forEachChild(stmt, function visit(node) {
                if (isCallExpression(node)) {
                    const temp = transformExpression(node, transformer, prevArgName);
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

        // return undefined argName when arg is null or undefined
        // eslint-disable-next-line no-in-operator
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
            return node.symbol ? node.symbol : transformer.checker.getSymbolAtLocation(node);
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

    function getNode(bindingName: SynthBindingName) {
        return isSynthIdentifier(bindingName) ? bindingName.identifier : bindingName.bindingPattern;
    }

    function createSynthIdentifier(identifier: Identifier, types: Type[] = []): SynthIdentifier {
        return { kind: SynthBindingNameKind.Identifier, identifier, types, hasBeenDeclared: false };
    }

    function createSynthBindingPattern(bindingPattern: BindingPattern, elements: readonly SynthBindingName[] = emptyArray, types: Type[] = []): SynthBindingPattern {
        return { kind: SynthBindingNameKind.BindingPattern, bindingPattern, elements, types };
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
}
