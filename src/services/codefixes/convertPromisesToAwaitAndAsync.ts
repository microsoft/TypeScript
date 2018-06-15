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
        const funcToConvert: FunctionLikeDeclaration = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, /*includeEndPosition*/ false)).valueDeclaration as FunctionLikeDeclaration;
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

    function parseCallback(node: Expression, checker: TypeChecker, argName?: string): Statement[] {
        if (!node) {
            return;
        }

        if (node.kind === SyntaxKind.CallExpression && checker.isPromiseLikeType(checker.getTypeAtLocation(node)) && (<CallExpression>node).expression.kind !== SyntaxKind.PropertyAccessExpression) {
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
        let argName = getArgName(func, "arg", checker);
        
        const tryBlock = createBlock(parseCallback(node.expression, checker, argName));
        //instead of using e -> get the paramater of the catch function and use that
        const catchClause = createCatchClause(argName, createBlock(getCallbackBody(func, argName)));
        return [createTry(tryBlock, catchClause, /*finallyBlock*/ undefined)];
    }

    function parseThen(node: CallExpression, checker: TypeChecker): Statement[] {
        const res = node.arguments[0];
        const rej = node.arguments[1];
        // TODO - what if this is a binding pattern and not an Identifier
        let argNameRes = getArgName(res, "val", checker);

        if (rej) {
            let argNameRej = getArgName(rej, "e", checker);

            const tryBlock = createBlock(parseCallback(node.expression, checker, argNameRes));
            const catchClause = createCatchClause(argNameRej, createBlock(getCallbackBody(rej, argNameRej)));

            return [createTry(tryBlock, catchClause, /*finalllyBlock*/ undefined) as Statement].concat(getCallbackBody(res, argNameRes));
        }
        else {
            return parseCallback(node.expression, checker, argNameRes).concat(getCallbackBody(res, argNameRes));
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
        return (<PropertyAccessExpression>node.expression).name.text === funcName && checker.isPromiseLikeType(checker.getTypeAtLocation(node));
    }
    function getArgName(funcNode: Node, defaultVal: string, checker:TypeChecker): string{
        if (isFunctionLikeDeclaration(funcNode)) {
            return (<Identifier>funcNode.parameters[0].name).text;
        }
        else if(checker.getTypeAtLocation(funcNode).getCallSignatures().length > 0 && checker.getTypeAtLocation(funcNode).getCallSignatures()[0].parameters.length > 0) {
            let name =  checker.getTypeAtLocation(funcNode).getCallSignatures()[0].parameters[0].name
            if (name !== "_" && name !== "()"){ //do i need this? and if i do, is this correct?
                return name;
            }
            else {
                return defaultVal;
            }
        }
        else {
            return defaultVal;
        }
    }
}