namespace ts.codefix {
    const fixId = "convertToAsyncFunction";
    const errorCodes = [Diagnostics.This_may_be_converted_to_an_async_function.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            const changes = textChanges.ChangeTracker.with(context, (t) => convertToAsyncFunction(t, context.sourceFile, context.span.start, context.program.getTypeChecker()));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_async_function, fixId, Diagnostics.Convert_all_to_async_functions)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncFunction(changes, err.file!, err.start, context.program.getTypeChecker())),
    });
    function convertToAsyncFunction(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker): void {
        // get the function declaration - returns a promise
        const funcToConvert: FunctionLikeDeclaration = getContainingFunction(getTokenAtPosition(sourceFile, position)) as FunctionLikeDeclaration;

        // add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert);

        let varNamesMap: Map<string> = new MapCtr();
        let synthNamesMap: Map<string> = new MapCtr();
        const funcToConvertRenamed = renameCollidingVarNames(funcToConvert, checker, varNamesMap, synthNamesMap);

        const retStmts: ReturnStatement[] = getReturnStatementsWithPromiseCallbacks(funcToConvertRenamed);
        for (const stmt of retStmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (isCallExpression(node)) {
                    const newNodes = parseCallback(node, checker, node, synthNamesMap);
                    if (newNodes.length > 0) {
                        changes.replaceNodeWithNodes(sourceFile, stmt, newNodes);
                    }
                }
                else if (!isFunctionLike(node)) {
                    forEachChild(node, visit);
                }
            });
        }
    }

    function renameCollidingVarNames(nodeToRename: Node, checker: TypeChecker, varNamesMap: Map<string>, synthNamesMap: Map<string>): Node {
        let allVarNames: string[] = [];

        forEachChild(nodeToRename, function visit(node: Node) {

            if (isIdentifier(node)) {
                let type = checker.getTypeAtLocation(node);
                let symbol = checker.getSymbolAtLocation(node);

                let newName = getNewNameIfConflict(node.text, allVarNames);

                if (symbol && type && type.getCallSignatures().length > 0 && type.getCallSignatures()[0].parameters.length > 0) {
                    // first, add the actual function name
                    if (allVarNames.filter(elem => elem === node.text).length > 0) {
                        // we have a conflict with the function name, but function names take precedence over variable names
                        varNamesMap.forEach((value: string, key: string) => {
                            if (value === node.text) {
                                varNamesMap.set(key, getNewNameIfConflict(node.text, allVarNames));
                                return;
                            }
                        });
                    }

                    varNamesMap.set(String(getSymbolId(symbol)), node.text);
                    allVarNames.push(node.text);

                    // next, add the new variable for the declaration
                    let synthName = type.getCallSignatures()[0].parameters[0].name;
                    let newSynthName = getNewNameIfConflict(synthName, allVarNames);
                    varNamesMap.set(String(getSymbolId(checker.createSymbol(SymbolFlags.BlockScopedVariable, getEscapedTextOfIdentifierOrLiteral(createIdentifier(newSynthName))))), newSynthName);
                    allVarNames.push(newSynthName);
                    synthNamesMap.set(node.text, newSynthName);
                }
                else if (symbol && !varNamesMap.get(String(getSymbolId(symbol)))) {
                    varNamesMap.set(String(getSymbolId(symbol)), newName);
                    allVarNames.push(node.text);
                }
            }

            forEachChild(node, visit);
        });

        return getSynthesizedDeepClone(nodeToRename, true, varNamesMap, checker);
    }

    function getNewNameIfConflict(name: string, allVarNames: string[]) {
        const numVarsSameName = allVarNames.filter(elem => elem === name).length;
        return numVarsSameName === 0 ? name : name + "_" + numVarsSameName;
    }

    function returnsAPromise(node: CallExpression, checker: TypeChecker): boolean {
        const nodeType = checker.getTypeAtLocation(node);
        if (!nodeType) {
            return false;
        }

        return checker.isPromiseLikeType(nodeType) && !isCallback(node, "then", checker) && !isCallback(node, "catch", checker) && !isCallback(node, "finally", checker);
    }

    function parseCallback(node: Expression, checker: TypeChecker, outermostParent: CallExpression, synthNamesMap: Map<string>, prevArgName?: string): Statement[] {
        if (!node) {
            return [];
        }

        if (isCallExpression(node) && returnsAPromise(node, checker)) {
            return parsePromiseCall(node, checker, prevArgName);
        }
        else if (isCallExpression(node) && isCallback(node, "then", checker)) {
            return parseThen(node, checker, outermostParent, synthNamesMap, prevArgName);
        }
        else if (isCallExpression(node) && isCallback(node, "catch", checker)) {
            return parseCatch(node, checker, synthNamesMap, prevArgName);
        }
        else if (isPropertyAccessExpression(node)) {
            return parseCallback(node.expression, checker, outermostParent, synthNamesMap, prevArgName);
        }

        return [];
    }

    function parseCatch(node: CallExpression, checker: TypeChecker, synthNamesMap: Map<string>, prevArgName?: string): Statement[] {
        const func = getSynthesizedDeepClone(node.arguments[0]);
        const argName = getArgName(func, checker, synthNamesMap);

        const tryBlock = createBlock(parseCallback(node.expression, checker, node, synthNamesMap, argName));

        const callbackBody = getCallbackBody(func, prevArgName, argName, node, checker, synthNamesMap);
        const catchClause = createCatchClause(argName, createBlock(callbackBody));

        return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined)];
    }

    function parseThen(node: CallExpression, checker: TypeChecker, outermostParent: CallExpression, synthNamesMap: Map<string>, prevArgName?: string): Statement[] {
        const [res, rej] = node.arguments;

        // TODO - what if this is a binding pattern and not an Identifier
        if (!res) {
            return parseCallback(node.expression, checker, outermostParent, synthNamesMap, prevArgName);
        }


        const argNameRes = getArgName(res, checker, synthNamesMap);
        const callbackBody = getCallbackBody(res, prevArgName, argNameRes, node, checker, synthNamesMap);

        if (rej) {
            const argNameRej = getArgName(rej, checker, synthNamesMap);

            const tryBlock = createBlock(parseCallback(node.expression, checker, node, synthNamesMap, argNameRes).concat(callbackBody));

            const callbackBody2 = getCallbackBody(rej, prevArgName, argNameRej, node, checker, synthNamesMap, true);
            const catchClause = createCatchClause(argNameRej, createBlock(callbackBody2));

            return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined) as Statement];
        }
        else if (res) {
            return parseCallback(node.expression, checker, node, synthNamesMap, argNameRes).concat(callbackBody);
        }

        return [];
    }

    function parsePromiseCall(node: CallExpression, checker: TypeChecker, prevArgName?: string): Statement[] {
        if (prevArgName && getNextDotThen(node.original!.parent as Expression, checker) && isPropertyAccessExpression(node.original!.parent)) {
            const varDecl = createVariableDeclaration(prevArgName, /*type*/ undefined, createAwait(node));
            return [createVariableStatement(/* modifiers */ undefined, (createVariableDeclarationList([varDecl], NodeFlags.Let)))]
        }

        return [createReturn(node)];
    }

    function getNextDotThen(node: Expression, checker: TypeChecker): CallExpression | undefined {
        if (!node) {
            return undefined;
        }

        if (isCallExpression(node) && isCallback(node, "then", checker)) {
            return node;
        }
        else {
            return getNextDotThen(node.parent as Expression, checker);
        }
    }

    function getCallbackBody(func: Node, prevArgName: string | undefined, argName: string, parent: CallExpression, checker: TypeChecker, synthNamesMap: Map<string>, isRej = false): NodeArray<Statement> {
        if (!prevArgName && argName) {
            prevArgName = argName;
        }

        switch (func.kind) {
            case SyntaxKind.Identifier:
                if (!prevArgName || !argName) {
                    break;
                }

                let synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)]);
                const nextDotThen = getNextDotThen(parent.original!.parent as Expression, checker);
                if (!nextDotThen || (<PropertyAccessExpression>parent.expression).name.text === "catch" || isRej) {
                    return createNodeArray([createReturn(synthCall)]);
                }

                synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)]);
                return createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, (createAwait(synthCall)))], NodeFlags.Let)))]);

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:

                if (isFunctionLikeDeclaration(func) && func.body && isBlock(func.body) && func.body.statements) {
                    let innerRetStmts: ReturnStatement[] = getReturnStatementsWithPromiseCallbacks(func.body as Node);
                    let innerCbBody = getInnerCallbackBody(checker, innerRetStmts, synthNamesMap, prevArgName);
                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }

                    const nextOutermostDotThen = getNextDotThen(parent.original!.parent as Expression, checker);
                    return nextOutermostDotThen ? removeReturns(func.body.statements, prevArgName!) : func.body.statements 

                } else if (isArrowFunction(func)) {
                    //if there is another outer dot then, don't actually return

                    let innerCbBody = getInnerCallbackBody(checker, [createReturn(func.body as Expression)], synthNamesMap, prevArgName);
                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }

                    const nextOutermostDotThen = getNextDotThen(parent.original!.parent as Expression, checker);

                    return nextOutermostDotThen ?
                        createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(prevArgName!, /*type*/ undefined, (func as ArrowFunction).body as Expression)], NodeFlags.Let)))]) :
                        createNodeArray([createReturn(func.body as Expression)]);
                }
                break;
        }
        return createNodeArray([]);
    }

    function removeReturns(stmts: NodeArray<Statement>, prevArgName: string): NodeArray<Statement> {
        let ret: Statement[] = [];
        for (let stmt of stmts) {
            if (isReturnStatement(stmt)) {
                if (stmt.expression){
                    ret.push(createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, stmt.expression)], NodeFlags.Let))));
                }
            } 
            else {
                ret.push(stmt);
            }
        }

        return createNodeArray(ret);
    }

    function getInnerCallbackBody(checker: TypeChecker, innerRetStmts: ReturnStatement[], synthNamesMap: Map<string>, prevArgName?: string) {
        let innerCbBody: Statement[] = [];
        for (const stmt of innerRetStmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (isCallExpression(node)) {
                    let temp = parseCallback(node, checker, node, synthNamesMap, prevArgName);
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

    function isCallback(node: CallExpression, funcName: string, checker: TypeChecker): boolean {
        // can probably get rid of this if statement 
        if (node.expression.kind !== SyntaxKind.PropertyAccessExpression) {
            return false;
        }

        const nodeType = checker.getTypeAtLocation(node);
        if (!nodeType) {
            return false;
        }

        return (<PropertyAccessExpression>node.expression).name.text === funcName && checker.isPromiseLikeType(nodeType);
    }

    function getArgName(funcNode: Node, checker: TypeChecker, synthNamesMap: Map<string>): string {
        let name;
        const funcNodeType = checker.getTypeAtLocation(funcNode);

        if (isFunctionLikeDeclaration(funcNode) && funcNode.parameters.length > 0) {
            name = (<Identifier>funcNode.parameters[0].name).text;
        }
        else if (funcNodeType && funcNodeType.getCallSignatures().length > 0 && funcNodeType.getCallSignatures()[0].parameters.length > 0) {
            name = funcNodeType.getCallSignatures()[0].parameters[0].name;
            // TODO : maybe get rid of this
        }
        else if (isCallExpression(funcNode) && funcNode.arguments.length > 0 && isIdentifier(funcNode.arguments[0])) {
            name = (<Identifier>funcNode.arguments[0]).text;
        }
        else if (isIdentifier(funcNode)) {
            name = synthNamesMap.get(funcNode.text);
        }

        if (name === undefined || name === "_") {
            return "";
        }

        return name;
    }
}