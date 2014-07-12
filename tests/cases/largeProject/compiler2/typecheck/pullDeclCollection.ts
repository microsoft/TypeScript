// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\TypeScript2.ts' />

module TypeScript2 {

    export class DeclCollectionContext {

        public parentChain: PullDecl[] = [];
        public scriptName: string = "";

        constructor (public semanticInfo: SemanticInfo) {
        }

        public getParent() { return this.parentChain ? this.parentChain[this.parentChain.length - 1] : null; }

        public pushParent(parentDecl: PullDecl) { if (parentDecl) { this.parentChain[this.parentChain.length] = parentDecl; } }

        public popParent() { this.parentChain.length--; }
    }

    export function preCollectImportDecls(ast: AST2, parent: AST2, context: DeclCollectionContext) {
        var importDecl = <ImportDeclaration>ast;
        var isExported = hasFlag(importDecl.varFlags, VarFlags.Exported);
        var declFlags = isExported ? PullDeclFlags.Exported : PullDeclFlags.None;
        var span = new ASTSpan2();

        span.minChar = importDecl.minChar;

        span.limChar = importDecl.limChar

        var decl = new PullDecl(importDecl.id.actualText, DeclKind.Import, declFlags, span, context.scriptName);

        context.getParent().addChildDecl(decl);

        context.semanticInfo.setDeclForAST(ast, decl);

        context.semanticInfo.setASTForDecl(decl,ast);

        return false;
    }

    export function preCollectModuleDecls(ast: AST2, parent: AST2, context: DeclCollectionContext) {
        var moduleDecl: ModuleDeclaration = <ModuleDeclaration>ast;
        var declFlags = PullDeclFlags.None;

        if (hasFlag(moduleDecl.modFlags, ModuleFlags.Ambient)) {
            declFlags |= PullDeclFlags.Ambient;
        }

        if (hasFlag(moduleDecl.modFlags, ModuleFlags.IsEnum)) {
            declFlags |= PullDeclFlags.Enum;
        }

        if (hasFlag(moduleDecl.modFlags, ModuleFlags.Exported)) {
            declFlags |= PullDeclFlags.Exported;
        }

        var modName = (<Identifier2>moduleDecl.name).text;
        var span = new ASTSpan2();

        span.minChar = moduleDecl.minChar;

        span.limChar = moduleDecl.limChar;

        var isDynamic = isQuoted(modName);
        var decl = new PullDecl(modName, isDynamic ? DeclKind.DynamicModule : DeclKind.Module, declFlags, span, context.scriptName);

        context.getParent().addChildDecl(decl);

        context.pushParent(decl);

        context.semanticInfo.setDeclForAST(ast, decl);

        context.semanticInfo.setASTForDecl(decl,ast);

        return true;
    }

    export function preCollectClassDecls(ast: AST2, parent: AST2, context: DeclCollectionContext) {
        var classDecl = <ClassDeclaration>ast;
        var declFlags = PullDeclFlags.None;

        if (hasFlag(classDecl.varFlags, VarFlags.Ambient)) {
            declFlags |= PullDeclFlags.Ambient;
        }

        if (hasFlag(classDecl.varFlags, VarFlags.Exported)) {
            declFlags |= PullDeclFlags.Exported;
        }

        var span = new ASTSpan2();

        span.minChar = classDecl.minChar;

        span.limChar = classDecl.limChar;

        var decl = new PullDecl(classDecl.name.text, DeclKind.Class, declFlags, span, context.scriptName);

        context.getParent().addChildDecl(decl);

        context.pushParent(decl);

        context.semanticInfo.setDeclForAST(ast, decl);

        context.semanticInfo.setASTForDecl(decl,ast);

        return true;
    }

