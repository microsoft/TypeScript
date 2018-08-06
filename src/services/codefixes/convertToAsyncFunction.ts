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


    interface SynthIdentifier {
        identifier: Identifier;
        numberOfUsesOriginal: number;
        numberOfUsesSynthesized: number;
    }

    class Transformer {
        checker: TypeChecker;
        synthNamesMap: Map<SynthIdentifier>;
        lastDotThenMap: Map<boolean>;
        context: CodeFixContextBase;
        constIdentifiers: Identifier[];
        originalTypeMap: Map<Type>;
        constructor(_checker: TypeChecker, _synthNamesMap: Map<SynthIdentifier>, _lastDotThenMap: Map<boolean>, _context: CodeFixContextBase, _constIdentifiers: Identifier[], _originalTypeMap: Map<Type>) {
            this.checker = _checker;
            this.synthNamesMap = _synthNamesMap;
            this.lastDotThenMap = _lastDotThenMap;
            this.context = _context;
            this.constIdentifiers = _constIdentifiers;
            this.originalTypeMap = _originalTypeMap;
        }
    }

    function convertToAsyncFunction(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker, context: CodeFixContextBase): void {
        // get the function declaration - returns a promise
        const functionToConvert: FunctionLikeDeclaration = getContainingFunction(getTokenAtPosition(sourceFile, position)) as FunctionLikeDeclaration;
        if (!functionToConvert) {
            return;
        }

        const synthNamesMap: Map<SynthIdentifier> = createMap(); // number indicates the number of times it is used after declaration
        const originalTypeMap: Map<Type> = createMap();
        const lastDotThenMap = findLastDotThens(functionToConvert, checker);
        const functionToConvertRenamed: FunctionLikeDeclaration = renameCollidingVarNames(functionToConvert, checker, synthNamesMap, context, lastDotThenMap, originalTypeMap);
        const constIdentifiers = getConstIdentifiers(synthNamesMap);
        const returnStatements = getReturnStatementsWithPromiseCallbacks(functionToConvertRenamed);
        const transformer = new Transformer(checker, synthNamesMap, lastDotThenMap, context, constIdentifiers, originalTypeMap);

        if (!returnStatements.length) {
            return;
        }

        // add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, functionToConvert);

        const allNewNodes: Map<Node[]> = createMap();

        function startTransformation(node: CallExpression, nodeToReplace: Node) {
            const newNodes = transformCallback(node, transformer, node);
            if (newNodes.length) {
                allNewNodes.set(getNodeId(nodeToReplace).toString(), newNodes);
            }
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

        replaceNodes(changes, sourceFile, returnStatements, allNewNodes);
    }

    function replaceNodes(changes: textChanges.ChangeTracker, sourceFile: SourceFile, oldNodes: Node[], allNewNodes: Map<Node[]>) {
        for (const statement of oldNodes) {
            const newNodes = allNewNodes.get(getNodeId(statement).toString());
            if (newNodes) {
                changes.replaceNodeWithNodes(sourceFile, statement, newNodes);
            }
        }
    }

    function getConstIdentifiers(synthNamesMap: Map<SynthIdentifier>): Identifier[] {
        const constIdentifiers: Identifier[] = [];
        synthNamesMap.forEach((val) => {
            if (val.numberOfUsesOriginal === 0) {
                constIdentifiers.push(val.identifier);
            }
        });
        return constIdentifiers;
    }

    function findLastDotThens(func: FunctionLikeDeclaration, checker: TypeChecker): Map<boolean> {
        if (!func.body) {
            return createMap();
        }


        // maps nodes to boolean - true indicates that there is another .then() in the callback chain
        const lastDotThen: Map<boolean> = createMap();

        forEachChild(func.body, function visit(node: Node) {
            const nodeType = checker.getTypeAtLocation(node);
            if (isCallExpression(node) && nodeType && !!checker.getPromisedTypeOfPromise(nodeType) && hasPropertyAccessExpressionWithName(node, "then")) {
                // false - there is no following .then() in the callback chain
                lastDotThen.set(getNodeId(node).toString(), false);


                forEachChild(node, function checkChildren(child: Node) {
                    forEachChild(child, checkChildren);

                    const nodeType = checker.getTypeAtLocation(child);
                    if (isCallExpression(child) && nodeType && !!checker.getPromisedTypeOfPromise(nodeType) && hasPropertyAccessExpressionWithName(child, "then")
                        && child.parent && !isPropertyAccessExpression(child.parent) && lastDotThen.get(getNodeId(child.parent).toString()) === false) {


                        // false - there is no following .then() in the callback chain
                        lastDotThen.set(getNodeId(child).toString(), false);
                    }
                    else if (isCallExpression(child) || isIdentifier(child) && nodeType && checker.getPromisedTypeOfPromise(nodeType)) {

                        // true - there is a following .then() in the callback chain
                        lastDotThen.set(getNodeId(child).toString(), true);
                    }
                });
            }
            else {
                forEachChild(node, visit);
            }
        });

        return lastDotThen;
    }

    function isFunctionRef(node: Node): boolean {
        const callExpr = climbPastPropertyAccess(node);
        return !isCallExpression(callExpr) || callExpr.expression !== node;
    }

    function declaredInFile(symbol: Symbol, sourceFile: SourceFile): boolean {
        return symbol.valueDeclaration && symbol.valueDeclaration.getSourceFile() === sourceFile;
    }

    // varNamesMap holds all of the variables in original source code. synthNamesMap holds all of the variables created by the refactor
    function renameCollidingVarNames(nodeToRename: FunctionLikeDeclaration, checker: TypeChecker, synthNamesMap: Map<SynthIdentifier>, context: CodeFixContextBase, lastDotThenMap: Map<boolean>, originalType: Map<Type>): FunctionLikeDeclaration {
        const allVarNames: [Identifier, Symbol][] = [];

        forEachChild(nodeToRename, function visit(node: Node) {
            const symbol = checker.getSymbolAtLocation(node);
            const isDefinedInFile = symbol ? declaredInFile(symbol, context.sourceFile) : undefined;

            if (isIdentifier(node) && symbol && isDefinedInFile) {
                const type = checker.getTypeAtLocation(node);

                // if the identifier refers to a function
                if (type && type.getCallSignatures().length > 0 && isFunctionRef(node)) {
                    if (type.getCallSignatures()[0].parameters.length && !synthNamesMap.get(getSymbolId(symbol).toString())) {
                        // add the new synthesized variable for the declaration (ex. blob in let blob = res(arg))
                        const synthName = getNewNameIfConflict(createIdentifier(type.getCallSignatures()[0].parameters[0].name), allVarNames);
                        synthNamesMap.set(getSymbolId(symbol).toString(), synthName);
                        allVarNames.push([synthName.identifier, symbol]);
                    }
                }
                else if (node.parent && isParameter(node.parent) || isVariableDeclaration(node.parent)) {
                    const newName = getNewNameIfConflict(node, allVarNames);
                    let setName = false;

                    for (const ident of allVarNames) {
                        if (ident[0].text === node.text && ident[1] !== symbol) {
                            synthNamesMap.set(getSymbolId(symbol).toString(), newName);
                            allVarNames.push([newName.identifier, symbol]);
                            setName = true;
                        }
                    }

                    if (!setName) {
                        synthNamesMap.set(getSymbolId(symbol).toString(), { identifier: getSynthesizedDeepClone(node), numberOfUsesOriginal: allVarNames.filter(elem => elem[0].text === node.text).length, numberOfUsesSynthesized: 0 });
                        if (node.parent && (isParameter(node.parent) && lastDotThenMap.get(getNodeId(node.parent.parent.parent).toString())) || isVariableDeclaration(node.parent)) {
                            allVarNames.push([node, symbol]);
                        }
                    }
                }
            }
            else {
                forEachChild(node, visit);
            }
        });

        return getSynthesizedDeepClone(nodeToRename, /*includeTrivia*/ true, synthNamesMap, lastDotThenMap, checker, originalType);
    }

    function getNewNameIfConflict(name: Identifier, allVarNames: [Identifier, Symbol][]): SynthIdentifier {
        const numVarsSameName = allVarNames.filter(elem => elem[0].text === name.text).length;
        return numVarsSameName === 0 ? { identifier: name, numberOfUsesOriginal: 0, numberOfUsesSynthesized: 0 } : { identifier: createIdentifier(name.text + "_" + numVarsSameName), numberOfUsesOriginal: 0, numberOfUsesSynthesized: 0 };
    }

    function returnsAPromise(node: Expression, nodeType: Type, checker: TypeChecker): boolean {
        return (!isCallExpression(node) || !hasPropertyAccessExpressionWithName(node, "then") && !hasPropertyAccessExpressionWithName(node, "catch")) && !!checker.getPromisedTypeOfPromise(nodeType);
    }

    // dispatch function to recursively build the refactoring
    function transformCallback(node: Expression, transformer: Transformer, outermostParent: CallExpression, prevArgName?: SynthIdentifier): Statement[] {
        if (!node) {
            return [];
        }

        let nodeType = transformer.checker.getTypeAtLocation(node);
        if (nodeType && (<IntrinsicType>nodeType).intrinsicName === "error" && isIdentifier(node)) {
            nodeType = transformer.originalTypeMap.get(node.text);
        }

        if (isCallExpression(node) && hasPropertyAccessExpressionWithName(node, "then") && nodeType && !!transformer.checker.getPromisedTypeOfPromise(nodeType)) {
            return transformThen(node, transformer, outermostParent, prevArgName);
        }
        else if (isCallExpression(node) && hasPropertyAccessExpressionWithName(node, "catch") && nodeType && !!transformer.checker.getPromisedTypeOfPromise(nodeType)) {
            return transformCatch(node, transformer, prevArgName);
        }
        else if (isPropertyAccessExpression(node)) {
            return transformCallback(node.expression, transformer, outermostParent, prevArgName);
        }
        else if (nodeType && returnsAPromise(node, nodeType, transformer.checker)) {
            return transformPromiseCall(node, transformer, prevArgName);
        }

        return [];
    }

    function transformCatch(node: CallExpression, transformer: Transformer, prevArgName?: SynthIdentifier): Statement[] {
        const func = node.arguments[0];
        const argName = getArgName(func, transformer);

        let varDecl;
        if (prevArgName && transformer.lastDotThenMap.get(getNodeId(node).toString())) {
            varDecl = createVariableStatement(/*modifiers*/ undefined, createVariableDeclarationList([createVariableDeclaration(getSynthesizedDeepClone(prevArgName.identifier))], NodeFlags.Let));
            prevArgName.numberOfUsesOriginal += 2;
        }
        const tryBlock = createBlock(transformCallback(node.expression, transformer, node, prevArgName));

        const callbackBody = getCallbackBody(func, prevArgName, argName, node, transformer);
        const catchClause = createCatchClause(argName.identifier.text, createBlock(callbackBody));

        const tryStatement = createTry(tryBlock, catchClause, /*finallyBlock*/ undefined);
        return varDecl ? [varDecl, tryStatement] : [tryStatement];
    }

    function transformThen(node: CallExpression, transformer: Transformer, outermostParent: CallExpression, prevArgName?: SynthIdentifier): Statement[] {
        const [res, rej] = node.arguments;

        if (!res) {
            return transformCallback(node.expression, transformer, outermostParent);
        }

        const argNameRes = getArgName(res, transformer);
        const callbackBody = getCallbackBody(res, prevArgName, argNameRes, node, transformer);

        if (rej) {
            const argNameRej = getArgName(rej, transformer);

            const tryBlock = createBlock(transformCallback(node.expression, transformer, node, argNameRes).concat(callbackBody));

            const callbackBody2 = getCallbackBody(rej, prevArgName, argNameRej, node, transformer);
            const catchClause = createCatchClause(argNameRej.identifier.text, createBlock(callbackBody2));

            return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined) as Statement];
        }
        else {
            return transformCallback(node.expression, transformer, node, argNameRes).concat(callbackBody);
        }

        return [];
    }

    function getFlagOfIdentifier(node: Identifier, constIdentifiers: Identifier[]): NodeFlags {
        const inArr: boolean = constIdentifiers.some(elem => elem.text === node.text);
        return inArr ? NodeFlags.Const : NodeFlags.Let;
    }

    function transformPromiseCall(node: Expression, transformer: Transformer, prevArgName?: SynthIdentifier): Statement[] {
        const nextDotThen = transformer.lastDotThenMap.get(getNodeId(node).toString());
        const hasPrevArgName = prevArgName && prevArgName.identifier.text.length > 0;
        const originalNodeParent = node.original ? node.original.parent : node.parent;
        if (hasPrevArgName && nextDotThen && (!originalNodeParent || isPropertyAccessExpression(originalNodeParent))) {
            return createVariableDeclarationOrAssignment(prevArgName!, createAwait(node), transformer).concat(); // hack to make the types match
        }
        else if (!hasPrevArgName && nextDotThen && (!originalNodeParent || isPropertyAccessExpression(originalNodeParent))) {
            return [createStatement(createAwait(node))];
        }

        return [createReturn(getSynthesizedDeepClone(node))];
    }

    function createVariableDeclarationOrAssignment(prevArgName: SynthIdentifier, rightHandSide: Expression, transformer: Transformer): NodeArray<Statement> {
        if (prevArgName.numberOfUsesSynthesized < prevArgName.numberOfUsesOriginal) {
            prevArgName.numberOfUsesSynthesized += 1;
            debugger;
            return createNodeArray([createStatement(createAssignment(getSynthesizedDeepClone(prevArgName.identifier), rightHandSide))]);
        }

        return createNodeArray([createVariableStatement(/*modifiers*/ undefined,
            (createVariableDeclarationList([createVariableDeclaration(getSynthesizedDeepClone(prevArgName.identifier), /*type*/ undefined, rightHandSide)], getFlagOfIdentifier(prevArgName.identifier, transformer.constIdentifiers))))]);
    }

    function getCallbackBody(func: Node, prevArgName: SynthIdentifier | undefined, argName: SynthIdentifier, parent: CallExpression, transformer: Transformer): NodeArray<Statement> {

        const hasPrevArgName = prevArgName && prevArgName.identifier.text.length > 0;
        const hasArgName = argName && argName.identifier.text.length > 0;
        const nextDotThen = transformer.lastDotThenMap.get(getNodeId(parent).toString());
        switch (func.kind) {
            case SyntaxKind.Identifier:
                if (!hasArgName) {
                    break;
                }

                const synthCall = createCall(getSynthesizedDeepClone(func) as Identifier, /*typeArguments*/ undefined, [argName.identifier]);
                if (!nextDotThen) {
                    return createNodeArray([createReturn(synthCall)]);
                }

                if (!hasPrevArgName) {
                    break;
                }

                return createVariableDeclarationOrAssignment(prevArgName!, createAwait(synthCall), transformer);

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                // Arrow functions with block bodies { } will enter this control flow
                if (isFunctionLikeDeclaration(func) && func.body && isBlock(func.body) && func.body.statements) {
                    const indices = getReturnStatementsWithPromiseCallbacksIndices(func.body);
                    let refactoredStmts: Statement[] = [];

                    for (let i = 0; i < func.body.statements.length; i++) {
                        const statement = func.body.statements[i];
                        if (indices.some(elem => elem === i)) {
                            refactoredStmts = refactoredStmts.concat(getInnerCallbackBody(transformer, [statement], prevArgName));
                        }
                        else {
                            refactoredStmts.push(statement);
                        }
                    }

                    return nextDotThen ? removeReturns(createNodeArray(refactoredStmts), prevArgName!.identifier, transformer.constIdentifiers) : getSynthesizedDeepClones(createNodeArray(refactoredStmts));
                }
                else {
                    const funcBody = (<ArrowFunction>func).body;
                    const innerRetStmts = getReturnStatementsWithPromiseCallbacks(createReturn(funcBody as Expression));
                    const innerCbBody = getInnerCallbackBody(transformer, innerRetStmts, prevArgName);

                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }

                    if (hasPrevArgName && nextDotThen) {
                        return createVariableDeclarationOrAssignment(prevArgName!, getSynthesizedDeepClone(funcBody) as Expression, transformer);
                    }
                    else {
                        return createNodeArray([createReturn(getSynthesizedDeepClone(funcBody) as Expression)]);
                    }
                }
                break;
        }
        return createNodeArray([]);
    }

    function getReturnStatementsWithPromiseCallbacksIndices(block: Block): number[] {
        const indices: number[] = [];
        for (let i = 0; i < block.statements.length; i++) {
            const statement = block.statements[i];
            if (getReturnStatementsWithPromiseCallbacks(statement).length) {
                indices.push(i);
            }
        }
        return indices;
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


    function getInnerCallbackBody(transformer: Transformer, innerRetStmts: Node[], prevArgName?: SynthIdentifier) {

        let innerCbBody: Statement[] = [];
        for (const stmt of innerRetStmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (isCallExpression(node)) {
                    const temp = transformCallback(node, transformer, node, prevArgName);
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

        function getMapEntryIfExists(node: Identifier): SynthIdentifier {
            const originalNode = getOriginalNode(node);
            const symbol = getSymbol(originalNode);

            if (!symbol) {
                return { identifier: node, numberOfUsesOriginal: 0, numberOfUsesSynthesized: 0 };
            }

            const mapEntry = transformer.synthNamesMap.get(getSymbolId(symbol).toString());
            return mapEntry || { identifier: node, numberOfUsesOriginal: 0, numberOfUsesSynthesized: 0 };
        }

        function getSymbol(node: Node): Symbol | undefined {
            return node.symbol ? node.symbol : transformer.checker.getSymbolAtLocation(node);
        }

        function getOriginalNode(node: Node): Node {
            return node.original ? node.original : node;
        }

        let name: SynthIdentifier | undefined;

        if (isFunctionLikeDeclaration(funcNode)) {
            if (funcNode.parameters.length > 0) {
                const param = funcNode.parameters[0].name as Identifier;
                name = getMapEntryIfExists(param);
            }
        }
        else if (isCallExpression(funcNode) && funcNode.arguments.length > 0 && isIdentifier(funcNode.arguments[0])) {
            name = { identifier: funcNode.arguments[0] as Identifier, numberOfUsesOriginal: 0, numberOfUsesSynthesized: 0 };
        }
        else if (isIdentifier(funcNode)) {
            name = getMapEntryIfExists(funcNode);
        }

        if (!name || name.identifier === undefined || name.identifier.text === "_" || name.identifier.text === "undefined") {
            return { identifier: createIdentifier(""), numberOfUsesOriginal: 0, numberOfUsesSynthesized: 0 };
        }

        return name;
    }
}