// These utilities are common to multiple language service features.
/* @internal */
namespace ts {
    export interface ListItemInfo {
        listItemIndex: number;
        list: Node;
    }

    export function getEndLinePosition(line: number, sourceFile: SourceFile): number {
        Debug.assert(line >= 0);
        let lineStarts = sourceFile.getLineStarts();
        
        let lineIndex = line;
        if (lineIndex + 1 === lineStarts.length) {
            // last line - return EOF
            return sourceFile.text.length - 1;
        }
        else {
            // current line start
            let start = lineStarts[lineIndex];
            // take the start position of the next line -1 = it should be some line break
            let pos = lineStarts[lineIndex + 1] - 1;
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

    export function getLineStartPositionForPosition(position: number, sourceFile: SourceFile): number {
        let lineStarts = sourceFile.getLineStarts();
        let line = sourceFile.getLineAndCharacterOfPosition(position).line;
        return lineStarts[line];
    }

    export function rangeContainsRange(r1: TextRange, r2: TextRange): boolean {
        return startEndContainsRange(r1.pos, r1.end, r2);
    }

    export function startEndContainsRange(start: number, end: number, range: TextRange): boolean {
        return start <= range.pos && end >= range.end;
    }

    export function rangeContainsStartEnd(range: TextRange, start: number, end: number): boolean {
        return range.pos <= start && range.end >= end;
    }

    export function rangeOverlapsWithStartEnd(r1: TextRange, start: number, end: number) {
        return startEndOverlapsWithStartEnd(r1.pos, r1.end, start, end);
    }

    export function startEndOverlapsWithStartEnd(start1: number, end1: number, start2: number, end2: number) {
        let start = Math.max(start1, start2);
        let end = Math.min(end1, end2);
        return start < end;
    }

    export function positionBelongsToNode(candidate: Node, position: number, sourceFile: SourceFile): boolean {
        return candidate.end > position || !isCompletedNode(candidate, sourceFile);
    }

    export function isCompletedNode(n: Node, sourceFile: SourceFile): boolean {
        if (nodeIsMissing(n)) {
            return false;
        }

        switch (n.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.Block:
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.CaseBlock:
                return nodeEndsWith(n, SyntaxKind.CloseBraceToken, sourceFile);
            case SyntaxKind.CatchClause:
                return isCompletedNode((<CatchClause>n).block, sourceFile);
            case SyntaxKind.NewExpression:
                if (!(<NewExpression>n).arguments) {
                    return true;
                }
            // fall through
            case SyntaxKind.CallExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ParenthesizedType:
                return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);

            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return isCompletedNode((<SignatureDeclaration>n).type, sourceFile);

            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ArrowFunction:
                if ((<FunctionLikeDeclaration>n).body) {
                    return isCompletedNode((<FunctionLikeDeclaration>n).body, sourceFile);
                }

                if ((<FunctionLikeDeclaration>n).type) {
                    return isCompletedNode((<FunctionLikeDeclaration>n).type, sourceFile);
                }

                // Even though type parameters can be unclosed, we can get away with
                // having at least a closing paren.
                return hasChildOfKind(n, SyntaxKind.CloseParenToken, sourceFile);

            case SyntaxKind.ModuleDeclaration:
                return (<ModuleDeclaration>n).body && isCompletedNode((<ModuleDeclaration>n).body, sourceFile);

            case SyntaxKind.IfStatement:
                if ((<IfStatement>n).elseStatement) {
                    return isCompletedNode((<IfStatement>n).elseStatement, sourceFile);
                }
                return isCompletedNode((<IfStatement>n).thenStatement, sourceFile);

            case SyntaxKind.ExpressionStatement:
                return isCompletedNode((<ExpressionStatement>n).expression, sourceFile);

            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.ComputedPropertyName:
            case SyntaxKind.TupleType:
                return nodeEndsWith(n, SyntaxKind.CloseBracketToken, sourceFile);

            case SyntaxKind.IndexSignature:
                if ((<IndexSignatureDeclaration>n).type) {
                    return isCompletedNode((<IndexSignatureDeclaration>n).type, sourceFile);
                }

                return hasChildOfKind(n, SyntaxKind.CloseBracketToken, sourceFile);

            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                // there is no such thing as terminator token for CaseClause/DefaultClause so for simplicitly always consider them non-completed
                return false;

            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WhileStatement:
                return isCompletedNode((<IterationStatement>n).statement, sourceFile);
            case SyntaxKind.DoStatement:
                // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
                let hasWhileKeyword = findChildOfKind(n, SyntaxKind.WhileKeyword, sourceFile);
                if (hasWhileKeyword) {
                    return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);
                }
                return isCompletedNode((<DoStatement>n).statement, sourceFile);

            case SyntaxKind.TypeQuery:
                return isCompletedNode((<TypeQueryNode>n).exprName, sourceFile);

            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.YieldExpression:
            case SyntaxKind.SpreadElementExpression:
                let unaryWordExpression = (<TypeOfExpression|DeleteExpression|VoidExpression|YieldExpression|SpreadElementExpression>n);
                return isCompletedNode(unaryWordExpression.expression, sourceFile);

            case SyntaxKind.TaggedTemplateExpression:
                return isCompletedNode((<TaggedTemplateExpression>n).template, sourceFile);
            case SyntaxKind.TemplateExpression:
                let lastSpan = lastOrUndefined((<TemplateExpression>n).templateSpans);
                return isCompletedNode(lastSpan, sourceFile);
            case SyntaxKind.TemplateSpan:
                return nodeIsPresent((<TemplateSpan>n).literal);

            case SyntaxKind.PrefixUnaryExpression:
                return isCompletedNode((<PrefixUnaryExpression>n).operand, sourceFile);
            case SyntaxKind.BinaryExpression:
                return isCompletedNode((<BinaryExpression>n).right, sourceFile);
            case SyntaxKind.ConditionalExpression:
                return isCompletedNode((<ConditionalExpression>n).whenFalse, sourceFile);

            default:
                return true;
        }
    }

