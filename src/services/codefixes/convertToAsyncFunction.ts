/* @internal */
namespace ts.codefix {
    const fixId = "convertToAsyncFunction";
    const errorCodes = [Diagnostics.This_may_be_converted_to_an_async_function.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            const changes = textChanges.ChangeTracker.with(context, (t) => convertToAsyncFunction(t, context.sourceFile, context.span.start, context.program.getTypeChecker(), context));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_async_function, fixId, Diagnostics.Convert_all_to_async_functions)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncFunction(changes, err.file, err.start, context.program.getTypeChecker(), context)),
    });


    /*
        custom type to encapsulate information for variable declarations synthesized in the refactor
        numberOfUsesOriginal - number of times the variable should be assigned in the refactor
        numberOfUsesSynthesized - count of how many times the variable has been assigned so far
        At the end of the refactor, numberOfUsesOriginal should === numberOfUsesSynthesized
    */
    interface SynthIdentifier {
        identifier: Identifier;
        types: Type[];
        numberOfAssignmentsOriginal: number;
    }

    interface SymbolAndIdentifier {
        identifier: Identifier;
        symbol: Symbol;
    }

    interface Transformer {
        checker: TypeChecker;
        synthNamesMap: Map<SynthIdentifier>; // keys are the symbol id of the identifier
        allVarNames: SymbolAndIdentifier[];
        setOfExpressionsToReturn: Map<true>; // keys are the node ids of the expressions
        constIdentifiers: Identifier[];
        originalTypeMap: Map<Type>; // keys are the node id of the identifier
        isInJSFile: boolean;
    }

    function convertToAsyncFunction(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker, context: CodeFixContextBase): void {
        // get the function declaration - returns a promise
        const functionToConvert: FunctionLikeDeclaration = getContainingFunction(getTokenAtPosition(sourceFile, position)) as FunctionLikeDeclaration;
        if (!functionToConvert) {
            return;
        }

        const synthNamesMap: Map<SynthIdentifier> = createMap();
        const originalTypeMap: Map<Type> = createMap();
        const allVarNames: SymbolAndIdentifier[] = [];
        const isInJSFile = isInJavaScriptFile(functionToConvert);
        const setOfExpressionsToReturn = getAllPromiseExpressionsToReturn(functionToConvert, checker);
        const functionToConvertRenamed: FunctionLikeDeclaration = renameCollidingVarNames(functionToConvert, checker, synthNamesMap, context, setOfExpressionsToReturn, originalTypeMap, allVarNames);
        const constIdentifiers = getConstIdentifiers(synthNamesMap);
        const returnStatements = getReturnStatementsWithPromiseHandlers(functionToConvertRenamed);
        const transformer = { checker, synthNamesMap, allVarNames, setOfExpressionsToReturn, constIdentifiers, originalTypeMap, isInJSFile };

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
            if (isCallExpression(statement)) {
                startTransformation(statement, statement);
            }
            else {
                forEachChild(statement, function visit(node: Node) {
                    if (isCallExpression(node)) {
                        startTransformation(node, statement);
                    }
                    else if (!isFunctionLike(node)) {
                        forEachChild(node, visit);
                    }
                });
            }
        }
    }

    // Returns the identifiers that are never reassigned in the refactor
    function getConstIdentifiers(synthNamesMap: Map<SynthIdentifier>): Identifier[] {
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
                if (lastCallSignature && lastCallSignature.parameters.length && !synthNamesMap.has(symbolIdString)) {
                    const synthName = getNewNameIfConflict(createIdentifier(lastCallSignature.parameters[0].name), allVarNames);
                    synthNamesMap.set(symbolIdString, synthName);
                    allVarNames.push({ identifier: synthName.identifier, symbol });
                }
                // we only care about identifiers that are parameters and declarations (don't care about other uses)
                else if (node.parent && (isParameter(node.parent) || isVariableDeclaration(node.parent))) {

                    // if the identifier name conflicts with a different identifier that we've already seen
                    if (allVarNames.some(ident => ident.identifier.text === node.text && ident.symbol !== symbol)) {
                        const newName = getNewNameIfConflict(node, allVarNames);
                        identsToRenameMap.set(symbolIdString, newName.identifier);
                        synthNamesMap.set(symbolIdString, newName);
                        allVarNames.push({ identifier: newName.identifier, symbol });
                    }
                    else {
                        const identifier = getSynthesizedDeepClone(node);
                        identsToRenameMap.set(symbolIdString, identifier);
                        synthNamesMap.set(symbolIdString, { identifier, types: [], numberOfAssignmentsOriginal: allVarNames.filter(elem => elem.identifier.text === node.text).length/*, numberOfAssignmentsSynthesized: 0*/ });
                        if ((isParameter(node.parent) && isExpressionOrCallOnTypePromise(node.parent.parent)) || isVariableDeclaration(node.parent)) {
                            allVarNames.push({ identifier, symbol });
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
                    if (type) {
                        originalType.set(getNodeId(clone).toString(), type);
                    }
                }
            }

            const val = setOfAllExpressionsToReturn.get(getNodeId(node).toString());
            if (val !== undefined) {
                setOfAllExpressionsToReturn.delete(getNodeId(node).toString());
                setOfAllExpressionsToReturn.set(getNodeId(clone).toString(), val);
            }
        }

    }

    function getNewNameIfConflict(name: Identifier, allVarNames: SymbolAndIdentifier[]): SynthIdentifier {
        const numVarsSameName = allVarNames.filter(elem => elem.identifier.text === name.text).length;
        const numberOfAssignmentsOriginal = 0;
        const identifier = numVarsSameName === 0 ? name : createIdentifier(name.text + "_" + numVarsSameName);
        return { identifier, types: [], numberOfAssignmentsOriginal };
    }

    // dispatch function to recursively build the refactoring
    function transformExpression(node: Expression, transformer: Transformer, outermostParent: CallExpression, prevArgName?: SynthIdentifier): Statement[] {
        if (!node) {
            return [];
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

        return [];
    }

    function transformCatch(node: CallExpression, transformer: Transformer, prevArgName?: SynthIdentifier): Statement[] {
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
                    transformer.synthNamesMap.set(key, getNewNameIfConflict(prevArgName.identifier, transformer.allVarNames));
                }
            });

            // update the constIdentifiers list
            if (transformer.constIdentifiers.some(elem => elem.text === prevArgName.identifier.text)) {
                transformer.constIdentifiers.push(getNewNameIfConflict(prevArgName.identifier, transformer.allVarNames).identifier);
            }
        }

        const tryBlock = createBlock(transformExpression(node.expression, transformer, node, prevArgName));

        const transformationBody = getTransformationBody(func, prevArgName, argName, node, transformer);
        const catchArg = argName.identifier.text.length > 0 ? argName.identifier.text : "e";
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

    function transformThen(node: CallExpression, transformer: Transformer, outermostParent: CallExpression, prevArgName?: SynthIdentifier): Statement[] {
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

            const catchArg = argNameRej.identifier.text.length > 0 ? argNameRej.identifier.text : "e";
            const catchClause = createCatchClause(catchArg, createBlock(transformationBody2));

            return [createTry(tryBlock, catchClause, /* finallyBlock */ undefined) as Statement];
        }
        else {
            return transformExpression(node.expression, transformer, node, argNameRes).concat(transformationBody);
        }

        return [];
    }

    function getFlagOfIdentifier(node: Identifier, constIdentifiers: Identifier[]): NodeFlags {
        const inArr: boolean = constIdentifiers.some(elem => elem.text === node.text);
        return inArr ? NodeFlags.Const : NodeFlags.Let;
    }

    function transformPromiseCall(node: Expression, transformer: Transformer, prevArgName?: SynthIdentifier): Statement[] {
        const shouldReturn = transformer.setOfExpressionsToReturn.get(getNodeId(node).toString());
        // the identifier is empty when the handler (.then()) ignores the argument - In this situation we do not need to save the result of the promise returning call
        const hasPrevArgName = prevArgName && prevArgName.identifier.text.length > 0;
        const originalNodeParent = node.original ? node.original.parent : node.parent;
        if (hasPrevArgName && !shouldReturn && (!originalNodeParent || isPropertyAccessExpression(originalNodeParent))) {
            return createVariableDeclarationOrAssignment(prevArgName!, createAwait(node), transformer).concat(); // hack to make the types match
        }
        else if (!hasPrevArgName && !shouldReturn && (!originalNodeParent || isPropertyAccessExpression(originalNodeParent))) {
            return [createStatement(createAwait(node))];
        }

        return [createReturn(getSynthesizedDeepClone(node))];
    }

    function createVariableDeclarationOrAssignment(prevArgName: SynthIdentifier, rightHandSide: Expression, transformer: Transformer): NodeArray<Statement> {

        if (prevArgName.types.length < prevArgName.numberOfAssignmentsOriginal) {
            return createNodeArray([createStatement(createAssignment(getSynthesizedDeepClone(prevArgName.identifier), rightHandSide))]);
        }

        return createNodeArray([createVariableStatement(/*modifiers*/ undefined,
            (createVariableDeclarationList([createVariableDeclaration(getSynthesizedDeepClone(prevArgName.identifier), /*type*/ undefined, rightHandSide)], getFlagOfIdentifier(prevArgName.identifier, transformer.constIdentifiers))))]);
    }

    function getTransformationBody(func: Node, prevArgName: SynthIdentifier | undefined, argName: SynthIdentifier, parent: CallExpression, transformer: Transformer): NodeArray<Statement> {

        const hasPrevArgName = prevArgName && prevArgName.identifier.text.length > 0;
        const hasArgName = argName && argName.identifier.text.length > 0;
        const shouldReturn = transformer.setOfExpressionsToReturn.get(getNodeId(parent).toString());
        switch (func.kind) {
            case SyntaxKind.Identifier:
                if (!hasArgName) break;

                const synthCall = createCall(getSynthesizedDeepClone(func) as Identifier, /*typeArguments*/ undefined, [argName.identifier]);
                if (shouldReturn) {
                    return createNodeArray([createReturn(synthCall)]);
                }

                if (!hasPrevArgName) break;

                const type = transformer.originalTypeMap.get(getNodeId(func).toString());
                const callSignatures = type && transformer.checker.getSignaturesOfType(type, SignatureKind.Call);
                const returnType = callSignatures && callSignatures[0].getReturnType();
                const varDeclOrAssignment = createVariableDeclarationOrAssignment(prevArgName!, createAwait(synthCall), transformer);
                prevArgName!.types.push(returnType!);
                return varDeclOrAssignment;

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                // Arrow functions with block bodies { } will enter this control flow
                if (isFunctionLikeDeclaration(func) && func.body && isBlock(func.body) && func.body.statements) {
                    let refactoredStmts: Statement[] = [];

                    for (const statement of func.body.statements) {
                        if (getReturnStatementsWithPromiseHandlers(statement).length) {
                            refactoredStmts = refactoredStmts.concat(getInnerTransformationBody(transformer, [statement], prevArgName));
                        }
                        else {
                            refactoredStmts.push(statement);
                        }
                    }

                    return shouldReturn ? getSynthesizedDeepClones(createNodeArray(refactoredStmts)) :
                        removeReturns(createNodeArray(refactoredStmts), prevArgName!.identifier, transformer.constIdentifiers);
                }
                else {
                    const funcBody = (<ArrowFunction>func).body;
                    const innerRetStmts = getReturnStatementsWithPromiseHandlers(createReturn(funcBody as Expression));
                    const innerCbBody = getInnerTransformationBody(transformer, innerRetStmts, prevArgName);

                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }

                    if (hasPrevArgName && !shouldReturn) {
                        const type = transformer.checker.getTypeAtLocation(func);
                        const returnType = getLastCallSignature(type, transformer.checker).getReturnType();
                        const varDeclOrAssignment = createVariableDeclarationOrAssignment(prevArgName!, getSynthesizedDeepClone(funcBody) as Expression, transformer);
                        prevArgName!.types.push(returnType);
                        return varDeclOrAssignment;
                    }
                    else {
                        return createNodeArray([createReturn(getSynthesizedDeepClone(funcBody) as Expression)]);
                    }
                }
                break;
        }
        return createNodeArray([]);
    }

    function getLastCallSignature(type: Type, checker: TypeChecker): Signature {
        const callSignatures = type && checker.getSignaturesOfType(type, SignatureKind.Call);
        return callSignatures && callSignatures[callSignatures.length - 1];
    }


    function removeReturns(stmts: NodeArray<Statement>, prevArgName: Identifier, constIdentifiers: Identifier[]): NodeArray<Statement> {
        const ret: Statement[] = [];
        for (const stmt of stmts) {
            if (isReturnStatement(stmt)) {
                if (stmt.expression) {
                    ret.push(createVariableStatement(/*modifiers*/ undefined,
                        (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, stmt.expression)], getFlagOfIdentifier(prevArgName, constIdentifiers)))));
                }
            }
            else {
                ret.push(getSynthesizedDeepClone(stmt));
            }
        }

        return createNodeArray(ret);
    }


    function getInnerTransformationBody(transformer: Transformer, innerRetStmts: Node[], prevArgName?: SynthIdentifier) {

        let innerCbBody: Statement[] = [];
        for (const stmt of innerRetStmts) {
            forEachChild(stmt, function visit(node: Node) {
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

    function hasPropertyAccessExpressionWithName(node: CallExpression, funcName: string): boolean {
        if (!isPropertyAccessExpression(node.expression)) {
            return false;
        }

        return node.expression.name.text === funcName;
    }

    function getArgName(funcNode: Node, transformer: Transformer): SynthIdentifier {

        const numberOfAssignmentsOriginal = 0;
        const types: Type[] = [];

        let name: SynthIdentifier | undefined;

        if (isFunctionLikeDeclaration(funcNode)) {
            if (funcNode.parameters.length > 0) {
                const param = funcNode.parameters[0].name as Identifier;
                name = getMapEntryIfExists(param);
            }
        }
        else if (isCallExpression(funcNode) && funcNode.arguments.length > 0 && isIdentifier(funcNode.arguments[0])) {
            name = { identifier: funcNode.arguments[0] as Identifier, types, numberOfAssignmentsOriginal };
        }
        else if (isIdentifier(funcNode)) {
            name = getMapEntryIfExists(funcNode);
        }

        if (!name || name.identifier === undefined || name.identifier.text === "_" || name.identifier.text === "undefined") {
            return { identifier: createIdentifier(""), types, numberOfAssignmentsOriginal };
        }

        return name;

        function getMapEntryIfExists(identifier: Identifier): SynthIdentifier {
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