// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\typescript.ts' />

module TypeScript {

    export class PullTypeCheckContext {
        public enclosingDeclStack: PullDecl[] = [];
        public enclosingDeclReturnStack: boolean[] = [];
        public semanticInfo: SemanticInfo = null;

        constructor(public compiler: TypeScriptCompiler, public script: Script, public scriptName: string) { }

        public pushEnclosingDecl(decl: PullDecl) {
            this.enclosingDeclStack[this.enclosingDeclStack.length] = decl;
            this.enclosingDeclReturnStack[this.enclosingDeclReturnStack.length] = false;
        }

        public popEnclosingDecl() {
            this.enclosingDeclStack.length--;
            this.enclosingDeclReturnStack.length--;
        }

        public getEnclosingDecl() {
            if (this.enclosingDeclStack.length) {
                return this.enclosingDeclStack[this.enclosingDeclStack.length - 1];
            }

            return null;
        }

        public getEnclosingDeclHasReturn() {
            return this.enclosingDeclReturnStack[this.enclosingDeclReturnStack.length - 1];
        }
        public setEnclosingDeclHasReturn() {
            return this.enclosingDeclReturnStack[this.enclosingDeclReturnStack.length - 1] = true;
        }        
    }

    export class PullTypeChecker {

        static globalPullTypeCheckPhase = 0;
        
        public resolver: PullTypeResolver = null;

        public context: PullTypeResolutionContext = new PullTypeResolutionContext();

        constructor(private compilationSettings: CompilationSettings,
                    public semanticInfoChain: SemanticInfoChain) { }

        public setUnit(unitPath: string) {
            this.resolver = new PullTypeResolver(this.compilationSettings, this.semanticInfoChain, unitPath);
        }

        public getScriptDecl(fileName: string): PullDecl {
            return this.semanticInfoChain.getUnit(fileName).getTopLevelDecls()[0];
        }

        // declarations

        public typeCheckAST(ast: AST, typeCheckContext: PullTypeCheckContext, inTypedAssignment=false): PullTypeSymbol {

            if (!ast) {
                return null;
            }

            if (ast.typeCheckPhase >= PullTypeChecker.globalPullTypeCheckPhase) {
                return null;
            }
            else {
                ast.typeCheckPhase = PullTypeChecker.globalPullTypeCheckPhase;
            }
           
            switch (ast.nodeType) {

                // lists
                case NodeType.List:
                    return this.typeCheckList(ast, typeCheckContext);

                // decarations

                case NodeType.VarDecl:
                case NodeType.ArgDecl:
                    return this.typeCheckBoundDecl(ast, typeCheckContext);

                case NodeType.FuncDecl:
                    return this.typeCheckFunction(ast, typeCheckContext, inTypedAssignment);

                case NodeType.ClassDeclaration:
                    return this.typeCheckClass(ast, typeCheckContext);

                case NodeType.InterfaceDeclaration:
                    return this.typeCheckInterface(ast, typeCheckContext);

                case NodeType.ModuleDeclaration:
                    return this.typeCheckModule(ast, typeCheckContext);

                // expressions

                // assignment
                case NodeType.Asg:
                    return this.typeCheckAssignment(ast, typeCheckContext);

                case GenericType:
                    return this.typeCheckGenericType(ast, typeCheckContext);

                case NodeType.ObjectLit:
                    return this.typeCheckObjectLiteral(ast, typeCheckContext, inTypedAssignment);

                case NodeType.ArrayLit:
                    return this.typeCheckArrayLiteral(ast, typeCheckContext, inTypedAssignment);

                case NodeType.This:
                    return this.typeCheckThis(ast, typeCheckContext);

                case NodeType.Super:
                    return this.typeCheckSuper(ast, typeCheckContext);

                case NodeType.Call:
                    return this.typeCheckCall(ast, typeCheckContext);

                case NodeType.New:
                    return this.typeCheckNew(ast, typeCheckContext);

                case NodeType.TypeAssertion:
                    return this.typeCheckTypeAssertion(ast, typeCheckContext);

                case NodeType.TypeRef:
                    return this.typeCheckTypeReference(ast, typeCheckContext);

                // boolean operations
                case NodeType.Ne:
                case NodeType.Eq:
                case NodeType.Eqv:
                case NodeType.NEqv:
                case NodeType.Lt:
                case NodeType.Le:
                case NodeType.Ge:
                case NodeType.Gt:
                    return this.typeCheckLogicalOperation(ast, typeCheckContext);

                case NodeType.Add:
                case NodeType.AsgAdd:                
                    return this.typeCheckBinaryAdditionOperation(ast, typeCheckContext);

                case NodeType.Sub:
                case NodeType.Mul:
                case NodeType.Div:
                case NodeType.Mod:
                case NodeType.Or:
                case NodeType.And:
                case NodeType.Lsh:
                case NodeType.Rsh:
                case NodeType.Rs2:
                case NodeType.Xor:
                case NodeType.AsgLsh:
                case NodeType.AsgRsh:
                case NodeType.AsgRs2:
                case NodeType.AsgSub:
                case NodeType.AsgMul:
                case NodeType.AsgDiv:
                case NodeType.AsgMod:
                case NodeType.AsgOr:
                case NodeType.AsgAnd:                
                    return this.typeCheckBinaryArithmeticOperation(ast, typeCheckContext);

                case NodeType.Pos:
                case NodeType.Neg:
                case NodeType.Not:
                    return this.semanticInfoChain.numberTypeSymbol;

                case NodeType.IncPost:
                case NodeType.IncPre:
                case NodeType.DecPost:
                case NodeType.DecPre:
                    return this.typeCheckUnaryArithmeticOperation(ast, typeCheckContext);

                case NodeType.Index:
                    return this.typeCheckIndex(ast, typeCheckContext);

                case NodeType.LogNot:
                    return this.semanticInfoChain.boolTypeSymbol;

                case NodeType.LogOr:
                case NodeType.LogAnd:
                    return this.typeCheckLogicalAndOrExpression(ast, typeCheckContext);

                case NodeType.Typeof:
                    return this.typeCheckTypeOf(ast, typeCheckContext);

                case NodeType.ConditionalExpression:
                    return this.typeCheckConditionalExpression(ast, typeCheckContext);

                case NodeType.Void:
                    return this.typeCheckVoidExpression(ast, typeCheckContext);

                case NodeType.Throw:
                    return this.typeCheckThrowExpression(ast, typeCheckContext);

                case NodeType.Delete:
                    return this.typeCheckDeleteExpression(ast, typeCheckContext);

                case NodeType.Regex:
                    return this.typeCheckRegExpExpression(ast, typeCheckContext);

                case NodeType.In:
                    return this.typeCheckInExpression(ast, typeCheckContext);

                case NodeType.InstOf:
                    return this.typeCheckInstanceOfExpression(ast, typeCheckContext);                    

                // statements
                case NodeType.For:
                    return this.typeCheckForStatement(ast, typeCheckContext);

                case NodeType.ForIn:
                    return this.typeCheckForInStatement(ast, typeCheckContext);

                case NodeType.While:
                    return this.typeCheckWhileStatement(ast, typeCheckContext);

                case NodeType.DoWhile:
                    return this.typeCheckDoWhileStatement(ast, typeCheckContext);

                case NodeType.If:
                    return this.typeCheckIfStatement(ast, typeCheckContext);

                case NodeType.Block:
                    return this.typeCheckBlockStatement(ast, typeCheckContext);

                case NodeType.With:
                    return this.typeCheckWithStatement(ast, typeCheckContext);

                case NodeType.TryFinally:
                    return this.typeCheckTryFinallyStatement(ast, typeCheckContext);

                case NodeType.TryCatch:
                    return this.typeCheckTryCatchStatement(ast, typeCheckContext);

                case NodeType.Try:
                    return this.typeCheckTryBlock(ast, typeCheckContext);

                case NodeType.Catch:
                    return this.typeCheckCatchBlock(ast, typeCheckContext);

                case NodeType.Finally:
                    return this.typeCheckFinallyBlock(ast, typeCheckContext);

                case NodeType.Return:
                    return this.typeCheckReturnExpression(ast, typeCheckContext);

                case NodeType.Name:
                    return this.typeCheckNameExpression(ast, typeCheckContext);

                case NodeType.Dot:
                    return this.typeCheckDottedNameExpression(ast, typeCheckContext);

                case NodeType.Switch:
                    return this.typeCheckSwitchStatement(ast, typeCheckContext);

                case NodeType.Case:
                    return this.typeCheckCaseStatement(ast, typeCheckContext);

                // primitives
                case NodeType.NumberLit:
                    return this.semanticInfoChain.numberTypeSymbol;
                case NodeType.QString:
                    return this.semanticInfoChain.stringTypeSymbol;
                case NodeType.Null:
                    return this.semanticInfoChain.nullTypeSymbol;
                case NodeType.True:
                case NodeType.False:
                    return this.semanticInfoChain.boolTypeSymbol;
                case NodeType.Void:
                    return this.semanticInfoChain.voidTypeSymbol;

                default:
                    break;
            }

            return null;
        }

