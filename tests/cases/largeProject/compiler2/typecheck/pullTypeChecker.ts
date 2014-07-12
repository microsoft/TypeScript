// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\TypeScript2.ts' />

module TypeScript2 {

    export function prePullTypeCheck(ast: AST2, parent: AST2, walker: IAstWalker): AST2 {

        var typeChecker: PullTypeChecker = walker.state;

        var go = false;

        if (ast.nodeType == NodeType.Script) {
            ast = typeChecker.typeCheckScript(<Script>ast);
            go = true;
        }
        if (ast.nodeType == NodeType.List) {
            go = true;
        }
        else if (ast.nodeType == NodeType.VarDecl) {
            ast = typeChecker.typeCheckBoundDecl(<BoundDecl>ast);
        }
        else if (ast.nodeType == NodeType.Asg) {
            ast = typeChecker.typeCheckAsgOperator(ast);
        }
        else if (ast.nodeType == NodeType.FuncDecl) {
            ast = typeChecker.typeCheckFunction(<FuncDecl>ast);
            go = true;
        }
        else if (ast.nodeType == NodeType.ClassDeclaration) {
            ast = typeChecker.typeCheckClass(<ClassDeclaration>ast);
            go = true;
        }
        else if (ast.nodeType == NodeType.InterfaceDeclaration) {
            ast = typeChecker.typeCheckInterface(<TypeDeclaration>ast);
            go = true;
        }
        else if (ast.nodeType == NodeType.ModuleDeclaration) {
            ast = typeChecker.typeCheckModule(<ModuleDeclaration>ast);
            go = true;
        }
        //else if (ast.nodeType == NodeType.This) {
        //    ast = typeChecker.typeCheckThis(ast);
        //}
        //else if (ast.nodeType == NodeType.Name) {
        //    ast = typeChecker.typeCheckName(ast);
        //}
        //else if (ast.nodeType == NodeType.ObjectLit) {
        //    ast = typeChecker.typeCheckObjectLit(<UnaryExpression>ast);
        //}
        //else if (ast.nodeType == NodeType.Return) {
        //    ast = typeChecker.typeCheckReturn(<ReturnStatement>ast);
        //}
        //else if (ast.nodeType == NodeType.New) {
        //    ast = typeChecker.typeCheckNew(ast);
        //}
        //else if (ast.nodeType == NodeType.Call) {
        //    ast = typeChecker.typeCheckCall(ast);
        //}

        walker.options.goChildren = go;
        return ast;
    }

    export class PullTypeChecker {

        public typingMap: DataMap = new DataMap();
        public errorMap: DataMap = new DataMap();
        public symbolTypeCheckStatusMap: DataMap = new DataMap();

        public semanticInfoChain: SemanticInfoChain;

        public resolver: PullTypeResolver = null;

        public context: PullTypeResolutionContext = new PullTypeResolutionContext();

        constructor (semanticInfoChain) {
            this.semanticInfoChain = semanticInfoChain;
        }

        public setUnit(unitPath: string, logger?: ILogger2) {
            this.resolver = new PullTypeResolver(this.semanticInfoChain, unitPath, logger);
        }

        public typeCheck(ast: AST2): AST2 {
            return ast;
        }

        public typeCheckScript(script: Script): Script {
            return script;
        }

        public typeCheckFunction(funcDecl: FuncDecl): FuncDecl {
            var sym = this.resolver.resolveFunctionDeclaration(funcDecl, this.context);
            return funcDecl;
        }

        public typeCheckClass(classDecl: ClassDeclaration): ClassDeclaration {
            var sym = this.resolver.resolveClassDeclaration(classDecl, this.context);
            return classDecl;
        }

        public typeCheckInterface(interfaceDecl: TypeDeclaration): TypeDeclaration {
            var sym = this.resolver.resolveInterfaceDeclaration(interfaceDecl, this.context);
            return interfaceDecl;
        }

        public typeCheckModule(moduleDecl: ModuleDeclaration): ModuleDeclaration {
            var sym = this.resolver.resolveModuleDeclaration(moduleDecl, this.context);
            return moduleDecl;
        }

        public typeCheckBoundDecl(varDecl: BoundDecl): BoundDecl {
            var sym = this.resolver.resolveVariableDeclaration(varDecl, this.context);
            return varDecl;
        }

        public typeCheckThis(ast: AST2): AST2 {
            return ast;
        }

        public typeCheckName(ast: AST2): AST2 {
            return ast;
        }

        public typeCheckAsgOperator(ast: AST2): AST2 {
            return ast;
        }

        public typeCheckObjectLit(objectLit: UnaryExpression2): UnaryExpression2 {
            return objectLit;
        }

        public typeCheckReturn(returnStmt: ReturnStatement): ReturnStatement {
            return returnStmt;
        }

        public typeCheckNew(ast: AST2): AST2 {
            return ast;
        }

        public typeCheckCall(ast: AST2): AST2 {
            return ast;
        }
    }
}
