// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    export class TypeCollectionContext {
        public script: Script = null;

        constructor (public scopeChain: ScopeChain, public checker: TypeChecker) {
        }
    }

    export class MemberScopeContext {
        public type: Type = null;
        public ast: AST = null;
        public scope: SymbolScope;
        public options = new AstWalkOptions();

        constructor (public flow: TypeFlow, public pos: number, public matchFlag: ASTFlags) {
        }
    }

    export class EnclosingScopeContext {

        public scopeGetter: () => SymbolScope = null;
        public objectLiteralScopeGetter: () => SymbolScope = null;
        public scopeStartAST: AST = null;
        public skipNextFuncDeclForClass = false;
        public deepestModuleDecl: ModuleDeclaration = null;
        public enclosingClassDecl: TypeDeclaration = null;
        public enclosingObjectLit: UnaryExpression = null;
        public publicsOnly = true;
        public useFullAst = false;
        private scriptFragment: Script;

        constructor (public logger: ILogger,
                    public script: Script,
                    public text: ISourceText,
                    public pos: number,
                    public isMemberCompletion: boolean) {
        }

        public getScope(): SymbolScope {
            return this.scopeGetter();
        }

        public getObjectLiteralScope(): SymbolScope {
            return this.objectLiteralScopeGetter();
        }

        public getScopeAST() {
            return this.scopeStartAST;
        }

        public getScopePosition() {
            return this.scopeStartAST.minChar;
        }

        public getScriptFragmentStartAST(): AST {
            return this.scopeStartAST;
        }

        public getScriptFragmentPosition(): number {
            return this.getScriptFragmentStartAST().minChar;
        }

        public getScriptFragment(): Script {
            if (this.scriptFragment == null) {
                var ast = this.getScriptFragmentStartAST();
                var minChar = ast.minChar;
                var limChar = (this.isMemberCompletion ? this.pos : this.pos + 1);
                this.scriptFragment = TypeScript.quickParse(this.logger, ast, this.text, minChar, limChar, null/*errorCapture*/).Script;
            }
            return this.scriptFragment;
        }
    }

    export function preFindMemberScope(ast: AST, parent: AST, walker: IAstWalker) {
        var memScope: MemberScopeContext = walker.state;
        if (hasFlag(ast.flags, memScope.matchFlag) && ((memScope.pos < 0) || (memScope.pos == ast.limChar))) {
            memScope.ast = ast;
            if ((ast.type == null) && (memScope.pos >= 0)) {
                memScope.flow.inScopeTypeCheck(ast, memScope.scope);
            }
            memScope.type = ast.type;
            memScope.options.stopWalk();
        }
        return ast;
    }

    export function pushTypeCollectionScope(container: Symbol,
        valueMembers: ScopedMembers,
        ambientValueMembers: ScopedMembers,
        enclosedTypes: ScopedMembers,
        ambientEnclosedTypes: ScopedMembers,
        context: TypeCollectionContext,
        thisType: Type,
        classType: Type,
        moduleDecl: ModuleDeclaration) {
        var builder = new SymbolScopeBuilder(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, null, container);
        var chain: ScopeChain = new ScopeChain(container, context.scopeChain, builder);
        chain.thisType = thisType;
        chain.classType = classType;
        chain.moduleDecl = moduleDecl;
        context.scopeChain = chain;
    }

    export function popTypeCollectionScope(context: TypeCollectionContext) {
        context.scopeChain = context.scopeChain.previous;
    }

    export function preFindEnclosingScope(ast: AST, parent: AST, walker: IAstWalker) {
        var context: EnclosingScopeContext = walker.state;
        var minChar = ast.minChar;
        var limChar = ast.limChar;

        // Account for the fact completion list may be called at the end of a file which
        // is has not been fully re-parsed yet.
        if (ast.nodeType == NodeType.Script && context.pos > limChar)
            limChar = context.pos;

        if ((minChar <= context.pos) &&
            (limChar >= context.pos)) {
            switch (ast.nodeType) {
                case NodeType.Script:
                    var script = <Script>ast;
                    context.scopeGetter = function () {
                        return script.bod === null ? null : script.bod.enclosingScope;
                    };
                    context.scopeStartAST = script;
                    break;

                case NodeType.ClassDeclaration:
                    context.scopeGetter = function () {
                        return (ast.type === null || ast.type.instanceType.containedScope === null) ? null : ast.type.instanceType.containedScope;
                    };
                    context.scopeStartAST = ast;
                    context.enclosingClassDecl = <TypeDeclaration>ast;
                    break;

                case NodeType.ObjectLit:
                    var objectLit = <UnaryExpression>ast;
                    // Only consider target-typed object literals
                    if (objectLit.targetType) {
                        context.scopeGetter = function () {
                            return objectLit.targetType.containedScope;
                        };
                        context.objectLiteralScopeGetter = function () {
                            return objectLit.targetType.memberScope;
                        }
                        context.enclosingObjectLit = objectLit;
                    }
                    break;

                case NodeType.ModuleDeclaration:
                    context.deepestModuleDecl = <ModuleDeclaration>ast;
                    context.scopeGetter = function () {
                        return ast.type === null ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;

                case NodeType.InterfaceDeclaration:
                    context.scopeGetter = function () {
                        return (ast.type === null) ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;

                case NodeType.FuncDecl: {
                    var funcDecl = <FuncDecl>ast;
                    if (context.skipNextFuncDeclForClass) {
                        context.skipNextFuncDeclForClass = false;
                    }
                    else {
                        context.scopeGetter = function () {
                            // The scope of a class constructor is hidden somewhere we don't expect :-S
                            if (funcDecl.isConstructor && hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod)) {
                                if (ast.type && ast.type.enclosingType) {
                                    return ast.type.enclosingType.constructorScope;
                                }
                            }

                            if (funcDecl.scopeType) {
                                return funcDecl.scopeType.containedScope;
                            }

                            if (funcDecl.type) {
                                return funcDecl.type.containedScope;
                            }
                            return null;
                        };
                        context.scopeStartAST = ast;
                    }
                }
                    break;
            }
            walker.options.goChildren = true;
        }
        else {
            walker.options.goChildren = false;
        }
        return ast;
    }

    //
    // Find the enclosing scope context from a position inside a script AST.
    // The "scopeStartAST" of the returned scope is always valid.
    // Return "null" if the enclosing scope can't be found.
    //
    export function findEnclosingScopeAt(logger: ILogger, script: Script, text: ISourceText, pos: number, isMemberCompletion: boolean): EnclosingScopeContext {
        var context = new EnclosingScopeContext(logger, script, text, pos, isMemberCompletion);

        TypeScript.getAstWalkerFactory().walk(script, preFindEnclosingScope, null, null, context);

        if (context.scopeStartAST === null)
            return null;
        return context;
    }
}