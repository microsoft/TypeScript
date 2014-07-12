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

///<reference path='typescript.ts' />

module TypeScript {

    export enum EmitContainer {
        Prog,
        Module,
        DynamicModule,
        Class,
        Constructor,
        Function,
        Args,
        Interface,
    }

    export class EmitState {
        public column: number;
        public line: number;
        public pretty: boolean;
        public inObjectLiteral: boolean;
        public container: EmitContainer;

        constructor () {
            this.column = 0;
            this.line = 0;
            this.pretty = false;
            this.inObjectLiteral = false;
            this.container = EmitContainer.Prog;
        }
    }

    export class EmitOptions {
        public minWhitespace: boolean;
        public propagateConstants: boolean;
        public emitComments: boolean;
        public emitFullSourceMapPath: boolean;
        public outputOption: string;
        public ioHost: EmitterIOHost = null;
        public outputMany: boolean = true;
        public commonDirectoryPath = "";

        constructor(settings: CompilationSettings) {
            this.minWhitespace = settings.minWhitespace;
            this.propagateConstants = settings.propagateConstants;
            this.emitComments = settings.emitComments;
            this.outputOption = settings.outputOption;
            this.emitFullSourceMapPath = settings.emitFullSourceMapPath;
        }

        public mapOutputFileName(fileName: string, extensionChanger: (fname: string, wholeFileNameReplaced: boolean) => string) {
            if (this.outputMany) {
                var updatedFileName = fileName;
                if (this.outputOption != "") {
                    // Replace the common directory path with the option specified
                    updatedFileName = fileName.replace(this.commonDirectoryPath, "");
                    updatedFileName = this.outputOption + updatedFileName;
                }
                return extensionChanger(updatedFileName, false);
            } else {
                return extensionChanger(this.outputOption, true);
            }
        }
    }

    export class Indenter {
        static indentStep : number = 4;
        static indentStepString : string = "    ";
        static indentStrings: string[] = [];
        public indentAmt: number = 0;

        public increaseIndent() {
            this.indentAmt += Indenter.indentStep;
        }

        public decreaseIndent() {
            this.indentAmt -= Indenter.indentStep;
        }

        public getIndent() {
            var indentString = Indenter.indentStrings[this.indentAmt];
            if (indentString === undefined) {
                indentString = "";
                for (var i = 0; i < this.indentAmt; i = i + Indenter.indentStep) {
                    indentString += Indenter.indentStepString;
                }
                Indenter.indentStrings[this.indentAmt] = indentString;
            }
            return indentString;
        }
    }

    export class Emitter {
        public prologueEmitted = false;
        public thisClassNode: TypeDeclaration = null;
        public thisFnc: FuncDecl = null;
        public moduleDeclList: ModuleDeclaration[] = [];
        public moduleName = "";
        public emitState = new EmitState();
        public indenter = new Indenter();
        public ambientModule = false;
        public modAliasId: string = null;
        public firstModAlias: string = null;
        public allSourceMappers: SourceMapper[] = [];
        public sourceMapper: SourceMapper = null;
        public captureThisStmtString = "var _this = this;";
        private varListCountStack: number[] = [0]; 

        constructor(public checker: TypeChecker, public emittingFileName: string, public outfile: ITextWriter, public emitOptions: EmitOptions, public errorReporter: ErrorReporter) {
        }

        public setSourceMappings(mapper: SourceMapper) {
            this.allSourceMappers.push(mapper);
            this.sourceMapper = mapper;
        }

        public writeToOutput(s: string) {
            this.outfile.Write(s);
            // TODO: check s for newline
            this.emitState.column += s.length;
        }

        public writeToOutputTrimmable(s: string) {
            if (this.emitOptions.minWhitespace) {
                s = s.replace(/[\s]*/g, '');
            }
            this.writeToOutput(s);
        }

        public writeLineToOutput(s: string) {
            if (this.emitOptions.minWhitespace) {
                this.writeToOutput(s);
                var c = s.charCodeAt(s.length - 1);
                if (!((c == LexCodeSpace) || (c == LexCodeSMC) || (c == LexCodeLBR))) {
                    this.writeToOutput(' ');
                }
            }
            else {
                this.outfile.WriteLine(s);
                this.emitState.column = 0
                this.emitState.line++;
            }
        }

        public writeCaptureThisStatement(ast: AST) {
            this.emitIndent();
            this.recordSourceMappingStart(ast);
            this.writeToOutput(this.captureThisStmtString);
            this.recordSourceMappingEnd(ast);
            this.writeLineToOutput("");
        }

        public setInVarBlock(count: number) {
            this.varListCountStack[this.varListCountStack.length - 1] = count;
        }

        public setInObjectLiteral(val: boolean): boolean {
            var temp = this.emitState.inObjectLiteral;
            this.emitState.inObjectLiteral = val;
            return temp;
        }

        public setContainer(c: number): number {
            var temp = this.emitState.container;
            this.emitState.container = c;
            return temp;
        }

        private getIndentString() {
            if (this.emitOptions.minWhitespace) {
                return "";
            }
            else {
                return this.indenter.getIndent();
            }
        }

        public emitIndent() {
            this.writeToOutput(this.getIndentString());
        }

        public emitCommentInPlace(comment: Comment) {
            var text = comment.getText();
            var hadNewLine = false;

            if (comment.isBlockComment) {
                if (this.emitState.column == 0) {
                    this.emitIndent();
                }
                this.recordSourceMappingStart(comment);
                this.writeToOutput(text[0]);

                if (text.length > 1 || comment.endsLine) {
                    for (var i = 1; i < text.length; i++) {
                        this.writeLineToOutput("");
                        this.emitIndent();
                        this.writeToOutput(text[i]);
                    }
                    this.recordSourceMappingEnd(comment);
                    this.writeLineToOutput("");
                    hadNewLine = true;
                } else {
                    this.recordSourceMappingEnd(comment);
                }
            }
            else {
                if (this.emitState.column == 0) {
                    this.emitIndent();
                }
                this.recordSourceMappingStart(comment);
                this.writeToOutput(text[0]);
                this.recordSourceMappingEnd(comment);
                this.writeLineToOutput("");
                hadNewLine = true;
            }

            if (hadNewLine) {
                this.emitIndent();
            }
            else {
                this.writeToOutput(" ");
            }
        }

        public emitParensAndCommentsInPlace(ast: AST, pre: boolean) {
            var comments = pre ? ast.preComments : ast.postComments;

            // comments should be printed before the LParen, but after the RParen
            if (ast.isParenthesized && !pre) {
                this.writeToOutput(")");
            }
            if (this.emitOptions.emitComments && comments && comments.length != 0) {
                for (var i = 0; i < comments.length; i++) {
                    this.emitCommentInPlace(comments[i]);
                }
            }
            if (ast.isParenthesized && pre) {
                this.writeToOutput("(");
            }
        }

        // TODO: emit accessor pattern
        public emitObjectLiteral(content: ASTList) {
            this.writeLineToOutput("{");
            this.indenter.increaseIndent();
            var inObjectLiteral = this.setInObjectLiteral(true);
            this.emitJavascriptList(content, ",", TokenID.Comma, true, false, false);
            this.setInObjectLiteral(inObjectLiteral);
            this.indenter.decreaseIndent();
            this.emitIndent();
            this.writeToOutput("}");
        }

        public emitArrayLiteral(content: ASTList) {
            this.writeToOutput("[");
            if (content) {
                this.writeLineToOutput("");
                this.indenter.increaseIndent();
                this.emitJavascriptList(content, ", ", TokenID.Comma, true, false, false);
                this.indenter.decreaseIndent();
                this.emitIndent();
            }
            this.writeToOutput("]");
        }

        public emitNew(target: AST, args: ASTList) {
            this.writeToOutput("new ");
            if (target.nodeType == NodeType.TypeRef) {
                var typeRef = <TypeReference>target;
                if (typeRef.arrayCount) {
                    this.writeToOutput("Array()");
                }
                else {
                    this.emitJavascript(typeRef.term, TokenID.Tilde, false);
                    this.writeToOutput("()");
                }
            }
            else {
                this.emitJavascript(target, TokenID.Tilde, false);
                this.recordSourceMappingStart(args);
                this.writeToOutput("(");
                this.emitJavascriptList(args, ", ", TokenID.Comma, false, false, false);
                this.writeToOutput(")");
                this.recordSourceMappingEnd(args);
            }
        }

