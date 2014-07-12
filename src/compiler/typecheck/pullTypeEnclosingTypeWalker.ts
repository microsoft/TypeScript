// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {

    // This represents the state of the enclosing type walker that is a flag indicating if we are walking enclosingType
    // and the list of symbols walked of a generic type. It is represented as these two things because even when 
    // we are in the enclosing type that is not generic, we have set enclosing type, but there wont be any need of relevant
    // signature and type reference symbols as they wont be needed to determine if the typereference in this enclosing type
    // would be infinitely recursive. Having set the flag that we have already set enclosing type, would help in 
    // perf because we wouldnt keep calculating enclosing type again and again on any of the inner traversals when not necessary
    export class EnclosingTypeWalkerState {
        // Is walker into any of the enclosing type. This could be true if the enclosing type is class or interface
        // irrespective of whether it is generic or not.
        public _hasSetEnclosingType: boolean;

        // These are set of symbols that walker is walking. Note that they are set only if the enclosing type is generic
        // This is stack of symbols as they are walked. 
        // Eg. 
        // interface IList<T> {
        //     owner(): IList<IList<T>>;
        // }
        // In above example when looking at type reference IList<IList<T>> it would have 
        // [IList<T>, owner's signature symbol, IList<IList<T>>]
        public _currentSymbols: PullSymbol[];

        // Gets thye default enclosing type walker state
        // Default state is enclosing type walker isnt walking any enclosing type and hence hasSetEnclosingType = false and no current symbols
        static getDefaultEnclosingTypeWalkerState(): EnclosingTypeWalkerState {
            var defaultEnclosingTypeWalkerState = new EnclosingTypeWalkerState();
            defaultEnclosingTypeWalkerState._hasSetEnclosingType = false;
            return defaultEnclosingTypeWalkerState;
        }

        // Gets the enclosing type walker state when enclosingType is non generic
        // In this case, the hasSetEnclosingType is true but the currentSymbols is not set because it doesnt need those symbols
        // to evaluate if typeReference would be infinitely expanding
        static getNonGenericEnclosingTypeWalkerState(): EnclosingTypeWalkerState {
            var defaultEnclosingTypeWalkerState = new EnclosingTypeWalkerState();
            defaultEnclosingTypeWalkerState._hasSetEnclosingType = true;
            return defaultEnclosingTypeWalkerState;
        }

        // Gets the enclosing type walker state when enclosingType is generic
        static getGenericEnclosingTypeWalkerState(genericEnclosingType: PullTypeSymbol): EnclosingTypeWalkerState {
            var defaultEnclosingTypeWalkerState = new EnclosingTypeWalkerState();
            defaultEnclosingTypeWalkerState._hasSetEnclosingType = true;
            defaultEnclosingTypeWalkerState._currentSymbols = [PullHelpers.getRootType(genericEnclosingType)];
            return defaultEnclosingTypeWalkerState;
        }
    }

    // This is the walker that walks the type and type reference associated with the declaration.
    // This will make sure that any time, generative classification is asked, we have the right type of the declaration
    // and we can evaluate it in the correct context
    // interface IList<T> {
    //     owner: IList<IList<T>>;
    //     owner2: IList<IList<string>>;
    // }
    // class List<U> implements IList<U> {
    //     owner: List<List<U>>;
    // }
    // In the above example, when checking if owner of List<U> is subtype of owner of IList<U>
    // we want to traverse IList<T> to make sure when generative classification is asked we know exactly 
    // which type parameters and which type need to be checked for infinite wrapping
    // This also is essential so that we dont incorrectly think owner2's type reference as infinitely expanding when 
    // checking members of IList<string>
    export class PullTypeEnclosingTypeWalker {
        // Default state of the enclosingTypeWalker, so we dont end up creating empty states again and again
        private static _defaultEnclosingTypeWalkerState = EnclosingTypeWalkerState.getDefaultEnclosingTypeWalkerState();

        // Default state for non genericEnclosingTypeWalker
        private static _nonGenericEnclosingTypeWalkerState = EnclosingTypeWalkerState.getNonGenericEnclosingTypeWalkerState();

        // Current state of the enclosing type walker
        private enclosingTypeWalkerState: EnclosingTypeWalkerState;

        constructor() {
            this.setDefaultTypeWalkerState();
        }

        private setDefaultTypeWalkerState() {
            this.enclosingTypeWalkerState = PullTypeEnclosingTypeWalker._defaultEnclosingTypeWalkerState;
        }

        private setNonGenericEnclosingTypeWalkerState() {
            this.enclosingTypeWalkerState = PullTypeEnclosingTypeWalker._nonGenericEnclosingTypeWalkerState;
        } 

        private canSymbolOrDeclBeUsedAsEnclosingTypeHelper(name: string, kind: PullElementKind) {
            return name && (kind === PullElementKind.Class || kind === PullElementKind.Interface);
        }

        private canDeclBeUsedAsEnclosingType(decl: PullDecl) {
            return this.canSymbolOrDeclBeUsedAsEnclosingTypeHelper(decl.name, decl.kind);
        }

        private canSymbolBeUsedAsEnclosingType(symbol: PullSymbol) {
            return this.canSymbolOrDeclBeUsedAsEnclosingTypeHelper(symbol.name, symbol.kind);
        }
        
        // Enclosing type is the first symbol in the symbols visited
        public getEnclosingType() {
            var currentSymbols = this.enclosingTypeWalkerState._currentSymbols;
            if (currentSymbols) {
                // We dont allocate current symbols as empty list any more
                Debug.assert(currentSymbols.length > 0);
                return <PullTypeSymbol>currentSymbols[0];
            }

            return null;
        }

        // We can/should walk the structure only if the enclosing type is generic
        public _canWalkStructure() {
            var enclosingType = this.getEnclosingType();
            Debug.assert(!enclosingType || enclosingType.isGeneric());
            return !!enclosingType;
        }

        // Current symbol is the last symbol in the current symbols list
        public _getCurrentSymbol() {
            var currentSymbols = this.enclosingTypeWalkerState._currentSymbols;
            if (currentSymbols && currentSymbols.length) {
                return currentSymbols[currentSymbols.length - 1];
            }

            return null;
        }

        // Gets the generative classification of the current symbol in the enclosing type
        public getGenerativeClassification() {
            if (this._canWalkStructure()) {
                var currentType = <PullTypeSymbol>this._getCurrentSymbol();
                if (!currentType) {
                    // This may occur if we are trying to walk type parameter in the original declaration
                    return GenerativeTypeClassification.Unknown;
                }

                var variableNeededToFixNodeJitterBug = this.getEnclosingType();

                return currentType.getGenerativeTypeClassification(variableNeededToFixNodeJitterBug);
            }

            return GenerativeTypeClassification.Closed;
        }

        private _pushSymbol(symbol: PullSymbol) {
            return this.enclosingTypeWalkerState._currentSymbols.push(symbol);
        }

        private _popSymbol() {
            return this.enclosingTypeWalkerState._currentSymbols.pop();
        }

        private setSymbolAsEnclosingType(type: PullTypeSymbol) {
            if (type.isGeneric()) {
                // Set the state of the new generic type
                this.enclosingTypeWalkerState = EnclosingTypeWalkerState.getGenericEnclosingTypeWalkerState(type);
            } else {
                // Non generic Type
                this.setNonGenericEnclosingTypeWalkerState();
            }
        }

        // Sets the enclosing type along with parent declaration symbols
        private _setEnclosingTypeOfParentDecl(decl: PullDecl, setSignature: boolean) {
            var parentDecl = decl.getParentDecl();
            // If we are already at module/script, we are done walking up the parent
            if (parentDecl && !(parentDecl.kind & (PullElementKind.SomeContainer | PullElementKind.Script))) {
                // Always set signatures in parents
                if (this.canDeclBeUsedAsEnclosingType(parentDecl)) {
                    this.setSymbolAsEnclosingType(<PullTypeSymbol>parentDecl.getSymbol());
                } else {
                    this._setEnclosingTypeOfParentDecl(parentDecl, /*setSignature*/ true);
                }

                if (this._canWalkStructure()) {
                    // Update the current decl in the 
                    var symbol = decl.getSymbol();
                    if (symbol) {
                        // If symbol is raw PullSymbol (not a type or a signature, but
                        // rather a variable, function, etc), use its type instead
                        if (!symbol.isType() && !symbol.isSignature()) {
                            symbol = symbol.type;
                        }

                        this._pushSymbol(symbol);
                    }

                    // Set signature symbol if asked
                    if (setSignature) {
                        var signature = decl.getSignatureSymbol();
                        if (signature) {
                            this._pushSymbol(signature);
                        }
                    }
                }
            }
        }

        public setEnclosingTypeForSymbol(symbol: PullSymbol): EnclosingTypeWalkerState {
            var currentEnclosingTypeWalkerState = this.enclosingTypeWalkerState;
            if (this.canSymbolBeUsedAsEnclosingType(symbol)) {
                this.setSymbolAsEnclosingType(<PullTypeSymbol>symbol);
            }
            else {
                // We are going to walk declarations, so first set the default type walker state,
                // So the walker doesnt incorrectly assume us already in enclosingTypeWalker state
                this.setDefaultTypeWalkerState();

                // Walk the decls and its parents to set the enclosing type
                var decls = symbol.getDeclarations();
                for (var i = 0; i < decls.length; i++) {
                    var decl = decls[i];
                    this._setEnclosingTypeOfParentDecl(decl, symbol.isSignature());

                    // If the parent was able to set the enclosing type, we are done, no need to walk more decls
                    if (this.enclosingTypeWalkerState._hasSetEnclosingType) {
                        break;
                    }
                }

                if (!this.enclosingTypeWalkerState._hasSetEnclosingType) {
                    // We have started walking enclosing type, but this symbol might be a symbol with declaration that doesnt 
                    // have parentDecl, eg. SyntheticDecl of emptyObjectType, in that case we wouldnt have set the flag
                    // _hasSetEnclosingType as path of walking its decls, 
                    // so set it now to indicate we have started walking the enclosing type, its not a generic type
                    this.setNonGenericEnclosingTypeWalkerState();
                }
            }
            return currentEnclosingTypeWalkerState;
        }

        // Start walking type
        public startWalkingType(symbol: PullTypeSymbol): EnclosingTypeWalkerState {
            var currentState = this.enclosingTypeWalkerState;

            // We want to set the new enclosing type using symbol if we arent already walking any enclosing Type 
            // or the symbol itself can be used as new enclosing type as then we want to be walking in the new enclosingType and not the old one.
            // We dont need to set new enclosing type if we are walking signature because they dont declare new enclosing type as the enclosing type
            // can only be class or interface and in case of signature we would have either set it earlier, or would do when we are actually 
            // using type reference from parameter/return types
            var setEnclosingTypeForSymbol = !this.enclosingTypeWalkerState._hasSetEnclosingType || this.canSymbolBeUsedAsEnclosingType(symbol);
            if (setEnclosingTypeForSymbol) {
                this.setEnclosingTypeForSymbol(symbol);
            }
            return currentState;
        }

        // Finish walking type
        public endWalkingType(stateWhenStartedWalkingTypes: EnclosingTypeWalkerState) {
            this.enclosingTypeWalkerState = stateWhenStartedWalkingTypes;
        }

        // Walk members
        public walkMemberType(memberName: string, resolver: PullTypeResolver) {
            if (this._canWalkStructure()) {
                var currentType = <PullTypeSymbol>this._getCurrentSymbol();
                var memberSymbol = currentType ? resolver._getNamedPropertySymbolOfAugmentedType(memberName, currentType) : null;
                this._pushSymbol(memberSymbol ? memberSymbol.type : null);
            }
        }

        public postWalkMemberType() {
            if (this._canWalkStructure()) {
                this._popSymbol();
            }
        }

        // Walk signature
        public walkSignature(kind: PullElementKind, index: number) {
            if (this._canWalkStructure()) {
                var currentType = <PullTypeSymbol>this._getCurrentSymbol();
                var signatures: PullSignatureSymbol[];
                if (currentType) {
                    if (kind == PullElementKind.CallSignature) {
                        signatures = currentType.getCallSignatures();
                    }
                    else if (kind == PullElementKind.ConstructSignature) {
                        signatures = currentType.getConstructSignatures();
                    }
                    else {
                        signatures = currentType.getIndexSignatures();
                    }
                }

                this._pushSymbol(signatures ? signatures[index] : null);
            }
        }

        public postWalkSignature() {
            if (this._canWalkStructure()) {
                this._popSymbol();
            }
        }

        public walkTypeArgument(index: number): void {
            if (this._canWalkStructure()) {
                var typeArgument: PullTypeSymbol = null;
                var currentType = <PullTypeSymbol>this._getCurrentSymbol();
                if (currentType) {
                    var typeArguments = currentType.getTypeArguments();
                    typeArgument = typeArguments ? typeArguments[index] : null;
                }
                this._pushSymbol(typeArgument);
            }
        }

        public postWalkTypeArgument(): void {
            if (this._canWalkStructure()) {
                this._popSymbol();
            }
        }

        // Walk type parameter constraint
        public walkTypeParameterConstraint(index: number) {
            if (this._canWalkStructure()) {
                var typeParameters: PullTypeParameterSymbol[];
                var currentSymbol = this._getCurrentSymbol();
                if (currentSymbol) {
                    if (currentSymbol.isSignature()) {
                        typeParameters = (<PullSignatureSymbol>currentSymbol).getTypeParameters();
                    } else {
                        Debug.assert(currentSymbol.isType());
                        typeParameters = (<PullTypeSymbol>currentSymbol).getTypeParameters();
                    }
                }
                this._pushSymbol(typeParameters ? typeParameters[index].getConstraint() : null);
            }
        }

        public postWalkTypeParameterConstraint() {
            if (this._canWalkStructure()) {
                this._popSymbol();
            }
        }

        // Walk return type
        public walkReturnType() {
            if (this._canWalkStructure()) {
                var currentSignature = <PullSignatureSymbol>this._getCurrentSymbol();
                this._pushSymbol(currentSignature ? currentSignature.returnType : null);
            }
        }

        public postWalkReturnType() {
            if (this._canWalkStructure()) {
                this._popSymbol();
            }
        }

        // Walk parameter type
        public walkParameterType(iParam: number) {
            if (this._canWalkStructure()) {
                var currentSignature = <PullSignatureSymbol>this._getCurrentSymbol();
                this._pushSymbol(currentSignature ? currentSignature.getParameterTypeAtIndex(iParam) : null);
            }
        }
        public postWalkParameterType() {
            if (this._canWalkStructure()) {
                this._popSymbol();
            }
        }

        // Get both kind of index signatures
        public getBothKindOfIndexSignatures(resolver: PullTypeResolver, context: PullTypeResolutionContext, includeAugmentedType: boolean) {
            if (this._canWalkStructure()) {
                var currentType = <PullTypeSymbol>this._getCurrentSymbol();
                if (currentType) {
                    return resolver._getBothKindsOfIndexSignatures(currentType, context, includeAugmentedType);
                }
            }
            return null;
        }

        // Walk index signature return type
        public walkIndexSignatureReturnType(indexSigInfo: IndexSignatureInfo, useStringIndexSignature: boolean,
            onlySignature?: boolean) {
            if (this._canWalkStructure()) {
                var indexSig = indexSigInfo ? (useStringIndexSignature ? indexSigInfo.stringSignature : indexSigInfo.numericSignature) : null;
                this._pushSymbol(indexSig);
                if (!onlySignature) {
                    this._pushSymbol(indexSig ? indexSig.returnType : null);
                }
            }
        }

        public postWalkIndexSignatureReturnType(onlySignature?: boolean) {
            if (this._canWalkStructure()) {
                if (!onlySignature) {
                    this._popSymbol(); // return type
                }
                this._popSymbol(); // index signature type
            }
        }

        // Reset the state of the enclosing type walker
        public resetEnclosingTypeWalkerState(): EnclosingTypeWalkerState {
            var currentState = this.enclosingTypeWalkerState;
            this.setDefaultTypeWalkerState();
            return currentState;
        }

        // Set new state of the enclosing type walker
        public setEnclosingTypeWalkerState(enclosingTypeWalkerState: EnclosingTypeWalkerState) {
            if (enclosingTypeWalkerState) {
                this.enclosingTypeWalkerState = enclosingTypeWalkerState;
            }
            else {
                // This could happend when the context didnt have existing type walker and hence resetEnclosingTypeWalkerState would have
                // saved the state as null, but now that we have walker, we want to set the state as default that is it isnt walking any enclosing type
                this.setDefaultTypeWalkerState();
            }
        }
    }
}