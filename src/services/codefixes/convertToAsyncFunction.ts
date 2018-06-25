namespace ts.codefix {
    const fixId = "convertToAsyncFunction";
    const errorCodes = [Diagnostics.This_may_be_converted_to_an_async_function.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            const changes = textChanges.ChangeTracker.with(context, (t) => convertToAsyncAwait(t, context.sourceFile, context.span.start, context.program.getTypeChecker()));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_async_function, fixId, Diagnostics.Convert_all_to_async_functions)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncAwait(changes, err.file!, err.start, context.program.getTypeChecker())),
    });
    function convertToAsyncAwait(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker): void {
        // get the function declaration - returns a promise
        const funcToConvert: FunctionLikeDeclaration = getContainingFunction(getTokenAtPosition(sourceFile, position, /*includeEndPosition*/ false)) as FunctionLikeDeclaration;

        // add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert);

        const stmts: NodeArray<Statement> = (<FunctionBody>funcToConvert.body).statements;
        for (const stmt of stmts) {
            forEachChild(stmt, function visit(node: Node) {
                if (node.kind === SyntaxKind.CallExpression) {
                    const newNode = parseCallback(node as CallExpression, checker);
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
        return checker.isPromiseLikeType(checker.getTypeAtLocation(node)) && !isCallback(node, "then", checker) && !isCallback(node, "catch", checker) && !isCallback(node, "finally", checker);
    }

    function parseCallback(node: Expression, checker: TypeChecker, argName?: string): Statement[] {
        if (!node) {
            return;
        }

        if (node.kind === SyntaxKind.CallExpression && returnsAPromise(node as CallExpression, checker)) {
            return parsePromiseCall(node as CallExpression, argName);
        }
        else if (node.kind === SyntaxKind.CallExpression && isCallback(node as CallExpression, "then", checker)) {
            return parseThen(node as CallExpression, checker);
        }
        else if (node.kind === SyntaxKind.CallExpression && isCallback(node as CallExpression, "catch", checker)) {
            return parseCatch(node as CallExpression, checker);
        }
        else if (node.kind === SyntaxKind.PropertyAccessExpression) {
            return parseCallback((<PropertyAccessExpression>node).expression, checker, argName);
        }
    }

    function parseCatch(node: CallExpression, checker: TypeChecker): Statement[] {
        const func = getSynthesizedDeepClone(node.arguments[0]);
        const argName = getArgName(func, checker);

        const tryBlock = createBlock(parseCallback(node.expression, checker, argName));
        const catchClause = createCatchClause(argName, createBlock(getCallbackBody(func, argName, node, checker)));

        return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined)];
    }

    function parseThen(node: CallExpression, checker: TypeChecker): Statement[] {
        const [res, rej] = node.arguments;

        // TODO - what if this is a binding pattern and not an Identifier
        const argNameRes = getArgName(res, checker);

        if (rej) {
            const argNameRej = getArgName(rej, checker);

            const tryBlock = createBlock(parseCallback(node.expression, checker, argNameRes).concat(getCallbackBody(res, argNameRes, node, checker)));
            const catchClause = createCatchClause(argNameRej, createBlock(getCallbackBody(rej, argNameRej, node, checker, /* isRej */ true)));

            return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined) as Statement];
        }
        else {
            return parseCallback(node.expression, checker, argNameRes).concat(getCallbackBody(res, argNameRes, node, checker));
        }
    }

    function parsePromiseCall(node: CallExpression, argName?: string): Statement[] {
        let localArgName = argName;
        if (!localArgName) {
            localArgName = "val"; // fix this to maybe not always create a variable declaration if not necessary
        }

        const varDecl = createVariableDeclaration(createIdentifier(localArgName), /*type*/ undefined, createAwait(node));
        return argName ? [createVariableStatement(/* modifiers */ undefined, (createVariableDeclarationList([varDecl], NodeFlags.Let)))] : [createStatement(createAwait(node))];
    }

    function getNextDotThen(node: Expression, checker: TypeChecker): CallExpression {
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

    function getCallbackBody(func: Node, argName: string, parent: CallExpression, checker: TypeChecker, isRej = false): NodeArray<Statement> {
        switch (func.kind) {
            case SyntaxKind.Identifier:
                const synthCall = createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)]);
                if (!getNextDotThen(parent, checker) || (<PropertyAccessExpression>parent.expression).name.text === "catch" || isRej) {
                    return createNodeArray([createReturn(synthCall)]);
                }

                const lastDotThen = getNextDotThen(parent, checker);
                const tempArgName = lastDotThen ? getArgName(lastDotThen.arguments[0], checker, "temp") : argName;
                return createNodeArray([createVariableStatement(/*modifiers*/ undefined, (createVariableDeclarationList([createVariableDeclaration(tempArgName, /*type*/ undefined, (createAwait(synthCall)))], NodeFlags.Let)))]);

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                if ((<FunctionDeclaration>func).body.kind === SyntaxKind.Block) {
                    return (<FunctionDeclaration>func).body.statements;
                }
                else {
                    return createNodeArray([createReturn((<ArrowFunction>func).body as Expression)]);
                }
        }
    }


    function isCallback(node: CallExpression, funcName: string, checker: TypeChecker): boolean {
        if (node.expression.kind !== SyntaxKind.PropertyAccessExpression) {
            return false;
        }
        return (<PropertyAccessExpression>node.expression).name.text === funcName && checker.isPromiseLikeType(checker.getTypeAtLocation(node));
    }

    function getArgName(funcNode: Node, checker: TypeChecker, defaultVal?: string): string {
        if (isFunctionLikeDeclaration(funcNode) && funcNode.parameters.length > 0) {
            const name = (<Identifier>funcNode.parameters[0].name).text;
            if (name !== "_") {
                return name;
            }
            else {
                return defaultVal;
            }
        }
        else if (checker.getTypeAtLocation(funcNode).getCallSignatures().length > 0 && checker.getTypeAtLocation(funcNode).getCallSignatures()[0].parameters.length > 0) {
            const name = checker.getTypeAtLocation(funcNode).getCallSignatures()[0].parameters[0].name;
            return name;
        }
        else {
            return defaultVal;
        }
    }
}