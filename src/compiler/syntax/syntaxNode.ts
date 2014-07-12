///<reference path='references.ts' />

module TypeScript {
    export class SyntaxNode implements ISyntaxNodeOrToken {
        private _data: number;

        constructor(parsedInStrictMode: boolean) {
            this._data = parsedInStrictMode ? SyntaxConstants.NodeParsedInStrictModeMask : 0;
        }

        public isNode(): boolean { return true; }
        public isToken(): boolean { return false; }
        public isList(): boolean { return false; }
        public isSeparatedList(): boolean { return false; }

        public kind(): SyntaxKind {
            throw Errors.abstract();
        }

        public childCount(): number {
            throw Errors.abstract();
        }

        public childAt(slot: number): ISyntaxElement {
            throw Errors.abstract();
        }

        // Returns the first non-missing token inside this node (or null if there are no such token).
        public firstToken(): ISyntaxToken {
            for (var i = 0, n = this.childCount(); i < n; i++) {
                var element = this.childAt(i);

                if (element !== null) {
                    if (element.fullWidth() > 0 || element.kind() === SyntaxKind.EndOfFileToken) {
                        return element.firstToken();
                    }
                }
            }

            return null;
        }

        // Returns the last non-missing token inside this node (or null if there are no such token).
        public lastToken(): ISyntaxToken {
            for (var i = this.childCount() - 1; i >= 0; i--) {
                var element = this.childAt(i);

                if (element !== null) {
                    if (element.fullWidth() > 0 || element.kind() === SyntaxKind.EndOfFileToken) {
                        return element.lastToken();
                    }
                }
            }

            return null;
        }

        public insertChildrenInto(array: ISyntaxElement[], index: number) {
            for (var i = this.childCount() - 1; i >= 0; i--) {
                var element = this.childAt(i);

                if (element !== null) {
                    if (element.isNode() || element.isToken()) {
                        array.splice(index, 0, element);
                    }
                    else if (element.isList()) {
                        (<ISyntaxList>element).insertChildrenInto(array, index);
                    }
                    else if (element.isSeparatedList()) {
                        (<ISeparatedSyntaxList>element).insertChildrenInto(array, index);
                    }
                    else {
                        throw Errors.invalidOperation();
                    }
                }
            }
        }

        public leadingTrivia(): ISyntaxTriviaList {
            var firstToken = this.firstToken();
            return firstToken ? firstToken.leadingTrivia() : Syntax.emptyTriviaList;
        }

        public trailingTrivia(): ISyntaxTriviaList {
            var lastToken = this.lastToken();
            return lastToken ? lastToken.trailingTrivia() : Syntax.emptyTriviaList;
        }

        public toJSON(key: any): any {
            var result: any = {
                kind: SyntaxKind[this.kind()],
                fullWidth: this.fullWidth()
            };

            if (this.isIncrementallyUnusable()) {
                result.isIncrementallyUnusable = true;
            }

            if (this.parsedInStrictMode()) {
                result.parsedInStrictMode = true;
            }

            var thisAsIndexable: IIndexable<any> = <any>this;
            for (var i = 0, n = this.childCount(); i < n; i++) {
                var value = this.childAt(i);

                if (value) {
                    for (var name in this) {
                        if (value === thisAsIndexable[name]) {
                            result[name] = value;
                            break;
                        }
                    }
                }
            }

            return result;
        }

        public accept(visitor: ISyntaxVisitor): any {
            throw Errors.abstract();
        }

        public fullText(): string {
            var elements: string[] = [];
            this.collectTextElements(elements);
            return elements.join("");
        }

        public collectTextElements(elements: string[]): void {
            for (var i = 0, n = this.childCount(); i < n; i++) {
                var element = this.childAt(i);

                if (element !== null) {
                    element.collectTextElements(elements);
                }
            }
        }

        public replaceToken(token1: ISyntaxToken, token2: ISyntaxToken): SyntaxNode {
            if (token1 === token2) {
                return this;
            }

            return this.accept(new SyntaxTokenReplacer(token1, token2));
        }