        private getConstantValue(init: AST): number {
            if (init) {
                if (init.nodeType === NodeType.NumberLit) {
                    var numLit = <NumberLiteral>init;
                    return numLit.value;
                }
                else if (init.nodeType === NodeType.Lsh) {
                    var binop = <BinaryExpression>init;
                    if (binop.operand1.nodeType === NodeType.NumberLit &&
                        binop.operand2.nodeType === NodeType.NumberLit) {
                        return (<NumberLiteral>binop.operand1).value << (<NumberLiteral>binop.operand2).value;
                    }
                }
                else if (init.nodeType === NodeType.Name) {
                    var ident = <Identifier>init;
                    if (ident.sym !== null && ident.sym.declAST.nodeType === NodeType.VarDecl) {
                        var varDecl = <VarDecl>ident.sym.declAST;
                        return this.getConstantValue(varDecl.init);
                    }
                }
            }

            return null;
        }

        public tryEmitConstant(dotExpr: BinaryExpression) {
            if (!this.emitOptions.propagateConstants) {
                return false;
            }
            var propertyName = <Identifier>dotExpr.operand2;
            if (propertyName && propertyName.sym && propertyName.sym.isVariable()) {
                if (hasFlag(propertyName.sym.flags, SymbolFlags.Constant)) {
                    if (propertyName.sym.declAST) {
                        var boundDecl = <BoundDecl>propertyName.sym.declAST;
                        var value = this.getConstantValue(boundDecl.init);
                        if (value !== null) {
                            this.writeToOutput(value.toString());
                            var comment = " /* ";
                            comment += propertyName.actualText;
                            comment += " */ ";
                            this.writeToOutput(comment);
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        public emitCall(callNode: CallExpression, target: AST, args: ASTList) {
            if (!this.emitSuperCall(callNode)) {
                if (!hasFlag(callNode.flags, ASTFlags.ClassBaseConstructorCall)) {
                    if (target.nodeType == NodeType.FuncDecl && !target.isParenthesized) {
                        this.writeToOutput("(");
                    }
                    if (callNode.target.nodeType == NodeType.Super && this.emitState.container == EmitContainer.Constructor) {
                        this.writeToOutput("_super.call");
                    }
                    else {
                        this.emitJavascript(target, TokenID.OpenParen, false);
                    }
                    if (target.nodeType == NodeType.FuncDecl && !target.isParenthesized) {
                        this.writeToOutput(")");
                    }
                    this.recordSourceMappingStart(args);
                    this.writeToOutput("(");
                    if (callNode.target.nodeType == NodeType.Super && this.emitState.container == EmitContainer.Constructor) {
                        this.writeToOutput("this");
                        if (args && args.members.length) {
                            this.writeToOutput(", ");
                        }
                    }
                    this.emitJavascriptList(args, ", ", TokenID.Comma, false, false, false);
                    this.writeToOutput(")");
                    this.recordSourceMappingEnd(args);
                }
                else {
                    this.indenter.decreaseIndent();
                    this.indenter.decreaseIndent();
                    var constructorCall = new ASTList();
                    constructorCall.members[0] = callNode;
                    this.emitConstructorCalls(constructorCall, this.thisClassNode);
                    this.indenter.increaseIndent();
                    this.indenter.increaseIndent();
                }
            }
        }

        public emitConstructorCalls(bases: ASTList, classDecl: TypeDeclaration) {
            if (bases == null) {
                return;
            }
            var basesLen = bases.members.length;
            this.recordSourceMappingStart(classDecl);
            for (var i = 0; i < basesLen; i++) {
                var baseExpr = bases.members[i];
                var baseSymbol: Symbol = null;
                if (baseExpr.nodeType == NodeType.Call) {
                    baseSymbol = (<CallExpression>baseExpr).target.type.symbol;
                }
                else {
                    baseSymbol = baseExpr.type.symbol;
                }
                var baseName = baseSymbol.name;
                if (baseSymbol.declModule != classDecl.type.symbol.declModule) {
                    baseName = baseSymbol.fullName();
                }
                if (baseExpr.nodeType == NodeType.Call) {
                    this.emitIndent();
                    this.writeToOutput("_super.call(this");
                    var args = (<CallExpression>baseExpr).arguments;
                    if (args && (args.members.length > 0)) {
                        this.writeToOutput(", ");
                        this.emitJavascriptList(args, ", ", TokenID.Comma, false, false, false);
                    }
                    this.writeToOutput(")");
                }
                else {
                    if (baseExpr.type && (baseExpr.type.isClassInstance())) {
                        // parameterless constructor call;
                        this.emitIndent();
                        this.writeToOutput(classDecl.name.actualText + "._super.constructor");
                        //emitJavascript(baseExpr,TokenID.LParen,false);
                        this.writeToOutput(".call(this)");
                    }
                }
            }
            this.recordSourceMappingEnd(classDecl);
        }

        public emitInnerFunction(funcDecl: FuncDecl, printName: boolean, isMember: boolean,
            bases: ASTList, hasSelfRef: boolean, classDecl: TypeDeclaration) {
            /// REVIEW: The code below causes functions to get pushed to a newline in cases where they shouldn't
            /// such as: 
            ///     Foo.prototype.bar = 
            ///         function() {
            ///         };
            /// Once we start emitting comments, we should pull this code out to place on the outer context where the function
            /// is used.
            //if (funcDecl.preComments!=null && funcDecl.preComments.length>0) {
            //    this.writeLineToOutput("");
            //    this.increaseIndent();
            //    emitIndent();
            //}

            var isClassConstructor = funcDecl.isConstructor && hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod);
            var hasNonObjectBaseType = isClassConstructor && hasFlag(this.thisClassNode.type.instanceType.typeFlags, TypeFlags.HasBaseType) && !hasFlag(this.thisClassNode.type.instanceType.typeFlags, TypeFlags.HasBaseTypeOfObject);
            var classPropertiesMustComeAfterSuperCall = hasNonObjectBaseType && hasFlag((<ClassDeclaration>this.thisClassNode).varFlags, VarFlags.ClassSuperMustBeFirstCallInConstructor);

            // We have no way of knowing if the current function is used as an expression or a statement, so as to enusre that the emitted
            // JavaScript is always valid, add an extra parentheses for unparenthesized function expressions
            var shouldParenthesize = hasFlag(funcDecl.fncFlags, FncFlags.IsFunctionExpression) && !funcDecl.isParenthesized && !funcDecl.isAccessor() && (hasFlag(funcDecl.flags, ASTFlags.ExplicitSemicolon) || hasFlag(funcDecl.flags, ASTFlags.AutomaticSemicolon));

            this.emitParensAndCommentsInPlace(funcDecl, true);
            if (shouldParenthesize) {
                this.writeToOutput("(");
            }
            this.recordSourceMappingStart(funcDecl);
            if (!(funcDecl.isAccessor() && (<FieldSymbol>funcDecl.accessorSymbol).isObjectLitField)) {
                this.writeToOutput("function ");
            }
            if (printName) {
                var id = funcDecl.getNameText();
                if (id && !funcDecl.isAccessor()) {
                    if (funcDecl.name) {
                        this.recordSourceMappingStart(funcDecl.name);
                    }
                    this.writeToOutput(id);
                    if (funcDecl.name) {
                        this.recordSourceMappingEnd(funcDecl.name);
                    }
                }
            }

            this.writeToOutput("(");
            var argsLen = 0;
            var i = 0;
            var arg: ArgDecl;
            var defaultArgs: ArgDecl[] = [];
            if (funcDecl.arguments) {
                var tempContainer = this.setContainer(EmitContainer.Args);
                argsLen = funcDecl.arguments.members.length;
                var printLen = argsLen;
                if (funcDecl.variableArgList) {
                    printLen--;
                }
                for (i = 0; i < printLen; i++) {
                    arg = <ArgDecl>funcDecl.arguments.members[i];
                    if (arg.init) {
                        defaultArgs.push(arg);
                    }
                    this.emitJavascript(arg, TokenID.OpenParen, false);
                    if (i < (printLen - 1)) {
                        this.writeToOutput(", ");
                    }
                }
                this.setContainer(tempContainer);
            }
            this.writeLineToOutput(") {");

            if (funcDecl.isConstructor) {
                this.recordSourceMappingNameStart("constructor");
            } else if (funcDecl.isGetAccessor()) {
                this.recordSourceMappingNameStart("get_" + funcDecl.getNameText());
            } else if (funcDecl.isSetAccessor()) {
                this.recordSourceMappingNameStart("set_" + funcDecl.getNameText());
            } else {
                this.recordSourceMappingNameStart(funcDecl.getNameText());
            }
            this.indenter.increaseIndent();

            // set default args first
            for (i = 0; i < defaultArgs.length; i++) {
                var arg = defaultArgs[i];
                this.emitIndent();
                this.recordSourceMappingStart(arg);
                this.writeToOutput("if (typeof " + arg.id.actualText + " === \"undefined\") { ");//
                this.recordSourceMappingStart(arg.id);
                this.writeToOutput(arg.id.actualText);
                this.recordSourceMappingEnd(arg.id);
                this.writeToOutput(" = ");
                this.emitJavascript(arg.init, TokenID.OpenParen, false);
                this.writeLineToOutput("; }")
                this.recordSourceMappingEnd(arg);
            }

            if (funcDecl.isConstructor && ((<ClassDeclaration>funcDecl.classDecl).varFlags & VarFlags.MustCaptureThis)) {
                this.writeCaptureThisStatement(funcDecl);
            }

            if (funcDecl.isConstructor && !classPropertiesMustComeAfterSuperCall) {
                if (funcDecl.arguments) {
                    argsLen = funcDecl.arguments.members.length;
                    for (i = 0; i < argsLen; i++) {
                        arg = <ArgDecl>funcDecl.arguments.members[i];
                        if ((arg.varFlags & VarFlags.Property) != VarFlags.None) {
                            this.emitIndent();
                            this.recordSourceMappingStart(arg);
                            this.recordSourceMappingStart(arg.id);
                            this.writeToOutput("this." + arg.id.actualText);
                            this.recordSourceMappingEnd(arg.id);
                            this.writeToOutput(" = ");
                            this.recordSourceMappingStart(arg.id);
                            this.writeToOutput(arg.id.actualText);
                            this.recordSourceMappingEnd(arg.id);
                            this.writeLineToOutput(";");
                            this.recordSourceMappingEnd(arg);
                        }
                    }
                }

                // For classes, the constructor needs to be explicitly called
                if (!hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod)) {
                    this.emitConstructorCalls(bases, classDecl);
                }
            }
            if (hasSelfRef) {
                this.writeCaptureThisStatement(funcDecl);
            }
            if (funcDecl.variableArgList) {
                argsLen = funcDecl.arguments.members.length;
                var lastArg = <ArgDecl>funcDecl.arguments.members[argsLen - 1];
                this.emitIndent();
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("var ");
                this.recordSourceMappingStart(lastArg.id);
                this.writeToOutput(lastArg.id.actualText);
                this.recordSourceMappingEnd(lastArg.id);
                this.writeLineToOutput(" = [];");
                this.recordSourceMappingEnd(lastArg);
                this.emitIndent();
                this.writeToOutput("for (")
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("var _i = 0;");
                this.recordSourceMappingEnd(lastArg);
                this.writeToOutput(" ");
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("_i < (arguments.length - " + (argsLen - 1) + ")");
                this.recordSourceMappingEnd(lastArg);
                this.writeToOutput("; ");
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("_i++");
                this.recordSourceMappingEnd(lastArg);
                this.writeLineToOutput(") {");
                this.indenter.increaseIndent();
                this.emitIndent();

                this.recordSourceMappingStart(lastArg);
                this.writeToOutput(lastArg.id.actualText + "[_i] = arguments[_i + " + (argsLen - 1) + "];");
                this.recordSourceMappingEnd(lastArg);
                this.writeLineToOutput("");
                this.indenter.decreaseIndent();
                this.emitIndent();
                this.writeLineToOutput("}");
            }

            // if it's a class, emit the uninitializedMembers, first emit the non-proto class body members
            if (funcDecl.isConstructor && hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod) && !classPropertiesMustComeAfterSuperCall) {

                var nProps = (<ASTList>this.thisClassNode.members).members.length;

                for (var i = 0; i < nProps; i++) {
                    if ((<ASTList>this.thisClassNode.members).members[i].nodeType == NodeType.VarDecl) {
                        var varDecl = <VarDecl>(<ASTList>this.thisClassNode.members).members[i];
                        if (!hasFlag(varDecl.varFlags, VarFlags.Static) && varDecl.init) {
                            this.emitIndent();
                            this.emitJavascriptVarDecl(varDecl, TokenID.Tilde);
                            this.writeLineToOutput("");
                        }
                    }
                }
                //this.writeLineToOutput("");
            }

            this.emitBareJavascriptStatements(funcDecl.bod, classPropertiesMustComeAfterSuperCall);

            this.indenter.decreaseIndent();
            this.emitIndent();
            this.recordSourceMappingStart(funcDecl.endingToken);
            this.writeToOutput("}");

            this.recordSourceMappingNameEnd();
            this.recordSourceMappingEnd(funcDecl.endingToken);
            this.recordSourceMappingEnd(funcDecl);

            if (shouldParenthesize) {
                this.writeToOutput(")");
            }

            // The extra call is to make sure the caller's funcDecl end is recorded, since caller wont be able to record it
            this.recordSourceMappingEnd(funcDecl);

            this.emitParensAndCommentsInPlace(funcDecl, false);

            if (!isMember &&
                //funcDecl.name != null &&
                !hasFlag(funcDecl.fncFlags, FncFlags.IsFunctionExpression) &&
                (hasFlag(funcDecl.fncFlags, FncFlags.Definition) || funcDecl.isConstructor)) {
                this.writeLineToOutput("");
            } else if (hasFlag(funcDecl.fncFlags, FncFlags.IsFunctionExpression)) {
                if (hasFlag(funcDecl.flags, ASTFlags.ExplicitSemicolon) || hasFlag(funcDecl.flags, ASTFlags.AutomaticSemicolon)) {
                    // If either of these two flags are set, then the function expression is a statement. Terminate it.
                    this.writeLineToOutput(";");
                }
            }
            /// TODO: See the other part of this at the beginning of function
            //if (funcDecl.preComments!=null && funcDecl.preComments.length>0) {
            //    this.decreaseIndent();
            //}           
        }

        public emitJavascriptModule(moduleDecl: ModuleDeclaration) {
            var modName = moduleDecl.name.actualText;
            if (isTSFile(modName)) {
                moduleDecl.name.setText(modName.substring(0, modName.length - 3));
            }
            else if (isSTRFile(modName)) {
                moduleDecl.name.setText(modName.substring(0, modName.length - 4));
            }

            if (!hasFlag(moduleDecl.modFlags, ModuleFlags.Ambient)) {
                var isDynamicMod = hasFlag(moduleDecl.modFlags, ModuleFlags.IsDynamic);
                var prevOutFile = this.outfile;
                var prevOutFileName = this.emittingFileName;
                var prevAllSourceMappers = this.allSourceMappers;
                var prevSourceMapper = this.sourceMapper;
                var prevColumn = this.emitState.column;
                var prevLine = this.emitState.line;
                var temp = this.setContainer(EmitContainer.Module);
                var svModuleName = this.moduleName;
                var isExported = hasFlag(moduleDecl.modFlags, ModuleFlags.Exported);
                this.moduleDeclList[this.moduleDeclList.length] = moduleDecl;
                var isWholeFile = hasFlag(moduleDecl.modFlags, ModuleFlags.IsWholeFile);
                this.moduleName = moduleDecl.name.actualText;

                // prologue
                if (isDynamicMod) {
                    // create the new outfile for this module
                    var tsModFileName = stripQuotes(moduleDecl.name.actualText);
                    var modFilePath = trimModName(tsModFileName) + ".js";
                    modFilePath = this.emitOptions.mapOutputFileName(modFilePath, TypeScriptCompiler.mapToJSFileName);

                    if (this.emitOptions.ioHost) {
                        // Ensure that the slashes are normalized so that the comparison is fair
                        // REVIEW: Note that modFilePath is normalized to forward slashes in Parser.parse, so the 
                        // first call to switchToForwardSlashes is technically a no-op, but it will prevent us from
                        // regressing if the parser changes
                        if (switchToForwardSlashes(modFilePath) != switchToForwardSlashes(this.emittingFileName)) {
                            this.emittingFileName = modFilePath;
                            var useUTF8InOutputfile = moduleDecl.containsUnicodeChar || (this.emitOptions.emitComments && moduleDecl.containsUnicodeCharInComment);
                            this.outfile = this.createFile(this.emittingFileName, useUTF8InOutputfile);
                            if (prevSourceMapper != null) {
                                this.allSourceMappers = [];
                                var sourceMappingFile = this.createFile(this.emittingFileName + SourceMapper.MapFileExtension, false);
                                this.setSourceMappings(new TypeScript.SourceMapper(tsModFileName, this.emittingFileName, this.outfile, sourceMappingFile, this.errorReporter, this.emitOptions.emitFullSourceMapPath));
                                this.emitState.column = 0;
                                this.emitState.line = 0;
                            }
                        } else {
                            CompilerDiagnostics.assert(this.emitOptions.outputMany, "Cannot have dynamic modules compiling into single file");
                        }
                    }

                    this.setContainer(EmitContainer.DynamicModule); // discard the previous 'Module' container

                    this.recordSourceMappingStart(moduleDecl);
                    if (moduleGenTarget == ModuleGenTarget.Asynchronous) { // AMD
                        var dependencyList = "[\"require\", \"exports\"";
                        var importList = "require, exports";
                        var importStatement: ImportDeclaration = null;

                        // all dependencies are quoted
                        for (var i = 0; i < (<ModuleType>moduleDecl.mod).importedModules.length; i++) {
                            importStatement = (<ModuleType>moduleDecl.mod).importedModules[i]

                            // if the imported module is only used in a type position, do not add it as a requirement
                            if (importStatement.id.sym &&
                                !(<TypeSymbol>importStatement.id.sym).onlyReferencedAsTypeRef) {
                                if (i <= (<ModuleType>moduleDecl.mod).importedModules.length - 1) {
                                    dependencyList += ", ";
                                    importList += ", ";
                                }

                                importList += "__" + importStatement.id.actualText + "__";
                                dependencyList += importStatement.firstAliasedModToString();
                            }
                        }

                        // emit any potential amd dependencies
                        for (var i = 0; i < moduleDecl.amdDependencies.length; i++) {
                            dependencyList += ", \"" + moduleDecl.amdDependencies[i] + "\"";
                        }

                        dependencyList += "]";

                        this.writeLineToOutput("define(" + dependencyList + "," + " function(" + importList + ") {");
                    }
                    else { // Node

                    }
                }
                else {

                    if (!isExported) {
                        this.recordSourceMappingStart(moduleDecl);
                        this.writeToOutput("var ");
                        this.recordSourceMappingStart(moduleDecl.name);
                        this.writeToOutput(this.moduleName);
                        this.recordSourceMappingEnd(moduleDecl.name);
                        this.writeLineToOutput(";");
                        this.recordSourceMappingEnd(moduleDecl);
                        this.emitIndent();
                    }

                    this.writeToOutput("(");
                    this.recordSourceMappingStart(moduleDecl);
                    this.writeToOutput("function (");
                    this.recordSourceMappingStart(moduleDecl.name);
                    this.writeToOutput(this.moduleName);
                    this.recordSourceMappingEnd(moduleDecl.name);
                    this.writeLineToOutput(") {");
                }

                if (!isWholeFile) {
                    this.recordSourceMappingNameStart(this.moduleName);
                }

                // body - don't indent for Node
                if (!isDynamicMod || moduleGenTarget == ModuleGenTarget.Asynchronous) {
                    this.indenter.increaseIndent();
                }

                if (moduleDecl.modFlags & ModuleFlags.MustCaptureThis) {
                    this.writeCaptureThisStatement(moduleDecl);
                }

                this.emitJavascriptList(moduleDecl.members, null, TokenID.Semicolon, true, false, false);
                if (!isDynamicMod || moduleGenTarget == ModuleGenTarget.Asynchronous) {
                    this.indenter.decreaseIndent();
                }
                this.emitIndent();

                // epilogue
                if (isDynamicMod) {
                    if (moduleGenTarget == ModuleGenTarget.Asynchronous) { // AMD
                        this.writeLineToOutput("})");
                    }
                    else { // Node
                    }
                    if (!isWholeFile) {
                        this.recordSourceMappingNameEnd();
                    }
                    this.recordSourceMappingEnd(moduleDecl);

                    // close the module outfile, and restore the old one
                    if (this.outfile != prevOutFile) {
                        this.Close();
                        if (prevSourceMapper != null) {
                            this.allSourceMappers = prevAllSourceMappers;
                            this.sourceMapper = prevSourceMapper;
                            this.emitState.column = prevColumn;
                            this.emitState.line = prevLine;
                        }
                        this.outfile = prevOutFile;
                        this.emittingFileName = prevOutFileName;
                    }
                }
                else {
                    var containingMod: ModuleDeclaration = null;
                    if (moduleDecl.type && moduleDecl.type.symbol.container && moduleDecl.type.symbol.container.declAST) {
                        containingMod = <ModuleDeclaration>moduleDecl.type.symbol.container.declAST;
                    }
                    var parentIsDynamic = containingMod && hasFlag(containingMod.modFlags, ModuleFlags.IsDynamic);

                    this.recordSourceMappingStart(moduleDecl.endingToken);
                    if (temp == EmitContainer.Prog && isExported) {
                        this.writeToOutput("}");
                        if (!isWholeFile) {
                            this.recordSourceMappingNameEnd();
                        }
                        this.recordSourceMappingEnd(moduleDecl.endingToken);
                        this.writeToOutput(")(this." + this.moduleName + " || (this." + this.moduleName + " = {}));");
                    }
                    else if (isExported || temp == EmitContainer.Prog) {
                        var dotMod = svModuleName != "" ? (parentIsDynamic ? "exports" : svModuleName) + "." : svModuleName;
                        this.writeToOutput("}");
                        if (!isWholeFile) {
                            this.recordSourceMappingNameEnd();
                        }
                        this.recordSourceMappingEnd(moduleDecl.endingToken);
                        this.writeToOutput(")(" + dotMod + this.moduleName + " || (" + dotMod + this.moduleName + " = {}));");
                    }
                    else if (!isExported && temp != EmitContainer.Prog) {
                        this.writeToOutput("}");
                        if (!isWholeFile) {
                            this.recordSourceMappingNameEnd();
                        }
                        this.recordSourceMappingEnd(moduleDecl.endingToken);
                        this.writeToOutput(")(" + this.moduleName + " || (" + this.moduleName + " = {}));");
                    }
                    else {
                        this.writeToOutput("}");
                        if (!isWholeFile) {
                            this.recordSourceMappingNameEnd();
                        }
                        this.recordSourceMappingEnd(moduleDecl.endingToken);
                        this.writeToOutput(")();");
                    }
                    this.recordSourceMappingEnd(moduleDecl);
                    this.writeLineToOutput("");
                    if (temp != EmitContainer.Prog && isExported) {
                        this.emitIndent();
                        this.recordSourceMappingStart(moduleDecl);
                        if (parentIsDynamic) {
                            this.writeLineToOutput("var " + this.moduleName + " = exports." + this.moduleName + ";");
                        } else {
                            this.writeLineToOutput("var " + this.moduleName + " = " + svModuleName + "." + this.moduleName + ";");
                        }
                        this.recordSourceMappingEnd(moduleDecl);
                    }
                }

                this.setContainer(temp);
                this.moduleName = svModuleName;
                this.moduleDeclList.length--;
            }
        }

        public emitIndex(operand1: AST, operand2: AST) {
            var temp = this.setInObjectLiteral(false);
            this.emitJavascript(operand1, TokenID.Tilde, false);
            this.writeToOutput("[");
            this.emitJavascriptList(operand2, ", ", TokenID.Comma, false, false, false);
            this.writeToOutput("]");
            this.setInObjectLiteral(temp);
        }

        public emitStringLiteral(text: string) {
            // should preserve escape etc.
            // TODO: simplify object literal simple name
            this.writeToOutput(text);
        }

        public emitJavascriptFunction(funcDecl: FuncDecl) {
            if (hasFlag(funcDecl.fncFlags, FncFlags.Signature) || funcDecl.isOverload) {
                return;
            }
            var temp: number;
            var tempFnc = this.thisFnc;
            this.thisFnc = funcDecl;

            if (funcDecl.isConstructor) {
                temp = this.setContainer(EmitContainer.Constructor);
            }
            else {
                temp = this.setContainer(EmitContainer.Function);
            }

            var bases: ASTList = null;
            var hasSelfRef = false;
            var funcName = funcDecl.getNameText();

            if ((this.emitState.inObjectLiteral || !funcDecl.isAccessor()) &&
                ((temp != EmitContainer.Constructor) ||
                ((funcDecl.fncFlags & FncFlags.Method) == FncFlags.None))) {
                var tempLit = this.setInObjectLiteral(false);
                if (this.thisClassNode) {
                    bases = this.thisClassNode.extendsList;
                }
                hasSelfRef = Emitter.shouldCaptureThis(funcDecl);
                this.recordSourceMappingStart(funcDecl);
                if (hasFlag(funcDecl.fncFlags, FncFlags.Exported | FncFlags.ClassPropertyMethodExported) && funcDecl.type.symbol.container == this.checker.gloMod && !funcDecl.isConstructor) {
                    this.writeToOutput("this." + funcName + " = ");
                    this.emitInnerFunction(funcDecl, false, false, bases, hasSelfRef, this.thisClassNode);
                }
                else {
                    this.emitInnerFunction(funcDecl, (funcDecl.name && !funcDecl.name.isMissing()), false, bases, hasSelfRef, this.thisClassNode);
                }
                this.setInObjectLiteral(tempLit);
            }
            this.setContainer(temp);
            this.thisFnc = tempFnc;

            if (hasFlag(funcDecl.fncFlags, FncFlags.Definition)) {
                if (hasFlag(funcDecl.fncFlags, FncFlags.Static)) {
                    if (this.thisClassNode) {
                        if (funcDecl.isAccessor()) {
                            this.emitPropertyAccessor(funcDecl, this.thisClassNode.name.actualText, false);
                        }
                        else {
                            this.emitIndent();
                            this.recordSourceMappingStart(funcDecl);
                            this.writeLineToOutput(this.thisClassNode.name.actualText + "." + funcName +
                                          " = " + funcName + ";");
                            this.recordSourceMappingEnd(funcDecl);
                        }
                    }
                }
                else if ((this.emitState.container == EmitContainer.Module || this.emitState.container == EmitContainer.DynamicModule) && hasFlag(funcDecl.fncFlags, FncFlags.Exported | FncFlags.ClassPropertyMethodExported)) {
                    this.emitIndent();
                    var modName = this.emitState.container == EmitContainer.Module ? this.moduleName : "exports";
                    this.recordSourceMappingStart(funcDecl);
                    this.writeLineToOutput(modName + "." + funcName +
                                      " = " + funcName + ";");
                    this.recordSourceMappingEnd(funcDecl);
                }
            }
        }

        public emitAmbientVarDecl(varDecl: VarDecl) {
            if (varDecl.init) {
                this.emitParensAndCommentsInPlace(varDecl, true);
                this.recordSourceMappingStart(varDecl);
                this.recordSourceMappingStart(varDecl.id);
                this.writeToOutput(varDecl.id.actualText);
                this.recordSourceMappingEnd(varDecl.id);
                this.writeToOutput(" = ");
                this.emitJavascript(varDecl.init, TokenID.Comma, false);
                this.recordSourceMappingEnd(varDecl);
                this.writeToOutput(";");
                this.emitParensAndCommentsInPlace(varDecl, false);
            }
        }

        private varListCount(): number {
            return this.varListCountStack[this.varListCountStack.length - 1];
        }

        // Emits "var " if it is allowed
        private emitVarDeclVar() {
            // If it is var list of form var a, b, c = emit it only if count > 0 - which will be when emitting first var
            // If it is var list of form  var a = varList count will be 0
            if (this.varListCount() >= 0) {
                this.writeToOutput("var ");
                this.setInVarBlock(-this.varListCount());
            }
            return true;
        }

        private onEmitVar() {
            if (this.varListCount() > 0) {
                this.setInVarBlock(this.varListCount() - 1);
            }
            else if (this.varListCount() < 0) {
                this.setInVarBlock(this.varListCount() + 1);
            }
        }

        public emitJavascriptVarDecl(varDecl: VarDecl, tokenId: TokenID) {
            if ((varDecl.varFlags & VarFlags.Ambient) == VarFlags.Ambient) {
                this.emitAmbientVarDecl(varDecl);
                this.onEmitVar();
            }
            else {
                var sym = varDecl.sym;
                var hasInitializer = (varDecl.init != null);
                this.emitParensAndCommentsInPlace(varDecl, true);
                this.recordSourceMappingStart(varDecl);
                if (sym && sym.isMember() && sym.container &&
                    (sym.container.kind() == SymbolKind.Type)) {
                    var type = (<TypeSymbol>sym.container).type;
                    if (type.isClass() && (!hasFlag(sym.flags, SymbolFlags.ModuleMember))) {
                        // class
                        if (this.emitState.container != EmitContainer.Args) {
                            if (hasFlag(sym.flags, SymbolFlags.Static)) {
                                this.writeToOutput(sym.container.name + ".");
                            }
                            else {
                                this.writeToOutput("this.");
                            }
                        }
                    }
                    else if (type.hasImplementation()) {
                        // module
                        if (!hasFlag(sym.flags, SymbolFlags.Exported) && (sym.container == this.checker.gloMod || !hasFlag(sym.flags, SymbolFlags.Property))) {
                            this.emitVarDeclVar();
                        }
                        else if (hasFlag(varDecl.varFlags, VarFlags.LocalStatic)) {
                            this.writeToOutput(".");
                        }
                        else {
                            if (this.emitState.container == EmitContainer.DynamicModule) {
                                this.writeToOutput("exports.");
                            }
                            else {
                                this.writeToOutput(this.moduleName + ".");
                            }
                        }
                    }
                    else {
                        // function, constructor, method etc.
                        if (tokenId != TokenID.OpenParen) {
                            if (hasFlag(sym.flags, SymbolFlags.Exported) && sym.container == this.checker.gloMod) {
                                this.writeToOutput("this.");
                            }
                            else {
                                this.emitVarDeclVar();
                            }
                        }
                    }
                }
                else {
                    if (tokenId != TokenID.OpenParen) {
                        this.emitVarDeclVar();
                    }
                }
                this.recordSourceMappingStart(varDecl.id);
                this.writeToOutput(varDecl.id.actualText);
                this.recordSourceMappingEnd(varDecl.id);
                if (hasInitializer) {
                    this.writeToOutputTrimmable(" = ");

                    // Ensure we have a fresh var list count when recursing into the variable 
                    // initializer.  We don't want our current list of variables to affect how we
                    // emit nested variable lists.
                    this.varListCountStack.push(0);
                    this.emitJavascript(varDecl.init, TokenID.Comma, false);
                    this.varListCountStack.pop();
                }
                this.onEmitVar();
                if ((tokenId != TokenID.OpenParen)) {
                    if (this.varListCount() < 0) {
                        this.writeToOutput(", ");
                    } else if (tokenId != TokenID.For) {
                        this.writeToOutputTrimmable(";");
                    }
                }
                this.recordSourceMappingEnd(varDecl);
                this.emitParensAndCommentsInPlace(varDecl, false);
            }
        }

        public declEnclosed(moduleDecl: ModuleDeclaration): boolean {
            if (moduleDecl == null) {
                return true;
            }
            for (var i = 0, len = this.moduleDeclList.length; i < len; i++) {
                if (this.moduleDeclList[i] == moduleDecl) {
                    return true;
                }
            }
            return false;
        }

        public emitJavascriptName(name: Identifier, addThis: boolean) {
            var sym = name.sym;
            this.emitParensAndCommentsInPlace(name, true);
            this.recordSourceMappingStart(name);
            if (!name.isMissing()) {
                if (addThis && (this.emitState.container != EmitContainer.Args) && sym) {
                    // TODO: flag global module with marker other than string name
                    if (sym.container && (sym.container.name != globalId)) {
                        if (hasFlag(sym.flags, SymbolFlags.Static) && (hasFlag(sym.flags, SymbolFlags.Property))) {
                            if (sym.declModule && hasFlag(sym.declModule.modFlags, ModuleFlags.IsDynamic)) {
                                this.writeToOutput("exports.");
                            }
                            else {
                                this.writeToOutput(sym.container.name + ".");
                            }
                        }
                        else if (sym.kind() == SymbolKind.Field) {
                            var fieldSym = <FieldSymbol>sym;
                            if (hasFlag(fieldSym.flags, SymbolFlags.ModuleMember)) {
                                if ((sym.container != this.checker.gloMod) && ((hasFlag(sym.flags, SymbolFlags.Property)) || hasFlag(sym.flags, SymbolFlags.Exported))) {
                                    if (hasFlag(sym.declModule.modFlags, ModuleFlags.IsDynamic)) {
                                        this.writeToOutput("exports.");
                                    }
                                    else {
                                        this.writeToOutput(sym.container.name + ".");
                                    }
                                }
                            }
                            else {
                                if (sym.isInstanceProperty()) {
                                    this.emitThis();
                                    this.writeToOutput(".");
                                }
                            }
                        }
                        else if (sym.kind() == SymbolKind.Type) {
                            if (sym.isInstanceProperty()) {
                                var typeSym = <TypeSymbol>sym;
                                var type = typeSym.type;
                                if (type.call && !hasFlag(sym.flags, SymbolFlags.ModuleMember)) {
                                    this.emitThis();
                                    this.writeToOutput(".");
                                }
                            }
                            else if ((sym.unitIndex != this.checker.locationInfo.unitIndex) || (!this.declEnclosed(sym.declModule))) {
                                this.writeToOutput(sym.container.name + ".")
                            }
                        }
                    }
                    else if (sym.container == this.checker.gloMod &&
                                hasFlag(sym.flags, SymbolFlags.Exported) &&
                                !hasFlag(sym.flags, SymbolFlags.Ambient) &&
                                // check that it's a not a member of an ambient module...
                                !((sym.isType() || sym.isMember()) &&
                                    sym.declModule &&
                                    hasFlag(sym.declModule.modFlags, ModuleFlags.Ambient)) &&
                                this.emitState.container == EmitContainer.Prog &&
                                sym.declAST.nodeType != NodeType.FuncDecl) {
                        this.writeToOutput("this.");
                    }
                }

                // If it's a dynamic module, we need to print the "require" invocation
                if (sym &&
                    sym.declAST &&
                    sym.declAST.nodeType == NodeType.ModuleDeclaration &&
                    (hasFlag((<ModuleDeclaration>sym.declAST).modFlags, ModuleFlags.IsDynamic))) {
                    var moduleDecl: ModuleDeclaration = <ModuleDeclaration>sym.declAST;

                    if (moduleGenTarget == ModuleGenTarget.Asynchronous) {
                        this.writeLineToOutput("__" + this.modAliasId + "__;");
                    }
                    else {
                        var modPath = name.actualText;//(<ModuleDecl>moduleDecl.mod.symbol.declAST).name.actualText;
                        var isAmbient = moduleDecl.mod.symbol.declAST && hasFlag((<ModuleDeclaration>moduleDecl.mod.symbol.declAST).modFlags, ModuleFlags.Ambient);
                        modPath = isAmbient ? modPath : this.firstModAlias ? this.firstModAlias : quoteBaseName(modPath);
                        modPath = isAmbient ? modPath : (!isRelative(stripQuotes(modPath)) ? quoteStr("./" + stripQuotes(modPath)) : modPath);
                        this.writeToOutput("require(" + modPath + ")");
                    }
                }
                else {
                    this.writeToOutput(name.actualText);
                }
            }
            this.recordSourceMappingEnd(name);
            this.emitParensAndCommentsInPlace(name, false);
        }

        public emitJavascriptStatements(stmts: AST, emitEmptyBod: boolean) {
            if (stmts) {
                if (stmts.nodeType != NodeType.Block) {
                    var hasContents = (stmts && (stmts.nodeType != NodeType.List || ((<ASTList>stmts).members.length > 0)));
                    if (emitEmptyBod || hasContents) {
                        var hasOnlyBlockStatement = ((stmts.nodeType == NodeType.Block) ||
                            ((stmts.nodeType == NodeType.List) && ((<ASTList>stmts).members.length == 1) && ((<ASTList>stmts).members[0].nodeType == NodeType.Block)));

                        this.recordSourceMappingStart(stmts);
                        if (!hasOnlyBlockStatement) {
                            this.writeLineToOutput(" {");
                            this.indenter.increaseIndent();
                        }
                        this.emitJavascriptList(stmts, null, TokenID.Semicolon, true, false, false);
                        if (!hasOnlyBlockStatement) {
                            this.writeLineToOutput("");
                            this.indenter.decreaseIndent();
                            this.emitIndent();
                            this.writeToOutput("}");
                        }
                        this.recordSourceMappingEnd(stmts);
                    }
                }
                else {
                    this.emitJavascript(stmts, TokenID.Semicolon, true);
                }
            }
            else if (emitEmptyBod) {
                this.writeToOutput("{ }");
            }
        }

        public emitBareJavascriptStatements(stmts: AST, emitClassPropertiesAfterSuperCall: boolean = false) {
            // just the statements without enclosing curly braces
            if (stmts.nodeType != NodeType.Block) {
                if (stmts.nodeType == NodeType.List) {
                    var stmtList = <ASTList>stmts;
                    if ((stmtList.members.length == 2) &&
                        (stmtList.members[0].nodeType == NodeType.Block) &&
                        (stmtList.members[1].nodeType == NodeType.EndCode)) {
                        this.emitJavascript(stmtList.members[0], TokenID.Semicolon, true);
                        this.writeLineToOutput("");
                    }
                    else {
                        this.emitJavascriptList(stmts, null, TokenID.Semicolon, true, false, emitClassPropertiesAfterSuperCall);
                    }
                }
                else {
                    this.emitJavascript(stmts, TokenID.Semicolon, true);
                }
            }
            else {
                this.emitJavascript(stmts, TokenID.Semicolon, true);
            }
        }

        public recordSourceMappingNameStart(name: string) {
            if (this.sourceMapper) {
                var finalName = name;
                if (!name) {
                    finalName = "";
                } else if (this.sourceMapper.currentNameIndex.length > 0) {
                    finalName = this.sourceMapper.names[this.sourceMapper.currentNameIndex.length - 1] + "." + name;
                }

                // We are currently not looking for duplicate but that is possible.
                this.sourceMapper.names.push(finalName);
                this.sourceMapper.currentNameIndex.push(this.sourceMapper.names.length - 1);
            }
        }

        public recordSourceMappingNameEnd() {
            if (this.sourceMapper) {
                this.sourceMapper.currentNameIndex.pop();
            }
        }

        public recordSourceMappingStart(ast: ASTSpan) {
            if (this.sourceMapper && isValidAstNode(ast)) {
                var lineCol = { line: -1, col: -1 };
                var sourceMapping = new SourceMapping();
                sourceMapping.start.emittedColumn = this.emitState.column;
                sourceMapping.start.emittedLine = this.emitState.line;
                // REVIEW: check time consumed by this binary search (about two per leaf statement)
                getSourceLineColFromMap(lineCol, ast.minChar, this.checker.locationInfo.lineMap);
                sourceMapping.start.sourceColumn = lineCol.col;
                sourceMapping.start.sourceLine = lineCol.line;
                getSourceLineColFromMap(lineCol, ast.limChar, this.checker.locationInfo.lineMap);
                sourceMapping.end.sourceColumn = lineCol.col;
                sourceMapping.end.sourceLine = lineCol.line;
                if (this.sourceMapper.currentNameIndex.length > 0) {
                    sourceMapping.nameIndex = this.sourceMapper.currentNameIndex[this.sourceMapper.currentNameIndex.length - 1];
                }
                // Set parent and child relationship
                var siblings = this.sourceMapper.currentMappings[this.sourceMapper.currentMappings.length - 1];
                siblings.push(sourceMapping);
                this.sourceMapper.currentMappings.push(sourceMapping.childMappings);
            }
        }

        public recordSourceMappingEnd(ast: ASTSpan) {
            if (this.sourceMapper && isValidAstNode(ast)) {
                // Pop source mapping childs
                this.sourceMapper.currentMappings.pop();

                // Get the last source mapping from sibling list = which is the one we are recording end for
                var siblings = this.sourceMapper.currentMappings[this.sourceMapper.currentMappings.length - 1];
                var sourceMapping = siblings[siblings.length - 1];

                sourceMapping.end.emittedColumn = this.emitState.column;
                sourceMapping.end.emittedLine = this.emitState.line;
            }
        }

        public Close() {
            if (this.sourceMapper != null) {
                SourceMapper.EmitSourceMapping(this.allSourceMappers);
            }
            try {
                // Closing files could result in exceptions, report them if they occur
                this.outfile.Close();
            } catch (ex) {
                this.errorReporter.emitterError(null, ex.message);
            }
        }

        public emitJavascriptList(ast: AST, delimiter: string, tokenId: TokenID, startLine: boolean, onlyStatics: boolean, emitClassPropertiesAfterSuperCall: boolean = false, emitPrologue? = false, requiresExtendsBlock?: boolean) {
            if (ast == null) {
                return;
            }
            else if (ast.nodeType != NodeType.List) {
                this.emitPrologue(emitPrologue);
                this.emitJavascript(ast, tokenId, startLine);
            }
            else {
                var list = <ASTList>ast;
                if (list.members.length == 0) {
                    return;
                }

                this.emitParensAndCommentsInPlace(ast, true);
                var len = list.members.length;
                for (var i = 0; i < len; i++) {
                    if (emitPrologue) {
                        // If the list has Strict mode flags, emit prologue after first statement
                        // otherwise emit before first statement
                        if (i == 1 || !hasFlag(list.flags, ASTFlags.StrictMode)) {
                            this.emitPrologue(requiresExtendsBlock);
                            emitPrologue = false;
                        }
                    }

                    // In some circumstances, class property initializers must be emitted immediately after the 'super' constructor
                    // call which, in these cases, must be the first statement in the constructor body
                    if (i == 1 && emitClassPropertiesAfterSuperCall) {

                        // emit any parameter properties first
                        var constructorDecl = (<ClassDeclaration>this.thisClassNode).constructorDecl;

                        if (constructorDecl && constructorDecl.arguments) {
                            var argsLen = constructorDecl.arguments.members.length;
                            for (var iArg = 0; iArg < argsLen; iArg++) {
                                var arg = <BoundDecl>constructorDecl.arguments.members[iArg];
                                if ((arg.varFlags & VarFlags.Property) != VarFlags.None) {
                                    this.emitIndent();
                                    this.recordSourceMappingStart(arg);
                                    this.recordSourceMappingStart(arg.id);
                                    this.writeToOutput("this." + arg.id.actualText);
                                    this.recordSourceMappingEnd(arg.id);
                                    this.writeToOutput(" = ");
                                    this.recordSourceMappingStart(arg.id);
                                    this.writeToOutput(arg.id.actualText);
                                    this.recordSourceMappingEnd(arg.id);
                                    this.writeLineToOutput(";");
                                    this.recordSourceMappingEnd(arg);
                                }
                            }
                        }

                        var nProps = (<ASTList>this.thisClassNode.members).members.length;

                        for (var iMember = 0; iMember < nProps; iMember++) {
                            if ((<ASTList>this.thisClassNode.members).members[iMember].nodeType == NodeType.VarDecl) {
                                var varDecl = <VarDecl>(<ASTList>this.thisClassNode.members).members[iMember];
                                if (!hasFlag(varDecl.varFlags, VarFlags.Static) && varDecl.init) {
                                    this.emitIndent();
                                    this.emitJavascriptVarDecl(varDecl, TokenID.Tilde);
                                    this.writeLineToOutput("");
                                }
                            }
                        }
                    }

                    var emitNode = list.members[i];

                    var isStaticDecl =
                                (emitNode.nodeType == NodeType.FuncDecl && hasFlag((<FuncDecl>emitNode).fncFlags, FncFlags.Static)) ||
                                (emitNode.nodeType == NodeType.VarDecl && hasFlag((<VarDecl>emitNode).varFlags, VarFlags.Static))

                    if (onlyStatics ? !isStaticDecl : isStaticDecl) {
                        continue;
                    }
                    this.emitJavascript(emitNode, tokenId, startLine);

                    if (delimiter && (i < (len - 1))) {
                        if (startLine) {
                            this.writeLineToOutput(delimiter);
                        }
                        else {
                            this.writeToOutput(delimiter);
                        }
                    }
                    else if (startLine &&
                             (emitNode.nodeType != NodeType.ModuleDeclaration) &&
                             (emitNode.nodeType != NodeType.InterfaceDeclaration) &&
                             (!((emitNode.nodeType == NodeType.VarDecl) &&
                                ((((<VarDecl>emitNode).varFlags) & VarFlags.Ambient) == VarFlags.Ambient) &&
                                (((<VarDecl>emitNode).init) == null)) && this.varListCount() >= 0) &&
                             (emitNode.nodeType != NodeType.Block || (<Block>emitNode).isStatementBlock) &&
                             (emitNode.nodeType != NodeType.EndCode) &&
                             (emitNode.nodeType != NodeType.FuncDecl)) {
                        this.writeLineToOutput("");
                    }
                }
                this.emitParensAndCommentsInPlace(ast, false);
            }
        }

        // tokenId is the id the preceding token
        public emitJavascript(ast: AST, tokenId: TokenID, startLine: boolean) {
            if (ast == null) {
                return;
            }

            // REVIEW: simplify rules for indenting
            if (startLine && (this.indenter.indentAmt > 0) && (ast.nodeType != NodeType.List) &&
                (ast.nodeType != NodeType.Block)) {
                if ((ast.nodeType != NodeType.InterfaceDeclaration) &&
                    (!((ast.nodeType == NodeType.VarDecl) &&
                       ((((<VarDecl>ast).varFlags) & VarFlags.Ambient) == VarFlags.Ambient) &&
                       (((<VarDecl>ast).init) == null)) && this.varListCount() >= 0) &&
                    (ast.nodeType != NodeType.EndCode) &&
                    ((ast.nodeType != NodeType.FuncDecl) ||
                     (this.emitState.container != EmitContainer.Constructor))) {
                    this.emitIndent();
                }
            }

            ast.emit(this, tokenId, startLine);

            if ((tokenId == TokenID.Semicolon) && (ast.nodeType < NodeType.GeneralNode)) {
                this.writeToOutput(";");
            }
        }

        public emitPropertyAccessor(funcDecl: FuncDecl, className: string, isProto: boolean) {
            if (!(<FieldSymbol>funcDecl.accessorSymbol).hasBeenEmitted) {
                var accessorSymbol = <FieldSymbol>funcDecl.accessorSymbol;
                this.emitIndent();
                this.recordSourceMappingStart(funcDecl);
                this.writeLineToOutput("Object.defineProperty(" + className + (isProto ? ".prototype, \"" : ", \"") + funcDecl.name.actualText + "\"" + ", {");
                this.indenter.increaseIndent();

                if (accessorSymbol.getter) {
                    var getter: FuncDecl = <FuncDecl>accessorSymbol.getter.declAST;

                    this.emitIndent();
                    this.recordSourceMappingStart(getter);
                    this.writeToOutput("get: ");
                    this.emitInnerFunction(getter, false, isProto, null, Emitter.shouldCaptureThis(getter), null);
                    this.writeLineToOutput(",");
                }

                if (accessorSymbol.setter) {
                    var setter: FuncDecl = <FuncDecl>accessorSymbol.setter.declAST;

                    this.emitIndent();
                    this.recordSourceMappingStart(setter);
                    this.writeToOutput("set: ");
                    this.emitInnerFunction(setter, false, isProto, null, Emitter.shouldCaptureThis(setter), null);
                    this.writeLineToOutput(",");
                }

                this.emitIndent();
                this.writeLineToOutput("enumerable: true,");
                this.emitIndent();
                this.writeLineToOutput("configurable: true");
                this.indenter.decreaseIndent();
                this.emitIndent();
                this.writeLineToOutput("});");
                this.recordSourceMappingEnd(funcDecl);

                accessorSymbol.hasBeenEmitted = true;
            }
        }

        public emitPrototypeMember(member: AST, className: string) {
            if (member.nodeType == NodeType.FuncDecl) {
                var funcDecl = <FuncDecl>member;
                if (funcDecl.isAccessor()) {
                    this.emitPropertyAccessor(funcDecl, className, true);
                }
                else {
                    this.emitIndent();
                    this.recordSourceMappingStart(funcDecl);
                    this.writeToOutput(className + ".prototype." + funcDecl.getNameText() + " = ");
                    this.emitInnerFunction(funcDecl, false, true, null, Emitter.shouldCaptureThis(funcDecl), null);
                    this.writeLineToOutput(";");
                }
            }
            else if (member.nodeType == NodeType.VarDecl) {
                var varDecl = <VarDecl>member;

                if (varDecl.init) {
                    this.emitIndent();
                    this.recordSourceMappingStart(varDecl);
                    this.recordSourceMappingStart(varDecl.id);
                    this.writeToOutput(className + ".prototype." + varDecl.id.actualText);
                    this.recordSourceMappingEnd(varDecl.id);
                    this.writeToOutput(" = ");
                    this.emitJavascript(varDecl.init, TokenID.Equals, false);
                    this.recordSourceMappingEnd(varDecl);
                    this.writeLineToOutput(";");
                }
            }
        }

        public emitAddBaseMethods(className: string, base: Type, classDecl: TypeDeclaration): void {
            if (base.members) {
                var baseSymbol = base.symbol;
                var baseName = baseSymbol.name;
                if (baseSymbol.declModule != classDecl.type.symbol.declModule) {
                    baseName = baseSymbol.fullName();
                }
                base.members.allMembers.map(function(key, s, c) {
                    var sym = <Symbol>s;
                    if ((sym.kind() == SymbolKind.Type) && (<TypeSymbol>sym).type.call) {
                        this.recordSourceMappingStart(sym.declAST);
                        this.writeLineToOutput(className + ".prototype." + sym.name + " = " +
                                          baseName + ".prototype." + sym.name + ";");
                        this.recordSourceMappingEnd(sym.declAST);
                    }
                }, null);
            }
            if (base.extendsList) {
                for (var i = 0, len = base.extendsList.length; i < len; i++) {
                    this.emitAddBaseMethods(className, base.extendsList[i], classDecl);
                }
            }
        }

        public emitJavascriptClass(classDecl: ClassDeclaration) {
            if (!hasFlag(classDecl.varFlags, VarFlags.Ambient)) {
                var svClassNode = this.thisClassNode;
                var i = 0;
                this.thisClassNode = classDecl;
                var className = classDecl.name.actualText;
                this.emitParensAndCommentsInPlace(classDecl, true);
                var temp = this.setContainer(EmitContainer.Class);

                this.recordSourceMappingStart(classDecl);
                if (hasFlag(classDecl.varFlags, VarFlags.Exported) && classDecl.type.symbol.container == this.checker.gloMod) {
                    this.writeToOutput("this." + className);
                }
                else {
                    this.writeToOutput("var " + className);
                }

                //if (hasFlag(classDecl.varFlags, VarFlags.Exported) && (temp == EmitContainer.Module || temp == EmitContainer.DynamicModule)) {
                //    var modName = temp == EmitContainer.Module ? this.moduleName : "exports";
                //    this.writeToOutput(" = " + modName + "." + className);
                //}

                var hasBaseClass = classDecl.extendsList && classDecl.extendsList.members.length;
                var baseNameDecl: AST = null;
                var baseName: AST = null;

                if (hasBaseClass) {
                    this.writeLineToOutput(" = (function (_super) {");
                } else {
                    this.writeLineToOutput(" = (function () {");
                }

                this.recordSourceMappingNameStart(className);
                this.indenter.increaseIndent();

                if (hasBaseClass) {
                    baseNameDecl = classDecl.extendsList.members[0];
                    baseName = baseNameDecl.nodeType == NodeType.Call ? (<CallExpression>baseNameDecl).target : baseNameDecl;
                    this.emitIndent();
                    this.writeLineToOutput("__extends(" + className + ", _super);");
                }

                this.emitIndent();

                var constrDecl = classDecl.constructorDecl;

                // output constructor
                if (constrDecl) {
                    // declared constructor
                    this.emitJavascript(classDecl.constructorDecl, TokenID.OpenParen, false);

                }
                else {
                    var wroteProps = 0;

                    this.recordSourceMappingStart(classDecl);
                    // default constructor
                    this.indenter.increaseIndent();
                    this.writeToOutput("function " + classDecl.name.actualText + "() {");
                    this.recordSourceMappingNameStart("constructor");
                    if (hasBaseClass) {
                        this.writeLineToOutput("");
                        this.emitIndent();
                        this.writeLineToOutput("_super.apply(this, arguments);");
                        wroteProps++;
                    }

                    if (classDecl.varFlags & VarFlags.MustCaptureThis) {
                        this.writeCaptureThisStatement(classDecl);
                    }

                    var members = (<ASTList>this.thisClassNode.members).members

                    // output initialized properties
                    for (var i = 0; i < members.length; i++) {
                        if (members[i].nodeType == NodeType.VarDecl) {
                            var varDecl = <VarDecl>members[i];
                            if (!hasFlag(varDecl.varFlags, VarFlags.Static) && varDecl.init) {
                                this.writeLineToOutput("");
                                this.emitIndent();
                                this.emitJavascriptVarDecl(varDecl, TokenID.Tilde);
                                wroteProps++;
                            }
                        }
                    }
                    if (wroteProps) {
                        this.writeLineToOutput("");
                        this.indenter.decreaseIndent();
                        this.emitIndent();
                        this.writeLineToOutput("}");
                    }
                    else {
                        this.writeLineToOutput(" }");
                        this.indenter.decreaseIndent();
                    }
                    this.recordSourceMappingNameEnd();
                    this.recordSourceMappingEnd(classDecl);
                }

                var membersLen = classDecl.members.members.length;
                for (var j = 0; j < membersLen; j++) {

                    var memberDecl: AST = classDecl.members.members[j];

                    if (memberDecl.nodeType == NodeType.FuncDecl) {
                        var fn = <FuncDecl>memberDecl;

                        if (hasFlag(fn.fncFlags, FncFlags.Method) && !fn.isSignature()) {
                            if (!hasFlag(fn.fncFlags, FncFlags.Static)) {
                                this.emitPrototypeMember(fn, className);
                            }
                            else { // static functions
                                if (fn.isAccessor()) {
                                    this.emitPropertyAccessor(fn, this.thisClassNode.name.actualText, false);
                                }
                                else {
                                    this.emitIndent();
                                    this.recordSourceMappingStart(fn)
                                    this.writeToOutput(classDecl.name.actualText + "." + fn.name.actualText + " = ");
                                    this.emitInnerFunction(fn, (fn.name && !fn.name.isMissing()), true,
                                            null, Emitter.shouldCaptureThis(fn), null);
                                    this.writeLineToOutput(";");
                                }
                            }
                        }
                    }
                    else if (memberDecl.nodeType == NodeType.VarDecl) {
                        var varDecl = <VarDecl>memberDecl;
                        if (hasFlag(varDecl.varFlags, VarFlags.Static)) {

                            if (varDecl.init) {
                                // EMITREVIEW
                                this.emitIndent();
                                this.recordSourceMappingStart(varDecl);
                                this.writeToOutput(classDecl.name.actualText + "." + varDecl.id.actualText + " = ");
                                this.emitJavascript(varDecl.init, TokenID.Equals, false);
                                // EMITREVIEW

                                this.writeLineToOutput(";");
                                this.recordSourceMappingEnd(varDecl);
                            }
                        }
                    }
                    else {
                        throw Error("We want to catch this");
                    }
                }

                this.emitIndent();
                this.recordSourceMappingStart(classDecl.endingToken);
                this.writeLineToOutput("return " + className + ";");
                this.recordSourceMappingEnd(classDecl.endingToken);
                this.indenter.decreaseIndent();
                this.emitIndent();
                this.recordSourceMappingStart(classDecl.endingToken);
                this.writeToOutput("}");
                this.recordSourceMappingNameEnd();
                this.recordSourceMappingEnd(classDecl.endingToken);
                this.recordSourceMappingStart(classDecl);
                this.writeToOutput(")(");
                if (hasBaseClass)
                    this.emitJavascript(baseName, TokenID.Tilde, false);
                this.writeToOutput(");");
                this.recordSourceMappingEnd(classDecl);

                if ((temp == EmitContainer.Module || temp == EmitContainer.DynamicModule) && hasFlag(classDecl.varFlags, VarFlags.Exported)) {
                    this.writeLineToOutput("");
                    this.emitIndent();
                    var modName = temp == EmitContainer.Module ? this.moduleName : "exports";
                    this.recordSourceMappingStart(classDecl);
                    this.writeToOutput(modName + "." + className + " = " + className + ";");
                    this.recordSourceMappingEnd(classDecl);
                }

                this.emitIndent();
                this.recordSourceMappingEnd(classDecl);
                this.emitParensAndCommentsInPlace(classDecl, false);
                this.setContainer(temp);
                this.thisClassNode = svClassNode;
            }
        }

        public emitPrologue(reqInherits: boolean) {
            if (!this.prologueEmitted) {
                if (reqInherits) {
                    this.prologueEmitted = true;
                    this.writeLineToOutput("var __extends = this.__extends || function (d, b) {");
                    this.writeLineToOutput("    function __() { this.constructor = d; }");
                    this.writeLineToOutput("    __.prototype = b.prototype;");
                    this.writeLineToOutput("    d.prototype = new __();");
                    this.writeLineToOutput("};");
                }
                if (this.checker.mustCaptureGlobalThis) {
                    this.prologueEmitted = true;
                    this.writeLineToOutput(this.captureThisStmtString);
                }
            }
        }

        public emitSuperReference() {
            this.writeToOutput("_super.prototype");
        }

        public emitSuperCall(callEx: CallExpression): boolean {
            if (callEx.target.nodeType == NodeType.Dot) {
                var dotNode = <BinaryExpression>callEx.target;
                if (dotNode.operand1.nodeType == NodeType.Super) {
                    this.emitJavascript(dotNode, TokenID.OpenParen, false);
                    this.writeToOutput(".call(");
                    this.emitThis();
                    if (callEx.arguments && callEx.arguments.members.length > 0) {
                        this.writeToOutput(", ");
                        this.emitJavascriptList(callEx.arguments, ", ", TokenID.Comma, false, false, false);
                    }
                    this.writeToOutput(")");
                    return true;
                }
            }
            return false;
        }

        public emitThis() {
            if (this.thisFnc && !this.thisFnc.isMethod() && (!this.thisFnc.isConstructor)) {
                this.writeToOutput("_this");
            }
            else {
                this.writeToOutput("this");
            }
        }

        private static shouldCaptureThis(func: FuncDecl): boolean {
            // Super calls use 'this' reference. If super call is in a lambda, 'this' value needs to be captured in the parent.
            return func.hasSelfReference() || func.hasSuperReferenceInFatArrowFunction();
        }

        private createFile(fileName: string, useUTF8: boolean): ITextWriter {
            try {
                return this.emitOptions.ioHost.createFile(fileName, useUTF8);
            } catch (ex) {
                this.errorReporter.emitterError(null, ex.message);
            }
        }
    }
}
