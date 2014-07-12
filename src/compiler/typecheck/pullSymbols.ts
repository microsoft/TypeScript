// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {
    export var pullSymbolID = 0;
    export var sentinelEmptyArray: any[] = [];

    export class PullSymbol {

        // private state
        // The symbol ids start with 1 and not 0 as 0 is reserved to detect false conditions eg. in determining 
        // wrappingTypeParameterID
        public pullSymbolID = ++pullSymbolID;

        public name: string;

        public kind: PullElementKind;

        private _container: PullTypeSymbol = null;
        public type: PullTypeSymbol = null;

        // We cache the declarations to improve look-up speed
        // (but we re-create on edits because deletion from the linked list is
        // much faster)
        private _declarations: PullDecl[] = null;

        public isResolved = false;

        public isOptional = false;

        public inResolution = false;

        private isSynthesized = false;

        public isVarArg = false;

        private rootSymbol: PullSymbol = null;

        private _enclosingSignature: PullSignatureSymbol = null;
        private _docComments: string = null;

        public isPrinting = false;

        public isAny(): boolean {
            return false;
        }

        public isType() {
            return (this.kind & PullElementKind.SomeType) !== 0;
        }

        public isTypeReference() { return false; }

        public isSignature() {
            return (this.kind & PullElementKind.SomeSignature) !== 0;
        }

        public isArrayNamedTypeReference() {
            return false;
        }

        public isPrimitive() {
            return this.kind === PullElementKind.Primitive;
        }

        public isAccessor() {
            return false;
        }

        public isError() {
            return false;
        }

        public isInterface() {
            return this.kind === PullElementKind.Interface;
        }

        public isMethod() {
            return this.kind === PullElementKind.Method;
        }

        public isProperty() {
            return this.kind === PullElementKind.Property;
        }

        public isAlias() { return false; }

        public isContainer() { return false; }

        constructor(name: string, declKind: PullElementKind) {
            this.name = name;
            this.kind = declKind;
        }

        // Finds alias if present representing this symbol
        private findAliasedTypeSymbols(scopeSymbol: PullSymbol, skipScopeSymbolAliasesLookIn?: boolean, lookIntoOnlyExportedAlias?: boolean, aliasSymbols: PullTypeAliasSymbol[]= [], visitedScopeDeclarations: PullDecl[]= []): PullTypeAliasSymbol[] {
            var scopeDeclarations = scopeSymbol.getDeclarations();
            var scopeSymbolAliasesToLookIn: PullTypeAliasSymbol[] = [];

            for (var i = 0; i < scopeDeclarations.length; i++) {
                var scopeDecl = scopeDeclarations[i];
                if (!ArrayUtilities.contains(visitedScopeDeclarations, scopeDecl)) {
                    visitedScopeDeclarations.push(scopeDecl);

                    var childDecls = scopeDecl.getChildDecls();
                    for (var j = 0; j < childDecls.length; j++) {
                        var childDecl = childDecls[j];
                        if (childDecl.kind === PullElementKind.TypeAlias &&
                            (!lookIntoOnlyExportedAlias || (childDecl.flags & PullElementFlags.Exported))) {
                            var symbol = <PullTypeAliasSymbol>childDecl.getSymbol();

                            if (PullContainerSymbol.usedAsSymbol(symbol, this) || // this is symbol is used as this alias
                                (this.rootSymbol && PullContainerSymbol.usedAsSymbol(symbol, this.rootSymbol))) { // the root symbol of the alias is used as import symbol
                                aliasSymbols.push(symbol);
                                return aliasSymbols;
                            }

                            if (!skipScopeSymbolAliasesLookIn && PullSymbol._isExternalModuleReferenceAlias(symbol) &&
                                (!symbol.assignedContainer().hasExportAssignment() ||
                                (symbol.assignedContainer().getExportAssignedContainerSymbol() && symbol.assignedContainer().getExportAssignedContainerSymbol().kind === PullElementKind.DynamicModule))) {// It is a dynamic module)) {
                                scopeSymbolAliasesToLookIn.push(symbol);
                            }
                        }
                    }
                }
            }

            // Didnt find alias in the declarations, look for them in the externalImport declarations of dynamic modules
            for (var i = 0; i < scopeSymbolAliasesToLookIn.length; i++) {
                var scopeSymbolAlias = scopeSymbolAliasesToLookIn[i];

                aliasSymbols.push(scopeSymbolAlias);
                var result = this.findAliasedTypeSymbols(
                    scopeSymbolAlias.assignedContainer().hasExportAssignment() ? scopeSymbolAlias.assignedContainer().getExportAssignedContainerSymbol() : scopeSymbolAlias.assignedContainer(),
                /*skipScopeSymbolAliasesLookIn*/ false, /*lookIntoOnlyExportedAlias*/ true, aliasSymbols, visitedScopeDeclarations);
                if (result) {
                    return result;
                }

                aliasSymbols.pop();
            }

            return null;
        }

        // Gets alias with external module reference if present representing this symbol
        public getExternalAliasedSymbols(scopeSymbol: PullSymbol) {
            if (!scopeSymbol) {
                return null;
            }

            var scopePath = scopeSymbol.pathToRoot();
            if (scopePath.length && scopePath[scopePath.length - 1].kind === PullElementKind.DynamicModule) {
                var symbols = this.findAliasedTypeSymbols(scopePath[scopePath.length - 1]);
                return symbols;
            }

            return null;
        }

        public static _isExternalModuleReferenceAlias(aliasSymbol: PullTypeAliasSymbol) {
            if (aliasSymbol) {
                // Has value symbol
                if (aliasSymbol.assignedValue()) {
                    return false;
                }

                // Has type that is not same as container
                if (aliasSymbol.assignedType() && aliasSymbol.assignedType() !== aliasSymbol.assignedContainer()) {
                    return false;
                }

                // Its internal module
                if (aliasSymbol.assignedContainer() && aliasSymbol.assignedContainer().kind !== PullElementKind.DynamicModule) {
                    return false;
                }

                return true;
            }

            return false;
        }

        // Gets exported alias with internal module reference if present representing this symbol
        private getExportedInternalAliasSymbol(scopeSymbol: PullSymbol) {
            if (scopeSymbol) {
                if (this.kind !== PullElementKind.TypeAlias) {
                    var scopePath = scopeSymbol.pathToRoot();
                    for (var i = 0; i < scopePath.length; i++) {
                        var internalAliases = this.findAliasedTypeSymbols(scopeSymbol, /*skipScopeSymbolAliasesLookIn*/ true, /*lookIntoOnlyExportedAlias*/ true);
                        if (internalAliases) {
                            Debug.assert(internalAliases.length === 1);
                            return internalAliases[0];
                        }
                    }
                }
            }

            return null;
        }

        // Get alias Name using the name getter methods
        public getAliasSymbolName(
            scopeSymbol: PullSymbol,
            aliasNameGetter: (symbol: PullTypeAliasSymbol) => string, // get the name for the alias
            aliasPartsNameGetter: (symbol: PullTypeAliasSymbol) => string, // get the name of parts of the alias
            skipInternalAlias?: boolean): string {
            if (!skipInternalAlias) {
                var internalAlias = this.getExportedInternalAliasSymbol(scopeSymbol);
                if (internalAlias) {
                    return aliasNameGetter(internalAlias);
                }
            }

            var externalAliases = this.getExternalAliasedSymbols(scopeSymbol);
            // Use only alias symbols to the dynamic module and it isnt expressed in terms of this symbol itself
            if (externalAliases && externalAliases[0] != this && PullSymbol._isExternalModuleReferenceAlias(externalAliases[externalAliases.length - 1])) {
                var aliasFullName = aliasNameGetter(externalAliases[0]);
                if (!aliasFullName) {
                    return null;
                }
                for (var i = 1, symbolsLen = externalAliases.length; i < symbolsLen; i++) {
                    aliasFullName = aliasFullName + "." + aliasPartsNameGetter(externalAliases[i]);
                }
                return aliasFullName;
            }

            return null;
        }

        public _getResolver(): PullTypeResolver {
            Debug.assert(this._declarations && this._declarations.length > 0);
            return this._declarations[0].semanticInfoChain.getResolver();
        }

        public _resolveDeclaredSymbol() {
            return this._getResolver().resolveDeclaredSymbol(this);
        }

        /** Use getName for type checking purposes, and getDisplayName to report an error or display info to the user.
         * They will differ when the identifier is an escaped unicode character or the identifier "__proto__".
         */
        public getName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string {
            var aliasName = this.getAliasSymbolName(scopeSymbol, (symbol) => symbol.getName(scopeSymbol, useConstraintInName), (symbol) => symbol.getName());
            return aliasName || this.name;
        }

        public getDisplayName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string {
            var aliasDisplayName = this.getAliasSymbolName(scopeSymbol,
                (symbol) => symbol.getDisplayName(scopeSymbol, useConstraintInName),
                (symbol) => symbol.getDisplayName(), skipInternalAliasName);
            if (aliasDisplayName) {
                return aliasDisplayName;
            }

            // Get the actual name associated with a declaration for this symbol
            var decls = this.getDeclarations();
            var name = decls.length && decls[0].getDisplayName();

            // In case the decl does not have a name like in the case of named function expression
            return (name && name.length) ? name : this.name;
        }

        public getIsSpecialized() { return false; }

        public getRootSymbol() {
            if (!this.rootSymbol) {
                return this;
            }
            return this.rootSymbol;
        }
        public setRootSymbol(symbol: PullSymbol) { this.rootSymbol = symbol; }

        public setIsSynthesized(value = true) {
            Debug.assert(this.rootSymbol == null);
            this.isSynthesized = value;
        }

        public getIsSynthesized() {
            if (this.rootSymbol) {
                return this.rootSymbol.getIsSynthesized();
            }
            return this.isSynthesized;
        }

        public setEnclosingSignature(signature: PullSignatureSymbol) {
            this._enclosingSignature = signature;
        }

        public getEnclosingSignature(): PullSignatureSymbol {
            return this._enclosingSignature;
        }

        // declaration methods
        public addDeclaration(decl: PullDecl) {
            Debug.assert(!!decl);

            if (this.rootSymbol) {
                return;
            }

            if (!this._declarations) {
                this._declarations = [decl];
            }
            else {
                this._declarations[this._declarations.length] = decl;
            }
        }

        public getDeclarations(): PullDecl[] {
            if (this.rootSymbol) {
                return this.rootSymbol.getDeclarations();
            }

            if (!this._declarations) {
                this._declarations = [];
            }

            return this._declarations;
        }

        public hasDeclaration(decl: PullDecl): boolean {
            if (!this._declarations) {
                return false;
            }

            return ArrayUtilities.any(this._declarations, eachDecl => eachDecl === decl);
        }

        // link methods

        public setContainer(containerSymbol: PullTypeSymbol) {
            if (this.rootSymbol) {
                return;
            }

            this._container = containerSymbol;
        }

        public getContainer(): PullTypeSymbol {
            if (this.rootSymbol) {
                return this.rootSymbol.getContainer();
            }

            return this._container;
        }

        public setResolved() {
            this.isResolved = true;
            this.inResolution = false;
        }

        public startResolving() {
            this.inResolution = true;
        }

        public setUnresolved() {
            this.isResolved = false;
            this.inResolution = false;
        }

        public anyDeclHasFlag(flag: PullElementFlags): boolean {
            var declarations = this.getDeclarations();
            for (var i = 0, n = declarations.length; i < n; i++) {
                if (hasFlag(declarations[i].flags, flag)) {
                    return true;
                }
            }
            return false;
        }

        public allDeclsHaveFlag(flag: PullElementFlags): boolean {
            var declarations = this.getDeclarations();
            for (var i = 0, n = declarations.length; i < n; i++) {
                if (!hasFlag(declarations[i].flags, flag)) {
                    return false;
                }
            }
            return true;
        }

        public pathToRoot() {
            var path: PullSymbol[] = [];
            var node = this;
            while (node) {
                if (node.isType()) {
                    var associatedContainerSymbol = (<PullTypeSymbol>node).getAssociatedContainerType();
                    if (associatedContainerSymbol) {
                        node = associatedContainerSymbol;
                    }
                }
                path[path.length] = node;
                var nodeKind = node.kind;
                if (nodeKind === PullElementKind.Parameter) {
                    break;
                }
                else {
                    node = node.getContainer();
                }
            }
            return path;
        }

        private static unqualifiedNameReferencesDifferentSymbolInScope(symbol: PullSymbol, scopePath: PullSymbol[], endScopePathIndex: number) {
            // Declaration path is reverse of symbol path
            // That is for symbol A.B.C.W the symbolPath = W C B A 
            // while declPath = A B C W
            var declPath = scopePath[0].getDeclarations()[0].getParentPath();
            for (var i = 0, declIndex = declPath.length - 1; i <= endScopePathIndex; i++, declIndex--) {
                // We should be doing this for all that is type/namespace/value kinds but for now we do this only for 
                // containers and types in another container
                if (scopePath[i].isContainer()) {
                    var scopeContainer = <PullContainerSymbol>scopePath[i];
                    if (symbol.isContainer()) {
                        // Non exported container 
                        var memberSymbol = scopeContainer.findContainedNonMemberContainer(symbol.name, PullElementKind.SomeContainer);
                        if (memberSymbol
                            && memberSymbol != symbol
                            && memberSymbol.getDeclarations()[0].getParentDecl() == declPath[declIndex]) {
                            // If we found different non exported symbol that is originating in same parent
                            // So symbol with this name would refer to the memberSymbol instead of symbol
                            return true;
                        }

                        // Exported container
                        var memberSymbol = scopeContainer.findNestedContainer(symbol.name, PullElementKind.SomeContainer);
                        if (memberSymbol && memberSymbol != symbol) {
                            return true;
                        }
                    }
                    else if (symbol.isType()) {
                        // Non exported type 
                        var memberSymbol = scopeContainer.findContainedNonMemberType(symbol.name, PullElementKind.SomeType);
                        var symbolRootType = PullHelpers.getRootType(<PullTypeSymbol>symbol);
                        if (memberSymbol
                            && PullHelpers.getRootType(memberSymbol) != symbolRootType
                            && memberSymbol.getDeclarations()[0].getParentDecl() == declPath[declIndex]) {
                            // If we found different non exported symbol that is originating in same parent
                            // So symbol with this name would refer to the memberSymbol instead of symbol
                            return true;
                        }

                        // Exported type
                        var memberSymbol = scopeContainer.findNestedType(symbol.name, PullElementKind.SomeType);
                        if (memberSymbol && PullHelpers.getRootType(memberSymbol) != symbolRootType) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        // Find the path of this symbol in common ancestor of this symbol and b Symbol
        private findQualifyingSymbolPathInScopeSymbol(scopeSymbol: PullSymbol): PullSymbol[] {
            var thisPath = this.pathToRoot();
            if (thisPath.length === 1) {
                // Global symbol
                return thisPath;
            }

            var scopeSymbolPath: PullSymbol[];
            if (scopeSymbol) {
                scopeSymbolPath = scopeSymbol.pathToRoot();
            }
            else {
                // If scopeSymbol wasnt provided, then the path is full path
                return thisPath;
            }

            var thisCommonAncestorIndex = ArrayUtilities.indexOf(thisPath, thisNode => ArrayUtilities.contains(scopeSymbolPath, thisNode));
            if (thisCommonAncestorIndex > 0) {
                // If the symbols matched that does not mean we can use the symbol before the common ancestor directly.
                // e.g
                //module A.C {
                //    export interface Z {
                //    }
                //}
                //module A.B.C {
                //    export class W implements A.C.Z /*This*/ {
                //    }
                //}
                // When trying to get Name of A.C.Z in the context A.B.C.W 
                // We find that thisPath = [Z C A] and scopeSymbolPath = [W C B A]
                // thisCommonAncestorIndex = 2
                // But we cant use (thisCommonAncestorIndex - 1)C of C.Z as the reference path because 
                // C in A.B.C.W references A.B.C rather than A.C

                var thisCommonAncestor = thisPath[thisCommonAncestorIndex];
                var scopeCommonAncestorIndex = ArrayUtilities.indexOf(scopeSymbolPath, scopeNode => scopeNode === thisCommonAncestor);
                Debug.assert(thisPath.length - thisCommonAncestorIndex === scopeSymbolPath.length - scopeCommonAncestorIndex);

                for (; thisCommonAncestorIndex < thisPath.length; thisCommonAncestorIndex++, scopeCommonAncestorIndex++) {
                    if (!PullSymbol.unqualifiedNameReferencesDifferentSymbolInScope(
                        thisPath[thisCommonAncestorIndex - 1], scopeSymbolPath, scopeCommonAncestorIndex)) {
                        // scope symbol can reference symbol at index commonAncestor - 1 by name itself
                        break;
                    }
                }
            }

            if (thisCommonAncestorIndex >= 0 && thisCommonAncestorIndex < thisPath.length) {
                return thisPath.slice(0, thisCommonAncestorIndex);
            }
            else {
                return thisPath;
            }
        }

        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean) {
            var str = this.getNameAndTypeName(scopeSymbol);
            return str;
        }

        public getNamePartForFullName() {
            return this.getDisplayName(null /*scopeSymbol*/, true /*useConstraintInName*/);
        }

        public fullName(scopeSymbol?: PullSymbol): string {
            var path = this.pathToRoot();
            var fullName = "";

            var aliasFullName = this.getAliasSymbolName(scopeSymbol, (symbol) => symbol.fullName(scopeSymbol), (symbol) => symbol.getNamePartForFullName());
            if (aliasFullName) {
                return aliasFullName;
            }

            for (var i = 1; i < path.length; i++) {
                var aliasFullName = path[i].getAliasSymbolName(scopeSymbol, (symbol) => symbol === this ? null : symbol.fullName(scopeSymbol), (symbol) => symbol.getNamePartForFullName());
                if (aliasFullName) {
                    fullName = aliasFullName + "." + fullName;
                    break;
                }

                var scopedName = path[i].getNamePartForFullName();
                if (path[i].kind === PullElementKind.DynamicModule && !isQuoted(scopedName)) {
                    // Same file as dynamic module - do not include this name
                    break;
                }

                if (scopedName === "") {
                    // If the item does not have a name, stop enumarting them, e.g. Object literal
                    break;
                }

                fullName = scopedName + "." + fullName;
            }

            fullName = fullName + this.getNamePartForFullName();
            return fullName;
        }

        public getScopedName(scopeSymbol?: PullSymbol, skipTypeParametersInName?: boolean, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string {
            var path = this.findQualifyingSymbolPathInScopeSymbol(scopeSymbol);
            var fullName = "";

            var aliasFullName = this.getAliasSymbolName(scopeSymbol, (symbol) => symbol.getScopedName(scopeSymbol, skipTypeParametersInName, useConstraintInName, skipInternalAliasName),
                (symbol) => symbol.getNamePartForFullName(), skipInternalAliasName);
            if (aliasFullName) {
                return aliasFullName;
            }

            for (var i = 1; i < path.length; i++) {
                var kind = path[i].kind;
                if (kind === PullElementKind.Container || kind === PullElementKind.DynamicModule) {
                    var aliasFullName = path[i].getAliasSymbolName(scopeSymbol, (symbol) => symbol.getScopedName(scopeSymbol, skipTypeParametersInName, /*useConstraintInName*/ false, skipInternalAliasName),
                        (symbol) => symbol.getNamePartForFullName(), skipInternalAliasName);
                    if (aliasFullName) {
                        fullName = aliasFullName + "." + fullName;
                        break;
                    }

                    if (kind === PullElementKind.Container) {
                        fullName = path[i].getDisplayName() + "." + fullName;
                    }
                    else {
                        // Dynamic module 
                        var displayName = path[i].getDisplayName();
                        if (isQuoted(displayName)) {
                            fullName = displayName + "." + fullName;
                        }
                        break;
                    }
                }
                else {
                    // Any other type of container is not part of the name
                    break;
                }
            }
            fullName = fullName + this.getDisplayName(scopeSymbol, useConstraintInName, skipInternalAliasName);
            return fullName;
        }

        public getScopedNameEx(scopeSymbol?: PullSymbol, skipTypeParametersInName?: boolean, useConstraintInName?: boolean, getPrettyTypeName?: boolean, getTypeParamMarkerInfo?: boolean, skipInternalAliasName?: boolean) {
            var name = this.getScopedName(scopeSymbol, skipTypeParametersInName, useConstraintInName, skipInternalAliasName);
            return MemberName.create(name);
        }

        public getTypeName(scopeSymbol?: PullSymbol, getPrettyTypeName?: boolean) {
            var memberName = this.getTypeNameEx(scopeSymbol, getPrettyTypeName);
            return memberName.toString();
        }

        public getTypeNameEx(scopeSymbol?: PullSymbol, getPrettyTypeName?: boolean) {
            var type = this.type;
            if (type) {
                var memberName: MemberName = getPrettyTypeName ? this.getTypeNameForFunctionSignature("", scopeSymbol, getPrettyTypeName) : null;
                if (!memberName) {
                    memberName = type.getScopedNameEx(scopeSymbol, /*skipTypeParametersInName*/ false, /*useConstraintInName:*/ true, getPrettyTypeName);
                }

                return memberName;
            }
            return MemberName.create("");
        }

        private getTypeNameForFunctionSignature(prefix: string, scopeSymbol?: PullSymbol, getPrettyTypeName?: boolean) {
            var type = this.type;
            if (type && !type.isNamedTypeSymbol() && this.kind !== PullElementKind.Property && this.kind !== PullElementKind.Variable && this.kind !== PullElementKind.Parameter) {
                var signatures = type.getCallSignatures();
                if (signatures.length === 1 || (getPrettyTypeName && signatures.length)) {
                    var typeName = new MemberNameArray();
                    var signatureName = PullSignatureSymbol.getSignaturesTypeNameEx(signatures, prefix, /*shortform*/ false, /*brackets*/ false, scopeSymbol, getPrettyTypeName);
                    typeName.addAll(signatureName);
                    return typeName;
                }
            }

            return null;
        }

        public getNameAndTypeName(scopeSymbol?: PullSymbol) {
            var nameAndTypeName = this.getNameAndTypeNameEx(scopeSymbol);
            return nameAndTypeName.toString();
        }

        public getNameAndTypeNameEx(scopeSymbol?: PullSymbol) {
            var type = this.type;
            var nameStr = this.getDisplayName(scopeSymbol);
            if (type) {
                nameStr = nameStr + (this.isOptional ? "?" : "");
                var memberName: MemberName = this.getTypeNameForFunctionSignature(nameStr, scopeSymbol);
                if (!memberName) {
                    var typeNameEx = type.getScopedNameEx(scopeSymbol);
                    memberName = MemberName.create(typeNameEx, nameStr + ": ", "");
                }
                return memberName;
            }
            return MemberName.create(nameStr);
        }

        static getTypeParameterString(typars: PullTypeSymbol[], scopeSymbol?: PullSymbol, useContraintInName?: boolean) {
            return PullSymbol.getTypeParameterStringEx(typars, scopeSymbol, /*getTypeParamMarkerInfo:*/ undefined, useContraintInName).toString();
        }

        static getTypeParameterStringEx(typeParameters: PullTypeSymbol[], scopeSymbol?: PullSymbol, getTypeParamMarkerInfo?: boolean, useContraintInName?: boolean) {
            var builder = new MemberNameArray();
            builder.prefix = "";

            if (typeParameters && typeParameters.length) {
                builder.add(MemberName.create("<"));

                for (var i = 0; i < typeParameters.length; i++) {
                    if (i) {
                        builder.add(MemberName.create(", "));
                    }

                    if (getTypeParamMarkerInfo) {
                        builder.add(new MemberName());
                    }

                    builder.add(typeParameters[i].getScopedNameEx(scopeSymbol, /*skipTypeParametersInName*/ false, useContraintInName));

                    if (getTypeParamMarkerInfo) {
                        builder.add(new MemberName());
                    }
                }

                builder.add(MemberName.create(">"));
            }

            return builder;
        }

        static getIsExternallyVisible(symbol: PullSymbol, fromIsExternallyVisibleSymbol: PullSymbol, inIsExternallyVisibleSymbols: PullSymbol[]) {
            if (inIsExternallyVisibleSymbols) {
                for (var i = 0; i < inIsExternallyVisibleSymbols.length; i++) {
                    if (inIsExternallyVisibleSymbols[i] === symbol) {
                        return true;
                    }
                }
            }
            else {
                inIsExternallyVisibleSymbols = [];
            }

            if (fromIsExternallyVisibleSymbol === symbol) {
                return true;
            }

            inIsExternallyVisibleSymbols.push(fromIsExternallyVisibleSymbol);

            var result = symbol.isExternallyVisible(inIsExternallyVisibleSymbols);

            Debug.assert(ArrayUtilities.last(inIsExternallyVisibleSymbols) === fromIsExternallyVisibleSymbol);
            inIsExternallyVisibleSymbols.pop();

            return result;
        }

        public isExternallyVisible(inIsExternallyVisibleSymbols?: PullSymbol[]): boolean {
            // Primitive
            var kind = this.kind;
            if (kind === PullElementKind.Primitive) {
                return true;
            }

            if (this.rootSymbol) {
                return PullSymbol.getIsExternallyVisible(this.rootSymbol, this, inIsExternallyVisibleSymbols);
            }

            // Type - use container to determine privacy info
            if (this.isType()) {
                var associatedContainerSymbol = (<PullTypeSymbol>this).getAssociatedContainerType();
                if (associatedContainerSymbol) {
                    return PullSymbol.getIsExternallyVisible(associatedContainerSymbol, this, inIsExternallyVisibleSymbols);
                }
            }

            // Private member
            if (this.anyDeclHasFlag(PullElementFlags.Private)) {
                return false;
            }

            // If the container for this symbol is null, then this symbol is visible
            var container = this.getContainer();
            if (container === null) {
                var decls = this.getDeclarations();
                if (decls.length) {
                    var parentDecl = decls[0].getParentDecl();
                    if (parentDecl) {
                        var parentSymbol = parentDecl.getSymbol();
                        if (!parentSymbol || parentDecl.kind === PullElementKind.Script) {
                            return true;
                        }

                        return PullSymbol.getIsExternallyVisible(parentSymbol, this, inIsExternallyVisibleSymbols);
                    }
                }

                return true;
            }

            // If export assignment check if this is the symbol that is exported
            if (container.kind === PullElementKind.DynamicModule ||
                (container.getAssociatedContainerType() && container.getAssociatedContainerType().kind === PullElementKind.DynamicModule)) {
                var containerSymbol = container.kind === PullElementKind.DynamicModule
                    ? <PullContainerSymbol>container
                    : <PullContainerSymbol>container.getAssociatedContainerType();
                if (PullContainerSymbol.usedAsSymbol(containerSymbol, this)) {
                    return true;
                }
            }

            // If non exported member and is not class properties and method, it is not visible
            if (!this.anyDeclHasFlag(PullElementFlags.Exported) && kind !== PullElementKind.Property && kind !== PullElementKind.Method) {
                return false;
            }

            // Visible if parent is visible
            return PullSymbol.getIsExternallyVisible(container, this, inIsExternallyVisibleSymbols);
        }

        private getDocCommentsOfDecl(decl: TypeScript.PullDecl): TypeScript.Comment[] {
            var ast = decl.ast();

            if (ast) {
                var enclosingModuleDeclaration = ASTHelpers.getModuleDeclarationFromNameAST(ast);
                if (ASTHelpers.isLastNameOfModule(enclosingModuleDeclaration, ast)) {
                    return ASTHelpers.docComments(enclosingModuleDeclaration);
                }

                if (ast.kind() !== TypeScript.SyntaxKind.ModuleDeclaration || decl.kind !== TypeScript.PullElementKind.Variable) {
                    return ASTHelpers.docComments(ast);
                }
            }

            return [];
        }

        private getDocCommentArray(symbol: TypeScript.PullSymbol) {
            var docComments: TypeScript.Comment[] = [];
            if (!symbol) {
                return docComments;
            }

            var isParameter = symbol.kind === TypeScript.PullElementKind.Parameter;
            var decls = symbol.getDeclarations();
            for (var i = 0; i < decls.length; i++) {
                if (isParameter && decls[i].kind === TypeScript.PullElementKind.Property) {
                    // Ignore declaration for property that was defined as parameter because they both 
                    // point to same doc comment
                    continue;
                }
                docComments = docComments.concat(this.getDocCommentsOfDecl(decls[i]));
            }
            return docComments;
        }

        private static getDefaultConstructorSymbolForDocComments(classSymbol: TypeScript.PullTypeSymbol) {
            if (classSymbol.getHasDefaultConstructor()) {
                // get from parent if possible
                var extendedTypes = classSymbol.getExtendedTypes();
                if (extendedTypes.length) {
                    return PullSymbol.getDefaultConstructorSymbolForDocComments(extendedTypes[0]);
                }
            }

            return classSymbol.type.getConstructSignatures()[0];
        }

        private getDocCommentText(comments: Comment[]) {
            var docCommentText = new Array<string>();
            for (var c = 0; c < comments.length; c++) {
                var commentText = this.getDocCommentTextValue(comments[c]);
                if (commentText !== "") {
                    docCommentText.push(commentText);
                }
            }
            return docCommentText.join("\n");
        }

        private getDocCommentTextValue(comment: Comment) {
            return this.cleanJSDocComment(comment.fullText());
        }

        public docComments(useConstructorAsClass?: boolean): string {
            var decls = this.getDeclarations();
            if (useConstructorAsClass && decls.length && decls[0].kind === TypeScript.PullElementKind.ConstructorMethod) {
                var classDecl = decls[0].getParentDecl();
                return this.getDocCommentText(this.getDocCommentsOfDecl(classDecl));
            }

            if (this._docComments === null) {
                var docComments: string = "";
                if (!useConstructorAsClass && this.kind === TypeScript.PullElementKind.ConstructSignature &&
                    decls.length && decls[0].kind === TypeScript.PullElementKind.Class) {
                    var classSymbol = (<TypeScript.PullSignatureSymbol>this).returnType;
                    var extendedTypes = classSymbol.getExtendedTypes();
                    if (extendedTypes.length) {
                        docComments = extendedTypes[0].getConstructorMethod().docComments();
                    }
                    else {
                        docComments = "";
                    }
                }
                else if (this.kind === TypeScript.PullElementKind.Parameter) {
                    var parameterComments: string[] = [];

                    var funcContainer = this.getEnclosingSignature();
                    var funcDocComments = this.getDocCommentArray(funcContainer);
                    var paramComment = this.getParameterDocCommentText(this.getDisplayName(), funcDocComments);
                    if (paramComment != "") {
                        parameterComments.push(paramComment);
                    }

                    var paramSelfComment = this.getDocCommentText(this.getDocCommentArray(this));
                    if (paramSelfComment != "") {
                        parameterComments.push(paramSelfComment);
                    }
                    docComments = parameterComments.join("\n");
                }
                else {
                    var getSymbolComments = true;
                    if (this.kind === TypeScript.PullElementKind.FunctionType) {
                        var functionSymbol = (<TypeScript.PullTypeSymbol>this).getFunctionSymbol();

                        if (functionSymbol) {
                            docComments = functionSymbol._docComments || "";
                            getSymbolComments = false;
                        }
                        else {
                            var declarationList = this.getDeclarations();
                            if (declarationList.length > 0) {
                                docComments = declarationList[0].getSymbol()._docComments || "";
                                getSymbolComments = false;
                            }
                        }
                    }
                    if (getSymbolComments) {
                        docComments = this.getDocCommentText(this.getDocCommentArray(this));
                        if (docComments === "") {
                            if (this.kind === TypeScript.PullElementKind.CallSignature) {
                                var callTypeSymbol = (<TypeScript.PullSignatureSymbol>this).functionType;
                                if (callTypeSymbol && callTypeSymbol.getCallSignatures().length === 1) {
                                    docComments = callTypeSymbol.docComments();
                                }
                            }
                        }
                    }
                }

                this._docComments = docComments;
            }

            return this._docComments;
        }

        private getParameterDocCommentText(param: string, fncDocComments: Comment[]) {
            if (fncDocComments.length === 0 || fncDocComments[0].kind() !== SyntaxKind.MultiLineCommentTrivia) {
                // there were no fnc doc comments and the comment is not block comment then it cannot have 
                // @param comment that can be parsed
                return "";
            }

            for (var i = 0; i < fncDocComments.length; i++) {
                var commentContents = fncDocComments[i].fullText();
                for (var j = commentContents.indexOf("@param", 0); 0 <= j; j = commentContents.indexOf("@param", j)) {
                    j += 6;
                    if (!this.isSpaceChar(commentContents, j)) {
                        // This is not param tag but a tag line @paramxxxxx
                        continue;
                    }

                    // This is param tag. Check if it is what we are looking for
                    j = this.consumeLeadingSpace(commentContents, j);
                    if (j === -1) {
                        break;
                    }

                    // Ignore the type expression
                    if (commentContents.charCodeAt(j) === CharacterCodes.openBrace) {
                        j++;
                        // Consume the type
                        var charCode = 0;
                        for (var curlies = 1; j < commentContents.length; j++) {
                            charCode = commentContents.charCodeAt(j);
                            // { character means we need to find another } to match the found one
                            if (charCode === CharacterCodes.openBrace) {
                                curlies++;
                                continue;
                            }

                            // } char
                            if (charCode === CharacterCodes.closeBrace) {
                                curlies--;
                                if (curlies === 0) {
                                    // We do not have any more } to match the type expression is ignored completely
                                    break;
                                }
                                else {
                                    // there are more { to be matched with }
                                    continue;
                                }
                            }

                            // Found start of another tag
                            if (charCode === CharacterCodes.at) {
                                break;
                            }
                        }

                        // End of the comment
                        if (j === commentContents.length) {
                            break;
                        }

                        // End of the tag, go onto looking for next tag
                        if (charCode === CharacterCodes.at) {
                            continue;
                        }

                        j = this.consumeLeadingSpace(commentContents, j + 1);
                        if (j === -1) {
                            break;
                        }
                    }

                    // Parameter name
                    if (param !== commentContents.substr(j, param.length) || !this.isSpaceChar(commentContents, j + param.length)) {
                        // this is not the parameter we are looking for
                        continue;
                    }

                    // Found the parameter we were looking for
                    j = this.consumeLeadingSpace(commentContents, j + param.length);
                    if (j === -1) {
                        return "";
                    }

                    var endOfParam = commentContents.indexOf("@", j);
                    var paramHelpString = commentContents.substring(j, endOfParam < 0 ? commentContents.length : endOfParam);

                    // Find alignement spaces to remove
                    var paramSpacesToRemove: number = undefined;
                    var paramLineIndex = commentContents.substring(0, j).lastIndexOf("\n") + 1;
                    if (paramLineIndex !== 0) {
                        if (paramLineIndex < j && commentContents.charAt(paramLineIndex + 1) === "\r") {
                            paramLineIndex++;
                        }
                    }
                    var startSpaceRemovalIndex = this.consumeLeadingSpace(commentContents, paramLineIndex);
                    if (startSpaceRemovalIndex !== j && commentContents.charAt(startSpaceRemovalIndex) === "*") {
                        paramSpacesToRemove = j - startSpaceRemovalIndex - 1;
                    }

                    // Clean jsDocComment and return
                    return this.cleanJSDocComment(paramHelpString, paramSpacesToRemove);
                }
            }

            return "";
        }

        private cleanJSDocComment(content: string, spacesToRemove?: number) {
            var docCommentLines = new Array<string>();
            content = content.replace("/**", ""); // remove /**
            if (content.length >= 2 && content.charAt(content.length - 1) === "/" && content.charAt(content.length - 2) === "*") {
                content = content.substring(0, content.length - 2); // remove last */
            }
            var lines = content.split("\n");
            var inParamTag = false;
            for (var l = 0; l < lines.length; l++) {
                var line = lines[l];
                var cleanLinePos = this.cleanDocCommentLine(line, true, spacesToRemove);
                if (!cleanLinePos) {
                    // Whole line empty, read next line
                    continue;
                }

                var docCommentText = "";
                var prevPos = cleanLinePos.start;
                for (var i = line.indexOf("@", cleanLinePos.start); 0 <= i && i < cleanLinePos.end; i = line.indexOf("@", i + 1)) {
                    // We have encoutered @. 
                    // If we were omitting param comment, we dont have to do anything
                    // other wise the content of the text till @ tag goes as doc comment
                    var wasInParamtag = inParamTag;

                    // Parse contents next to @
                    if (line.indexOf("param", i + 1) === i + 1 && this.isSpaceChar(line, i + 6)) {
                        // It is param tag. 

                        // If we were not in param tag earlier, push the contents from prev pos of the tag this tag start as docComment
                        if (!wasInParamtag) {
                            docCommentText += line.substring(prevPos, i);
                        }

                        // New start of contents 
                        prevPos = i;
                        inParamTag = true;
                    }
                    else if (wasInParamtag) {
                        // Non param tag start
                        prevPos = i;
                        inParamTag = false;
                    }
                }

                if (!inParamTag) {
                    docCommentText += line.substring(prevPos, cleanLinePos.end);
                }

                // Add line to comment text if it is not only white space line
                var newCleanPos = this.cleanDocCommentLine(docCommentText, false);
                if (newCleanPos) {
                    if (spacesToRemove === undefined) {
                        spacesToRemove = cleanLinePos.jsDocSpacesRemoved;
                    }
                    docCommentLines.push(docCommentText);
                }
            }

            return docCommentLines.join("\n");
        }

        private consumeLeadingSpace(line: string, startIndex: number, maxSpacesToRemove?: number) {
            var endIndex = line.length;
            if (maxSpacesToRemove !== undefined) {
                endIndex = MathPrototype.min(startIndex + maxSpacesToRemove, endIndex);
            }

            for (; startIndex < endIndex; startIndex++) {
                var charCode = line.charCodeAt(startIndex);
                if (charCode !== CharacterCodes.space && charCode !== CharacterCodes.tab) {
                    return startIndex;
                }
            }

            if (endIndex !== line.length) {
                return endIndex;
            }

            return -1;
        }

        private isSpaceChar(line: string, index: number) {
            var length = line.length;
            if (index < length) {
                var charCode = line.charCodeAt(index);
                // If the character is space
                return charCode === CharacterCodes.space || charCode === CharacterCodes.tab;
            }

            // If the index is end of the line it is space
            return index === length;
        }

        private cleanDocCommentLine(line: string, jsDocStyleComment: boolean, jsDocLineSpaceToRemove?: number) {
            var nonSpaceIndex = this.consumeLeadingSpace(line, 0);
            if (nonSpaceIndex !== -1) {
                var jsDocSpacesRemoved = nonSpaceIndex;
                if (jsDocStyleComment && line.charAt(nonSpaceIndex) === '*') { // remove leading * in case of jsDocComment
                    var startIndex = nonSpaceIndex + 1;
                    nonSpaceIndex = this.consumeLeadingSpace(line, startIndex, jsDocLineSpaceToRemove);

                    if (nonSpaceIndex !== -1) {
                        jsDocSpacesRemoved = nonSpaceIndex - startIndex;
                    }
                    else {
                        return null;
                    }
                }

                return {
                    start: nonSpaceIndex,
                    end: line.charAt(line.length - 1) === "\r" ? line.length - 1 : line.length,
                    jsDocSpacesRemoved: jsDocSpacesRemoved
                };
            }

            return null;
        }
    }

    // This interface should be implemented by symbols that can be instantiated. (eg. PullTypeSymbol, PullSignatureSymbol)
    export interface InstantiableSymbol {
        // Is the symbol specialized
        getIsSpecialized(): boolean;

        // Type parameters this symbol can reference
        // eg. in below code 
        // interface IList<T> {
        //     owner: /*Any type here can only refere to type parameter T*/;
        //     map<U>(a: /*any type parameter here can only refere to U and T*/
        // }
        getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[];

        // Type parameter argument map for this symbol
        getTypeParameterArgumentMap(): TypeArgumentMap;
    }

    export class PullSignatureSymbol extends PullSymbol implements InstantiableSymbol {
        private _memberTypeParameterNameCache: IIndexable<PullTypeParameterSymbol> = null;
        private _stringConstantOverload: boolean = undefined;

        public parameters: PullSymbol[] = sentinelEmptyArray;
        public _typeParameters: PullTypeParameterSymbol[] = null;
        public returnType: PullTypeSymbol = null;
        public functionType: PullTypeSymbol = null;

        public hasOptionalParam = false;
        public nonOptionalParamCount = 0;

        public hasVarArgs = false;

        private _allowedToReferenceTypeParameters: PullTypeParameterSymbol[] = null;
        private _instantiationCache: IIndexable<PullSignatureSymbol> = null;

        public hasBeenChecked = false;
        public inWrapCheck = false;
        public inWrapInfiniteExpandingReferenceCheck = false;

        private _wrapsTypeParameterCache: WrapsTypeParameterCache;

        constructor(kind: PullElementKind, private _isDefinition = false) {
            super("", kind);
        }

        public isDefinition() { return this._isDefinition; }

        // GTODO
        public isGeneric() {
            var typeParameters = this.getTypeParameters();
            return !!typeParameters && typeParameters.length !== 0;
        }

        public addParameter(parameter: PullSymbol, isOptional = false) {
            if (this.parameters === sentinelEmptyArray) {
                this.parameters = [];
            }

            this.parameters[this.parameters.length] = parameter;
            this.hasOptionalParam = isOptional;

            if (!parameter.getEnclosingSignature()) {
                parameter.setEnclosingSignature(this);
            }

            if (!isOptional) {
                this.nonOptionalParamCount++;
            }
        }

        public addTypeParameter(typeParameter: PullTypeParameterSymbol) {
            if (!this._typeParameters) {
                this._typeParameters = [];
            }

            if (!this._memberTypeParameterNameCache) {
                this._memberTypeParameterNameCache = createIntrinsicsObject<PullTypeParameterSymbol>();
            }

            this._typeParameters[this._typeParameters.length] = typeParameter;

            this._memberTypeParameterNameCache[typeParameter.getName()] = typeParameter;
        }

        public addTypeParametersFromReturnType() {
            var typeParameters = this.returnType.getTypeParameters();
            for (var i = 0; i < typeParameters.length; i++) {
                this.addTypeParameter(typeParameters[i]);
            }
        }

        public getTypeParameters(): PullTypeParameterSymbol[]{
            if (!this._typeParameters) {
                this._typeParameters = [];
            }

            return this._typeParameters;
        }

        public findTypeParameter(name: string): PullTypeParameterSymbol {
            var memberSymbol: PullTypeParameterSymbol;

            if (!this._memberTypeParameterNameCache) {

                this._memberTypeParameterNameCache = createIntrinsicsObject<PullTypeParameterSymbol>();

                for (var i = 0; i < this.getTypeParameters().length; i++) {
                    this._memberTypeParameterNameCache[this._typeParameters[i].getName()] = this._typeParameters[i];
                }
            }

            memberSymbol = this._memberTypeParameterNameCache[name];

            return memberSymbol;
        }

        public getTypeParameterArgumentMap(): TypeArgumentMap { return null; }

        public getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[] {
            Debug.assert(this.getRootSymbol() == this);
            if (!this._allowedToReferenceTypeParameters) {
                // If the type is not named, it cannot have its own type parameters
                // But it can refer to typeParameters from enclosing type
                this._allowedToReferenceTypeParameters = PullInstantiationHelpers.getAllowedToReferenceTypeParametersFromDecl(this.getDeclarations()[0]);
            }

            return this._allowedToReferenceTypeParameters;
        }

        public addSpecialization(specializedVersionOfThisSignature: PullSignatureSymbol, typeArgumentMap: TypeArgumentMap): void {
            Debug.assert(this.getRootSymbol() == this);
            if (!this._instantiationCache) {
                this._instantiationCache = createIntrinsicsObject<PullSignatureSymbol>();
            }

            this._instantiationCache[getIDForTypeSubstitutions(this, typeArgumentMap)] = specializedVersionOfThisSignature;
        }

        public getSpecialization(typeArgumentMap: TypeArgumentMap): PullSignatureSymbol {
            Debug.assert(this.getRootSymbol() == this);
            if (!this._instantiationCache) {
                return null;
            }

            var result = this._instantiationCache[getIDForTypeSubstitutions(this, typeArgumentMap)];
            return result || null;
        }

        public isStringConstantOverloadSignature() {
            if (this._stringConstantOverload === undefined) {
                var params = this.parameters;
                this._stringConstantOverload = false;
                for (var i = 0; i < params.length; i++) {
                    var paramType = params[i].type;
                    if (paramType && paramType.isPrimitive() && (<PullPrimitiveTypeSymbol>paramType).isStringConstant()) {
                        this._stringConstantOverload = true;
                    }
                }
            }

            return this._stringConstantOverload;
        }

        // Gets the type of parameter at given index
        public getParameterTypeAtIndex(iParam: number) {
            if (iParam < this.parameters.length - 1 || (iParam < this.parameters.length && !this.hasVarArgs)) {
                return this.parameters[iParam].type;
            }
            else if (this.hasVarArgs) {
                var paramType = this.parameters[this.parameters.length - 1].type;
                if (paramType.isArrayNamedTypeReference()) {
                    paramType = paramType.getElementType();
                }
                return paramType
            }

            return null;
        }

        static getSignatureTypeMemberName(candidateSignature: PullSignatureSymbol, signatures: PullSignatureSymbol[], scopeSymbol: PullSymbol) {
            var allMemberNames = new MemberNameArray();
            var signatureMemberName = PullSignatureSymbol.getSignaturesTypeNameEx(signatures, /*prefix*/ "", /*shortform*/ false, /*brackets*/ false, scopeSymbol, /*getPrettyName*/ true, candidateSignature);
            allMemberNames.addAll(signatureMemberName);
            return allMemberNames;
        }

        static getSignaturesTypeNameEx(signatures: PullSignatureSymbol[],
            prefix: string,
            shortform: boolean,
            brackets: boolean,
            scopeSymbol?: PullSymbol,
            getPrettyTypeName?: boolean,
            candidateSignature?: PullSignatureSymbol) {

            var result: MemberName[] = [];
            if (!signatures) {
                return result;
            }

            var len = signatures.length;
            if (!getPrettyTypeName && len > 1) {
                shortform = false;
            }

            var foundDefinition = false;
            if (candidateSignature && candidateSignature.isDefinition() && len > 1) {
                // Overloaded signature with candidateSignature = definition - cannot be used.
                candidateSignature = null;
            }

            for (var i = 0; i < len; i++) {
                // the definition signature shouldn't be printed if there are overloads
                if (len > 1 && signatures[i].isDefinition()) {
                    foundDefinition = true;
                    continue;
                }

                var signature = signatures[i];
                if (getPrettyTypeName && candidateSignature) {
                    signature = candidateSignature;
                }

                result.push(signature.getSignatureTypeNameEx(prefix, shortform, brackets, scopeSymbol));
                if (getPrettyTypeName) {
                    break;
                }
            }

            if (getPrettyTypeName && result.length && len > 1) {
                var lastMemberName = <MemberNameArray>result[result.length - 1];
                for (var i = i + 1; i < len; i++) {
                    if (signatures[i].isDefinition()) {
                        foundDefinition = true;
                        break;
                    }
                }
                var overloadString = getLocalizedText(DiagnosticCode._0_overload_s, [foundDefinition ? len - 2 : len - 1]);
                lastMemberName.add(MemberName.create(overloadString));
            }

            return result;
        }

        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean) {
            var s = this.getSignatureTypeNameEx(this.getScopedNameEx().toString(), /*shortform*/ false, /*brackets*/ false, scopeSymbol, /*getParamMarkerInfo*/ undefined, useConstraintInName).toString();
            return s;
        }

        public getSignatureTypeNameEx(prefix: string, shortform: boolean, brackets: boolean, scopeSymbol?: PullSymbol, getParamMarkerInfo?: boolean, getTypeParamMarkerInfo?: boolean) {
            var typeParamterBuilder = new MemberNameArray();

            typeParamterBuilder.add(PullSymbol.getTypeParameterStringEx(
                this.getTypeParameters(), scopeSymbol, getTypeParamMarkerInfo, /*useConstraintInName*/true));

            if (brackets) {
                typeParamterBuilder.add(MemberName.create("["));
            }
            else {
                typeParamterBuilder.add(MemberName.create("("));
            }

            var builder = new MemberNameArray();
            builder.prefix = prefix;

            if (getTypeParamMarkerInfo) {
                builder.prefix = prefix;
                builder.addAll(typeParamterBuilder.entries);
            }
            else {
                builder.prefix = prefix + typeParamterBuilder.toString();
            }

            var params = this.parameters;
            var paramLen = params.length;
            for (var i = 0; i < paramLen; i++) {
                var paramType = params[i].type;
                var typeString = paramType ? ": " : "";
                var paramIsVarArg = params[i].isVarArg;
                var varArgPrefix = paramIsVarArg ? "..." : "";
                var optionalString = (!paramIsVarArg && params[i].isOptional) ? "?" : "";
                if (getParamMarkerInfo) {
                    builder.add(new MemberName());
                }
                builder.add(MemberName.create(varArgPrefix + params[i].getScopedNameEx(scopeSymbol).toString() + optionalString + typeString));
                if (paramType) {
                    builder.add(paramType.getScopedNameEx(scopeSymbol));
                }
                if (getParamMarkerInfo) {
                    builder.add(new MemberName());
                }
                if (i < paramLen - 1) {
                    builder.add(MemberName.create(", "));
                }
            }

            if (shortform) {
                if (brackets) {
                    builder.add(MemberName.create("] => "));
                }
                else {
                    builder.add(MemberName.create(") => "));
                }
            }
            else {
                if (brackets) {
                    builder.add(MemberName.create("]: "));
                }
                else {
                    builder.add(MemberName.create("): "));
                }
            }

            if (this.returnType) {
                builder.add(this.returnType.getScopedNameEx(scopeSymbol));
            }
            else {
                builder.add(MemberName.create("any"));
            }

            return builder;
        }

        public forAllParameterTypes(length: number, predicate: (parameterType: PullTypeSymbol, iterationIndex: number) => boolean): boolean {
            if (this.parameters.length < length && !this.hasVarArgs) {
                length = this.parameters.length;
            }

            for (var i = 0; i < length; i++) {
                var paramType = this.getParameterTypeAtIndex(i);
                if (!predicate(paramType, i)) {
                    return false;
                }
            }

            return true;
        }

        public forAllCorrespondingParameterTypesInThisAndOtherSignature(
            otherSignature: PullSignatureSymbol,
            predicate: (thisSignatureParameterType: PullTypeSymbol, otherSignatureParameterType: PullTypeSymbol, iterationIndex: number) => boolean): boolean {
            // First determine the length
            var length: number;
            if (this.hasVarArgs) {
                length = otherSignature.hasVarArgs
                    ? Math.max(this.parameters.length, otherSignature.parameters.length)
                    : otherSignature.parameters.length;
            }
            else {
                length = otherSignature.hasVarArgs
                    ? this.parameters.length
                    : Math.min(this.parameters.length, otherSignature.parameters.length);
            }

            for (var i = 0; i < length; i++) {
                // Finally, call the callback using the knowledge of whether each param is a rest param
                var thisParamType = this.getParameterTypeAtIndex(i);
                var otherParamType = otherSignature.getParameterTypeAtIndex(i);
                if (!predicate(thisParamType, otherParamType, i)) {
                    return false;
                }
            }

            return true;
        }

        public wrapsSomeTypeParameter(typeParameterArgumentMap: TypeArgumentMap): boolean {
            return this.getWrappingTypeParameterID(typeParameterArgumentMap) !== 0;
        }

        public getWrappingTypeParameterID(typeParameterArgumentMap: TypeArgumentMap): number {            var signature = this;
            if (signature.inWrapCheck) {
                return 0;
            }

            // Find result from cache
            this._wrapsTypeParameterCache = this._wrapsTypeParameterCache || new WrapsTypeParameterCache();
        
            var wrappingTypeParameterID = this._wrapsTypeParameterCache.getWrapsTypeParameter(typeParameterArgumentMap);
            if (wrappingTypeParameterID === undefined) {
                wrappingTypeParameterID = this.getWrappingTypeParameterIDWorker(typeParameterArgumentMap);
                this._wrapsTypeParameterCache.setWrapsTypeParameter(typeParameterArgumentMap, wrappingTypeParameterID);
            }
            return wrappingTypeParameterID;        }

        public getWrappingTypeParameterIDWorker(typeParameterArgumentMap: TypeArgumentMap): number {            var signature = this;
            signature.inWrapCheck = true;
            PullHelpers.resolveDeclaredSymbolToUseType(signature);
            var wrappingTypeParameterID = signature.returnType ? signature.returnType.getWrappingTypeParameterID(typeParameterArgumentMap) : 0;

            // Continue iterating over parameter types to find if they wrap type parameter,
            // only until we find the first wrapping Type parameter
            var parameters = signature.parameters;
            for (var i = 0; !wrappingTypeParameterID && i < parameters.length; i++) {
                PullHelpers.resolveDeclaredSymbolToUseType(parameters[i]);
                wrappingTypeParameterID = parameters[i].type.getWrappingTypeParameterID(typeParameterArgumentMap);
            }

            signature.inWrapCheck = false;

            return wrappingTypeParameterID;
        }

        public _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix) {
            var wrapsIntoInfinitelyExpandingTypeReference = knownWrapMap.valueAt(this.pullSymbolID, enclosingType.pullSymbolID);
            if (wrapsIntoInfinitelyExpandingTypeReference != undefined) {
                return wrapsIntoInfinitelyExpandingTypeReference;
            }

            if (this.inWrapInfiniteExpandingReferenceCheck) {
                return false;
            }

            this.inWrapInfiniteExpandingReferenceCheck = true;
            wrapsIntoInfinitelyExpandingTypeReference =
            this._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceWorker(enclosingType, knownWrapMap);
            knownWrapMap.setValueAt(this.pullSymbolID, enclosingType.pullSymbolID, wrapsIntoInfinitelyExpandingTypeReference);
            this.inWrapInfiniteExpandingReferenceCheck = false;

            return wrapsIntoInfinitelyExpandingTypeReference;
        }

        public _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceWorker(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix) {
            if (this.returnType &&
                this.returnType._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceRecurse(enclosingType, knownWrapMap)) {
                return true;
            }

            var parameters = this.parameters;

            for (var i = 0; i < parameters.length; i++) {
                if (parameters[i].type &&
                    parameters[i].type._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceRecurse(enclosingType, knownWrapMap)) {
                    return true;
                }
            }

            return false;
        }
    }

    export class PullTypeSymbol extends PullSymbol implements InstantiableSymbol {
        private _members: PullSymbol[] = sentinelEmptyArray;
        private _enclosedMemberTypes: PullTypeSymbol[] = null;
        private _enclosedMemberContainers: PullTypeSymbol[] = null;
        private _typeParameters: PullTypeParameterSymbol[] = null;
        private _allowedToReferenceTypeParameters: PullTypeParameterSymbol[] = null;

        private _specializedVersionsOfThisType: PullTypeSymbol[] = null;
        private _arrayVersionOfThisType: PullTypeSymbol = null;

        private _implementedTypes: PullTypeSymbol[] = null;
        private _extendedTypes: PullTypeSymbol[] = null;

        private _typesThatExplicitlyImplementThisType: PullTypeSymbol[] = null;
        private _typesThatExtendThisType: PullTypeSymbol[] = null;

        private _callSignatures: PullSignatureSymbol[] = null;
        private _allCallSignatures: PullSignatureSymbol[] = null;
        private _constructSignatures: PullSignatureSymbol[] = null;
        private _allConstructSignatures: PullSignatureSymbol[] = null;
        private _indexSignatures: PullSignatureSymbol[] = null;
        private _allIndexSignatures: PullSignatureSymbol[] = null;
        private _allIndexSignaturesOfAugmentedType: PullSignatureSymbol[] = null;

        private _memberNameCache: IIndexable<PullSymbol> = null;
        private _enclosedTypeNameCache: IIndexable<PullTypeSymbol> = null;
        private _enclosedContainerCache: IIndexable<PullTypeSymbol> = null;
        private _typeParameterNameCache: IIndexable<PullTypeParameterSymbol> = null;
        private _containedNonMemberNameCache: IIndexable<PullSymbol> = null;
        private _containedNonMemberTypeNameCache: IIndexable<PullTypeSymbol> = null;
        private _containedNonMemberContainerCache: IIndexable<PullTypeSymbol> = null;

        // The instanatiation cache we use when we are instantiating this type with a single 
        // non-object type.
        private _simpleInstantiationCache: PullTypeSymbol[] = null;

        // The instantiation cache we use in all other circumstances.  i.e. instantiating with
        // multiple types, or instantiating with object types.
        private _complexInstantiationCache: IIndexable<PullTypeSymbol> = null;


        // GTODO
        private _hasGenericSignature = false;
        private _hasGenericMember = false;

        private _hasBaseTypeConflict = false;

        private _knownBaseTypeCount = 0;

        private _associatedContainerTypeSymbol: PullTypeSymbol = null;

        private _constructorMethod: PullSymbol = null;
        private _hasDefaultConstructor = false;

        // TODO: Really only used to track doc comments...
        private _functionSymbol: PullSymbol = null;
        private _inMemberTypeNameEx = false;

        public inSymbolPrivacyCheck = false;
        public inWrapCheck = false;
        public inWrapInfiniteExpandingReferenceCheck = false;

        public typeReference: PullTypeReferenceSymbol = null;

        private _widenedType: PullTypeSymbol = null;

        private _wrapsTypeParameterCache: WrapsTypeParameterCache;

        constructor(name: string, kind: PullElementKind) {
            super(name, kind);
            this.type = this;
        }

        // Returns true if this is type reference to Array<T>.  Note that because this is a type
        // reference, it will have type arguments, not type parameters.
        private _isArrayNamedTypeReference: boolean = undefined;
        public isArrayNamedTypeReference() {
            if (this._isArrayNamedTypeReference === undefined) {
                this._isArrayNamedTypeReference = this.computeIsArrayNamedTypeReference();
            }

            return this._isArrayNamedTypeReference;
        }

        private computeIsArrayNamedTypeReference(): boolean {
            var typeArgs = this.getTypeArguments()
            if (typeArgs && this.getTypeArguments().length === 1 &&
                this.name === "Array") {

                var declaration = this.getDeclarations()[0];

                // If we're a child of the global module (i.e. we have a parent decl, but our 
                // parent has no parent), then we're the Array<T> type.
                if (declaration &&
                    declaration.getParentDecl() &&
                    declaration.getParentDecl().getParentDecl() === null) {

                    return true;
                }
            }

            return false;
        }

        public isType() { return true; }
        public isClass() {
            return this.kind === PullElementKind.Class || (this._constructorMethod !== null);
        }
        public isFunction() { return (this.kind & (PullElementKind.ConstructorType | PullElementKind.FunctionType)) !== 0; }
        public isConstructor() {
            return this.kind === PullElementKind.ConstructorType ||
                (this._associatedContainerTypeSymbol && this._associatedContainerTypeSymbol.isClass());
        }
        public isTypeParameter() { return false; }
        public isTypeVariable() { return false; }
        public isError() { return false; }
        public isEnum() { return this.kind === PullElementKind.Enum; }

        public getTypeParameterArgumentMap(): TypeArgumentMap {
            return null;
        }

        public isObject(): boolean {
            return hasFlag(this.kind,
                PullElementKind.Class | PullElementKind.ConstructorType | PullElementKind.Enum | PullElementKind.FunctionType |
                PullElementKind.Interface | PullElementKind.ObjectType | PullElementKind.ObjectLiteral);
        }

        public isFunctionType(): boolean {
            return this.getCallSignatures().length > 0 || this.getConstructSignatures().length > 0;
        }

        public getKnownBaseTypeCount() { return this._knownBaseTypeCount; }
        public resetKnownBaseTypeCount() { this._knownBaseTypeCount = 0; }
        public incrementKnownBaseCount() { this._knownBaseTypeCount++; }

        public setHasBaseTypeConflict(): void {
            this._hasBaseTypeConflict = true;
        }
        public hasBaseTypeConflict(): boolean {
            return this._hasBaseTypeConflict;
        }

        public hasMembers(): boolean {

            if (this._members !== sentinelEmptyArray) {
                return true;
            }

            var parents = this.getExtendedTypes();

            for (var i = 0; i < parents.length; i++) {
                if (parents[i].hasMembers()) {
                    return true;
                }
            }

            return false;
        }

        // GTODO
        public setHasGenericSignature() { this._hasGenericSignature = true; }
        public getHasGenericSignature() { return this._hasGenericSignature; }

        // GTODO
        public setHasGenericMember() { this._hasGenericMember = true; }
        public getHasGenericMember() { return this._hasGenericMember; }

        public setAssociatedContainerType(type: PullTypeSymbol): void {
            this._associatedContainerTypeSymbol = type;
        }

        public getAssociatedContainerType(): PullTypeSymbol {
            return this._associatedContainerTypeSymbol;
        }

        // REVIEW
        public getArrayType(): PullTypeSymbol { return this._arrayVersionOfThisType; }

        public getElementType(): PullTypeSymbol {
            return null;
        }

        public setArrayType(arrayType: PullTypeSymbol) {
            this._arrayVersionOfThisType = arrayType;
        }

        public getFunctionSymbol(): PullSymbol {
            return this._functionSymbol;
        }

        public setFunctionSymbol(symbol: PullSymbol): void {
            if (symbol) {
                this._functionSymbol = symbol;
            }
        }

        // TODO: This seems to conflate exposed members with private non-Members
        public findContainedNonMember(name: string): PullSymbol {
            if (!this._containedNonMemberNameCache) {
                return null;
            }

            return this._containedNonMemberNameCache[name];
        }

        public findContainedNonMemberType(typeName: string, kind = PullElementKind.None): PullTypeSymbol {
            if (!this._containedNonMemberTypeNameCache) {
                return null;
            }

            var nonMemberSymbol = this._containedNonMemberTypeNameCache[typeName];

            if (nonMemberSymbol && kind !== PullElementKind.None) {
                nonMemberSymbol = hasFlag(nonMemberSymbol.kind, kind) ? nonMemberSymbol : null;
            }

            return nonMemberSymbol;
        }

        public findContainedNonMemberContainer(containerName: string, kind = PullElementKind.None): PullTypeSymbol {
            if (!this._containedNonMemberContainerCache) {
                return null;
            }

            var nonMemberSymbol = this._containedNonMemberContainerCache[containerName];

            if (nonMemberSymbol && kind !== PullElementKind.None) {
                nonMemberSymbol = hasFlag(nonMemberSymbol.kind, kind) ? nonMemberSymbol : null;
            }

            return nonMemberSymbol;
        }

        public addMember(memberSymbol: PullSymbol): void {
            if (!memberSymbol) {
                return;
            }

            memberSymbol.setContainer(this);

            if (!this._memberNameCache) {
                this._memberNameCache = createIntrinsicsObject<PullSymbol>();
            }

            if (this._members === sentinelEmptyArray) {
                this._members = [];
            }

            this._members.push(memberSymbol);
            this._memberNameCache[memberSymbol.name] = memberSymbol;
        }

        public addEnclosedMemberType(enclosedType: PullTypeSymbol): void {

            if (!enclosedType) {
                return;
            }

            enclosedType.setContainer(this);

            if (!this._enclosedTypeNameCache) {
                this._enclosedTypeNameCache = createIntrinsicsObject<PullTypeSymbol>();
            }

            if (!this._enclosedMemberTypes) {
                this._enclosedMemberTypes = [];
            }

            this._enclosedMemberTypes[this._enclosedMemberTypes.length] = enclosedType;
            this._enclosedTypeNameCache[enclosedType.name] = enclosedType;
        }

        public addEnclosedMemberContainer(enclosedContainer: PullTypeSymbol): void {

            if (!enclosedContainer) {
                return;
            }

            enclosedContainer.setContainer(this);

            if (!this._enclosedContainerCache) {
                this._enclosedContainerCache = createIntrinsicsObject<PullTypeSymbol>();
            }

            if (!this._enclosedMemberContainers) {
                this._enclosedMemberContainers = [];
            }

            this._enclosedMemberContainers[this._enclosedMemberContainers.length] = enclosedContainer;
            this._enclosedContainerCache[enclosedContainer.name] = enclosedContainer;
        }

        public addEnclosedNonMember(enclosedNonMember: PullSymbol): void {

            if (!enclosedNonMember) {
                return;
            }

            enclosedNonMember.setContainer(this);

            if (!this._containedNonMemberNameCache) {
                this._containedNonMemberNameCache = createIntrinsicsObject<PullSymbol>();
            }

            this._containedNonMemberNameCache[enclosedNonMember.name] = enclosedNonMember;
        }

        public addEnclosedNonMemberType(enclosedNonMemberType: PullTypeSymbol): void {

            if (!enclosedNonMemberType) {
                return;
            }

            enclosedNonMemberType.setContainer(this);

            if (!this._containedNonMemberTypeNameCache) {
                this._containedNonMemberTypeNameCache = createIntrinsicsObject<PullTypeSymbol>();
            }

            this._containedNonMemberTypeNameCache[enclosedNonMemberType.name] = enclosedNonMemberType;
        }

        public addEnclosedNonMemberContainer(enclosedNonMemberContainer: PullTypeSymbol): void {

            if (!enclosedNonMemberContainer) {
                return;
            }

            enclosedNonMemberContainer.setContainer(this);

            if (!this._containedNonMemberContainerCache) {
                this._containedNonMemberContainerCache = createIntrinsicsObject<PullTypeSymbol>();
            }

            this._containedNonMemberContainerCache[enclosedNonMemberContainer.name] = enclosedNonMemberContainer;
        }

        public addTypeParameter(typeParameter: PullTypeParameterSymbol): void {
            if (!typeParameter) {
                return;
            }

            if (!typeParameter.getContainer()) {
                typeParameter.setContainer(this);
            }

            if (!this._typeParameterNameCache) {
                this._typeParameterNameCache = createIntrinsicsObject<PullTypeParameterSymbol>();
            }

            if (!this._typeParameters) {
                this._typeParameters = [];
            }

            this._typeParameters[this._typeParameters.length] = typeParameter;
            this._typeParameterNameCache[typeParameter.getName()] = typeParameter;
        }

        public getMembers(): PullSymbol[] {
            return this._members;
        }

        public setHasDefaultConstructor(hasOne= true): void {
            this._hasDefaultConstructor = hasOne;
        }

        public getHasDefaultConstructor(): boolean {
            return this._hasDefaultConstructor;
        }

        public getConstructorMethod(): PullSymbol {
            return this._constructorMethod;
        }

        public setConstructorMethod(constructorMethod: PullSymbol): void {
            this._constructorMethod = constructorMethod;
        }

        public getTypeParameters(): PullTypeParameterSymbol[] {
            if (!this._typeParameters) {
                return sentinelEmptyArray;
            }

            return this._typeParameters;
        }

        public getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[] {
            if (!!(this.kind && PullElementKind.SomeInstantiatableType) && this.isNamedTypeSymbol() && !this.isTypeParameter()) {
                return this.getTypeParameters();
            }

            if (!this._allowedToReferenceTypeParameters) {
                // If the type is not named, it cannot have its own type parameters
                // But it can refer to typeParameters from enclosing type
                this._allowedToReferenceTypeParameters = PullInstantiationHelpers.getAllowedToReferenceTypeParametersFromDecl(this.getDeclarations()[0]);
            }

            return this._allowedToReferenceTypeParameters;
        }

        // GTODO
        public isGeneric(): boolean {
            return (this._typeParameters && this._typeParameters.length > 0) ||
                this._hasGenericSignature ||
                this._hasGenericMember ||
                this.isArrayNamedTypeReference();
        }

        private canUseSimpleInstantiationCache(typeArgumentMap: TypeArgumentMap): boolean {
            if (this.isTypeParameter()) {
                return true;
            }

            var typeParameters = this.getTypeParameters();
            return typeArgumentMap && this.isNamedTypeSymbol() && typeParameters.length === 1 && typeArgumentMap[typeParameters[0].pullSymbolID].kind !== PullElementKind.ObjectType;
        }

        private getSimpleInstantiationCacheId(typeArgumentMap: TypeArgumentMap) {
            if (this.isTypeParameter()) {
                return typeArgumentMap[0].pullSymbolID;
            }

            return typeArgumentMap[this.getTypeParameters()[0].pullSymbolID].pullSymbolID;
        }

        public addSpecialization(specializedVersionOfThisType: PullTypeSymbol, typeArgumentMap: TypeArgumentMap): void {
            if (this.canUseSimpleInstantiationCache(typeArgumentMap)) {
                if (!this._simpleInstantiationCache) {
                    this._simpleInstantiationCache = [];
                }

                this._simpleInstantiationCache[this.getSimpleInstantiationCacheId(typeArgumentMap)] = specializedVersionOfThisType;
            }
            else {
                if (!this._complexInstantiationCache) {
                    this._complexInstantiationCache = createIntrinsicsObject<PullTypeSymbol>();
                }

                this._complexInstantiationCache[getIDForTypeSubstitutions(this, typeArgumentMap)] = specializedVersionOfThisType;
            }

            if (!this._specializedVersionsOfThisType) {
                this._specializedVersionsOfThisType = [];
            }

            this._specializedVersionsOfThisType.push(specializedVersionOfThisType);
        }

        public getSpecialization(typeArgumentMap: TypeArgumentMap): PullTypeSymbol {
            if (this.canUseSimpleInstantiationCache(typeArgumentMap)) {
                if (!this._simpleInstantiationCache) {
                    return null;
                }

                var result = this._simpleInstantiationCache[this.getSimpleInstantiationCacheId(typeArgumentMap)];
                return result || null;
            }
            else {
                if (!this._complexInstantiationCache) {
                    return null;
                }

                if (this.getAllowedToReferenceTypeParameters().length == 0) {
                    return this;
                }

                var result = this._complexInstantiationCache[getIDForTypeSubstitutions(this, typeArgumentMap)];
                return result || null;
            }
        }

        public getKnownSpecializations(): PullTypeSymbol[] {
            if (!this._specializedVersionsOfThisType) {
                return sentinelEmptyArray;
            }

            return this._specializedVersionsOfThisType;
        }

        // GTODO
        public getTypeArguments(): PullTypeSymbol[] {
            return null;
        }

        public getTypeArgumentsOrTypeParameters(): PullTypeSymbol[] {
            return this.getTypeParameters();
        }

        private addCallOrConstructSignaturePrerequisiteBase(signature: PullSignatureSymbol): void {
            if (signature.isGeneric()) {
                this._hasGenericSignature = true;
            }

            signature.functionType = this;
        }

        private addCallSignaturePrerequisite(callSignature: PullSignatureSymbol): void {
            if (!this._callSignatures) {
                this._callSignatures = [];
            }

            this.addCallOrConstructSignaturePrerequisiteBase(callSignature);
        }

        public appendCallSignature(callSignature: PullSignatureSymbol): void {
            this.addCallSignaturePrerequisite(callSignature);
            this._callSignatures.push(callSignature);
        }

        public insertCallSignatureAtIndex(callSignature: PullSignatureSymbol, index: number): void {
            this.addCallSignaturePrerequisite(callSignature);
            Debug.assert(index <= this._callSignatures.length);
            if (index === this._callSignatures.length) {
                this._callSignatures.push(callSignature);
            }
            else {
                this._callSignatures.splice(index, /*deleteCount*/ 0, callSignature);
            }
        }

        private addConstructSignaturePrerequisite(constructSignature: PullSignatureSymbol): void {
            if (!this._constructSignatures) {
                this._constructSignatures = [];
            }

            this.addCallOrConstructSignaturePrerequisiteBase(constructSignature);
        }

        public appendConstructSignature(constructSignature: PullSignatureSymbol): void {
            this.addConstructSignaturePrerequisite(constructSignature);
            this._constructSignatures.push(constructSignature);
        }

        public insertConstructSignatureAtIndex(constructSignature: PullSignatureSymbol, index: number): void {
            this.addConstructSignaturePrerequisite(constructSignature);
            Debug.assert(index <= this._constructSignatures.length);
            if (index === this._constructSignatures.length) {
                this._constructSignatures.push(constructSignature);
            }
            else {
                this._constructSignatures.splice(index, /*deleteCount*/ 0, constructSignature);
            }
        }

        public addIndexSignature(indexSignature: PullSignatureSymbol): void {
            if (!this._indexSignatures) {
                this._indexSignatures = [];
            }

            this._indexSignatures[this._indexSignatures.length] = indexSignature;

            if (indexSignature.isGeneric()) {
                this._hasGenericSignature = true;
            }

            indexSignature.functionType = this;
        }

        public hasOwnCallSignatures(): boolean {
            return this._callSignatures !== null;
        }

        public getOwnCallSignatures(): PullSignatureSymbol[] {
            return this._callSignatures || sentinelEmptyArray;
        }

        public getCallSignatures(): PullSignatureSymbol[] {
            if (this._allCallSignatures) {
                return this._allCallSignatures;
            }

            var signatures: PullSignatureSymbol[] = [];

            if (this._callSignatures) {
                signatures = signatures.concat(this._callSignatures);
            }

            // Check for inherited call signatures
            // Only interfaces can inherit call signatures
            if (this._extendedTypes && this.kind === PullElementKind.Interface) {
                for (var i = 0; i < this._extendedTypes.length; i++) {
                    if (this._extendedTypes[i].hasBase(this)) {
                        continue;
                    }

                    // October 16, 2013: Section 7.1:
                    // A call signature declaration hides a base type call signature that is
                    // identical when return types are ignored.
                    this._getResolver()._addUnhiddenSignaturesFromBaseType(this._callSignatures, this._extendedTypes[i].getCallSignatures(), signatures);
                }
            }

            this._allCallSignatures = signatures;

            return signatures;
        }

        public hasOwnConstructSignatures(): boolean {
            return this._constructSignatures !== null;
        }

        public getOwnDeclaredConstructSignatures(): PullSignatureSymbol[] {
            return this._constructSignatures || sentinelEmptyArray;
        }

        public getConstructSignatures(): PullSignatureSymbol[]{
            if (this._allConstructSignatures) {
                return this._allConstructSignatures;
            }

            var signatures: PullSignatureSymbol[] = [];

            if (this._constructSignatures) {
                signatures = signatures.concat(this._constructSignatures);
            }
            else if (this.isConstructor()) {
                if (this._extendedTypes && this._extendedTypes.length > 0) {
                    signatures = this.getBaseClassConstructSignatures(this._extendedTypes[0]);
                }
                else {
                    signatures = [this.getDefaultClassConstructSignature()];
                }
            }

            // If it's a constructor type, we don't inherit construct signatures
            // (E.g., we'd be looking at the statics on a class, where we want
            // to inherit members, but not construct signatures
            if (this._extendedTypes && this.kind === PullElementKind.Interface) {
                for (var i = 0; i < this._extendedTypes.length; i++) {
                    if (this._extendedTypes[i].hasBase(this)) {
                        continue;
                    }

                    // October 16, 2013: Section 7.1:
                    // A construct signature declaration hides a base type construct signature that is
                    // identical when return types are ignored.
                    this._getResolver()._addUnhiddenSignaturesFromBaseType(this._constructSignatures, this._extendedTypes[i].getConstructSignatures(), signatures);
                }
            }

            this._allConstructSignatures = signatures;

            return signatures;
        }

        public hasOwnIndexSignatures(): boolean {
            return this._indexSignatures !== null;
        }

        public getOwnIndexSignatures(): PullSignatureSymbol[] {
            return this._indexSignatures || sentinelEmptyArray;
        }

        public getIndexSignatures(): PullSignatureSymbol[] {
            if (this._allIndexSignatures) {
                return this._allIndexSignatures;
            }

            var signatures: PullSignatureSymbol[] = [];

            if (this._indexSignatures) {
                signatures = signatures.concat(this._indexSignatures);
            }

            if (this._extendedTypes) {
                for (var i = 0; i < this._extendedTypes.length; i++) {
                    if (this._extendedTypes[i].hasBase(this)) {
                        continue;
                    }

                    // October 16, 2013: Section 7.1:
                    // A string index signature declaration hides a base type string index signature.
                    // A numeric index signature declaration hides a base type numeric index signature.
                    this._getResolver()._addUnhiddenSignaturesFromBaseType(this._indexSignatures, this._extendedTypes[i].getIndexSignatures(), signatures);
                }
            }

            this._allIndexSignatures = signatures;

            return signatures;
        }

        // The augmented form of an object type T adds to T those members of the global interface
        // type 'Object' that aren't hidden by members in T. Furthermore, if T has one or more call
        // or construct signatures, the augmented form of T adds to T the members of the global 
        // interface type 'Function' that aren't hidden by members in T. Members in T hide 'Object'
        // or 'Function' interface members in the following manner:
        // ...
        // An index signature hides an 'Object' or 'Function' index signature with the same parameter type.
        public getIndexSignaturesOfAugmentedType(resolver: PullTypeResolver, globalFunctionInterface: PullTypeSymbol, globalObjectInterface: PullTypeSymbol): PullSignatureSymbol[] {
            if (!this._allIndexSignaturesOfAugmentedType) {
                // Start with the types own and inherited index signatures
                var initialIndexSignatures = this.getIndexSignatures();
                var shouldAddFunctionSignatures = false;
                var shouldAddObjectSignatures = false;

                if (globalFunctionInterface && this.isFunctionType() && this !== globalFunctionInterface) {
                    var functionIndexSignatures = globalFunctionInterface.getIndexSignatures();
                    if (functionIndexSignatures.length) {
                        shouldAddFunctionSignatures = true;
                    }
                }

                if (globalObjectInterface && this !== globalObjectInterface) {
                    var objectIndexSignatures = globalObjectInterface.getIndexSignatures();
                    if (objectIndexSignatures.length) {
                        shouldAddObjectSignatures = true;
                    }
                }

                // The 'then' block of this conditional should almost never be entered, since
                // Object and Function in lib.d.ts have no index signatures. This could only
                // happen if the user has added index signatures to Object or Function.
                if (shouldAddFunctionSignatures || shouldAddObjectSignatures) {
                    // First, copy the existing signatures into a new array
                    // .slice(0) is an idiom for copying
                    this._allIndexSignaturesOfAugmentedType = initialIndexSignatures.slice(0);
                    if (shouldAddFunctionSignatures) {
                        // The following call mutates this._allIndexSignaturesOfAugmentedType
                        resolver._addUnhiddenSignaturesFromBaseType(initialIndexSignatures, functionIndexSignatures, this._allIndexSignaturesOfAugmentedType);
                    }
                    if (shouldAddObjectSignatures) {
                        if (shouldAddFunctionSignatures) {
                            // Concat function index signatures to make sure we don't add object signatures
                            // hidden by function signatures.
                            initialIndexSignatures = initialIndexSignatures.concat(functionIndexSignatures);
                        }
                        resolver._addUnhiddenSignaturesFromBaseType(initialIndexSignatures, objectIndexSignatures, this._allIndexSignaturesOfAugmentedType);
                    }
                }
                else {
                    this._allIndexSignaturesOfAugmentedType = initialIndexSignatures;
                }
            }

            return this._allIndexSignaturesOfAugmentedType;
        }

        private getBaseClassConstructSignatures(baseType: PullTypeSymbol): PullSignatureSymbol[] {
            Debug.assert(this.isConstructor() && baseType.isConstructor());
            var instanceTypeSymbol = this.getAssociatedContainerType();
            Debug.assert(instanceTypeSymbol.getDeclarations().length === 1);
            if (baseType.hasBase(this)) {
                return null;
            }

            var baseConstructSignatures = baseType.getConstructSignatures();
            var signatures: PullSignatureSymbol[] = [];
            for (var i = 0; i < baseConstructSignatures.length; i++) {
                var baseSignature = baseConstructSignatures[i];
                // Make sure the base signature is resolved, so that the parameter symbols from the new 
                // siganture are used, they will have the type associated with them. 
                baseSignature._resolveDeclaredSymbol();
                var currentSignature = new PullSignatureSymbol(PullElementKind.ConstructSignature, baseSignature.isDefinition());
                currentSignature.returnType = instanceTypeSymbol;
                currentSignature.addTypeParametersFromReturnType();
                for (var j = 0; j < baseSignature.parameters.length; j++) {
                    currentSignature.addParameter(baseSignature.parameters[j], baseSignature.parameters[j].isOptional);
                }
                if (baseSignature.parameters.length > 0) {
                    currentSignature.hasVarArgs = baseSignature.parameters[baseSignature.parameters.length - 1].isVarArg;
                }

                // Assume the class has only one decl, since it can't mix with anything
                currentSignature.addDeclaration(instanceTypeSymbol.getDeclarations()[0]);
                this.addCallOrConstructSignaturePrerequisiteBase(currentSignature);
                signatures.push(currentSignature);
            }

            return signatures;
        }

        private getDefaultClassConstructSignature(): PullSignatureSymbol {
            Debug.assert(this.isConstructor());
            var instanceTypeSymbol = this.getAssociatedContainerType();
            Debug.assert(instanceTypeSymbol.getDeclarations().length == 1);
            var signature = new PullSignatureSymbol(PullElementKind.ConstructSignature, /*isDefinition*/ true);
            signature.returnType = instanceTypeSymbol;
            signature.addTypeParametersFromReturnType();
            signature.addDeclaration(instanceTypeSymbol.getDeclarations()[0]);
            this.addCallOrConstructSignaturePrerequisiteBase(signature);

            return signature;
        }

        public addImplementedType(implementedType: PullTypeSymbol): void {
            if (!implementedType) {
                return;
            }

            if (!this._implementedTypes) {
                this._implementedTypes = [];
            }

            this._implementedTypes[this._implementedTypes.length] = implementedType;

            implementedType.addTypeThatExplicitlyImplementsThisType(this);
        }

        public getImplementedTypes(): PullTypeSymbol[] {
            if (!this._implementedTypes) {
                return sentinelEmptyArray;
            }

            return this._implementedTypes;
        }

        public addExtendedType(extendedType: PullTypeSymbol): void {
            if (!extendedType) {
                return;
            }

            if (!this._extendedTypes) {
                this._extendedTypes = [];
            }

            this._extendedTypes[this._extendedTypes.length] = extendedType;

            extendedType.addTypeThatExtendsThisType(this);
        }

        public getExtendedTypes(): PullTypeSymbol[] {
            if (!this._extendedTypes) {
                return sentinelEmptyArray;
            }

            return this._extendedTypes;
        }

        public addTypeThatExtendsThisType(type: PullTypeSymbol): void {
            if (!type) {
                return;
            }

            if (!this._typesThatExtendThisType) {
                this._typesThatExtendThisType = [];
            }

            this._typesThatExtendThisType[this._typesThatExtendThisType.length] = type;
        }

        public getTypesThatExtendThisType(): PullTypeSymbol[] {
            if (!this._typesThatExtendThisType) {
                this._typesThatExtendThisType = [];
            }

            return this._typesThatExtendThisType;
        }

        public addTypeThatExplicitlyImplementsThisType(type: PullTypeSymbol): void {
            if (!type) {
                return;
            }

            if (!this._typesThatExplicitlyImplementThisType) {
                this._typesThatExplicitlyImplementThisType = [];
            }

            this._typesThatExplicitlyImplementThisType[this._typesThatExplicitlyImplementThisType.length] = type;
        }

        public getTypesThatExplicitlyImplementThisType(): PullTypeSymbol[] {
            if (!this._typesThatExplicitlyImplementThisType) {
                this._typesThatExplicitlyImplementThisType = [];
            }

            return this._typesThatExplicitlyImplementThisType;
        }

        public hasBase(potentialBase: PullTypeSymbol, visited: PullSymbol[]= []): boolean {
            // Check if this is the potential base:
            //      A extends A  => this === potentialBase
            //      A<T> extends A<T>  => this.getRootSymbol() === potentialBase
            //      A<T> extends A<string> => this === potentialBase.getRootSymbol()
            if (this === potentialBase || this.getRootSymbol() === potentialBase || this === potentialBase.getRootSymbol()) {
                return true;
            }

            if (ArrayUtilities.contains(visited, this)) {
                return true;
            }

            visited.push(this);

            var extendedTypes = this.getExtendedTypes();

            for (var i = 0; i < extendedTypes.length; i++) {
                if (extendedTypes[i].hasBase(potentialBase, visited)) {
                    return true;
                }
            }

            var implementedTypes = this.getImplementedTypes();

            for (var i = 0; i < implementedTypes.length; i++) {
                if (implementedTypes[i].hasBase(potentialBase, visited)) {
                    return true;
                }
            }

            // Clean the list if we are returning false to ensure we are not leaving symbols that 
            // were not in the path. No need to do that if we return true, as that will short circuit
            // the search
            visited.pop();

            return false;
        }

        public isValidBaseKind(baseType: PullTypeSymbol, isExtendedType: boolean): boolean {
            // Error type symbol is invalid base kind
            if (baseType.isError()) {
                return false;
            }

            var thisIsClass = this.isClass();
            if (isExtendedType) {
                if (thisIsClass) {
                    // Class extending non class Type is invalid
                    return baseType.kind === PullElementKind.Class;
                }
            }
            else {
                if (!thisIsClass) {
                    // Interface implementing baseType is invalid
                    return false;
                }
            }

            // Interface extending non interface or class 
            // or class implementing non interface or class - are invalid
            return !!(baseType.kind & (PullElementKind.Interface | PullElementKind.Class));
        }

        public findMember(name: string, lookInParent: boolean): PullSymbol {
            var memberSymbol: PullSymbol = null;

            if (this._memberNameCache) {
                memberSymbol = this._memberNameCache[name];
            }

            if (memberSymbol || !lookInParent) {
                return memberSymbol;
            }

            // check parents
            if (this._extendedTypes) {

                for (var i = 0; i < this._extendedTypes.length; i++) {
                    memberSymbol = this._extendedTypes[i].findMember(name, lookInParent);

                    if (memberSymbol) {
                        return memberSymbol;
                    }
                }
            }

            return null;
        }

        public findNestedType(name: string, kind = PullElementKind.None): PullTypeSymbol {
            var memberSymbol: PullTypeSymbol;

            if (!this._enclosedTypeNameCache) {
                return null;
            }

            memberSymbol = this._enclosedTypeNameCache[name];

            if (memberSymbol && kind !== PullElementKind.None) {
                memberSymbol = hasFlag(memberSymbol.kind, kind) ? memberSymbol : null;
            }

            return memberSymbol;
        }

        public findNestedContainer(name: string, kind = PullElementKind.None): PullTypeSymbol {
            var memberSymbol: PullTypeSymbol;

            if (!this._enclosedContainerCache) {
                return null;
            }

            memberSymbol = this._enclosedContainerCache[name];

            if (memberSymbol && kind !== PullElementKind.None) {
                memberSymbol = hasFlag(memberSymbol.kind, kind) ? memberSymbol : null;
            }

            return memberSymbol;
        }

        public getAllMembers(searchDeclKind: PullElementKind, memberVisiblity: GetAllMembersVisiblity): PullSymbol[] {

            var allMembers: PullSymbol[] = [];

            // Add members
            if (this._members !== sentinelEmptyArray) {

                for (var i = 0, n = this._members.length; i < n; i++) {
                    var member = this._members[i];
                    if ((member.kind & searchDeclKind) && (memberVisiblity !== GetAllMembersVisiblity.externallyVisible || !member.anyDeclHasFlag(PullElementFlags.Private))) {
                        allMembers[allMembers.length] = member;
                    }
                }
            }

            // Add parent members
            if (this._extendedTypes) {
                // Do not look for the parent's private members unless we need to enumerate all members
                var extenedMembersVisibility = memberVisiblity !== GetAllMembersVisiblity.all ? GetAllMembersVisiblity.externallyVisible : GetAllMembersVisiblity.all;

                for (var i = 0, n = this._extendedTypes.length; i < n; i++) {
                    var extendedMembers = this._extendedTypes[i].getAllMembers(searchDeclKind, /*memberVisiblity*/ extenedMembersVisibility);

                    for (var j = 0, m = extendedMembers.length; j < m; j++) {
                        var extendedMember = extendedMembers[j];
                        if (!(this._memberNameCache && this._memberNameCache[extendedMember.name])) {
                            allMembers[allMembers.length] = extendedMember;
                        }
                    }
                }
            }

            if (this.isContainer()) {
                if (this._enclosedMemberTypes) {
                    for (var i = 0; i < this._enclosedMemberTypes.length; i++) {
                        allMembers[allMembers.length] = this._enclosedMemberTypes[i];
                    }
                }
                if (this._enclosedMemberContainers) {
                    for (var i = 0; i < this._enclosedMemberContainers.length; i++) {
                        allMembers[allMembers.length] = this._enclosedMemberContainers[i];
                    }
                }
            }

            return allMembers;
        }

        public findTypeParameter(name: string): PullTypeParameterSymbol {
            if (!this._typeParameterNameCache) {
                return null;
            }

            return this._typeParameterNameCache[name];
        }

        public setResolved(): void {
            super.setResolved();
        }

        public getNamePartForFullName(): string {
            var name = super.getNamePartForFullName();

            var typars = this.getTypeArgumentsOrTypeParameters();
            var typarString = PullSymbol.getTypeParameterString(typars, this, /*useConstraintInName:*/ true);
            return name + typarString;
        }

        public getScopedName(scopeSymbol?: PullSymbol, skipTypeParametersInName?: boolean, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string {
            return this.getScopedNameEx(scopeSymbol, skipTypeParametersInName, useConstraintInName, /*getPrettyTypeName*/ false, /*getTypeParamMarkerInfskipInternalAliasName*/ false, skipInternalAliasName).toString();
        }

        public isNamedTypeSymbol(): boolean {
            var kind = this.kind;
            if (kind === PullElementKind.Primitive || // primitives
                kind === PullElementKind.Class || // class
                kind === PullElementKind.Container || // module
                kind === PullElementKind.DynamicModule || // dynamic module
                kind === PullElementKind.TypeAlias || // dynamic module
                kind === PullElementKind.Enum || // enum
                kind === PullElementKind.TypeParameter || //TypeParameter
                ((kind === PullElementKind.Interface || kind === PullElementKind.ObjectType) && this.name !== "")) {
                return true;
            }

            return false;
        }

        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string {
            var s = this.getScopedNameEx(scopeSymbol, /*skipTypeParametersInName*/ false, useConstraintInName).toString();
            return s;
        }

        public getScopedNameEx(
            scopeSymbol?: PullSymbol,
            skipTypeParametersInName?: boolean,
            useConstraintInName?: boolean,
            getPrettyTypeName?: boolean,
            getTypeParamMarkerInfo?: boolean,
            skipInternalAliasName?: boolean,
            shouldAllowArrayType: boolean = true): MemberName {

            if (this.isArrayNamedTypeReference() && shouldAllowArrayType) {
                var elementType = this.getElementType();
                var elementMemberName = elementType ?
                    (elementType.isArrayNamedTypeReference() || elementType.isNamedTypeSymbol() ?
                    elementType.getScopedNameEx(
                        scopeSymbol,
                        /*skipTypeParametersInName*/ false,
                        /*useConstraintInName*/ false,
                        getPrettyTypeName,
                        getTypeParamMarkerInfo,
                        skipInternalAliasName) :
                    elementType.getMemberTypeNameEx(/*topLevel*/ false, scopeSymbol, getPrettyTypeName)) :
                    MemberName.create("any");
                return MemberName.create(elementMemberName, "", "[]");
            }

            if (!this.isNamedTypeSymbol()) {
                return this.getMemberTypeNameEx(/*topLevel*/ true, scopeSymbol, getPrettyTypeName);
            }

            if (skipTypeParametersInName) {
                return MemberName.create(super.getScopedName(scopeSymbol, skipTypeParametersInName, useConstraintInName, skipInternalAliasName));
            }
            else {
                var builder = new MemberNameArray();
                builder.prefix = super.getScopedName(scopeSymbol, skipTypeParametersInName, useConstraintInName, skipInternalAliasName);

                var typars = this.getTypeArgumentsOrTypeParameters();
                builder.add(PullSymbol.getTypeParameterStringEx(typars, scopeSymbol, getTypeParamMarkerInfo, useConstraintInName));

                return builder;
            }
        }

        public hasOnlyOverloadCallSignatures(): boolean {
            var members = this.getMembers();
            var callSignatures = this.getCallSignatures();
            var constructSignatures = this.getConstructSignatures();
            return members.length === 0 && constructSignatures.length === 0 && callSignatures.length > 1;
        }

        public getTypeOfSymbol() {
            // typeof Module/Class/Enum
            var associatedContainerType = this.getAssociatedContainerType();
            if (associatedContainerType && associatedContainerType.isNamedTypeSymbol()) {
                return associatedContainerType;
            }

            // typeof Function
            var functionSymbol = this.getFunctionSymbol();
            if (functionSymbol && functionSymbol.kind === PullElementKind.Function && !PullHelpers.isSymbolLocal(functionSymbol)) {
                // workaround for missing 'bindAllDeclsInOrder' for classes: do not return typeof symbol for functions defined in module part of clodules (they are considered non-local)
                return PullHelpers.isExportedSymbolInClodule(functionSymbol) ? null : functionSymbol;
            }

            return null;
        }

        private getMemberTypeNameEx(topLevel: boolean, scopeSymbol?: PullSymbol, getPrettyTypeName?: boolean): MemberName {
            var members = this.getMembers();
            var callSignatures = this.getCallSignatures();
            var constructSignatures = this.getConstructSignatures();
            var indexSignatures = this.getIndexSignatures();

            var typeOfSymbol = this.getTypeOfSymbol();
            if (typeOfSymbol) {
                var nameForTypeOf = typeOfSymbol.getScopedNameEx(scopeSymbol, /*skipTypeParametersInName*/ true);
                return MemberName.create(nameForTypeOf, "typeof ", "");
            }

            if (members.length > 0 || callSignatures.length > 0 || constructSignatures.length > 0 || indexSignatures.length > 0) {
                if (this._inMemberTypeNameEx) {
                    // If recursive without type name possible if function expression type
                    return MemberName.create("any");
                }

                this._inMemberTypeNameEx = true;

                var allMemberNames = new MemberNameArray();
                var curlies = !topLevel || indexSignatures.length !== 0;
                var delim = "; ";
                for (var i = 0; i < members.length; i++) {
                    if (members[i].kind === PullElementKind.Method && members[i].type.hasOnlyOverloadCallSignatures()) {
                        // Add all Call signatures of the method
                        var methodCallSignatures = members[i].type.getCallSignatures();
                        var nameStr = members[i].getDisplayName(scopeSymbol) + (members[i].isOptional ? "?" : "");;
                        var methodMemberNames = PullSignatureSymbol.getSignaturesTypeNameEx(methodCallSignatures, nameStr, /*shortform*/ false, /*brackets*/ false, scopeSymbol);
                        allMemberNames.addAll(methodMemberNames);
                    }
                    else {
                        var memberTypeName = members[i].getNameAndTypeNameEx(scopeSymbol);
                        if (memberTypeName.isArray() && (<MemberNameArray>memberTypeName).delim === delim) {
                            allMemberNames.addAll((<MemberNameArray>memberTypeName).entries);
                        }
                        else {
                            allMemberNames.add(memberTypeName);
                        }
                    }
                    curlies = true;
                }

                // Use pretty Function overload signature if this is just a call overload
                var getPrettyFunctionOverload = getPrettyTypeName && !curlies && this.hasOnlyOverloadCallSignatures();

                var signatureCount = callSignatures.length + constructSignatures.length + indexSignatures.length;
                var useShortFormSignature = !curlies && (signatureCount === 1);
                var signatureMemberName: MemberName[];

                if (callSignatures.length > 0) {
                    signatureMemberName =
                    PullSignatureSymbol.getSignaturesTypeNameEx(callSignatures, /*prefix*/ "", useShortFormSignature, /*brackets*/ false, scopeSymbol, getPrettyFunctionOverload);
                    allMemberNames.addAll(signatureMemberName);
                }

                if (constructSignatures.length > 0) {
                    signatureMemberName =
                    PullSignatureSymbol.getSignaturesTypeNameEx(constructSignatures, "new", useShortFormSignature, /*brackets*/ false, scopeSymbol);
                    allMemberNames.addAll(signatureMemberName);
                }

                if (indexSignatures.length > 0) {
                    signatureMemberName =
                    PullSignatureSymbol.getSignaturesTypeNameEx(indexSignatures, /*prefix*/ "", useShortFormSignature, /*brackets*/ true, scopeSymbol);
                    allMemberNames.addAll(signatureMemberName);
                }

                if ((curlies) || (!getPrettyFunctionOverload && (signatureCount > 1) && topLevel)) {
                    allMemberNames.prefix = "{ ";
                    allMemberNames.suffix = "}";
                    allMemberNames.delim = delim;
                }
                else if (allMemberNames.entries.length > 1) {
                    allMemberNames.delim = delim;
                }

                this._inMemberTypeNameEx = false;

                return allMemberNames;

            }

            return MemberName.create("{}");
        }

        public getGenerativeTypeClassification(enclosingType: PullTypeSymbol): GenerativeTypeClassification {
            return GenerativeTypeClassification.Closed;
        }

        // REVIEW: Should cache these checks

        // The argument map prevents us from accidentally flagging method type parameters, or (if we
        // ever decide to go that route) allows for partial specialization
        public wrapsSomeTypeParameter(typeParameterArgumentMap: CandidateInferenceInfo[]): boolean;
        public wrapsSomeTypeParameter(typeParameterArgumentMap: TypeArgumentMap, skipTypeArgumentCheck?: boolean): boolean;
        public wrapsSomeTypeParameter(typeParameterArgumentMap: any[], skipTypeArgumentCheck?: boolean): boolean {
            return this.getWrappingTypeParameterID(typeParameterArgumentMap, skipTypeArgumentCheck) != 0;
        }

        // 0 means there was no type parameter ID wrapping
        // otherwise typeParameterID that was wrapped
        public getWrappingTypeParameterID(typeParameterArgumentMap: TypeArgumentMap, skipTypeArgumentCheck?: boolean): number {
            var type = this;

            // if we encounter a type paramter, we're obviously wrapping
            if (type.isTypeParameter()) {
                if (typeParameterArgumentMap[type.pullSymbolID] || typeParameterArgumentMap[type.getRootSymbol().pullSymbolID]) {
                    return type.pullSymbolID;
                }

                var constraint = (<PullTypeParameterSymbol>type).getConstraint();
                var wrappingTypeParameterID = constraint ? constraint.getWrappingTypeParameterID(typeParameterArgumentMap) : 0;
                return wrappingTypeParameterID;
            }

            if (type.inWrapCheck) {
                return 0;
            }

            // Find result from cache
            this._wrapsTypeParameterCache = this._wrapsTypeParameterCache || new WrapsTypeParameterCache();
            var wrappingTypeParameterID = this._wrapsTypeParameterCache.getWrapsTypeParameter(typeParameterArgumentMap);
            if (wrappingTypeParameterID === undefined) {
                wrappingTypeParameterID = this.getWrappingTypeParameterIDWorker(typeParameterArgumentMap, skipTypeArgumentCheck);
                // Update the cache
                this._wrapsTypeParameterCache.setWrapsTypeParameter(typeParameterArgumentMap, wrappingTypeParameterID);
            }
            return wrappingTypeParameterID;
        }

        private getWrappingTypeParameterIDFromSignatures(signatures: PullSignatureSymbol[], typeParameterArgumentMap: TypeArgumentMap): number {
            for (var i = 0; i < signatures.length; i++) {
                var wrappingTypeParameterID = signatures[i].getWrappingTypeParameterID(typeParameterArgumentMap);
                if (wrappingTypeParameterID !== 0) {
                    return wrappingTypeParameterID;
                }
            }

            return 0;
        }

        private getWrappingTypeParameterIDWorker(typeParameterArgumentMap: TypeArgumentMap, skipTypeArgumentCheck: boolean): number {
            var type = this;
            var wrappingTypeParameterID = 0;

            if (!skipTypeArgumentCheck) {
                type.inWrapCheck = true;

                var typeArguments = type.getTypeArguments();

                // If there are no type arguments, we could be instantiating the 'root' type
                // declaration
                if (type.isGeneric() && !typeArguments) {
                    typeArguments = type.getTypeParameters();
                }

                // if it's a generic type, scan the type arguments to see which may wrap type parameters
                if (typeArguments) {
                    for (var i = 0; !wrappingTypeParameterID && i < typeArguments.length; i++) {
                        wrappingTypeParameterID = typeArguments[i].getWrappingTypeParameterID(typeParameterArgumentMap);
                    }
                }
            }

            // if it's not a named type, we'll need to introspect its member list
            if (skipTypeArgumentCheck || !(type.kind & PullElementKind.SomeInstantiatableType) || !type.name) {
                // otherwise, walk the member list and signatures, checking for wraps
                var members = type.getAllMembers(PullElementKind.SomeValue, GetAllMembersVisiblity.all);
                for (var i = 0; !wrappingTypeParameterID && i < members.length; i++) {
                    PullHelpers.resolveDeclaredSymbolToUseType(members[i]);
                    wrappingTypeParameterID = members[i].type.getWrappingTypeParameterID(typeParameterArgumentMap);
                }

                wrappingTypeParameterID = wrappingTypeParameterID
                || this.getWrappingTypeParameterIDFromSignatures(type.getCallSignatures(), typeParameterArgumentMap)
                || this.getWrappingTypeParameterIDFromSignatures(type.getConstructSignatures(), typeParameterArgumentMap)
                || this.getWrappingTypeParameterIDFromSignatures(type.getIndexSignatures(), typeParameterArgumentMap);
            }

            if (!skipTypeArgumentCheck) {
                type.inWrapCheck = false;
            }

            return wrappingTypeParameterID;
        }


        // Detect if a type parameter is wrapped in a wrapped form that generates infinite expansion.  E.g., for 'T'
        //  class C<T> {
        //      p1: T; <- no
        //      p2: C<T>; <- no
        //      p3: C<C<T>> <- yes
        //  }
        public wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType: PullTypeSymbol) {
            // Only named types can form infinite expansion
            Debug.assert(this.isNamedTypeSymbol());
            Debug.assert(PullHelpers.getRootType(enclosingType) == enclosingType); // Enclosing type passed has to be the root symbol
            var knownWrapMap = BitMatrix.getBitMatrix(/*allowUndefinedValues:*/ true);
            var wrapsIntoInfinitelyExpandingTypeReference =                this._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceRecurse(enclosingType, knownWrapMap);            knownWrapMap.release();            return wrapsIntoInfinitelyExpandingTypeReference;
        }

        public _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceRecurse(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix): boolean {
            var wrapsIntoInfinitelyExpandingTypeReference = knownWrapMap.valueAt(this.pullSymbolID, enclosingType.pullSymbolID);
            if (wrapsIntoInfinitelyExpandingTypeReference != undefined) {
                return wrapsIntoInfinitelyExpandingTypeReference;
            }

            if (this.inWrapInfiniteExpandingReferenceCheck) {
                return false;
            }

            this.inWrapInfiniteExpandingReferenceCheck = true;
            wrapsIntoInfinitelyExpandingTypeReference =
                this._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceWorker(enclosingType, knownWrapMap);
            knownWrapMap.setValueAt(this.pullSymbolID, enclosingType.pullSymbolID, wrapsIntoInfinitelyExpandingTypeReference);
            this.inWrapInfiniteExpandingReferenceCheck = false;

            return wrapsIntoInfinitelyExpandingTypeReference;
        }

        private _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceWorker(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix) {

            var thisRootType = PullHelpers.getRootType(this);


            if (thisRootType != enclosingType) {
                var thisIsNamedType = this.isNamedTypeSymbol();

                if (thisIsNamedType) {
                    if (thisRootType.inWrapInfiniteExpandingReferenceCheck) {
                        // No need to iterating members of the type again if we are checking members of some 
                        // version of this type
                        return false;
                    }

                    thisRootType.inWrapInfiniteExpandingReferenceCheck = true;
                }

                var wrapsIntoInfinitelyExpandingTypeReference = this._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceStructure(
                    enclosingType, knownWrapMap);

                if (thisIsNamedType) {
                    thisRootType.inWrapInfiniteExpandingReferenceCheck = false;
                }

                return wrapsIntoInfinitelyExpandingTypeReference;
            }

            // Spec section 3.8.7: Recursive Types
            // A type reference which, directly or indirectly, references G through open type references and 
            // which contains a wrapped form of any of G’s type parameters in one or more type arguments is classified
            // as an infinitely expanding type reference.A type is said to wrap a type parameter if it references 
            // the type parameter but isn’t simply the type parameter itself.
            var enclosingTypeParameters = enclosingType.getTypeParameters();
            var typeArguments = this.getTypeArguments();
            for (var i = 0; i < typeArguments.length; i++) {
                if (ArrayUtilities.contains(enclosingTypeParameters, typeArguments[i])) {
                    // Just a reference to type parameter
                    continue;
                }

                // Type arguments wraps type parameter
                if (typeArguments[i].wrapsSomeTypeParameter((<PullInstantiatedTypeReferenceSymbol>this).getTypeParameterArgumentMap())) {
                    return true;
                }
            }

            return false;
        }

        private _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceStructure(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix) {
            var members = this.getAllMembers(PullElementKind.SomeValue, GetAllMembersVisiblity.all);
            for (var i = 0; i < members.length; i++) {
                if (members[i].type && members[i].type._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceRecurse(
                    enclosingType, knownWrapMap)) {
                    return true;
                }
            }

            var sigs = this.getCallSignatures();
            for (var i = 0; i < sigs.length; i++) {
                if (sigs[i]._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType, knownWrapMap)) {
                    return true;
                }
            }

            sigs = this.getConstructSignatures();
            for (var i = 0; i < sigs.length; i++) {
                if (sigs[i]._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType, knownWrapMap)) {
                    return true;
                }
            }

            sigs = this.getIndexSignatures();
            for (var i = 0; i < sigs.length; i++) {
                if (sigs[i]._wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType, knownWrapMap)) {
                    return true;
                }
            }

            return false;
        }

        // This is the same signature as PullTypeResolver.widenType (except that the positions
        // of the resolver are switched). This method just returns the cached value of the widened
        // type, otherwise, calls into the resolver.
        public widenedType(resolver: PullTypeResolver, ast: AST, context: PullTypeResolutionContext): PullTypeSymbol {
            if (!this._widenedType) {
                this._widenedType = resolver.widenType(this, ast, context);
            }
            return this._widenedType;
        }
    }

    export class PullPrimitiveTypeSymbol extends PullTypeSymbol {
        constructor(name: string) {
            super(name, PullElementKind.Primitive);

            this.isResolved = true;
        }

        public isAny(): boolean {
            return !this.isStringConstant() && this.name === "any";
        }

        public isNull(): boolean {
            return !this.isStringConstant() && this.name === "null";
        }

        public isUndefined(): boolean {
            return !this.isStringConstant() && this.name === "undefined";
        }

        public isStringConstant() { return false; }

        public setUnresolved() {
            // do nothing...
        }

        // Overrides the PullSymbol.getDisplayName to give the appearance of widening. The spec
        // doesn't say anything about displaying types, but we should leave no trace of undefined
        // or null.
        public getDisplayName() {
            if (this.isNull() || this.isUndefined()) {
                return "any";
            }
            else {
                return super.getDisplayName();
            }
        }
    }

    export class PullStringConstantTypeSymbol extends PullPrimitiveTypeSymbol {
        constructor(name: string) {
            super(name);
        }

        public isStringConstant() {
            return true;
        }
    }

    export class PullErrorTypeSymbol extends PullPrimitiveTypeSymbol {

        constructor(public _anyType: PullTypeSymbol, name: string) {
            super(name);

            Debug.assert(this._anyType);
            this.isResolved = true;
        }

        public isError() {
            return true;
        }

        public _getResolver(): PullTypeResolver {
            return this._anyType._getResolver();
        }

        public getName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string {
            return this._anyType.getName(scopeSymbol, useConstraintInName);
        }

        public getDisplayName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string {
            return this._anyType.getName(scopeSymbol, useConstraintInName);
        }

        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean) {
            return this._anyType.getName(scopeSymbol, useConstraintInName);
        }
    }

    // represents the module "namespace" type
    export class PullContainerSymbol extends PullTypeSymbol {
        public instanceSymbol: PullSymbol = null;

        private assignedValue: PullSymbol = null;
        private assignedType: PullTypeSymbol = null;
        private assignedContainer: PullContainerSymbol = null;

        constructor(name: string, kind: PullElementKind) {
            super(name, kind);
        }

        public isContainer() { return true; }

        public setInstanceSymbol(symbol: PullSymbol) {
            this.instanceSymbol = symbol;
        }

        public getInstanceSymbol(): PullSymbol {
            return this.instanceSymbol;
        }

        public setExportAssignedValueSymbol(symbol: PullSymbol) {
            this.assignedValue = symbol;
        }

        public getExportAssignedValueSymbol() {
            return this.assignedValue;
        }

        public setExportAssignedTypeSymbol(type: PullTypeSymbol) {
            this.assignedType = type;
        }

        public getExportAssignedTypeSymbol() {
            return this.assignedType;
        }

        public setExportAssignedContainerSymbol(container: PullContainerSymbol) {
            this.assignedContainer = container;
        }

        public getExportAssignedContainerSymbol() {
            return this.assignedContainer;
        }

        public hasExportAssignment() {
            return !!this.assignedValue || !!this.assignedType || !!this.assignedContainer;
        }

        // Determine if 'symbol' is used as containerSymbol
        static usedAsSymbol(containerSymbol: PullSymbol, symbol: PullSymbol): boolean {
            if (!containerSymbol || !containerSymbol.isContainer()) {
                return false;
            }

            if (!containerSymbol.isAlias() && containerSymbol.type === symbol) {
                return true;
            }

            var moduleSymbol = <PullContainerSymbol>containerSymbol;
            var valueExportSymbol = moduleSymbol.getExportAssignedValueSymbol();
            var typeExportSymbol = moduleSymbol.getExportAssignedTypeSymbol();
            var containerExportSymbol = moduleSymbol.getExportAssignedContainerSymbol();
            if (valueExportSymbol || typeExportSymbol || containerExportSymbol) {
                // If the container symbol has export assignment then 'symbol' is used as containerSymbol if
                // any of export assigned symbol is same as 'symbol'
                if (valueExportSymbol === symbol
                    || typeExportSymbol == symbol
                    || containerExportSymbol == symbol) {
                    return true;
                }

                // If the container symbol doesnt export itself, check if export assigned container symbol is used as 'symbol'
                if (containerExportSymbol != containerSymbol) {
                    return PullContainerSymbol.usedAsSymbol(containerExportSymbol, symbol);
                }
            }

            return false;
        }

        public getInstanceType() {
            return this.instanceSymbol ? this.instanceSymbol.type : null;
        }
    }

    export class PullTypeAliasSymbol extends PullTypeSymbol {
        private _assignedValue: PullSymbol = null;
        private _assignedType: PullTypeSymbol = null;
        private _assignedContainer: PullContainerSymbol = null;

        private _isUsedAsValue = false;
        private _typeUsedExternally = false;
        private _isUsedInExportAlias = false;
        private retrievingExportAssignment = false;
        private linkedAliasSymbols: PullTypeAliasSymbol[] = null;

        constructor(name: string) {
            super(name, PullElementKind.TypeAlias);
        }

        public isUsedInExportedAlias(): boolean {
            this._resolveDeclaredSymbol();
            return this._isUsedInExportAlias;
        }

        public typeUsedExternally(): boolean {
            this._resolveDeclaredSymbol();
            return this._typeUsedExternally;
        }

        public isUsedAsValue(): boolean {
            this._resolveDeclaredSymbol();
            return this._isUsedAsValue;
        }

        public setTypeUsedExternally(): void {
            this._typeUsedExternally = true;
        }

        public setIsUsedInExportedAlias(): void {
            this._isUsedInExportAlias = true;
            if (this.linkedAliasSymbols) {
                this.linkedAliasSymbols.forEach(s => s.setIsUsedInExportedAlias());
            }
        }

        public addLinkedAliasSymbol(contingentValueSymbol: PullTypeAliasSymbol) {
            if (!this.linkedAliasSymbols) {
                this.linkedAliasSymbols = [contingentValueSymbol];
            }
            else {
                this.linkedAliasSymbols.push(contingentValueSymbol);
            }
        }

        public setIsUsedAsValue(): void {
            this._isUsedAsValue = true;
            if (this.linkedAliasSymbols) {
                this.linkedAliasSymbols.forEach(s => s.setIsUsedAsValue());
            }
        }

        public assignedValue(): PullSymbol {
            this._resolveDeclaredSymbol();
            return this._assignedValue;
        }

        public assignedType(): PullTypeSymbol {
            this._resolveDeclaredSymbol();
            return this._assignedType;
        }

        public assignedContainer(): PullContainerSymbol {
            this._resolveDeclaredSymbol();
            return this._assignedContainer;
        }

        public isAlias() { return true; }
        public isContainer() { return true; }

        public setAssignedValueSymbol(symbol: PullSymbol): void {
            this._assignedValue = symbol;
        }

        public getExportAssignedValueSymbol(): PullSymbol {
            if (this._assignedValue) {
                return this._assignedValue;
            }

            if (this.retrievingExportAssignment) {
                return null;
            }

            if (this._assignedContainer) {
                if (this._assignedContainer.hasExportAssignment()) {
                    this.retrievingExportAssignment = true;
                    var sym = this._assignedContainer.getExportAssignedValueSymbol();
                    this.retrievingExportAssignment = false;
                    return sym;
                }

                return this._assignedContainer.getInstanceSymbol();
            }

            return null;
        }

        public setAssignedTypeSymbol(type: PullTypeSymbol): void {
            this._assignedType = type;
        }

        public getExportAssignedTypeSymbol(): PullTypeSymbol {
            if (this.retrievingExportAssignment) {
                return null;
            }

            if (this._assignedType) {
                if (this._assignedType.isAlias()) {
                    this.retrievingExportAssignment = true;
                    var sym = (<PullTypeAliasSymbol>this._assignedType).getExportAssignedTypeSymbol();
                    this.retrievingExportAssignment = false;
                }
                else if (this._assignedType !== this._assignedContainer) {
                    return this._assignedType;
                }
            }

            if (this._assignedContainer) {
                this.retrievingExportAssignment = true;
                var sym = this._assignedContainer.getExportAssignedTypeSymbol();
                this.retrievingExportAssignment = false;
                if (sym) {
                    return sym;
                }
            }

            return this._assignedContainer;
        }

        public setAssignedContainerSymbol(container: PullContainerSymbol): void {
            this._assignedContainer = container;
        }

        public getExportAssignedContainerSymbol(): PullContainerSymbol {
            if (this.retrievingExportAssignment) {
                return null;
            }

            if (this._assignedContainer) {
                this.retrievingExportAssignment = true;
                var sym = this._assignedContainer.getExportAssignedContainerSymbol();
                this.retrievingExportAssignment = false;
                if (sym) {
                    return sym;
                }
            }

            return this._assignedContainer;
        }

        public getMembers(): PullSymbol[] {
            if (this._assignedType) {
                return this._assignedType.getMembers();
            }

            return sentinelEmptyArray;
        }

        public getCallSignatures(): PullSignatureSymbol[] {
            if (this._assignedType) {
                return this._assignedType.getCallSignatures();
            }

            return sentinelEmptyArray;
        }

        public getConstructSignatures(): PullSignatureSymbol[] {
            if (this._assignedType) {
                return this._assignedType.getConstructSignatures();
            }

            return sentinelEmptyArray;
        }

        public getIndexSignatures(): PullSignatureSymbol[] {
            if (this._assignedType) {
                return this._assignedType.getIndexSignatures();
            }

            return sentinelEmptyArray;
        }

        public findMember(name: string): PullSymbol {
            if (this._assignedType) {
                return this._assignedType.findMember(name, /*lookInParent*/ true);
            }

            return null;
        }

        public findNestedType(name: string): PullTypeSymbol {
            if (this._assignedType) {
                return this._assignedType.findNestedType(name);
            }

            return null;
        }

        public findNestedContainer(name: string): PullTypeSymbol {
            if (this._assignedType) {
                return this._assignedType.findNestedContainer(name);
            }

            return null;
        }

        public getAllMembers(searchDeclKind: PullElementKind, memberVisibility: GetAllMembersVisiblity): PullSymbol[] {
            if (this._assignedType) {
                return this._assignedType.getAllMembers(searchDeclKind, memberVisibility);
            }

            return sentinelEmptyArray;
        }
    }

    export class PullTypeParameterSymbol extends PullTypeSymbol {
        private _constraint: PullTypeSymbol = null;

        constructor(name: string) {
            super(name, PullElementKind.TypeParameter);
        }

        public isTypeParameter() { return true; }

        public setConstraint(constraintType: PullTypeSymbol) {
            this._constraint = constraintType;
        }

        public getConstraint(): PullTypeSymbol {
            return this._constraint;
        }

        // Section 3.4.1 (November 18, 2013):
        // The base constraint of a type parameter T is defined as follows:
        //  If T has no declared constraint, T's base constraint is the empty object type {}
        //  If T's declared constraint is a type parameter, T's base constraint is that of the type parameter.
        //  Otherwise, T's base constraint is T's declared constraint.
        public getBaseConstraint(semanticInfoChain: SemanticInfoChain): PullTypeSymbol {
            var preBaseConstraint = this.getConstraintRecursively({});
            Debug.assert(preBaseConstraint === null || !preBaseConstraint.isTypeParameter());
            return preBaseConstraint || semanticInfoChain.emptyTypeSymbol;
        }

        // Returns null if you hit a cycle or no constraint
        // The visitedTypeParameters bag is for catching cycles
        private getConstraintRecursively(visitedTypeParameters: { [n: number]: PullTypeParameterSymbol }): PullTypeSymbol {
            var constraint = this.getConstraint();

            if (constraint) {
                if (constraint.isTypeParameter()) {
                    var constraintAsTypeParameter = <PullTypeParameterSymbol>constraint;
                    if (!visitedTypeParameters[constraintAsTypeParameter.pullSymbolID]) {
                        visitedTypeParameters[constraintAsTypeParameter.pullSymbolID] = constraintAsTypeParameter;
                        return constraintAsTypeParameter.getConstraintRecursively(visitedTypeParameters);
                    }
                }
                else {
                    return constraint;
                }
            }

            return null;
        }

        // The default constraint is just like the base constraint, but without recursively traversing
        // type parameters.
        public getDefaultConstraint(semanticInfoChain: SemanticInfoChain): PullTypeSymbol {
            return this._constraint || semanticInfoChain.emptyTypeSymbol;
        }

        // Note: This is a deviation from the spec. Using the constraint to get signatures is only
        // warranted when we explicitly ask for an apparent type.
        public getCallSignatures(): PullSignatureSymbol[] {
            if (this._constraint) {
                return this._constraint.getCallSignatures();
            }

            return super.getCallSignatures();
        }

        public getConstructSignatures(): PullSignatureSymbol[] {
            if (this._constraint) {
                return this._constraint.getConstructSignatures();
            }

            return super.getConstructSignatures();
        }

        public getIndexSignatures(): PullSignatureSymbol[] {
            if (this._constraint) {
                return this._constraint.getIndexSignatures();
            }

            return super.getIndexSignatures();
        }

        public isGeneric() { return true; }

        public fullName(scopeSymbol?: PullSymbol) {
            var name = this.getDisplayName(scopeSymbol);
            var container = this.getContainer();
            if (container) {
                var containerName = container.fullName(scopeSymbol);
                name = name + " in " + containerName;
            }

            return name;
        }

        public getName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string {
            var name = super.getName(scopeSymbol);

            if (this.isPrinting) {
                return name;
            }

            this.isPrinting = true;

            if (useConstraintInName && this._constraint) {
                name += " extends " + this._constraint.toString(scopeSymbol);
            }

            this.isPrinting = false;

            return name;
        }

        public getDisplayName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, skipInternalAliasName?: boolean) {
            var name = super.getDisplayName(scopeSymbol, useConstraintInName, skipInternalAliasName);

            if (this.isPrinting) {
                return name;
            }

            this.isPrinting = true;

            if (useConstraintInName && this._constraint) {
                name += " extends " + this._constraint.toString(scopeSymbol);
            }

            this.isPrinting = false;

            return name;
        }

        public isExternallyVisible(inIsExternallyVisibleSymbols?: PullSymbol[]): boolean {
            return true;
        }
    }

    export class PullAccessorSymbol extends PullSymbol {

        private _getterSymbol: PullSymbol = null;
        private _setterSymbol: PullSymbol = null;

        constructor(name: string) {
            super(name, PullElementKind.Property);
        }

        public isAccessor() { return true; }

        public setSetter(setter: PullSymbol) {
            if (!setter) {
                return;
            }

            this._setterSymbol = setter;
        }

        public getSetter(): PullSymbol {
            return this._setterSymbol;
        }

        public setGetter(getter: PullSymbol) {
            if (!getter) {
                return;
            }

            this._getterSymbol = getter;
        }

        public getGetter(): PullSymbol {
            return this._getterSymbol;
        }
    }

    export function getIDForTypeSubstitutions(instantiatingType: PullTypeSymbol, typeArgumentMap: TypeArgumentMap): string;
    export function getIDForTypeSubstitutions(instantiatingSignature: PullSignatureSymbol, typeArgumentMap: TypeArgumentMap): string;
    export function getIDForTypeSubstitutions(instantiatingTypeOrSignature: PullSymbol, typeArgumentMap: TypeArgumentMap): string {
        var substitution = "";
        var members: PullSymbol[] = null;

        var allowedToReferenceTypeParameters = (<PullTypeSymbol>instantiatingTypeOrSignature).getAllowedToReferenceTypeParameters();
        for (var i = 0; i < allowedToReferenceTypeParameters.length; i++) {
            var typeParameter = allowedToReferenceTypeParameters[i];
            var typeParameterID = typeParameter.pullSymbolID;
            var typeArg = typeArgumentMap[typeParameterID];
            if (!typeArg) {
                typeArg = typeParameter;
            }
            substitution += typeParameterID + ":" + getIDForTypeSubstitutionsOfType(typeArg);
        }

        return substitution;
    }

    function getIDForTypeSubstitutionsOfType(type: PullTypeSymbol): string {
        var structure: string;
        if (type.isError()) {
            structure = "E" + getIDForTypeSubstitutionsOfType((<PullErrorTypeSymbol>type)._anyType);
        }
        else if (!type.isNamedTypeSymbol()) {
            structure = getIDForTypeSubstitutionsFromObjectType(type);
        }

        if (!structure) {
            structure = type.pullSymbolID + "#";
        }

        return structure;
    }

    function getIDForTypeSubstitutionsFromObjectType(type: PullTypeSymbol): string {
        if (type.isResolved) {
            var getIDForTypeSubStitutionWalker = new GetIDForTypeSubStitutionWalker();
            PullHelpers.walkPullTypeSymbolStructure(type, getIDForTypeSubStitutionWalker);
        }

        return null;
    }

    class GetIDForTypeSubStitutionWalker implements PullHelpers.PullTypeSymbolStructureWalker {
        public structure = "";
        memberSymbolWalk(memberSymbol: PullSymbol) {
            this.structure += memberSymbol.name + "@" + getIDForTypeSubstitutionsOfType(memberSymbol.type);
            return true;
        }
        callSignatureWalk(signatureSymbol: PullSignatureSymbol) {
            this.structure += "(";
            return true;
        }
        constructSignatureWalk(signatureSymbol: PullSignatureSymbol) {
            this.structure += "new(";
            return true;
        }
        indexSignatureWalk(signatureSymbol: PullSignatureSymbol) {
            this.structure += "[](";
            return true;
        }
        signatureParameterWalk(parameterSymbol: PullSymbol) {
            this.structure += parameterSymbol.name + "@" + getIDForTypeSubstitutionsOfType(parameterSymbol.type);
            return true;
        }
        signatureReturnTypeWalk(returnType: PullTypeSymbol) {
            this.structure += ")" + getIDForTypeSubstitutionsOfType(returnType);
            return true;
        }
    }


    export enum GetAllMembersVisiblity {
        // All properties of the type regardless of their accessibility level
        all = 0,

        // Only properties that are accessible on a class instance, i.e. public and private members of 
        // the current class, and only public members of any bases it extends
        internallyVisible = 1,

        // Only public members of classes
        externallyVisible = 2,
    }
}