        public withLeadingTrivia(trivia: ISyntaxTriviaList): SyntaxNode {
            return this.replaceToken(this.firstToken(), this.firstToken().withLeadingTrivia(trivia));
        }

        public withTrailingTrivia(trivia: ISyntaxTriviaList): SyntaxNode {
            return this.replaceToken(this.lastToken(), this.lastToken().withTrailingTrivia(trivia));
        }

        public hasLeadingTrivia(): boolean {
            return this.lastToken().hasLeadingTrivia();
        }

        public hasTrailingTrivia(): boolean {
            return this.lastToken().hasTrailingTrivia();
        }

        public isTypeScriptSpecific(): boolean {
            return false;
        }

        public isIncrementallyUnusable(): boolean {
            return (this.data() & SyntaxConstants.NodeIncrementallyUnusableMask) !== 0;
        }

        // True if this node was parsed while the parser was in 'strict' mode.  A node parsed in strict
        // mode cannot be reused if the parser is non-strict mode (and vice versa).  This is because 
        // the parser parses things differently in strict mode and thus the tokens may be interpretted
        // differently if the mode is changed. 
        public parsedInStrictMode(): boolean {
            return (this.data() & SyntaxConstants.NodeParsedInStrictModeMask) !== 0;
        }

        public fullWidth(): number {
            return this.data() >>> SyntaxConstants.NodeFullWidthShift;
        }

        private computeData(): number {
            var slotCount = this.childCount();

            var fullWidth = 0;
            var childWidth = 0;

            // If we're already set as incrementally unusable, then don't need to check children.
            // If we have no children (like an OmmittedExpressionSyntax), we're automatically not reusable.
            var isIncrementallyUnusable = ((this._data & SyntaxConstants.NodeIncrementallyUnusableMask) !== 0) || slotCount === 0;

            for (var i = 0, n = slotCount; i < n; i++) {
                var element = this.childAt(i);

                if (element !== null) {
                    childWidth = element.fullWidth();
                    fullWidth += childWidth;

                    if (!isIncrementallyUnusable) {
                        isIncrementallyUnusable = element.isIncrementallyUnusable();
                    }
                }
            }

            return (fullWidth << SyntaxConstants.NodeFullWidthShift)
                 | (isIncrementallyUnusable ? SyntaxConstants.NodeIncrementallyUnusableMask : 0)
                 | SyntaxConstants.NodeDataComputed;
        }

        private data(): number {
            if ((this._data & SyntaxConstants.NodeDataComputed) === 0) {
                this._data |= this.computeData();
            }

            return this._data;
        }

        /**
         * Finds a token according to the following rules:
         * 1) If position matches the End of the node/s FullSpan and the node is SourceUnit,
         *    then the EOF token is returned. 
         * 
         *  2) If node.FullSpan.Contains(position) then the token that contains given position is
         *     returned.
         * 
         *  3) Otherwise an ArgumentOutOfRangeException is thrown
         *
         * Note: findToken will always return a non-missing token with width greater than or equal to
         * 1 (except for EOF).  Empty tokens synthesized by the parser are never returned.
         */
        public findToken(position: number, includeSkippedTokens: boolean = false): PositionedToken {
            var endOfFileToken = this.tryGetEndOfFileAt(position);
            if (endOfFileToken !== null) {
                return endOfFileToken;
            }

            if (position < 0 || position >= this.fullWidth()) {
                throw Errors.argumentOutOfRange("position");
            }

            var positionedToken= this.findTokenInternal(null, position, 0);

            if (includeSkippedTokens) {
                return Syntax.findSkippedTokenInPositionedToken(positionedToken, position) || positionedToken;
            }

            // Could not find a better match
            return positionedToken;

        }