    export function preCollectInterfaceDecls(ast: AST2, parent: AST2, context: DeclCollectionContext) {
        var interfaceDecl = <InterfaceDeclaration>ast;
        var declFlags = PullDeclFlags.None;

        if (hasFlag(interfaceDecl.varFlags, VarFlags.Exported)) {
            declFlags |= PullDeclFlags.Exported;
        }

        var span = new ASTSpan2();

        span.minChar = interfaceDecl.minChar;

        span.limChar = interfaceDecl.limChar;

        var decl = new PullDecl(interfaceDecl.name.text, DeclKind.Interface, declFlags, span, context.scriptName);

        var parent = context.getParent();

        // if we're collecting a decl for a type annotation, we don't want to add the decl to the parent scope
        if (parent) {
            parent.addChildDecl(decl);
        }

        context.pushParent(decl);

        context.semanticInfo.setDeclForAST(ast, decl);

        context.semanticInfo.setASTForDecl(decl,ast);

        return true;
    }

    export function preCollectArgDecls(ast: AST2, parent: AST2, context: DeclCollectionContext) {
        var argDecl = <BoundDecl>ast;
        var declFlags = PullDeclFlags.None;

        if (hasFlag(argDecl.varFlags, VarFlags.Private)) {
            declFlags |= PullDeclFlags.Private;
        }

        var span = new ASTSpan2();

        span.minChar = argDecl.minChar;

        span.limChar = argDecl.limChar;

        var decl = new PullDecl(argDecl.id.text, DeclKind.Argument, declFlags, span, context.scriptName);

        context.getParent().addChildDecl(decl);

        // if it's a property type, we'll need to add it to the parent's parent as well
        if (hasFlag(argDecl.varFlags, VarFlags.Property)) {
            var propDecl = new PullDecl(argDecl.id.text, DeclKind.Field, declFlags, span, context.scriptName);
            context.parentChain[context.parentChain.length - 2].addChildDecl(propDecl);
            context.semanticInfo.setASTForDecl(propDecl, ast);
            context.semanticInfo.setDeclForAST(ast, propDecl);
        }
        else {
            context.semanticInfo.setASTForDecl(decl,ast);
            context.semanticInfo.setDeclForAST(ast, decl);   
        }

        if (argDecl.typeExpr && 
            ((<TypeReference>argDecl.typeExpr).term.nodeType == NodeType.InterfaceDeclaration ||
            (<TypeReference>argDecl.typeExpr).term.nodeType == NodeType.FuncDecl)) {

            var declCollectionContext = new DeclCollectionContext(context.semanticInfo);

            declCollectionContext.scriptName = context.scriptName;

            getAstWalkerFactory().walk((<TypeReference>argDecl.typeExpr).term, preCollectDecls, postCollectDecls, null, declCollectionContext);
        }
         
        return false;
    }

    export function preCollectVarDecls(ast: AST2, parent: AST2, context: DeclCollectionContext) {
        var varDecl = <VarDecl>ast;
        var declFlags = PullDeclFlags.None;
        var declType = DeclKind.Variable;
        var isProperty = false;
        var isStatic = false;

        if (hasFlag(varDecl.varFlags, VarFlags.Ambient)) {
            declFlags |= PullDeclFlags.Ambient;
        }

        if (hasFlag(varDecl.varFlags, VarFlags.Exported)) {
            declFlags |= PullDeclFlags.Exported;
        }

        if (hasFlag(varDecl.varFlags, VarFlags.Property)) {
            isProperty = true;
            declFlags |= PullDeclFlags.Public;
        }

        if (hasFlag(varDecl.varFlags, VarFlags.Static)) {
            isProperty = true;
            isStatic = true;
            declFlags |= PullDeclFlags.Static;
        }

        if (hasFlag(varDecl.varFlags, VarFlags.Private)) {
            isProperty = true;
            declFlags |= PullDeclFlags.Private;
        }

        if (hasFlag(varDecl.id.flags, ASTFlags.OptionalName)) {
            declFlags |= PullDeclFlags.Optional;
        }

        if (isStatic) {
            declType = DeclKind.StaticField;
        }
        else if (isProperty) {
            declType = DeclKind.Field;
        }
        
        var span = new ASTSpan2();

        span.minChar = varDecl.minChar;

        span.limChar = varDecl.limChar;

        var decl = new PullDecl(varDecl.id.text, declType, declFlags, span, context.scriptName);

        context.getParent().addChildDecl(decl);

        context.semanticInfo.setDeclForAST(ast, decl);

        context.semanticInfo.setASTForDecl(decl,ast);

        if (varDecl.typeExpr && 
            ((<TypeReference>varDecl.typeExpr).term.nodeType == NodeType.InterfaceDeclaration ||
            (<TypeReference>varDecl.typeExpr).term.nodeType == NodeType.FuncDecl)) {

            var declCollectionContext = new DeclCollectionContext(context.semanticInfo);

            declCollectionContext.scriptName = context.scriptName;

            getAstWalkerFactory().walk((<TypeReference>varDecl.typeExpr).term, preCollectDecls, postCollectDecls, null, declCollectionContext);
        }

        return false;
    }

