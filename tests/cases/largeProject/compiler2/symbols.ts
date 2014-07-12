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

module TypeScript2 {

    export enum TypeCheckStatus {
        NotStarted,
        Started,
        Finished,
    }

    // For lexically-scoped constructs
    export function aLexicallyEnclosesB(a: Symbol, b: Symbol) {
        if (a.declAST && b && b.declAST && a.declAST.nodeType == NodeType.FuncDecl) {
            return a.declAST.minChar <= b.declAST.minChar && a.declAST.limChar >= b.declAST.limChar;
        }
        else {
            return false;
        }
    }

    export function aEnclosesB(a: Symbol, b: Symbol) {
        while (a.container) {
            if (a == b || aLexicallyEnclosesB(a.container, b)) {
                return true;
            }
            a = a.container;
        }
        return false;
    }

    export interface PhasedTypecheckObject {
        typeCheckStatus: TypeCheckStatus;
    }

    export class Symbol {
        public bound = false;
        public container: Symbol;
        public instanceScope(): SymbolScope { return null; }
        public isVariable() { return false; }
        public isMember() { return false; }
        public isInferenceSymbol() { return false; }
        public isWith() { return false; }
        public writeable() { return false; }
        public isType(): boolean { return false; }
        public getType(): Type2 { return null; }
        public flags: SymbolFlags = SymbolFlags.None;
        public refs: Identifier2[];
        public isAccessor() { return false; }
        public isObjectLitField = false;

        public declAST: AST2 = null;
        public declModule: ModuleDeclaration = null;  // if child of module, this is the module that declared it

        public passSymbolCreated: number = CompilerDiagnostics.analysisPass;

        constructor(public name: string, public location: number, public length: number,
                 public unitIndex: number) { }

        public isInstanceProperty() {
            return hasFlag(this.flags, SymbolFlags.Property) && (!hasFlag(this.flags, SymbolFlags.ModuleMember));
        }

        public getTypeName(scope: SymbolScope): string {
            return this.getTypeNameEx(scope).toString();
        }
        
        public getTypeNameEx(scope: SymbolScope): MemberName {
            return MemberName.create(this.toString());
        }

        public getOptionalNameString() {
            return hasFlag(this.flags, SymbolFlags.Optional) ? "?" : "";
        }

        public pathToRoot() {
            var path = new Symbol[];
            var node = this;
            while (node && (node.name != globalId)) {
                path[path.length] = node;
                node = node.container;
            }
            return path;
        }

        public findCommonAncestorPath(b: Symbol) {
            if (this.container == null) {
                return new Symbol[];
            }
            var aPath = this.container.pathToRoot();
            var bPath: Symbol[];
            if (b) {
                bPath = b.pathToRoot();
            }
            else {
                bPath = new Symbol[];
            }
            var commonNodeIndex = -1;
            for (var i = 0, aLen = aPath.length; i < aLen; i++) {
                var aNode = aPath[i];
                for (var j = 0, bLen = bPath.length; j < bLen; j++) {
                    var bNode = bPath[j];
                    if (aNode == bNode) {
                        commonNodeIndex = i;
                        break;
                    }
                }
                if (commonNodeIndex >= 0) {
                    break;
                }
            }
            if (commonNodeIndex >= 0) {
                return aPath.slice(0, commonNodeIndex);
            }
            else {
                return aPath;
            }
        }

        // Gets the pretty Name for the symbol withing the scope
        public getPrettyName(scopeSymbol: Symbol) {
            return this.name;
        }

        public scopeRelativeName(scope: SymbolScope): string {
            if (scope == null) {
                return this.getPrettyName(null) + this.getOptionalNameString();
            }
            var lca = this.findCommonAncestorPath(scope.container);
            var builder = "";
            for (var i = 0, len = lca.length; i < len; i++) {
                var prettyName = lca[i].getPrettyName(i == len - 1 ? scope.container : lca[i + 1]);
                builder = prettyName + "." + builder;
            }
            builder += this.getPrettyName(len == 0 ? scope.container : lca[0]) + this.getOptionalNameString();
            return builder;
        }

