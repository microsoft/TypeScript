///<reference path='references.ts' />

module TypeScript {
    export interface ISyntaxToken extends ISyntaxNodeOrToken, INameSyntax, IPrimaryExpressionSyntax {
        // Same as kind(), just exposed through a property for perf.
        tokenKind: SyntaxKind;

        // Text for this token, not including leading or trailing trivia.
        text(): string;

        value(): any;
        valueText(): string;

        hasLeadingTrivia(): boolean;
        hasLeadingComment(): boolean;
        hasLeadingNewLine(): boolean;
        hasLeadingSkippedText(): boolean;

        hasTrailingTrivia(): boolean;
        hasTrailingComment(): boolean;
        hasTrailingNewLine(): boolean;
        hasTrailingSkippedText(): boolean;

        hasSkippedToken(): boolean;

        leadingTrivia(): ISyntaxTriviaList;
        trailingTrivia(): ISyntaxTriviaList;

        withLeadingTrivia(leadingTrivia: ISyntaxTriviaList): ISyntaxToken;
        withTrailingTrivia(trailingTrivia: ISyntaxTriviaList): ISyntaxToken;

        clone(): ISyntaxToken;
    }

    export interface ITokenInfo {
        leadingTrivia?: ISyntaxTrivia[];
        text?: string;
        trailingTrivia?: ISyntaxTrivia[];
    }
}

module TypeScript.Syntax {
    export function isExpression(token: ISyntaxToken): boolean {
        switch (token.tokenKind) {
            case SyntaxKind.IdentifierName:
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.SuperKeyword:
                return true;
        }

        return false;
    }

    export function realizeToken(token: ISyntaxToken): ISyntaxToken {
        return new RealizedToken(token.tokenKind,
            token.leadingTrivia(), token.text(), token.value(), token.valueText(), token.trailingTrivia());
    }

    export function convertToIdentifierName(token: ISyntaxToken): ISyntaxToken {
        Debug.assert(SyntaxFacts.isAnyKeyword(token.tokenKind));
        return new RealizedToken(SyntaxKind.IdentifierName,
            token.leadingTrivia(), token.text(), token.text(), token.text(), token.trailingTrivia());
    }

    export function tokenToJSON(token: ISyntaxToken): any {
        var result: any = {};

        for (var name in SyntaxKind) {
            if (<any>SyntaxKind[name] === token.kind()) {
                result.kind = name;
                break;
            }
        }

        result.width = token.width();
        if (token.fullWidth() !== token.width()) {
            result.fullWidth = token.fullWidth();
        }

        result.text = token.text();

        var value = token.value();
        if (value !== null) {
            result.value = value;
            result.valueText = token.valueText();
        }

        if (token.hasLeadingTrivia()) {
            result.hasLeadingTrivia = true;
        }

        if (token.hasLeadingComment()) {
            result.hasLeadingComment = true;
        }

        if (token.hasLeadingNewLine()) {
            result.hasLeadingNewLine = true;
        }

        if (token.hasLeadingSkippedText()) {
            result.hasLeadingSkippedText = true;
        }

        if (token.hasTrailingTrivia()) {
            result.hasTrailingTrivia = true;
        }

        if (token.hasTrailingComment()) {
            result.hasTrailingComment = true;
        }

        if (token.hasTrailingNewLine()) {
            result.hasTrailingNewLine = true;
        }

        if (token.hasTrailingSkippedText()) {
            result.hasTrailingSkippedText = true;
        }

        var trivia = token.leadingTrivia();
        if (trivia.count() > 0) {
            result.leadingTrivia = trivia;
        }

        trivia = token.trailingTrivia();
        if (trivia.count() > 0) {
            result.trailingTrivia = trivia;
        }

        return result;
    }

    export function value(token: ISyntaxToken): any {
        return value1(token.tokenKind, token.text());
    }

    function hexValue(text: string, start: number, length: number): number {
        var intChar = 0;
        for (var i = 0; i < length; i++) {
            var ch2 = text.charCodeAt(start + i);
            if (!CharacterInfo.isHexDigit(ch2)) {
                break;
            }

            intChar = (intChar << 4) + CharacterInfo.hexValue(ch2);
        }

        return intChar;
    }

    var characterArray: number[] = [];

