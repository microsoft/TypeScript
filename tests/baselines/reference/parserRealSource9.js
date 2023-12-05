//// [tests/cases/conformance/parser/ecmascript5/parserRealSource9.ts] ////

//// [parserRealSource9.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    export class Binder {
        constructor (public checker: TypeChecker) { }
        public resolveBaseTypeLinks(typeLinks: TypeLink[], scope: SymbolScope) {
            var extendsList: Type[] = null;
            if (typeLinks) {
                extendsList = new Type[];
                for (var i = 0, len = typeLinks.length; i < len; i++) {
                    var typeLink = typeLinks[i];
                    this.checker.resolvingBases = true;
                    this.checker.resolveTypeLink(scope, typeLink, true);
                    this.checker.resolvingBases = false;
                    if (typeLink.type.isClass()) {
                        extendsList[i] = typeLink.type.instanceType;
                    }
                    else {
                        extendsList[i] = typeLink.type;
                    }
                }
            }
            return extendsList;
        }

        public resolveBases(scope: SymbolScope, type: Type) {
            type.extendsList = this.resolveBaseTypeLinks(type.extendsTypeLinks, scope);

            var i = 0, len = type.extendsList.length;
            var derivedIsClass = type.isClassInstance();
            for (; i < len; i++) {
                var baseIsClass = type.extendsList[i].isClassInstance();
                if (type.extendsList[i] != this.checker.anyType) {
                    if (derivedIsClass) {
                        if (!baseIsClass) {
                            this.checker.errorReporter.simpleErrorFromSym(type.symbol,
                                                                     "A export class may only extend other classes, " + type.extendsList[i].symbol.fullName() + " is an interface.");
                        }
                    }
                    else {
                        if (baseIsClass) {
                            this.checker.errorReporter.simpleErrorFromSym(type.symbol,
                                                                     "An interface may only extend other interfaces, " + type.extendsList[i].symbol.fullName() + " is a class.");
                        }
                    }
                }
            }

            type.implementsList = this.resolveBaseTypeLinks(type.implementsTypeLinks, scope);

            if (type.implementsList) {
                for (i = 0, len = type.implementsList.length; i < len; i++) {
                    var iface = type.implementsList[i];
                    if (iface.isClassInstance()) {
                        if (derivedIsClass) {
                            this.checker.errorReporter.simpleErrorFromSym(type.symbol,
                                                                     "A class may only implement an interface; " + iface.symbol.fullName() + " is a class.");
                        }
                    }
                }
            }
        }

        public resolveSignatureGroup(signatureGroup: SignatureGroup, scope: SymbolScope, instanceType: Type) {
            var supplyVar = !(signatureGroup.hasImplementation);
            for (var i = 0, len = signatureGroup.signatures.length; i < len; i++) {
                var signature = signatureGroup.signatures[i];
                if (instanceType) {
                    signature.returnType.type = instanceType;
                }
                else {
                    this.checker.resolveTypeLink(scope, signature.returnType, supplyVar);
                }
                var paramLen = signature.parameters.length;
                for (var j = 0; j < paramLen; j++) {
                    this.bindSymbol(scope, signature.parameters[j]);
                }
                if (signature.hasVariableArgList) {
                    // check that last parameter has an array type
                    var lastParam = <ParameterSymbol>signature.parameters[paramLen - 1];
                    lastParam.argsOffset = paramLen - 1;
                    if (!lastParam.getType().isArray()) {
                        this.checker.errorReporter.simpleErrorFromSym(lastParam,
                                                                 "... parameter must have array type");
                        lastParam.parameter.typeLink.type = this.checker.makeArrayType(lastParam.parameter.typeLink.type);
                    }
                }
            }
        }

        public bindType(scope: SymbolScope, type: Type, instanceType: Type): void {
            if (instanceType) {
                this.bindType(scope, instanceType, null);
            }
            if (type.hasMembers()) {
                var members = type.members;
                var ambientMembers = type.ambientMembers;
                var typeMembers = type.getAllEnclosedTypes(); // REVIEW: Should only be getting exported types?
                var ambientTypeMembers = type.getAllAmbientEnclosedTypes(); // REVIEW: Should only be getting exported types?
                var memberScope = new SymbolTableScope(members, ambientMembers, typeMembers, ambientTypeMembers, type.symbol);
                var agg = new SymbolAggregateScope(type.symbol);
                var prevCurrentModDecl = this.checker.currentModDecl;
                var prevBindStatus = this.checker.inBind;
                agg.addParentScope(memberScope);
                agg.addParentScope(scope);
                if (type.isModuleType()) {
                    this.checker.currentModDecl = <ModuleDeclaration>type.symbol.declAST;
                    this.checker.inBind = true;
                }
                if (members) {
                    this.bind(agg, type.members.allMembers); // REVIEW: Should only be getting exported types?
                }
                if (typeMembers) {
                    this.bind(agg, typeMembers.allMembers);
                }
                if (ambientMembers) {
                    this.bind(agg, ambientMembers.allMembers);
                }
                if (ambientTypeMembers) {
                    this.bind(agg, ambientTypeMembers.allMembers);
                }
                this.checker.currentModDecl = prevCurrentModDecl;
                this.checker.inBind = prevBindStatus;
            }
            if (type.extendsTypeLinks) {
                this.resolveBases(scope, type);
            }
            if (type.construct) {
                this.resolveSignatureGroup(type.construct, scope, instanceType);
            }
            if (type.call) {
                this.resolveSignatureGroup(type.call, scope, null);
            }
            if (type.index) {
                this.resolveSignatureGroup(type.index, scope, null);
            }
            if (type.elementType) {
                this.bindType(scope, type.elementType, null);
            }
        }

        public bindSymbol(scope: SymbolScope, symbol: Symbol) {
            if (!symbol.bound) {
                var prevLocationInfo = this.checker.locationInfo;
                if ((this.checker.units) && (symbol.unitIndex >= 0) && (symbol.unitIndex < this.checker.units.length)) {
                    this.checker.locationInfo = this.checker.units[symbol.unitIndex];
                }
                switch (symbol.kind()) {
                    case SymbolKind.Type:

                        if (symbol.flags & SymbolFlags.Bound) {
                            break;
                        }

                        var typeSymbol = <TypeSymbol>symbol;
                        typeSymbol.flags |= SymbolFlags.Bound;

                        // Since type collection happens out of order, a dynamic module referenced by an import statement
                        // may not yet be in scope when the import symbol is created.  In that case, we need to search
                        // out the module symbol now
                        // Note that we'll also want to do this in resolveTypeMembers, in case the symbol is set outside the
                        // context of a given module  (E.g., an outer import statement)
                        if (typeSymbol.aliasLink && !typeSymbol.type && typeSymbol.aliasLink.alias.nodeType == NodeType.Name) {
                            var modPath = (<Identifier>typeSymbol.aliasLink.alias).text;
                            var modSym = this.checker.findSymbolForDynamicModule(modPath, this.checker.locationInfo.filename, (id) => scope.find(id, false, true));
                            if (modSym) {
                                typeSymbol.type = modSym.getType();
                            }
                        }

                        if (typeSymbol.type && typeSymbol.type != this.checker.gloModType) {
                            this.bindType(scope, typeSymbol.type, typeSymbol.instanceType);

                            // bind expansions on the parent type symbol
                            if (typeSymbol.type.isModuleType()) {
                                for (var i = 0; i < typeSymbol.expansions.length; i++) {
                                    this.bindType(scope, typeSymbol.expansions[i], typeSymbol.instanceType);
                                }
                            }
                        }
                        break;
                    case SymbolKind.Field:
                        this.checker.resolveTypeLink(scope, (<FieldSymbol>symbol).field.typeLink,
                                                false);
                        break;
                    case SymbolKind.Parameter:
                        this.checker.resolveTypeLink(scope,
                                                (<ParameterSymbol>symbol).parameter.typeLink,
                                                true);
                        break;
                }
                this.checker.locationInfo = prevLocationInfo;
            }
            symbol.bound = true;
        }

        public bind(scope: SymbolScope, table: IHashTable) {
            table.map(
                (key, sym, binder) => {
                    binder.bindSymbol(scope, sym);
                },
                this);
        }
    }

}

