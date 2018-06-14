namespace ts.codefix {
    const fixId = "convertPromisesToAwaitAndAsync";
    const errorCodes = [Diagnostics.This_may_be_converted_to_use_async_and_await.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            const changes = textChanges.ChangeTracker.with(context, (t) => convertToAsyncAwait(t, context.sourceFile, context.span.start, context.program.getTypeChecker()));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_use_async_and_await, fixId, Diagnostics.Convert_all_to_use_async_and_await)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncAwait(changes, err.file!, err.start, context.program.getTypeChecker())),
    });
    function convertToAsyncAwait(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker): void {
        // get the function declaration - returns a promise
        const funcToConvert = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, /*includeEndPosition*/ false)).valueDeclaration;
        // add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert);
        for (const child of funcToConvert.getChildren()) {
            if (child.kind === SyntaxKind.Block) {
                for (const stmt of (<Block>child).statements) {
                    const promiseCall: CallExpression = getPromiseCall(stmt);
                    const newNode = parseCallback(promiseCall, checker);

                    if (newNode) {
                       changes.replaceNodeWithNodes(sourceFile, stmt, newNode);
                    }
                }
            }
        }
    }

    function getPromiseCall(node: Node): CallExpression {
        if (node.kind === SyntaxKind.CallExpression) {
            return node as CallExpression;
        }

        for (const child of node.getChildren().filter(node => isNode(node))) {
            return getPromiseCall(child);
        }
    }

    function parseCallback(node: Expression, checker: TypeChecker, argName?: string): Statement[] {
        if (!node) {
            return;
        }

        if (node.kind === SyntaxKind.CallExpression && isPromiseType(checker.getTypeAtLocation(node)) && (<CallExpression>node).expression.kind !== SyntaxKind.PropertyAccessExpression) {
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
        const func = node.arguments[0];

        const tryBlock = createBlock(parseCallback(node.expression, checker));
        const catchClause = createCatchClause("e", createBlock(getCallbackBody(func, "e")));
        return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined)];
    }

    function parseThen(node: CallExpression, checker: TypeChecker): Statement[] {
        const res = node.arguments[0];
        const rej = node.arguments[1];
        // TODO - what if this is a binding pattern and not an Identifier
        let argName = "val";
        if (isFunctionLikeDeclaration(res)) {
            argName = (<Identifier>res.parameters[0].name).text;
        }

        if (rej) {
            const tryBlock = createBlock(parseCallback(node.expression, checker));
            const catchClause = createCatchClause("e", createBlock(getCallbackBody(rej, "e")));

            return [createTry(tryBlock, catchClause, /*finalllyBlock*/ undefined) as Statement].concat(getCallbackBody(res, argName));
        }
        else {
            return parseCallback(node.expression, checker, argName).concat(getCallbackBody(res, argName));
        }
    }

    function parsePromiseCall(node: CallExpression, argName?: string): Statement[] {
        if (!argName) {
            argName = "val"; // fix this to maybe not always create a variable declaration if not necessary
        }
        return [createVariableStatement(/*modifiers*/ undefined, [createVariableDeclaration(createIdentifier(argName), /*type*/ undefined, createAwait(node))])];
    }

    function getCallbackBody(func: Node, argName: string): NodeArray<Statement> {
        switch (func.kind) {
            case SyntaxKind.Identifier:
                return createNodeArray([(createReturn(createCall(func as Identifier, /*typeArguments*/ undefined, [createIdentifier(argName)])))]);
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
                if ((<FunctionDeclaration>func).body.kind === SyntaxKind.Block) {
                    return (<FunctionDeclaration>func).body.statements;
                }
                else {
                    return createNodeArray([createStatement((<ArrowFunction>func).body as Expression)]);
                }
        }
    }
    function isCallback(node: CallExpression, funcName: string, checker: TypeChecker): boolean {
        if (node.expression.kind !== SyntaxKind.PropertyAccessExpression) {
            return false;
        }
        return (<PropertyAccessExpression>node.expression).name.text === funcName && isPromiseType(checker.getTypeAtLocation(node));
    }
   function isPromiseType(T: Type): boolean {
        return T.flags === TypeFlags.Object && T.symbol.name === "Promise";
    }
}