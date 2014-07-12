// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
///<reference path="..\typescript.ts" />

module TypeScript {
    export enum GenerativeTypeClassification {
        Unknown,
        Open,
        Closed,
        InfinitelyExpanding
    }

    export interface TypeArgumentMap {
        [n: number]: PullTypeSymbol;
    }

    // Type references and instantiated type references
    export class PullTypeReferenceSymbol extends PullTypeSymbol {
        public static createTypeReference(type: PullTypeSymbol): PullTypeReferenceSymbol {

            if (type.isTypeReference()) {
                return <PullTypeReferenceSymbol>type;
            }

            var typeReference = type.typeReference;

            if (!typeReference) {
                typeReference = new PullTypeReferenceSymbol(type);
                type.typeReference = typeReference;
            }

            return typeReference;
        }

        // use the root symbol to model the actual type
        // do not call this directly!
        constructor(public referencedTypeSymbol: PullTypeSymbol) {
            super(referencedTypeSymbol.name, referencedTypeSymbol.kind);

            Debug.assert(referencedTypeSymbol !== null, "Type root symbol may not be null");

            this.setRootSymbol(referencedTypeSymbol);

            this.typeReference = this;
        }

        public isTypeReference() {
            return true;
        }

        public isResolved = true;

        public setResolved() { }

        // do nothing on invalidate
        public setUnresolved(): void { }
        public invalidate(): void { }

        public ensureReferencedTypeIsResolved(): void {
            this._getResolver().resolveDeclaredSymbol(this.referencedTypeSymbol);
        }

        public getReferencedTypeSymbol(): PullTypeSymbol {
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol;
        }

        public _getResolver(): PullTypeResolver {
            return this.referencedTypeSymbol._getResolver();
        }

        // type symbol shims
        public hasMembers(): boolean {
            // no need to resolve first - members are collected during binding

            return this.referencedTypeSymbol.hasMembers();
        }

        public setAssociatedContainerType(type: PullTypeSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": setAssociatedContainerType");
        }

        public getAssociatedContainerType(): PullTypeSymbol {
            return this.referencedTypeSymbol.getAssociatedContainerType();
        }