        //
        // Validation
        //

        // scripts
        public typeCheckScript(script: Script, scriptName: string, compiler: TypeScriptCompiler) {
            var typeCheckContext = new PullTypeCheckContext(compiler, script, scriptName);

            this.setUnit(scriptName);
            
            typeCheckContext.semanticInfo = typeCheckContext.compiler.semanticInfoChain.getUnit(typeCheckContext.scriptName);
            var scriptDecl = typeCheckContext.semanticInfo.getTopLevelDecls()[0];
            typeCheckContext.pushEnclosingDecl(scriptDecl);

            PullTypeChecker.globalPullTypeCheckPhase++;

            if (script.bod.members) {
                for (var i = 0; i < script.bod.members.length; i++) {
                    this.typeCheckAST(script.bod.members[i], typeCheckContext);
                }
            }

            typeCheckContext.popEnclosingDecl();
        }

        // lists
        public typeCheckList(ast: AST, typeCheckContext: PullTypeCheckContext) {
            var list = <ASTList>ast;

            if (!list) {
                return null;
            }

            for (var i = 0; i < list.members.length; i++) {
                this.typeCheckAST(list.members[i], typeCheckContext);
            }
        }

        // variable and argument declarations
        // validate:
        //  - lhs and rhs types agree (if lhs has no type annotation)
        public typeCheckBoundDecl(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var boundDeclAST = <BoundDecl>ast;

            var enclosingDecl = typeCheckContext.getEnclosingDecl();

            var varTypeSymbol = this.resolver.resolveAST(boundDeclAST, false, enclosingDecl, this.context).getType();

            // if there's a type expr and an initializer, resolve the initializer
            if (boundDeclAST.init) {
                this.context.pushContextualType(varTypeSymbol, this.context.inProvisionalResolution(), null);
                //var initTypeSymbol = this.resolver.resolveAST(boundDeclAST.init, true, enclosingDecl, this.context).getType();
                var initTypeSymbol = this.typeCheckAST(boundDeclAST.init, typeCheckContext, true);
                this.context.popContextualType();
                
                //getAstWalkerFactory().walk(boundDeclAST.init, prePullTypeCheck, postPullTypeCheck, null, typeCheckContext);

                var comparisonInfo = new TypeComparisonInfo();

                var isAssignable = this.resolver.sourceIsAssignableToTarget(initTypeSymbol, varTypeSymbol, this.context, comparisonInfo);

                if (!isAssignable) {
                    var errorMessage = comparisonInfo.message;

                    // ignore comparison info for now
                    var message = getDiagnosticMessage(DiagnosticCode.Cannot_convert__0__to__1_, [initTypeSymbol.toString(), varTypeSymbol.toString()]);

                    this.context.postError(boundDeclAST.minChar, boundDeclAST.getLength(), typeCheckContext.scriptName, message, enclosingDecl);
                }
            }

            return varTypeSymbol;
        }         

