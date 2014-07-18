// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='references.ts' />

module TypeScript.Services {
    export class CompletionHelpers {
        private static getSpan(ast: ISyntaxElement): TextSpan {
            return new TextSpan(start(ast), width(ast));
        }

        private static symbolDeclarationIntersectsPosition(symbol: PullSymbol, fileName: string, position: number) {
            var decl = symbol.getDeclarations()[0];
            if (decl.fileName() === fileName && this.getSpan(decl.ast()).intersectsWithPosition(position)) {
                // This is the symbol declaration from the given position in the file
                return true;
            }

            return false;
        }

        public static filterContextualMembersList(contextualMemberSymbols: TypeScript.PullSymbol[], existingMembers: TypeScript.PullVisibleSymbolsInfo, fileName: string, position: number): TypeScript.PullSymbol[] {
            if (!existingMembers || !existingMembers.symbols || existingMembers.symbols.length === 0) {
                return contextualMemberSymbols;
            }

            var existingMemberSymbols = existingMembers.symbols;
            var existingMemberNames = TypeScript.createIntrinsicsObject<boolean>();
            for (var i = 0, n = existingMemberSymbols.length; i < n; i++) {
                if (this.symbolDeclarationIntersectsPosition(existingMemberSymbols[i], fileName, position)) {
                    // If this is the current item we are editing right now, do not filter it out
                    continue;
                }

                existingMemberNames[TypeScript.stripStartAndEndQuotes(existingMemberSymbols[i].getDisplayName())] = true;
            }

            var filteredMembers: TypeScript.PullSymbol[] = [];
            for (var j = 0, m = contextualMemberSymbols.length; j < m; j++) {
                var contextualMemberSymbol = contextualMemberSymbols[j];
                if (!existingMemberNames[TypeScript.stripStartAndEndQuotes(contextualMemberSymbol.getDisplayName())]) {
                    if (this.symbolDeclarationIntersectsPosition(contextualMemberSymbol, fileName, position)) {
                        // If this contextual member symbol was created as part of editing the current position, do not use it
                        continue;
                    }
                    filteredMembers.push(contextualMemberSymbol);
                }
            }

            return filteredMembers;
        }

        public static isCompletionListBlocker(sourceUnit: TypeScript.SourceUnitSyntax, position: number): boolean {
            // We shouldn't be getting a possition that is outside the file because
            // isEntirelyInsideComment can't handle when the position is out of bounds, 
            // callers should be fixed, however we should be resiliant to bad inputs
            // so we return true (this position is a blocker for getting completions)
            if (position < 0 || position > fullWidth(sourceUnit)) {
                return true;
            }

            // This method uses Fidelity completely. Some information can be reached using the AST, but not everything.
            return TypeScript.Syntax.isEntirelyInsideComment(sourceUnit, position) ||
                TypeScript.Syntax.isEntirelyInStringOrRegularExpressionLiteral(sourceUnit, position) ||
                CompletionHelpers.isIdentifierDefinitionLocation(sourceUnit, position) ||
                CompletionHelpers.isRightOfIllegalDot(sourceUnit, position);
        }

        public static getContainingObjectLiteralApplicableForCompletion(sourceUnit: TypeScript.SourceUnitSyntax, position: number): TypeScript.ISyntaxElement {
            // The locations in an object literal expression that are applicable for completion are property name definition locations.
            var previousToken = CompletionHelpers.getNonIdentifierCompleteTokenOnLeft(sourceUnit, position);

            if (previousToken) {
                var parent = previousToken.parent;

                switch (previousToken.kind()) {
                    case TypeScript.SyntaxKind.OpenBraceToken:  // var x = { |
                    case TypeScript.SyntaxKind.CommaToken:      // var x = { a: 0, |
                        if (parent && parent.kind() === TypeScript.SyntaxKind.SeparatedList) {
                            parent = parent.parent;
                        }

                        if (parent && parent.kind() === TypeScript.SyntaxKind.ObjectLiteralExpression) {
                            return parent;
                        }

                        break;
                }
            }

            return null;
        }