    export function preCollectFuncDecls(ast: AST2, parent: AST2, context: DeclCollectionContext) {

        var funcDecl = <FuncDecl>ast;
        var declFlags = PullDeclFlags.None;
        var declType = DeclKind.Function;
        var isProperty = false;
        var isStatic = false;

        if (hasFlag(funcDecl.fncFlags, FncFlags.Ambient)) {
            declFlags |= PullDeclFlags.Ambient;
        }

        if (hasFlag(funcDecl.fncFlags, FncFlags.Exported)) {
            declFlags |= PullDeclFlags.Exported;
        }

        if (hasFlag(funcDecl.fncFlags, FncFlags.Method)) {
            isProperty = true;
        }

        if (hasFlag(funcDecl.fncFlags, FncFlags.Static)) {
            isProperty = true;
            isStatic = true;
        }

        if (hasFlag(funcDecl.fncFlags, FncFlags.Private)) {
            isProperty = true;
            declFlags |= PullDeclFlags.Private;
        }

        if (hasFlag(funcDecl.fncFlags, FncFlags.ConstructMember) || funcDecl.isConstructor) {
            declFlags |= PullDeclFlags.Constructor;
        }

        if (hasFlag(funcDecl.fncFlags, FncFlags.CallMember)) {
            declFlags |= PullDeclFlags.Call;
        }

        if (hasFlag(funcDecl.fncFlags, FncFlags.IndexerMember)) {
            declFlags |= PullDeclFlags.Index;
        }

        if (funcDecl.isSignature()) {
            declFlags |= PullDeclFlags.Signature;
        }

        if (funcDecl.isGetAccessor()) {
            declFlags |= PullDeclFlags.GetAccessor;
        }

        if (funcDecl.isSetAccessor()) {
            declFlags |= PullDeclFlags.SetAccessor;
        }

        if (funcDecl.name && hasFlag(funcDecl.name.flags, ASTFlags.OptionalName)) {
            declFlags |= PullDeclFlags.Optional;
        }

        if (isStatic) {
            declType = DeclKind.StaticMethod;
        }
        else if (isProperty) {
            declType = DeclKind.Method;
        }

        var span = new ASTSpan2();

        span.minChar = funcDecl.minChar;

        span.limChar = funcDecl.limChar;

        var funcName = funcDecl.name ? funcDecl.name.text : funcDecl.hint ? funcDecl.hint : "";

        var decl = new PullDecl(funcName, declType, declFlags, span, context.scriptName);

        // parent could be null if we're collecting decls for a lambda expression
        var parent = context.getParent();

        if (parent) {
            parent.addChildDecl(decl);
        }
        context.pushParent(decl);

        context.semanticInfo.setDeclForAST(ast, decl);

        context.semanticInfo.setASTForDecl(decl, ast);

        if (funcDecl.returnTypeAnnotation && 
            ((<TypeReference>funcDecl.returnTypeAnnotation).term.nodeType == NodeType.InterfaceDeclaration ||
            (<TypeReference>funcDecl.returnTypeAnnotation).term.nodeType == NodeType.FuncDecl)) {

            var declCollectionContext = new DeclCollectionContext(context.semanticInfo);

            declCollectionContext.scriptName = context.scriptName;

            getAstWalkerFactory().walk((<TypeReference>funcDecl.returnTypeAnnotation).term, preCollectDecls, postCollectDecls, null, declCollectionContext);
        }

        return true;
    }

