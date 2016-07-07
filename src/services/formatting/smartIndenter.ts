///<reference path='..\services.ts' />

/* @internal */
namespace ts.formatting {
    export namespace SmartIndenter {

        const enum Value {
            Unknown = -1
        }

        export function getIndentation(position: number, sourceFile: SourceFile, options: EditorOptions): number {
            if (position > sourceFile.text.length) {
                return getBaseIndentation(options); // past EOF
            }

            // no indentation when the indent style is set to none,
            // so we can return fast
            if (options.IndentStyle === IndentStyle.None) {
                return 0;
            }

            const precedingToken = findPrecedingToken(position, sourceFile);
            if (!precedingToken) {
                return getBaseIndentation(options);
            }

            // no indentation in string \regex\template literals
            const precedingTokenIsLiteral = isStringOrRegularExpressionOrTemplateLiteral(precedingToken.kind);
            if (precedingTokenIsLiteral && precedingToken.getStart(sourceFile) <= position && precedingToken.end > position) {
                return 0;
            }

            const lineAtPosition = sourceFile.getLineAndCharacterOfPosition(position).line;

            // indentation is first non-whitespace character in a previous line
            // for block indentation, we should look for a line which contains something that's not
            // whitespace.
            if (options.IndentStyle === IndentStyle.Block) {

                // move backwards until we find a line with a non-whitespace character,
                // then find the first non-whitespace character for that line.
                let current = position;
                while (current > 0) {
                    const char = sourceFile.text.charCodeAt(current);
                    if (!isWhiteSpace(char)) {
                        break;
                    }
                    current--;
                }

                const lineStart = ts.getLineStartPositionForPosition(current, sourceFile);
                return SmartIndenter.findFirstNonWhitespaceColumn(lineStart, current, sourceFile, options);
            }

            if (precedingToken.kind === SyntaxKind.CommaToken && precedingToken.parent.kind !== SyntaxKind.BinaryExpression) {
                // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
                const actualIndentation = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation;
                }
            }

            // try to find node that can contribute to indentation and includes 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            let previous: Node;
            let current = precedingToken;
            let currentStart: LineAndCharacter;
            let indentationDelta: number;

            while (current) {
                if (positionBelongsToNode(current, position, sourceFile) && shouldIndentChildNode(current, previous)) {
                    currentStart = getStartLineAndCharacterForNode(current, sourceFile);

                    if (nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile)) {
                        indentationDelta = 0;
                    }
                    else {
                        indentationDelta = lineAtPosition !== currentStart.line ? options.IndentSize : 0;
                    }

                    break;
                }

                // check if current node is a list item - if yes, take indentation from it
                let actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation;
                }
                actualIndentation = getLineIndentationWhenExpressionIsInMultiLine(current, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation + options.IndentSize;
                }