//// [parserRealSource9.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    var Binder = /** @class */ (function () {
        function Binder(checker) {
            this.checker = checker;
        }
        Binder.prototype.resolveBaseTypeLinks = function (typeLinks, scope) {
            var extendsList = null;
            if (typeLinks) {
                extendsList = new Type[];
                for (var i = 0, len = typeLinks.length; i < len; i++) {
                    var typeLink = typeLinks[i];
                    this.checker.resolvingBases = true;
                    this.checker.resolveTypeLink(scope, typeLink, true);
                    this.checker.resolvingBases = false;
                    if (typeLink.type.isClass()) {
                        extendsList[i] = typeLink.type.instanceType;
                    }
                    else {
                        extendsList[i] = typeLink.type;
                    }
                }
            }
            return extendsList;
        };
        Binder.prototype.resolveBases = function (scope, type) {
            type.extendsList = this.resolveBaseTypeLinks(type.extendsTypeLinks, scope);
            var i = 0, len = type.extendsList.length;
            var derivedIsClass = type.isClassInstance();
            for (; i < len; i++) {
                var baseIsClass = type.extendsList[i].isClassInstance();
                if (type.extendsList[i] != this.checker.anyType) {
                    if (derivedIsClass) {
                        if (!baseIsClass) {
                            this.checker.errorReporter.simpleErrorFromSym(type.symbol, "A export class may only extend other classes, " + type.extendsList[i].symbol.fullName() + " is an interface.");
                        }
                    }
                    else {
                        if (baseIsClass) {
                            this.checker.errorReporter.simpleErrorFromSym(type.symbol, "An interface may only extend other interfaces, " + type.extendsList[i].symbol.fullName() + " is a class.");
                        }
                    }
                }
            }
            type.implementsList = this.resolveBaseTypeLinks(type.implementsTypeLinks, scope);
            if (type.implementsList) {
                for (i = 0, len = type.implementsList.length; i < len; i++) {
                    var iface = type.implementsList[i];
                    if (iface.isClassInstance()) {
                        if (derivedIsClass) {
                            this.checker.errorReporter.simpleErrorFromSym(type.symbol, "A class may only implement an interface; " + iface.symbol.fullName() + " is a class.");
                        }
                    }
                }
            }
        };
        Binder.prototype.resolveSignatureGroup = function (signatureGroup, scope, instanceType) {
            var supplyVar = !(signatureGroup.hasImplementation);
            for (var i = 0, len = signatureGroup.signatures.length; i < len; i++) {
                var signature = signatureGroup.signatures[i];
                if (instanceType) {
                    signature.returnType.type = instanceType;
                }
                else {
                    this.checker.resolveTypeLink(scope, signature.returnType, supplyVar);
                }
                var paramLen = signature.parameters.length;
                for (var j = 0; j < paramLen; j++) {
                    this.bindSymbol(scope, signature.parameters[j]);
                }
                if (signature.hasVariableArgList) {
                    // check that last parameter has an array type
                    var lastParam = signature.parameters[paramLen - 1];
                    lastParam.argsOffset = paramLen - 1;
                    if (!lastParam.getType().isArray()) {
                        this.checker.errorReporter.simpleErrorFromSym(lastParam, "... parameter must have array type");
                        lastParam.parameter.typeLink.type = this.checker.makeArrayType(lastParam.parameter.typeLink.type);
                    }
                }
            }
        };
        Binder.prototype.bindType = function (scope, type, instanceType) {
            if (instanceType) {
                this.bindType(scope, instanceType, null);
            }
            if (type.hasMembers()) {
                var members = type.members;
                var ambientMembers = type.ambientMembers;
                var typeMembers = type.getAllEnclosedTypes(); // REVIEW: Should only be getting exported types?
                var ambientTypeMembers = type.getAllAmbientEnclosedTypes(); // REVIEW: Should only be getting exported types?
                var memberScope = new SymbolTableScope(members, ambientMembers, typeMembers, ambientTypeMembers, type.symbol);
                var agg = new SymbolAggregateScope(type.symbol);
                var prevCurrentModDecl = this.checker.currentModDecl;
                var prevBindStatus = this.checker.inBind;
                agg.addParentScope(memberScope);
                agg.addParentScope(scope);
                if (type.isModuleType()) {
                    this.checker.currentModDecl = type.symbol.declAST;
                    this.checker.inBind = true;
                }
                if (members) {
                    this.bind(agg, type.members.allMembers); // REVIEW: Should only be getting exported types?
                }
                if (typeMembers) {
                    this.bind(agg, typeMembers.allMembers);
                }
                if (ambientMembers) {
                    this.bind(agg, ambientMembers.allMembers);
                }
                if (ambientTypeMembers) {
                    this.bind(agg, ambientTypeMembers.allMembers);
                }
                this.checker.currentModDecl = prevCurrentModDecl;
                this.checker.inBind = prevBindStatus;
            }
            if (type.extendsTypeLinks) {
                this.resolveBases(scope, type);
            }
            if (type.construct) {
                this.resolveSignatureGroup(type.construct, scope, instanceType);
            }
            if (type.call) {
                this.resolveSignatureGroup(type.call, scope, null);
            }
            if (type.index) {
                this.resolveSignatureGroup(type.index, scope, null);
            }
            if (type.elementType) {
                this.bindType(scope, type.elementType, null);
            }
        };
        Binder.prototype.bindSymbol = function (scope, symbol) {
            if (!symbol.bound) {
                var prevLocationInfo = this.checker.locationInfo;
                if ((this.checker.units) && (symbol.unitIndex >= 0) && (symbol.unitIndex < this.checker.units.length)) {
                    this.checker.locationInfo = this.checker.units[symbol.unitIndex];
                }
                switch (symbol.kind()) {
                    case SymbolKind.Type:
                        if (symbol.flags & SymbolFlags.Bound) {
                            break;
                        }
                        var typeSymbol = symbol;
                        typeSymbol.flags |= SymbolFlags.Bound;
                        // Since type collection happens out of order, a dynamic module referenced by an import statement
                        // may not yet be in scope when the import symbol is created.  In that case, we need to search
                        // out the module symbol now
                        // Note that we'll also want to do this in resolveTypeMembers, in case the symbol is set outside the
                        // context of a given module  (E.g., an outer import statement)
                        if (typeSymbol.aliasLink && !typeSymbol.type && typeSymbol.aliasLink.alias.nodeType == NodeType.Name) {
                            var modPath = typeSymbol.aliasLink.alias.text;
                            var modSym = this.checker.findSymbolForDynamicModule(modPath, this.checker.locationInfo.filename, function (id) { return scope.find(id, false, true); });
                            if (modSym) {
                                typeSymbol.type = modSym.getType();
                            }
                        }
                        if (typeSymbol.type && typeSymbol.type != this.checker.gloModType) {
                            this.bindType(scope, typeSymbol.type, typeSymbol.instanceType);
                            // bind expansions on the parent type symbol
                            if (typeSymbol.type.isModuleType()) {
                                for (var i = 0; i < typeSymbol.expansions.length; i++) {
                                    this.bindType(scope, typeSymbol.expansions[i], typeSymbol.instanceType);
                                }
                            }
                        }
                        break;
                    case SymbolKind.Field:
                        this.checker.resolveTypeLink(scope, symbol.field.typeLink, false);
                        break;
                    case SymbolKind.Parameter:
                        this.checker.resolveTypeLink(scope, symbol.parameter.typeLink, true);
                        break;
                }
                this.checker.locationInfo = prevLocationInfo;
            }
            symbol.bound = true;
        };
        Binder.prototype.bind = function (scope, table) {
            table.map(function (key, sym, binder) {
                binder.bindSymbol(scope, sym);
            }, this);
        };
        return Binder;
    }());
    TypeScript.Binder = Binder;
})(TypeScript || (TypeScript = {}));