    /*
     * Checks if node ends with 'expectedLastToken'.
     * If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
     */
    function nodeEndsWith(n: Node, expectedLastToken: SyntaxKind, sourceFile: SourceFile): boolean {
        let children = n.getChildren(sourceFile);
        if (children.length) {
            let last = lastOrUndefined(children);
            if (last.kind === expectedLastToken) {
                return true;
            }
            else if (last.kind === SyntaxKind.SemicolonToken && children.length !== 1) {
                return children[children.length - 2].kind === expectedLastToken;
            }
        }
        return false;
    }

    export function findListItemInfo(node: Node): ListItemInfo {
        let list = findContainingList(node);

        // It is possible at this point for syntaxList to be undefined, either if
        // node.parent had no list child, or if none of its list children contained
        // the span of node. If this happens, return undefined. The caller should
        // handle this case.
        if (!list) {
            return undefined;
        }

        let children = list.getChildren();
        let listItemIndex = indexOf(children, node);

        return {
            listItemIndex,
            list
        };
    }

    export function hasChildOfKind(n: Node, kind: SyntaxKind, sourceFile?: SourceFile): boolean {
        return !!findChildOfKind(n, kind, sourceFile);
    }

    export function findChildOfKind(n: Node, kind: SyntaxKind, sourceFile?: SourceFile): Node {
        return forEach(n.getChildren(sourceFile), c => c.kind === kind && c);
    }