        public getFunctionSymbol(): PullSymbol {
            // necessary because the function symbol may be set during type resolution to
            // facilitate doc comments
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.getFunctionSymbol();
        }
        public setFunctionSymbol(symbol: PullSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": setFunctionSymbol");
        }

        public addContainedNonMember(nonMember: PullSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addContainedNonMember");
        }
        public findContainedNonMemberContainer(containerName: string, kind = PullElementKind.None): PullTypeSymbol {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.findContainedNonMemberContainer(containerName, kind);
        }

        public addMember(memberSymbol: PullSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addMember");
        }
        public addEnclosedMemberType(enclosedType: PullTypeSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addEnclosedMemberType");
        }
        public addEnclosedMemberContainer(enclosedContainer: PullTypeSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addEnclosedMemberContainer");
        }
        public addEnclosedNonMember(enclosedNonMember: PullSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addEnclosedNonMember");
        }
        public addEnclosedNonMemberType(enclosedNonMemberType: PullTypeSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addEnclosedNonMemberType");
        }
        public addEnclosedNonMemberContainer(enclosedNonMemberContainer: PullTypeSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addEnclosedNonMemberContainer");
        }
        public addTypeParameter(typeParameter: PullTypeParameterSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addTypeParameter");
        }
        public addConstructorTypeParameter(typeParameter: PullTypeParameterSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addConstructorTypeParameter");
        }

        public findContainedNonMember(name: string): PullSymbol {
            // need to ensure the referenced type is resolved so we can find the non-member
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.findContainedNonMember(name);
        }

        public findContainedNonMemberType(typeName: string, kind = PullElementKind.None): PullTypeSymbol {
            // similar to the above, need to ensure that the type is resolved so we can introspect any
            // contained types
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.findContainedNonMemberType(typeName, kind);
        }

        public getMembers(): PullSymbol[]{
            // need to resolve the referenced types to get the members
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.getMembers();
        }

        public setHasDefaultConstructor(hasOne= true): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ":setHasDefaultConstructor");
        }
        public getHasDefaultConstructor(): boolean {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getHasDefaultConstructor();
        }
        public getConstructorMethod(): PullSymbol {
            // need to resolve so we don't accidentally substitute in a default constructor
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getConstructorMethod();
        }
        public setConstructorMethod(constructorMethod: PullSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": setConstructorMethod");
        }
        public getTypeParameters(): PullTypeParameterSymbol[]{
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getTypeParameters();
        }

        public isGeneric(): boolean {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.isGeneric();
        }

        public addSpecialization(specializedVersionOfThisType: PullTypeSymbol, substitutingTypes: PullTypeSymbol[]): void {
            //Debug.fail("Reference symbol " + this.pullSymbolIDString + ": addSpecialization");
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.addSpecialization(specializedVersionOfThisType, substitutingTypes);
        }
        public getSpecialization(substitutingTypes: PullTypeSymbol[]): PullTypeSymbol {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getSpecialization(substitutingTypes);
        }
        public getKnownSpecializations(): PullTypeSymbol[] {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getKnownSpecializations();
        }
        public getTypeArguments(): PullTypeSymbol[] {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getTypeArguments();
        }
        public getTypeArgumentsOrTypeParameters(): PullTypeSymbol[] {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getTypeArgumentsOrTypeParameters();
        }

        public appendCallSignature(callSignature: PullSignatureSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": appendCallSignature");
        }
        public insertCallSignatureAtIndex(callSignature: PullSignatureSymbol, index: number): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": insertCallSignatureAtIndex");
        }
        public appendConstructSignature(callSignature: PullSignatureSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": appendConstructSignature");
        }
        public insertConstructSignatureAtIndex(callSignature: PullSignatureSymbol, index: number): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": insertConstructSignatureAtIndex");
        }
        public addIndexSignature(indexSignature: PullSignatureSymbol): void {
            Debug.fail("Reference symbol " + this.pullSymbolID + ": addIndexSignature");
        }

        public hasOwnCallSignatures(): boolean {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.hasOwnCallSignatures();
        }
        public getCallSignatures(): PullSignatureSymbol[]{
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getCallSignatures();
        }
        public hasOwnConstructSignatures(): boolean {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.hasOwnConstructSignatures();
        }
        public getConstructSignatures(): PullSignatureSymbol[]{
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getConstructSignatures();
        }
        public hasOwnIndexSignatures(): boolean {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.hasOwnIndexSignatures();
        }
        public getIndexSignatures(): PullSignatureSymbol[]{
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getIndexSignatures();
        }

        public addImplementedType(implementedType: PullTypeSymbol): void {
            this.referencedTypeSymbol.addImplementedType(implementedType);
        }
        public getImplementedTypes(): PullTypeSymbol[] {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getImplementedTypes();
        }
        public addExtendedType(extendedType: PullTypeSymbol): void {
            this.referencedTypeSymbol.addExtendedType(extendedType);
        }
        public getExtendedTypes(): PullTypeSymbol[] {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getExtendedTypes();
        }
        public addTypeThatExtendsThisType(type: PullTypeSymbol): void {
            this.referencedTypeSymbol.addTypeThatExtendsThisType(type);
        }
        public getTypesThatExtendThisType(): PullTypeSymbol[] {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getTypesThatExtendThisType();
        }
        public addTypeThatExplicitlyImplementsThisType(type: PullTypeSymbol): void {
            this.referencedTypeSymbol.addTypeThatExplicitlyImplementsThisType(type);
        }
        public getTypesThatExplicitlyImplementThisType(): PullTypeSymbol[] {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.getTypesThatExplicitlyImplementThisType();
        }

        public isValidBaseKind(baseType: PullTypeSymbol, isExtendedType: boolean): boolean {
            this.ensureReferencedTypeIsResolved();
            return this.referencedTypeSymbol.isValidBaseKind(baseType, isExtendedType);
        }

        public findMember(name: string, lookInParent = true): PullSymbol {
            // ensure that the type is resolved before looking for members
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.findMember(name, lookInParent);
        }
        public findNestedType(name: string, kind = PullElementKind.None): PullTypeSymbol {
            // ensure that the type is resolved before looking for nested types
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.findNestedType(name, kind);
        }
        public findNestedContainer(name: string, kind = PullElementKind.None): PullTypeSymbol {
            // ensure that the type is resolved before looking for nested containers
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.findNestedContainer(name, kind);
        }
        public getAllMembers(searchDeclKind: PullElementKind, memberVisiblity: GetAllMembersVisiblity): PullSymbol[]{
            // ensure that the type is resolved before trying to collect all members
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.getAllMembers(searchDeclKind, memberVisiblity);
        }

        public findTypeParameter(name: string): PullTypeParameterSymbol {
            // ensure that the type is resolved before trying to look up a type parameter
            this.ensureReferencedTypeIsResolved();

            return this.referencedTypeSymbol.findTypeParameter(name);
        }

        /*
        public getNamePartForFullName(): string {
            return this.referencedTypeSymbol.getNamePartForFullName();
        }
        public getScopedName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string {
            return this.referencedTypeSymbol.getScopedName(scopeSymbol, useConstraintInName);
        }
        public isNamedTypeSymbol(): boolean {
            return this.referencedTypeSymbol.isNamedTypeSymbol();
        }

        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string {
            return this.referencedTypeSymbol.toString(scopeSymbol, useConstraintInName);
        }

        public getScopedNameEx(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, getPrettyTypeName?: boolean, getTypeParamMarkerInfo?: boolean): MemberName {
            return this.referencedTypeSymbol.getScopedNameEx(scopeSymbol, useConstraintInName, getPrettyTypeName, getTypeParamMarkerInfo);
        }
        */

        public hasOnlyOverloadCallSignatures(): boolean {
            // no need to resolve the referenced type - only computed during printing
            return this.referencedTypeSymbol.hasOnlyOverloadCallSignatures();
        }
    }

    export var nSpecializationsCreated = 0;
    export var nSpecializedSignaturesCreated = 0;  
    export var nSpecializedTypeParameterCreated = 0;

    export class PullInstantiatedTypeReferenceSymbol extends PullTypeReferenceSymbol {

        private _instantiatedMembers: PullSymbol[] = null;
        private _allInstantiatedMemberNameCache: { [name: string]: PullSymbol; } = null;
        private _instantiatedMemberNameCache = createIntrinsicsObject<PullSymbol>(); // cache from member names to pull symbols
        private _instantiatedCallSignatures: PullSignatureSymbol[] = null;
        private _instantiatedConstructSignatures: PullSignatureSymbol[] = null;
        private _instantiatedIndexSignatures: PullSignatureSymbol[] = null;
        private _typeArgumentReferences: PullTypeSymbol[] = undefined;
        private _instantiatedConstructorMethod: PullSymbol = null;
        private _instantiatedAssociatedContainerType: PullTypeSymbol = null;
        private _isArray:boolean = undefined;
        public getIsSpecialized() { return !this.isInstanceReferenceType; }

        private _generativeTypeClassification: GenerativeTypeClassification[] = [];

        public getGenerativeTypeClassification(enclosingType: PullTypeSymbol): GenerativeTypeClassification {
            // Generative type classification is available only on named type symbols
            if (!this.isNamedTypeSymbol()) {
                return GenerativeTypeClassification.Unknown;
            }

            var generativeTypeClassification = this._generativeTypeClassification[enclosingType.pullSymbolID] || GenerativeTypeClassification.Unknown;
            if (generativeTypeClassification === GenerativeTypeClassification.Unknown) {
                // With respect to the enclosing type, is this type reference open, closed or 
                // infinitely expanding?

                // Create a type parameter map for figuring out if the typeParameter wraps
                var typeParameters = enclosingType.getTypeParameters();
                var enclosingTypeParameterMap: PullTypeSymbol[] = [];
                for (var i = 0; i < typeParameters.length; i++) {
                    enclosingTypeParameterMap[typeParameters[i].pullSymbolID] = typeParameters[i];
                }

                var typeArguments = this.getTypeArguments();
                for (var i = 0; i < typeArguments.length; i++) {
                    // Spec section 3.8.7 Recursive Types:
                    // - A type reference without type arguments or with type arguments that do not reference 
                    //      any of G's type parameters is classified as a closed type reference.
                    // - A type reference that references any of G's type parameters in a type argument is 
                    //      classified as an open type reference.
                    if (typeArguments[i].wrapsSomeTypeParameter(enclosingTypeParameterMap, /*skipTypeArgumentCheck*/ true)) {
                        // This type wraps type parameter of the enclosing type so it is at least open
                        generativeTypeClassification = GenerativeTypeClassification.Open;
                        break;
                    }
                }

                // If the type reference is determined to be atleast open, determine if it is infinitely expanding
                if (generativeTypeClassification === GenerativeTypeClassification.Open) {
                    if (this.wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType)) {
                        generativeTypeClassification = GenerativeTypeClassification.InfinitelyExpanding;
                    }
                }
                else {
                    // This type doesnot wrap any type parameter from the enclosing type so it is closed
                    generativeTypeClassification = GenerativeTypeClassification.Closed;
                }

                this._generativeTypeClassification[enclosingType.pullSymbolID] = generativeTypeClassification;
            }

            return generativeTypeClassification;
        }

        // shims

        public isArrayNamedTypeReference(): boolean {
            if (this._isArray === undefined) {
                this._isArray = this.getRootSymbol().isArrayNamedTypeReference() || (this.getRootSymbol() === this._getResolver().getArrayNamedType());
            }
            return this._isArray;
        }

        public getElementType(): PullTypeSymbol {
            if (!this.isArrayNamedTypeReference()) {
                return null;
            }

            var typeArguments = this.getTypeArguments();
            return typeArguments ? typeArguments[0] : null;
        }

        public getReferencedTypeSymbol(): PullTypeSymbol {
            this.ensureReferencedTypeIsResolved();

            if (this.getIsSpecialized()) {
                return this;
            }

            return this.referencedTypeSymbol;
        }

        // The typeParameterArgumentMap parameter represents a mapping of PUllSymbolID strings of type parameters to type argument symbols
        // The instantiateFunctionTypeParameters parameter is set to true when a signature is being specialized at a call site, or if its
        // type parameters need to otherwise be specialized (say, during a type relationship check)
        public static create(resolver: PullTypeResolver, type: PullTypeSymbol, typeParameterArgumentMap: TypeArgumentMap): PullInstantiatedTypeReferenceSymbol {
            Debug.assert(resolver);

            // check for an existing instantiation

            // If the typeArgument map is going to change, we need to create copy so that 
            // we dont polute the map entry passed in by the caller. 
            // (eg. when getting the member type using enclosing types type argument map)
            var mutableTypeParameterMap = new PullInstantiationHelpers.MutableTypeArgumentMap(typeParameterArgumentMap);

            // if the type is already specialized, we need to create a new type argument map that represents 
            // the mapping of type arguments we've just received to type arguments as previously passed through
            // If we have below sample
            //interface IList<T> {
            //    owner: IList<IList<T>>;
            //}
            //class List<U> implements IList<U> {
            //    owner: IList<IList<U>>;
            //}
            //class List2<V> extends List<V> {
            //    owner: List2<List2<V>>;
            //}
            // When instantiating List<V> with U = V and trying to get owner property we would have the map that
            // says U = V, but when creating the IList<V> we want to updates its type argument maps to say T = V because 
            // IList<T>  would now be instantiated with V
            PullInstantiationHelpers.instantiateTypeArgument(resolver, type, mutableTypeParameterMap);

            // Lookup in cache if this specialization already exists
            var rootType = <PullTypeSymbol>type.getRootSymbol();
            var instantiation = <PullInstantiatedTypeReferenceSymbol>rootType.getSpecialization(mutableTypeParameterMap.typeParameterArgumentMap);
            if (instantiation) {
                return instantiation;
            }

            // In any type, typeparameter map should only contain information about the allowed to reference type parameters 
            // so remove unnecessary entries that are outside these scope, eg. from above sample we need to remove entry U = V
            // and keep only T = V
            PullInstantiationHelpers.cleanUpTypeArgumentMap(type, mutableTypeParameterMap);
            typeParameterArgumentMap = mutableTypeParameterMap.typeParameterArgumentMap;

            // If the reference is made to itself (e.g., referring to Array<T> within the declaration of Array<T>,
            // We want to special-case the reference so later calls to getMember, etc., will delegate directly
            // to the referenced declaration type, and not force any additional instantiation
            var isInstanceReferenceType = (type.kind & PullElementKind.SomeInstantiatableType) != 0;
            var resolvedTypeParameterArgumentMap = typeParameterArgumentMap;
            if (isInstanceReferenceType) {
                var typeParameters = rootType.getTypeParameters();
                for (var i = 0; i < typeParameters.length; i++) {
                    if (!PullHelpers.typeSymbolsAreIdentical(typeParameters[i], typeParameterArgumentMap[typeParameters[i].pullSymbolID])) {
                        isInstanceReferenceType = false;
                        break;
                    }
                }

                if (isInstanceReferenceType) {
                    typeParameterArgumentMap = [];
                }
            }

            // Create the type using typeArgument map
            instantiation = new PullInstantiatedTypeReferenceSymbol(rootType, typeParameterArgumentMap, isInstanceReferenceType);

            // Store in the cache
            rootType.addSpecialization(instantiation, resolvedTypeParameterArgumentMap);

            return instantiation;
        }

        constructor(public referencedTypeSymbol: PullTypeSymbol, private _typeParameterArgumentMap: TypeArgumentMap,
            public isInstanceReferenceType: boolean) {
            super(referencedTypeSymbol);

            nSpecializationsCreated++;
        }

        public isGeneric(): boolean {
            return (<PullTypeSymbol>this.getRootSymbol()).isGeneric();
        }

        public getTypeParameterArgumentMap(): TypeArgumentMap {
            return this._typeParameterArgumentMap;
        }

        public getTypeArguments(): PullTypeSymbol[]{

            if (this.isInstanceReferenceType) {
                return this.getTypeParameters();
            }

            if (this._typeArgumentReferences === undefined) {
                var typeParameters = this.referencedTypeSymbol.getTypeParameters();

                if (typeParameters.length) {
                    var typeArgument: PullTypeSymbol = null;
                    var typeArguments: PullTypeSymbol[] = [];

                    for (var i = 0; i < typeParameters.length; i++) {
                        typeArgument = <PullTypeSymbol>this._typeParameterArgumentMap[typeParameters[i].pullSymbolID];

                        if (!typeArgument) {
                            Debug.fail("type argument count mismatch");
                        }

                        if (typeArgument) {
                            typeArguments[typeArguments.length] = typeArgument;
                        }
                    }

                    this._typeArgumentReferences = typeArguments;
                }
                else {
                    this._typeArgumentReferences = null;
                }
            }

            return this._typeArgumentReferences;
        }
        
        public getTypeArgumentsOrTypeParameters() {
            return this.getTypeArguments();
        }


        private populateInstantiatedMemberFromReferencedMember(referencedMember: PullSymbol) {
            var instantiatedMember: PullSymbol;
            PullHelpers.resolveDeclaredSymbolToUseType(referencedMember);

            // if the member does not require further specialization, re-use the referenced symbol
            if (!referencedMember.type.wrapsSomeTypeParameter(this._typeParameterArgumentMap)) {
                instantiatedMember = referencedMember;
            }
            else {
                instantiatedMember = new PullSymbol(referencedMember.name, referencedMember.kind);
                instantiatedMember.setRootSymbol(referencedMember);
                instantiatedMember.type = this._getResolver().instantiateType(referencedMember.type, this._typeParameterArgumentMap);
                instantiatedMember.isOptional = referencedMember.isOptional;
            }
            this._instantiatedMemberNameCache[instantiatedMember.name] = instantiatedMember;
        }

        //
        // lazily evaluated members
        //
        public getMembers(): PullSymbol[] {
            // need to resolve the referenced types to get the members
            this.ensureReferencedTypeIsResolved();

            if (this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.getMembers();
            }

            // for each of the referenced type's members, need to properly instantiate their
            // type references
            if (!this._instantiatedMembers) {
                var referencedMembers = this.referencedTypeSymbol.getMembers();
                var referencedMember: PullSymbol = null;
                var instantiatedMember: PullSymbol = null;

                this._instantiatedMembers = [];

                for (var i = 0; i < referencedMembers.length; i++) {
                    referencedMember = referencedMembers[i];

                    this._getResolver().resolveDeclaredSymbol(referencedMember);

                    if (!this._instantiatedMemberNameCache[referencedMember.name]) {
                        this.populateInstantiatedMemberFromReferencedMember(referencedMember);
                    }
                    
                    this._instantiatedMembers[this._instantiatedMembers.length] = this._instantiatedMemberNameCache[referencedMember.name];
                }
            }

            return this._instantiatedMembers;
        }

        public findMember(name: string, lookInParent = true): PullSymbol {
            // ensure that the type is resolved before looking for members
            this.ensureReferencedTypeIsResolved();

            if (this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.findMember(name, lookInParent);
            }

            // if the member exists on the referenced type, need to ensure that it's
            // instantiated

            var memberSymbol = <PullSymbol>this._instantiatedMemberNameCache[name];

            if (!memberSymbol) {
                var referencedMemberSymbol = this.referencedTypeSymbol.findMember(name, lookInParent);

                if (referencedMemberSymbol) {
                    this.populateInstantiatedMemberFromReferencedMember(referencedMemberSymbol);
                    memberSymbol = <PullSymbol>this._instantiatedMemberNameCache[name];
                }
                else {
                    memberSymbol = null;
                }
            }

            return memberSymbol;
        }

        // May need to cache based on search kind / visibility combinations
        public getAllMembers(searchDeclKind: PullElementKind, memberVisiblity: GetAllMembersVisiblity): PullSymbol[]{

            // ensure that the type is resolved before trying to collect all members
            this.ensureReferencedTypeIsResolved();

            if (this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.getAllMembers(searchDeclKind, memberVisiblity);
            }

            var requestedMembers: PullSymbol[] = [];
            var allReferencedMembers = this.referencedTypeSymbol.getAllMembers(searchDeclKind, memberVisiblity);

            if (!this._allInstantiatedMemberNameCache) {
                this._allInstantiatedMemberNameCache = createIntrinsicsObject<PullSymbol>();

                // first, seed with this type's members
                var members = this.getMembers();

                for (var i = 0; i < members.length; i++) {
                    this._allInstantiatedMemberNameCache[members[i].name] = members[i];
                }
            }

            // next, for add any symbols belonging to the parent type, if necessary
            var referencedMember: PullSymbol = null;
            var requestedMember: PullSymbol = null;

            for (var i = 0; i < allReferencedMembers.length; i++) {
                referencedMember = allReferencedMembers[i];

                this._getResolver().resolveDeclaredSymbol(referencedMember);

                if (this._allInstantiatedMemberNameCache[referencedMember.name]) {
                    requestedMembers[requestedMembers.length] = this._allInstantiatedMemberNameCache[referencedMember.name];
                }
                else {
                    if (!referencedMember.type.wrapsSomeTypeParameter(this._typeParameterArgumentMap)) {
                        this._allInstantiatedMemberNameCache[referencedMember.name] = referencedMember;
                        requestedMembers[requestedMembers.length] = referencedMember;
                    }
                    else {
                        requestedMember = new PullSymbol(referencedMember.name, referencedMember.kind);
                        requestedMember.setRootSymbol(referencedMember);

                        requestedMember.type = this._getResolver().instantiateType(referencedMember.type, this._typeParameterArgumentMap);
                        requestedMember.isOptional = referencedMember.isOptional;

                        this._allInstantiatedMemberNameCache[requestedMember.name] = requestedMember;
                        requestedMembers[requestedMembers.length] = requestedMember;
                    }
                }
            }
            
            return requestedMembers;
        }

        public getConstructorMethod(): PullSymbol {

            if (this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.getConstructorMethod();
            }

            if (!this._instantiatedConstructorMethod) {
                var referencedConstructorMethod = this.referencedTypeSymbol.getConstructorMethod();
                this._instantiatedConstructorMethod = new PullSymbol(referencedConstructorMethod.name, referencedConstructorMethod.kind);
                this._instantiatedConstructorMethod.setRootSymbol(referencedConstructorMethod);
                this._instantiatedConstructorMethod.setResolved();

                this._instantiatedConstructorMethod.type = PullInstantiatedTypeReferenceSymbol.create(this._getResolver(), referencedConstructorMethod.type, this._typeParameterArgumentMap);
            }


            return this._instantiatedConstructorMethod;
        }

        public getAssociatedContainerType(): PullTypeSymbol {

            if (!this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.getAssociatedContainerType();
            }

            if (!this._instantiatedAssociatedContainerType) {
                var referencedAssociatedContainerType = this.referencedTypeSymbol.getAssociatedContainerType();

                if (referencedAssociatedContainerType) {
                    this._instantiatedAssociatedContainerType = PullInstantiatedTypeReferenceSymbol.create(this._getResolver(), referencedAssociatedContainerType, this._typeParameterArgumentMap);
                }
            }

            return this._instantiatedAssociatedContainerType;
        }

        public getCallSignatures(): PullSignatureSymbol[]{
            this.ensureReferencedTypeIsResolved();

            if (this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.getCallSignatures();
            }

            if (this._instantiatedCallSignatures) {
                return this._instantiatedCallSignatures;
            }

            var referencedCallSignatures = this.referencedTypeSymbol.getCallSignatures();
            this._instantiatedCallSignatures = [];

            for (var i = 0; i < referencedCallSignatures.length; i++) {
                this._getResolver().resolveDeclaredSymbol(referencedCallSignatures[i]);

                if (!referencedCallSignatures[i].wrapsSomeTypeParameter(this._typeParameterArgumentMap)) {
                    this._instantiatedCallSignatures[this._instantiatedCallSignatures.length] = referencedCallSignatures[i];
                }
                else {
                    this._instantiatedCallSignatures[this._instantiatedCallSignatures.length] = this._getResolver().instantiateSignature(referencedCallSignatures[i], this._typeParameterArgumentMap);
                    this._instantiatedCallSignatures[this._instantiatedCallSignatures.length - 1].functionType = this;
                }
            }

            return this._instantiatedCallSignatures;
        }

        public getConstructSignatures(): PullSignatureSymbol[]{
            this.ensureReferencedTypeIsResolved();

            if (this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.getConstructSignatures();
            }

            if (this._instantiatedConstructSignatures) {
                return this._instantiatedConstructSignatures;
            }

            var referencedConstructSignatures = this.referencedTypeSymbol.getConstructSignatures();
            this._instantiatedConstructSignatures = [];

            for (var i = 0; i < referencedConstructSignatures.length; i++) {
                this._getResolver().resolveDeclaredSymbol(referencedConstructSignatures[i]);

                if (!referencedConstructSignatures[i].wrapsSomeTypeParameter(this._typeParameterArgumentMap)) {
                    this._instantiatedConstructSignatures[this._instantiatedConstructSignatures.length] = referencedConstructSignatures[i];
                }
                else {
                    this._instantiatedConstructSignatures[this._instantiatedConstructSignatures.length] = this._getResolver().instantiateSignature(referencedConstructSignatures[i], this._typeParameterArgumentMap);
                    this._instantiatedConstructSignatures[this._instantiatedConstructSignatures.length - 1].functionType = this;
                }
            }

            return this._instantiatedConstructSignatures;
        }

        public getIndexSignatures(): PullSignatureSymbol[]{
            this.ensureReferencedTypeIsResolved();

            if (this.isInstanceReferenceType) {
                return this.referencedTypeSymbol.getIndexSignatures();
            }

            if (this._instantiatedIndexSignatures) {
                return this._instantiatedIndexSignatures;
            }

            var referencedIndexSignatures = this.referencedTypeSymbol.getIndexSignatures();
            this._instantiatedIndexSignatures = [];

            for (var i = 0; i < referencedIndexSignatures.length; i++) {
                this._getResolver().resolveDeclaredSymbol(referencedIndexSignatures[i]);

                if (!referencedIndexSignatures[i].wrapsSomeTypeParameter(this._typeParameterArgumentMap)) {
                    this._instantiatedIndexSignatures[this._instantiatedIndexSignatures.length] = referencedIndexSignatures[i];
                }
                else {
                    this._instantiatedIndexSignatures[this._instantiatedIndexSignatures.length] = this._getResolver().instantiateSignature(referencedIndexSignatures[i], this._typeParameterArgumentMap);
                    this._instantiatedIndexSignatures[this._instantiatedIndexSignatures.length - 1].functionType = this;
                }
            }

            return this._instantiatedIndexSignatures;
        }
    }

    export class PullInstantiatedSignatureSymbol extends PullSignatureSymbol {
        public getTypeParameterArgumentMap(): TypeArgumentMap{
            return this._typeParameterArgumentMap;
        }

        constructor(rootSignature: PullSignatureSymbol, private _typeParameterArgumentMap: TypeArgumentMap) {
            super(rootSignature.kind, rootSignature.isDefinition());
            this.setRootSymbol(rootSignature);
            nSpecializedSignaturesCreated++;
            
            // Store in the cache
            rootSignature.addSpecialization(this, _typeParameterArgumentMap);
        }

        public getIsSpecialized() { return true; }

        public _getResolver(): PullTypeResolver {
            return this.getRootSymbol()._getResolver();
        }

        public getTypeParameters(): PullTypeParameterSymbol[]{
            if (!this._typeParameters) {
                var rootSymbol = <PullSignatureSymbol>this.getRootSymbol();
                var typeParameters = rootSymbol.getTypeParameters();
                var hasInstantiatedTypeParametersOfThisSignature = ArrayUtilities.all(typeParameters, typeParameter =>
                    this._typeParameterArgumentMap[typeParameter.pullSymbolID] !== undefined);

                if (!hasInstantiatedTypeParametersOfThisSignature && typeParameters.length) {
                    // Type parameteres are the instantiated version of the rootTypeparmeters with our own type parameter argument map
                    this._typeParameters = [];
                    for (var i = 0; i < typeParameters.length; i++) {
                        this._typeParameters[this._typeParameters.length] = this._getResolver().instantiateTypeParameter(typeParameters[i], this._typeParameterArgumentMap);
                    }
                }
                else {
                    this._typeParameters = sentinelEmptyArray;
                }
            }

            return this._typeParameters;
        }

        public getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[] {
            var rootSymbol = <PullSignatureSymbol>this.getRootSymbol();
            return rootSymbol.getAllowedToReferenceTypeParameters();
        }
    }

    // Instantiated type parameter symbol is the type parameter with the instantiated version of the constraint
    export class PullInstantiatedTypeParameterSymbol extends PullTypeParameterSymbol {
        constructor(rootTypeParameter: PullTypeSymbol, constraintType: PullTypeSymbol) {
            super(rootTypeParameter.name);
            nSpecializedTypeParameterCreated++;

            this.setRootSymbol(rootTypeParameter);
            this.setConstraint(constraintType);

            // Store in the cache
            rootTypeParameter.addSpecialization(this, [constraintType]);
        }

        public _getResolver(): PullTypeResolver {
            return this.getRootSymbol()._getResolver();
        }
   }
}