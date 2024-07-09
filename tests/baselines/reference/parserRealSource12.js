//// [tests/cases/conformance/parser/ecmascript5/parserRealSource12.ts] ////

//// [parserRealSource12.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    export interface IAstWalker {
        walk(ast: AST, parent: AST): AST;
        options: AstWalkOptions;
        state: any; // user state object
    }

    export class AstWalkOptions {
        public goChildren = true;
        public goNextSibling = true;
        public reverseSiblings = false; // visit siblings in reverse execution order

        public stopWalk(stop:boolean = true) {
            this.goChildren = !stop;
            this.goNextSibling = !stop;
        }
    }

    export interface IAstWalkCallback {
        (ast: AST, parent: AST, walker: IAstWalker): AST;
    }

    export interface IAstWalkChildren {
        (preAst: AST, parent: AST, walker: IAstWalker): void;
    }

    class AstWalker implements IAstWalker {
        constructor (
            private childrenWalkers: IAstWalkChildren[],
            private pre: IAstWalkCallback,
            private post: IAstWalkCallback,
            public options: AstWalkOptions,
            public state: any) {
        }

        public walk(ast: AST, parent: AST): AST {
            var preAst = this.pre(ast, parent, this);
            if (preAst === undefined) {
                preAst = ast;
            }
            if (this.options.goChildren) {
                var svGoSib = this.options.goNextSibling;
                this.options.goNextSibling = true;
                // Call the "walkChildren" function corresponding to "nodeType".
                this.childrenWalkers[ast.nodeType](ast, parent, this);
                this.options.goNextSibling = svGoSib;
            }
            else {
                // no go only applies to children of node issuing it
                this.options.goChildren = true;
            }
            if (this.post) {
                var postAst = this.post(preAst, parent, this);
                if (postAst === undefined) {
                    postAst = preAst;
                }
                return postAst;
            }
            else {
                return preAst;
            }
        }
    }

    export class AstWalkerFactory {
        private childrenWalkers: IAstWalkChildren[] = [];

        constructor () {
            this.initChildrenWalkers();
        }

        public walk(ast: AST, pre: IAstWalkCallback, post?: IAstWalkCallback, options?: AstWalkOptions, state?: any): AST {
            return this.getWalker(pre, post, options, state).walk(ast, null)
        }

        public getWalker(pre: IAstWalkCallback, post?: IAstWalkCallback, options?: AstWalkOptions, state?: any): IAstWalker {
            return this.getSlowWalker(pre, post, options, state);
        }

        private getSlowWalker(pre: IAstWalkCallback, post?: IAstWalkCallback, options?: AstWalkOptions, state?: any): IAstWalker {
            if (!options) {
                options = new AstWalkOptions();
            }

            return new AstWalker(this.childrenWalkers, pre, post, options, state);
        }

        private initChildrenWalkers(): void {
            this.childrenWalkers[NodeType.None] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Empty] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.EmptyExpr] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.True] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.False] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.This] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Super] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.QString] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Regex] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Null] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.ArrayLit] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.ObjectLit] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Void] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Comma] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Pos] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Neg] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Delete] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Await] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.In] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Dot] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.From] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Is] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.InstOf] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Typeof] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.NumberLit] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Name] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.TypeRef] = ChildrenWalkers.walkTypeReferenceChildren;
            this.childrenWalkers[NodeType.Index] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Call] = ChildrenWalkers.walkCallExpressionChildren;
            this.childrenWalkers[NodeType.New] = ChildrenWalkers.walkCallExpressionChildren;
            this.childrenWalkers[NodeType.Asg] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgAdd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgSub] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgDiv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgMul] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgMod] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgAnd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgXor] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgOr] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgLsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgRsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgRs2] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.ConditionalExpression] = ChildrenWalkers.walkTrinaryExpressionChildren;
            this.childrenWalkers[NodeType.LogOr] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.LogAnd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Or] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Xor] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.And] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Eq] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Ne] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Eqv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.NEqv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Lt] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Le] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Gt] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Ge] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Add] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Sub] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Mul] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Div] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Mod] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Lsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Rsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Rs2] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Not] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.LogNot] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.IncPre] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.DecPre] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.IncPost] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.DecPost] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.TypeAssertion] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.FuncDecl] = ChildrenWalkers.walkFuncDeclChildren;
            this.childrenWalkers[NodeType.Member] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.VarDecl] = ChildrenWalkers.walkBoundDeclChildren;
            this.childrenWalkers[NodeType.ArgDecl] = ChildrenWalkers.walkBoundDeclChildren;
            this.childrenWalkers[NodeType.Return] = ChildrenWalkers.walkReturnStatementChildren;
            this.childrenWalkers[NodeType.Break] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Continue] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Throw] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.For] = ChildrenWalkers.walkForStatementChildren;
            this.childrenWalkers[NodeType.ForIn] = ChildrenWalkers.walkForInStatementChildren;
            this.childrenWalkers[NodeType.If] = ChildrenWalkers.walkIfStatementChildren;
            this.childrenWalkers[NodeType.While] = ChildrenWalkers.walkWhileStatementChildren;
            this.childrenWalkers[NodeType.DoWhile] = ChildrenWalkers.walkDoWhileStatementChildren;
            this.childrenWalkers[NodeType.Block] = ChildrenWalkers.walkBlockChildren;
            this.childrenWalkers[NodeType.Case] = ChildrenWalkers.walkCaseStatementChildren;
            this.childrenWalkers[NodeType.Switch] = ChildrenWalkers.walkSwitchStatementChildren;
            this.childrenWalkers[NodeType.Try] = ChildrenWalkers.walkTryChildren;
            this.childrenWalkers[NodeType.TryCatch] = ChildrenWalkers.walkTryCatchChildren;
            this.childrenWalkers[NodeType.TryFinally] = ChildrenWalkers.walkTryFinallyChildren;
            this.childrenWalkers[NodeType.Finally] = ChildrenWalkers.walkFinallyChildren;
            this.childrenWalkers[NodeType.Catch] = ChildrenWalkers.walkCatchChildren;
            this.childrenWalkers[NodeType.List] = ChildrenWalkers.walkListChildren;
            this.childrenWalkers[NodeType.Script] = ChildrenWalkers.walkScriptChildren;
            this.childrenWalkers[NodeType.ClassDeclaration] = ChildrenWalkers.walkClassDeclChildren;
            this.childrenWalkers[NodeType.InterfaceDeclaration] = ChildrenWalkers.walkTypeDeclChildren;
            this.childrenWalkers[NodeType.ModuleDeclaration] = ChildrenWalkers.walkModuleDeclChildren;
            this.childrenWalkers[NodeType.ImportDeclaration] = ChildrenWalkers.walkImportDeclChildren;
            this.childrenWalkers[NodeType.With] = ChildrenWalkers.walkWithStatementChildren;
            this.childrenWalkers[NodeType.Label] = ChildrenWalkers.walkLabelChildren;
            this.childrenWalkers[NodeType.LabeledStatement] = ChildrenWalkers.walkLabeledStatementChildren;
            this.childrenWalkers[NodeType.EBStart] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.GotoEB] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.EndCode] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Error] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Comment] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Debugger] = ChildrenWalkers.walkNone;

            // Verify the code is up to date with the enum
            for (var e in (<any>NodeType)._map) {
                if ((<any>this.childrenWalkers)[e] === undefined) {
                    throw new Error("initWalkers function is not up to date with enum content!");
                }
            }
        }
    }

    var globalAstWalkerFactory: AstWalkerFactory;

    export function getAstWalkerFactory(): AstWalkerFactory {
        if (!globalAstWalkerFactory) {
            globalAstWalkerFactory = new AstWalkerFactory();
        }
        return globalAstWalkerFactory;
    }

    module ChildrenWalkers {
        export function walkNone(preAst: ASTList, parent: AST, walker: IAstWalker): void {
            // Nothing to do
        }

        export function walkListChildren(preAst: ASTList, parent: AST, walker: IAstWalker): void {
            var len = preAst.members.length;
            if (walker.options.reverseSiblings) {
                for (var i = len - 1; i >= 0; i--) {
                    if (walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    if (walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            }
        }

        export function walkUnaryExpressionChildren(preAst: UnaryExpression, parent: AST, walker: IAstWalker): void {
            if (preAst.castTerm) {
                preAst.castTerm = walker.walk(preAst.castTerm, preAst);
            }
            if (preAst.operand) {
                preAst.operand = walker.walk(preAst.operand, preAst);
            }
        }

        export function walkBinaryExpressionChildren(preAst: BinaryExpression, parent: AST, walker: IAstWalker): void {
            if (walker.options.reverseSiblings) {
                if (preAst.operand2) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
                if ((preAst.operand1) && (walker.options.goNextSibling)) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
            } else {
                if (preAst.operand1) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
                if ((preAst.operand2) && (walker.options.goNextSibling)) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
            }
        }

        export function walkTypeReferenceChildren(preAst: TypeReference, parent: AST, walker: IAstWalker): void {
            if (preAst.term) {
                preAst.term = walker.walk(preAst.term, preAst);
            }
        }

        export function walkCallExpressionChildren(preAst: CallExpression, parent: AST, walker: IAstWalker): void {
            if (!walker.options.reverseSiblings) {
                preAst.target = walker.walk(preAst.target, preAst);
            }
            if (preAst.arguments && (walker.options.goNextSibling)) {
                preAst.arguments = <ASTList> walker.walk(preAst.arguments, preAst);
            }
            if ((walker.options.reverseSiblings) && (walker.options.goNextSibling)) {
                preAst.target = walker.walk(preAst.target, preAst);
            }
        }

        export function walkTrinaryExpressionChildren(preAst: ConditionalExpression, parent: AST, walker: IAstWalker): void {
            if (preAst.operand1) {
                preAst.operand1 = walker.walk(preAst.operand1, preAst);
            }
            if (preAst.operand2 && (walker.options.goNextSibling)) {
                preAst.operand2 = walker.walk(preAst.operand2, preAst);
            }
            if (preAst.operand3 && (walker.options.goNextSibling)) {
                preAst.operand3 = walker.walk(preAst.operand3, preAst);
            }
        }

        export function walkFuncDeclChildren(preAst: FuncDecl, parent: AST, walker: IAstWalker): void {
            if (preAst.name) {
                preAst.name = <Identifier>walker.walk(preAst.name, preAst);
            }
            if (preAst.arguments && (preAst.arguments.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.arguments = <ASTList>walker.walk(preAst.arguments, preAst);
            }
            if (preAst.returnTypeAnnotation && (walker.options.goNextSibling)) {
                preAst.returnTypeAnnotation = walker.walk(preAst.returnTypeAnnotation, preAst);
            }
            if (preAst.bod && (preAst.bod.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.bod = <ASTList>walker.walk(preAst.bod, preAst);
            }
        }

        export function walkBoundDeclChildren(preAst: BoundDecl, parent: AST, walker: IAstWalker): void {
            if (preAst.id) {
                preAst.id = <Identifier>walker.walk(preAst.id, preAst);
            }
            if (preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }
            if ((preAst.typeExpr) && (walker.options.goNextSibling)) {
                preAst.typeExpr = walker.walk(preAst.typeExpr, preAst);
            }
        }

        export function walkReturnStatementChildren(preAst: ReturnStatement, parent: AST, walker: IAstWalker): void {
            if (preAst.returnExpression) {
                preAst.returnExpression = walker.walk(preAst.returnExpression, preAst);
            }
        }

        export function walkForStatementChildren(preAst: ForStatement, parent: AST, walker: IAstWalker): void {
            if (preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }

            if (preAst.cond && walker.options.goNextSibling) {
                preAst.cond = walker.walk(preAst.cond, preAst);
            }

            if (preAst.incr && walker.options.goNextSibling) {
                preAst.incr = walker.walk(preAst.incr, preAst);
            }

            if (preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkForInStatementChildren(preAst: ForInStatement, parent: AST, walker: IAstWalker): void {
            preAst.lval = walker.walk(preAst.lval, preAst);
            if (walker.options.goNextSibling) {
                preAst.obj = walker.walk(preAst.obj, preAst);
            }
            if (preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkIfStatementChildren(preAst: IfStatement, parent: AST, walker: IAstWalker): void {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if (preAst.thenBod && (walker.options.goNextSibling)) {
                preAst.thenBod = walker.walk(preAst.thenBod, preAst);
            }
            if (preAst.elseBod && (walker.options.goNextSibling)) {
                preAst.elseBod = walker.walk(preAst.elseBod, preAst);
            }
        }

        export function walkWhileStatementChildren(preAst: WhileStatement, parent: AST, walker: IAstWalker): void {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if (preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkDoWhileStatementChildren(preAst: DoWhileStatement, parent: AST, walker: IAstWalker): void {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if (preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkBlockChildren(preAst: Block, parent: AST, walker: IAstWalker): void {
            if (preAst.statements) {
                preAst.statements = <ASTList>walker.walk(preAst.statements, preAst);
            }
        }

        export function walkCaseStatementChildren(preAst: CaseStatement, parent: AST, walker: IAstWalker): void {
            if (preAst.expr) {
                preAst.expr = walker.walk(preAst.expr, preAst);
            }

            if (preAst.body && walker.options.goNextSibling) {
                preAst.body = <ASTList>walker.walk(preAst.body, preAst);
            }
        }

        export function walkSwitchStatementChildren(preAst: SwitchStatement, parent: AST, walker: IAstWalker): void {
            if (preAst.val) {
                preAst.val = walker.walk(preAst.val, preAst);
            }

            if ((preAst.caseList) && walker.options.goNextSibling) {
                preAst.caseList = <ASTList>walker.walk(preAst.caseList, preAst);
            }
        }

        export function walkTryChildren(preAst: Try, parent: AST, walker: IAstWalker): void {
            if (preAst.body) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkTryCatchChildren(preAst: TryCatch, parent: AST, walker: IAstWalker): void {
            if (preAst.tryNode) {
                preAst.tryNode = <Try>walker.walk(preAst.tryNode, preAst);
            }

            if ((preAst.catchNode) && walker.options.goNextSibling) {
                preAst.catchNode = <Catch>walker.walk(preAst.catchNode, preAst);
            }
        }

        export function walkTryFinallyChildren(preAst: TryFinally, parent: AST, walker: IAstWalker): void {
            if (preAst.tryNode) {
                preAst.tryNode = walker.walk(preAst.tryNode, preAst);
            }

            if (preAst.finallyNode && walker.options.goNextSibling) {
                preAst.finallyNode = <Finally>walker.walk(preAst.finallyNode, preAst);
            }
        }

        export function walkFinallyChildren(preAst: Finally, parent: AST, walker: IAstWalker): void {
            if (preAst.body) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkCatchChildren(preAst: Catch, parent: AST, walker: IAstWalker): void {
            if (preAst.param) {
                preAst.param = <VarDecl>walker.walk(preAst.param, preAst);
            }

            if ((preAst.body) && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkRecordChildren(preAst: NamedDeclaration, parent: AST, walker: IAstWalker): void {
            preAst.name = <Identifier>walker.walk(preAst.name, preAst);
            if (walker.options.goNextSibling && preAst.members) {
                preAst.members = <ASTList>walker.walk(preAst.members, preAst);
            }

        }

        export function walkNamedTypeChildren(preAst: TypeDeclaration, parent: AST, walker: IAstWalker): void {
            walkRecordChildren(preAst, parent, walker);
        }

        export function walkClassDeclChildren(preAst: ClassDeclaration, parent: AST, walker: IAstWalker): void {
            walkNamedTypeChildren(preAst, parent, walker);

            if (walker.options.goNextSibling && preAst.extendsList) {
                preAst.extendsList = <ASTList>walker.walk(preAst.extendsList, preAst);
            }

            if (walker.options.goNextSibling && preAst.implementsList) {
                preAst.implementsList = <ASTList>walker.walk(preAst.implementsList, preAst);
            }
        }

        export function walkScriptChildren(preAst: Script, parent: AST, walker: IAstWalker): void {
            if (preAst.bod) {
                preAst.bod = <ASTList>walker.walk(preAst.bod, preAst);
            }
        }

        export function walkTypeDeclChildren(preAst: InterfaceDeclaration, parent: AST, walker: IAstWalker): void {
            walkNamedTypeChildren(preAst, parent, walker);

            // walked arguments as part of members
            if (walker.options.goNextSibling && preAst.extendsList) {
                preAst.extendsList = <ASTList>walker.walk(preAst.extendsList, preAst);
            }

            if (walker.options.goNextSibling && preAst.implementsList) {
                preAst.implementsList = <ASTList>walker.walk(preAst.implementsList, preAst);
            }
        }

        export function walkModuleDeclChildren(preAst: ModuleDeclaration, parent: AST, walker: IAstWalker): void {
            walkRecordChildren(preAst, parent, walker);
        }

        export function walkImportDeclChildren(preAst: ImportDeclaration, parent: AST, walker: IAstWalker): void {
            if (preAst.id) {
                preAst.id = <Identifier>walker.walk(preAst.id, preAst);
            }
            if (preAst.alias) {
                preAst.alias = walker.walk(preAst.alias, preAst);
            }
        }

        export function walkWithStatementChildren(preAst: WithStatement, parent: AST, walker: IAstWalker): void {
            if (preAst.expr) {
                preAst.expr = walker.walk(preAst.expr, preAst);
            }

            if (preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }

        export function walkLabelChildren(preAst: Label, parent: AST, walker: IAstWalker): void {
            //TODO: Walk "id"?
        }

        export function walkLabeledStatementChildren(preAst: LabeledStatement, parent: AST, walker: IAstWalker): void {
            preAst.labels = <ASTList>walker.walk(preAst.labels, preAst);
            if (walker.options.goNextSibling) {
                preAst.stmt = walker.walk(preAst.stmt, preAst);
            }
        }
    }
}

//// [parserRealSource12.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    var AstWalkOptions = /** @class */ (function () {
        function AstWalkOptions() {
            this.goChildren = true;
            this.goNextSibling = true;
            this.reverseSiblings = false; // visit siblings in reverse execution order
        }
        AstWalkOptions.prototype.stopWalk = function (stop) {
            if (stop === void 0) { stop = true; }
            this.goChildren = !stop;
            this.goNextSibling = !stop;
        };
        return AstWalkOptions;
    }());
    TypeScript.AstWalkOptions = AstWalkOptions;
    var AstWalker = /** @class */ (function () {
        function AstWalker(childrenWalkers, pre, post, options, state) {
            this.childrenWalkers = childrenWalkers;
            this.pre = pre;
            this.post = post;
            this.options = options;
            this.state = state;
        }
        AstWalker.prototype.walk = function (ast, parent) {
            var preAst = this.pre(ast, parent, this);
            if (preAst === undefined) {
                preAst = ast;
            }
            if (this.options.goChildren) {
                var svGoSib = this.options.goNextSibling;
                this.options.goNextSibling = true;
                // Call the "walkChildren" function corresponding to "nodeType".
                this.childrenWalkers[ast.nodeType](ast, parent, this);
                this.options.goNextSibling = svGoSib;
            }
            else {
                // no go only applies to children of node issuing it
                this.options.goChildren = true;
            }
            if (this.post) {
                var postAst = this.post(preAst, parent, this);
                if (postAst === undefined) {
                    postAst = preAst;
                }
                return postAst;
            }
            else {
                return preAst;
            }
        };
        return AstWalker;
    }());
    var AstWalkerFactory = /** @class */ (function () {
        function AstWalkerFactory() {
            this.childrenWalkers = [];
            this.initChildrenWalkers();
        }
        AstWalkerFactory.prototype.walk = function (ast, pre, post, options, state) {
            return this.getWalker(pre, post, options, state).walk(ast, null);
        };
        AstWalkerFactory.prototype.getWalker = function (pre, post, options, state) {
            return this.getSlowWalker(pre, post, options, state);
        };
        AstWalkerFactory.prototype.getSlowWalker = function (pre, post, options, state) {
            if (!options) {
                options = new AstWalkOptions();
            }
            return new AstWalker(this.childrenWalkers, pre, post, options, state);
        };
        AstWalkerFactory.prototype.initChildrenWalkers = function () {
            this.childrenWalkers[NodeType.None] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Empty] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.EmptyExpr] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.True] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.False] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.This] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Super] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.QString] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Regex] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Null] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.ArrayLit] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.ObjectLit] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Void] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Comma] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Pos] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Neg] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Delete] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.Await] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.In] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Dot] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.From] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Is] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.InstOf] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Typeof] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.NumberLit] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Name] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.TypeRef] = ChildrenWalkers.walkTypeReferenceChildren;
            this.childrenWalkers[NodeType.Index] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Call] = ChildrenWalkers.walkCallExpressionChildren;
            this.childrenWalkers[NodeType.New] = ChildrenWalkers.walkCallExpressionChildren;
            this.childrenWalkers[NodeType.Asg] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgAdd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgSub] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgDiv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgMul] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgMod] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgAnd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgXor] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgOr] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgLsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgRsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.AsgRs2] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.ConditionalExpression] = ChildrenWalkers.walkTrinaryExpressionChildren;
            this.childrenWalkers[NodeType.LogOr] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.LogAnd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Or] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Xor] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.And] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Eq] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Ne] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Eqv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.NEqv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Lt] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Le] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Gt] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Ge] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Add] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Sub] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Mul] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Div] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Mod] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Lsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Rsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Rs2] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.Not] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.LogNot] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.IncPre] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.DecPre] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.IncPost] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.DecPost] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.TypeAssertion] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.FuncDecl] = ChildrenWalkers.walkFuncDeclChildren;
            this.childrenWalkers[NodeType.Member] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[NodeType.VarDecl] = ChildrenWalkers.walkBoundDeclChildren;
            this.childrenWalkers[NodeType.ArgDecl] = ChildrenWalkers.walkBoundDeclChildren;
            this.childrenWalkers[NodeType.Return] = ChildrenWalkers.walkReturnStatementChildren;
            this.childrenWalkers[NodeType.Break] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Continue] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Throw] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[NodeType.For] = ChildrenWalkers.walkForStatementChildren;
            this.childrenWalkers[NodeType.ForIn] = ChildrenWalkers.walkForInStatementChildren;
            this.childrenWalkers[NodeType.If] = ChildrenWalkers.walkIfStatementChildren;
            this.childrenWalkers[NodeType.While] = ChildrenWalkers.walkWhileStatementChildren;
            this.childrenWalkers[NodeType.DoWhile] = ChildrenWalkers.walkDoWhileStatementChildren;
            this.childrenWalkers[NodeType.Block] = ChildrenWalkers.walkBlockChildren;
            this.childrenWalkers[NodeType.Case] = ChildrenWalkers.walkCaseStatementChildren;
            this.childrenWalkers[NodeType.Switch] = ChildrenWalkers.walkSwitchStatementChildren;
            this.childrenWalkers[NodeType.Try] = ChildrenWalkers.walkTryChildren;
            this.childrenWalkers[NodeType.TryCatch] = ChildrenWalkers.walkTryCatchChildren;
            this.childrenWalkers[NodeType.TryFinally] = ChildrenWalkers.walkTryFinallyChildren;
            this.childrenWalkers[NodeType.Finally] = ChildrenWalkers.walkFinallyChildren;
            this.childrenWalkers[NodeType.Catch] = ChildrenWalkers.walkCatchChildren;
            this.childrenWalkers[NodeType.List] = ChildrenWalkers.walkListChildren;
            this.childrenWalkers[NodeType.Script] = ChildrenWalkers.walkScriptChildren;
            this.childrenWalkers[NodeType.ClassDeclaration] = ChildrenWalkers.walkClassDeclChildren;
            this.childrenWalkers[NodeType.InterfaceDeclaration] = ChildrenWalkers.walkTypeDeclChildren;
            this.childrenWalkers[NodeType.ModuleDeclaration] = ChildrenWalkers.walkModuleDeclChildren;
            this.childrenWalkers[NodeType.ImportDeclaration] = ChildrenWalkers.walkImportDeclChildren;
            this.childrenWalkers[NodeType.With] = ChildrenWalkers.walkWithStatementChildren;
            this.childrenWalkers[NodeType.Label] = ChildrenWalkers.walkLabelChildren;
            this.childrenWalkers[NodeType.LabeledStatement] = ChildrenWalkers.walkLabeledStatementChildren;
            this.childrenWalkers[NodeType.EBStart] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.GotoEB] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.EndCode] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Error] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Comment] = ChildrenWalkers.walkNone;
            this.childrenWalkers[NodeType.Debugger] = ChildrenWalkers.walkNone;
            // Verify the code is up to date with the enum
            for (var e in NodeType._map) {
                if (this.childrenWalkers[e] === undefined) {
                    throw new Error("initWalkers function is not up to date with enum content!");
                }
            }
        };
        return AstWalkerFactory;
    }());
    TypeScript.AstWalkerFactory = AstWalkerFactory;
    var globalAstWalkerFactory;
    function getAstWalkerFactory() {
        if (!globalAstWalkerFactory) {
            globalAstWalkerFactory = new AstWalkerFactory();
        }
        return globalAstWalkerFactory;
    }
    TypeScript.getAstWalkerFactory = getAstWalkerFactory;
    var ChildrenWalkers;
    (function (ChildrenWalkers) {
        function walkNone(preAst, parent, walker) {
            // Nothing to do
        }
        ChildrenWalkers.walkNone = walkNone;
        function walkListChildren(preAst, parent, walker) {
            var len = preAst.members.length;
            if (walker.options.reverseSiblings) {
                for (var i = len - 1; i >= 0; i--) {
                    if (walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    if (walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            }
        }
        ChildrenWalkers.walkListChildren = walkListChildren;
        function walkUnaryExpressionChildren(preAst, parent, walker) {
            if (preAst.castTerm) {
                preAst.castTerm = walker.walk(preAst.castTerm, preAst);
            }
            if (preAst.operand) {
                preAst.operand = walker.walk(preAst.operand, preAst);
            }
        }
        ChildrenWalkers.walkUnaryExpressionChildren = walkUnaryExpressionChildren;
        function walkBinaryExpressionChildren(preAst, parent, walker) {
            if (walker.options.reverseSiblings) {
                if (preAst.operand2) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
                if ((preAst.operand1) && (walker.options.goNextSibling)) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
            }
            else {
                if (preAst.operand1) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
                if ((preAst.operand2) && (walker.options.goNextSibling)) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
            }
        }
        ChildrenWalkers.walkBinaryExpressionChildren = walkBinaryExpressionChildren;
        function walkTypeReferenceChildren(preAst, parent, walker) {
            if (preAst.term) {
                preAst.term = walker.walk(preAst.term, preAst);
            }
        }
        ChildrenWalkers.walkTypeReferenceChildren = walkTypeReferenceChildren;
        function walkCallExpressionChildren(preAst, parent, walker) {
            if (!walker.options.reverseSiblings) {
                preAst.target = walker.walk(preAst.target, preAst);
            }
            if (preAst.arguments && (walker.options.goNextSibling)) {
                preAst.arguments = walker.walk(preAst.arguments, preAst);
            }
            if ((walker.options.reverseSiblings) && (walker.options.goNextSibling)) {
                preAst.target = walker.walk(preAst.target, preAst);
            }
        }
        ChildrenWalkers.walkCallExpressionChildren = walkCallExpressionChildren;
        function walkTrinaryExpressionChildren(preAst, parent, walker) {
            if (preAst.operand1) {
                preAst.operand1 = walker.walk(preAst.operand1, preAst);
            }
            if (preAst.operand2 && (walker.options.goNextSibling)) {
                preAst.operand2 = walker.walk(preAst.operand2, preAst);
            }
            if (preAst.operand3 && (walker.options.goNextSibling)) {
                preAst.operand3 = walker.walk(preAst.operand3, preAst);
            }
        }
        ChildrenWalkers.walkTrinaryExpressionChildren = walkTrinaryExpressionChildren;
        function walkFuncDeclChildren(preAst, parent, walker) {
            if (preAst.name) {
                preAst.name = walker.walk(preAst.name, preAst);
            }
            if (preAst.arguments && (preAst.arguments.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.arguments = walker.walk(preAst.arguments, preAst);
            }
            if (preAst.returnTypeAnnotation && (walker.options.goNextSibling)) {
                preAst.returnTypeAnnotation = walker.walk(preAst.returnTypeAnnotation, preAst);
            }
            if (preAst.bod && (preAst.bod.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.bod = walker.walk(preAst.bod, preAst);
            }
        }
        ChildrenWalkers.walkFuncDeclChildren = walkFuncDeclChildren;
        function walkBoundDeclChildren(preAst, parent, walker) {
            if (preAst.id) {
                preAst.id = walker.walk(preAst.id, preAst);
            }
            if (preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }
            if ((preAst.typeExpr) && (walker.options.goNextSibling)) {
                preAst.typeExpr = walker.walk(preAst.typeExpr, preAst);
            }
        }
        ChildrenWalkers.walkBoundDeclChildren = walkBoundDeclChildren;
        function walkReturnStatementChildren(preAst, parent, walker) {
            if (preAst.returnExpression) {
                preAst.returnExpression = walker.walk(preAst.returnExpression, preAst);
            }
        }
        ChildrenWalkers.walkReturnStatementChildren = walkReturnStatementChildren;
        function walkForStatementChildren(preAst, parent, walker) {
            if (preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }
            if (preAst.cond && walker.options.goNextSibling) {
                preAst.cond = walker.walk(preAst.cond, preAst);
            }
            if (preAst.incr && walker.options.goNextSibling) {
                preAst.incr = walker.walk(preAst.incr, preAst);
            }
            if (preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkForStatementChildren = walkForStatementChildren;
        function walkForInStatementChildren(preAst, parent, walker) {
            preAst.lval = walker.walk(preAst.lval, preAst);
            if (walker.options.goNextSibling) {
                preAst.obj = walker.walk(preAst.obj, preAst);
            }
            if (preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkForInStatementChildren = walkForInStatementChildren;
        function walkIfStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if (preAst.thenBod && (walker.options.goNextSibling)) {
                preAst.thenBod = walker.walk(preAst.thenBod, preAst);
            }
            if (preAst.elseBod && (walker.options.goNextSibling)) {
                preAst.elseBod = walker.walk(preAst.elseBod, preAst);
            }
        }
        ChildrenWalkers.walkIfStatementChildren = walkIfStatementChildren;
        function walkWhileStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if (preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkWhileStatementChildren = walkWhileStatementChildren;
        function walkDoWhileStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if (preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkDoWhileStatementChildren = walkDoWhileStatementChildren;
        function walkBlockChildren(preAst, parent, walker) {
            if (preAst.statements) {
                preAst.statements = walker.walk(preAst.statements, preAst);
            }
        }
        ChildrenWalkers.walkBlockChildren = walkBlockChildren;
        function walkCaseStatementChildren(preAst, parent, walker) {
            if (preAst.expr) {
                preAst.expr = walker.walk(preAst.expr, preAst);
            }
            if (preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkCaseStatementChildren = walkCaseStatementChildren;
        function walkSwitchStatementChildren(preAst, parent, walker) {
            if (preAst.val) {
                preAst.val = walker.walk(preAst.val, preAst);
            }
            if ((preAst.caseList) && walker.options.goNextSibling) {
                preAst.caseList = walker.walk(preAst.caseList, preAst);
            }
        }
        ChildrenWalkers.walkSwitchStatementChildren = walkSwitchStatementChildren;
        function walkTryChildren(preAst, parent, walker) {
            if (preAst.body) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkTryChildren = walkTryChildren;
        function walkTryCatchChildren(preAst, parent, walker) {
            if (preAst.tryNode) {
                preAst.tryNode = walker.walk(preAst.tryNode, preAst);
            }
            if ((preAst.catchNode) && walker.options.goNextSibling) {
                preAst.catchNode = walker.walk(preAst.catchNode, preAst);
            }
        }
        ChildrenWalkers.walkTryCatchChildren = walkTryCatchChildren;
        function walkTryFinallyChildren(preAst, parent, walker) {
            if (preAst.tryNode) {
                preAst.tryNode = walker.walk(preAst.tryNode, preAst);
            }
            if (preAst.finallyNode && walker.options.goNextSibling) {
                preAst.finallyNode = walker.walk(preAst.finallyNode, preAst);
            }
        }
        ChildrenWalkers.walkTryFinallyChildren = walkTryFinallyChildren;
        function walkFinallyChildren(preAst, parent, walker) {
            if (preAst.body) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkFinallyChildren = walkFinallyChildren;
        function walkCatchChildren(preAst, parent, walker) {
            if (preAst.param) {
                preAst.param = walker.walk(preAst.param, preAst);
            }
            if ((preAst.body) && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkCatchChildren = walkCatchChildren;
        function walkRecordChildren(preAst, parent, walker) {
            preAst.name = walker.walk(preAst.name, preAst);
            if (walker.options.goNextSibling && preAst.members) {
                preAst.members = walker.walk(preAst.members, preAst);
            }
        }
        ChildrenWalkers.walkRecordChildren = walkRecordChildren;
        function walkNamedTypeChildren(preAst, parent, walker) {
            walkRecordChildren(preAst, parent, walker);
        }
        ChildrenWalkers.walkNamedTypeChildren = walkNamedTypeChildren;
        function walkClassDeclChildren(preAst, parent, walker) {
            walkNamedTypeChildren(preAst, parent, walker);
            if (walker.options.goNextSibling && preAst.extendsList) {
                preAst.extendsList = walker.walk(preAst.extendsList, preAst);
            }
            if (walker.options.goNextSibling && preAst.implementsList) {
                preAst.implementsList = walker.walk(preAst.implementsList, preAst);
            }
        }
        ChildrenWalkers.walkClassDeclChildren = walkClassDeclChildren;
        function walkScriptChildren(preAst, parent, walker) {
            if (preAst.bod) {
                preAst.bod = walker.walk(preAst.bod, preAst);
            }
        }
        ChildrenWalkers.walkScriptChildren = walkScriptChildren;
        function walkTypeDeclChildren(preAst, parent, walker) {
            walkNamedTypeChildren(preAst, parent, walker);
            // walked arguments as part of members
            if (walker.options.goNextSibling && preAst.extendsList) {
                preAst.extendsList = walker.walk(preAst.extendsList, preAst);
            }
            if (walker.options.goNextSibling && preAst.implementsList) {
                preAst.implementsList = walker.walk(preAst.implementsList, preAst);
            }
        }
        ChildrenWalkers.walkTypeDeclChildren = walkTypeDeclChildren;
        function walkModuleDeclChildren(preAst, parent, walker) {
            walkRecordChildren(preAst, parent, walker);
        }
        ChildrenWalkers.walkModuleDeclChildren = walkModuleDeclChildren;
        function walkImportDeclChildren(preAst, parent, walker) {
            if (preAst.id) {
                preAst.id = walker.walk(preAst.id, preAst);
            }
            if (preAst.alias) {
                preAst.alias = walker.walk(preAst.alias, preAst);
            }
        }
        ChildrenWalkers.walkImportDeclChildren = walkImportDeclChildren;
        function walkWithStatementChildren(preAst, parent, walker) {
            if (preAst.expr) {
                preAst.expr = walker.walk(preAst.expr, preAst);
            }
            if (preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkWithStatementChildren = walkWithStatementChildren;
        function walkLabelChildren(preAst, parent, walker) {
            //TODO: Walk "id"?
        }
        ChildrenWalkers.walkLabelChildren = walkLabelChildren;
        function walkLabeledStatementChildren(preAst, parent, walker) {
            preAst.labels = walker.walk(preAst.labels, preAst);
            if (walker.options.goNextSibling) {
                preAst.stmt = walker.walk(preAst.stmt, preAst);
            }
        }
        ChildrenWalkers.walkLabeledStatementChildren = walkLabeledStatementChildren;
    })(ChildrenWalkers || (ChildrenWalkers = {}));
})(TypeScript || (TypeScript = {}));
