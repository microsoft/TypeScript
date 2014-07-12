///<reference path='references.ts' />

module TypeScript {
    export class PositionedElement {
        private _parent: PositionedElement;
        private _element: ISyntaxElement;
        private _fullStart: number;

        constructor(parent: PositionedElement, element: ISyntaxElement, fullStart: number) {
            this._parent = parent;
            this._element = element;
            this._fullStart = fullStart;
        }

        public static create(parent: PositionedElement, element: ISyntaxElement, fullStart: number): PositionedElement {
            if (element === null) {
                return null;
            }

            if (element.isNode()) {
                return new PositionedNode(parent, <SyntaxNode>element, fullStart);
            }
            else if (element.isToken()) {
                return new PositionedToken(parent, <ISyntaxToken>element, fullStart);
            }
            else if (element.isList()) {
                return new PositionedList(parent, <ISyntaxList>element, fullStart);
            }
            else if (element.isSeparatedList()) {
                return new PositionedSeparatedList(parent, <ISeparatedSyntaxList>element, fullStart);
            }
            else {
                throw Errors.invalidOperation();
            }
        }

        public parent(): PositionedElement {
            return this._parent;
        }

        public parentElement(): ISyntaxElement {
            return this._parent && this._parent._element;
        }

        public element(): ISyntaxElement {
            return this._element;
        }

        public kind(): SyntaxKind {
            return this.element().kind();
        }

        public childIndex(child: ISyntaxElement) {
            return Syntax.childIndex(this.element(), child);
        }
        
        public childCount(): number {
            return this.element().childCount();
        }

        public childAt(index: number): PositionedElement {
            var offset = Syntax.childOffsetAt(this.element(), index);
            return PositionedElement.create(this, this.element().childAt(index), this.fullStart() + offset);
        }

        public childStart(child: ISyntaxElement): number {
            var offset = Syntax.childOffset(this.element(), child);
            return this.fullStart() + offset + child.leadingTriviaWidth();
        }

        public childEnd(child: ISyntaxElement): number {
            var offset = Syntax.childOffset(this.element(), child);
            return this.fullStart() + offset + child.leadingTriviaWidth() + child.width();
        }

        public childStartAt(index: number): number {
            var offset = Syntax.childOffsetAt(this.element(), index);
            var child = this.element().childAt(index);
            return this.fullStart() + offset + child.leadingTriviaWidth();
        }

        public childEndAt(index: number): number {
            var offset = Syntax.childOffsetAt(this.element(), index);
            var child = this.element().childAt(index);
            return this.fullStart() + offset + child.leadingTriviaWidth() + child.width();
        }

        public getPositionedChild(child: ISyntaxElement) {
            var offset = Syntax.childOffset(this.element(), child);
            return PositionedElement.create(this, child, this.fullStart() + offset);
        }

        public fullStart(): number {
            return this._fullStart;
        }

        public fullEnd(): number {
            return this.fullStart() + this.element().fullWidth();
        }

        public fullWidth(): number {
            return this.element().fullWidth();
        }

        public start(): number {
            return this.fullStart() + this.element().leadingTriviaWidth();
        }

        public end(): number {
            return this.fullStart() + this.element().leadingTriviaWidth() + this.element().width();
        }

        public root(): PositionedNode {
            var current = this;
            while (current.parent() !== null) {
                current = current.parent();
            }

            return <PositionedNode>current;
        }

        public containingNode(): PositionedNode {
            var current = this.parent();

            while (current !== null && !current.element().isNode()) {
                current = current.parent();
            }

            return <PositionedNode>current;
        }
    }

    export class PositionedNodeOrToken extends PositionedElement {
        constructor(parent: PositionedElement, nodeOrToken: ISyntaxNodeOrToken, fullStart: number) {
            super(parent, nodeOrToken, fullStart);
        }

        public nodeOrToken(): ISyntaxNodeOrToken {
            return <ISyntaxNodeOrToken>this.element();
        }
    }

    export class PositionedNode extends PositionedNodeOrToken {
        constructor(parent: PositionedElement, node: SyntaxNode, fullStart: number) {
            super(parent, node, fullStart);
        }

        public node(): SyntaxNode {
            return <SyntaxNode>this.element();
        }
    }

    export class PositionedToken extends PositionedNodeOrToken {
        constructor(parent: PositionedElement, token: ISyntaxToken, fullStart: number) {
            super(parent, token, fullStart);
        }

        public token(): ISyntaxToken {
            return <ISyntaxToken>this.element();
        }