        public fullName(): string {
            var builder = this.name;
            var ancestor = this.container;
            while (ancestor && (ancestor.name != globalId)) {
                builder = ancestor.name + "." + builder;
                ancestor = ancestor.container;
            }
            return builder;
        }

        public isExternallyVisible(checker: TypeChecker) {
            // Global module is not hidden
            if (this == checker.gloMod) {
                return true;
            }

            // private symbol
            if (hasFlag(this.flags, SymbolFlags.Private)) {
                return false;
            }

            // If the current container is not exported
            // If its in global - it is visible, otherwise it isn't
            if (!hasFlag(this.flags, SymbolFlags.Exported)) {
                return this.container == checker.gloMod;
            }

            // It is visible if its container is visible too
            return this.container.isExternallyVisible(checker);
        }

        public visible(scope: SymbolScope, checker: TypeChecker) {
            if (checker == null || this.container == checker.gloMod) {
                return true;
            }

            if (hasFlag(this.flags, SymbolFlags.ModuleMember)) {

                if (hasFlag(this.flags, SymbolFlags.Exported)) {
                    if (!hasFlag(this.flags, SymbolFlags.Private)) {
                        return true;
                    }
                    else {
                        return aEnclosesB(this, scope.container);
                    }
                }
                else {
                    // REVIEW:
                    // Note that in the scope-assignment and binding phases,
                    // currentModDecl will point to the "master" module decl,
                    // and not necessarily the one that the symbol in question
                    // was declared in.
                    // That's ok - there's no harm done in attributing the symbol
                    // to the master mod decl in either of those phases, so long
                    // as we reference the actual module fragment of declaration
                    // during typecheck.  Doing this also prevents us from printing
                    // multiple error messages if the symbol is not visible.
                    return checker && (checker.currentModDecl == this.declModule) ||
                                                (checker.currentModDecl &&
                                                    checker.currentModDecl.mod &&
                                                    checker.currentModDecl.mod.symbol &&
                                                    this.declModule &&
                                                    this.declModule.mod &&
                                                    this.declModule.mod.symbol &&
                                                    aEnclosesB(checker.currentModDecl.mod.symbol, this.declModule.mod.symbol));
                }
            }
            else {
                // field or method
                var isFunction = this.declAST && this.declAST.nodeType == NodeType.FuncDecl;
                var isMethod = isFunction && (<FuncDecl>this.declAST).isMethod();
                var isStaticFunction = isFunction && hasFlag((<FuncDecl>this.declAST).fncFlags, FncFlags.Static)
                var isPrivateMethod = isMethod && hasFlag((<FuncDecl>this.declAST).fncFlags, FncFlags.Private);
                var isAlias = this.isType() && (<TypeSymbol>this).aliasLink;

                if (this.isMember() || isMethod || isStaticFunction || isAlias) {
                    if (hasFlag(this.flags, SymbolFlags.Private) || isPrivateMethod) {
                        if (scope.container == null && this.container != scope.container) {
                            return false; // it's an inner member being accessed by the global scope
                        }
                        else {
                            return this.container == null ? true : aEnclosesB(scope.container, this.container);
                        }
                    }
                    else {
                        return true;
                    }
                }
                else if (this.container) {
                    return aEnclosesB(this, scope.container);
                }
                else {
                    return true;
                }
            }
        }

        public addRef(identifier: Identifier2) {
            if (!this.refs) {
                this.refs = [];
            }
            this.refs[this.refs.length] = identifier;
        }

        public toString() {
            if (this.name) {
                return this.name;
            }
            else {
                return "_anonymous";
            }
        }

        public print(outfile) {
            outfile.Write(this.toString());
        }

        public specializeType(pattern: Type2, replacement: Type2, checker: TypeChecker): Symbol {
            throw new Error("please implement in derived class");
        }

        public setType(type: Type2) {
            throw new Error("please implement in derived class");
        }

        public kind(): SymbolKind {
            throw new Error("please implement in derived class");
        }

