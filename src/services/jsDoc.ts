/* @internal */
namespace ts.JsDoc {
    const jsDocTagNames = [
        "augments",
        "author",
        "argument",
        "borrows",
        "class",
        "constant",
        "constructor",
        "constructs",
        "default",
        "deprecated",
        "description",
        "event",
        "example",
        "extends",
        "field",
        "fileOverview",
        "function",
        "ignore",
        "inner",
        "lends",
        "link",
        "memberOf",
        "name",
        "namespace",
        "param",
        "private",
        "property",
        "public",
        "requires",
        "returns",
        "see",
        "since",
        "static",
        "throws",
        "type",
        "typedef",
        "property",
        "prop",
        "version"
    ];
    let jsDocCompletionEntries: CompletionEntry[];

    export function getJsDocCommentsFromDeclarations(declarations: Declaration[], name: string, canUseParsedParamTagComments: boolean) {
        const documentationComment = <SymbolDisplayPart[]>[];
        const docComments = getJsDocCommentsSeparatedByNewLines();
        ts.forEach(docComments, docComment => {
            if (documentationComment.length) {
                documentationComment.push(lineBreakPart());
            }
            documentationComment.push(docComment);
        });

        return documentationComment;

        function getJsDocCommentsSeparatedByNewLines() {
            const paramTag = "@param";
            const jsDocCommentParts: SymbolDisplayPart[] = [];

            ts.forEach(declarations, (declaration, indexOfDeclaration) => {
                // Make sure we are collecting doc comment from declaration once,
                // In case of union property there might be same declaration multiple times
                // which only varies in type parameter
                // Eg. const a: Array<string> | Array<number>; a.length
                // The property length will have two declarations of property length coming
                // from Array<T> - Array<string> and Array<number>
                if (indexOf(declarations, declaration) === indexOfDeclaration) {
                    const sourceFileOfDeclaration = getSourceFileOfNode(declaration);
                    // If it is parameter - try and get the jsDoc comment with @param tag from function declaration's jsDoc comments
                    if (canUseParsedParamTagComments && declaration.kind === SyntaxKind.Parameter) {
                        if ((declaration.parent.kind === SyntaxKind.FunctionExpression || declaration.parent.kind === SyntaxKind.ArrowFunction) &&
                            declaration.parent.parent.kind === SyntaxKind.VariableDeclaration) {
                            addCommentParts(declaration.parent.parent.parent, sourceFileOfDeclaration, getCleanedParamJsDocComment);
                        }
                        addCommentParts(declaration.parent, sourceFileOfDeclaration, getCleanedParamJsDocComment);
                    }

                    // If this is left side of dotted module declaration, there is no doc comments associated with this node
                    if (declaration.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>declaration).body && (<ModuleDeclaration>declaration).body.kind === SyntaxKind.ModuleDeclaration) {
                        return;
                    }

                    if ((declaration.kind === SyntaxKind.FunctionExpression || declaration.kind === SyntaxKind.ArrowFunction) &&
                        declaration.parent.kind === SyntaxKind.VariableDeclaration) {
                        addCommentParts(declaration.parent.parent, sourceFileOfDeclaration, getCleanedJsDocComment);
                    }

                    // If this is dotted module name, get the doc comments from the parent
                    while (declaration.kind === SyntaxKind.ModuleDeclaration && declaration.parent.kind === SyntaxKind.ModuleDeclaration) {
                        declaration = <ModuleDeclaration>declaration.parent;
                    }
                    addCommentParts(declaration.kind === SyntaxKind.VariableDeclaration ? declaration.parent.parent : declaration,
                                    sourceFileOfDeclaration,
                                    getCleanedJsDocComment);

                    if (declaration.kind === SyntaxKind.VariableDeclaration) {
                        const init = (declaration as VariableDeclaration).initializer;
                        if (init && (init.kind === SyntaxKind.FunctionExpression || init.kind === SyntaxKind.ArrowFunction)) {
                            // Get the cleaned js doc comment text from the initializer
                            addCommentParts(init, sourceFileOfDeclaration, getCleanedJsDocComment);
                        }
                    }
                }
            });

            return jsDocCommentParts;

            function addCommentParts(commented: Node,
                                     sourceFileOfDeclaration: SourceFile,
                                     getCommentPart: (pos: number, end: number, file: SourceFile) => SymbolDisplayPart[]): void {
                const ranges = getJsDocCommentTextRange(commented, sourceFileOfDeclaration);
                // Get the cleaned js doc comment text from the declaration
                ts.forEach(ranges, jsDocCommentTextRange => {
                    const cleanedComment = getCommentPart(jsDocCommentTextRange.pos, jsDocCommentTextRange.end, sourceFileOfDeclaration);
                    if (cleanedComment) {
                        addRange(jsDocCommentParts, cleanedComment);
                    }
                });
            }

            function getJsDocCommentTextRange(node: Node, sourceFile: SourceFile): TextRange[] {
                return ts.map(getJsDocComments(node, sourceFile),
                    jsDocComment => {
                        return {
                            pos: jsDocComment.pos + "/*".length, // Consume /* from the comment
                            end: jsDocComment.end - "*/".length // Trim off comment end indicator
                        };
                    });
            }

            function consumeWhiteSpacesOnTheLine(pos: number, end: number, sourceFile: SourceFile, maxSpacesToRemove?: number) {
                if (maxSpacesToRemove !== undefined) {
                    end = Math.min(end, pos + maxSpacesToRemove);
                }

                for (; pos < end; pos++) {
                    const ch = sourceFile.text.charCodeAt(pos);
                    if (!isWhiteSpaceSingleLine(ch)) {
                        return pos;
                    }
                }

                return end;
            }

            function consumeLineBreaks(pos: number, end: number, sourceFile: SourceFile) {
                while (pos < end && isLineBreak(sourceFile.text.charCodeAt(pos))) {
                    pos++;
                }

                return pos;
            }

            function isName(pos: number, end: number, sourceFile: SourceFile, name: string) {
                return pos + name.length < end &&
                    sourceFile.text.substr(pos, name.length) === name &&
                    isWhiteSpace(sourceFile.text.charCodeAt(pos + name.length));
            }

            function isParamTag(pos: number, end: number, sourceFile: SourceFile) {
                // If it is @param tag
                return isName(pos, end, sourceFile, paramTag);
            }

            function pushDocCommentLineText(docComments: SymbolDisplayPart[], text: string, blankLineCount: number) {
                // Add the empty lines in between texts
                while (blankLineCount) {
                    blankLineCount--;
                    docComments.push(textPart(""));
                }

                docComments.push(textPart(text));
            }

            function getCleanedJsDocComment(pos: number, end: number, sourceFile: SourceFile) {
                let spacesToRemoveAfterAsterisk: number;
                const docComments: SymbolDisplayPart[] = [];
                let blankLineCount = 0;
                let isInParamTag = false;

                while (pos < end) {
                    let docCommentTextOfLine = "";
                    // First consume leading white space
                    pos = consumeWhiteSpacesOnTheLine(pos, end, sourceFile);

                    // If the comment starts with '*' consume the spaces on this line
                    if (pos < end && sourceFile.text.charCodeAt(pos) === CharacterCodes.asterisk) {
                        const lineStartPos = pos + 1;
                        pos = consumeWhiteSpacesOnTheLine(pos + 1, end, sourceFile, spacesToRemoveAfterAsterisk);

                        // Set the spaces to remove after asterisk as margin if not already set
                        if (spacesToRemoveAfterAsterisk === undefined && pos < end && !isLineBreak(sourceFile.text.charCodeAt(pos))) {
                            spacesToRemoveAfterAsterisk = pos - lineStartPos;
                        }
                    }
                    else if (spacesToRemoveAfterAsterisk === undefined) {
                        spacesToRemoveAfterAsterisk = 0;
                    }

                    // Analyze text on this line
                    while (pos < end && !isLineBreak(sourceFile.text.charCodeAt(pos))) {
                        const ch = sourceFile.text.charAt(pos);
                        if (ch === "@") {
                            // If it is @param tag
                            if (isParamTag(pos, end, sourceFile)) {
                                isInParamTag = true;
                                pos += paramTag.length;
                                continue;
                            }
                            else {
                                isInParamTag = false;
                            }
                        }

                        // Add the ch to doc text if we arent in param tag
                        if (!isInParamTag) {
                            docCommentTextOfLine += ch;
                        }

                        // Scan next character
                        pos++;
                    }

                    // Continue with next line
                    pos = consumeLineBreaks(pos, end, sourceFile);
                    if (docCommentTextOfLine) {
                        pushDocCommentLineText(docComments, docCommentTextOfLine, blankLineCount);
                        blankLineCount = 0;
                    }
                    else if (!isInParamTag && docComments.length) {
                        // This is blank line when there is text already parsed
                        blankLineCount++;
                    }
                }

                return docComments;
            }

            function getCleanedParamJsDocComment(pos: number, end: number, sourceFile: SourceFile) {
                let paramHelpStringMargin: number;
                const paramDocComments: SymbolDisplayPart[] = [];
                while (pos < end) {
                    if (isParamTag(pos, end, sourceFile)) {
                        let blankLineCount = 0;
                        let recordedParamTag = false;
                        // Consume leading spaces
                        pos = consumeWhiteSpaces(pos + paramTag.length);
                        if (pos >= end) {
                            break;
                        }

                        // Ignore type expression
                        if (sourceFile.text.charCodeAt(pos) === CharacterCodes.openBrace) {
                            pos++;
                            for (let curlies = 1; pos < end; pos++) {
                                const charCode = sourceFile.text.charCodeAt(pos);

                                // { character means we need to find another } to match the found one
                                if (charCode === CharacterCodes.openBrace) {
                                    curlies++;
                                    continue;
                                }

                                // } char
                                if (charCode === CharacterCodes.closeBrace) {
                                    curlies--;
                                    if (curlies === 0) {
                                        // We do not have any more } to match the type expression is ignored completely
                                        pos++;
                                        break;
                                    }
                                    else {
                                        // there are more { to be matched with }
                                        continue;
                                    }
                                }

                                // Found start of another tag
                                if (charCode === CharacterCodes.at) {
                                    break;
                                }
                            }

                            // Consume white spaces
                            pos = consumeWhiteSpaces(pos);
                            if (pos >= end) {
                                break;
                            }
                        }

                        // Parameter name
                        if (isName(pos, end, sourceFile, name)) {
                            // Found the parameter we are looking for consume white spaces
                            pos = consumeWhiteSpaces(pos + name.length);
                            if (pos >= end) {
                                break;
                            }

                            let paramHelpString = "";
                            const firstLineParamHelpStringPos = pos;
                            while (pos < end) {
                                const ch = sourceFile.text.charCodeAt(pos);

                                // at line break, set this comment line text and go to next line
                                if (isLineBreak(ch)) {
                                    if (paramHelpString) {
                                        pushDocCommentLineText(paramDocComments, paramHelpString, blankLineCount);
                                        paramHelpString = "";
                                        blankLineCount = 0;
                                        recordedParamTag = true;
                                    }
                                    else if (recordedParamTag) {
                                        blankLineCount++;
                                    }

                                    // Get the pos after cleaning start of the line
                                    setPosForParamHelpStringOnNextLine(firstLineParamHelpStringPos);
                                    continue;
                                }

                                // Done scanning param help string - next tag found
                                if (ch === CharacterCodes.at) {
                                    break;
                                }

                                paramHelpString += sourceFile.text.charAt(pos);

                                // Go to next character
                                pos++;
                            }

                            // If there is param help text, add it top the doc comments
                            if (paramHelpString) {
                                pushDocCommentLineText(paramDocComments, paramHelpString, blankLineCount);
                            }
                            paramHelpStringMargin = undefined;
                        }

                        // If this is the start of another tag, continue with the loop in search of param tag with symbol name
                        if (sourceFile.text.charCodeAt(pos) === CharacterCodes.at) {
                            continue;
                        }
                    }

                    // Next character
                    pos++;
                }

                return paramDocComments;

                function consumeWhiteSpaces(pos: number) {
                    while (pos < end && isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(pos))) {
                        pos++;
                    }

                    return pos;
                }

                function setPosForParamHelpStringOnNextLine(firstLineParamHelpStringPos: number) {
                    // Get the pos after consuming line breaks
                    pos = consumeLineBreaks(pos, end, sourceFile);
                    if (pos >= end) {
                        return;
                    }

                    if (paramHelpStringMargin === undefined) {
                        paramHelpStringMargin = sourceFile.getLineAndCharacterOfPosition(firstLineParamHelpStringPos).character;
                    }

                    // Now consume white spaces max
                    const startOfLinePos = pos;
                    pos = consumeWhiteSpacesOnTheLine(pos, end, sourceFile, paramHelpStringMargin);
                    if (pos >= end) {
                        return;
                    }

                    const consumedSpaces = pos - startOfLinePos;
                    if (consumedSpaces < paramHelpStringMargin) {
                        const ch = sourceFile.text.charCodeAt(pos);
                        if (ch === CharacterCodes.asterisk) {
                            // Consume more spaces after asterisk
                            pos = consumeWhiteSpacesOnTheLine(pos + 1, end, sourceFile, paramHelpStringMargin - consumedSpaces - 1);
                        }
                    }
                }
            }
        }
    }

    export function getAllJsDocCompletionEntries(): CompletionEntry[] {
        return jsDocCompletionEntries || (jsDocCompletionEntries = ts.map(jsDocTagNames, tagName => {
            return {
                name: tagName,
                kind: ScriptElementKind.keyword,
                kindModifiers: "",
                sortText: "0",
            };
        }));
    }

    /**
     * Checks if position points to a valid position to add JSDoc comments, and if so,
     * returns the appropriate template. Otherwise returns an empty string.
     * Valid positions are
     *      - outside of comments, statements, and expressions, and
     *      - preceding a:
     *          - function/constructor/method declaration
     *          - class declarations
     *          - variable statements
     *          - namespace declarations
     *
     * Hosts should ideally check that:
     * - The line is all whitespace up to 'position' before performing the insertion.
     * - If the keystroke sequence "/\*\*" induced the call, we also check that the next
     * non-whitespace character is '*', which (approximately) indicates whether we added
     * the second '*' to complete an existing (JSDoc) comment.
     * @param fileName The file in which to perform the check.
     * @param position The (character-indexed) position in the file where the check should
     * be performed.
     */
    export function getDocCommentTemplateAtPosition(newLine: string, sourceFile: SourceFile, position: number): TextInsertion {
        // Check if in a context where we don't want to perform any insertion
        if (isInString(sourceFile, position) || isInComment(sourceFile, position) || hasDocComment(sourceFile, position)) {
            return undefined;
        }

        const tokenAtPos = getTokenAtPosition(sourceFile, position);
        const tokenStart = tokenAtPos.getStart();
        if (!tokenAtPos || tokenStart < position) {
            return undefined;
        }

        // TODO: add support for:
        // - enums/enum members
        // - interfaces
        // - property declarations
        // - potentially property assignments
        let commentOwner: Node;
        findOwner: for (commentOwner = tokenAtPos; commentOwner; commentOwner = commentOwner.parent) {
            switch (commentOwner.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.Constructor:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.VariableStatement:
                    break findOwner;
                case SyntaxKind.SourceFile:
                    return undefined;
                case SyntaxKind.ModuleDeclaration:
                    // If in walking up the tree, we hit a a nested namespace declaration,
                    // then we must be somewhere within a dotted namespace name; however we don't
                    // want to give back a JSDoc template for the 'b' or 'c' in 'namespace a.b.c { }'.
                    if (commentOwner.parent.kind === SyntaxKind.ModuleDeclaration) {
                        return undefined;
                    }
                    break findOwner;
            }
        }

        if (!commentOwner || commentOwner.getStart() < position) {
            return undefined;
        }

        const parameters = getParametersForJsDocOwningNode(commentOwner);
        const posLineAndChar = sourceFile.getLineAndCharacterOfPosition(position);
        const lineStart = sourceFile.getLineStarts()[posLineAndChar.line];

        const indentationStr = sourceFile.text.substr(lineStart, posLineAndChar.character);

        let docParams = "";
        for (let i = 0, numParams = parameters.length; i < numParams; i++) {
            const currentName = parameters[i].name;
            const paramName = currentName.kind === SyntaxKind.Identifier ?
                (<Identifier>currentName).text :
                "param" + i;

            docParams += `${indentationStr} * @param ${paramName}${newLine}`;
        }

        // A doc comment consists of the following
        // * The opening comment line
        // * the first line (without a param) for the object's untagged info (this is also where the caret ends up)
        // * the '@param'-tagged lines
        // * TODO: other tags.
        // * the closing comment line
        // * if the caret was directly in front of the object, then we add an extra line and indentation.
        const preamble = "/**" + newLine +
            indentationStr + " * ";
        const result =
            preamble + newLine +
            docParams +
            indentationStr + " */" +
            (tokenStart === position ? newLine + indentationStr : "");

        return { newText: result, caretOffset: preamble.length };
    }

    function getParametersForJsDocOwningNode(commentOwner: Node): ParameterDeclaration[] {
        if (isFunctionLike(commentOwner)) {
            return commentOwner.parameters;
        }

        if (commentOwner.kind === SyntaxKind.VariableStatement) {
            const varStatement = <VariableStatement>commentOwner;
            const varDeclarations = varStatement.declarationList.declarations;

            if (varDeclarations.length === 1 && varDeclarations[0].initializer) {
                return getParametersFromRightHandSideOfAssignment(varDeclarations[0].initializer);
            }
        }

        return emptyArray;
    }

    /**
     * Digs into an an initializer or RHS operand of an assignment operation
     * to get the parameters of an apt signature corresponding to a
     * function expression or a class expression.
     *
     * @param rightHandSide the expression which may contain an appropriate set of parameters
     * @returns the parameters of a signature found on the RHS if one exists; otherwise 'emptyArray'.
     */
    function getParametersFromRightHandSideOfAssignment(rightHandSide: Expression): ParameterDeclaration[] {
        while (rightHandSide.kind === SyntaxKind.ParenthesizedExpression) {
            rightHandSide = (<ParenthesizedExpression>rightHandSide).expression;
        }

        switch (rightHandSide.kind) {
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return (<FunctionExpression>rightHandSide).parameters;
            case SyntaxKind.ClassExpression:
                for (const member of (<ClassExpression>rightHandSide).members) {
                    if (member.kind === SyntaxKind.Constructor) {
                        return (<ConstructorDeclaration>member).parameters;
                    }
                }
                break;
        }

        return emptyArray;
    }
}