        // functions 
        // validate:
        //  - use of super calls 
        //  - signatures agree in optionality
        //  - getter/setter type agreement
        //  - body members expr
        //  - getter/setter flags agree
        //  - getters have no parameters 
        //  - getters return a value
        //  - setters return no value
        // PULLTODO: split up into separate functions for constructors, indexers, expressions, signatures, etc.
        public typeCheckFunction(ast: AST, typeCheckContext: PullTypeCheckContext, inTypedAssignment = false): PullTypeSymbol {

            var funcDeclAST = <FuncDecl>ast;

            if (funcDeclAST.isConstructor || hasFlag(funcDeclAST.fncFlags, FncFlags.ConstructMember)) {
                return this.typeCheckConstructor(ast, typeCheckContext, inTypedAssignment);
            }
            else if (hasFlag(funcDeclAST.fncFlags, FncFlags.IndexerMember)) {
                return this.typeCheckIndexer(ast, typeCheckContext, inTypedAssignment);
            }
            else if (funcDeclAST.isAccessor()) {
                return this.typeCheckAccessor(ast, typeCheckContext, inTypedAssignment);
            }

            var enclosingDecl = typeCheckContext.getEnclosingDecl();

            var functionSymbol = this.resolver.resolveAST(ast, inTypedAssignment, enclosingDecl, this.context);

            var functionDecl = typeCheckContext.semanticInfo.getDeclForAST(funcDeclAST);

            typeCheckContext.pushEnclosingDecl(functionDecl);

            this.typeCheckAST(funcDeclAST.bod, typeCheckContext);
            var hasReturn = typeCheckContext.getEnclosingDeclHasReturn();
            typeCheckContext.popEnclosingDecl();

            var functionSignature = functionDecl.getSignatureSymbol();

            // check for optionality
            var parameters = functionSignature.getParameters();

            if (parameters.length) {
                var lastWasOptional = false;

                for (var i = 0; i < parameters.length; i++) {

                    if (parameters[i].getIsOptional()) {
                        lastWasOptional = true;
                    }
                    else if (lastWasOptional) {
                        this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Optional parameters may only be followed by other optional parameters", typeCheckContext.getEnclosingDecl());
                    }

                }
            } 

            if (funcDeclAST.bod && funcDeclAST.returnTypeAnnotation != null && !hasReturn) {
                var returnType = functionSignature.getReturnType();
                var isVoidOrAny = returnType == this.semanticInfoChain.anyTypeSymbol || returnType == this.semanticInfoChain.voidTypeSymbol;
                
                if (!isVoidOrAny && !(funcDeclAST.bod.members.length > 0 && funcDeclAST.bod.members[0].nodeType === NodeType.Throw)) {
                    var funcName = functionDecl.getName();
                    funcName = funcName ? "'" + funcName + "'" : "expression";
                    this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Function "+ funcName +" declared a non-void return type, but has no return expression", typeCheckContext.getEnclosingDecl());
                }
            }            

            return functionSymbol ? functionSymbol.getType() : null;
        }

        public typeCheckAccessor(ast: AST, typeCheckContext: PullTypeCheckContext, inTypedAssignment = false): PullTypeSymbol {
            var funcDeclAST = <FuncDecl>ast;            

            var enclosingDecl = typeCheckContext.getEnclosingDecl();

            var accessorSymbol = <PullAccessorSymbol>this.resolver.resolveAST(ast, inTypedAssignment, enclosingDecl, this.context);

            var isGetter = hasFlag(funcDeclAST.fncFlags, FncFlags.GetAccessor);
            var isSetter = !isGetter;

            var getter = accessorSymbol.getGetter();
            var setter = accessorSymbol.getSetter();

            var functionDecl = typeCheckContext.semanticInfo.getDeclForAST(funcDeclAST);

            typeCheckContext.pushEnclosingDecl(functionDecl);

            this.typeCheckAST(funcDeclAST.bod, typeCheckContext);
            var hasReturn = typeCheckContext.getEnclosingDeclHasReturn();
            typeCheckContext.popEnclosingDecl();

            var functionSignature = functionDecl.getSignatureSymbol();

            // check for optionality
            var parameters = functionSignature.getParameters();

            if (parameters.length) {

                if (isGetter) {
                    this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Getters may not take arguments", typeCheckContext.getEnclosingDecl());''
                }
                else {
                    
                    if (parameters.length > 1) {
                        this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Setters may have one and only one argument", typeCheckContext.getEnclosingDecl());''
                    }

                    for (var i = 0; i < parameters.length; i++) {
                        if (parameters[i].getIsOptional()) {
                            this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Setters may not take optional parameters", typeCheckContext.getEnclosingDecl());
                            break;
                        }
                    }
                }
            }

            // PULLREVIEW: Should we also raise an error if the setter returns a value?
            if (isGetter && !hasReturn) {
                if (!(funcDeclAST.bod.members.length > 0 && funcDeclAST.bod.members[0].nodeType === NodeType.Throw)) {
                    this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Getters must return a value", typeCheckContext.getEnclosingDecl());
                }
            }
            else if (isSetter && hasReturn) {
                this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Setters may not return a value", typeCheckContext.getEnclosingDecl());
            }

            if (getter && setter) {
                var getterDecl = getter.getDeclarations()[0];
                var setterDecl = setter.getDeclarations()[0];

                var getterIsPrivate = getterDecl.getFlags() & PullElementFlags.Private;
                var setterIsPrivate = setterDecl.getFlags() & PullElementFlags.Private;

                if (getterIsPrivate != setterIsPrivate) {
                    this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Getter and setter accessors do not agree in visibility", typeCheckContext.getEnclosingDecl());
                }
            }

            return null;
        }

