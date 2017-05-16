// These utilities are common to multiple language service features.
/* @internal */
namespace ts {
    export const scanner: Scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);
    export const emptyArray: any[] = [];

    export const enum SemanticMeaning {
        None = 0x0,
        Value = 0x1,
        Type = 0x2,
        Namespace = 0x4,
        All = Value | Type | Namespace
    }

    export function getMeaningFromDeclaration(node: Node): SemanticMeaning {
        switch (node.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.CatchClause:
            case SyntaxKind.JsxAttribute:
                return SemanticMeaning.Value;

            case SyntaxKind.TypeParameter:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.TypeLiteral:
                return SemanticMeaning.Type;

            case SyntaxKind.EnumMember:
            case SyntaxKind.ClassDeclaration:
                return SemanticMeaning.Value | SemanticMeaning.Type;

            case SyntaxKind.EnumDeclaration:
                return SemanticMeaning.All;

            case SyntaxKind.ModuleDeclaration:
                if (isAmbientModule(<ModuleDeclaration>node)) {
                    return SemanticMeaning.Namespace | SemanticMeaning.Value;
                }
                else if (getModuleInstanceState(node) === ModuleInstanceState.Instantiated) {
                    return SemanticMeaning.Namespace | SemanticMeaning.Value;
                }
                else {
                    return SemanticMeaning.Namespace;
                }

            case SyntaxKind.NamedImports:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportAssignment:
            case SyntaxKind.ExportDeclaration:
                return SemanticMeaning.All;

            // An external module can be a Value
            case SyntaxKind.SourceFile:
                return SemanticMeaning.Namespace | SemanticMeaning.Value;
        }

        return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
    }

    export function getMeaningFromLocation(node: Node): SemanticMeaning {
        if (node.kind === SyntaxKind.SourceFile) {
            return SemanticMeaning.Value;
        }
        else if (node.parent.kind === SyntaxKind.ExportAssignment) {
            return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
        }
        else if (isInRightSideOfImport(node)) {
            return getMeaningFromRightHandSideOfImportEquals(node);
        }
        else if (isDeclarationName(node)) {
            return getMeaningFromDeclaration(node.parent);
        }
        else if (isTypeReference(node)) {
            return SemanticMeaning.Type;
        }
        else if (isNamespaceReference(node)) {
            return SemanticMeaning.Namespace;
        }
        else {
            return SemanticMeaning.Value;
        }
    }

    function getMeaningFromRightHandSideOfImportEquals(node: Node) {
        Debug.assert(node.kind === SyntaxKind.Identifier);

        //     import a = |b|; // Namespace
        //     import a = |b.c|; // Value, type, namespace
        //     import a = |b.c|.d; // Namespace

        if (node.parent.kind === SyntaxKind.QualifiedName &&
            (<QualifiedName>node.parent).right === node &&
            node.parent.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
            return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
        }
        return SemanticMeaning.Namespace;
    }

    function isInRightSideOfImport(node: Node) {
        while (node.parent.kind === SyntaxKind.QualifiedName) {
            node = node.parent;
        }
        return isInternalModuleImportEqualsDeclaration(node.parent) && (<ImportEqualsDeclaration>node.parent).moduleReference === node;
    }

    function isNamespaceReference(node: Node): boolean {
        return isQualifiedNameNamespaceReference(node) || isPropertyAccessNamespaceReference(node);
    }

    function isQualifiedNameNamespaceReference(node: Node): boolean {
        let root = node;
        let isLastClause = true;
        if (root.parent.kind === SyntaxKind.QualifiedName) {
            while (root.parent && root.parent.kind === SyntaxKind.QualifiedName) {
                root = root.parent;
            }

            isLastClause = (<QualifiedName>root).right === node;
        }

        return root.parent.kind === SyntaxKind.TypeReference && !isLastClause;
    }

    function isPropertyAccessNamespaceReference(node: Node): boolean {
        let root = node;
        let isLastClause = true;
        if (root.parent.kind === SyntaxKind.PropertyAccessExpression) {
            while (root.parent && root.parent.kind === SyntaxKind.PropertyAccessExpression) {
                root = root.parent;
            }

            isLastClause = (<PropertyAccessExpression>root).name === node;
        }

        if (!isLastClause && root.parent.kind === SyntaxKind.ExpressionWithTypeArguments && root.parent.parent.kind === SyntaxKind.HeritageClause) {
            const decl = root.parent.parent.parent;
            return (decl.kind === SyntaxKind.ClassDeclaration && (<HeritageClause>root.parent.parent).token === SyntaxKind.ImplementsKeyword) ||
                (decl.kind === SyntaxKind.InterfaceDeclaration && (<HeritageClause>root.parent.parent).token === SyntaxKind.ExtendsKeyword);
        }

        return false;
    }

    function isTypeReference(node: Node): boolean {
        if (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
            node = node.parent;
        }

        return node.parent.kind === SyntaxKind.TypeReference ||
            (node.parent.kind === SyntaxKind.ExpressionWithTypeArguments && !isExpressionWithTypeArgumentsInClassExtendsClause(<ExpressionWithTypeArguments>node.parent)) ||
            (node.kind === SyntaxKind.ThisKeyword && !isPartOfExpression(node)) ||
            node.kind === SyntaxKind.ThisType;
    }

    export function isCallExpressionTarget(node: Node): boolean {
        return isCallOrNewExpressionTarget(node, SyntaxKind.CallExpression);
    }

    export function isNewExpressionTarget(node: Node): boolean {
        return isCallOrNewExpressionTarget(node, SyntaxKind.NewExpression);
    }

    function isCallOrNewExpressionTarget(node: Node, kind: SyntaxKind) {
        const target = climbPastPropertyAccess(node);
        return target && target.parent && target.parent.kind === kind && (<CallExpression>target.parent).expression === target;
    }

    export function climbPastPropertyAccess(node: Node) {
        return isRightSideOfPropertyAccess(node) ? node.parent : node;
    }

    export function getTargetLabel(referenceNode: Node, labelName: string): Identifier {
        while (referenceNode) {
            if (referenceNode.kind === SyntaxKind.LabeledStatement && (<LabeledStatement>referenceNode).label.text === labelName) {
                return (<LabeledStatement>referenceNode).label;
            }
            referenceNode = referenceNode.parent;
        }
        return undefined;
    }

    export function isJumpStatementTarget(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            (node.parent.kind === SyntaxKind.BreakStatement || node.parent.kind === SyntaxKind.ContinueStatement) &&
            (<BreakOrContinueStatement>node.parent).label === node;
    }

    function isLabelOfLabeledStatement(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            node.parent.kind === SyntaxKind.LabeledStatement &&
            (<LabeledStatement>node.parent).label === node;
    }

    export function isLabelName(node: Node): boolean {
        return isLabelOfLabeledStatement(node) || isJumpStatementTarget(node);
    }

    export function isRightSideOfQualifiedName(node: Node) {
        return node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node;
    }

    export function isRightSideOfPropertyAccess(node: Node) {
        return node && node.parent && node.parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>node.parent).name === node;
    }

    export function isNameOfModuleDeclaration(node: Node) {
        return node.parent.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node.parent).name === node;
    }

    export function isNameOfFunctionDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            isFunctionLike(node.parent) && (<FunctionLikeDeclaration>node.parent).name === node;
    }

    export function isLiteralNameOfPropertyDeclarationOrIndexAccess(node: Node): boolean {
        if (node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NumericLiteral) {
            switch (node.parent.kind) {
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.EnumMember:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.ModuleDeclaration:
                    return getNameOfDeclaration(<Declaration>node.parent) === node;
                case SyntaxKind.ElementAccessExpression:
                    return (<ElementAccessExpression>node.parent).argumentExpression === node;
                case SyntaxKind.ComputedPropertyName:
                    return true;
            }
        }

        return false;
    }

    export function isExpressionOfExternalModuleImportEqualsDeclaration(node: Node) {
        return isExternalModuleImportEqualsDeclaration(node.parent.parent) &&
            getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node;
    }

    /** Returns true if the position is within a comment */
    export function isInsideComment(sourceFile: SourceFile, token: Node, position: number): boolean {
        // The position has to be: 1. in the leading trivia (before token.getStart()), and 2. within a comment
        return position <= token.getStart(sourceFile) &&
            (isInsideCommentRange(getTrailingCommentRanges(sourceFile.text, token.getFullStart())) ||
                isInsideCommentRange(getLeadingCommentRanges(sourceFile.text, token.getFullStart())));

        function isInsideCommentRange(comments: CommentRange[]): boolean {
            return forEach(comments, comment => {
                // either we are 1. completely inside the comment, or 2. at the end of the comment
                if (comment.pos < position && position < comment.end) {
                    return true;
                }
                else if (position === comment.end) {
                    const text = sourceFile.text;
                    const width = comment.end - comment.pos;
                    // is single line comment or just /*
                    if (width <= 2 || text.charCodeAt(comment.pos + 1) === CharacterCodes.slash) {
                        return true;
                    }
                    else {
                        // is unterminated multi-line comment
                        return !(text.charCodeAt(comment.end - 1) === CharacterCodes.slash &&
                            text.charCodeAt(comment.end - 2) === CharacterCodes.asterisk);
                    }
                }
                return false;
            });
        }
    }

    export function getContainerNode(node: Node): Declaration {
        while (true) {
            node = node.parent;
            if (!node) {
                return undefined;
            }
            switch (node.kind) {
                case SyntaxKind.SourceFile:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                    return <Declaration>node;
            }
        }
    }

    export function getNodeKind(node: Node): string {
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                return isExternalModule(<SourceFile>node) ? ScriptElementKind.moduleElement : ScriptElementKind.scriptElement;
            case SyntaxKind.ModuleDeclaration:
                return ScriptElementKind.moduleElement;
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return ScriptElementKind.classElement;
            case SyntaxKind.InterfaceDeclaration: return ScriptElementKind.interfaceElement;
            case SyntaxKind.TypeAliasDeclaration: return ScriptElementKind.typeElement;
            case SyntaxKind.EnumDeclaration: return ScriptElementKind.enumElement;
            case SyntaxKind.VariableDeclaration:
                return getKindOfVariableDeclaration(<VariableDeclaration>node);
            case SyntaxKind.BindingElement:
                return getKindOfVariableDeclaration(<VariableDeclaration>getRootDeclaration(node));
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                return ScriptElementKind.functionElement;
            case SyntaxKind.GetAccessor: return ScriptElementKind.memberGetAccessorElement;
            case SyntaxKind.SetAccessor: return ScriptElementKind.memberSetAccessorElement;
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
                return ScriptElementKind.memberFunctionElement;
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return ScriptElementKind.memberVariableElement;
            case SyntaxKind.IndexSignature: return ScriptElementKind.indexSignatureElement;
            case SyntaxKind.ConstructSignature: return ScriptElementKind.constructSignatureElement;
            case SyntaxKind.CallSignature: return ScriptElementKind.callSignatureElement;
            case SyntaxKind.Constructor: return ScriptElementKind.constructorImplementationElement;
            case SyntaxKind.TypeParameter: return ScriptElementKind.typeParameterElement;
            case SyntaxKind.EnumMember: return ScriptElementKind.enumMemberElement;
            case SyntaxKind.Parameter: return hasModifier(node, ModifierFlags.ParameterPropertyModifier) ? ScriptElementKind.memberVariableElement : ScriptElementKind.parameterElement;
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportClause:
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.NamespaceImport:
                return ScriptElementKind.alias;
            case SyntaxKind.JSDocTypedefTag:
                return ScriptElementKind.typeElement;
            default:
                return ScriptElementKind.unknown;
        }

        function getKindOfVariableDeclaration(v: VariableDeclaration): string {
            return isConst(v)
                ? ScriptElementKind.constElement
                : isLet(v)
                    ? ScriptElementKind.letElement
                    : ScriptElementKind.variableElement;
        }
    }

    export function isThis(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ThisKeyword:
            // case SyntaxKind.ThisType: TODO: GH#9267
                return true;
            case SyntaxKind.Identifier:
                // 'this' as a parameter
                return identifierIsThisKeyword(node as Identifier) && node.parent.kind === SyntaxKind.Parameter;
            default:
                return false;
        }
    }

    // Matches the beginning of a triple slash directive
    const tripleSlashDirectivePrefixRegex = /^\/\/\/\s*</;

    export interface ListItemInfo {
        listItemIndex: number;
        list: Node;
    }

    export function getLineStartPositionForPosition(position: number, sourceFile: SourceFileLike): number {
        const lineStarts = getLineStarts(sourceFile);
        const line = sourceFile.getLineAndCharacterOfPosition(position).line;
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
        const start = Math.max(start1, start2);
        const end = Math.min(end1, end2);
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
            case SyntaxKind.NamedImports:
            case SyntaxKind.NamedExports:
                return nodeEndsWith(n, SyntaxKind.CloseBraceToken, sourceFile);
            case SyntaxKind.CatchClause:
                return isCompletedNode((<CatchClause>n).block, sourceFile);
            case SyntaxKind.NewExpression:
                if (!(<NewExpression>n).arguments) {
                    return true;
                }
            // falls through
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
                return isCompletedNode((<ExpressionStatement>n).expression, sourceFile) ||
                    hasChildOfKind(n, SyntaxKind.SemicolonToken);

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
                // there is no such thing as terminator token for CaseClause/DefaultClause so for simplicity always consider them non-completed
                return false;

            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WhileStatement:
                return isCompletedNode((<IterationStatement>n).statement, sourceFile);
            case SyntaxKind.DoStatement:
                // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
                const hasWhileKeyword = findChildOfKind(n, SyntaxKind.WhileKeyword, sourceFile);
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
            case SyntaxKind.SpreadElement:
                const unaryWordExpression = n as (TypeOfExpression | DeleteExpression | VoidExpression | YieldExpression | SpreadElement);
                return isCompletedNode(unaryWordExpression.expression, sourceFile);

            case SyntaxKind.TaggedTemplateExpression:
                return isCompletedNode((<TaggedTemplateExpression>n).template, sourceFile);
            case SyntaxKind.TemplateExpression:
                const lastSpan = lastOrUndefined((<TemplateExpression>n).templateSpans);
                return isCompletedNode(lastSpan, sourceFile);
            case SyntaxKind.TemplateSpan:
                return nodeIsPresent((<TemplateSpan>n).literal);

            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ImportDeclaration:
                return nodeIsPresent((<ExportDeclaration | ImportDeclaration>n).moduleSpecifier);

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
        const children = n.getChildren(sourceFile);
        if (children.length) {
            const last = lastOrUndefined(children);
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
        const list = findContainingList(node);

        // It is possible at this point for syntaxList to be undefined, either if
        // node.parent had no list child, or if none of its list children contained
        // the span of node. If this happens, return undefined. The caller should
        // handle this case.
        if (!list) {
            return undefined;
        }

        const children = list.getChildren();
        const listItemIndex = indexOf(children, node);

        return {
            listItemIndex,
            list
        };
    }

    export function hasChildOfKind(n: Node, kind: SyntaxKind, sourceFile?: SourceFile): boolean {
        return !!findChildOfKind(n, kind, sourceFile);
    }

    export function findChildOfKind(n: Node, kind: SyntaxKind, sourceFile?: SourceFileLike): Node | undefined {
        return forEach(n.getChildren(sourceFile), c => c.kind === kind && c);
    }

    export function findContainingList(node: Node): Node {
        // The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
        // be parented by the container of the SyntaxList, not the SyntaxList itself.
        // In order to find the list item index, we first need to locate SyntaxList itself and then search
        // for the position of the relevant node (or comma).
        const syntaxList = forEach(node.parent.getChildren(), c => {
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
    export function getTouchingWord(sourceFile: SourceFile, position: number, includeJsDocComment = false): Node {
        return getTouchingToken(sourceFile, position, n => isWord(n.kind), includeJsDocComment);
    }

    /* Gets the token whose text has range [start, end) and position >= start
     * and (position < end or (position === end && token is keyword or identifier or numeric/string literal))
     */
    export function getTouchingPropertyName(sourceFile: SourceFile, position: number, includeJsDocComment = false): Node {
        return getTouchingToken(sourceFile, position, n => isPropertyName(n.kind), includeJsDocComment);
    }

    /** Returns the token if position is in [start, end) or if position === end and includeItemAtEndPosition(token) === true */
    export function getTouchingToken(sourceFile: SourceFile, position: number, includeItemAtEndPosition?: (n: Node) => boolean, includeJsDocComment = false): Node {
        return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ false, includeItemAtEndPosition, includeJsDocComment);
    }

    /** Returns a token if position is in [start-of-leading-trivia, end) */
    export function getTokenAtPosition(sourceFile: SourceFile, position: number, includeJsDocComment = false): Node {
        return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ true, /*includeItemAtEndPosition*/ undefined, includeJsDocComment);
    }

    /** Get the token whose text contains the position */
    function getTokenAtPositionWorker(sourceFile: SourceFile, position: number, allowPositionInLeadingTrivia: boolean, includeItemAtEndPosition: (n: Node) => boolean, includeJsDocComment = false): Node {
        let current: Node = sourceFile;
        outer: while (true) {
            if (isToken(current)) {
                // exit early
                return current;
            }

            // find the child that contains 'position'
            for (const child of current.getChildren()) {
                if (isJSDocNode(child) && !includeJsDocComment) {
                    continue;
                }

                const start = allowPositionInLeadingTrivia ? child.getFullStart() : child.getStart(sourceFile, includeJsDocComment);
                if (start > position) {
                    continue;
                }

                const end = child.getEnd();
                if (position < end || (position === end && child.kind === SyntaxKind.EndOfFileToken)) {
                    current = child;
                    continue outer;
                }
                else if (includeItemAtEndPosition && end === position) {
                    const previousToken = findPrecedingToken(position, sourceFile, child);
                    if (previousToken && includeItemAtEndPosition(previousToken)) {
                        return previousToken;
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
        const tokenAtPosition = getTokenAtPosition(file, position);
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

            const children = n.getChildren();
            for (const child of children) {
                const shouldDiveInChildNode =
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
            if (isToken(n)) {
                return n;
            }

            const children = n.getChildren();
            const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
            return candidate && findRightmostToken(candidate);

        }

        function find(n: Node): Node {
            if (isToken(n)) {
                return n;
            }

            const children = n.getChildren();
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
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
                        const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i);
                        return candidate && findRightmostToken(candidate);
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
                const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
                return candidate && findRightmostToken(candidate);
            }
        }

        /// finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
        function findRightmostChildNodeWithTokens(children: Node[], exclusiveStartPosition: number): Node {
            for (let i = exclusiveStartPosition - 1; i >= 0; i--) {
                if (nodeHasTokens(children[i])) {
                    return children[i];
                }
            }
        }
    }

    export function isInString(sourceFile: SourceFile, position: number): boolean {
        const previousToken = findPrecedingToken(position, sourceFile);
        if (previousToken && previousToken.kind === SyntaxKind.StringLiteral) {
            const start = previousToken.getStart();
            const end = previousToken.getEnd();

            // To be "in" one of these literals, the position has to be:
            //   1. entirely within the token text.
            //   2. at the end position of an unterminated token.
            //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
            if (start < position && position < end) {
                return true;
            }

            if (position === end) {
                return !!(<LiteralExpression>previousToken).isUnterminated;
            }
        }

        return false;
    }

    export function isInComment(sourceFile: SourceFile, position: number) {
        return isInCommentHelper(sourceFile, position, /*predicate*/ undefined);
    }

    /**
     * returns true if the position is in between the open and close elements of an JSX expression.
     */
    export function isInsideJsxElementOrAttribute(sourceFile: SourceFile, position: number) {
        const token = getTokenAtPosition(sourceFile, position);

        if (!token) {
            return false;
        }

        if (token.kind === SyntaxKind.JsxText) {
            return true;
        }

        // <div>Hello |</div>
        if (token.kind === SyntaxKind.LessThanToken && token.parent.kind === SyntaxKind.JsxText) {
            return true;
        }

        // <div> { | </div> or <div a={| </div>
        if (token.kind === SyntaxKind.LessThanToken && token.parent.kind === SyntaxKind.JsxExpression) {
            return true;
        }

        // <div> {
        // |
        // } < /div>
        if (token && token.kind === SyntaxKind.CloseBraceToken && token.parent.kind === SyntaxKind.JsxExpression) {
            return true;
        }

        // <div>|</div>
        if (token.kind === SyntaxKind.LessThanToken && token.parent.kind === SyntaxKind.JsxClosingElement) {
            return true;
        }

        return false;
    }

    export function isInTemplateString(sourceFile: SourceFile, position: number) {
        const token = getTokenAtPosition(sourceFile, position);
        return isTemplateLiteralKind(token.kind) && position > token.getStart(sourceFile);
    }

    /**
     * Returns true if the cursor at position in sourceFile is within a comment that additionally
     * satisfies predicate, and false otherwise.
     */
    export function isInCommentHelper(sourceFile: SourceFile, position: number, predicate?: (c: CommentRange) => boolean): boolean {
        const token = getTokenAtPosition(sourceFile, position);

        if (token && position <= token.getStart(sourceFile)) {
            const commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);

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
                    (c.kind === SyntaxKind.SingleLineCommentTrivia ? position <= c.end : position < c.end) &&
                    predicate(c)) :
                forEach(commentRanges, c => c.pos < position &&
                    (c.kind === SyntaxKind.SingleLineCommentTrivia ? position <= c.end : position < c.end));
        }

        return false;
    }

    export function hasDocComment(sourceFile: SourceFile, position: number) {
        const token = getTokenAtPosition(sourceFile, position);

        // First, we have to see if this position actually landed in a comment.
        const commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);

        return forEach(commentRanges, jsDocPrefix);

        function jsDocPrefix(c: CommentRange): boolean {
            const text = sourceFile.text;
            return text.length >= c.pos + 3 && text[c.pos] === "/" && text[c.pos + 1] === "*" && text[c.pos + 2] === "*";
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
            if (node.jsDoc) {
                for (const jsDoc of node.jsDoc) {
                    if (jsDoc.tags) {
                        for (const tag of jsDoc.tags) {
                            if (tag.pos <= position && position <= tag.end) {
                                return tag;
                            }
                        }
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
        const flags = getCombinedModifierFlags(node);
        const result: string[] = [];

        if (flags & ModifierFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
        if (flags & ModifierFlags.Protected) result.push(ScriptElementKindModifier.protectedMemberModifier);
        if (flags & ModifierFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
        if (flags & ModifierFlags.Static) result.push(ScriptElementKindModifier.staticModifier);
        if (flags & ModifierFlags.Abstract) result.push(ScriptElementKindModifier.abstractModifier);
        if (flags & ModifierFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
        if (isInAmbientContext(node)) result.push(ScriptElementKindModifier.ambientModifier);

        return result.length > 0 ? result.join(",") : ScriptElementKindModifier.none;
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

    export function isWord(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.Identifier || isKeyword(kind);
    }

    function isPropertyName(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NumericLiteral || isWord(kind);
    }

    export function isComment(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.SingleLineCommentTrivia || kind === SyntaxKind.MultiLineCommentTrivia;
    }

    export function isStringOrRegularExpressionOrTemplateLiteral(kind: SyntaxKind): boolean {
        if (kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.RegularExpressionLiteral
            || isTemplateLiteralKind(kind)) {
            return true;
        }
        return false;
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
        if (!dst || !src || Object.keys(dst).length !== Object.keys(src).length) {
            return false;
        }

        for (const e in dst) {
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

    export function isArrayLiteralOrObjectLiteralDestructuringPattern(node: Node) {
        if (node.kind === SyntaxKind.ArrayLiteralExpression ||
            node.kind === SyntaxKind.ObjectLiteralExpression) {
            // [a,b,c] from:
            // [a, b, c] = someExpression;
            if (node.parent.kind === SyntaxKind.BinaryExpression &&
                (<BinaryExpression>node.parent).left === node &&
                (<BinaryExpression>node.parent).operatorToken.kind === SyntaxKind.EqualsToken) {
                return true;
            }

            // [a, b, c] from:
            // for([a, b, c] of expression)
            if (node.parent.kind === SyntaxKind.ForOfStatement &&
                (<ForOfStatement>node.parent).initializer === node) {
                return true;
            }

            // [a, b, c] of
            // [x, [a, b, c] ] = someExpression
            // or
            // {x, a: {a, b, c} } = someExpression
            if (isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent.kind === SyntaxKind.PropertyAssignment ? node.parent.parent : node.parent)) {
                return true;
            }
        }

        return false;
    }

    export function hasTrailingDirectorySeparator(path: string) {
        const lastCharacter = path.charAt(path.length - 1);
        return lastCharacter === "/" || lastCharacter === "\\";
    }

    export function isInReferenceComment(sourceFile: SourceFile, position: number): boolean {
        return isInCommentHelper(sourceFile, position, isReferenceComment);

        function isReferenceComment(c: CommentRange): boolean {
            const commentText = sourceFile.text.substring(c.pos, c.end);
            return tripleSlashDirectivePrefixRegex.test(commentText);
        }
    }

    export function isInNonReferenceComment(sourceFile: SourceFile, position: number): boolean {
        return isInCommentHelper(sourceFile, position, isNonReferenceComment);

        function isNonReferenceComment(c: CommentRange): boolean {
            const commentText = sourceFile.text.substring(c.pos, c.end);
            return !tripleSlashDirectivePrefixRegex.test(commentText);
        }
    }

    export function createTextSpanFromNode(node: Node, sourceFile?: SourceFile): TextSpan {
        return createTextSpanFromBounds(node.getStart(sourceFile), node.getEnd());
    }

    export function isTypeKeyword(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.NeverKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.VoidKeyword:
                return true;
            default:
                return false;
        }
    }

    /** True if the symbol is for an external module, as opposed to a namespace. */
    export function isExternalModuleSymbol(moduleSymbol: Symbol): boolean {
        Debug.assert(!!(moduleSymbol.flags & SymbolFlags.Module));
        return moduleSymbol.name.charCodeAt(0) === CharacterCodes.doubleQuote;
    }

    /** Returns `true` the first time it encounters a node and `false` afterwards. */
    export function nodeSeenTracker<T extends Node>(): (node: T) => boolean {
        const seen: Array<true> = [];
        return node => {
            const id = getNodeId(node);
            return !seen[id] && (seen[id] = true);
        };
    }
}

// Display-part writer helpers
/* @internal */
namespace ts {
    export function isFirstDeclarationOfSymbolParameter(symbol: Symbol) {
        return symbol.declarations && symbol.declarations.length > 0 && symbol.declarations[0].kind === SyntaxKind.Parameter;
    }

    const displayPartWriter = getDisplayPartWriter();
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
            writeProperty: text => writeKind(text, SymbolDisplayPartKind.propertyName),
            writeSymbol,
            writeLine,
            increaseIndent: () => { indent++; },
            decreaseIndent: () => { indent--; },
            clear: resetWriter,
            trackSymbol: noop,
            reportInaccessibleThisError: noop,
            reportIllegalExtends: noop
        };

        function writeIndent() {
            if (lineStart) {
                const indentString = getIndentString(indent);
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
            displayParts = [];
            lineStart = true;
            indent = 0;
        }
    }

    export function symbolPart(text: string, symbol: Symbol) {
        return displayPart(text, displayPartKind(symbol));

        function displayPartKind(symbol: Symbol): SymbolDisplayPartKind {
            const flags = symbol.flags;

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

    export function displayPart(text: string, kind: SymbolDisplayPartKind): SymbolDisplayPart {
        return <SymbolDisplayPart>{
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
        const kind = stringToToken(text);
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
        const result = displayPartWriter.displayParts();
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
        if (isImportOrExportSpecifierName(location) || isStringOrNumericLiteral(location) && location.parent.kind === SyntaxKind.ComputedPropertyName) {
            return location.text;
        }

        // Try to get the local symbol if we're dealing with an 'export default'
        // since that symbol has the "true" name.
        const localExportDefaultSymbol = getLocalSymbolForExportDefault(symbol);
        return typeChecker.symbolToString(localExportDefaultSymbol || symbol);
    }

    export function isImportOrExportSpecifierName(location: Node): location is Identifier {
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
        const length = name.length;
        if (length >= 2 &&
            name.charCodeAt(0) === name.charCodeAt(length - 1) &&
            (name.charCodeAt(0) === CharacterCodes.doubleQuote || name.charCodeAt(0) === CharacterCodes.singleQuote)) {
            return name.substring(1, length - 1);
        }
        return name;
    }

    export function scriptKindIs(fileName: string, host: LanguageServiceHost, ...scriptKinds: ScriptKind[]): boolean {
        const scriptKind = getScriptKind(fileName, host);
        return forEach(scriptKinds, k => k === scriptKind);
    }

    export function getScriptKind(fileName: string, host?: LanguageServiceHost): ScriptKind {
        // First check to see if the script kind was specified by the host. Chances are the host
        // may override the default script kind for the file extension.
        let scriptKind: ScriptKind;
        if (host && host.getScriptKind) {
            scriptKind = host.getScriptKind(fileName);
        }
        if (!scriptKind) {
            scriptKind = getScriptKindFromFileName(fileName);
        }
        return ensureScriptKind(fileName, scriptKind);
    }

    export function sanitizeConfigFile(configFileName: string, content: string) {
        const options: TranspileOptions = {
            fileName: "config.js",
            compilerOptions: {
                target: ScriptTarget.ES2015,
                removeComments: true
            },
            reportDiagnostics: true
        };
        const { outputText, diagnostics } = ts.transpileModule("(" + content + ")", options);
        // Becasue the content was wrapped in "()", the start position of diagnostics needs to be subtract by 1
        // also, the emitted result will have "(" in the beginning and ");" in the end. We need to strip these
        // as well
        const trimmedOutput = outputText.trim();
        for (const diagnostic of diagnostics) {
            diagnostic.start = diagnostic.start - 1;
        }
        const {config, error} = parseConfigFileTextToJson(configFileName, trimmedOutput.substring(1, trimmedOutput.length - 2), /*stripComments*/ false);
        return {
            configJsonObject: config || {},
            diagnostics: error ? concatenate(diagnostics, [error]) : diagnostics
        };
    }

    export function getFirstNonSpaceCharacterPosition(text: string, position: number) {
        while (isWhiteSpaceLike(text.charCodeAt(position))) {
            position += 1;
        }
        return position;
    }

    export function getOpenBrace(constructor: ConstructorDeclaration, sourceFile: SourceFile) {
        // First token is the open curly, this is where we want to put the 'super' call.
        return constructor.body.getFirstToken(sourceFile);
    }

    export function getOpenBraceOfClassLike(declaration: ClassLikeDeclaration, sourceFile: SourceFile) {
        return getTokenAtPosition(sourceFile, declaration.members.pos - 1);
    }
}