                previous = current;
                current = current.parent;
            }

            if (!current) {
                // no parent was found - return the base indentation of the SourceFile
                return getBaseIndentation(options);
            }

            return getIndentationForNodeWorker(current, currentStart, /*ignoreActualIndentationRange*/ undefined, indentationDelta, sourceFile, options);
        }

        export function getBaseIndentation(options: EditorOptions) {
            return options.BaseIndentSize || 0;
        }

        export function getIndentationForNode(n: Node, ignoreActualIndentationRange: TextRange, sourceFile: SourceFile, options: FormatCodeOptions): number {
            const start = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
            return getIndentationForNodeWorker(n, start, ignoreActualIndentationRange, /*indentationDelta*/ 0, sourceFile, options);
        }

        function getIndentationForNodeWorker(
            current: Node,
            currentStart: LineAndCharacter,
            ignoreActualIndentationRange: TextRange,
            indentationDelta: number,
            sourceFile: SourceFile,
            options: EditorOptions): number {

            let parent: Node = current.parent;
            let parentStart: LineAndCharacter;

            // walk upwards and collect indentations for pairs of parent-child nodes
            // indentation is not added if parent and child nodes start on the same line or if parent is IfStatement and child starts on the same line with 'else clause'
            while (parent) {
                let useActualIndentation = true;
                if (ignoreActualIndentationRange) {
                    const start = current.getStart(sourceFile);
                    useActualIndentation = start < ignoreActualIndentationRange.pos || start > ignoreActualIndentationRange.end;
                }

                if (useActualIndentation) {
                    // check if current node is a list item - if yes, take indentation from it
                    const actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                }
                parentStart = getParentStart(parent, current, sourceFile);
                const parentAndChildShareLine =
                    parentStart.line === currentStart.line ||
                    childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);

                if (useActualIndentation) {
                    // try to fetch actual indentation for current node from source text
                    let actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                    actualIndentation = getLineIndentationWhenExpressionIsInMultiLine(current, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                }

                // increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
                if (shouldIndentChildNode(parent, current) && !parentAndChildShareLine) {
                    indentationDelta += options.IndentSize;
                }

                current = parent;
                currentStart = parentStart;
                parent = current.parent;
            }

            return indentationDelta + getBaseIndentation(options);
        }


        function getParentStart(parent: Node, child: Node, sourceFile: SourceFile): LineAndCharacter {
            const containingList = getContainingList(child, sourceFile);
            if (containingList) {
                return sourceFile.getLineAndCharacterOfPosition(containingList.pos);
            }

            return sourceFile.getLineAndCharacterOfPosition(parent.getStart(sourceFile));
        }

        /*
         * Function returns Value.Unknown if indentation cannot be determined
         */
        function getActualIndentationForListItemBeforeComma(commaToken: Node, sourceFile: SourceFile, options: EditorOptions): number {
            // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
            const commaItemInfo = findListItemInfo(commaToken);
            if (commaItemInfo && commaItemInfo.listItemIndex > 0) {
                return deriveActualIndentationFromList(commaItemInfo.list.getChildren(), commaItemInfo.listItemIndex - 1, sourceFile, options);
            }
            else {
                // handle broken code gracefully
                return Value.Unknown;
            }
        }

        /*
         * Function returns Value.Unknown if actual indentation for node should not be used (i.e because node is nested expression)
         */
        function getActualIndentationForNode(current: Node,
            parent: Node,
            currentLineAndChar: LineAndCharacter,
            parentAndChildShareLine: boolean,
            sourceFile: SourceFile,
            options: EditorOptions): number {

            // actual indentation is used for statements\declarations if one of cases below is true:
            // - parent is SourceFile - by default immediate children of SourceFile are not indented except when user indents them manually
            // - parent and child are not on the same line
            const useActualIndentation =
                (isDeclaration(current) || isStatement(current)) &&
                (parent.kind === SyntaxKind.SourceFile || !parentAndChildShareLine);

            if (!useActualIndentation) {
                return Value.Unknown;
            }

            return findColumnForFirstNonWhitespaceCharacterInLine(currentLineAndChar, sourceFile, options);
        }

        function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken: Node, current: Node, lineAtPosition: number, sourceFile: SourceFile): boolean {
            const nextToken = findNextToken(precedingToken, current);
            if (!nextToken) {
                return false;
            }

            if (nextToken.kind === SyntaxKind.OpenBraceToken) {
                // open braces are always indented at the parent level
                return true;
            }
            else if (nextToken.kind === SyntaxKind.CloseBraceToken) {
                // close braces are indented at the parent level if they are located on the same line with cursor
                // this means that if new line will be added at $ position, this case will be indented
                // class A {
                //    $
                // }
                /// and this one - not
                // class A {
                // $}

                const nextTokenStartLine = getStartLineAndCharacterForNode(nextToken, sourceFile).line;
                return lineAtPosition === nextTokenStartLine;
            }

            return false;
        }

        function getStartLineAndCharacterForNode(n: Node, sourceFile: SourceFile): LineAndCharacter {
            return sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
        }

        export function childStartsOnTheSameLineWithElseInIfStatement(parent: Node, child: TextRangeWithKind, childStartLine: number, sourceFile: SourceFile): boolean {
            if (parent.kind === SyntaxKind.IfStatement && (<IfStatement>parent).elseStatement === child) {
                const elseKeyword = findChildOfKind(parent, SyntaxKind.ElseKeyword, sourceFile);
                Debug.assert(elseKeyword !== undefined);

                const elseKeywordStartLine = getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
                return elseKeywordStartLine === childStartLine;
            }

            return false;
        }

        function getContainingList(node: Node, sourceFile: SourceFile): NodeArray<Node> {
            if (node.parent) {
                switch (node.parent.kind) {
                    case SyntaxKind.TypeReference:
                        if ((<TypeReferenceNode>node.parent).typeArguments &&
                            rangeContainsStartEnd((<TypeReferenceNode>node.parent).typeArguments, node.getStart(sourceFile), node.getEnd())) {
                            return (<TypeReferenceNode>node.parent).typeArguments;
                        }
                        break;
                    case SyntaxKind.ObjectLiteralExpression:
                        return (<ObjectLiteralExpression>node.parent).properties;
                    case SyntaxKind.ArrayLiteralExpression:
                        return (<ArrayLiteralExpression>node.parent).elements;
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.ConstructSignature: {
                        const start = node.getStart(sourceFile);
                        if ((<SignatureDeclaration>node.parent).typeParameters &&
                            rangeContainsStartEnd((<SignatureDeclaration>node.parent).typeParameters, start, node.getEnd())) {
                            return (<SignatureDeclaration>node.parent).typeParameters;
                        }
                        if (rangeContainsStartEnd((<SignatureDeclaration>node.parent).parameters, start, node.getEnd())) {
                            return (<SignatureDeclaration>node.parent).parameters;
                        }
                        break;
                    }
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression: {
                        const start = node.getStart(sourceFile);
                        if ((<CallExpression>node.parent).typeArguments &&
                            rangeContainsStartEnd((<CallExpression>node.parent).typeArguments, start, node.getEnd())) {
                            return (<CallExpression>node.parent).typeArguments;
                        }
                        if ((<CallExpression>node.parent).arguments &&
                            rangeContainsStartEnd((<CallExpression>node.parent).arguments, start, node.getEnd())) {
                            return (<CallExpression>node.parent).arguments;
                        }
                        break;
                    }
                }
            }
            return undefined;
        }

        function getActualIndentationForListItem(node: Node, sourceFile: SourceFile, options: EditorOptions): number {
            const containingList = getContainingList(node, sourceFile);
            return containingList ? getActualIndentationFromList(containingList) : Value.Unknown;

            function getActualIndentationFromList(list: Node[]): number {
                const index = indexOf(list, node);
                return index !== -1 ? deriveActualIndentationFromList(list, index, sourceFile, options) : Value.Unknown;
            }
        }

        function getLineIndentationWhenExpressionIsInMultiLine(node: Node, sourceFile: SourceFile, options: EditorOptions): number {
            // actual indentation should not be used when:
            // - node is close parenthesis - this is the end of the expression
            if (node.kind === SyntaxKind.CloseParenToken) {
                return Value.Unknown;
            }

            if (node.parent && (
                node.parent.kind === SyntaxKind.CallExpression ||
                node.parent.kind === SyntaxKind.NewExpression) &&
                (<CallExpression>node.parent).expression !== node) {

                const fullCallOrNewExpression = (<CallExpression | NewExpression>node.parent).expression;
                const startingExpression = getStartingExpression(<PropertyAccessExpression | CallExpression | ElementAccessExpression>fullCallOrNewExpression);

                if (fullCallOrNewExpression === startingExpression) {
                    return Value.Unknown;
                }

                const fullCallOrNewExpressionEnd = sourceFile.getLineAndCharacterOfPosition(fullCallOrNewExpression.end);
                const startingExpressionEnd = sourceFile.getLineAndCharacterOfPosition(startingExpression.end);

                if (fullCallOrNewExpressionEnd.line === startingExpressionEnd.line) {
                    return Value.Unknown;
                }

                return findColumnForFirstNonWhitespaceCharacterInLine(fullCallOrNewExpressionEnd, sourceFile, options);
            }

            return Value.Unknown;

            function getStartingExpression(node: PropertyAccessExpression | CallExpression | ElementAccessExpression) {
                while (true) {
                    switch (node.kind) {
                        case SyntaxKind.CallExpression:
                        case SyntaxKind.NewExpression:
                        case SyntaxKind.PropertyAccessExpression:
                        case SyntaxKind.ElementAccessExpression:

                            node = <PropertyAccessExpression | CallExpression | ElementAccessExpression | PropertyAccessExpression>node.expression;
                            break;
                        default:
                            return node;
                    }
                }
            }
        }

        function deriveActualIndentationFromList(list: Node[], index: number, sourceFile: SourceFile, options: EditorOptions): number {
            Debug.assert(index >= 0 && index < list.length);
            const node = list[index];

            // walk toward the start of the list starting from current node and check if the line is the same for all items.
            // if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]
            let lineAndCharacter = getStartLineAndCharacterForNode(node, sourceFile);
            for (let i = index - 1; i >= 0; i--) {
                if (list[i].kind === SyntaxKind.CommaToken) {
                    continue;
                }
                // skip list items that ends on the same line with the current list element
                const prevEndLine = sourceFile.getLineAndCharacterOfPosition(list[i].end).line;
                if (prevEndLine !== lineAndCharacter.line) {
                    return findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options);
                }

                lineAndCharacter = getStartLineAndCharacterForNode(list[i], sourceFile);
            }
            return Value.Unknown;
        }

        function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter: LineAndCharacter, sourceFile: SourceFile, options: EditorOptions): number {
            const lineStart = sourceFile.getPositionOfLineAndCharacter(lineAndCharacter.line, 0);
            return findFirstNonWhitespaceColumn(lineStart, lineStart + lineAndCharacter.character, sourceFile, options);
        }

        /*
            Character is the actual index of the character since the beginning of the line.
            Column - position of the character after expanding tabs to spaces
            "0\t2$"
            value of 'character' for '$' is 3
            value of 'column' for '$' is 6 (assuming that tab size is 4)
        */
        export function findFirstNonWhitespaceCharacterAndColumn(startPos: number, endPos: number, sourceFile: SourceFile, options: EditorOptions) {
            let character = 0;
            let column = 0;
            for (let pos = startPos; pos < endPos; pos++) {
                const ch = sourceFile.text.charCodeAt(pos);
                if (!isWhiteSpaceSingleLine(ch)) {
                    break;
                }

                if (ch === CharacterCodes.tab) {
                    column += options.TabSize + (column % options.TabSize);
                }
                else {
                    column++;
                }

                character++;
            }
            return { column, character };
        }

        export function findFirstNonWhitespaceColumn(startPos: number, endPos: number, sourceFile: SourceFile, options: EditorOptions): number {
            return findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options).column;
        }

        function nodeContentIsAlwaysIndented(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.TupleType:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.CaseClause:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ConditionalExpression:
                case SyntaxKind.ArrayBindingPattern:
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.JsxOpeningElement:
                case SyntaxKind.JsxSelfClosingElement:
                case SyntaxKind.JsxExpression:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.Parameter:
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.ParenthesizedType:
                case SyntaxKind.TaggedTemplateExpression:
                case SyntaxKind.AwaitExpression:
                case SyntaxKind.NamedExports:
                case SyntaxKind.NamedImports:
                case SyntaxKind.ExportSpecifier:
                case SyntaxKind.ImportSpecifier:
                    return true;
            }
            return false;
        }

        /* @internal */
        export function nodeWillIndentChild(parent: TextRangeWithKind, child: TextRangeWithKind, indentByDefault: boolean) {
            const childKind = child ? child.kind : SyntaxKind.Unknown;
            switch (parent.kind) {
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return childKind !== SyntaxKind.Block;
                case SyntaxKind.ExportDeclaration:
                    return childKind !== SyntaxKind.NamedExports;
                case SyntaxKind.ImportDeclaration:
                    return childKind !== SyntaxKind.ImportClause ||
                        ((<ImportClause>child).namedBindings && (<ImportClause>child).namedBindings.kind !== SyntaxKind.NamedImports);
                case SyntaxKind.JsxElement:
                    return childKind !== SyntaxKind.JsxClosingElement;
            }
            // No explicit rule for given nodes so the result will follow the default value argument
            return indentByDefault;
        }

        /*
        Function returns true when the parent node should indent the given child by an explicit rule
        */
        export function shouldIndentChildNode(parent: TextRangeWithKind, child?: TextRangeWithKind): boolean {
            return nodeContentIsAlwaysIndented(parent.kind) || nodeWillIndentChild(parent, child, /*indentByDefault*/ false);
        }
    }
}