        public static isIdentifierDefinitionLocation(sourceUnit: TypeScript.SourceUnitSyntax, position: number): boolean {
            var positionedToken = CompletionHelpers.getNonIdentifierCompleteTokenOnLeft(sourceUnit, position);

            if (positionedToken) {
                var containingNodeKind = Syntax.containingNode(positionedToken) && Syntax.containingNode(positionedToken).kind();
                switch (positionedToken.kind()) {
                    case TypeScript.SyntaxKind.CommaToken:
                        return containingNodeKind === TypeScript.SyntaxKind.ParameterList ||
                            containingNodeKind === TypeScript.SyntaxKind.VariableDeclaration ||
                            containingNodeKind === TypeScript.SyntaxKind.EnumDeclaration;           // enum { foo, |

                    case TypeScript.SyntaxKind.OpenParenToken:
                        return containingNodeKind === TypeScript.SyntaxKind.ParameterList ||
                            containingNodeKind === TypeScript.SyntaxKind.CatchClause;

                    case TypeScript.SyntaxKind.OpenBraceToken:
                        return containingNodeKind === TypeScript.SyntaxKind.EnumDeclaration;        // enum { |

                    case TypeScript.SyntaxKind.PublicKeyword:
                    case TypeScript.SyntaxKind.PrivateKeyword:
                    case TypeScript.SyntaxKind.StaticKeyword:
                    case TypeScript.SyntaxKind.DotDotDotToken:
                        return containingNodeKind === TypeScript.SyntaxKind.Parameter;

                    case TypeScript.SyntaxKind.ClassKeyword:
                    case TypeScript.SyntaxKind.ModuleKeyword:
                    case TypeScript.SyntaxKind.EnumKeyword:
                    case TypeScript.SyntaxKind.InterfaceKeyword:
                    case TypeScript.SyntaxKind.FunctionKeyword:
                    case TypeScript.SyntaxKind.VarKeyword:
                    case TypeScript.SyntaxKind.GetKeyword:
                    case TypeScript.SyntaxKind.SetKeyword:
                        return true;
                }

                // Previous token may have been a keyword that was converted to an identifier.
                switch (positionedToken.text()) {
                    case "class":
                    case "interface":
                    case "enum":
                    case "module":
                        return true;
                }
            }

            return false;
        }

        public static getNonIdentifierCompleteTokenOnLeft(sourceUnit: TypeScript.SourceUnitSyntax, position: number): TypeScript.ISyntaxToken {
            var positionedToken = Syntax.findCompleteTokenOnLeft(sourceUnit, position, /*includeSkippedTokens*/true);

            if (positionedToken && position === end(positionedToken) && positionedToken.kind() == TypeScript.SyntaxKind.EndOfFileToken) {
                // EndOfFile token is not intresting, get the one before it
                positionedToken = previousToken(positionedToken, /*includeSkippedTokens*/true);
            }

            if (positionedToken && position === end(positionedToken) && positionedToken.kind() === TypeScript.SyntaxKind.IdentifierName) {
                // The caret is at the end of an identifier, the decession to provide completion depends on the previous token
                positionedToken = previousToken(positionedToken, /*includeSkippedTokens*/true);
            }

            return positionedToken;
        }

        public static isRightOfIllegalDot(sourceUnit: TypeScript.SourceUnitSyntax, position: number): boolean {
            var positionedToken = CompletionHelpers.getNonIdentifierCompleteTokenOnLeft(sourceUnit, position);

            if (positionedToken) {
                switch (positionedToken.kind()) {
                    case TypeScript.SyntaxKind.DotToken:
                        var leftOfDotPositionedToken = previousToken(positionedToken, /*includeSkippedTokens*/true);
                        return leftOfDotPositionedToken && leftOfDotPositionedToken.kind() === TypeScript.SyntaxKind.NumericLiteral;

                    case TypeScript.SyntaxKind.NumericLiteral:
                        var text = positionedToken.text();
                        return text.charAt(text.length - 1) === ".";
                }
            }

            return false;
        }

        public static getValidCompletionEntryDisplayName(displayName: string): string {
            if (displayName && displayName.length > 0) {
                var firstChar = displayName.charCodeAt(0);
                if (firstChar === TypeScript.CharacterCodes.singleQuote || firstChar === TypeScript.CharacterCodes.doubleQuote) {
                    // If the user entered name for the symbol was quoted, removing the quotes is not enough, as the name could be an
                    // invalid identifer name. We need to check if whatever was inside the quotes is actually a valid identifier name.
                    displayName = TypeScript.stripStartAndEndQuotes(displayName);
                }

                if (TypeScript.Scanner.isValidIdentifier(TypeScript.SimpleText.fromString(displayName), TypeScript.LanguageVersion.EcmaScript5)) {
                    return displayName;
                }
            }

            return null;
        }
    }
}