        public getInterfaceDeclFromSymbol(checker: TypeChecker) {
            if (this.declAST != null) {
                if (this.declAST.nodeType == NodeType.InterfaceDeclaration) {
                    return <InterfaceDeclaration>this.declAST;
                } else if (this.container != null && this.container != checker.gloMod && this.container.declAST.nodeType == NodeType.InterfaceDeclaration) {
                    return <InterfaceDeclaration>this.container.declAST;
                }
            }

            return null;
        }

        public getVarDeclFromSymbol() {
            if (this.declAST != null && this.declAST.nodeType == NodeType.VarDecl) {
                return <VarDecl>this.declAST;
            }

            return null;
        }

        public getDocComments() : Comment[] {
            if (this.declAST != null) {
                return this.declAST.getDocComments();
            }

            return [];
        }

        public isStatic() {
            return hasFlag(this.flags, SymbolFlags.Static);
        }
    }

    export class ValueLocation {
        public symbol: Symbol;
        public typeLink: TypeLink;
    }

    export class InferenceSymbol extends Symbol {
        constructor (name: string, location: number, length: number, unitIndex: number) {
            super(name, location, length, unitIndex);
        }

        public typeCheckStatus = TypeCheckStatus.NotStarted;
        public isInferenceSymbol() { return true; }
        public transferVarFlags(varFlags: VarFlags) {
            if (hasFlag(varFlags, VarFlags.Ambient)) {
                this.flags |= SymbolFlags.Ambient;
            }
            if (hasFlag(varFlags, VarFlags.Constant)) {
                this.flags |= SymbolFlags.Constant;
            }
            if (hasFlag(varFlags, VarFlags.Static)) {
                this.flags |= SymbolFlags.Static;
            }
            if (hasFlag(varFlags, VarFlags.Property)) {
                this.flags |= SymbolFlags.Property;
            }
            if (hasFlag(varFlags, VarFlags.Private)) {
                this.flags |= SymbolFlags.Private;
            }
            if (hasFlag(varFlags, VarFlags.Public)) {
                this.flags |= SymbolFlags.Public;
            }
            if (hasFlag(varFlags, VarFlags.Readonly)) {
                this.flags |= SymbolFlags.Readonly;
            }
            if (hasFlag(varFlags, VarFlags.Exported)) {
                this.flags |= SymbolFlags.Exported;
            }
        }
    }

    export class TypeSymbol extends InferenceSymbol {
        public additionalLocations: number[];
        public expansions: Type2[] = []; // For types that may be "split", keep track of the subsequent definitions
        public expansionsDeclAST: AST2[] = [];
        public isDynamic = false;

        constructor (locName: string, location: number, length: number, unitIndex: number, public type: Type2) {
            super(locName, location, length, unitIndex);
            this.prettyName = this.name;
        }

        public addLocation(loc: number) {
            if (this.additionalLocations == null) {
                this.additionalLocations = [];
            }
            this.additionalLocations[this.additionalLocations.length] = loc;
        }
        public isMethod = false;
        public aliasLink:ImportDeclaration = null;
        public kind() { return SymbolKind.Type; }
        public isType(): boolean { return true; }
        public getType() { return this.type; }
        public prettyName: string;
        public onlyReferencedAsTypeRef = optimizeModuleCodeGen;

        public getTypeNameEx(scope: SymbolScope) {
            return this.type.getMemberTypeNameEx(this.name ? this.name + this.getOptionalNameString() : "", false, false, scope);
        }

        public instanceScope(): SymbolScope {
            // Don't use the constructor scope for a class body or methods - use the contained scope
            if (!(this.type.typeFlags & TypeFlags.IsClass) && this.type.isClass()) {
                return this.type.instanceType.constructorScope;
            }
            else {
                return this.type.containedScope;
            }
        }
        // corresponding instance type if this is a class
        public instanceType: Type2;

        public toString() {
            var result = this.type.getTypeName();
            if (this.name) {
                result = this.name + ":" + result;
            }
            return result;
        }

        public isClass() { return this.instanceType != null; }
        public isFunction() { return this.declAST != null && this.declAST.nodeType == NodeType.FuncDecl; }