        private tryGetEndOfFileAt(position: number): PositionedToken {
            if (this.kind() === SyntaxKind.SourceUnit && position === this.fullWidth()) {
                var sourceUnit = <SourceUnitSyntax>this;
                return new PositionedToken(
                    new PositionedNode(null, sourceUnit, 0),
                    sourceUnit.endOfFileToken, sourceUnit.moduleElements.fullWidth());
            }

            return null;
        }

        private findTokenInternal(parent: PositionedElement, position: number, fullStart: number): PositionedToken {
            // Debug.assert(position >= 0 && position < this.fullWidth());

            parent = new PositionedNode(parent, this, fullStart);
            for (var i = 0, n = this.childCount(); i < n; i++) {
                var element = this.childAt(i);

                if (element !== null) {
                    var childWidth = element.fullWidth();

                    if (position < childWidth) {
                        return (<any>element).findTokenInternal(parent, position, fullStart);
                    }

                    position -= childWidth;
                    fullStart += childWidth;
                }
            }

            throw Errors.invalidOperation();
        }

        public findTokenOnLeft(position: number, includeSkippedTokens: boolean = false): PositionedToken {
            var positionedToken = this.findToken(position, /*includeSkippedTokens*/ false);
            var start = positionedToken.start();
            
            // Position better fall within this token.
            // Debug.assert(position >= positionedToken.fullStart());
            // Debug.assert(position < positionedToken.fullEnd() || positionedToken.token().tokenKind === SyntaxKind.EndOfFileToken);

            if (includeSkippedTokens) {
                positionedToken = Syntax.findSkippedTokenOnLeft(positionedToken, position) || positionedToken;
            }

            // if position is after the start of the token, then this token is the token on the left.
            if (position > start) {
                return positionedToken;
            }

            // we're in the trivia before the start of the token.  Need to return the previous token.
            if (positionedToken.fullStart() === 0) {
                // Already on the first token.  Nothing before us.
                return null;
            }

            return positionedToken.previousToken(includeSkippedTokens);
        }

        public findCompleteTokenOnLeft(position: number, includeSkippedTokens: boolean = false): PositionedToken {
            var positionedToken = this.findToken(position, /*includeSkippedTokens*/ false);

            // Position better fall within this token.
            // Debug.assert(position >= positionedToken.fullStart());
            // Debug.assert(position < positionedToken.fullEnd() || positionedToken.token().tokenKind === SyntaxKind.EndOfFileToken);

            if (includeSkippedTokens) {
                positionedToken = Syntax.findSkippedTokenOnLeft(positionedToken, position) || positionedToken;
            }

            // if position is after the end of the token, then this token is the token on the left.
            if (positionedToken.token().width() > 0 && position >= positionedToken.end()) {
                return positionedToken;
            }

            return positionedToken.previousToken(includeSkippedTokens);
        }

        public isModuleElement(): boolean {
            return false;
        }

        public isClassElement(): boolean {
            return false;
        }

        public isTypeMember(): boolean {
            return false;
        }

        public isStatement(): boolean {
            return false;
        }

        public isExpression(): boolean {
            return false;
        }

        public isSwitchClause(): boolean {
            return false;
        }

        public structuralEquals(node: SyntaxNode): boolean {
            if (this === node) { return true; }
            if (node === null) { return false; }
            if (this.kind() !== node.kind()) { return false; }

            for (var i = 0, n = this.childCount(); i < n; i++) {
                var element1 = this.childAt(i);
                var element2 = node.childAt(i);

                if (!Syntax.elementStructuralEquals(element1, element2)) {
                    return false;
                }
            }

            return true;
        }

        public width(): number {
            return this.fullWidth() - this.leadingTriviaWidth() - this.trailingTriviaWidth();
        }

        public leadingTriviaWidth() {
            var firstToken = this.firstToken();
            return firstToken === null ? 0 : firstToken.leadingTriviaWidth();
        }

        public trailingTriviaWidth() {
            var lastToken = this.lastToken();
            return lastToken === null ? 0 : lastToken.trailingTriviaWidth();
        }
    }
}