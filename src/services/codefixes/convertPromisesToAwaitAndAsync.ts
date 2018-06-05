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
        const funcToConvert = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, false)).valueDeclaration;
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert)


        //collect what to put in the try block
        let callToAwait = findCallToAwait(funcToConvert, checker)
        let dotThen:FunctionBody = findDotThen(funcToConvert, checker);
        let tryBlock:Block = undefined;

        if(!callToAwait){
            return;
        }

        let newParNode = createAwait(callToAwait);

        if(dotThen){
            let stmts = createNodeArray([<Statement>createStatement(newParNode)]).concat(createNodeArray(dotThen.statements));
            tryBlock = createBlock(stmts);
        }else{
            tryBlock = createBlock(createNodeArray([createStatement(newParNode)]));
        }

        changes.insertNodeBefore(sourceFile, (<FunctionDeclaration>funcToConvert).body.statements[0],  createTry(tryBlock, undefined, undefined));
        changes.deleteNode(sourceFile, callToAwait);
    }



    function findCallToAwait(node: Node, checker:TypeChecker): Expression{
        switch(node.kind){
            case SyntaxKind.CallExpression:
                //let callsig = checker.getTypeAtLocation(node).getCallSignatures()[0];
                //if(cllsig && isPromiseType(checker.getReturnTypeOfSignature(callsig))){
                if(isPromiseType(checker.getTypeAtLocation(node))){
                    return node as CallExpression;
                }
        }
       
       for( let child of node.getChildren() ){
            let ret = findCallToAwait(child, checker);
            if(ret){
                return ret;
            }
        }

    }

    function findDotThen(node:Node, checker:TypeChecker): FunctionBody{
        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === "then" && isPromiseType(checker.getTypeAtLocation(node.parent))){
                    let parNode = node.parent as CallExpression; 
                    if(parNode.arguments.length > 0 && isFunctionLikeDeclaration(parNode.arguments[0])){
                        //find the body of the func in the .then() to put in the try block
                       return ((<FunctionLikeDeclaration>parNode.arguments[0]).body as FunctionBody);
                    }
                }
                break;
        }

        //recurse
        for( let child of node.getChildren() ){
            let ret = findDotThen(child, checker);
            if(ret){
                return ret;
            }
        }

    }
   
    /*
    function refactorDotThen(sourceFile: SourceFile, changes: textChanges.ChangeTracker, node: Node): FunctionBody{
        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === "then" /*and the return type of the function called is a promise!!*///){
                    //add await to the function call
                    /*
                    let newParNode = createAwait(<PropertyAccessExpression>node.parent);
                    changes.replaceNode(sourceFile, node.parent, newParNode)

                    let parNode = node.parent as CallExpression; 
                    if(parNode.arguments.length > 0 && isFunctionLikeDeclaration(parNode.arguments[0])){
                        //find the body of the func in the .then() to put in the try block
                        let funcBody:FunctionBody  = (<FunctionLikeDeclaration>parNode.arguments[0]).body as FunctionBody;
                        /*
                        let nodeStmt:ExpressionStatement = createStatement(<PropertyAccessExpression>node);

                        for(let stmt of funcBody.statements){
                            if(isExpressionStatement(stmt) && exprStmtEql(<ExpressionStatement>stmt, nodeStmt)){
                                return funcBody;
                            }
                        }

                        //add the function call that returns a promise
                        let stmts = funcBody.statements.concat(nodeStmt); //problem here - we don't want to add this node if its already there
                        funcBody.statements = createNodeArray(stmts);
                        */
                        //createTryBlock(sourceFile, changes, funcBody, [node])
                        /*
                        return funcBody;
                    }
                }
                break;
        }

        //recurse
        for( let child of node.getChildren() ){
            let ret = refactorDotThen(sourceFile, changes, child);
            if(ret){
                return ret;
            }
        }
    }
    */

    /*
    function exprStmtEql(stmt1:ExpressionStatement, stmt2:ExpressionStatement): boolean{
        if(isExpressionStatement(stmt1.expression) && isExpressionStatement(stmt2.expression)){
            return exprStmtEql((<ExpressionStatement>stmt1.expression), stmt2.expression)
        }else if(!isExpressionStatement(stmt1.expression) && !isExpressionStatement(stmt2.expression) &&
                stmt1.expression.kind === stmt2.expression.kind){
            return true;
        }else{
            return false;
        }
    }
    */
    function isPromiseType(T:Type):boolean{
        return T.flags === TypeFlags.Object && T.symbol.name === "Promise";
    }

}