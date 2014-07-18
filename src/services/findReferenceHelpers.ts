// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='references.ts' />

module TypeScript.Services {
    export class FindReferenceHelpers {
        public static compareSymbolsForLexicalIdentity(firstSymbol: TypeScript.PullSymbol, secondSymbol: TypeScript.PullSymbol): boolean {
            // Unwrap modules so that we're always referring to the variable.
            if (!firstSymbol.isAlias() && firstSymbol.isContainer()) {
                var containerForFirstSymbol = (<TypeScript.PullContainerSymbol>firstSymbol);
                if (containerForFirstSymbol.getInstanceSymbol()) {
                    firstSymbol = containerForFirstSymbol.getInstanceSymbol();
                }
            }

            if (!secondSymbol.isAlias() && secondSymbol.isContainer()) {
                var containerForSecondSymbol = (<TypeScript.PullContainerSymbol>secondSymbol);
                if (containerForSecondSymbol.getInstanceSymbol()) {
                    secondSymbol = containerForSecondSymbol.getInstanceSymbol();
                }
            }

            if (firstSymbol.kind === secondSymbol.kind) {
                if (firstSymbol === secondSymbol) {
                    return true;
                }

                // If we have two variables and they have the same name and the same parent, then 
                // they are the same symbol.
                if (firstSymbol.kind === TypeScript.PullElementKind.Variable &&
                    firstSymbol.name === secondSymbol.name &&
                    firstSymbol.getDeclarations() && firstSymbol.getDeclarations().length >= 1 &&
                    secondSymbol.getDeclarations() && secondSymbol.getDeclarations().length >= 1) {

                    var firstSymbolDecl = firstSymbol.getDeclarations()[0];
                    var secondSymbolDecl = secondSymbol.getDeclarations()[0];

                    return firstSymbolDecl.getParentDecl() === secondSymbolDecl.getParentDecl();
                }

                // If we have two properties that belong to an object literal, then we need ot see
                // if they came from teh same object literal ast.
                if (firstSymbol.kind === TypeScript.PullElementKind.Property &&
                    firstSymbol.name === secondSymbol.name &&
                    firstSymbol.getDeclarations() && firstSymbol.getDeclarations().length >= 1 &&
                    secondSymbol.getDeclarations() && secondSymbol.getDeclarations().length >= 1) {

                    var firstSymbolDecl = firstSymbol.getDeclarations()[0];
                    var secondSymbolDecl = secondSymbol.getDeclarations()[0];

                    var firstParentDecl = firstSymbolDecl.getParentDecl();
                    var secondParentDecl = secondSymbolDecl.getParentDecl()

                    if (firstParentDecl.kind === TypeScript.PullElementKind.ObjectLiteral &&
                        secondParentDecl.kind === TypeScript.PullElementKind.ObjectLiteral) {

                        return firstParentDecl.ast() === secondParentDecl.ast();
                    }
                }

                // check if we are dealing with the implementation of interface method or a method override
                if (firstSymbol.name === secondSymbol.name) {
                    // at this point firstSymbol.kind === secondSymbol.kind so we can pick any of those
                    switch (firstSymbol.kind) {
                        case PullElementKind.Property:
                        case PullElementKind.Method:
                        case PullElementKind.GetAccessor:
                        case PullElementKind.SetAccessor:
                            // these kinds can only be defined in types
                            var t1 = <PullTypeSymbol>firstSymbol.getContainer();
                            var t2 = <PullTypeSymbol>secondSymbol.getContainer();
                            t1._resolveDeclaredSymbol();
                            t2._resolveDeclaredSymbol();

                            return t1.hasBase(t2) || t2.hasBase(t1);
                            break;
                    }
                }

                return false;
            }
            else {
                switch (firstSymbol.kind) {
                    case TypeScript.PullElementKind.Class: {
                        return this.checkSymbolsForDeclarationEquality(firstSymbol, secondSymbol);
                    }
                    case TypeScript.PullElementKind.Property: {
                        if (firstSymbol.isAccessor()) {
                            var getterSymbol = (<TypeScript.PullAccessorSymbol>firstSymbol).getGetter();
                            var setterSymbol = (<TypeScript.PullAccessorSymbol>firstSymbol).getSetter();

                            if (getterSymbol && getterSymbol === secondSymbol) {
                                return true;
                            }

                            if (setterSymbol && setterSymbol === secondSymbol) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case TypeScript.PullElementKind.Function: {
                        if (secondSymbol.isAccessor()) {
                            var getterSymbol = (<TypeScript.PullAccessorSymbol>secondSymbol).getGetter();
                            var setterSymbol = (<TypeScript.PullAccessorSymbol>secondSymbol).getSetter();

                            if (getterSymbol && getterSymbol === firstSymbol) {
                                return true;
                            }

                            if (setterSymbol && setterSymbol === firstSymbol) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case TypeScript.PullElementKind.ConstructorMethod: {
                        return this.checkSymbolsForDeclarationEquality(firstSymbol, secondSymbol);
                    }
                }
            }

            return firstSymbol === secondSymbol;
        }

        private static checkSymbolsForDeclarationEquality(firstSymbol: TypeScript.PullSymbol, secondSymbol: TypeScript.PullSymbol): boolean {
            var firstSymbolDeclarations: TypeScript.PullDecl[] = firstSymbol.getDeclarations();
            var secondSymbolDeclarations: TypeScript.PullDecl[] = secondSymbol.getDeclarations();
            for (var i = 0, iLen = firstSymbolDeclarations.length; i < iLen; i++) {
                for (var j = 0, jLen = secondSymbolDeclarations.length; j < jLen; j++) {
                    if (this.declarationsAreSameOrParents(firstSymbolDeclarations[i], secondSymbolDeclarations[j])) {
                        return true;
                    }
                }
            }
            return false;
        }

        private static declarationsAreSameOrParents(firstDecl: TypeScript.PullDecl, secondDecl: TypeScript.PullDecl): boolean {
            var firstParent: TypeScript.PullDecl = firstDecl.getParentDecl();
            var secondParent: TypeScript.PullDecl = secondDecl.getParentDecl();
            if (firstDecl === secondDecl ||
                firstDecl === secondParent ||
                firstParent === secondDecl ||
                firstParent === secondParent) {
                return true;
            }
            return false;
        }
    }
}