    function convertEscapes(text: string): string {
        characterArray.length = 0;
        var result = "";

        for (var i = 0, n = text.length; i < n; i++) {
            var ch = text.charCodeAt(i);

            if (ch === CharacterCodes.backslash) {
                i++;
                if (i < n) {
                    ch = text.charCodeAt(i);
                    switch (ch) {
                        case CharacterCodes._0:
                            characterArray.push(CharacterCodes.nullCharacter);
                            continue;

                        case CharacterCodes.b:
                            characterArray.push(CharacterCodes.backspace);
                            continue;

                        case CharacterCodes.f:
                            characterArray.push(CharacterCodes.formFeed);
                            continue;

                        case CharacterCodes.n:
                            characterArray.push(CharacterCodes.lineFeed);
                            continue;

                        case CharacterCodes.r:
                            characterArray.push(CharacterCodes.carriageReturn);
                            continue;

                        case CharacterCodes.t:
                            characterArray.push(CharacterCodes.tab);
                            continue;

                        case CharacterCodes.v:
                            characterArray.push(CharacterCodes.verticalTab);
                            continue;

                        case CharacterCodes.x:
                            characterArray.push(hexValue(text, /*start:*/ i + 1, /*length:*/ 2));
                            i += 2;
                            continue;

                        case CharacterCodes.u:
                            characterArray.push(hexValue(text, /*start:*/ i + 1, /*length:*/ 4));
                            i += 4;
                            continue;

                        case CharacterCodes.carriageReturn:
                            var nextIndex = i + 1;
                            if (nextIndex < text.length && text.charCodeAt(nextIndex) === CharacterCodes.lineFeed) {
                                // Skip the entire \r\n sequence.
                                i++;
                            }
                            continue;

                        case CharacterCodes.lineFeed:
                        case CharacterCodes.paragraphSeparator:
                        case CharacterCodes.lineSeparator:
                            // From ES5: LineContinuation is the empty character sequence.
                            continue;

                        default:
                            // Any other character is ok as well.  As per rule:
                            // EscapeSequence :: CharacterEscapeSequence
                            // CharacterEscapeSequence :: NonEscapeCharacter
                            // NonEscapeCharacter :: SourceCharacter but notEscapeCharacter or LineTerminator
                            //
                            // Intentional fall through
                        }
                }
            }

            characterArray.push(ch);

            if (i && !(i % 1024)) {
                result = result.concat(String.fromCharCode.apply(null, characterArray));
                characterArray.length = 0;
            }
        }

        if (characterArray.length) {
            result = result.concat(String.fromCharCode.apply(null, characterArray));
        }

        return result;
    }

    export function massageEscapes(text: string): string {
        return text.indexOf("\\") >= 0 ? convertEscapes(text) : text;
    }

