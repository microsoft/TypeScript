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
        const synthNamesMap: Map<string> = new MapCtr();
        const lastDotThenMap: Map<boolean> = new MapCtr();
        const funcToConvertRenamed: FunctionLikeDeclaration = renameCollidingVarNames(funcToConvert, checker, varNamesMap, synthNamesMap);
        findLastDotThens(funcToConvertRenamed, lastDotThenMap, checker);

        const [retStmts, varDeclFlags, hasFollowingReturn] = getReturnStatementsWithPromiseCallbacks(funcToConvertRenamed, checker);

        const retStmtsMap: Map<Node[]> = seperateCallbacksByVariable(retStmts, checker);
        retStmtsMap.forEach((stmts: Node[]) => {
            const glued = glueTogetherCallbacks(stmts);
            const gluedCallback = glued[0];
            let retStmtName = glued[1];
            if (gluedCallback) {
                const newNodes = parseCallback(gluedCallback, checker, gluedCallback, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, retStmtName);
                replaceNodes(changes, sourceFile, stmts, newNodes);
            }
            else {
                for (const stmt of stmts) {
                    if (isCallExpression(stmt)) {
                        const newNodes = parseCallback(stmt, checker, stmt, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, retStmtName);
                        replaceNodes(changes, sourceFile, stmts, newNodes);
                    }
                    else if (isReturnStatement(stmt) && stmt.expression && isIdentifier(stmt.expression)) {
                        retStmtName = stmt.expression.text;
                    }
                    else {
                        forEachChild(stmt, function visit(node: Node) {

                            if (isReturnStatement(node) && node.expression && isIdentifier(node.expression)) {
                                retStmtName = node.expression.text;
                            }

                            if (isCallExpression(node)) {
                                const newNodes = parseCallback(node, checker, node, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, retStmtName);
                                replaceNodes(changes, sourceFile, stmts, newNodes);
                            }
                            else if (!isFunctionLike(node)) {
                                forEachChild(node, visit);
                            }
                        });
                    }
                }
            }
        });
    }

    function replaceNodes(changes: textChanges.ChangeTracker, sourceFile: SourceFile, oldNodes: Node[], newNodes: Node[]) {
        if (oldNodes.length > 0 && isReturnStatement(oldNodes[0]) && (<ReturnStatement>oldNodes[0]).expression && isIdentifier((<ReturnStatement>oldNodes[0]).expression!)) {
            oldNodes = oldNodes.slice(1);
        }

        let i = 0;
        while (i < oldNodes.length && i < newNodes.length) {
            if (i === oldNodes.length - 1 && i < newNodes.length - 1) {
                changes.replaceNodeWithNodes(sourceFile, oldNodes[i], newNodes.slice(i));
            }
            else if (i < oldNodes.length - 1 && i === newNodes.length - 1){
                changes.replaceNodeRange(sourceFile, oldNodes[i], oldNodes[oldNodes.length - 1], newNodes[i]);
            }
            else {
                changes.replaceNode(sourceFile, oldNodes[i], newNodes[i]);
            }
            i++;
        }
    }

    function seperateCallbacksByVariable(retStmts: Node[], checker: TypeChecker): Map<Node[]> {
        let returnMap: Map<Node[]> = new MapCtr();
        let promiseVars: Map<string[]> = new MapCtr();

        function getNameAndExpr(stmt: Node): [Node, Identifier | undefined] {
            let expr: Node;
            let name: Identifier | undefined;
            if (isVariableStatement(stmt) && stmt.declarationList.declarations.length > 0) {
                expr = stmt; //fix this for a varDeclList
                name = stmt.declarationList.declarations[0].name as Identifier;
            }
            else if (isAssignmentExpression(stmt)) {
                expr = stmt;
                name = isIdentifier(stmt.left) ? stmt.left : undefined;
            }
            else if (isCallExpression(stmt)) {
                expr = stmt;
                forEachChild(stmt, function visit(node: Node) {
                    if (!name && isPropertyAccessExpression(node) && isIdentifier(node.expression)) {
                        name = node.expression;
                    }
                    else {
                        forEachChild(node, visit);
                    }
                });
            }
            else if (isReturnStatement(stmt) && stmt.expression && isIdentifier(stmt.expression)) {
                expr = stmt;
                name = stmt.expression;
            }
            else {
                expr = stmt;
            }

            return [expr, name];
        }

        for (let stmt of retStmts) {
            let expr: Node;
            let name: Identifier | undefined;

            if (isExpressionStatement(stmt)) {
                expr = stmt;
                name = getNameAndExpr(stmt.expression)[1];
            } 
            else {
                [expr, name] = getNameAndExpr(stmt);
            }

            if (!expr) {
                continue;
            }

            let added = false;
            promiseVars.forEach((names: string[], varName: string) => {
                if (isUsedIn(names.concat(varName), expr)) {
                    addToMap(returnMap, varName, expr);
                    added = true;

                    if (isVariableStatement(expr) || isAssignmentExpression(expr)) {
                        let newName = getNameAndExpr(expr)[1];
                        if (newName) {
                            addToMap(promiseVars, varName, newName.text);
                        }
                    }
                    return;
                }
            });

            if (!added && name) {
                let callExpr: Node;
                if (isVariableStatement(expr) && expr.declarationList.declarations.length === 1 && expr.declarationList.declarations[0].initializer) {
                    callExpr = expr.declarationList.declarations[0].initializer!;
                }
                else if (isAssignmentExpression(expr) && isCallExpression(expr.right) && returnsAPromise(expr.right, checker)) {
                    callExpr = expr.right;
                }
                else if (isExpressionStatement(expr)) {
                    callExpr = expr.expression;
                }
                else {
                    callExpr = expr;
                }

                if (isCallExpression(callExpr) && returnsAPromise(callExpr, checker) || isReturnStatement(callExpr)) {
                    addToMap(promiseVars, name.text, undefined);
                    addToMap(returnMap, name.text, expr);
                }
            }
        }

        if (returnMap.size === 0) {
            returnMap.set("", retStmts);
        }
        return returnMap;
    }


    function isUsedIn(variables: string[], expr: Node): boolean {
        let isUsed = false;
        forEachChild(expr, function visit(node: Node) {
            if (isIdentifier(node) && variables.filter(name => name === node.text)){
                isUsed = true;
            }
            else {
                forEachChild(node, visit);
            }
        });

        return isUsed;
    }


    function addToMap<T>(map: Map<T[]>, key: string, val: T) {
        if (!map.get(key)) {
            map.set(key, [val]);
        }
        else {
            map.get(key)!.push(val);
        }
    }

    function glueTogetherCallbacks(retStmts: Node[]): [CallExpression | undefined, string] {
        retStmts = retStmts.slice(0);
        const stmt = retStmts.pop();
        if (!stmt) {
            return [undefined, ""];
        }

        if (isExpressionStatement(stmt) && stmt.expression && isCallExpression(stmt.expression)
            && stmt.expression.expression && isPropertyAccessExpression(stmt.expression.expression)) {
            const callArgs: NodeArray<Expression> = stmt.expression.arguments;
            const funcName: Identifier = stmt.expression.expression.name;
            const [gluedExpr, retName] = glueTogetherCallbacks(retStmts);
            if (gluedExpr) {
                const propertyAccessExpr = createPropertyAccess(gluedExpr, funcName);
                return [createCall(propertyAccessExpr, /*typeArguments*/ undefined, callArgs), retName];
            }
        }
        // fix this for multiple declarations
        else if (isVariableStatement(stmt) && stmt.declarationList.declarations.length > 0 && stmt.declarationList.declarations[0].initializer) {
            const [gluedExpr, retName] = glueTogetherCallbacks(retStmts.concat(stmt.declarationList.declarations[0].initializer!));
            return [gluedExpr, retName];
        }
        else if (isCallExpression(stmt)) {
            const [gluedExpr, retName] = glueTogetherCallbacks(retStmts);
            if (gluedExpr) {
                let lhs;
                if (stmt.expression && isPropertyAccessExpression(stmt.expression)) {
                    lhs = createPropertyAccess(gluedExpr, stmt.expression.name);
                }
                else {
                    lhs = gluedExpr;
                }

                return [createCall(lhs, undefined, stmt.arguments), retName];
            }
            else {
                return [stmt, retName]
            }
        }
        else if (isReturnStatement(stmt) && stmt.expression && isIdentifier(stmt.expression)) {
            return [undefined, stmt.expression.text];
        }

        return [undefined, ""];
    }


    function findLastDotThens(func: FunctionLikeDeclaration, lastDotThen: Map<boolean>, checker: TypeChecker) {
        if (!func.body) {
            return;
        }

        forEachChild(func.body, function visit(node: Node) {
            if (isCallExpression(node) && isCallback(node, "then", checker)) {
                lastDotThen.set(String(getNodeId(node)), false);

                for (let arg of node.arguments) {
                    forEachChild(arg, function visit(argChild: Expression) {
                        if (isCallExpression(argChild) && (returnsAPromise(argChild, checker) || isCallback(argChild, "then", checker))) {
                            lastDotThen.set(String(getNodeId(argChild)), false);
                        }
                    });
                }


                forEachChild(node, function visit(child: Node) {
                    if (isCallExpression(child) && (returnsAPromise(child, checker) || isCallback(child, "then", checker))) {
                        if (!lastDotThen.get(String(getNodeId(child)))) {
                            lastDotThen.set(String(getNodeId(child)), true);
                        }

                        for (let arg of child.arguments) {
                            forEachChild(arg, function visit(argChild: Expression) {
                                if (isCallExpression(argChild) && (returnsAPromise(argChild, checker) || isCallback(argChild, "then", checker))) {
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

    function renameCollidingVarNames(nodeToRename: FunctionLikeDeclaration, checker: TypeChecker, varNamesMap: Map<string>, synthNamesMap: Map<string>): FunctionLikeDeclaration {
        const allVarNames: string[] = [];

        forEachChild(nodeToRename, function visit(node: Node) {

            if (isIdentifier(node)) {
                const type = checker.getTypeAtLocation(node);
                const symbol = checker.getSymbolAtLocation(node);
                const newName = getNewNameIfConflict(node.text, allVarNames);

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
                    const synthName = type.getCallSignatures()[0].parameters[0].name;
                    const newSynthName = getNewNameIfConflict(synthName, allVarNames);
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

        return getSynthesizedDeepClone(nodeToRename, /*includeTrivia*/ true, varNamesMap, checker);
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

    function parseCallback(node: Expression, checker: TypeChecker, outermostParent: CallExpression, synthNamesMap: Map<string>, lastDotThenMap: Map<boolean>, varDeclFlags: NodeFlags, hasFollowingReturn: boolean, prevArgName?: string): Statement[] {
        if (!node) {
            return [];
        }

        if (isCallExpression(node) && returnsAPromise(node, checker)) {
            return parsePromiseCall(node, lastDotThenMap, prevArgName, varDeclFlags);
        }
        else if (isCallExpression(node) && isCallback(node, "then", checker)) {
            return parseThen(node, checker, outermostParent, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, prevArgName);
        }
        else if (isCallExpression(node) && isCallback(node, "catch", checker)) {
            return parseCatch(node, checker, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, prevArgName);
        }
        else if (isPropertyAccessExpression(node)) {
            return parseCallback(node.expression, checker, outermostParent, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, prevArgName);
        }

        return [];
    }

    function parseCatch(node: CallExpression, checker: TypeChecker, synthNamesMap: Map<string>, lastDotThenMap: Map<boolean>, varDeclFlags: NodeFlags, hasFollowingReturn: boolean, prevArgName?: string): Statement[] {
        const func = getSynthesizedDeepClone(node.arguments[0]);
        const argName = getArgName(func, checker, synthNamesMap);

        const tryBlock = createBlock(parseCallback(node.expression, checker, node, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, argName));

        const callbackBody = getCallbackBody(func, prevArgName, argName, node, checker, synthNamesMap, lastDotThenMap, hasFollowingReturn);
        const catchClause = createCatchClause(argName, createBlock(callbackBody));

        return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined)];
    }

    function parseThen(node: CallExpression, checker: TypeChecker, outermostParent: CallExpression, synthNamesMap: Map<string>, lastDotThenMap: Map<boolean>, varDeclFlags: NodeFlags, hasFollowingReturn: boolean, prevArgName?: string): Statement[] {
        const [res, rej] = node.arguments;

        // TODO - what if this is a binding pattern and not an Identifier
        if (!res) {
            return parseCallback(node.expression, checker, outermostParent, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, prevArgName);
        }

        const argNameRes = getArgName(res, checker, synthNamesMap);
        const callbackBody = getCallbackBody(res, prevArgName, argNameRes, node, checker, synthNamesMap, lastDotThenMap, hasFollowingReturn);

        if (rej) {
            const argNameRej = getArgName(rej, checker, synthNamesMap);

            const tryBlock = createBlock(parseCallback(node.expression, checker, node, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, argNameRes).concat(callbackBody));

            const callbackBody2 = getCallbackBody(rej, prevArgName, argNameRej, node, checker, synthNamesMap, lastDotThenMap, /*isRej*/ true);
            const catchClause = createCatchClause(argNameRej, createBlock(callbackBody2));

            return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined) as Statement];
        }
        else if (res) {
            return parseCallback(node.expression, checker, node, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, argNameRes).concat(callbackBody);
        }

        return [];
    }

    function parsePromiseCall(node: CallExpression, lastDotThenMap: Map<boolean>, prevArgName?: string, varDeclFlags?: NodeFlags): Statement[] {
        const nextDotThen = lastDotThenMap.get(String(getNodeId(node)));
        if (prevArgName && nextDotThen && isPropertyAccessExpression(node.original!.parent) || (prevArgName && varDeclFlags)) {
            const varDecl = createVariableDeclaration(prevArgName, /*type*/ undefined, createAwait(node));
            return [createVariableStatement(/* modifiers */ undefined, (createVariableDeclarationList([varDecl], varDeclFlags ? varDeclFlags : NodeFlags.Let)))];
        }
        else if (!prevArgName && nextDotThen && isPropertyAccessExpression(node.original!.parent)) {
            return [createStatement(createAwait(node))];
        }

        return [createReturn(node)];
    }

    function getCallbackBody(func: Node, prevArgName: string | undefined, argName: string, parent: CallExpression, checker: TypeChecker, synthNamesMap: Map<string>, lastDotThenMap: Map<boolean>, hasFollowingReturn: boolean, isRej = false): NodeArray<Statement> {

        const nextDotThen = lastDotThenMap.get(String(getNodeId(parent)));
        switch (func.kind) {
            case SyntaxKind.Identifier:
                if (!prevArgName || !argName) {
                    break;
                }

                let synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)]);
                if (!nextDotThen || (<PropertyAccessExpression>parent.expression).name.text === "catch" || isRej) {
                    return createNodeArray([createReturn(synthCall)]);
                }

                synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)]);
                return createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, (createAwait(synthCall)))], NodeFlags.Let)))]);

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:

                if (isFunctionLikeDeclaration(func) && func.body && isBlock(func.body) && func.body.statements) {
                    const [innerRetStmts, varDeclFlags] = getReturnStatementsWithPromiseCallbacks(func.body as Node, checker);
                    const innerCbBody = getInnerCallbackBody(checker, innerRetStmts, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, prevArgName);
                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }

                    return nextDotThen ? removeReturns(func.body.statements, prevArgName!, varDeclFlags) : func.body.statements;

                }
                else if (isArrowFunction(func)) {
                    // if there is another outer dot then, don't actually return

                    const [innerRetStmts, varDeclFlags] = getReturnStatementsWithPromiseCallbacks(createReturn(func.body as Expression), checker);
                    const innerCbBody = getInnerCallbackBody(checker, innerRetStmts, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, prevArgName);
                    if (innerCbBody.length > 0) {
                        return createNodeArray(innerCbBody);
                    }

                    if (prevArgName) {
                        return (nextDotThen || hasFollowingReturn) ?
                         createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(prevArgName!, /*type*/ undefined, func.body as Expression)], varDeclFlags ? varDeclFlags : NodeFlags.Let)))]) :
                         createNodeArray([createReturn(func.body as Expression)]);
                    }
                    else {
                        return createNodeArray([createStatement(func.body as Expression)]);
                    }
               }
                break;
        }
        return createNodeArray([]);
    }

    function removeReturns(stmts: NodeArray<Statement>, prevArgName: string, varDeclFlags?: NodeFlags): NodeArray<Statement> {
        const ret: Statement[] = [];
        for (const stmt of stmts) {
            if (isReturnStatement(stmt)) {
                if (stmt.expression) {
                    ret.push(createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, stmt.expression)], varDeclFlags ? varDeclFlags : NodeFlags.Let))));
                }
            }
            else {
                ret.push(stmt);
            }
        }

        return createNodeArray(ret);
    }

    function getInnerCallbackBody(checker: TypeChecker, innerRetStmts: Node[], synthNamesMap: Map<string>, lastDotThenMap: Map<boolean>, varDeclFlags: NodeFlags, hasFollowingReturn: boolean, prevArgName?: string) {
        let innerCbBody: Statement[] = [];
        for (const stmt of innerRetStmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (isCallExpression(node)) {
                    const temp = parseCallback(node, checker, node, synthNamesMap, lastDotThenMap, varDeclFlags, hasFollowingReturn, prevArgName);
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