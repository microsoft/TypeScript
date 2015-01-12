// These utilities are common to multiple language service features.
module ts {
    export interface ListItemInfo {
        listItemIndex: number;
        list: Node;
    }

    export function getEndLinePosition(line: number, sourceFile: SourceFile): number {
        Debug.assert(line >= 1);
        var lineStarts = sourceFile.getLineStarts();
        
        // lines returned by SourceFile.getLineAndCharacterForPosition are 1-based
        var lineIndex = line - 1;
        if (lineIndex === lineStarts.length - 1) {
            // last line - return EOF
            return sourceFile.text.length - 1;
        }
        else {
            // current line start
            var start = lineStarts[lineIndex];
            // take the start position of the next line -1 = it should be some line break
            var pos = lineStarts[lineIndex + 1] - 1;
            Debug.assert(isLineBreak(sourceFile.text.charCodeAt(pos)));
            // walk backwards skipping line breaks, stop the the beginning of current line.
            // i.e:
            // <some text>
            // $ <- end of line for this position should match the start position
            while (start <= pos && isLineBreak(sourceFile.text.charCodeAt(pos))) {
                pos--;
            }
            return pos;
        }
    }

    export function getStartPositionOfLine(line: number, sourceFile: SourceFile): number {
        Debug.assert(line >= 1);
        return sourceFile.getLineStarts()[line - 1];
    }

    export function getStartLinePositionForPosition(position: number, sourceFile: SourceFile): number {
        var lineStarts = sourceFile.getLineStarts();
        var line = sourceFile.getLineAndCharacterFromPosition(position).line;
        return lineStarts[line - 1];
    }

    export function nodeArrayContainsSpan(array: NodeArray<Node>, r2: TextSpan): boolean {
        return startEndContainsSpan(array.start, nodeArrayEnd(array), r2);
    }

    export function spanContainsSpan(r1: TextSpan, r2: TextSpan): boolean {
        return startEndContainsSpan(r1.start, textSpanEnd(r1), r2);
    }

    export function startEndContainsSpan(start: number, end: number, span: TextSpan): boolean {
        return start <= span.start && end >= textSpanEnd(span);
    }

    export function nodeArrayContainsStartEnd(array: NodeArray<Node>, start: number, end: number): boolean {
        return array.start <= start && nodeArrayEnd(array) >= end;
    }

    export function rangeContainsStartEnd(span: TextSpan, start: number, end: number): boolean {
        return span.start <= start && textSpanEnd(span) >= end;
    }

    export function rangeOverlapsWithStartEnd(r1: TextSpan, start: number, end: number) {
        return startEndOverlapsWithStartEnd(r1.start, textSpanEnd(r1), start, end);
    }

    export function startEndOverlapsWithStartEnd(start1: number, end1: number, start2: number, end2: number) {
        var start = Math.max(start1, start2);
        var end = Math.min(end1, end2);
        return start < end;
    }

    export function findListItemInfo(node: Node): ListItemInfo {
        var list = findContainingList(node);

        // It is possible at this point for syntaxList to be undefined, either if
        // node.parent had no list child, or if none of its list children contained
        // the span of node. If this happens, return undefined. The caller should
        // handle this case.
        if (!list) {
            return undefined;
        }

        var children = list.getChildren();
        var listItemIndex = indexOf(children, node);

        return {
            listItemIndex,
            list
        };
    }

    export function findChildOfKind(n: Node, kind: SyntaxKind, sourceFile?: SourceFile): Node {
        return forEach(n.getChildren(sourceFile), c => c.kind === kind && c);
    }

    export function findContainingList(node: Node): Node {
        // The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
        // be parented by the container of the SyntaxList, not the SyntaxList itself.
        // In order to find the list item index, we first need to locate SyntaxList itself and then search
        // for the position of the relevant node (or comma).
        var syntaxList = forEach(node.parent.getChildren(), c => {
            // find syntax list that covers the span of the node
            if (c.kind === SyntaxKind.SyntaxList && c.start <= node.start && textSpanEnd(c) >= textSpanEnd(node)) {
                return c;
            }
        });

        return syntaxList;
    }

    /* Gets the token whose text has range [start, end) and 
     * position >= start and (position < end or (position === end && token is keyword or identifier))
     */
    export function getTouchingWord(sourceFile: SourceFile, position: number): Node {
        return getTouchingToken(sourceFile, position, n => isWord(n.kind));
    }