    function value1(kind: SyntaxKind, text: string): any {
        if (kind === SyntaxKind.IdentifierName) {
            return massageEscapes(text);
        }

        switch (kind) {
            case SyntaxKind.TrueKeyword:
                return true;
            case SyntaxKind.FalseKeyword:
                return false;
            case SyntaxKind.NullKeyword:
                return null;
        }

        if (SyntaxFacts.isAnyKeyword(kind) || SyntaxFacts.isAnyPunctuation(kind)) {
            return SyntaxFacts.getText(kind);
        }

        if (kind === SyntaxKind.NumericLiteral) {
            return IntegerUtilities.isHexInteger(text) ? parseInt(text, /*radix:*/ 16) : parseFloat(text);
        }
        else if (kind === SyntaxKind.StringLiteral) {
            if (text.length > 1 && text.charCodeAt(text.length - 1) === text.charCodeAt(0)) {
                // Properly terminated.  Remove the quotes, and massage any escape characters we see.
                return massageEscapes(text.substr(1, text.length - 2));
            }
            else {
                // Not property terminated.  Remove the first quote and massage any escape characters we see.
                return massageEscapes(text.substr(1));

            }
        }
        else if (kind === SyntaxKind.RegularExpressionLiteral) {
            return regularExpressionValue(text);
        }
        else if (kind === SyntaxKind.EndOfFileToken || kind === SyntaxKind.ErrorToken) {
            return null;
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    function regularExpressionValue(text: string): RegExp {
        try {
            var lastSlash = text.lastIndexOf("/");
            var body = text.substring(1, lastSlash);
            var flags = text.substring(lastSlash + 1);
            return new RegExp(body, flags);
        }
        catch (e) {
            return null;
        }
    }

    function valueText1(kind: SyntaxKind, text: string): string {
        var value = value1(kind, text);
        return value === null ? "" : value.toString();
    }

    export function valueText(token: ISyntaxToken): string {
        var value = token.value();
        return value === null ? "" : value.toString();
    }

    class EmptyToken implements ISyntaxToken {
        public tokenKind: SyntaxKind;

        constructor(kind: SyntaxKind) {
            this.tokenKind = kind;
        }

        public clone(): ISyntaxToken {
            return new EmptyToken(this.tokenKind);
        }

        public kind() { return this.tokenKind; }

        public isToken(): boolean { return true; }
        public isNode(): boolean { return false; }
        public isList(): boolean { return false; }
        public isSeparatedList(): boolean { return false; }

        public childCount(): number {
            return 0;
        }

        public childAt(index: number): ISyntaxElement {
            throw Errors.argumentOutOfRange("index");
        }

        public toJSON(key: any): any { return tokenToJSON(this); }
        public accept(visitor: ISyntaxVisitor): any { return visitor.visitToken(this); }

        private findTokenInternal(parent: PositionedElement, position: number, fullStart: number): PositionedToken {
            return new PositionedToken(parent, this, fullStart);
        }

        public firstToken() { return this; }
        public lastToken() { return this; }
        public isTypeScriptSpecific() { return false; }

        // Empty tokens are never incrementally reusable.
        public isIncrementallyUnusable() { return true; }

        public fullWidth() { return 0; }
        public width() { return 0; }
        public text() { return ""; }
        public fullText(): string { return ""; }
        public value(): any { return null; }
        public valueText() { return ""; }

        public hasLeadingTrivia() { return false; }
        public hasLeadingComment() { return false; }
        public hasLeadingNewLine() { return false; }
        public hasLeadingSkippedText() { return false; }
        public leadingTriviaWidth() { return 0; }
        public hasTrailingTrivia() { return false; }
        public hasTrailingComment() { return false; }
        public hasTrailingNewLine() { return false; }
        public hasTrailingSkippedText() { return false; }
        public hasSkippedToken() { return false; }

        public trailingTriviaWidth() { return 0; }
        public leadingTrivia(): ISyntaxTriviaList { return Syntax.emptyTriviaList; }
        public trailingTrivia(): ISyntaxTriviaList { return Syntax.emptyTriviaList; }
        public realize(): ISyntaxToken { return realizeToken(this); }
        public collectTextElements(elements: string[]): void { }

        public withLeadingTrivia(leadingTrivia: ISyntaxTriviaList): ISyntaxToken {
            return this.realize().withLeadingTrivia(leadingTrivia);
        }

        public withTrailingTrivia(trailingTrivia: ISyntaxTriviaList): ISyntaxToken {
            return this.realize().withTrailingTrivia(trailingTrivia);
        }

        public isExpression(): boolean {
            return isExpression(this);
        }

        public isPrimaryExpression(): boolean {
            return this.isExpression();
        }

        public isMemberExpression(): boolean {
            return this.isExpression();
        }

        public isPostfixExpression(): boolean {
            return this.isExpression();
        }

        public isUnaryExpression(): boolean {
            return this.isExpression();
        }
    }

    export function emptyToken(kind: SyntaxKind): ISyntaxToken {
        return new EmptyToken(kind);
    }

    class RealizedToken implements ISyntaxToken {
        public tokenKind: SyntaxKind;
        // public tokenKeywordKind: SyntaxKind;
        private _leadingTrivia: ISyntaxTriviaList;
        private _text: string;
        private _value: any;
        private _valueText: string;
        private _trailingTrivia: ISyntaxTriviaList;

        constructor(tokenKind: SyntaxKind,
                    leadingTrivia: ISyntaxTriviaList,
                    text: string,
                    value: any,
                    valueText: string,
                    trailingTrivia: ISyntaxTriviaList) {
            this.tokenKind = tokenKind;
            this._leadingTrivia = leadingTrivia;
            this._text = text;
            this._value = value;
            this._valueText = valueText;
            this._trailingTrivia = trailingTrivia;
        }

        public clone(): ISyntaxToken {
            return new RealizedToken(this.tokenKind, /*this.tokenKeywordKind,*/ this._leadingTrivia,
                this._text, this._value, this._valueText, this._trailingTrivia);
        }

        public kind(): SyntaxKind { return this.tokenKind; }
        public toJSON(key: any): any { return tokenToJSON(this); }
        public firstToken() { return this; }
        public lastToken() { return this; }
        public isTypeScriptSpecific() { return false; }

        // Realized tokens are created from the parser.  They are *never* incrementally reusable.
        public isIncrementallyUnusable() { return true; }

        public accept(visitor: ISyntaxVisitor): any { return visitor.visitToken(this); }

        public childCount(): number {
            return 0;
        }

        public childAt(index: number): ISyntaxElement {
            throw Errors.argumentOutOfRange("index");
        }

        public isToken(): boolean { return true; }
        public isNode(): boolean { return false; }
        public isList(): boolean { return false; }
        public isSeparatedList(): boolean { return false; }
        public isTrivia(): boolean { return false; }
        public isTriviaList(): boolean { return false; }

        public fullWidth(): number { return this._leadingTrivia.fullWidth() + this.width() + this._trailingTrivia.fullWidth(); }
        public width(): number { return this.text().length; }

        public text(): string { return this._text; }
        public fullText(): string { return this._leadingTrivia.fullText() + this.text() + this._trailingTrivia.fullText(); }

        public value(): any { return this._value; }
        public valueText(): string { return this._valueText; }

        public hasLeadingTrivia(): boolean { return this._leadingTrivia.count() > 0; }
        public hasLeadingComment(): boolean { return this._leadingTrivia.hasComment(); }
        public hasLeadingNewLine(): boolean { return this._leadingTrivia.hasNewLine(); }
        public hasLeadingSkippedText(): boolean { return this._leadingTrivia.hasSkippedToken(); }
        public leadingTriviaWidth(): number { return this._leadingTrivia.fullWidth(); }

        public hasTrailingTrivia(): boolean { return this._trailingTrivia.count() > 0; }
        public hasTrailingComment(): boolean { return this._trailingTrivia.hasComment(); }
        public hasTrailingNewLine(): boolean { return this._trailingTrivia.hasNewLine(); }
        public hasTrailingSkippedText(): boolean { return this._trailingTrivia.hasSkippedToken(); }
        public trailingTriviaWidth(): number { return this._trailingTrivia.fullWidth(); }

        public hasSkippedToken(): boolean { return this.hasLeadingSkippedText() || this.hasTrailingSkippedText(); }

        public leadingTrivia(): ISyntaxTriviaList { return this._leadingTrivia; }
        public trailingTrivia(): ISyntaxTriviaList { return this._trailingTrivia; }

        private findTokenInternal(parent: PositionedElement, position: number, fullStart: number): PositionedToken {
            return new PositionedToken(parent, this, fullStart);
        }

        public collectTextElements(elements: string[]): void {
            this.leadingTrivia().collectTextElements(elements);
            elements.push(this.text());
            this.trailingTrivia().collectTextElements(elements);
        }

        public withLeadingTrivia(leadingTrivia: ISyntaxTriviaList): ISyntaxToken {
            return new RealizedToken(
                this.tokenKind, leadingTrivia, this._text, this._value, this._valueText, this._trailingTrivia);
        }

        public withTrailingTrivia(trailingTrivia: ISyntaxTriviaList): ISyntaxToken {
            return new RealizedToken(
                this.tokenKind,  this._leadingTrivia, this._text, this._value, this._valueText, trailingTrivia);
        }

        public isExpression(): boolean {
            return isExpression(this);
        }

        public isPrimaryExpression(): boolean {
            return this.isExpression();
        }

        public isMemberExpression(): boolean {
            return this.isExpression();
        }

        public isPostfixExpression(): boolean {
            return this.isExpression();
        }

        public isUnaryExpression(): boolean {
            return this.isExpression();
        }
    }

    export function token(kind: SyntaxKind, info: ITokenInfo = null): ISyntaxToken {
        var text = (info !== null && info.text !== undefined) ? info.text : SyntaxFacts.getText(kind);

        return new RealizedToken(
            kind,
            Syntax.triviaList(info === null ? null : info.leadingTrivia),
            text,
            value1(kind, text),
            valueText1(kind, text),
            Syntax.triviaList(info === null ? null : info.trailingTrivia));
    }
    
    export function identifier(text: string, info: ITokenInfo = null): ISyntaxToken {
        info = info || {};
        info.text = text;
        return token(SyntaxKind.IdentifierName, info);
    }
}