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

        // rename conflicting variables
        let varNamesMap: Map<string> = new MapCtr();
        let allVarNames: string[] = [];

        forEachChild(funcToConvert, function visit(node: Node) {
            if (isIdentifier(node)) {
                let symbol = checker.getSymbolAtLocation(node);
                if (symbol && !varNamesMap.get(String(getSymbolId(symbol)))) {
                    const numVarsSameName = allVarNames.filter(elem => elem === node.text).length;
                    allVarNames.push(node.text);
                    const newName = numVarsSameName === 0 ? node.text : node.text + "_" + numVarsSameName;
                    varNamesMap.set(String(getSymbolId(symbol)), newName);
                }
           }
           forEachChild(node, visit);
        });

        let funcToConvertClone = getSynthesizedDeepClone(funcToConvert, true, varNamesMap, checker);

        
        const retStmts: ReturnStatement[] = getReturnStatementsWithPromiseCallbacks(funcToConvertClone);
        for (const stmt of retStmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (isCallExpression(node)) {
                    const newNode = parseCallback(node, checker,  node);
                    if (newNode.length > 0) {
                        changes.replaceNodeWithNodes(sourceFile, stmt, newNode);
                    }
                }
                else if (!isFunctionLike(node)) {
                    forEachChild(node, visit);
                }
            });
        }
    }

    function returnsAPromise(node: CallExpression, checker: TypeChecker): boolean {
        const nodeType = checker.getTypeAtLocation(node);
        if (!nodeType) {
            return false;
        }

        return checker.isPromiseLikeType(nodeType) && !isCallback(node, "then", checker) && !isCallback(node, "catch", checker) && !isCallback(node, "finally", checker);
    }

    function parseCallback(node: Expression, checker: TypeChecker, outermostParent: CallExpression, prevArgName?: string): Statement[] {
        if (!node) {
            return [];
        }

        if (isCallExpression(node) && returnsAPromise(node, checker)) {
            return parsePromiseCall(node, checker, prevArgName);
        }
        else if (isCallExpression(node) && isCallback(node, "then", checker)) {
            return parseThen(node, checker, outermostParent, prevArgName);
        }
        else if (isCallExpression(node) && isCallback(node, "catch", checker)) {
            return parseCatch(node, checker, outermostParent);
        }
        else if (isPropertyAccessExpression(node)) {
            return parseCallback(node.expression, checker, outermostParent, prevArgName);
        }

        return [];
    }

    function parseCatch(node: CallExpression, checker: TypeChecker, outermostParent: CallExpression): Statement[] {
        const func = getSynthesizedDeepClone(node.arguments[0]);
        const argName = getArgName(func, checker);

        const tryBlock = createBlock(parseCallback(node.expression, checker, outermostParent));

        const [callbackBody, argNameNew] = getCallbackBody(func, argName, node, checker, outermostParent);
        const catchClause = createCatchClause(argNameNew, createBlock(callbackBody));

        return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined)];
    }

    function parseThen(node: CallExpression, checker: TypeChecker, outermostParent: CallExpression, prevArgName?: string): Statement[] {
        const [res, rej] = node.arguments;

        // TODO - what if this is a binding pattern and not an Identifier
        const argNameRes = getArgName(res, checker);

        if (rej) {
            //const usedCatchNames: string[] = [];
            const argNameRej = getArgName(rej, checker);

            const [callbackBody, argNameResNew] = getCallbackBody(res, argNameRes, node, checker, outermostParent);
            const tryBlock = createBlock(parseCallback(node.expression, checker, outermostParent, argNameResNew).concat(callbackBody));

            const [callbackBody2, argNameRejNew] = getCallbackBody(rej, argNameRej, node, checker, outermostParent, /* isRej */ true);
            const catchClause = createCatchClause(argNameRejNew, createBlock(callbackBody2));

            return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined) as Statement];
        }
        else if (res) {
            const [callbackBody, argNameResNew] = getCallbackBody(res, prevArgName ? prevArgName : argNameRes, node, checker, outermostParent);
            argNameResNew;
            return parseCallback(node.expression, checker, outermostParent, argNameRes).concat(callbackBody);
        }
        else {
            return parseCallback(node.expression, checker, outermostParent);
        }
    }

    function parsePromiseCall(node: CallExpression, checker: TypeChecker, argName: string | undefined): Statement[] {
        let localArgName = argName;
        if (!localArgName) {
            localArgName = getArgName(node, checker);
        }

        const varDecl = createVariableDeclaration(localArgName, /*type*/ undefined, createAwait(node));
        return argName ? [createVariableStatement(/* modifiers */ undefined, (createVariableDeclarationList([varDecl], NodeFlags.Let)))] : [createStatement(createAwait(node))];
    }

    function getNextDotThen(node: Expression, checker: TypeChecker): CallExpression | undefined {
        if (!node || !node.parent) {
            return undefined;
        }

        const parent = node.parent;
        if (parent.kind === SyntaxKind.CallExpression && isCallback(parent as CallExpression, "then", checker)) {
            return parent as CallExpression;
        }
        else {
            return getNextDotThen(node.parent as Expression, checker);
        }
    }

    function getCallbackBody(func: Node, prevArgName: string, parent: CallExpression, checker: TypeChecker, outermostParent: CallExpression, isRej = false): [NodeArray<Statement>, string] {
        switch (func.kind) {
            case SyntaxKind.Identifier:
                if (!prevArgName) {
                    break;
                }
                let synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(prevArgName)]);
                const nextDotThen = getNextDotThen(parent, checker);
                if (!nextDotThen || (<PropertyAccessExpression>parent.expression).name.text === "catch" || isRej) {
                    return [createNodeArray([createReturn(synthCall)]), prevArgName];
                }

                const tempArgName = getArgName(nextDotThen.arguments[0], checker/*, usedNames*/);
                //usedNames.push(tempArgName);

                prevArgName = getArgName(func, checker/*, usedNames*/);
                synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(prevArgName)]);
                return [createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(tempArgName, /*type*/ undefined, (createAwait(synthCall)))], NodeFlags.Let)))]), prevArgName];

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                const argName = getArgName(func, checker);

                if (isFunctionLikeDeclaration(func) && func.body && isBlock(func.body) && func.body.statements) {
                    let innerCbBody: Statement[] = [];
                    let innerRetStmts: ReturnStatement[] = getReturnStatementsWithPromiseCallbacks(func.body);
                    for (const stmt of innerRetStmts) {
                        forEachChild(stmt, function visit(node: Node) {
                            if (isCallExpression(node)) {
                                let temp = parseCallback(node, checker, outermostParent, prevArgName);
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

                    if(innerCbBody.length > 0){
                        return [createNodeArray(innerCbBody), argName];
                    }

                    return [func.body.statements, argName]; //TODO: go in here and rename all usages of argName if argName changes

                } else if (isArrowFunction(func)) {
                    //if there is another outer dot then, don't actually return
                    const nextOutermostDotThen = getNextDotThen(outermostParent, checker)
                    
                    return nextOutermostDotThen ? [createNodeArray([createReturn(func.body as Expression)]), argName]
                        : [createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(prevArgName, /*type*/ undefined, (func as ArrowFunction).body as Expression)], NodeFlags.Let)))]), argName];
                }
                break;
        }
        return [createNodeArray([]), ""];
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

    function getArgName(funcNode: Node, checker: TypeChecker, /*usedNames: string[]*/): string {
        let name;
        const funcNodeType = checker.getTypeAtLocation(funcNode);

        if (isFunctionLikeDeclaration(funcNode) && funcNode.parameters.length > 0) {
            name = (<Identifier>funcNode.parameters[0].name).text;
            /*
            if (name !== "_" && !isArgUsed(name, usedNames)) {
                return name;
            }*/
        }
        else if (funcNodeType && funcNodeType.getCallSignatures().length > 0 && funcNodeType.getCallSignatures()[0].parameters.length > 0) {
            name = funcNodeType.getCallSignatures()[0].parameters[0].name;
            /*
            if (!isArgUsed(name, usedNames)) {
                return name;
            }*/
        }
        else if (isCallExpression(funcNode) && funcNode.arguments.length > 0 && isIdentifier(funcNode.arguments[0])) {
            return (<Identifier>funcNode.arguments[0]).text;
        }

        if (name === undefined || name === "_") {
            return "";
        }

        return name; 

        /*return name + "_" + getArgName.varNameItr;*/

    }

    /*
    namespace getArgName {
        export let varNameItr = 1;
    }


    function isArgUsed(name: string, usedNames: string[]): boolean {
        const nameUsed: string[] = usedNames.filter(element => element === name);
        return nameUsed.length > 0;
    }
    */
}