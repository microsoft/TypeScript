//﻿
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='TypeScript2.ts' />

module TypeScript2.AstWalkerWithDetailCallback {
    export interface AstWalkerDetailCallback {
        EmptyCallback? (pre, ast: AST2): boolean;
        EmptyExprCallback? (pre, ast: AST2): boolean;
        TrueCallback? (pre, ast: AST2): boolean;
        FalseCallback? (pre, ast: AST2): boolean;
        ThisCallback? (pre, ast: AST2): boolean;
        SuperCallback? (pre, ast: AST2): boolean;
        QStringCallback? (pre, ast: AST2): boolean;
        RegexCallback? (pre, ast: AST2): boolean;
        NullCallback? (pre, ast: AST2): boolean;
        ArrayLitCallback? (pre, ast: AST2): boolean;
        ObjectLitCallback? (pre, ast: AST2): boolean;
        VoidCallback? (pre, ast: AST2): boolean;
        CommaCallback? (pre, ast: AST2): boolean;
        PosCallback? (pre, ast: AST2): boolean;
        NegCallback? (pre, ast: AST2): boolean;
        DeleteCallback? (pre, ast: AST2): boolean;
        AwaitCallback? (pre, ast: AST2): boolean;
        InCallback? (pre, ast: AST2): boolean;
        DotCallback? (pre, ast: AST2): boolean;
        FromCallback? (pre, ast: AST2): boolean;
        IsCallback? (pre, ast: AST2): boolean;
        InstOfCallback? (pre, ast: AST2): boolean;
        TypeofCallback? (pre, ast: AST2): boolean;
        NumberLitCallback? (pre, ast: AST2): boolean;
        NameCallback? (pre, identifierAst: Identifier2): boolean;
        TypeRefCallback? (pre, ast: AST2): boolean;
        IndexCallback? (pre, ast: AST2): boolean;
        CallCallback? (pre, ast: AST2): boolean;
        NewCallback? (pre, ast: AST2): boolean;
        AsgCallback? (pre, ast: AST2): boolean;
        AsgAddCallback? (pre, ast: AST2): boolean;
        AsgSubCallback? (pre, ast: AST2): boolean;
        AsgDivCallback? (pre, ast: AST2): boolean;
        AsgMulCallback? (pre, ast: AST2): boolean;
        AsgModCallback? (pre, ast: AST2): boolean;
        AsgAndCallback? (pre, ast: AST2): boolean;
        AsgXorCallback? (pre, ast: AST2): boolean;
        AsgOrCallback? (pre, ast: AST2): boolean;
        AsgLshCallback? (pre, ast: AST2): boolean;
        AsgRshCallback? (pre, ast: AST2): boolean;
        AsgRs2Callback? (pre, ast: AST2): boolean;
        QMarkCallback? (pre, ast: AST2): boolean;
        LogOrCallback? (pre, ast: AST2): boolean;
        LogAndCallback? (pre, ast: AST2): boolean;
        OrCallback? (pre, ast: AST2): boolean;
        XorCallback? (pre, ast: AST2): boolean;
        AndCallback? (pre, ast: AST2): boolean;
        EqCallback? (pre, ast: AST2): boolean;
        NeCallback? (pre, ast: AST2): boolean;
        EqvCallback? (pre, ast: AST2): boolean;
        NEqvCallback? (pre, ast: AST2): boolean;
        LtCallback? (pre, ast: AST2): boolean;
        LeCallback? (pre, ast: AST2): boolean;
        GtCallback? (pre, ast: AST2): boolean;
        GeCallback? (pre, ast: AST2): boolean;
        AddCallback? (pre, ast: AST2): boolean;
        SubCallback? (pre, ast: AST2): boolean;
        MulCallback? (pre, ast: AST2): boolean;
        DivCallback? (pre, ast: AST2): boolean;
        ModCallback? (pre, ast: AST2): boolean;
        LshCallback? (pre, ast: AST2): boolean;
        RshCallback? (pre, ast: AST2): boolean;
        Rs2Callback? (pre, ast: AST2): boolean;
        NotCallback? (pre, ast: AST2): boolean;
        LogNotCallback? (pre, ast: AST2): boolean;
        IncPreCallback? (pre, ast: AST2): boolean;
        DecPreCallback? (pre, ast: AST2): boolean;
        IncPostCallback? (pre, ast: AST2): boolean;
        DecPostCallback? (pre, ast: AST2): boolean;
        TypeAssertionCallback? (pre, ast: AST2): boolean;
        FuncDeclCallback? (pre, funcDecl: FuncDecl): boolean;
        MemberCallback? (pre, ast: AST2): boolean;
        VarDeclCallback? (pre, varDecl: VarDecl): boolean;
        ArgDeclCallback? (pre, ast: AST2): boolean;
        ReturnCallback? (pre, ast: AST2): boolean;
        BreakCallback? (pre, ast: AST2): boolean;
        ContinueCallback? (pre, ast: AST2): boolean;
        ThrowCallback? (pre, ast: AST2): boolean;
        ForCallback? (pre, ast: AST2): boolean;
        ForInCallback? (pre, ast: AST2): boolean;
        IfCallback? (pre, ast: AST2): boolean;
        WhileCallback? (pre, ast: AST2): boolean;
        DoWhileCallback? (pre, ast: AST2): boolean;
        BlockCallback? (pre, block: Block): boolean;
        CaseCallback? (pre, ast: AST2): boolean;
        SwitchCallback? (pre, ast: AST2): boolean;
        TryCallback? (pre, ast: AST2): boolean;
        TryCatchCallback? (pre, ast: AST2): boolean;
        TryFinallyCallback? (pre, ast: AST2): boolean;
        FinallyCallback? (pre, ast: AST2): boolean;
        CatchCallback? (pre, ast: AST2): boolean;
        ListCallback? (pre, astList: ASTList2): boolean;
        ScriptCallback? (pre, script: Script): boolean;
        ClassDeclarationCallback? (pre, ast: AST2): boolean;
        InterfaceDeclarationCallback? (pre, interfaceDecl: InterfaceDeclaration): boolean;
        ModuleDeclarationCallback? (pre, moduleDecl: ModuleDeclaration): boolean;
        ImportDeclarationCallback? (pre, ast: AST2): boolean;
        WithCallback? (pre, ast: AST2): boolean;
        LabelCallback? (pre, labelAST: AST2): boolean;
        LabeledStatementCallback? (pre, ast: AST2): boolean;
        EBStartCallback? (pre, ast: AST2): boolean;
        GotoEBCallback? (pre, ast: AST2): boolean;
        EndCodeCallback? (pre, ast: AST2): boolean;
        ErrorCallback? (pre, ast: AST2): boolean;
        CommentCallback? (pre, ast: AST2): boolean;
        DebuggerCallback? (pre, ast: AST2): boolean;
        DefaultCallback? (pre, ast: AST2): boolean;
    }

    export function walk(script: Script, callback: AstWalkerDetailCallback): void {
        var pre = (cur: AST2, parent: AST2) => {
            walker.options.goChildren = AstWalkerCallback(true, cur, callback);
            return cur;
        }

        var post = (cur: AST2, parent: AST2) => {
            AstWalkerCallback(false, cur, callback);
            return cur;
        }

        var walker = TypeScript2.getAstWalkerFactory().getWalker(pre, post);
        walker.walk(script, null);
    }

    function AstWalkerCallback(pre: boolean, ast: AST2, callback: AstWalkerDetailCallback): boolean {
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