        public specializeType(pattern: Type2, replacement: Type2, checker: TypeChecker): Symbol {
            if (this.type == pattern) {
                return replacement.symbol;
            }
            else {
                var replType = this.type.specializeType(pattern, replacement, checker, false);
                if (replType != this.type) {
                    var result = new TypeSymbol(this.name, -1, 0, -1, replType);
                    return result;
                }
                else {
                    return this;
                }
            }
        }

        // Gets the pretty name of the symbol with respect to symbol of the scope (scopeSymbol)
        // searchTillRoot specifies if the name need to searched in the root path of the scope
        public getPrettyName(scopeSymbol: Symbol) {
            if (!!scopeSymbol && isQuoted(this.prettyName) && this.type.isModuleType()) {
                // Its a dynamic module - and need to be specialized with the scope
                // Check in exported module members in each scope
                var symbolPath = scopeSymbol.pathToRoot();
                var prettyName = this.getPrettyNameOfDynamicModule(symbolPath);
                if (prettyName != null) {
                    return prettyName.name;
                }
            }

            return this.prettyName;
        }

        public getPrettyNameOfDynamicModule(scopeSymbolPath: Symbol[]) {
            var scopeSymbolPathLength = scopeSymbolPath.length;
            var externalSymbol: { name: string; symbol: Symbol; } = null;
            if (scopeSymbolPath.length > 0 &&
                scopeSymbolPath[scopeSymbolPathLength - 1].getType().isModuleType() &&
                (<TypeSymbol>scopeSymbolPath[scopeSymbolPathLength - 1]).isDynamic) {

                // Check if submodule is dynamic
                if (scopeSymbolPathLength > 1 &&
                    scopeSymbolPath[scopeSymbolPathLength - 2].getType().isModuleType() &&
                    (<TypeSymbol>scopeSymbolPath[scopeSymbolPathLength - 2]).isDynamic) {
                    var moduleType = <ModuleType>scopeSymbolPath[scopeSymbolPathLength - 2].getType();
                    externalSymbol = moduleType.findDynamicModuleName(this.type);

                }

                if (externalSymbol == null) {
                    // Check in this module
                    var moduleType = <ModuleType>scopeSymbolPath[scopeSymbolPathLength - 1].getType();
                    externalSymbol = moduleType.findDynamicModuleName(this.type);
                }
            }

            return externalSymbol;
        }

        public getDocComments(): Comment[]{
            var comments : Comment[] = [];
            if (this.declAST != null) {
                comments = comments.concat(this.declAST.getDocComments());
            }

            for (var i = 0; i < this.expansionsDeclAST.length; i++) {
                comments = comments.concat(this.expansionsDeclAST[i].getDocComments());
            }

            return comments;
        }
    }

    export class WithSymbol extends TypeSymbol {
        constructor (location: number, unitIndex: number, withType: Type2) {
            super("with", location, 4, unitIndex, withType);
        }
        public isWith() { return true; }
    }

    export class FieldSymbol extends InferenceSymbol {
        public name: string;
        public location: number;

        constructor (name: string, location: number, unitIndex: number, public canWrite: boolean,
                      public field: ValueLocation) {

            super(name, location, name.length, unitIndex);
            this.name = name;
            this.location = location;
        }
        public kind() { return SymbolKind.Field; }
        public writeable() { return this.isAccessor() ? this.setter != null : this.canWrite; }
        public getType() { return this.field.typeLink.type; }
        public getTypeNameEx(scope: SymbolScope) {
            return MemberName.create(this.field.typeLink.type.getScopedTypeNameEx(scope), this.name + this.getOptionalNameString() + ": ", "");
        }

        public isMember() { return true; }
        public setType(type: Type2) {
            this.field.typeLink.type = type;
        }

        public getter: TypeSymbol = null;
        public setter: TypeSymbol = null;
        public hasBeenEmitted = false; // since getters and setters are emitted together, need to track if one has been emitted

        public isAccessor() { return this.getter != null || this.setter != null; }

