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
        //get the function declaration - returns a promise
        const funcToConvert = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, false)).valueDeclaration;
        //add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert)
        
       for(let child of funcToConvert.getChildren()){
            if(child.kind === SyntaxKind.Block){
                for(let stmt of (<Block>child).statements){
                    let promiseCall:CallExpression = getPromiseCall(stmt);
                    let newNode = parseCallback(promiseCall, checker);

                    if(newNode){
                       changes.replaceNodeWithNodes(sourceFile, stmt, newNode);
                    }
                }
            }
        }
    }

    function getPromiseCall(node:Node): CallExpression{
        if(node.kind == SyntaxKind.CallExpression){
            return node as CallExpression;
        }

        for( let child of node.getChildren().filter(node => isNode(node)) ){
            return getPromiseCall(child);
        }
    }
    
    
    function parseCallback(node:Expression, checker:TypeChecker): Statement[]{
        if(!node){
            return;
        }

        if(node.kind === SyntaxKind.CallExpression && isPromiseType(checker.getTypeAtLocation(node)) && (<CallExpression>node).expression.kind !== SyntaxKind.PropertyAccessExpression){
            return parsePromiseCall(node as CallExpression);
        }else if(node.kind === SyntaxKind.CallExpression && isCallback(node as CallExpression, "then", checker)){
            return parseThen(node as CallExpression, checker);
        }else if(node.kind === SyntaxKind.CallExpression && isCallback(node as CallExpression, "catch", checker)){
            return parseCatch(node as CallExpression, checker);
        }else if(node.kind === SyntaxKind.PropertyAccessExpression){
            return parseCallback((<PropertyAccessExpression>node).expression, checker)
        }
    }

    function parseCatch(node:CallExpression, checker:TypeChecker): Statement[]{
        let func= node.arguments[0];

        let tryBlock = createBlock(parseCallback(node.expression, checker));
        let catchClause = createCatchClause("e", createBlock(getCallbackBody(func, "e")))
        return [createTry(tryBlock, catchClause, undefined)]
    }

    function parseThen(node:CallExpression, checker:TypeChecker): Statement[]{
        let res = node.arguments[0];
        let rej = node.arguments[1];
        
        if(rej){
            let tryBlock = createBlock(parseCallback(node.expression, checker));
            let catchClause = createCatchClause("e", createBlock(getCallbackBody(rej, "e")));

            return [createTry(tryBlock, catchClause, undefined) as Statement].concat(getCallbackBody(res, "val"));
        }else{
            return parseCallback(node.expression, checker).concat(getCallbackBody(res,"val")); //hack -> fix this
        }
    }

    function parsePromiseCall(node:CallExpression): Statement[]{
        return [createVariableStatement(undefined, [createVariableDeclaration(createIdentifier("val"), undefined, createAwait(node))])];
    }

    function getCallbackBody(func: Node, argName: string): NodeArray<Statement>{
        switch(func.kind){
            case SyntaxKind.Identifier:
                return createNodeArray([createStatement(createCall(func as Identifier, undefined, [createIdentifier(argName)]))]);
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
                return (<FunctionDeclaration>func).body.statements;
        }
    }
   
    function isCallback(node:CallExpression, funcName:string, checker:TypeChecker):boolean{
        if(node.expression.kind !== SyntaxKind.PropertyAccessExpression){
            return false;
        }
        return (<PropertyAccessExpression>node.expression).name.text === funcName && isPromiseType(checker.getTypeAtLocation(node));
    }
    
    function isPromiseType(T:Type):boolean{
        return T.flags === TypeFlags.Object && T.symbol.name === "Promise";
    }
}