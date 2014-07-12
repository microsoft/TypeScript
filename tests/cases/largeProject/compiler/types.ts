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

    export enum Primitive {
        None = 0,
        Void = 1,
        Double = 2,
        String = 4,
        Boolean = 8,
        Any = 16,
        Null = 32,
        Undefined = 64,
    }

    export class MemberName {
        public prefix: string = "";
        public suffix: string = "";

        public isString() { return false; }
        public isArray() { return false; }

        public toString(): string {
            return MemberName.memberNameToString(this);
        }

        static memberNameToString(memberName: MemberName): string {
            var result = memberName.prefix;

            if (memberName.isString()) {
                result += (<MemberNameString>memberName).text;
            }
            else {
                var ar = <MemberNameArray>memberName;
                for (var index = 0; index < ar.entries.length; index++) {
                    result += memberNameToString(ar.entries[index]);
                    result += ar.delim;
                }
            }

            result += memberName.suffix;
            return result;
        }

        static create(text: string): MemberName;
        static create(entry: MemberName, prefix: string, suffix: string): MemberName;
        static create(arg1: any, arg2?: any, arg3?: any): MemberName {
            if (typeof arg1 == "string") {
                return new MemberNameString(arg1);
            }
            else {
                var result = new MemberNameArray();
                if (arg2)
                    result.prefix = arg2;
                if (arg3)
                    result.suffix = arg3;
                result.entries.push(arg1);
                return result;
            }
        }
    }

    export class MemberNameString extends MemberName {
        constructor (public text: string) {
            super()
        }

        public isString() { return true; }
    }

    export class MemberNameArray extends MemberName {
        public delim: string = "";
        public entries: MemberName[] = [];

        public isArray() { return true; }

        public add(entry: MemberName) {
            this.entries.push(entry);
        }

        public addAll(entries: MemberName[]) {
            for (var i = 0 ; i < entries.length; i++) {
                this.entries.push(entries[i]);
            }
        }
    }

    var currentTypeID = -1;

    export class Type {
        public typeID = currentTypeID++;

        public members: ScopedMembers;
        public ambientMembers: ScopedMembers;

        public construct: SignatureGroup = null;
        public call: SignatureGroup = null;
        public index: SignatureGroup = null;

        // REVIEW: for either of the below, why do we have lists of types and lists of type links?
        // interface can only extend
        public extendsList: Type[];
        public extendsTypeLinks: TypeLink[];

        // class can also implement
        public implementsList: Type[];
        public implementsTypeLinks: TypeLink[];

        public passTypeCreated: number = CompilerDiagnostics.analysisPass;

        public baseClass(): Type {
            if (this.extendsList && (this.extendsList.length > 0)) {
                return this.extendsList[0];
            }
            else {
                return null;
            }
        }

        public elementType: Type;

        public getArrayBase(arrInstType: Type, checker: TypeChecker): Type {
            return this.arrayCache.specialize(arrInstType, checker);
        }

        public primitiveTypeClass: number = Primitive.None;

        // REVIEW: Prune constructorScope
        public constructorScope: SymbolScope;
        public containedScope: SymbolScope;
        public memberScope: SymbolScope;

        public arrayCache: ArrayCache;

        public typeFlags = TypeFlags.None;

        public symbol: TypeSymbol;

        public enclosingType: Type;
        public instanceType: Type;

        // REVIEW: Prune
        public isClass() { return this.instanceType != null; }
        public isArray() { return this.elementType != null; }
        public isClassInstance() {
            return this.symbol && !this.elementType && (<TypeSymbol>this.symbol).type.isClass();
        }

        public getInstanceType() {
            if (this.isClass()) {
                return this.instanceType;
            }
            else {
                return this;
            }
        }

        public hasImplementation() { return hasFlag(this.typeFlags, TypeFlags.HasImplementation); }
        public setHasImplementation() { this.typeFlags |= TypeFlags.HasImplementation; }

        public isDouble() { return hasFlag(this.primitiveTypeClass, Primitive.Double); }
        public isString() { return hasFlag(this.primitiveTypeClass, Primitive.String); }
        public isBoolean() { return hasFlag(this.primitiveTypeClass, Primitive.Boolean); }
        public isNull() { return hasFlag(this.primitiveTypeClass, Primitive.Null); }

        // REVIEW: No need for this to be a method
        public getTypeName(): string {
            return this.getMemberTypeName("", true, false, null);
        }

        public getScopedTypeName(scope: SymbolScope) {
            return this.getMemberTypeName("", true, false, scope);
        }

        public getScopedTypeNameEx(scope: SymbolScope) {
            return this.getMemberTypeNameEx("", true, false, scope);
        }

        // REVIEW: No need for this to be a method
        public callCount() {
            var total = 0;
            if (this.call) {
                total += this.call.signatures.length;
            }
            if (this.construct) {
                total += this.construct.signatures.length;
            }
            if (this.index) {
                total += this.index.signatures.length;
            }
            return total;
        }

        // REVIEW: No need for this to be a method
        public getMemberTypeName(prefix: string, topLevel: boolean, isElementType: boolean, scope: SymbolScope): string {
            var memberName = this.getMemberTypeNameEx(prefix, topLevel, isElementType, scope);
            return memberName.toString();
        }

        // REVIEW: No need for this to be a method
        public getMemberTypeNameEx(prefix: string, topLevel: boolean, isElementType: boolean, scope: SymbolScope): MemberName {
            if (this.elementType) {
                return MemberName.create(this.elementType.getMemberTypeNameEx(prefix, false, true, scope), "", "[]");
            }
            else if (this.symbol && this.symbol.name && this.symbol.name != "_anonymous" &&
                     (((this.call == null) && (this.construct == null) && (this.index == null)) ||
                      (hasFlag(this.typeFlags, TypeFlags.BuildingName)) ||
                      (this.members && (!this.isClass())))) {
                var tn = this.symbol.scopeRelativeName(scope);
                return MemberName.create(tn == "null" ? "any" : tn); // REVIEW: GROSS!!!
            }
            else {
                if (this.members || this.call || this.construct) {
                    if (hasFlag(this.typeFlags, TypeFlags.BuildingName)) {
                        return MemberName.create("this");
                    }
                    this.typeFlags |= TypeFlags.BuildingName;
                    var builder = "";
                    var allMemberNames = new MemberNameArray();
                    var curlies = isElementType || this.index != null;
                    var memCount = 0;
                    var delim = "; ";
                    if (this.members) {
                        this.members.allMembers.map((key, s, unused) => {
                            var sym = <Symbol>s;
                            if (!hasFlag(sym.flags, SymbolFlags.BuiltIn)) {
                                // Remove the delimiter character from the generated type name, since
                                // our "allMemberNames" array takes care of storing delimiters
                                var typeNameMember = sym.getTypeNameEx(scope);
                                if (typeNameMember.isArray() && (<MemberNameArray>typeNameMember).delim == delim) {
                                    allMemberNames.addAll((<MemberNameArray>typeNameMember).entries);
                                } else {
                                    allMemberNames.add(typeNameMember);
                                }
                                memCount++;
                                curlies = true;
                            }
                        }, null);
                    }

                    var signatureCount = this.callCount();
                    var j: number;
                    var len = 0;
                    var shortform = !curlies && signatureCount == 1 && topLevel;
                    if (this.call) {
                        allMemberNames.addAll(this.call.toStrings(prefix, shortform, scope));
                    }

                    if (this.construct) {
                        allMemberNames.addAll(this.construct.toStrings("new", shortform, scope));
                    }

                    if (this.index) {
                        allMemberNames.addAll(this.index.toStrings("", shortform, scope));
                    }

                    if ((curlies) || ((signatureCount > 1) && topLevel)) {
                        allMemberNames.prefix = "{ ";
                        allMemberNames.suffix = "}";
                        allMemberNames.delim = delim;
                    } else if (allMemberNames.entries.length > 1) {
                        allMemberNames.delim = delim;
                    }

                    this.typeFlags &= (~TypeFlags.BuildingName);
                    if ((signatureCount == 0) && (memCount == 0)) {
                        return MemberName.create("{}");
                    }
                    else {
                        return allMemberNames;
                    }
                }
                else {
                    return MemberName.create("{}");
                }
            }
        }

        public checkDecl(checker: TypeChecker) {
            if (this.isClassInstance() || this.isClass()) {
                if (this.symbol.declAST) {
                    checker.typeFlow.inScopeTypeCheckDecl(this.symbol.declAST);
                }
            }
        }

        public getMemberScope(flow: TypeFlow) {
            if (this == flow.anyType) {
                return null;
            }
            else if (this.isDouble()) {
                if (flow.numberInterfaceType) {
                    return flow.numberInterfaceType.memberScope;
                }
                else {
                    return null;
                }
            }
            else if (this.isBoolean()) {
                if (flow.booleanInterfaceType) {
                    return flow.booleanInterfaceType.memberScope;
                }
                else {
                    return null;
                }
            }
            else if (this == flow.stringType) {
                if (flow.stringInterfaceType) {
                    return flow.stringInterfaceType.memberScope;
                }
                else {
                    return null;
                }
            }
            else if (this.elementType) {
                if (flow.arrayInterfaceType) {
                    var arrInstType = this.elementType.getArrayBase(flow.arrayInterfaceType, flow.checker);
                    return arrInstType.memberScope;
                }
                else {
                    return null;
                }
            }
            else {
                return this.memberScope;
            }
        }

        public isReferenceType() {
            return this.members || this.extendsList ||
                this.construct || this.call || this.index ||
                this.elementType;
        }

        public specializeType(pattern: Type, replacement: Type, checker: TypeChecker, membersOnly: boolean): Type {
            if (pattern == this) {
                return replacement;
            }
            var result = this;
            if (membersOnly) {
                // assume interface type without bases
                if (this.isReferenceType()) {
                    result = new Type();
                    if (this.members) {
                        result.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));

                        this.members.publicMembers.map((key, s, unused) => {
                            var sym = <Symbol>s;
                            var bSym = sym.specializeType(pattern, replacement, checker);
                            result.members.addPublicMember(bSym.name, bSym);
                        }, null);

                        this.members.privateMembers.map((key, s, unused) => {
                            var sym = <Symbol>s;
                            var bSym = sym.specializeType(pattern, replacement, checker);
                            result.members.addPrivateMember(bSym.name, bSym);
                        }, null);
                    }
                    if (this.ambientMembers) {
                        result.ambientMembers = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                        this.ambientMembers.publicMembers.map((key, s, unused) => {
                            var sym = <Symbol>s;
                            var bSym = sym.specializeType(pattern, replacement, checker);
                            result.ambientMembers.addPublicMember(bSym.name, bSym);
                        }, null);

                        this.ambientMembers.privateMembers.map((key, s, unused) => {
                            var sym = <Symbol>s;
                            var bSym = sym.specializeType(pattern, replacement, checker);
                            result.ambientMembers.addPrivateMember(bSym.name, bSym);
                        }, null);
                    }
                    result.containedScope = checker.scopeOf(result);
                    result.memberScope = result.containedScope;
                }
            }
            else {
                if (this.elementType) {
                    if (this.elementType == pattern) {
                        result = checker.makeArrayType(replacement);
                    }
                    else {
                        if (this.elementType.elementType == pattern) {
                            result = checker.makeArrayType(checker.makeArrayType(replacement));
                        }
                    }
                }
                else if (this.call) {
                    result = new Type();
                    result.call = this.call.specializeType(pattern, replacement, checker);
                }
            }
            return result;
        }

        public hasBase(baseType: Type): boolean {
            if (baseType == this) {
                return true;
            }
            else {
                if (this.extendsList) {
                    for (var i = 0, len = this.extendsList.length; i < len; i++) {
                        if (this.extendsList[i].hasBase(baseType)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        public mergeOrdered(b: Type, checker: TypeChecker, acceptVoid: boolean, comparisonInfo?: TypeComparisonInfo): Type {
            if ((this == checker.anyType) || (b == checker.anyType)) {
                return checker.anyType;
            }
            else if (this == b) {
                return this;
            }
            else if ((b == checker.nullType) && this != checker.nullType) {
                return this;
            }
            else if ((this == checker.nullType) && (b != checker.nullType)) {
                return b;
            }
            else if (acceptVoid && (b == checker.voidType) && this != checker.voidType) {
                return this;
            }
            else if (acceptVoid && (this == checker.voidType) && (b != checker.voidType)) {
                return b;
            }
            else if ((b == checker.undefinedType) && this != checker.undefinedType) {
                return this;
            }
            else if ((this == checker.undefinedType) && (b != checker.undefinedType)) {
                return b;
            }
            else if (this.elementType && b.elementType) {
                if (this.elementType == b.elementType) {
                    return this;
                }
                else {
                    var mergedET = this.elementType.mergeOrdered(b.elementType, checker, acceptVoid, comparisonInfo);
                    if (mergedET == null) {
                        return checker.makeArrayType(checker.anyType);
                    }
                    else {
                        return checker.makeArrayType(mergedET);
                    }
                }
            }
            else if (checker.sourceIsSubtypeOfTarget(this, b, comparisonInfo)) {
                return b;
            }
            else if (checker.sourceIsSubtypeOfTarget(b, this, comparisonInfo)) {
                return this;
            }
            else {
                return null;
            }
        }

        public isModuleType() { return false; }
        public hasMembers() { return this.members != null; }
        public getAllEnclosedTypes(): ScopedMembers { return null; }
        public getAllAmbientEnclosedTypes(): ScopedMembers { return null; }
        public getPublicEnclosedTypes(): ScopedMembers { return null; }
        public getpublicAmbientEnclosedTypes(): ScopedMembers { return null; }

        public getDocComments(): Comment[]{
            if (this.elementType || !this.symbol) {
                return [];
            }

            if (this.isClassInstance() || this.isClass()) {
                if (this.symbol.declAST.nodeType == NodeType.FuncDecl) {
                    // Its a constructor - use the class declaration instead
                    return (<FuncDecl>this.symbol.declAST).classDecl.getDocComments();
                } else {
                    // Its a class without constructor
                    return this.symbol.getDocComments();
                }
            }

            if (this.symbol.name && this.symbol.name != "_anonymous" &&
                (((this.call == null) && (this.construct == null) && (this.index == null))
                  || this.members)) {
                return this.symbol.getDocComments();
            }

            return [];
        }
    }

    export interface ITypeCollection {
        // returns null when types are exhausted
        getLength(): number;
        setTypeAtIndex(index: number, type: Type): void;
        getTypeAtIndex(index: number): Type;
    }

    export class ModuleType extends Type {

        constructor (public enclosedTypes: ScopedMembers, public ambientEnclosedTypes: ScopedMembers) {
            super();
        }

        public isModuleType() { return true; }
        public hasMembers() { return this.members != null || this.enclosedTypes != null; }
        public getAllEnclosedTypes() { return this.enclosedTypes; }
        public getAllAmbientEnclosedTypes() { return this.ambientEnclosedTypes; }
        public getPublicEnclosedTypes(): ScopedMembers { return null; }
        public getpublicAmbientEnclosedTypes(): ScopedMembers { return null; }
        public importedModules: ImportDeclaration[] = [];

        // Finds the dynamic module name of moduleType in the members
        // ignoreSymbols define list of symbols already visited - to avoid recursion
        static findDynamicModuleNameInHashTable(moduleType: Type, members: IHashTable) {
            var moduleName: { name: string; symbol: Symbol; } = null;
            members.map((key, s, c) => {
                if (moduleName == null && !isQuoted(key)) {
                    var symbol = <Symbol>s;
                    var type = symbol.getType();
                    if (type == moduleType) {
                        // If this is the module type we were looking for
                        moduleName = { name: key, symbol: symbol };
                    }
                }
            }, null);

            return moduleName;
        }

        // Finds the Dynamic module name of the moduleType in this moduleType
        // onlyPublic tells if we are looking for module name in public members only
        public findDynamicModuleName(moduleType: Type): { name: string; symbol: Symbol; } {
            var moduleName: { name: string; symbol: Symbol; } = null;
            // Not cached, so seach and add to the cache
            moduleName = ModuleType.findDynamicModuleNameInHashTable(moduleType, this.members.allMembers);
            if (moduleName == null) {
                moduleName = ModuleType.findDynamicModuleNameInHashTable(moduleType, this.ambientMembers.allMembers);
            }
            return moduleName;
        }
    }

    export class TypeLink {
        public type: Type = null;
        public ast: AST = null;
    }

    export function getTypeLink(ast: AST, checker: TypeChecker, autoVar: boolean): TypeLink {
        var result = new TypeLink();

        result.ast = ast;

        if ((ast == null) && (autoVar)) {
            result.type = checker.anyType;
        }
        else {
            result.type = null;
        }

        return result;
    }

}