        public isVariable() { return true; }
        public toString() { return this.getTypeNameEx(null).toString(); }
        public specializeType(pattern: Type2, replacement: Type2, checker: TypeChecker): Symbol {
            var rType = this.field.typeLink.type.specializeType(pattern, replacement, checker, false);
            if (rType != this.field.typeLink.type) {
                var fieldDef = new ValueLocation();
                var result = new FieldSymbol(this.name, 0, checker.locationInfo.unitIndex,
                                           this.canWrite, fieldDef);
                result.flags = this.flags;
                fieldDef.symbol = result;
                fieldDef.typeLink = new TypeLink();
                result.setType(rType);
                result.typeCheckStatus = TypeCheckStatus.Finished;
                return result;
            }
            else {
                return this;
            }
        }

        public getDocComments(): Comment[] {
            if (this.getter != null || this.setter != null) {
                var comments : Comment[] = [];
                if (this.getter != null) {
                    comments = comments.concat(this.getter.getDocComments());
                }
                if (this.setter != null) {
                    comments = comments.concat(this.setter.getDocComments());
                }
                return comments;
            }
            else if (this.declAST != null) {
                return this.declAST.getDocComments();
            }

            return [];
        }

    }

    export class ParameterSymbol extends InferenceSymbol {
        public name: string;
        public location: number;
        private paramDocComment: string = null;
        public funcDecl: AST2 = null;
        
        constructor (name: string, location: number, unitIndex: number,
                          public parameter: ValueLocation) {
            super(name, location, name.length, unitIndex);

            this.name = name;
            this.location = location;
        }
        public kind() { return SymbolKind.Parameter; }
        public writeable() { return true; }
        public getType() { return this.parameter.typeLink.type; }
        public setType(type: Type2) {
            this.parameter.typeLink.type = type;
        }
        public isVariable() { return true; }
        public argsOffset = (-1);
        public isOptional() {
            if (this.parameter && this.parameter.symbol && this.parameter.symbol.declAST) {
                return (<ArgDecl>this.parameter.symbol.declAST).isOptional;
            }
            else {
                return false;
            }
        }

        public getTypeNameEx(scope: SymbolScope) {
            return MemberName.create(this.getType().getScopedTypeNameEx(scope), this.name + (this.isOptional() ? "?" : "") + ": ", "");
        }

        public toString() { return this.getTypeNameEx(null).toString(); }

        public specializeType(pattern: Type2, replacement: Type2, checker: TypeChecker): Symbol {
            var rType = this.parameter.typeLink.type.specializeType(pattern, replacement, checker, false);
            if (this.parameter.typeLink.type != rType) {
                var paramDef = new ValueLocation();
                var result = new ParameterSymbol(this.name, 0, checker.locationInfo.unitIndex,
                                               paramDef);
                paramDef.symbol = result;
                result.setType(rType);
                return result;
            }
            else {
                return this;
            }
        }

        public getParameterDocComments() {
            if (!this.paramDocComment) {
                var parameterComments: string[] = [];
                if (this.funcDecl) {
                    var fncDocComments = this.funcDecl.getDocComments();
                    var paramComment = Comment.getParameterDocCommentText(this.name, fncDocComments);
                    if (paramComment != "") {
                        parameterComments.push(paramComment);
                    }
                }
                var docComments = TypeScript2.Comment.getDocCommentText(this.getDocComments());
                if (docComments != "") {
                    parameterComments.push(docComments);
                }
                
                this.paramDocComment = parameterComments.join("\n");
            }

            return this.paramDocComment;
        }
    }

    export class VariableSymbol extends InferenceSymbol {

        constructor (name: string, location: number, unitIndex: number, public variable: ValueLocation) {
            super(name, location, name.length, unitIndex);
        }
        public kind() { return SymbolKind.Variable; }
        public writeable() { return true; }
        public getType() { return this.variable.typeLink.type; }
        public getTypeNameEx(scope: SymbolScope) {
            return MemberName.create(this.getType().getScopedTypeNameEx(scope), this.name + ": ", "");
        }

        public setType(type: Type2) {
            this.variable.typeLink.type = type;
        }
        public isVariable() { return true; }
    }
}