        public previousToken(includeSkippedTokens: boolean = false): PositionedToken {
            var triviaList = this.token().leadingTrivia();
            if (includeSkippedTokens && triviaList && triviaList.hasSkippedToken()) {
                var currentTriviaEndPosition = this.start();
                for (var i = triviaList.count() - 1; i >= 0; i--) {
                    var trivia = triviaList.syntaxTriviaAt(i);
                    if (trivia.isSkippedToken()) {
                        return new PositionedSkippedToken(this, trivia.skippedToken(), currentTriviaEndPosition - trivia.fullWidth());
                    }

                    currentTriviaEndPosition -= trivia.fullWidth();
                }
            }

            var start = this.fullStart();
            if (start === 0) {
                return null;
            }

            return this.root().node().findToken(start - 1, includeSkippedTokens);
        }

        public nextToken(includeSkippedTokens: boolean = false): PositionedToken {
            if (this.token().tokenKind === SyntaxKind.EndOfFileToken) {
                return null;
            }

            var triviaList = this.token().trailingTrivia();
            if (includeSkippedTokens && triviaList && triviaList.hasSkippedToken()) {
                var fullStart = this.end();
                for (var i =0, n = triviaList.count(); i < n; i++) {
                    var trivia = triviaList.syntaxTriviaAt(i);
                    if (trivia.isSkippedToken()) {
                        return new PositionedSkippedToken(this, trivia.skippedToken(), fullStart);
                    }

                    fullStart += trivia.fullWidth();
                }
            }

            return this.root().node().findToken(this.fullEnd(), includeSkippedTokens);
        }
    }

    export class PositionedList extends PositionedElement {
        constructor(parent: PositionedElement, list: ISyntaxList, fullStart: number) {
            super(parent, list, fullStart);
        }

        public list(): ISyntaxList {
            return <ISyntaxList>this.element();
        }
    }

    export class PositionedSeparatedList extends PositionedElement {
        constructor(parent: PositionedElement, list: ISeparatedSyntaxList, fullStart: number) {
            super(parent, list, fullStart);
        }

        public list(): ISeparatedSyntaxList {
            return <ISeparatedSyntaxList>this.element();
        }
    }

    export class PositionedSkippedToken extends PositionedToken {
        private _parentToken: PositionedToken;

        constructor(parentToken: PositionedToken, token: ISyntaxToken, fullStart: number) {
            super(parentToken.parent(), token, fullStart);
            this._parentToken = parentToken;
        }

        public parentToken(): PositionedToken {
            return this._parentToken;
        }

        public previousToken(includeSkippedTokens: boolean = false): PositionedToken {
            var start = this.fullStart();

            // find previous skipped token within the same parent
            if (includeSkippedTokens) {
                var previousToken: PositionedToken;

                if (start >= this.parentToken().end()) {
                    // This skipped token was on the right of positioned token, the skipped token found before it in the 
                    // trailing trivia, if the search for a previous skipped token in the same trivia list return it,
                    // else return the parent token as the previous token
                    previousToken = Syntax.findSkippedTokenInTrailingTriviaList(this.parentToken(), start - 1);

                    if (previousToken) {
                        return previousToken;
                    }

                    return this.parentToken();
                }
                else {
                    previousToken = Syntax.findSkippedTokenInLeadingTriviaList(this.parentToken(), start - 1);

                    if (previousToken) {
                        return previousToken;
                    }
                }
            }

            var start = this.parentToken().fullStart();
            if (start === 0) {
                return null;
            }

            return this.root().node().findToken(start - 1, includeSkippedTokens);
        }
        
        public nextToken(includeSkippedTokens: boolean = false): PositionedToken {
            if (this.token().tokenKind === SyntaxKind.EndOfFileToken) {
                return null;
            }

            if (includeSkippedTokens) {
                var end = this.end();
                var nextToken: PositionedToken;

                if (end <= this.parentToken().start()) {
                    // This skipped token was on the left of positioned token, the skipped token found after it in the 
                    // leading trivia, if the search for a next skipped token in the same trivia list return it,
                    // else return the parent token as the next token
                    nextToken = Syntax.findSkippedTokenInLeadingTriviaList(this.parentToken(), end);

                    if (nextToken) {
                        return nextToken;
                    }

                    return this.parentToken();
                }
                else {
                    nextToken = Syntax.findSkippedTokenInTrailingTriviaList(this.parentToken(), end);

                    if (nextToken) {
                        return nextToken;
                    }
                }
            }

            return this.root().node().findToken(this.parentToken().fullEnd(), includeSkippedTokens);
        }
    }
}