    export function preCollectDecls(ast: AST2, parent: AST2, walker: IAstWalker) {
        var context: DeclCollectionContext = walker.state;
        var go = false;

        if (ast.nodeType == NodeType.Script) {
            var script: Script = <Script>ast;
            var span = new ASTSpan2();

            span.minChar = script.minChar;

            span.limChar = script.limChar;

            var decl = new PullDecl(context.scriptName, DeclKind.Script, PullDeclFlags.None, span, context.scriptName);

            context.pushParent(decl);

            go = true;
        }
        else if (ast.nodeType == NodeType.List) {
            go = true;
        }
        else if (ast.nodeType == NodeType.Block) {
            go = true;
        }
        else if (ast.nodeType == NodeType.ModuleDeclaration) {
            go = preCollectModuleDecls(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.ClassDeclaration) {
            go = preCollectClassDecls(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.InterfaceDeclaration) {
            go = preCollectInterfaceDecls(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.ArgDecl) {
            go = preCollectArgDecls(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.VarDecl) {
            go = preCollectVarDecls(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.FuncDecl) {
            go = preCollectFuncDecls(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.ImportDeclaration) {
            go = preCollectImportDecls(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.If) {
            go = true;
        }
        else if (ast.nodeType == NodeType.For) {
            go = true;
        }
        else if (ast.nodeType == NodeType.ForIn) {
            go = true;
        }
        else if (ast.nodeType == NodeType.While) {
            go = true;
        }
        else if (ast.nodeType == NodeType.DoWhile) {
            go = true;
        }
        else if (ast.nodeType == NodeType.Comma) {
            go = true;
        }
        else if (ast.nodeType == NodeType.Return) {
            // want to be able to bind lambdas in return positions
            go = true;
        }
        else if (ast.nodeType == NodeType.Switch || ast.nodeType == NodeType.Case) {
            go = true;
        }

            // call and 'new' expressions may contain lambdas with bindings...
        else if (ast.nodeType == NodeType.Call) {
            // want to be able to bind lambdas in return positions
            go = true;
        }
        else if (ast.nodeType == NodeType.New) {
            // want to be able to bind lambdas in return positions
            go = true;
        }
        //// go into blocks, if necessary...
        //else if (ast.nodeType == NodeType.Block ||
        //         ast.nodeType == NodeType.For ||
        //         ast.nodeType == NodeType.ForIn ||
        //         ast.nodeType == NodeType.While ||
        //         ast.nodeType == NodeType.If ||
        //         ast.nodeType == NodeType.Try ||
        //         ast.nodeType == NodeType.TryCatch ||
        //         ast.nodeType == NodeType.TryFinally ||
        //         ast.nodeType == NodeType.Catch ||
        //         ast.nodeType == NodeType.Finally) {

        //    go = true;

        //}

        walker.options.goChildren = go;

        return ast;
    }

    export function postCollectDecls(ast: AST2, parent: AST2, walker: IAstWalker) {
        var context: DeclCollectionContext = walker.state;

        // Note that we never pop the Script - after the traversal, it should be the
        // one parent left in the context

        if (ast.nodeType == NodeType.ModuleDeclaration) {
            context.popParent();
        }
        else if (ast.nodeType == NodeType.ClassDeclaration) {
            context.popParent();
        }
        else if (ast.nodeType == NodeType.InterfaceDeclaration) {
            context.popParent();
        }
        else if (ast.nodeType == NodeType.FuncDecl) {
            context.popParent();
        }

        return ast;
    }
}