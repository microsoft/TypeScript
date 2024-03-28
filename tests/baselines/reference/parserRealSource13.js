//// [tests/cases/conformance/parser/ecmascript5/parserRealSource13.ts] ////

//// [parserRealSource13.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript.AstWalkerWithDetailCallback {
    export interface AstWalkerDetailCallback {
        EmptyCallback? (pre, ast: AST): boolean;
        EmptyExprCallback? (pre, ast: AST): boolean;
        TrueCallback? (pre, ast: AST): boolean;
        FalseCallback? (pre, ast: AST): boolean;
        ThisCallback? (pre, ast: AST): boolean;
        SuperCallback? (pre, ast: AST): boolean;
        QStringCallback? (pre, ast: AST): boolean;
        RegexCallback? (pre, ast: AST): boolean;
        NullCallback? (pre, ast: AST): boolean;
        ArrayLitCallback? (pre, ast: AST): boolean;
        ObjectLitCallback? (pre, ast: AST): boolean;
        VoidCallback? (pre, ast: AST): boolean;
        CommaCallback? (pre, ast: AST): boolean;
        PosCallback? (pre, ast: AST): boolean;
        NegCallback? (pre, ast: AST): boolean;
        DeleteCallback? (pre, ast: AST): boolean;
        AwaitCallback? (pre, ast: AST): boolean;
        InCallback? (pre, ast: AST): boolean;
        DotCallback? (pre, ast: AST): boolean;
        FromCallback? (pre, ast: AST): boolean;
        IsCallback? (pre, ast: AST): boolean;
        InstOfCallback? (pre, ast: AST): boolean;
        TypeofCallback? (pre, ast: AST): boolean;
        NumberLitCallback? (pre, ast: AST): boolean;
        NameCallback? (pre, identifierAst: Identifier): boolean;
        TypeRefCallback? (pre, ast: AST): boolean;
        IndexCallback? (pre, ast: AST): boolean;
        CallCallback? (pre, ast: AST): boolean;
        NewCallback? (pre, ast: AST): boolean;
        AsgCallback? (pre, ast: AST): boolean;
        AsgAddCallback? (pre, ast: AST): boolean;
        AsgSubCallback? (pre, ast: AST): boolean;
        AsgDivCallback? (pre, ast: AST): boolean;
        AsgMulCallback? (pre, ast: AST): boolean;
        AsgModCallback? (pre, ast: AST): boolean;
        AsgAndCallback? (pre, ast: AST): boolean;
        AsgXorCallback? (pre, ast: AST): boolean;
        AsgOrCallback? (pre, ast: AST): boolean;
        AsgLshCallback? (pre, ast: AST): boolean;
        AsgRshCallback? (pre, ast: AST): boolean;
        AsgRs2Callback? (pre, ast: AST): boolean;
        QMarkCallback? (pre, ast: AST): boolean;
        LogOrCallback? (pre, ast: AST): boolean;
        LogAndCallback? (pre, ast: AST): boolean;
        OrCallback? (pre, ast: AST): boolean;
        XorCallback? (pre, ast: AST): boolean;
        AndCallback? (pre, ast: AST): boolean;
        EqCallback? (pre, ast: AST): boolean;
        NeCallback? (pre, ast: AST): boolean;
        EqvCallback? (pre, ast: AST): boolean;
        NEqvCallback? (pre, ast: AST): boolean;
        LtCallback? (pre, ast: AST): boolean;
        LeCallback? (pre, ast: AST): boolean;
        GtCallback? (pre, ast: AST): boolean;
        GeCallback? (pre, ast: AST): boolean;
        AddCallback? (pre, ast: AST): boolean;
        SubCallback? (pre, ast: AST): boolean;
        MulCallback? (pre, ast: AST): boolean;
        DivCallback? (pre, ast: AST): boolean;
        ModCallback? (pre, ast: AST): boolean;
        LshCallback? (pre, ast: AST): boolean;
        RshCallback? (pre, ast: AST): boolean;
        Rs2Callback? (pre, ast: AST): boolean;
        NotCallback? (pre, ast: AST): boolean;
        LogNotCallback? (pre, ast: AST): boolean;
        IncPreCallback? (pre, ast: AST): boolean;
        DecPreCallback? (pre, ast: AST): boolean;
        IncPostCallback? (pre, ast: AST): boolean;
        DecPostCallback? (pre, ast: AST): boolean;
        TypeAssertionCallback? (pre, ast: AST): boolean;
        FuncDeclCallback? (pre, funcDecl: FuncDecl): boolean;
        MemberCallback? (pre, ast: AST): boolean;
        VarDeclCallback? (pre, varDecl: VarDecl): boolean;
        ArgDeclCallback? (pre, ast: AST): boolean;
        ReturnCallback? (pre, ast: AST): boolean;
        BreakCallback? (pre, ast: AST): boolean;
        ContinueCallback? (pre, ast: AST): boolean;
        ThrowCallback? (pre, ast: AST): boolean;
        ForCallback? (pre, ast: AST): boolean;
        ForInCallback? (pre, ast: AST): boolean;
        IfCallback? (pre, ast: AST): boolean;
        WhileCallback? (pre, ast: AST): boolean;
        DoWhileCallback? (pre, ast: AST): boolean;
        BlockCallback? (pre, block: Block): boolean;
        CaseCallback? (pre, ast: AST): boolean;
        SwitchCallback? (pre, ast: AST): boolean;
        TryCallback? (pre, ast: AST): boolean;
        TryCatchCallback? (pre, ast: AST): boolean;
        TryFinallyCallback? (pre, ast: AST): boolean;
        FinallyCallback? (pre, ast: AST): boolean;
        CatchCallback? (pre, ast: AST): boolean;
        ListCallback? (pre, astList: ASTList): boolean;
        ScriptCallback? (pre, script: Script): boolean;
        ClassDeclarationCallback? (pre, ast: AST): boolean;
        InterfaceDeclarationCallback? (pre, interfaceDecl: InterfaceDeclaration): boolean;
        ModuleDeclarationCallback? (pre, moduleDecl: ModuleDeclaration): boolean;
        ImportDeclarationCallback? (pre, ast: AST): boolean;
        WithCallback? (pre, ast: AST): boolean;
        LabelCallback? (pre, labelAST: AST): boolean;
        LabeledStatementCallback? (pre, ast: AST): boolean;
        EBStartCallback? (pre, ast: AST): boolean;
        GotoEBCallback? (pre, ast: AST): boolean;
        EndCodeCallback? (pre, ast: AST): boolean;
        ErrorCallback? (pre, ast: AST): boolean;
        CommentCallback? (pre, ast: AST): boolean;
        DebuggerCallback? (pre, ast: AST): boolean;
        DefaultCallback? (pre, ast: AST): boolean;
    }

    export function walk(script: Script, callback: AstWalkerDetailCallback): void {
        var pre = (cur: AST, parent: AST) => {
            walker.options.goChildren = AstWalkerCallback(true, cur, callback);
            return cur;
        }

        var post = (cur: AST, parent: AST) => {
            AstWalkerCallback(false, cur, callback);
            return cur;
        }

        var walker = TypeScript.getAstWalkerFactory().getWalker(pre, post);
        walker.walk(script, null);
    }

    function AstWalkerCallback(pre: boolean, ast: AST, callback: AstWalkerDetailCallback): boolean {
        // See if the Callback needs to be handled using specific one or default one
        var nodeType = ast.nodeType;
        var callbackString = (<any>NodeType)._map[nodeType] + "Callback";
        if (callback[callbackString]) {
            return callback[callbackString](pre, ast);
        }

        if (callback.DefaultCallback) {
            return callback.DefaultCallback(pre, ast);
        }

        return true;
    }
}

//// [parserRealSource13.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    var AstWalkerWithDetailCallback;
    (function (AstWalkerWithDetailCallback) {
        function walk(script, callback) {
            var pre = function (cur, parent) {
                walker.options.goChildren = AstWalkerCallback(true, cur, callback);
                return cur;
            };
            var post = function (cur, parent) {
                AstWalkerCallback(false, cur, callback);
                return cur;
            };
            var walker = TypeScript.getAstWalkerFactory().getWalker(pre, post);
            walker.walk(script, null);
        }
        AstWalkerWithDetailCallback.walk = walk;
        function AstWalkerCallback(pre, ast, callback) {
            // See if the Callback needs to be handled using specific one or default one
            var nodeType = ast.nodeType;
            var callbackString = NodeType._map[nodeType] + "Callback";
            if (callback[callbackString]) {
                return callback[callbackString](pre, ast);
            }
            if (callback.DefaultCallback) {
                return callback.DefaultCallback(pre, ast);
            }
            return true;
        }
    })(AstWalkerWithDetailCallback = TypeScript.AstWalkerWithDetailCallback || (TypeScript.AstWalkerWithDetailCallback = {}));
})(TypeScript || (TypeScript = {}));
