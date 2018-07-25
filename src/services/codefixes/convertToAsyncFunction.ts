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
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncFunction(changes, err.file, err.start, context.program.getTypeChecker())),
    });
    function convertToAsyncFunction(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker): void {
        // get the function declaration - returns a promise
        const funcToConvert: FunctionLikeDeclaration = getContainingFunction(getTokenAtPosition(sourceFile, position)) as FunctionLikeDeclaration;

        // add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert);

        const varNamesMap: Map<string> = new MapCtr();
        const synthNamesMap: Map<[Identifier, number]> = new MapCtr(); // number indicates the number of times it is used after declaration
        const lastDotThenMap: Map<boolean> = new MapCtr();

        const funcToConvertRenamed: FunctionLikeDeclaration = renameCollidingVarNames(funcToConvert, checker, varNamesMap, synthNamesMap);
        findLastDotThens(funcToConvertRenamed, lastDotThenMap, checker);

        let retStmts = getReturnStatementsWithPromiseCallbacks(funcToConvertRenamed);
        let allNewNodes: Map<Node[]> = new MapCtr();
        for (const stmt of retStmts) {
            if (isCallExpression(stmt)) {
                const newNodes = parseCallback(stmt, checker, stmt, synthNamesMap, lastDotThenMap);
                allNewNodes = allNewNodes.set(String(getNodeId(stmt)), newNodes);
            }
            else {
                forEachChild(stmt, function visit(node: Node) {
                    if (isCallExpression(node)) {
                        const newNodes = parseCallback(node, checker, node, synthNamesMap, lastDotThenMap);
                        allNewNodes = allNewNodes.set(String(getNodeId(stmt)), newNodes);
                    }
                    else if (!isFunctionLike(node)) {
                        forEachChild(node, visit);
                    }
                });
            }
        }

        replaceNodes(changes, sourceFile, retStmts, allNewNodes);
    }

    function replaceNodes(changes: textChanges.ChangeTracker, sourceFile: SourceFile, oldNodes_: Node[],  allNewNodes: Map<Node[]>) {
        let oldNodes = oldNodes_.slice();
        allNewNodes.forEach((value: Node[], key: string) => {
            for (let stmt of oldNodes) {
                if (String(getNodeId(stmt)) === key) {
                    changes.replaceNodeWithNodes(sourceFile, stmt, value);
                }
            }
        });
    }

    function findLastDotThens(func: FunctionLikeDeclaration, lastDotThen: Map<boolean>, checker: TypeChecker) {
        if (!func.body) {
            return;
        }

        forEachChild(func.body, function visit(node: Node) {
            if (isCallExpression(node) && isCallback(node, "then", checker)) {
                lastDotThen.set(String(getNodeId(node)), false);

                for (const arg of node.arguments) {
                    forEachChild(arg, function visit(argChild: Expression) {
                        if (isCallExpression(argChild) && (returnsAPromise(argChild, checker) || isCallback(argChild, "then", checker) || isCallback(argChild, "catch", checker))) {
                            lastDotThen.set(String(getNodeId(argChild)), false);
                        }
                    });
                }

                forEachChild(node, function visit(child: Node) {
                    if (isCallExpression(child) && (returnsAPromise(child, checker) || isCallback(child, "then", checker) || isCallback(child, "catch", checker))) {
                        if (!lastDotThen.get(String(getNodeId(child)))) {
                            lastDotThen.set(String(getNodeId(child)), true);
                        }

                        for (const arg of child.arguments) {
                            forEachChild(arg, function visit(argChild: Expression) {
                                if (isCallExpression(argChild) && (returnsAPromise(argChild, checker) || isCallback(argChild, "then", checker) || isCallback(child, "catch", checker))) {
                                    lastDotThen.set(String(getNodeId(argChild)), true);
                                }
                            });
                        }
                    }

                    forEachChild(child, visit);
                });
            }
            else {
                forEachChild(node, visit);
            }
        });
    }

    function renameCollidingVarNames(nodeToRename: FunctionLikeDeclaration, checker: TypeChecker, varNamesMap: Map<string>, synthNamesMap: Map<[Identifier, number]>): FunctionLikeDeclaration {
        const allVarNames: Identifier[] = [];

        forEachChild(nodeToRename, function visit(node: Node) {

            if (isIdentifier(node)) {
                const type = checker.getTypeAtLocation(node);
                const symbol = checker.getSymbolAtLocation(node);
                const newName = getNewNameIfConflict(node, allVarNames);

                if (symbol && type && type.getCallSignatures().length > 0 && type.getCallSignatures()[0].parameters.length > 0) {
                    // first, add the actual function name
                    if (allVarNames.filter(elem => elem.text === node.text).length > 0) {
                        // we have a conflict with the function name, but function names take precedence over variable names
                        varNamesMap.forEach((value: string, key: string) => {
                            if (value === node.text) {
                                varNamesMap.set(key, getNewNameIfConflict(node, allVarNames).text);
                                return;
                            }
                        });
                    }

                    varNamesMap.set(String(getSymbolId(symbol)), node.text);
                    allVarNames.push(node);

                    // next, add the new variable for the declaration
                    const synthName = createIdentifier(type.getCallSignatures()[0].parameters[0].name);
                    varNamesMap.set(String(getSymbolId(checker.createSymbol(SymbolFlags.BlockScopedVariable, getEscapedTextOfIdentifierOrLiteral(synthName)))), synthName.text);
                    allVarNames.push(synthName);
                    synthNamesMap.set(node.text, [synthName, allVarNames.filter(elem => elem.text === synthName.text).length]);

                }
                else if (symbol && !varNamesMap.get(String(getSymbolId(symbol)))) {
                    varNamesMap.set(String(getSymbolId(symbol)), newName.text);
                    allVarNames.push(node);
                }
            }

            forEachChild(node, visit);
        });

        return getSynthesizedDeepClone(nodeToRename, /*includeTrivia*/ true, varNamesMap, checker);
    }

    function getNewNameIfConflict(name: Identifier, allVarNames: Identifier[]): Identifier {
        const numVarsSameName = allVarNames.filter(elem => elem.text === name.text).length;
        return numVarsSameName === 0 ? name : createIdentifier(name.text + "_" + numVarsSameName);
    }

    function returnsAPromise(node: CallExpression, checker: TypeChecker): boolean {
        const nodeType = checker.getTypeAtLocation(node);
        if (!nodeType) {
            return false;
        }

        return checker.isPromiseLikeType(nodeType) && !isCallback(node, "then", checker) && !isCallback(node, "catch", checker) && !isCallback(node, "finally", checker);
    }

    function parseCallback(node: Expression, checker: TypeChecker, outermostParent: CallExpression, synthNamesMap: Map<[Identifier, number]>, lastDotThenMap: Map<boolean>, prevArgName?: [Identifier, number]): Statement[] {
        if (!node) {
            return [];
        }

        if (isCallExpression(node) && returnsAPromise(node, checker)) {
            return parsePromiseCall(node, lastDotThenMap, prevArgName);
        }
        else if (isCallExpression(node) && isCallback(node, "then", checker)) {
            return parseThen(node, checker, outermostParent, synthNamesMap, lastDotThenMap, prevArgName);
        }
        else if (isCallExpression(node) && isCallback(node, "catch", checker)) {
            return parseCatch(node, checker, synthNamesMap, lastDotThenMap, prevArgName);
        }
        else if (isPropertyAccessExpression(node)) {
            return parseCallback(node.expression, checker, outermostParent, synthNamesMap, lastDotThenMap, prevArgName);
        }

        return [];
    }

    function parseCatch(node: CallExpression, checker: TypeChecker, synthNamesMap: Map<[Identifier, number]>, lastDotThenMap: Map<boolean>, prevArgName?: [Identifier, number]): Statement[] {
        const func = getSynthesizedDeepClone(node.arguments[0]);
        const argName = getArgName(func, synthNamesMap);

        let varDecl;
        if (prevArgName && lastDotThenMap.get(String(getNodeId(node)))) {
            varDecl = createVariableStatement(/*modifiers*/ undefined, createVariableDeclarationList([createVariableDeclaration(getSynthesizedDeepClone(prevArgName[0]))], NodeFlags.Let));
        }
        const tryBlock = createBlock(parseCallback(node.expression, checker, node, synthNamesMap, lastDotThenMap, prevArgName));

        const callbackBody = getCallbackBody(func, prevArgName, argName, node, checker, synthNamesMap, lastDotThenMap);
        const catchClause = createCatchClause(argName[0].text, createBlock(callbackBody));

        const tryStatement = createTry(tryBlock, catchClause, /*finallyBlock*/ undefined);
        return varDecl ? [varDecl, tryStatement] : [tryStatement];
    }

    function parseThen(node: CallExpression, checker: TypeChecker, outermostParent: CallExpression, synthNamesMap: Map<[Identifier, number]>, lastDotThenMap: Map<boolean>, prevArgName?: [Identifier, number]): Statement[] {
        const [res, rej] = node.arguments;

        // TODO - what if this is a binding pattern and not an Identifier
        if (!res) {
            return parseCallback(node.expression, checker, outermostParent, synthNamesMap, lastDotThenMap, prevArgName);
        }

        const argNameRes = getArgName(res, synthNamesMap);

        const callbackBody = getCallbackBody(res, prevArgName, argNameRes, node, checker, synthNamesMap, lastDotThenMap);

        if (rej) {
            const argNameRej = getArgName(rej, synthNamesMap);

            const tryBlock = createBlock(parseCallback(node.expression, checker, node, synthNamesMap, lastDotThenMap, argNameRes).concat(callbackBody));

            // TODO : create a variable declaration outside of the try block IF the prevArgName is referenced outside of the try block
            const callbackBody2 = getCallbackBody(rej, prevArgName, argNameRej, node, checker, synthNamesMap, lastDotThenMap);
            const catchClause = createCatchClause(argNameRej[0].text, createBlock(callbackBody2));

            return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined) as Statement];
        }
        else if (res) {
            return parseCallback(node.expression, checker, node, synthNamesMap, lastDotThenMap, argNameRes).concat(callbackBody);
        }

        return [];
    }

    function getNodeFlags(node: Identifier, varDeclFlags?: Map<NodeFlags | undefined>): NodeFlags | undefined {
        if (varDeclFlags && varDeclFlags.has(node.text)) {
            return varDeclFlags.get(node.text);
        }
        else {
            return NodeFlags.Let;
        }
    }

    function parsePromiseCall(node: CallExpression, lastDotThenMap: Map<boolean>, prevArgName?: [Identifier, number]): Statement[] {
        const nextDotThen = lastDotThenMap.get(String(getNodeId(node)));
        const hasPrevArgName = prevArgName && prevArgName[0].text.length > 0;
        if (hasPrevArgName && nextDotThen && isPropertyAccessExpression(node.original!.parent)) {

            if (prevArgName![1] > 1) {
                return [createStatement(createAssignment(getSynthesizedDeepClone(prevArgName![0]), createAwait(node)))];
            }

            const varDecl = createVariableDeclaration(getSynthesizedDeepClone(prevArgName![0]), /*type*/ undefined, createAwait(node));
            return [createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([varDecl], /*nodeFlags*/ NodeFlags.Let)))];
        }
        else if (!hasPrevArgName && nextDotThen && isPropertyAccessExpression(node.original!.parent)) {
            return [createStatement(createAwait(node))];
        }

        return [createReturn(node)];
    }

    function getCallbackBody(func: Node, prevArgName: [Identifier, number] | undefined, argName: [Identifier, number], parent: CallExpression, checker: TypeChecker, synthNamesMap: Map<[Identifier, number]>, lastDotThenMap: Map<boolean>): NodeArray<Statement> {

        const hasPrevArgName = prevArgName && prevArgName[0].text.length > 0;
        const hasArgName = argName && argName[0].text.length > 0;
        const nextDotThen = lastDotThenMap.get(String(getNodeId(parent)));
        switch (func.kind) {
            case SyntaxKind.Identifier:
                if (!hasArgName) {
                    break;
                }

                let synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [argName[0]]);
                if (!nextDotThen) {
                    return createNodeArray([createReturn(synthCall)]);
                }

                synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [argName[0]]);

                if (!hasPrevArgName) {
                    break;
                }

                if (prevArgName![1] > 1) {
                    return createNodeArray([createStatement(createAssignment(getSynthesizedDeepClone(prevArgName![0]), createAwait(synthCall)))]);
                }

                prevArgName![1] -= 1;
                return createNodeArray([createVariableStatement(/*modifiers*/ undefined,
                    (createVariableDeclarationList([createVariableDeclaration(getSynthesizedDeepClone(prevArgName![0]), /*type*/ undefined, (createAwait(synthCall)))], NodeFlags.Let)))]);

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:

                if (isFunctionLikeDeclaration(func) && func.body && isBlock(func.body) && func.body.statements) {
                    const innerRetStmts = getReturnStatementsWithPromiseCallbacks(func.body);
                    const innerCbBody = getInnerCallbackBody(checker, innerRetStmts, synthNamesMap, lastDotThenMap, prevArgName);
                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }

                    return (nextDotThen) ? removeReturns(func.body.statements, prevArgName![0]) : func.body.statements;

                }
                else if (isArrowFunction(func)) {
                    // if there is another outer dot then, don't actually return

                    const innerRetStmts = getReturnStatementsWithPromiseCallbacks(createReturn(func.body as Expression));
                    const innerCbBody = getInnerCallbackBody(checker, innerRetStmts, synthNamesMap, lastDotThenMap, prevArgName);
                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }


                    if (hasPrevArgName && nextDotThen) {
                        if (prevArgName![1] > 1) {
                            return createNodeArray([createStatement(createAssignment(getSynthesizedDeepClone(prevArgName![0]), func.body as Expression))]);
                        }

                        prevArgName![1] -= 1;
                        return createNodeArray([createVariableStatement(/*modifiers*/ undefined,
                            (createVariableDeclarationList([createVariableDeclaration(getSynthesizedDeepClone(prevArgName![0]), /*type*/ undefined, func.body as Expression)], NodeFlags.Let)))]);
                    }
                    else {
                        return createNodeArray([createReturn(func.body as Expression)]);
                    }
                }
                break;
        }
        return createNodeArray([]);
    }

    function removeReturns(stmts: NodeArray<Statement>, prevArgName: Identifier, varDeclFlags?: Map<NodeFlags | undefined>): NodeArray<Statement> {
        const ret: Statement[] = [];
        for (const stmt of stmts) {
            if (isReturnStatement(stmt)) {
                if (stmt.expression) {
                    ret.push(createVariableStatement(/*modifiers*/ undefined,
                        (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, stmt.expression)], getNodeFlags(prevArgName, varDeclFlags)))));
                }
            }
            else {
                ret.push(stmt);
            }
        }

        return createNodeArray(ret);
    }

    function getInnerCallbackBody(checker: TypeChecker, innerRetStmts: Node[], synthNamesMap: Map<[Identifier, number]>, lastDotThenMap: Map<boolean>, prevArgName?: [Identifier, number]) {
        let innerCbBody: Statement[] = [];
        for (const stmt of innerRetStmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (isCallExpression(node)) {
                    const temp = parseCallback(node, checker, node, synthNamesMap, lastDotThenMap, prevArgName);
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
        if (node.expression.kind !== SyntaxKind.PropertyAccessExpression) {
            return false;
        }

        const nodeType = checker.getTypeAtLocation(node);
        if (!nodeType) {
            return false;
        }

        return (<PropertyAccessExpression>node.expression).name.text === funcName && checker.isPromiseLikeType(nodeType);
    }

    function getArgName(funcNode: Node, synthNamesMap: Map<[Identifier, number]>): [Identifier, number] {
        let name: [Identifier, number] | undefined;

        if (isFunctionLikeDeclaration(funcNode) && funcNode.parameters.length > 0) {
            name = [funcNode.parameters[0].name as Identifier, 1];
        }
        else if (isCallExpression(funcNode) && funcNode.arguments.length > 0 && isIdentifier(funcNode.arguments[0])) {
            name = [funcNode.arguments[0] as Identifier, 1];
        }
        else if (isIdentifier(funcNode)) {
            name = synthNamesMap.get(funcNode.text);
        }

        if (name === undefined || (name[0] && name[0].text === "_")) {
            return [createIdentifier(""), 1];
        }

        return name;
    }
}