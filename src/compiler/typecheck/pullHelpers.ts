// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {

    export module PullHelpers {
        export function diagnosticFromDecl(decl: PullDecl, diagnosticKey: string, _arguments: any[]= null, additionalLocations: Location[]= null): Diagnostic {
            var ast = decl.ast();
            return decl.semanticInfoChain.diagnosticFromAST(ast, diagnosticKey, _arguments, additionalLocations);
        }

        // This helps in case we would like to make sure we have type while we are resolving/infering types for it
        // without infering back to any because we incorrectly detected recursive resolution of function
        export function resolveDeclaredSymbolToUseType(symbol: PullSymbol) {
            if (symbol.isSignature()) {
                if (!(<PullSignatureSymbol>symbol).returnType) {
                    symbol._resolveDeclaredSymbol();
                }
            }
            else if (!symbol.type) {
                symbol._resolveDeclaredSymbol();
            }
        }

        export interface SignatureInfoForFuncDecl {
            signature: PullSignatureSymbol;
            allSignatures: PullSignatureSymbol[];
        }

        export function getSignatureForFuncDecl(functionDecl: PullDecl) {
            var funcDecl = functionDecl.ast();
            var funcSymbol = functionDecl.getSymbol();

            if (!funcSymbol) {
                funcSymbol = functionDecl.getSignatureSymbol();
            }

            var functionSignature: PullSignatureSymbol = null;
            var typeSymbolWithAllSignatures: PullTypeSymbol = null;
            if (funcSymbol.isSignature()) {
                functionSignature = <PullSignatureSymbol>funcSymbol;
                var parent = functionDecl.getParentDecl();
                typeSymbolWithAllSignatures = parent.getSymbol().type;
            }
            else {
                functionSignature = functionDecl.getSignatureSymbol();
                typeSymbolWithAllSignatures = funcSymbol.type;
            }
            var signatures: PullSignatureSymbol[];

            if (funcDecl.kind() === SyntaxKind.ConstructorDeclaration || functionDecl.kind === PullElementKind.ConstructSignature) {
                signatures = typeSymbolWithAllSignatures.getConstructSignatures();
            }
            else if (functionDecl.kind === PullElementKind.IndexSignature) {
                signatures = typeSymbolWithAllSignatures.getIndexSignatures();
            }
            else {
                signatures = typeSymbolWithAllSignatures.getCallSignatures();
            }

            return {
                signature: functionSignature,
                allSignatures: signatures
            };
        }

        export function getAccessorSymbol(getterOrSetter: AST, semanticInfoChain: SemanticInfoChain): PullAccessorSymbol {
            var functionDecl = semanticInfoChain.getDeclForAST(getterOrSetter);
            var getterOrSetterSymbol = functionDecl.getSymbol();

            return <PullAccessorSymbol>getterOrSetterSymbol;
        }

        export function getGetterAndSetterFunction(funcDecl: AST, semanticInfoChain: SemanticInfoChain): { getter: GetAccessor; setter: SetAccessor; } {
            var accessorSymbol = PullHelpers.getAccessorSymbol(funcDecl, semanticInfoChain);
            var result: { getter: GetAccessor; setter: SetAccessor; } = {
                getter: null,
                setter: null
            };
            var getter = accessorSymbol.getGetter();
            if (getter) {
                var getterDecl = getter.getDeclarations()[0];
                result.getter = <GetAccessor>semanticInfoChain.getASTForDecl(getterDecl);
            }
            var setter = accessorSymbol.getSetter();
            if (setter) {
                var setterDecl = setter.getDeclarations()[0];
                result.setter = <SetAccessor>semanticInfoChain.getASTForDecl(setterDecl);
            }

            return result;
        }

        export function symbolIsEnum(source: PullSymbol): boolean {
            return source && (source.kind & (PullElementKind.Enum | PullElementKind.EnumMember)) !== 0;
        }

        export function symbolIsModule(symbol: PullSymbol) {
            return symbol && (symbol.kind === PullElementKind.Container || isOneDeclarationOfKind(symbol, PullElementKind.Container));
        }

        function isOneDeclarationOfKind(symbol: PullSymbol, kind: TypeScript.PullElementKind): boolean {
            var decls = symbol.getDeclarations();
            for (var i = 0; i < decls.length; i++) {
                if (decls[i].kind === kind) {
                    return true;
                }
            }

            return false;
        }

        export function isNameNumeric(name: string) {
            // Coerce the name to a number, and then use isFinite to make sure it is not Infinity or NaN
            return isFinite(+name);
        }


        export function typeSymbolsAreIdentical(a: PullTypeSymbol, b: PullTypeSymbol): boolean {
            // initialized types are omitted, since the type reference points back to the generic type
            // declaration.  (E.g., the referencedTypeSymbol of 'Foo<number>' would be 'Foo<T>'
            if (a.isTypeReference() && !a.getIsSpecialized()) {
                a = (<PullTypeReferenceSymbol>a).referencedTypeSymbol;
            }

            if (b.isTypeReference() && !b.getIsSpecialized()) {
                b = (<PullTypeReferenceSymbol>b).referencedTypeSymbol;
            }

            return a === b;
        }

        export function getRootType(type: PullTypeSymbol): PullTypeSymbol {
            var rootType: PullTypeSymbol = <PullTypeSymbol>type.getRootSymbol();

            while (true) {
                if (type === rootType) {
                    return type;
                }

                type = rootType;
                rootType = <PullTypeSymbol>type.getRootSymbol();
            }
        }

        export function isSymbolLocal(symbol: PullSymbol) {
            var container = symbol.getContainer();
            if (container) {
                var containerKind = container.kind;
                if (containerKind & (TypeScript.PullElementKind.SomeFunction | TypeScript.PullElementKind.FunctionType)) {
                    return true;
                }

                if (containerKind === TypeScript.PullElementKind.ConstructorType && !symbol.anyDeclHasFlag(TypeScript.PullElementFlags.Static | TypeScript.PullElementFlags.Exported)) {
                    // container kind can be ConstructorType when
                    // - symbol represents static member of the class or exported value in the clodule
                    // - symbol represents local varable in the constructor
                    // 'IsSymbolLocal' should return true only for the second category
                    return true;
                }
            }

            return false;
        }

        export function isExportedSymbolInClodule(symbol: PullSymbol) {
            var container = symbol.getContainer();
            return container && container.kind === TypeScript.PullElementKind.ConstructorType && symbolIsModule(container) && symbol.anyDeclHasFlag(PullElementFlags.Exported);
        }

        export function isSymbolDeclaredInScopeChain(symbol: PullSymbol, scopeSymbol: PullSymbol): boolean {
            Debug.assert(symbol);
            var symbolDeclarationScope = symbol.getContainer();

            // If we are looking for something other than global scope, look in the scope chain
            while (scopeSymbol) {
                // symbol is declared in same as scope symbol
                if (scopeSymbol === symbolDeclarationScope) {
                    return true;
                }

                // look in the outer scope of scopeSymbol
                scopeSymbol = scopeSymbol.getContainer();
            }

            if (scopeSymbol === null && symbolDeclarationScope === null) {
                // Both are global scopes.
                return true;
            }

            return false;
        }

        // Caller of walkPullTypeSymbolStructure should implement this interface to walk the members, signatures
        export interface PullTypeSymbolStructureWalker {
            memberSymbolWalk(memberSymbol: PullSymbol): boolean;
            callSignatureWalk(signatureSymbol: PullSignatureSymbol): boolean;
            constructSignatureWalk(signatureSymbol: PullSignatureSymbol): boolean;
            indexSignatureWalk(signatureSymbol: PullSignatureSymbol): boolean;
            signatureParameterWalk(parameterSymbol: PullSymbol): boolean;
            signatureReturnTypeWalk(returnType: PullTypeSymbol): boolean;
        }

        // Walks the signature
        function walkSignatureSymbol(signatureSymbol: PullSignatureSymbol, walker: PullTypeSymbolStructureWalker) {
            var continueWalk = true;
            var parameters = signatureSymbol.parameters;
            if (parameters) {
                for (var i = 0; continueWalk && i < parameters.length; i++) {
                    continueWalk = walker.signatureParameterWalk(parameters[i]);
                }
            }

            if (continueWalk) {
                continueWalk = walker.signatureReturnTypeWalk(signatureSymbol.returnType);
            }

            return continueWalk;
        }

        // Walk the type symbol structure
        export function walkPullTypeSymbolStructure(typeSymbol: PullTypeSymbol, walker: PullTypeSymbolStructureWalker) {
            var continueWalk = true;
            // Members
            var members = typeSymbol.getMembers();
            for (var i = 0; continueWalk && i < members.length; i++) {
                continueWalk = walker.memberSymbolWalk(members[i]);
            }

            if (continueWalk) {
                // Call signatures
                var callSigantures = typeSymbol.getCallSignatures();
                for (var i = 0; continueWalk && i < callSigantures.length; i++) {
                    continueWalk = walker.callSignatureWalk(callSigantures[i]);
                    if (continueWalk) {
                        continueWalk = walkSignatureSymbol(callSigantures[i], walker);
                    }
                }
            }

            if (continueWalk) {
                // Construct signatures
                var constructSignatures = typeSymbol.getConstructSignatures();
                for (var i = 0; continueWalk && i < constructSignatures.length; i++) {
                    continueWalk = walker.constructSignatureWalk(constructSignatures[i]);
                    if (continueWalk) {
                        continueWalk = walkSignatureSymbol(constructSignatures[i], walker);
                    }

                }
            }

            if (continueWalk) {
                // Index signatures
                var indexSignatures = typeSymbol.getIndexSignatures();
                for (var i = 0; continueWalk && i < indexSignatures.length; i++) {
                    continueWalk = walker.indexSignatureWalk(indexSignatures[i]);
                    if (continueWalk) {
                        continueWalk = walkSignatureSymbol(indexSignatures[i], walker);
                    }
                }
            }
        }

        // Helper class to walk the other decls
        export class OtherPullDeclsWalker {
            // The below walk just gives example of the usage of walk:
            // This is list of decls that are currently binding other decl. 
            // We maintain this so that we dont keep binding other decls in the stack. 
            // eg. if we have this:
            // module a{            // decl1
            // }
            // module a {           // decl2
            // }
            // module a {           // decl3
            // }
            // module a {           // decl4
            // }
            // If we do not keep track of these decls we would end up binding decl4 on stack when binding decl1, decl2, decl3 as below:
            // After binding decl1, we would go and try to bind other decls of 'a'
            // as part of it we would try to bind decl1, since its already bound we proceed to decl2
            // After binding decl2, we go bind other decls of 'a' and find that decl1 and decl2 are already bound
            // So as we bind decl3, and then go and try to bind other decls of 'a' which ends us up in binding decl4.
            // Thus the stack would be proportional to decls for given particular symbol.
            //
            // To avoid this before binding other symbols we always check if the list of decls contains 
            // the decl whose other decls we are already binding and if yes we skip the binding other decls
            // In the above eg. when we start binding other decls of 'a' after binding decl1, we go bind decl2
            // but when binding other decls of decl2, we find that it contains decl1, which is already binding its other decls
            // hence we dont do other decl binding and return and do same process for rest of the decls, thus ending up 
            // binding only current decl if we are binding that symbol as part of binding other decls
            private currentlyWalkingOtherDecls: PullDecl[] = [];
            public walkOtherPullDecls(currentDecl: PullDecl, otherDecls: PullDecl[], callBack: (otherDecl: PullDecl) => void) {
                if (otherDecls) {
                    var isAlreadyWalkingOtherDecl = ArrayUtilities.any(this.currentlyWalkingOtherDecls,
                        inWalkingOtherDecl => ArrayUtilities.contains(otherDecls, inWalkingOtherDecl));

                    // If we are already binding other decls for this 
                    if (!isAlreadyWalkingOtherDecl) {
                        this.currentlyWalkingOtherDecls.push(currentDecl);
                        for (var i = 0; i < otherDecls.length; i++) {
                            if (otherDecls[i] !== currentDecl) {
                                callBack(otherDecls[i]);
                            }
                        }
                        var currentlyWalkingOtherDeclsDecl = this.currentlyWalkingOtherDecls.pop();
                        Debug.assert(currentlyWalkingOtherDeclsDecl == currentDecl);
                    }
                }
            }
        }
    }
}