        public typeCheckConstructor(ast: AST, typeCheckContext: PullTypeCheckContext, inTypedAssignment = false): PullTypeSymbol {

            // PULLTODOERROR: "Calls to 'super' constructor are not allowed in classes that either inherit directly from 'Object' or have no base class"
            // PULLTODOERROR: "If a derived class contains initialized properties or constructor parameter properties, the first statement in the constructor body must be a call to the super constructor"
            // PULLTODOERROR: "Constructors for derived classes must contain a call to the class's 'super' constructor"            

            var enclosingDecl = typeCheckContext.getEnclosingDecl();

            var functionSymbol = this.resolver.resolveAST(ast, inTypedAssignment, enclosingDecl, this.context);

            var funcDeclAST = <FuncDecl>ast;

            var functionDecl = typeCheckContext.semanticInfo.getDeclForAST(funcDeclAST);

            typeCheckContext.pushEnclosingDecl(functionDecl);

            this.typeCheckAST(funcDeclAST.bod, typeCheckContext);

            typeCheckContext.popEnclosingDecl();

            var constructorSignature = functionDecl.getSignatureSymbol();

            // check for optionality
            var parameters = constructorSignature.getParameters();

            if (parameters.length) {
                var lastWasOptional = false;

                for (var i = 0; i < parameters.length; i++) {

                    if (parameters[i].getIsOptional()) {
                        lastWasOptional = true;
                    }
                    else if (lastWasOptional) {
                        this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Optional parameters may only be followed by other optional parameters", typeCheckContext.getEnclosingDecl());
                    }

                }
            } 

            return functionSymbol ? functionSymbol.getType() : null;
        }

        public typeCheckIndexer(ast: AST, typeCheckContext: PullTypeCheckContext, inTypedAssignment = false): PullTypeSymbol {
        
            var enclosingDecl = typeCheckContext.getEnclosingDecl();

            // resolve the index signature, even though we won't be needing its type
            this.resolver.resolveAST(ast, inTypedAssignment, enclosingDecl, this.context);

            var funcDeclAST = <FuncDecl>ast;

            var functionDecl = typeCheckContext.semanticInfo.getDeclForAST(funcDeclAST);

            typeCheckContext.pushEnclosingDecl(functionDecl);

            this.typeCheckAST(funcDeclAST.bod, typeCheckContext);

            typeCheckContext.popEnclosingDecl();

            var indexSignature = functionDecl.getSignatureSymbol();
            var parameters = indexSignature.getParameters();

            if (parameters.length) {

                if (parameters.length > 1) {
                    this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Index signatures may take one and only one parameter", typeCheckContext.getEnclosingDecl());
                }

                var parameterType: PullTypeSymbol = null;

                for (var i = 0; i < parameters.length; i++) {

                    if (parameters[i].getIsOptional() || parameters[i].getIsVarArg()) {
                        this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Index signatures may not have optional parameters", typeCheckContext.getEnclosingDecl());
                    }

                    parameterType = parameters[i].getType();

                    if (parameterType != this.semanticInfoChain.stringTypeSymbol && parameterType != this.semanticInfoChain.numberTypeSymbol) {
                        this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Index signatures may not have optional parameters", typeCheckContext.getEnclosingDecl());
                    }
                }
            }
            else {
                this.context.postError(funcDeclAST.minChar, funcDeclAST.getLength(), typeCheckContext.scriptName, "Index signatures may take one and only one parameter", typeCheckContext.getEnclosingDecl());
            }

            return null;
        }

        // Classes
        // validate:
        //  - mutually recursive base classes
        //  - duplicate implemented interfaces
        //  - mutually recursive type parameters
        //  - bases are interfaces or classes
        //  - properties satisfy implemented interfaces
        //  - properties of base class and implemented interfaces agree
        //  - type of overridden member is subtype of original
        //  - method does not overrided field, or vice-versa
        //  - body members
        public typeCheckClass(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var classAST = <ClassDeclaration>ast;
            // resolving the class also resolves its members...
            var classSymbol = <PullClassTypeSymbol>this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();
            
            if (classAST.members) {
                for (var i = 0; i < classAST.members.members.length; i++) {
                    this.typeCheckAST(classAST.members.members[i], typeCheckContext);
                }
            }
            
            return classSymbol;
        }

        // Interfaces
        // validate:
        //  - mutually recursive bases
        //  - duplicate implemented or extended interfaces
        //  - mutually recursive type parameters
        //  - properties of extended interfaces do not conflict
        //  - bases are interfaces or classes
        //  - declarations agree in generic parameters 
        public typeCheckInterface(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var interfaceAST = <InterfaceDeclaration>ast;
            // resolving the interface also resolves its members...
            var interfaceType = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            if (interfaceAST.members) {
                for (var i = 0; i < interfaceAST.members.members.length; i++) {
                    this.typeCheckAST(interfaceAST.members.members[i], typeCheckContext);
                }
            }

            return interfaceType;
        }

