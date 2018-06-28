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
        const funcToConvert: FunctionLikeDeclaration = getContainingFunction(getTokenAtPosition(sourceFile, position, /*includeEndPosition*/ false)) as FunctionLikeDeclaration;

        // add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert);

        // const stmts: NodeArray<Statement> = (<FunctionBody>funcToConvert.body).statements;
        const retStmts: ReturnStatement[] = getReturnStatementsWithPromiseCallbacks(funcToConvert);
        for (const stmt of retStmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (node.kind === SyntaxKind.CallExpression) {
                    const usedNames: string[] = [];
                    const newNode = parseCallback(node as CallExpression, checker, usedNames);
                    if (newNode) {
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

    function parseCallback(node: Expression, checker: TypeChecker, usedNames: string[], argName?: string): Statement[] {
        if (!node) {
            return [];
        }

        if (node.kind === SyntaxKind.CallExpression && returnsAPromise(node as CallExpression, checker)) {
            return parsePromiseCall(node as CallExpression, usedNames, checker, argName);
        }
        else if (node.kind === SyntaxKind.CallExpression && isCallback(node as CallExpression, "then", checker)) {
            return parseThen(node as CallExpression, checker, usedNames);
        }
        else if (node.kind === SyntaxKind.CallExpression && isCallback(node as CallExpression, "catch", checker)) {
            return parseCatch(node as CallExpression, checker, usedNames);
        }
        else if (node.kind === SyntaxKind.PropertyAccessExpression) {
            return parseCallback((<PropertyAccessExpression>node).expression, checker, usedNames, argName);
        }

        return [];
    }

    function parseCatch(node: CallExpression, checker: TypeChecker, usedNames: string[]): Statement[] {
        //const func = getSynthesizedDeepClone(node.arguments[0]);
        const func = getSynthesizedDeepClone(node.arguments[0]);
        const argName = getArgName(func, checker, usedNames);

        const tryBlock = createBlock(parseCallback(node.expression, checker, usedNames));

        const [callbackBody, argNameNew] = getCallbackBody(func, argName, node, checker, usedNames);
        const catchClause = createCatchClause(argNameNew, createBlock(callbackBody));

        return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined)];
    }

    function parseThen(node: CallExpression, checker: TypeChecker, usedNames: string[]): Statement[] {
        const [res, rej] = node.arguments;

        // TODO - what if this is a binding pattern and not an Identifier
        const argNameRes = getArgName(res, checker, usedNames);

        if (rej) {
            const usedCatchNames: string[] = [];
            const argNameRej = getArgName(rej, checker, usedCatchNames);

            const [callbackBody, argNameResNew] = getCallbackBody(res, argNameRes, node, checker, usedNames);
            const tryBlock = createBlock(parseCallback(node.expression, checker, usedNames, argNameResNew).concat(callbackBody));

            const [callbackBody2, argNameRejNew] = getCallbackBody(rej, argNameRej, node, checker, usedCatchNames, /* isRej */ true);
            const catchClause = createCatchClause(argNameRejNew, createBlock(callbackBody2));

            return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined) as Statement];
        }
        else if (res) {
            const [callbackBody, argNameResNew] = getCallbackBody(res, argNameRes, node, checker, usedNames);
            return parseCallback(node.expression, checker, usedNames, argNameResNew).concat(callbackBody);
        }
        else {
            return parseCallback(node.expression, checker, usedNames);
        }
    }

    function parsePromiseCall(node: CallExpression, usedNames: string[], checker: TypeChecker, argName: string | undefined): Statement[] {
        let localArgName = argName;
        if (!localArgName) {
            localArgName = getArgName(node, checker, usedNames);
        }

        usedNames.push(localArgName);

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

    function getCallbackBody(func: Node, argName: string, parent: CallExpression, checker: TypeChecker, usedNames: string[], isRej = false): [NodeArray<Statement>, string] {
        switch (func.kind) {
            case SyntaxKind.Identifier:
                if (!argName) {
                    break;
                }
                let synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)]);
                const nextDotThen = getNextDotThen(parent, checker);
                if (!nextDotThen || (<PropertyAccessExpression>parent.expression).name.text === "catch" || isRej) {
                    return [createNodeArray([createReturn(synthCall)]), argName];
                }

                const tempArgName = getArgName(nextDotThen.arguments[0], checker, usedNames);
                usedNames.push(tempArgName);

                argName = getArgName(func, checker, usedNames);
                synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)]);
                return [createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(tempArgName, /*type*/ undefined, (createAwait(synthCall)))], NodeFlags.Let)))]), argName];

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                if (isFunctionLikeDeclaration(func) && func.body && isBlock(func.body) && func.body.statements) {
                    return [func.body.statements, argName];
                }
                break;
            case SyntaxKind.ArrowFunction:
                return [createNodeArray([createReturn((<ArrowFunction>func).body as Expression)]), argName];
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

    function getArgName(funcNode: Node, checker: TypeChecker, usedNames: string[]): string {
        let name;
        const funcNodeType = checker.getTypeAtLocation(funcNode);

        if (isFunctionLikeDeclaration(funcNode) && funcNode.parameters.length > 0) {
            name = (<Identifier>funcNode.parameters[0].name).text;
            if (name !== "_" && !isArgUsed(name, usedNames)) {
                return name;
            }
        }
        else if (funcNodeType && funcNodeType.getCallSignatures().length > 0 && funcNodeType.getCallSignatures()[0].parameters.length > 0) {
            name = funcNodeType.getCallSignatures()[0].parameters[0].name;
            if (!isArgUsed(name, usedNames)) {
                return name;
            }
        }
        else if (isCallExpression(funcNode) && funcNode.arguments.length > 0 && isIdentifier(funcNode.arguments[0])) {
            return (<Identifier>funcNode.arguments[0]).text;
        }

        if (name === undefined || name === "_") {
            return "";
        }

        return name + "_" + getArgName.varNameItr;
    }

    namespace getArgName {
        export let varNameItr = 1;
    }


    function isArgUsed(name: string, usedNames: string[]): boolean {
        const nameUsed: string[] = usedNames.filter(element => element === name);
        return nameUsed.length > 0;
    }
}