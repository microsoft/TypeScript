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

        //collect what to put in the try block
        let callToAwait = findCallToAwait(funcToConvert, checker);
        let onResTuple:[NodeArray<Statement>, string, TextRange] = findDotThen(funcToConvert, checker, true);
        let onResBody:NodeArray<Statement> = onResTuple[0];
        let onResFuncName:string = onResTuple[1];
        let onResTextRange:TextRange = onResTuple[2];

        let onRejTuple:[NodeArray<Statement>, string, TextRange] = findDotThen(funcToConvert, checker, false);
        let onRejBody:NodeArray<Statement> = onRejTuple[0];
        //let onRejFuncName:string = onRejTuple[1];
        //let onRejTextRange:TextRange = onRejTuple[2];

        let tryBlock:Block = undefined;
        let catchBlock:CatchClause = undefined;

        if(!callToAwait){
            return;
        }

        let awaitNode = createAwait(callToAwait);

        if(onResTuple && onResBody.length > 0){
            let awaitDecl = createVariableDeclarationList(createNodeArray([createVariableDeclaration(onResFuncName, undefined, awaitNode)]));
            let awaitDeclStmt = createVariableStatement(undefined, awaitDecl);
            let stmts = createNodeArray([<Statement>awaitDeclStmt]).concat(getSynthesizedDeepClones(onResBody));
            tryBlock = createBlock(stmts);
        }else{
            tryBlock = createBlock(createNodeArray([createStatement(awaitNode)]));
        }


        if(onRejTuple && onRejBody.length > 0){
            let stmts = createNodeArray(onRejBody);
            catchBlock = createCatchClause("e", createBlock(stmts));
        }else{
            catchBlock = createCatchClause("e", createBlock(createNodeArray()));
        }

        changes.replaceRange(sourceFile, onResTextRange, createTry(tryBlock, catchBlock, undefined), {prefix: "\n"})
    }



    function findCallToAwait(node: Node, checker:TypeChecker): Expression{
        switch(node.kind){
            case SyntaxKind.CallExpression:
                if(isPromiseType(checker.getTypeAtLocation(node)) && (<CallExpression>node).expression.kind !== SyntaxKind.PropertyAccessExpression){
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

    function findDotThen(node:Node, checker:TypeChecker, onRes:boolean): [NodeArray<Statement>, string, TextRange]{

        const index:number = onRes ? 0 : 1;

        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === "then" && isPromiseType(checker.getTypeAtLocation(node.parent))){
                    let parNode = node.parent as CallExpression; 
                    if(parNode.arguments.length > index && isFunctionLikeDeclaration(parNode.arguments[index])){
                        //inlined function definitiion
                        let funcDecl:FunctionLikeDeclaration = parNode.arguments[index] as FunctionLikeDeclaration;
                        let funcBody:FunctionBody = funcDecl.body as FunctionBody;
                        return [createNodeArray(funcBody.statements), funcDecl.parameters[0].symbol.name, createTextRange(parNode.pos, parNode.end)];
                    }else if(parNode.arguments.length > index &&  isIdentifier(parNode.arguments[index])){
                        //reference to an elsewhere declared function
                        let argName = (<Identifier>(<FunctionLikeDeclaration>checker.getTypeAtLocation(parNode.arguments[index]).symbol.valueDeclaration).parameters[0].name)
                        let callExpr = createCall(parNode.arguments[index], undefined, [argName]);
                        return [createNodeArray([<Statement>createStatement(callExpr)]), argName.text, createTextRange(parNode.pos, parNode.end)]
                    }
                }
                break;
        }

        //recurse
        for( let child of node.getChildren() ){
            let ret = findDotThen(child, checker, onRes);
            if(ret){
                return ret;
            }
        }

    }

    function isPromiseType(T:Type):boolean{
        return T.flags === TypeFlags.Object && T.symbol.name === "Promise";
    }

}