        // Modules
        // validate:
        //  - No type parameters?
        public typeCheckModule(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {

            // we resolve here because resolving a module *does not* resolve its MemberScopeContext
            // PULLREVIEW: Perhaps it should?
            var moduleDeclAST = <ModuleDeclaration>ast;
            this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context);

            var moduleDecl = typeCheckContext.semanticInfo.getDeclForAST(moduleDeclAST);
            typeCheckContext.pushEnclosingDecl(moduleDecl);

            if (moduleDeclAST.members) {
                this.typeCheckAST(moduleDeclAST.members, typeCheckContext);
            }

            typeCheckContext.popEnclosingDecl();

            return moduleDecl.getSymbol().getType();
        }

        // expressions

        // Assignment
        // validate:
        //  - lhs and rhs types agree
        //  - lhs is a valid value type
        public typeCheckAssignment(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var assignmentAST = <BinaryExpression>ast;

            var enclosingDecl = typeCheckContext.getEnclosingDecl();

            var leftExpr = this.resolver.resolveAST(assignmentAST.operand1, false, typeCheckContext.getEnclosingDecl(), this.context);
            var leftType = this.resolver.widenType(leftExpr.getType()); //this.typeCheckAST(assignmentAST.operand1, typeCheckContext);

            this.context.pushContextualType(leftType, this.context.inProvisionalResolution(), null);
            var rightType = this.resolver.widenType(this.typeCheckAST(assignmentAST.operand2, typeCheckContext, true));
            this.context.popContextualType();

            var isValidLHS = assignmentAST.operand1.nodeType == NodeType.Index ||
                            leftType == this.semanticInfoChain.anyTypeSymbol ||
                            ((!leftExpr.isType() || leftType.isArray()) && 
                                (leftExpr.getKind() & PullElementKind.SomeLHS) != 0) ||
                            hasFlag(ast.flags, ASTFlags.EnumInitializer);

            if (!isValidLHS) {
                this.context.postError(assignmentAST.operand1.minChar, assignmentAST.operand1.getLength(), typeCheckContext.scriptName, "Invalid left-hand side of assignment expression", enclosingDecl);
            }

            var comparisonInfo = new TypeComparisonInfo();

            var isAssignable = this.resolver.sourceIsAssignableToTarget(rightType, leftType, this.context, comparisonInfo);

            if (!isAssignable) {
                var errorMessage = comparisonInfo.message;

                // ignore comparison info for now
                var message = getDiagnosticMessage(DiagnosticCode.Cannot_convert__0__to__1_, [rightType.toString(), leftType.toString()]);

                this.context.postError(assignmentAST.operand1.minChar, assignmentAST.operand1.getLength(), typeCheckContext.scriptName, message, enclosingDecl);
            }

            return leftType;
        }

