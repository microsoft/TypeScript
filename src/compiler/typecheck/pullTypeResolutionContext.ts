// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {
    export class CandidateInferenceInfo {
        public typeParameter: PullTypeParameterSymbol = null;
        public _inferredTypeAfterFixing: PullTypeSymbol = null;
        public inferenceCandidates: PullTypeSymbol[] = [];

        public addCandidate(candidate: PullTypeSymbol) {
            if (!this._inferredTypeAfterFixing) {
                this.inferenceCandidates[this.inferenceCandidates.length] = candidate;
            }
        }

        public isFixed() {
            return !!this._inferredTypeAfterFixing;
        }

        public fixTypeParameter(resolver: PullTypeResolver, context: PullTypeResolutionContext): void {
            if (!this._inferredTypeAfterFixing) {
                // November 18, 2013: Section 4.12.2:
                // The inferred type argument for a particular type parameter is the widened form
                // (section 3.9) of the best common type(section 3.10) of a set of candidate types.
                var collection = {
                    getLength: () => this.inferenceCandidates.length,
                    getTypeAtIndex: (index: number) => this.inferenceCandidates[index].type
                };

                // Now widen (per the spec citation above)
                var bestCommonType = resolver.findBestCommonType(collection, context, new TypeComparisonInfo());
                this._inferredTypeAfterFixing = bestCommonType.widenedType(resolver, /*ast*/ null, context);
            }
        }
    }

    export class TypeArgumentInferenceContext {
        public inferenceCache: IBitMatrix = BitMatrix.getBitMatrix(/*allowUndefinedValues:*/ false);
        public candidateCache: CandidateInferenceInfo[] = [];

        constructor(public resolver: PullTypeResolver, public context: PullTypeResolutionContext, public signatureBeingInferred: PullSignatureSymbol) {
            var typeParameters = signatureBeingInferred.getTypeParameters();
            for (var i = 0; i < typeParameters.length; i++) {
                this.addInferenceRoot(typeParameters[i]);
            }
        }

        public alreadyRelatingTypes(objectType: PullTypeSymbol, parameterType: PullTypeSymbol) {
            if (this.inferenceCache.valueAt(objectType.pullSymbolID, parameterType.pullSymbolID)) {
                return true;
            }
            else {
                this.inferenceCache.setValueAt(objectType.pullSymbolID, parameterType.pullSymbolID, true);
                return false;
            }
        }

        public resetRelationshipCache() {
            this.inferenceCache.release();
            this.inferenceCache = BitMatrix.getBitMatrix(/*allowUndefinedValues:*/ false);
        }

        public addInferenceRoot(param: PullTypeParameterSymbol) {
            var info = this.candidateCache[param.pullSymbolID];

            if (!info) {
                info = new CandidateInferenceInfo();
                info.typeParameter = param;
                this.candidateCache[param.pullSymbolID] = info;
            }
        }

        public getInferenceInfo(param: PullTypeParameterSymbol): CandidateInferenceInfo {
            return this.candidateCache[param.pullSymbolID];
        }

        public addCandidateForInference(param: PullTypeParameterSymbol, candidate: PullTypeSymbol) {
            var info = this.getInferenceInfo(param);

            // Add the candidate to the CandidateInferenceInfo for this type parameter
            // only if the candidate is not already present.
            if (info && candidate && info.inferenceCandidates.indexOf(candidate) < 0) {
                info.addCandidate(candidate);
            }
        }

        public inferTypeArguments(): PullTypeSymbol[] {
            throw Errors.abstract();
        }

        public fixTypeParameter(typeParameter: PullTypeParameterSymbol) {
            var candidateInfo = this.candidateCache[typeParameter.pullSymbolID];
            if (candidateInfo) {
                candidateInfo.fixTypeParameter(this.resolver, this.context);
            }
        }

        public _finalizeInferredTypeArguments(): PullTypeSymbol[]{
            var results: PullTypeSymbol[] = [];
            var typeParameters = this.signatureBeingInferred.getTypeParameters();
            for (var i = 0; i < typeParameters.length; i++) {
                var info = this.candidateCache[typeParameters[i].pullSymbolID];

                info.fixTypeParameter(this.resolver, this.context);

                // is there already a substitution for this type?
                for (var i = 0; i < results.length; i++) {
                    if (results[i].type === info.typeParameter) {
                        results[i].type = info._inferredTypeAfterFixing;
                    }
                }

                results.push(info._inferredTypeAfterFixing);
            }

            return results;
        }

        public isInvocationInferenceContext(): boolean {
            throw Errors.abstract();
        }
    }

    export class InvocationTypeArgumentInferenceContext extends TypeArgumentInferenceContext {
        constructor(
            resolver: PullTypeResolver,
            context: PullTypeResolutionContext,
            signatureBeingInferred: PullSignatureSymbol,
            public argumentASTs: ISeparatedSyntaxList2) {
            super(resolver, context, signatureBeingInferred);
        }

        public isInvocationInferenceContext() {
            return true;
        }

        public inferTypeArguments(): PullTypeSymbol[] {
            // Resolve all of the argument ASTs in the callback
            this.signatureBeingInferred.forAllParameterTypes(/*length*/ this.argumentASTs.nonSeparatorCount(), (parameterType, argumentIndex) => {
                var argumentAST = this.argumentASTs.nonSeparatorAt(argumentIndex);

                this.context.pushInferentialType(parameterType, this);
                var argumentType = this.resolver.resolveAST(argumentAST, /*isContextuallyTyped*/ true, this.context).type;
                this.resolver.relateTypeToTypeParametersWithNewEnclosingTypes(argumentType, parameterType, this, this.context);
                this.context.popAnyContextualType();

                return true; // Continue iterating
            });

            return this._finalizeInferredTypeArguments();
        }
    }

    export class ContextualSignatureInstantiationTypeArgumentInferenceContext extends TypeArgumentInferenceContext {
        // for the shouldFixContextualSignatureParameterTypes flag, pass true during inferential typing
        // and false during signature relation checking
        constructor(
            resolver: PullTypeResolver,
            context: PullTypeResolutionContext,
            signatureBeingInferred: PullSignatureSymbol,
            private contextualSignature: PullSignatureSymbol,
            private shouldFixContextualSignatureParameterTypes: boolean) {
            super(resolver, context, signatureBeingInferred);
        }

        public isInvocationInferenceContext() {
            return false;
        }

        public inferTypeArguments(): PullTypeSymbol[] {
            // We are in contextual signature instantiation. This callback will be executed
            // for each parameter we are trying to relate in order to infer type arguments.
            var relateTypesCallback = (parameterTypeBeingInferred: PullTypeSymbol, contextualParameterType: PullTypeSymbol) => {
                if (this.shouldFixContextualSignatureParameterTypes) {
                    // Need to modify the callback to cause fixing. Per spec section 4.12.2
                    // 4th bullet of inferential typing:
                    // ... then any inferences made for type parameters referenced by the
                    // parameters of T's call signature are fixed
                    // (T here is the contextual signature)
                    contextualParameterType = this.context.fixAllTypeParametersReferencedByType(contextualParameterType, this.resolver, this);
                }
                this.resolver.relateTypeToTypeParametersWithNewEnclosingTypes(contextualParameterType, parameterTypeBeingInferred, this, this.context);

                return true; // continue iterating
            };

            this.signatureBeingInferred.forAllCorrespondingParameterTypesInThisAndOtherSignature(this.contextualSignature, relateTypesCallback);

            return this._finalizeInferredTypeArguments();
        }
    }

    export class PullContextualTypeContext {
        public provisionallyTypedSymbols: PullSymbol[] = [];
        public hasProvisionalErrors = false;
        private astSymbolMap: PullSymbol[] = [];

        constructor(public contextualType: PullTypeSymbol,
            public provisional: boolean,
            public isInferentiallyTyping: boolean,
            public typeArgumentInferenceContext: TypeArgumentInferenceContext) { }

        public recordProvisionallyTypedSymbol(symbol: PullSymbol) {
            this.provisionallyTypedSymbols[this.provisionallyTypedSymbols.length] = symbol;
        }

        public invalidateProvisionallyTypedSymbols() {
            for (var i = 0; i < this.provisionallyTypedSymbols.length; i++) {
                this.provisionallyTypedSymbols[i].setUnresolved();
            }
        }

        public setSymbolForAST(ast: AST, symbol: PullSymbol): void {
            this.astSymbolMap[ast.syntaxID()] = symbol;
        }

        public getSymbolForAST(ast: AST): PullSymbol {
            return this.astSymbolMap[ast.syntaxID()];
        }
    }

    export class PullTypeResolutionContext {
        private contextStack: PullContextualTypeContext[] = [];
        private typeCheckedNodes: IBitVector = null;
        private enclosingTypeWalker1: PullTypeEnclosingTypeWalker = null;
        private enclosingTypeWalker2: PullTypeEnclosingTypeWalker = null;

        constructor(private resolver: PullTypeResolver, public inTypeCheck = false, public fileName: string = null) {
            if (inTypeCheck) {
                Debug.assert(fileName, "A file name must be provided if you are typechecking");
                this.typeCheckedNodes = BitVector.getBitVector(/*allowUndefinedValues:*/ false);
            }
        }

        public setTypeChecked(ast: AST): void {
            if (!this.inProvisionalResolution()) {
                this.typeCheckedNodes.setValueAt(ast.syntaxID(), true);
            }
        }

        public canTypeCheckAST(ast: AST): boolean {
            // If we're in a context where we're type checking, and the ast we're typechecking
            // hasn't been typechecked in this phase yet, *and* the ast is from the file we're
            // currently typechecking, then we can typecheck.
            //
            // If the ast has been typechecked in this phase, then there's no need to typecheck
            // it again.  Also, if it's from another file, there's no need to typecheck it since
            // whatever host we're in will eventually get around to typechecking it.  This is 
            // also important as it's very possible to stack overflow when typechecking if we 
            // keep jumping around to AST nodes all around a large project.
            return this.typeCheck() &&
                !this.typeCheckedNodes.valueAt(ast.syntaxID()) &&
                this.fileName === ast.fileName();
        }

        private _pushAnyContextualType(type: PullTypeSymbol, provisional: boolean, isInferentiallyTyping: boolean, argContext: TypeArgumentInferenceContext) {
            this.contextStack.push(new PullContextualTypeContext(type, provisional, isInferentiallyTyping, argContext));
        }

        // Use this to push any kind of contextual type if it is NOT propagated inward from a parent
        // contextual type. This corresponds to the first series of bullets in Section 4.19 of the spec.
        public pushNewContextualType(type: PullTypeSymbol) {
            this._pushAnyContextualType(type, this.inProvisionalResolution(), /*isInferentiallyTyping*/ false, null);
        }

        // Use this when propagating a contextual type from a parent contextual type to a subexpression.
        // This corresponds to the second series of bullets in section 4.19 of the spec.
        public propagateContextualType(type: PullTypeSymbol) {
            this._pushAnyContextualType(type, this.inProvisionalResolution(), this.isInferentiallyTyping(), this.getCurrentTypeArgumentInferenceContext());
        }

        // Use this if you are trying to infer type arguments.
        public pushInferentialType(type: PullTypeSymbol, typeArgumentInferenceContext: TypeArgumentInferenceContext) {
            this._pushAnyContextualType(type, /*provisional*/ true, /*isInferentiallyTyping*/ true, typeArgumentInferenceContext);
        }

        // Use this if you are trying to choose an overload and are trying a contextual type.
        public pushProvisionalType(type: PullTypeSymbol) {
            this._pushAnyContextualType(type, /*provisional*/ true, /*isInferentiallyTyping*/ false, null);
        }

        // Use this to pop any kind of contextual type
        public popAnyContextualType(): PullContextualTypeContext {
            var tc = this.contextStack.pop();

            tc.invalidateProvisionallyTypedSymbols();

            // If the context we just popped off had provisional errors, and we are *still* in a provisional context,
            // we need to not forget that we had provisional errors in a deeper context. We do this by setting the 
            // hasProvisioanlErrors flag on the now top context on the stack. 
            if (tc.hasProvisionalErrors && this.inProvisionalResolution()) {
                this.contextStack[this.contextStack.length - 1].hasProvisionalErrors = true;
            }

            return tc;
        }

        public hasProvisionalErrors() {
            return this.contextStack.length ? this.contextStack[this.contextStack.length - 1].hasProvisionalErrors : false;
        }

        // Gets the current contextual or inferential type
        public getContextualType(): PullTypeSymbol {
            var context = !this.contextStack.length ? null : this.contextStack[this.contextStack.length - 1];
            
            if (context) {
                var type = context.contextualType;

                if (!type) {
                    return null;
                }

                return type;
            }

            return null;
        }

        public fixAllTypeParametersReferencedByType(type: PullTypeSymbol, resolver: PullTypeResolver, argContext?: TypeArgumentInferenceContext): PullTypeSymbol {
            var argContext = this.getCurrentTypeArgumentInferenceContext();
            if (type.wrapsSomeTypeParameter(argContext.candidateCache)) {
                // Build up a type parameter argument map with which we will instantiate this type
                // after fixing type parameters
                var typeParameterArgumentMap: PullTypeSymbol[] = [];
                // Iterate over all the type parameters and fix any one that is wrapped
                for (var n in argContext.candidateCache) {
                    var typeParameter = argContext.candidateCache[n] && argContext.candidateCache[n].typeParameter;
                    if (typeParameter) {
                        var dummyMap: PullTypeSymbol[] = [];
                        dummyMap[typeParameter.pullSymbolID] = typeParameter;
                        if (type.wrapsSomeTypeParameter(dummyMap)) {
                            argContext.fixTypeParameter(typeParameter);
                            Debug.assert(argContext.candidateCache[n]._inferredTypeAfterFixing);
                            typeParameterArgumentMap[typeParameter.pullSymbolID] = argContext.candidateCache[n]._inferredTypeAfterFixing;
                        }
                    }
                }

                return resolver.instantiateType(type, typeParameterArgumentMap);
            }

            return type;
        }

        // If we are not in inferential typing, this will return null
        private getCurrentTypeArgumentInferenceContext() {
            return this.contextStack.length
                ? this.contextStack[this.contextStack.length - 1].typeArgumentInferenceContext
                : null;
        }

        public isInferentiallyTyping(): boolean {
            return this.contextStack.length > 0 && this.contextStack[this.contextStack.length - 1].isInferentiallyTyping;
        }

        public inProvisionalResolution() {
            return (!this.contextStack.length ? false : this.contextStack[this.contextStack.length - 1].provisional);
        }

        private inBaseTypeResolution = false;

        public isInBaseTypeResolution() { return this.inBaseTypeResolution; }

        public startBaseTypeResolution() {
            var wasInBaseTypeResoltion = this.inBaseTypeResolution;
            this.inBaseTypeResolution = true;
            return wasInBaseTypeResoltion;
        }

        public doneBaseTypeResolution(wasInBaseTypeResolution: boolean) {
            this.inBaseTypeResolution = wasInBaseTypeResolution;
        }

        public setTypeInContext(symbol: PullSymbol, type: PullTypeSymbol) {
            // if type of symbol was already determined and it is error - do not replace it with something else
            // otherwise it might cause problems in cases like:
            // var bar: foo;
            // class bar {}
            // class foo {}
            // Symbol for variable bar will get created first, then after binding class constructor of class bar conflict will be detected and symbol.type will be set to error.
            // Later after binding type reference 'foo', symbol.type (that is now 'error') will be incorrectly replace with 'foo'.
            // Since this symbol shared between explicit variable declaration and implicit variable for class constructor 
            // we now ended up in situation where class constructor for 'baz' is type reference to 'foo' which is wrong.
            if (symbol.type && symbol.type.isError() && !type.isError()) {
                return;
            }
            symbol.type = type;

            if (this.contextStack.length && this.inProvisionalResolution()) {
                this.contextStack[this.contextStack.length - 1].recordProvisionallyTypedSymbol(symbol);
            }
        }

        public postDiagnostic(diagnostic: Diagnostic): void {
            if (diagnostic) {
                if (this.inProvisionalResolution()) {
                    (this.contextStack[this.contextStack.length - 1]).hasProvisionalErrors = true;
                }
                else if (this.inTypeCheck && this.resolver) {
                    this.resolver.semanticInfoChain.addDiagnostic(diagnostic);
                }
            }
        }

        public typeCheck() {
            return this.inTypeCheck && !this.inProvisionalResolution();
        }

        public setSymbolForAST(ast: AST, symbol: PullSymbol): void {
            this.contextStack[this.contextStack.length - 1].setSymbolForAST(ast, symbol);
        }

        public getSymbolForAST(ast: AST): PullSymbol {
            for (var i = this.contextStack.length - 1; i >= 0; i--) {
                var typeContext = this.contextStack[i];
                if (!typeContext.provisional) {
                    // Only provisional contexts have caches
                    break;
                }

                var symbol = typeContext.getSymbolForAST(ast);
                if (symbol) {
                    return symbol;
                }
            }

            return null;
        }

        public startWalkingTypes(symbol1: PullTypeSymbol, symbol2: PullTypeSymbol) {
            if (!this.enclosingTypeWalker1) {
                this.enclosingTypeWalker1 = new PullTypeEnclosingTypeWalker();
            }
            var stateWhenStartedWalkingTypes1 = this.enclosingTypeWalker1.startWalkingType(symbol1);
            if (!this.enclosingTypeWalker2) {
                this.enclosingTypeWalker2 = new PullTypeEnclosingTypeWalker();
            }
            var stateWhenStartedWalkingTypes2 = this.enclosingTypeWalker2.startWalkingType(symbol2);            
            return {
                stateWhenStartedWalkingTypes1: stateWhenStartedWalkingTypes1,
                stateWhenStartedWalkingTypes2: stateWhenStartedWalkingTypes2
            };
        }

        public endWalkingTypes(statesWhenStartedWalkingTypes: {
            stateWhenStartedWalkingTypes1: EnclosingTypeWalkerState;
            stateWhenStartedWalkingTypes2: EnclosingTypeWalkerState;
        }) {
            this.enclosingTypeWalker1.endWalkingType(statesWhenStartedWalkingTypes.stateWhenStartedWalkingTypes1);
            this.enclosingTypeWalker2.endWalkingType(statesWhenStartedWalkingTypes.stateWhenStartedWalkingTypes2);
        }

        public setEnclosingTypeForSymbols(symbol1: PullSymbol, symbol2: PullSymbol) {
            if (!this.enclosingTypeWalker1) {
                this.enclosingTypeWalker1 = new PullTypeEnclosingTypeWalker();
            }
            var enclosingTypeWalkerState1  = this.enclosingTypeWalker1.setEnclosingTypeForSymbol(symbol1);
            if (!this.enclosingTypeWalker2) {
                this.enclosingTypeWalker2 = new PullTypeEnclosingTypeWalker();
            }
            var enclosingTypeWalkerState2 = this.enclosingTypeWalker2.setEnclosingTypeForSymbol(symbol2);
            return {
                enclosingTypeWalkerState1: enclosingTypeWalkerState1,
                enclosingTypeWalkerState2: enclosingTypeWalkerState2
            }
        }

        public walkMemberTypes(memberName: string) {
            this.enclosingTypeWalker1.walkMemberType(memberName, this.resolver);
            this.enclosingTypeWalker2.walkMemberType(memberName, this.resolver);
        }

        public postWalkMemberTypes() {
            this.enclosingTypeWalker1.postWalkMemberType();
            this.enclosingTypeWalker2.postWalkMemberType();
        }

        public walkSignatures(kind: PullElementKind, index: number, index2?: number) {
            this.enclosingTypeWalker1.walkSignature(kind, index);
            this.enclosingTypeWalker2.walkSignature(kind, index2 == undefined ? index : index2);
        }

        public postWalkSignatures() {
            this.enclosingTypeWalker1.postWalkSignature();
            this.enclosingTypeWalker2.postWalkSignature();
        }

        public walkTypeParameterConstraints(index: number) {
            this.enclosingTypeWalker1.walkTypeParameterConstraint(index);
            this.enclosingTypeWalker2.walkTypeParameterConstraint(index);
        }

        public postWalkTypeParameterConstraints() {
            this.enclosingTypeWalker1.postWalkTypeParameterConstraint();
            this.enclosingTypeWalker2.postWalkTypeParameterConstraint();
        }

        public walkTypeArgument(index: number): void {
            this.enclosingTypeWalker1.walkTypeArgument(index);
            this.enclosingTypeWalker2.walkTypeArgument(index);
        }

        public postWalkTypeArgument(): void {
            this.enclosingTypeWalker1.postWalkTypeArgument();
            this.enclosingTypeWalker2.postWalkTypeArgument();
        }

        public walkReturnTypes() {
            this.enclosingTypeWalker1.walkReturnType();
            this.enclosingTypeWalker2.walkReturnType();
        }

        public postWalkReturnTypes() {
            this.enclosingTypeWalker1.postWalkReturnType();
            this.enclosingTypeWalker2.postWalkReturnType();
        }

        public walkParameterTypes(iParam: number) {
            this.enclosingTypeWalker1.walkParameterType(iParam);
            this.enclosingTypeWalker2.walkParameterType(iParam);
        }

        public postWalkParameterTypes() {
            this.enclosingTypeWalker1.postWalkParameterType();
            this.enclosingTypeWalker2.postWalkParameterType();
        }

        public getBothKindOfIndexSignatures(includeAugmentedType1: boolean, includeAugmentedType2: boolean) {
            var indexSigs1 = this.enclosingTypeWalker1.getBothKindOfIndexSignatures(this.resolver, this, includeAugmentedType1);
            var indexSigs2 = this.enclosingTypeWalker2.getBothKindOfIndexSignatures(this.resolver, this, includeAugmentedType2);
            return { indexSigs1: indexSigs1, indexSigs2: indexSigs2 };
        }

        public walkIndexSignatureReturnTypes(indexSigs: { indexSigs1: IndexSignatureInfo; indexSigs2: IndexSignatureInfo; },
            useStringIndexSignature1: boolean, useStringIndexSignature2: boolean, onlySignature?: boolean) {
            this.enclosingTypeWalker1.walkIndexSignatureReturnType(indexSigs.indexSigs1, useStringIndexSignature1, onlySignature);
            this.enclosingTypeWalker2.walkIndexSignatureReturnType(indexSigs.indexSigs2, useStringIndexSignature2, onlySignature);
        }

        public postWalkIndexSignatureReturnTypes(onlySignature?: boolean) {
            this.enclosingTypeWalker1.postWalkIndexSignatureReturnType(onlySignature);
            this.enclosingTypeWalker2.postWalkIndexSignatureReturnType(onlySignature);
        }

        public swapEnclosingTypeWalkers() {
            var tempEnclosingWalker1 = this.enclosingTypeWalker1;
            this.enclosingTypeWalker1 = this.enclosingTypeWalker2;
            this.enclosingTypeWalker2 = tempEnclosingWalker1;
        }

        public oneOfClassificationsIsInfinitelyExpanding() {
            var generativeClassification1 = this.enclosingTypeWalker1.getGenerativeClassification();
            if (generativeClassification1 === GenerativeTypeClassification.InfinitelyExpanding) {
                return true;
            }
            var generativeClassification2 = this.enclosingTypeWalker2.getGenerativeClassification();
            if (generativeClassification2 === GenerativeTypeClassification.InfinitelyExpanding) {
                return true;
            }

            return false;
        }

        public resetEnclosingTypeWalkerStates() {
            var enclosingTypeWalkerState1 = this.enclosingTypeWalker1 ? this.enclosingTypeWalker1.resetEnclosingTypeWalkerState() : null;
            var enclosingTypeWalkerState2 = this.enclosingTypeWalker2 ? this.enclosingTypeWalker2.resetEnclosingTypeWalkerState() : null;
            return {
                enclosingTypeWalkerState1: enclosingTypeWalkerState1,
                enclosingTypeWalkerState2: enclosingTypeWalkerState2
            }
        }

        public setEnclosingTypeWalkerStates(enclosingTypeWalkerStates: {
            enclosingTypeWalkerState1: EnclosingTypeWalkerState;
            enclosingTypeWalkerState2: EnclosingTypeWalkerState;
        }) {
            Debug.assert(this.enclosingTypeWalker1 || !enclosingTypeWalkerStates.enclosingTypeWalkerState1);
            if (this.enclosingTypeWalker1) {
                this.enclosingTypeWalker1.setEnclosingTypeWalkerState(enclosingTypeWalkerStates.enclosingTypeWalkerState1);
            }
            Debug.assert(this.enclosingTypeWalker2 || !enclosingTypeWalkerStates.enclosingTypeWalkerState2);
            if (this.enclosingTypeWalker2) {
                this.enclosingTypeWalker2.setEnclosingTypeWalkerState(enclosingTypeWalkerStates.enclosingTypeWalkerState2);
            }
        }
    }
}