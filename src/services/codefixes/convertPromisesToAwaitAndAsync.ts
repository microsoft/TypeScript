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

        let retArrayRes:[NodeArray<Statement>, string, TextRange][] = [];
        //let retArrayRej:[NodeArray<Statement>, string, TextRange][] = [];
        let retArrayCatch:[NodeArray<Statement>, string, TextRange][] = [];


        //collect what to put in the try block
        let callToAwait = findCallToAwait(funcToConvert, checker);
    
    
        findDotThen(funcToConvert, checker, true, PromiseMemberFunc.Then, retArrayRes);
        let onResTuple:[NodeArray<Statement>, string, TextRange] = retArrayRes[0]; 
        let onResBody:NodeArray<Statement>, onResFuncName:string, onResTextRange:TextRange = undefined;

        if(onResTuple){
            onResBody = onResTuple[0];
            onResFuncName = onResTuple[1];
            onResTextRange = onResTuple[2];
        }

        /*
        findDotThen(funcToConvert, checker, false, PromiseMemberFunc.Then, retArrayRej);
        let onRejTuple:[NodeArray<Statement>, string, TextRange] = retArrayRej[0];
        let onRejBody:NodeArray<Statement> = onRejTuple[0];*/
        //let onRejFuncName:string = onRejTuple[1];
        //let onRejTextRange:TextRange = onRejTuple[2];
        
        
        findDotThen(funcToConvert, checker, true, PromiseMemberFunc.Catch, retArrayCatch);
        let onCatchTuple:[NodeArray<Statement>, string, TextRange] = retArrayCatch[0];

        let onCatchTextRange = undefined;
        if(onCatchTuple){
            onCatchTextRange = onCatchTuple[2];
        }

        let tryBlock:Block = undefined;
        let catchBlock:CatchClause = undefined;

        if(!callToAwait){
            return;
        }

        let awaitNode = createAwait(callToAwait);

        if(onResTuple && onResBody && onResBody.length > 0){
            let awaitDecl = createVariableDeclarationList(createNodeArray([createVariableDeclaration(onResFuncName, undefined, awaitNode)]));
            let awaitDeclStmt = createVariableStatement(undefined, awaitDecl);
            let stmts = createNodeArray([<Statement>awaitDeclStmt]).concat(getSynthesizedDeepClones(onResBody));
            tryBlock = createBlock(stmts);
        }else{
            tryBlock = createBlock(createNodeArray([createStatement(awaitNode)]));
        }


        catchBlock = createCatchClause("e", createBlock(createCascadingCatches(retArrayCatch)));

        
        /*
        if(onRejTuple && onRejBody.length > 0){
            let stmts = createNodeArray(onRejBody);
            catchBlock = createCatchClause("e", createBlock(stmts));
        }else{
            catchBlock = createCatchClause("e", createBlock(createNodeArray()));
        }*/

        let range = onResTextRange ? onResTextRange : onCatchTextRange;
        changes.replaceRange(sourceFile, range, createTry(tryBlock, catchBlock, undefined));
    }

    function createCascadingCatches(catchArray:[NodeArray<Statement>, string, TextRange][]): NodeArray<Statement>{

        if(catchArray.length == 0){
            return undefined;
        }

        if(catchArray.length == 1){
            return getSynthesizedDeepClones(catchArray.pop()[0]);
            //just add the function call
        }

        let catchItem = catchArray.pop();
        let cascadingCatches = createCascadingCatches(catchArray);
        let catchBlock = createBlock(cascadingCatches);

        return createNodeArray([createTry(createBlock(getSynthesizedDeepClones(catchItem[0])), createCatchClause("e", catchBlock), undefined)]);
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

    enum PromiseMemberFunc{
        Then = "then",
        Catch = "catch",
    }

    function findDotThen(node:Node, checker:TypeChecker, onRes:boolean, memberFunc:PromiseMemberFunc, retArray:[NodeArray<Statement>, string, TextRange][]):void{ //[[NodeArray<Statement>, string, TextRange]]{

        const index:number = onRes ? 0 : 1;

        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === memberFunc && isPromiseType(checker.getTypeAtLocation(node.parent))){
                    let parNode = node.parent as CallExpression; 
                    if(parNode.arguments.length > index && isFunctionLikeDeclaration(parNode.arguments[index])){
                        //inlined function definitiion
                        let funcDecl:FunctionLikeDeclaration = parNode.arguments[index] as FunctionLikeDeclaration;
                        let funcBody:FunctionBody = funcDecl.body as FunctionBody;
                        retArray.push([createNodeArray(funcBody.statements), funcDecl.parameters[0].symbol.name, createTextRange(parNode.getStart(), parNode.end)]);
                        //return [createNodeArray(funcBody.statements), funcDecl.parameters[0].symbol.name, createTextRange(parNode.getStart(), parNode.end)];
                    }else if(parNode.arguments.length > index &&  isIdentifier(parNode.arguments[index])){
                        //reference to an elsewhere declared function
                        let argName = (<Identifier>(<FunctionLikeDeclaration>checker.getTypeAtLocation(parNode.arguments[index]).symbol.valueDeclaration).parameters[0].name)
                        let callExpr = createCall(parNode.arguments[index], undefined, [argName]);
                        retArray.push([createNodeArray([<Statement>createStatement(callExpr)]), argName.text, createTextRange(parNode.getStart(), parNode.end)]);
                        //return [createNodeArray([<Statement>createStatement(callExpr)]), argName.text, createTextRange(parNode.getStart(), parNode.end)]
                    }
                }
                break;
        }

        //recurse
        for( let child of node.getChildren() ){
            /*let ret = findDotThen(child, checker, onRes, memberFunc);
            if(ret){
                return ret;
            }*/
            findDotThen(child, checker, onRes, memberFunc, retArray);
        }
    }

    function isPromiseType(T:Type):boolean{
        return T.flags === TypeFlags.Object && T.symbol.name === "Promise";
    }

}