        // Generic Type references
        // validate:
        //
        public typeCheckGenericType(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            // validate:
            //  - mutually recursive type parameters and constraints
            return this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        // Object literals
        // validate:
        //
        public typeCheckObjectLiteral(ast: AST, typeCheckContext: PullTypeCheckContext, inTypedAssignment = false): PullTypeSymbol {
            var objectLitAST = <UnaryExpression>ast;

            // PULLTODO: We're really resolving these expressions twice - need a better way...
            var objectLitType = this.resolver.resolveAST(ast, inTypedAssignment, typeCheckContext.getEnclosingDecl(), this.context).getType();
            var memberDecls = <ASTList>objectLitAST.operand;

            var contextualType = this.context.getContextualType();

            // PULLTODO: Contextually type the members
            if (memberDecls) {
                var binex: BinaryExpression;
                var text: string;
                var member: PullSymbol = null;

                for (var i = 0; i < memberDecls.members.length; i++) {
                    binex = <BinaryExpression>memberDecls.members[i];

                    if (contextualType) {
                        if (binex.operand1.nodeType == NodeType.Name) {
                            text = (<Identifier>binex.operand1).text;
                        }
                        else if (binex.operand1.nodeType == NodeType.QString) {
                            text = (<StringLiteral>binex.operand1).text;
                            text = text.substring(1, text.length - 1);
                        }

                        member = contextualType.findMember(text);

                        if (member) {
                            this.context.pushContextualType(member.getType(), this.context.inProvisionalResolution(), null);
                        }
                    }

                    this.typeCheckAST(binex.operand2, typeCheckContext, member != null);

                    if (member) {
                        this.context.popContextualType();
                        member = null;
                    }
                }
            }


            return objectLitType;
        }

        // Array literals
        // validate:
        //  - incompatible types in expression
        public typeCheckArrayLiteral(ast: AST, typeCheckContext: PullTypeCheckContext, inTypedAssignment = false): PullTypeSymbol {
            return this.resolver.resolveAST(ast, inTypedAssignment, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        // 'This' expressions 
        // validate:
        //
        public typeCheckThis(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            return this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        // 'Super' expressions 
        // validate:
        //
        public typeCheckSuper(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            return this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        // Call expressions 
        // validate:
        //
        public typeCheckCall(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            // "use of new expression as a statement"
            var callEx = <CallExpression>ast;
            var resultType = this.resolver.resolveAST(callEx, false, typeCheckContext.getEnclosingDecl(), this.context).getType();


            var args = callEx.arguments;

            if (args) {
                for (var i = 0; i < args.members.length; i++) {
                    this.typeCheckAST(args.members[i], typeCheckContext);
                }
            }

            return resultType;
        }

        // 'New' expressions 
        // validate:
        //
        public typeCheckNew(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var callEx = <CallExpression>ast;
            var resultType = this.resolver.resolveAST(callEx, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            var args = callEx.arguments;

            if (args) {
                for (var i = 0; i < args.members.length; i++) {
                    this.typeCheckAST(args.members[i], typeCheckContext);
                }
            }

            return resultType;
        }

        // Type assertion expressions 
        // validate:
        //  - the type assertion and the expression it's applied to are assignment compatible
        public typeCheckTypeAssertion(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var returnType = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            this.context.pushContextualType(returnType, this.context.inProvisionalResolution(), null);
            var exprType = this.typeCheckAST((<UnaryExpression>ast).operand, typeCheckContext);
            this.context.popContextualType();


            var isAssignable = this.resolver.sourceIsAssignableToTarget(returnType, exprType, this.context, comparisonInfo) ||
                                this.resolver.sourceIsAssignableToTarget(exprType, returnType, this.context, comparisonInfo);

            if (!isAssignable) {
                var comparisonInfo = new TypeComparisonInfo();
                var errorMessage = comparisonInfo.message;

                // ignore comparison info for now
                var message = getDiagnosticMessage(DiagnosticCode.Cannot_convert__0__to__1_, [exprType.toString(), returnType.toString()]);

                this.context.postError(ast.minChar, ast.getLength(), typeCheckContext.scriptName, message, typeCheckContext.getEnclosingDecl());
            }            

            return returnType;
        }

        // Logical operations
        // validate:
        //  - lhs and rhs are compatible
        public typeCheckLogicalOperation(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var binex = <BinaryExpression>ast;
            var type = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            this.typeCheckAST(binex.operand1, typeCheckContext);
            this.typeCheckAST(binex.operand2, typeCheckContext);

            return type;
        }

        // Logical 'And' and 'Or' expressions 
        // validate:
        // - lhs and rhs are compatible
        public typeCheckLogicalAndOrExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var binex = <BinaryExpression>ast;
            var type = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            this.typeCheckAST(binex.operand1, typeCheckContext);
            this.typeCheckAST(binex.operand2, typeCheckContext);

            return type;
        }

        public typeCheckBinaryAdditionOperation(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var binex = <BinaryExpression>ast;
            var type = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            var lhsType = this.typeCheckAST(binex.operand1, typeCheckContext);
            var rhsType = this.typeCheckAST(binex.operand2, typeCheckContext);

            if (lhsType.getKind() == PullElementKind.Enum) {
                lhsType = this.semanticInfoChain.numberTypeSymbol;
            }
            else if (lhsType == this.semanticInfoChain.nullTypeSymbol || lhsType == this.semanticInfoChain.nullTypeSymbol) {
                if (rhsType != this.semanticInfoChain.nullTypeSymbol && rhsType != this.semanticInfoChain.nullTypeSymbol) {
                    lhsType = rhsType;
                }
                else {
                    lhsType = this.semanticInfoChain.anyTypeSymbol;
                }
            }

            if (rhsType.getKind() == PullElementKind.Enum) {
                rhsType = this.semanticInfoChain.numberTypeSymbol;
            }
            else if (rhsType == this.semanticInfoChain.nullTypeSymbol || rhsType == this.semanticInfoChain.nullTypeSymbol) {
                if (lhsType != this.semanticInfoChain.nullTypeSymbol && lhsType != this.semanticInfoChain.nullTypeSymbol) {
                    rhsType = lhsType;
                }
                else {
                    rhsType = this.semanticInfoChain.anyTypeSymbol;
                }
            }         

            var exprType: PullTypeSymbol = null;

            if (lhsType == this.semanticInfoChain.stringTypeSymbol || rhsType == this.semanticInfoChain.stringTypeSymbol) {
                exprType = this.semanticInfoChain.stringTypeSymbol;
            }
            else if (lhsType == this.semanticInfoChain.anyTypeSymbol || rhsType == this.semanticInfoChain.anyTypeSymbol) {
                exprType = this.semanticInfoChain.anyTypeSymbol;
            }
            else if (rhsType == this.semanticInfoChain.numberTypeSymbol && lhsType == this.semanticInfoChain.numberTypeSymbol) {
                exprType = this.semanticInfoChain.numberTypeSymbol;
            }

            if (!exprType) {
                this.context.postError(binex.operand1.minChar, binex.operand1.getLength(), typeCheckContext.scriptName, "Invalid '+' expression - types do not agree", typeCheckContext.getEnclosingDecl());
                exprType = this.semanticInfoChain.anyTypeSymbol;
            }

            return exprType;
        }        

        // Binary arithmetic expressions 
        // validate:
        //  - lhs and rhs are compatible
        public typeCheckBinaryArithmeticOperation(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var binex = <BinaryExpression>ast;
            var type = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            var lhsType = this.typeCheckAST(binex.operand1, typeCheckContext);
            var rhsType = this.typeCheckAST(binex.operand2, typeCheckContext);

            var lhsIsFit = lhsType == this.semanticInfoChain.anyTypeSymbol || lhsType == this.semanticInfoChain.numberTypeSymbol || lhsType.getKind() == PullElementKind.Enum;
            var rhsIsFit = rhsType == this.semanticInfoChain.anyTypeSymbol || rhsType == this.semanticInfoChain.numberTypeSymbol || rhsType.getKind() == PullElementKind.Enum;

            if (!rhsIsFit) {
                this.context.postError(binex.operand1.minChar, binex.operand1.getLength(), typeCheckContext.scriptName, "The right-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type", typeCheckContext.getEnclosingDecl());
            }

            if (!lhsIsFit) {
                this.context.postError(binex.operand2.minChar, binex.operand2.getLength(), typeCheckContext.scriptName, "The left-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type", typeCheckContext.getEnclosingDecl());
            }

            // check for assignment compatibility
            // PULLREVIEW: given the errors above, is this really necessary?
            // switch (ast.nodeType) {
            //     case NodeType.AsgLsh:
            //     case NodeType.AsgRsh:
            //     case NodeType.AsgRs2:
            //     case NodeType.AsgSub:
            //     case NodeType.AsgMul:
            //     case NodeType.AsgDiv:
            //     case NodeType.AsgMod:
            //     case NodeType.AsgOr:
            //     case NodeType.AsgAnd:
            //         var comparisonInfo = new TypeComparisonInfo();

            //         var isAssignable = this.resolver.sourceIsAssignableToTarget(rhsType, lhsType, this.context, comparisonInfo);

            //         if (!isAssignable) {
            //             var errorMessage = comparisonInfo.message;
            //             var enclosingDecl = typeCheckContext.getEnclosingDecl();
            //             var span = enclosingDecl.getSpan();

            //             // ignore comparison info for now
            //             var message = getDiagnosticMessage(PullDiagnosticMessages.incompatibleTypes_2, [rhsType.toString(), lhsType.toString()]);

            //             this.context.postError(binex.operand1.minChar, binex.operand1.getLength(), typeCheckContext.scriptName, message, enclosingDecl);
            //         }

            //     default:
            //         break;
            // }

            return this.semanticInfoChain.numberTypeSymbol;
        }      

        // Unary arithmetic expressions 
        // validate:
        //  -
        public typeCheckUnaryArithmeticOperation(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var unex = <UnaryExpression>ast;
            var lhsType = this.typeCheckAST(unex.operand, typeCheckContext);

            var lhsIsFit = lhsType == this.semanticInfoChain.anyTypeSymbol || lhsType == this.semanticInfoChain.numberTypeSymbol || lhsType.getKind() == PullElementKind.Enum;

            if (!lhsIsFit) {
                this.context.postError(unex.operand.minChar, unex.operand.getLength(), typeCheckContext.scriptName, "The type of a unary arithmetic operation operand must be of type 'any', 'number' or an enum type", typeCheckContext.getEnclosingDecl());
            }           

            return lhsType;
        }

        // Index expression 
        // validate:
        //  -
        public typeCheckIndex(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            return this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        // 'typeof' expression 
        // validate:
        //  -
        public typeCheckTypeOf(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            this.typeCheckAST((<UnaryExpression>ast).operand, typeCheckContext);

            return this.semanticInfoChain.stringTypeSymbol;
        }

        // Type reference expression
        // validate:
        //  -
        public typeCheckTypeReference(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            return this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        // Conditional expressions
        // validate:
        //  -
        public typeCheckConditionalExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            
            var condAST = <ConditionalExpression>ast;
            var type = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            this.typeCheckAST(condAST.operand1, typeCheckContext);
            this.typeCheckAST(condAST.operand2, typeCheckContext);
            this.typeCheckAST(condAST.operand3, typeCheckContext);

            return type;
        }

        // new expression types
        public typeCheckThrowExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            this.resolver.resolveAST((<UnaryExpression>ast).operand, false, typeCheckContext.getEnclosingDecl(), this.context);
            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckDeleteExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var unex = <UnaryExpression>ast;
            var type = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            this.typeCheckAST(unex.operand, typeCheckContext);

            return type;
        }

        public typeCheckVoidExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var unex = <UnaryExpression>ast;
            var type = this.resolver.resolveAST(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();

            this.typeCheckAST(unex.operand, typeCheckContext);

            return type;
        }

        public typeCheckRegExpExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            return this.resolver.resolveStatementOrExpression(ast, false, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        // statements

        public typeCheckForStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var forStatementAST = <ForStatement>ast;

            this.typeCheckAST(forStatementAST.init, typeCheckContext);
            this.typeCheckAST(forStatementAST.cond, typeCheckContext);
            this.typeCheckAST(forStatementAST.body, typeCheckContext);            

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckForInStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {

            var forInStatement = <ForInStatement>ast;

            var rhsType = this.resolver.widenType(this.typeCheckAST(forInStatement.obj, typeCheckContext));
            
            var varDecl = <VarDecl>forInStatement.lval;

            if (varDecl.typeExpr) {
                this.context.postError(varDecl.minChar, varDecl.getLength(), typeCheckContext.scriptName, "Variable declarations for for/in expressions may not contain a type annotation", typeCheckContext.getEnclosingDecl());
            }

            var varSym = this.resolver.resolveAST(varDecl, false, typeCheckContext.getEnclosingDecl(), this.context);

            var isStringOrAny = varSym.getType() == this.semanticInfoChain.stringTypeSymbol || varSym.getType() == this.semanticInfoChain.anyTypeSymbol;
            var isValidRHS = rhsType && (rhsType == this.semanticInfoChain.anyTypeSymbol || !rhsType.isPrimitive());

            if (!isStringOrAny) {
                this.context.postError(varDecl.minChar, varDecl.getLength(), typeCheckContext.scriptName, "Variable declarations for for/in expressions may only be of types 'string' or 'any'", typeCheckContext.getEnclosingDecl());
            }

            if (!isValidRHS) {
                this.context.postError(forInStatement.obj.minChar, forInStatement.obj.getLength(), typeCheckContext.scriptName, "The right operand of a for/in expression must be of type 'any', an object type or a type parameter", typeCheckContext.getEnclosingDecl());
            }        

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckInExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var binex = <BinaryExpression>ast;

            var lhsType = this.resolver.widenType(this.typeCheckAST(binex.operand1, typeCheckContext));
            var rhsType = this.resolver.widenType(this.typeCheckAST(binex.operand2, typeCheckContext));

            var isStringOrAny = lhsType.getType() == this.semanticInfoChain.stringTypeSymbol || lhsType.getType() == this.semanticInfoChain.anyTypeSymbol;
            var isValidRHS = rhsType && (rhsType == this.semanticInfoChain.anyTypeSymbol || !rhsType.isPrimitive());

            if (!isStringOrAny) {
                this.context.postError(binex.operand1.minChar, binex.operand1.getLength(), typeCheckContext.scriptName, "The left-hand side of an 'in' expression may only be of types 'string' or 'any'", typeCheckContext.getEnclosingDecl());
            }

            if (!isValidRHS) {
                this.context.postError(binex.operand1.minChar, binex.operand1.getLength(), typeCheckContext.scriptName, "The right-hand side of an 'in' expression must be of type 'any', an object type or a type parameter", typeCheckContext.getEnclosingDecl());
            }        

            return this.semanticInfoChain.boolTypeSymbol;
        }

        public typeCheckInstanceOfExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var binex = <BinaryExpression>ast;

            var lhsType = this.typeCheckAST(binex.operand1, typeCheckContext)
            var rhsType = this.typeCheckAST(binex.operand2, typeCheckContext);

            var isValidLHS = lhsType && (lhsType == this.semanticInfoChain.anyTypeSymbol || !lhsType.isPrimitive());
            var isValidRHS = rhsType && (rhsType == this.semanticInfoChain.anyTypeSymbol || this.resolver.typeIsSubtypeOfFunction(rhsType, this.context))

            if (!isValidLHS) {
                this.context.postError(binex.operand1.minChar, binex.operand1.getLength(), typeCheckContext.scriptName, "The left-hand side of an 'instanceOf' expression must be of type 'any', an object type or a type parameter", typeCheckContext.getEnclosingDecl());
            }

            if (!isValidRHS) {
                this.context.postError(binex.operand1.minChar, binex.operand1.getLength(), typeCheckContext.scriptName, "The right-hand side of an 'instanceOf' expression must be of type Any or a subtype of the 'Function' interface type", typeCheckContext.getEnclosingDecl());
            }        

            return this.semanticInfoChain.boolTypeSymbol;
        }  

        public typeCheckWhileStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var whileStatementAST = <WhileStatement>ast;

            this.typeCheckAST(whileStatementAST.cond, typeCheckContext);
            this.typeCheckAST(whileStatementAST.body, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckDoWhileStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var whileStatementAST = <DoWhileStatement>ast;

            this.typeCheckAST(whileStatementAST.cond, typeCheckContext);
            this.typeCheckAST(whileStatementAST.body, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckIfStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {

            var ifStatementAST = <IfStatement>ast;

            this.typeCheckAST(ifStatementAST.cond, typeCheckContext);
            this.typeCheckAST(ifStatementAST.thenBod, typeCheckContext);
            this.typeCheckAST(ifStatementAST.elseBod, typeCheckContext);
                
            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckBlockStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var blockStatement = <Block>ast;

            this.typeCheckAST(blockStatement.statements, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckWithStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            // PULLTODO: "With" statements
            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckTryFinallyStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var tryFinallyAST = <TryFinally>ast;

            this.typeCheckAST(tryFinallyAST.tryNode, typeCheckContext);
            this.typeCheckAST(tryFinallyAST.finallyNode, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckTryCatchStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var tryCatchAST = <TryCatch>ast;

            this.typeCheckAST(tryCatchAST.tryNode, typeCheckContext);
            this.typeCheckAST(tryCatchAST.catchNode, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckTryBlock(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var tryAST = <Try>ast;

            this.typeCheckAST(tryAST.body, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckCatchBlock(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var catchAST = <Catch>ast;

            this.typeCheckAST(catchAST.body, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckFinallyBlock(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var finallyAST = <Finally>ast;

            this.typeCheckAST(finallyAST.body, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckReturnExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var returnAST = <ReturnStatement>ast;
            typeCheckContext.setEnclosingDeclHasReturn();
            var returnType = this.typeCheckAST(returnAST.returnExpression, typeCheckContext);

            var enclosingDecl = typeCheckContext.getEnclosingDecl();

            if (enclosingDecl.getKind() & PullElementKind.SomeFunction) {
                var signatureSymbol = enclosingDecl.getSignatureSymbol();
                var sigReturnType = signatureSymbol.getReturnType();

                if (returnType && sigReturnType) {
                    var comparisonInfo = new TypeComparisonInfo();

                    if (!returnType.isResolved()) {
                        this.resolver.resolveDeclaredSymbol(returnType, enclosingDecl, this.context);
                    }

                    if (!sigReturnType.isResolved()) {
                        this.resolver.resolveDeclaredSymbol(sigReturnType, enclosingDecl, this.context);
                    }

                    var isAssignable = this.resolver.sourceIsAssignableToTarget(returnType, sigReturnType, this.context, comparisonInfo);

                    if (!isAssignable) {

                    // ignore comparison info for now
                        var message = getDiagnosticMessage(DiagnosticCode.Cannot_convert__0__to__1_, [returnType.toString(), sigReturnType.toString()]);

                        this.context.postError(ast.minChar, ast.getLength(), typeCheckContext.scriptName, message, enclosingDecl);
                    }
                }
            }

            return returnType;
        }

        public typeCheckNameExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            return this.resolver.resolveNameExpression(<Identifier>ast, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        public typeCheckDottedNameExpression(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            return this.resolver.resolveDottedNameExpression(<BinaryExpression>ast, typeCheckContext.getEnclosingDecl(), this.context).getType();
        }

        public typeCheckSwitchStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var switchAST = <SwitchStatement>ast;

            this.typeCheckAST(switchAST.val, typeCheckContext);
            this.typeCheckAST(switchAST.caseList, typeCheckContext);
            this.typeCheckAST(switchAST.defaultCase, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

        public typeCheckCaseStatement(ast: AST, typeCheckContext: PullTypeCheckContext): PullTypeSymbol {
            var caseAST = <CaseStatement>ast;

            this.typeCheckAST(caseAST.expr, typeCheckContext);
            this.typeCheckAST(caseAST.body, typeCheckContext);

            return this.semanticInfoChain.voidTypeSymbol;
        }

    }
}