    /* Gets the token whose text has range [start, end) and position >= start 
     * and (position < end or (position === end && token is keyword or identifier or numeric\string litera))
     */
    export function getTouchingPropertyName(sourceFile: SourceFile, position: number): Node {
        return getTouchingToken(sourceFile, position, n => isPropertyName(n.kind));
    }

    /** Returns the token if position is in [start, end) or if position === end and includeItemAtEndPosition(token) === true */
    export function getTouchingToken(sourceFile: SourceFile, position: number, includeItemAtEndPosition?: (n: Node) => boolean): Node {
        return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ false, includeItemAtEndPosition);
    }

    /** Returns a token if position is in [start-of-leading-trivia, end) */
    export function getTokenAtPosition(sourceFile: SourceFile, position: number): Node {
        return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ true, /*includeItemAtEndPosition*/ undefined);
    }

    /** Get the token whose text contains the position */
    function getTokenAtPositionWorker(sourceFile: SourceFile, position: number, allowPositionInLeadingTrivia: boolean, includeItemAtEndPosition: (n: Node) => boolean): Node {
        var current: Node = sourceFile;
        outer: while (true) {
            if (isToken(current)) {
                // exit early
                return current;
            }

            // find the child that contains 'position'
            for (var i = 0, n = current.getChildCount(sourceFile); i < n; i++) {
                var child = current.getChildAt(i);
                var start = allowPositionInLeadingTrivia ? child.getFullStart() : child.getStart(sourceFile);
                if (start <= position) {
                    var end = child.getEnd();
                    if (position < end || (position === end && child.kind === SyntaxKind.EndOfFileToken)) {
                        current = child;
                        continue outer;
                    }
                    else if (includeItemAtEndPosition && end === position) {
                        var previousToken = findPrecedingToken(position, sourceFile, child);
                        if (previousToken && includeItemAtEndPosition(previousToken)) {
                            return previousToken;
                        }
                    }
                }
            }
            return current;
        }
    }

    /**
      * The token on the left of the position is the token that strictly includes the position
      * or sits to the left of the cursor if it is on a boundary. For example
      *
      *   fo|o               -> will return foo
      *   foo <comment> |bar -> will return foo
      *
      */
    export function findTokenOnLeftOfPosition(file: SourceFile, position: number): Node {
        // Ideally, getTokenAtPosition should return a token. However, it is currently
        // broken, so we do a check to make sure the result was indeed a token.
        var tokenAtPosition = getTokenAtPosition(file, position);
        if (isToken(tokenAtPosition) && position > tokenAtPosition.getStart(file) && position < tokenAtPosition.getEnd()) {
            return tokenAtPosition;
        }

        return findPrecedingToken(position, file);
    }

    export function findNextToken(previousToken: Node, parent: Node): Node {
        return find(parent);

        function find(n: Node): Node {
            if (isToken(n) && n.start === textSpanEnd(previousToken)) {
                // this is token that starts at the end of previous token - return it
                return n;
            }

            var children = n.getChildren();
            for (var i = 0, len = children.length; i < len; ++i) {
                var child = children[i];
                var shouldDiveInChildNode =
                    // previous token is enclosed somewhere in the child
                    (child.start <= previousToken.start && textSpanEnd(child) > textSpanEnd(previousToken)) ||
                    // previous token ends exactly at the beginning of child
                    (child.start === textSpanEnd(previousToken));

                if (shouldDiveInChildNode && nodeHasTokens(child)) {
                    return find(child);
                }
            }

            return undefined;
        }
    }

    export function findPrecedingToken(position: number, sourceFile: SourceFile, startNode?: Node): Node {
        return find(startNode || sourceFile);

        function findRightmostToken(n: Node): Node {
            if (isToken(n)) {
                return n;
            }

            var children = n.getChildren();
            var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
            return candidate && findRightmostToken(candidate);

        }

        function find(n: Node): Node {
            if (isToken(n)) {
                return n;
            }

            var children = n.getChildren();
            for (var i = 0, len = children.length; i < len; ++i) {
                var child = children[i];
                if (nodeHasTokens(child)) {
                    if (position <= textSpanEnd(child)) {
                        if (child.getStart(sourceFile) >= position) {
                            // actual start of the node is past the position - previous token should be at the end of previous child
                            var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i);
                            return candidate && findRightmostToken(candidate)
                        }
                        else {
                            // candidate should be in this node
                            return find(child);
                        }
                    }
                }
            }

            Debug.assert(startNode !== undefined || n.kind === SyntaxKind.SourceFile);

            // Here we know that none of child token nodes embrace the position, 
            // the only known case is when position is at the end of the file.
            // Try to find the rightmost token in the file without filtering.
            // Namely we are skipping the check: 'position < node.end'
            if (children.length) {
                var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
                return candidate && findRightmostToken(candidate);
            }
        }

        /// finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
        function findRightmostChildNodeWithTokens(children: Node[], exclusiveStartPosition: number): Node {
            for (var i = exclusiveStartPosition - 1; i >= 0; --i) {
                if (nodeHasTokens(children[i])) {
                    return children[i];
                }
            }
        }
    }

    function nodeHasTokens(n: Node): boolean {
        // If we have a token or node that has a non-zero width, it must have tokens.
        // Note, that getWidth() does not take trivia into account.
        return n.getWidth() !== 0;
    }

    export function getNodeModifiers(node: Node): string {
        var flags = getCombinedNodeFlags(node);
        var result: string[] = [];

        if (flags & NodeFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
        if (flags & NodeFlags.Protected) result.push(ScriptElementKindModifier.protectedMemberModifier);
        if (flags & NodeFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
        if (flags & NodeFlags.Static) result.push(ScriptElementKindModifier.staticModifier);
        if (flags & NodeFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
        if (isInAmbientContext(node)) result.push(ScriptElementKindModifier.ambientModifier);

        return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
    }

    export function getTypeArgumentOrTypeParameterList(node: Node): NodeArray<Node> {
        if (node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.CallExpression) {
            return (<CallExpression>node).typeArguments;
        }

        if (isAnyFunction(node) || node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.InterfaceDeclaration) {
            return (<FunctionLikeDeclaration>node).typeParameters;
        }

        return undefined;
    }

    export function isToken(n: Node): boolean {
        return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
    }

    function isWord(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.Identifier || isKeyword(kind);
    }

    function isPropertyName(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NumericLiteral || isWord(kind);
    }

    export function isComment(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.SingleLineCommentTrivia || kind === SyntaxKind.MultiLineCommentTrivia;
    }

    export function isPunctuation(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstPunctuation <= kind && kind <= SyntaxKind.LastPunctuation;
    }

    export function isInsideTemplateLiteral(node: LiteralExpression, position: number) {
        return isTemplateLiteralKind(node.kind)
            && (node.getStart() < position && position < node.getEnd()) || (!!node.isUnterminated && position === node.getEnd());
    }

    export function compareDataObjects(dst: any, src: any): boolean {
        for (var e in dst) {
            if (typeof dst[e] === "object") {
                if (!compareDataObjects(dst[e], src[e])) {
                    return false;
                }
            }
            else if (typeof dst[e] !== "function") {
                if (dst[e] !== src[e]) {
                    return false;
                }
            }
        }
        return true;
    }
}

// Display-part writer helpers
module ts {
    export function isFirstDeclarationOfSymbolParameter(symbol: Symbol) {
        return symbol.declarations && symbol.declarations.length > 0 && symbol.declarations[0].kind === SyntaxKind.Parameter;
    }

    var displayPartWriter = getDisplayPartWriter();
    function getDisplayPartWriter(): DisplayPartsSymbolWriter {
        var displayParts: SymbolDisplayPart[];
        var lineStart: boolean;
        var indent: number;

        resetWriter();
        return {
            displayParts: () => displayParts,
            writeKeyword: text => writeKind(text, SymbolDisplayPartKind.keyword),
            writeOperator: text => writeKind(text, SymbolDisplayPartKind.operator),
            writePunctuation: text => writeKind(text, SymbolDisplayPartKind.punctuation),
            writeSpace: text => writeKind(text, SymbolDisplayPartKind.space),
            writeStringLiteral: text => writeKind(text, SymbolDisplayPartKind.stringLiteral),
            writeParameter: text => writeKind(text, SymbolDisplayPartKind.parameterName),
            writeSymbol,
            writeLine,
            increaseIndent: () => { indent++; },
            decreaseIndent: () => { indent--; },
            clear: resetWriter,
            trackSymbol: () => { }
        };

        function writeIndent() {
            if (lineStart) {
                var indentString = getIndentString(indent);
                if (indentString) {
                    displayParts.push(displayPart(indentString, SymbolDisplayPartKind.space));
                }
                lineStart = false;
            }
        }

        function writeKind(text: string, kind: SymbolDisplayPartKind) {
            writeIndent();
            displayParts.push(displayPart(text, kind));
        }

        function writeSymbol(text: string, symbol: Symbol) {
            writeIndent();
            displayParts.push(symbolPart(text, symbol));
        }

        function writeLine() {
            displayParts.push(lineBreakPart());
            lineStart = true;
        }

        function resetWriter() {
            displayParts = []
            lineStart = true;
            indent = 0;
        }
    }

    export function symbolPart(text: string, symbol: Symbol) {
        return displayPart(text, displayPartKind(symbol), symbol);

        function displayPartKind(symbol: Symbol): SymbolDisplayPartKind {
            var flags = symbol.flags;

            if (flags & SymbolFlags.Variable) {
                return isFirstDeclarationOfSymbolParameter(symbol) ? SymbolDisplayPartKind.parameterName : SymbolDisplayPartKind.localName;
            }
            else if (flags & SymbolFlags.Property) { return SymbolDisplayPartKind.propertyName; }
            else if (flags & SymbolFlags.GetAccessor) { return SymbolDisplayPartKind.propertyName; }
            else if (flags & SymbolFlags.SetAccessor) { return SymbolDisplayPartKind.propertyName; }
            else if (flags & SymbolFlags.EnumMember) { return SymbolDisplayPartKind.enumMemberName; }
            else if (flags & SymbolFlags.Function) { return SymbolDisplayPartKind.functionName; }
            else if (flags & SymbolFlags.Class) { return SymbolDisplayPartKind.className; }
            else if (flags & SymbolFlags.Interface) { return SymbolDisplayPartKind.interfaceName; }
            else if (flags & SymbolFlags.Enum) { return SymbolDisplayPartKind.enumName; }
            else if (flags & SymbolFlags.Module) { return SymbolDisplayPartKind.moduleName; }
            else if (flags & SymbolFlags.Method) { return SymbolDisplayPartKind.methodName; }
            else if (flags & SymbolFlags.TypeParameter) { return SymbolDisplayPartKind.typeParameterName; }
            else if (flags & SymbolFlags.TypeAlias) { return SymbolDisplayPartKind.aliasName; }
            else if (flags & SymbolFlags.Import) { return SymbolDisplayPartKind.aliasName; }


            return SymbolDisplayPartKind.text;
        }
    }

    export function displayPart(text: string, kind: SymbolDisplayPartKind, symbol?: Symbol): SymbolDisplayPart {
        return <SymbolDisplayPart> {
            text: text,
            kind: SymbolDisplayPartKind[kind]
        };
    }

    export function spacePart() {
        return displayPart(" ", SymbolDisplayPartKind.space);
    }

    export function keywordPart(kind: SyntaxKind) {
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.keyword);
    }

    export function punctuationPart(kind: SyntaxKind) {
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.punctuation);
    }

    export function operatorPart(kind: SyntaxKind) {
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.operator);
    }

    export function textPart(text: string) {
        return displayPart(text, SymbolDisplayPartKind.text);
    }

    export function lineBreakPart() {
        return displayPart("\n", SymbolDisplayPartKind.lineBreak);
    }

    export function mapToDisplayParts(writeDisplayParts: (writer: DisplayPartsSymbolWriter) => void): SymbolDisplayPart[] {
        writeDisplayParts(displayPartWriter);
        var result = displayPartWriter.displayParts();
        displayPartWriter.clear();
        return result;
    }

    export function typeToDisplayParts(typechecker: TypeChecker, type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[] {
        return mapToDisplayParts(writer => {
            typechecker.getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        });
    }

    export function symbolToDisplayParts(typeChecker: TypeChecker, symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): SymbolDisplayPart[] {
        return mapToDisplayParts(writer => {
            typeChecker.getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning, flags);
        });
    }

    export function signatureToDisplayParts(typechecker: TypeChecker, signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[] {
        return mapToDisplayParts(writer => {
            typechecker.getSymbolDisplayBuilder().buildSignatureDisplay(signature, writer, enclosingDeclaration, flags);
        });
    }
}