    export function findContainingList(node: Node): Node {
        // The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
        // be parented by the container of the SyntaxList, not the SyntaxList itself.
        // In order to find the list item index, we first need to locate SyntaxList itself and then search
        // for the position of the relevant node (or comma).
        let syntaxList = forEach(node.parent.getChildren(), c => {
            // find syntax list that covers the span of the node
            if (c.kind === SyntaxKind.SyntaxList && c.pos <= node.pos && c.end >= node.end) {
                return c;
            }
        });

        // Either we didn't find an appropriate list, or the list must contain us.
        Debug.assert(!syntaxList || contains(syntaxList.getChildren(), node)); 
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
        let current: Node = sourceFile;
        outer: while (true) {
            if (isToken(current)) {
                // exit early
                return current;
            }

            // find the child that contains 'position'
            for (let i = 0, n = current.getChildCount(sourceFile); i < n; i++) {
                let child = current.getChildAt(i);
                let start = allowPositionInLeadingTrivia ? child.getFullStart() : child.getStart(sourceFile);
                if (start <= position) {
                    let end = child.getEnd();
                    if (position < end || (position === end && child.kind === SyntaxKind.EndOfFileToken)) {
                        current = child;
                        continue outer;
                    }
                    else if (includeItemAtEndPosition && end === position) {
                        let previousToken = findPrecedingToken(position, sourceFile, child);
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
        let tokenAtPosition = getTokenAtPosition(file, position);
        if (isToken(tokenAtPosition) && position > tokenAtPosition.getStart(file) && position < tokenAtPosition.getEnd()) {
            return tokenAtPosition;
        }

        return findPrecedingToken(position, file);
    }

    export function findNextToken(previousToken: Node, parent: Node): Node {
        return find(parent);

        function find(n: Node): Node {
            if (isToken(n) && n.pos === previousToken.end) {
                // this is token that starts at the end of previous token - return it
                return n;
            }

            let children = n.getChildren();
            for (let child of children) {
                let shouldDiveInChildNode =
                    // previous token is enclosed somewhere in the child
                    (child.pos <= previousToken.pos && child.end > previousToken.end) ||
                    // previous token ends exactly at the beginning of child
                    (child.pos === previousToken.end);

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
            if (isToken(n) || n.kind === SyntaxKind.JsxText) {
                return n;
            }

            let children = n.getChildren();
            let candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
            return candidate && findRightmostToken(candidate);

        }

        function find(n: Node): Node {
            if (isToken(n) || n.kind === SyntaxKind.JsxText) {
                return n;
            }

            const children = n.getChildren();
            for (let i = 0, len = children.length; i < len; i++) {
                let child = children[i];
                // condition 'position < child.end' checks if child node end after the position
                // in the example below this condition will be false for 'aaaa' and 'bbbb' and true for 'ccc'
                // aaaa___bbbb___$__ccc
                // after we found child node with end after the position we check if start of the node is after the position.
                // if yes - then position is in the trivia and we need to look into the previous child to find the token in question.
                // if no - position is in the node itself so we should recurse in it.
                // NOTE: JsxText is a weird kind of node that can contain only whitespaces (since they are not counted as trivia).
                // if this is the case - then we should assume that token in question is located in previous child.
                if (position < child.end && (nodeHasTokens(child) || child.kind === SyntaxKind.JsxText)) {
                    const start = child.getStart(sourceFile);
                    const lookInPreviousChild = 
                        (start >= position) || // cursor in the leading trivia
                        (child.kind === SyntaxKind.JsxText && start === child.end); // whitespace only JsxText 
                    
                    if (lookInPreviousChild) {
                        // actual start of the node is past the position - previous token should be at the end of previous child
                        let candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i);
                        return candidate && findRightmostToken(candidate)
                    }
                    else {
                        // candidate should be in this node
                        return find(child);
                    }
                }
            }

            Debug.assert(startNode !== undefined || n.kind === SyntaxKind.SourceFile);

            // Here we know that none of child token nodes embrace the position, 
            // the only known case is when position is at the end of the file.
            // Try to find the rightmost token in the file without filtering.
            // Namely we are skipping the check: 'position < node.end'
            if (children.length) {
                let candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
                return candidate && findRightmostToken(candidate);
            }
        }

        /// finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
        function findRightmostChildNodeWithTokens(children: Node[], exclusiveStartPosition: number): Node {
            for (let i = exclusiveStartPosition - 1; i >= 0; --i) {
                if (nodeHasTokens(children[i])) {
                    return children[i];
                }
            }
        }
    }
    
    export function isInString(sourceFile: SourceFile, position: number) {
        let token = getTokenAtPosition(sourceFile, position);
        return token && token.kind === SyntaxKind.StringLiteral && position > token.getStart();
    }

    export function isInComment(sourceFile: SourceFile, position: number) {
        return isInCommentHelper(sourceFile, position, /*predicate*/ undefined);
    }

    /**
     * Returns true if the cursor at position in sourceFile is within a comment that additionally
     * satisfies predicate, and false otherwise.
     */
    export function isInCommentHelper(sourceFile: SourceFile, position: number, predicate?: (c: CommentRange) => boolean): boolean {
        let token = getTokenAtPosition(sourceFile, position);

        if (token && position <= token.getStart()) {
            let commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);
                
            // The end marker of a single-line comment does not include the newline character.
            // In the following case, we are inside a comment (^ denotes the cursor position):
            //
            //    // asdf   ^\n
            //
            // But for multi-line comments, we don't want to be inside the comment in the following case:
            //
            //    /* asdf */^
            //
            // Internally, we represent the end of the comment at the newline and closing '/', respectively.
            return predicate ?
                forEach(commentRanges, c => c.pos < position &&
                    (c.kind == SyntaxKind.SingleLineCommentTrivia ? position <= c.end : position < c.end) &&
                    predicate(c)) :
                forEach(commentRanges, c => c.pos < position &&
                    (c.kind == SyntaxKind.SingleLineCommentTrivia ? position <= c.end : position < c.end));
        }

        return false;
    }

    export function hasDocComment(sourceFile: SourceFile, position: number) {
        let token = getTokenAtPosition(sourceFile, position);

        // First, we have to see if this position actually landed in a comment.
        let commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);

        return forEach(commentRanges, jsDocPrefix);
        
        function jsDocPrefix(c: CommentRange): boolean {
            var text = sourceFile.text;
            return text.length >= c.pos + 3 && text[c.pos] === '/' && text[c.pos + 1] === '*' && text[c.pos + 2] === '*';
        }
    }

    /**
     * Get the corresponding JSDocTag node if the position is in a jsDoc comment
     */
    export function getJsDocTagAtPosition(sourceFile: SourceFile, position: number): JSDocTag {
        let node = ts.getTokenAtPosition(sourceFile, position);
        if (isToken(node)) {
            switch (node.kind) {
                case SyntaxKind.VarKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ConstKeyword:
                    // if the current token is var, let or const, skip the VariableDeclarationList
                    node = node.parent === undefined ? undefined : node.parent.parent;
                    break;
                default:
                    node = node.parent;
                    break;
            }
        }

        if (node) {
            let jsDocComment = node.jsDocComment;
            if (jsDocComment) {
                for (let tag of jsDocComment.tags) {
                    if (tag.pos <= position && position <= tag.end) {
                        return tag;
                    }
                }
            }
        }

        return undefined;
    }

    function nodeHasTokens(n: Node): boolean {
        // If we have a token or node that has a non-zero width, it must have tokens.
        // Note, that getWidth() does not take trivia into account.
        return n.getWidth() !== 0;
    }

    export function getNodeModifiers(node: Node): string {
        let flags = getCombinedNodeFlags(node);
        let result: string[] = [];

        if (flags & NodeFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
        if (flags & NodeFlags.Protected) result.push(ScriptElementKindModifier.protectedMemberModifier);
        if (flags & NodeFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
        if (flags & NodeFlags.Static) result.push(ScriptElementKindModifier.staticModifier);
        if (flags & NodeFlags.Abstract) result.push(ScriptElementKindModifier.abstractModifier);
        if (flags & NodeFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
        if (isInAmbientContext(node)) result.push(ScriptElementKindModifier.ambientModifier);

        return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
    }

    export function getTypeArgumentOrTypeParameterList(node: Node): NodeArray<Node> {
        if (node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.CallExpression) {
            return (<CallExpression>node).typeArguments;
        }

        if (isFunctionLike(node) || node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.InterfaceDeclaration) {
            return (<FunctionLikeDeclaration>node).typeParameters;
        }

        return undefined;
    }

    export function isToken(n: Node): boolean {
        return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
    }

    export function isWord(kind: SyntaxKind): boolean {
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

    export function isAccessibilityModifier(kind: SyntaxKind) {
        switch (kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
                return true;
        }

        return false;
    }

    export function compareDataObjects(dst: any, src: any): boolean {
        for (let e in dst) {
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
/* @internal */
namespace ts {
    export function isFirstDeclarationOfSymbolParameter(symbol: Symbol) {
        return symbol.declarations && symbol.declarations.length > 0 && symbol.declarations[0].kind === SyntaxKind.Parameter;
    }

    let displayPartWriter = getDisplayPartWriter();
    function getDisplayPartWriter(): DisplayPartsSymbolWriter {
        let displayParts: SymbolDisplayPart[];
        let lineStart: boolean;
        let indent: number;

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
                let indentString = getIndentString(indent);
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
            let flags = symbol.flags;

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
            else if (flags & SymbolFlags.Alias) { return SymbolDisplayPartKind.aliasName; }

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

    export function textOrKeywordPart(text: string) {
        var kind = stringToToken(text);
        return kind === undefined
            ? textPart(text)
            : keywordPart(kind);
    }

    export function textPart(text: string) {
        return displayPart(text, SymbolDisplayPartKind.text);
    }

    const carriageReturnLineFeed = "\r\n";
    /**
     * The default is CRLF.
     */
    export function getNewLineOrDefaultFromHost(host: LanguageServiceHost | LanguageServiceShimHost) {
        return host.getNewLine ? host.getNewLine() : carriageReturnLineFeed;
    }

    export function lineBreakPart() {
        return displayPart("\n", SymbolDisplayPartKind.lineBreak);
    }

    export function mapToDisplayParts(writeDisplayParts: (writer: DisplayPartsSymbolWriter) => void): SymbolDisplayPart[] {
        writeDisplayParts(displayPartWriter);
        let result = displayPartWriter.displayParts();
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

    export function getDeclaredName(typeChecker: TypeChecker, symbol: Symbol, location: Node): string {
        // If this is an export or import specifier it could have been renamed using the 'as' syntax.
        // If so we want to search for whatever is under the cursor.
        if (isImportOrExportSpecifierName(location)) {
            return location.getText();
        }

        // Try to get the local symbol if we're dealing with an 'export default'
        // since that symbol has the "true" name.
        let localExportDefaultSymbol = getLocalSymbolForExportDefault(symbol);

        let name = typeChecker.symbolToString(localExportDefaultSymbol || symbol);

        return name;
    }

    export function isImportOrExportSpecifierName(location: Node): boolean {
        return location.parent &&
            (location.parent.kind === SyntaxKind.ImportSpecifier || location.parent.kind === SyntaxKind.ExportSpecifier) &&
            (<ImportOrExportSpecifier>location.parent).propertyName === location;
    }

    /**
     * Strip off existed single quotes or double quotes from a given string
     *
     * @return non-quoted string
     */
    export function stripQuotes(name: string) {
        let length = name.length;
        if (length >= 2 &&
            name.charCodeAt(0) === name.charCodeAt(length - 1) &&
            (name.charCodeAt(0) === CharacterCodes.doubleQuote || name.charCodeAt(0) === CharacterCodes.singleQuote)) {
            return name.substring(1, length - 1);
        };
        return name;
    }
}