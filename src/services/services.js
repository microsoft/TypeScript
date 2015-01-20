/// <reference path="..\compiler\program.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='breakpoints.ts' />
/// <reference path='outliningElementsCollector.ts' />
/// <reference path='navigationBar.ts' />
/// <reference path='signatureHelp.ts' />
/// <reference path='utilities.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='formatting\smartIndenter.ts' />
var ts;
(function (ts) {
    ts.servicesVersion = "0.4";
    var ScriptSnapshot;
    (function (ScriptSnapshot) {
        var StringScriptSnapshot = (function () {
            function StringScriptSnapshot(text) {
                this.text = text;
                this._lineStartPositions = undefined;
            }
            StringScriptSnapshot.prototype.getText = function (start, end) {
                return this.text.substring(start, end);
            };
            StringScriptSnapshot.prototype.getLength = function () {
                return this.text.length;
            };
            StringScriptSnapshot.prototype.getLineStartPositions = function () {
                if (!this._lineStartPositions) {
                    this._lineStartPositions = ts.computeLineStarts(this.text);
                }
                return this._lineStartPositions;
            };
            StringScriptSnapshot.prototype.getChangeRange = function (oldSnapshot) {
                // Text-based snapshots do not support incremental parsing. Return undefined
                // to signal that to the caller.
                return undefined;
            };
            return StringScriptSnapshot;
        })();
        function fromString(text) {
            return new StringScriptSnapshot(text);
        }
        ScriptSnapshot.fromString = fromString;
    })(ScriptSnapshot = ts.ScriptSnapshot || (ts.ScriptSnapshot = {}));
    var scanner = ts.createScanner(ts.ScriptTarget.Latest, true);
    var emptyArray = [];
    function createNode(kind, pos, end, flags, parent) {
        var node = new (ts.getNodeConstructor(kind))();
        node.pos = pos;
        node.end = end;
        node.flags = flags;
        node.parent = parent;
        return node;
    }
    var NodeObject = (function () {
        function NodeObject() {
        }
        NodeObject.prototype.getSourceFile = function () {
            return ts.getSourceFileOfNode(this);
        };
        NodeObject.prototype.getStart = function (sourceFile) {
            return ts.getTokenPosOfNode(this, sourceFile);
        };
        NodeObject.prototype.getFullStart = function () {
            return this.pos;
        };
        NodeObject.prototype.getEnd = function () {
            return this.end;
        };
        NodeObject.prototype.getWidth = function (sourceFile) {
            return this.getEnd() - this.getStart(sourceFile);
        };
        NodeObject.prototype.getFullWidth = function () {
            return this.end - this.getFullStart();
        };
        NodeObject.prototype.getLeadingTriviaWidth = function (sourceFile) {
            return this.getStart(sourceFile) - this.pos;
        };
        NodeObject.prototype.getFullText = function (sourceFile) {
            return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
        };
        NodeObject.prototype.getText = function (sourceFile) {
            return (sourceFile || this.getSourceFile()).text.substring(this.getStart(), this.getEnd());
        };
        NodeObject.prototype.addSyntheticNodes = function (nodes, pos, end) {
            scanner.setTextPos(pos);
            while (pos < end) {
                var token = scanner.scan();
                var textPos = scanner.getTextPos();
                nodes.push(createNode(token, pos, textPos, ts.NodeFlags.Synthetic, this));
                pos = textPos;
            }
            return pos;
        };
        NodeObject.prototype.createSyntaxList = function (nodes) {
            var list = createNode(ts.SyntaxKind.SyntaxList, nodes.pos, nodes.end, ts.NodeFlags.Synthetic, this);
            list._children = [];
            var pos = nodes.pos;
            for (var i = 0, len = nodes.length; i < len; i++) {
                var node = nodes[i];
                if (pos < node.pos) {
                    pos = this.addSyntheticNodes(list._children, pos, node.pos);
                }
                list._children.push(node);
                pos = node.end;
            }
            if (pos < nodes.end) {
                this.addSyntheticNodes(list._children, pos, nodes.end);
            }
            return list;
        };
        NodeObject.prototype.createChildren = function (sourceFile) {
            var _this = this;
            if (this.kind >= ts.SyntaxKind.FirstNode) {
                scanner.setText((sourceFile || this.getSourceFile()).text);
                var children = [];
                var pos = this.pos;
                var processNode = function (node) {
                    if (pos < node.pos) {
                        pos = _this.addSyntheticNodes(children, pos, node.pos);
                    }
                    children.push(node);
                    pos = node.end;
                };
                var processNodes = function (nodes) {
                    if (pos < nodes.pos) {
                        pos = _this.addSyntheticNodes(children, pos, nodes.pos);
                    }
                    children.push(_this.createSyntaxList(nodes));
                    pos = nodes.end;
                };
                ts.forEachChild(this, processNode, processNodes);
                if (pos < this.end) {
                    this.addSyntheticNodes(children, pos, this.end);
                }
                scanner.setText(undefined);
            }
            this._children = children || emptyArray;
        };
        NodeObject.prototype.getChildCount = function (sourceFile) {
            if (!this._children)
                this.createChildren(sourceFile);
            return this._children.length;
        };
        NodeObject.prototype.getChildAt = function (index, sourceFile) {
            if (!this._children)
                this.createChildren(sourceFile);
            return this._children[index];
        };
        NodeObject.prototype.getChildren = function (sourceFile) {
            if (!this._children)
                this.createChildren(sourceFile);
            return this._children;
        };
        NodeObject.prototype.getFirstToken = function (sourceFile) {
            var children = this.getChildren();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.kind < ts.SyntaxKind.FirstNode) {
                    return child;
                }
                return child.getFirstToken(sourceFile);
            }
        };
        NodeObject.prototype.getLastToken = function (sourceFile) {
            var children = this.getChildren(sourceFile);
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.kind < ts.SyntaxKind.FirstNode) {
                    return child;
                }
                return child.getLastToken(sourceFile);
            }
        };
        return NodeObject;
    })();
    var SymbolObject = (function () {
        function SymbolObject(flags, name) {
            this.flags = flags;
            this.name = name;
        }
        SymbolObject.prototype.getFlags = function () {
            return this.flags;
        };
        SymbolObject.prototype.getName = function () {
            return this.name;
        };
        SymbolObject.prototype.getDeclarations = function () {
            return this.declarations;
        };
        SymbolObject.prototype.getDocumentationComment = function () {
            if (this.documentationComment === undefined) {
                this.documentationComment = getJsDocCommentsFromDeclarations(this.declarations, this.name, !(this.flags & ts.SymbolFlags.Property));
            }
            return this.documentationComment;
        };
        return SymbolObject;
    })();
    function getJsDocCommentsFromDeclarations(declarations, name, canUseParsedParamTagComments) {
        var documentationComment = [];
        var docComments = getJsDocCommentsSeparatedByNewLines();
        ts.forEach(docComments, function (docComment) {
            if (documentationComment.length) {
                documentationComment.push(ts.lineBreakPart());
            }
            documentationComment.push(docComment);
        });
        return documentationComment;
        function getJsDocCommentsSeparatedByNewLines() {
            var paramTag = "@param";
            var jsDocCommentParts = [];
            ts.forEach(declarations, function (declaration) {
                var sourceFileOfDeclaration = ts.getSourceFileOfNode(declaration);
                // If it is parameter - try and get the jsDoc comment with @param tag from function declaration's jsDoc comments
                if (canUseParsedParamTagComments && declaration.kind === ts.SyntaxKind.Parameter) {
                    ts.forEach(getJsDocCommentTextRange(declaration.parent, sourceFileOfDeclaration), function (jsDocCommentTextRange) {
                        var cleanedParamJsDocComment = getCleanedParamJsDocComment(jsDocCommentTextRange.pos, jsDocCommentTextRange.end, sourceFileOfDeclaration);
                        if (cleanedParamJsDocComment) {
                            jsDocCommentParts.push.apply(jsDocCommentParts, cleanedParamJsDocComment);
                        }
                    });
                }
                // If this is left side of dotted module declaration, there is no doc comments associated with this node
                if (declaration.kind === ts.SyntaxKind.ModuleDeclaration && declaration.body.kind === ts.SyntaxKind.ModuleDeclaration) {
                    return;
                }
                while (declaration.kind === ts.SyntaxKind.ModuleDeclaration && declaration.parent.kind === ts.SyntaxKind.ModuleDeclaration) {
                    declaration = declaration.parent;
                }
                // Get the cleaned js doc comment text from the declaration
                ts.forEach(getJsDocCommentTextRange(declaration.kind === ts.SyntaxKind.VariableDeclaration ? declaration.parent.parent : declaration, sourceFileOfDeclaration), function (jsDocCommentTextRange) {
                    var cleanedJsDocComment = getCleanedJsDocComment(jsDocCommentTextRange.pos, jsDocCommentTextRange.end, sourceFileOfDeclaration);
                    if (cleanedJsDocComment) {
                        jsDocCommentParts.push.apply(jsDocCommentParts, cleanedJsDocComment);
                    }
                });
            });
            return jsDocCommentParts;
            function getJsDocCommentTextRange(node, sourceFile) {
                return ts.map(ts.getJsDocComments(node, sourceFile), function (jsDocComment) {
                    return {
                        pos: jsDocComment.pos + "/*".length,
                        end: jsDocComment.end - "*/".length // Trim off comment end indicator 
                    };
                });
            }
            function consumeWhiteSpacesOnTheLine(pos, end, sourceFile, maxSpacesToRemove) {
                if (maxSpacesToRemove !== undefined) {
                    end = Math.min(end, pos + maxSpacesToRemove);
                }
                for (; pos < end; pos++) {
                    var ch = sourceFile.text.charCodeAt(pos);
                    if (!ts.isWhiteSpace(ch) || ts.isLineBreak(ch)) {
                        // Either found lineBreak or non whiteSpace
                        return pos;
                    }
                }
                return end;
            }
            function consumeLineBreaks(pos, end, sourceFile) {
                while (pos < end && ts.isLineBreak(sourceFile.text.charCodeAt(pos))) {
                    pos++;
                }
                return pos;
            }
            function isName(pos, end, sourceFile, name) {
                return pos + name.length < end && sourceFile.text.substr(pos, name.length) === name && (ts.isWhiteSpace(sourceFile.text.charCodeAt(pos + name.length)) || ts.isLineBreak(sourceFile.text.charCodeAt(pos + name.length)));
            }
            function isParamTag(pos, end, sourceFile) {
                // If it is @param tag
                return isName(pos, end, sourceFile, paramTag);
            }
            function pushDocCommentLineText(docComments, text, blankLineCount) {
                while (blankLineCount--)
                    docComments.push(ts.textPart(""));
                docComments.push(ts.textPart(text));
            }
            function getCleanedJsDocComment(pos, end, sourceFile) {
                var spacesToRemoveAfterAsterisk;
                var docComments = [];
                var blankLineCount = 0;
                var isInParamTag = false;
                while (pos < end) {
                    var docCommentTextOfLine = "";
                    // First consume leading white space
                    pos = consumeWhiteSpacesOnTheLine(pos, end, sourceFile);
                    // If the comment starts with '*' consume the spaces on this line
                    if (pos < end && sourceFile.text.charCodeAt(pos) === ts.CharacterCodes.asterisk) {
                        var lineStartPos = pos + 1;
                        pos = consumeWhiteSpacesOnTheLine(pos + 1, end, sourceFile, spacesToRemoveAfterAsterisk);
                        // Set the spaces to remove after asterisk as margin if not already set
                        if (spacesToRemoveAfterAsterisk === undefined && pos < end && !ts.isLineBreak(sourceFile.text.charCodeAt(pos))) {
                            spacesToRemoveAfterAsterisk = pos - lineStartPos;
                        }
                    }
                    else if (spacesToRemoveAfterAsterisk === undefined) {
                        spacesToRemoveAfterAsterisk = 0;
                    }
                    while (pos < end && !ts.isLineBreak(sourceFile.text.charCodeAt(pos))) {
                        var ch = sourceFile.text.charAt(pos);
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
            function getCleanedParamJsDocComment(pos, end, sourceFile) {
                var paramHelpStringMargin;
                var paramDocComments = [];
                while (pos < end) {
                    if (isParamTag(pos, end, sourceFile)) {
                        var blankLineCount = 0;
                        var recordedParamTag = false;
                        // Consume leading spaces 
                        pos = consumeWhiteSpaces(pos + paramTag.length);
                        if (pos >= end) {
                            break;
                        }
                        // Ignore type expression
                        if (sourceFile.text.charCodeAt(pos) === ts.CharacterCodes.openBrace) {
                            pos++;
                            for (var curlies = 1; pos < end; pos++) {
                                var charCode = sourceFile.text.charCodeAt(pos);
                                // { character means we need to find another } to match the found one
                                if (charCode === ts.CharacterCodes.openBrace) {
                                    curlies++;
                                    continue;
                                }
                                // } char
                                if (charCode === ts.CharacterCodes.closeBrace) {
                                    curlies--;
                                    if (curlies === 0) {
                                        // We do not have any more } to match the type expression is ignored completely
                                        pos++;
                                        break;
                                    }
                                    else {
                                        continue;
                                    }
                                }
                                // Found start of another tag
                                if (charCode === ts.CharacterCodes.at) {
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
                            var paramHelpString = "";
                            var firstLineParamHelpStringPos = pos;
                            while (pos < end) {
                                var ch = sourceFile.text.charCodeAt(pos);
                                // at line break, set this comment line text and go to next line 
                                if (ts.isLineBreak(ch)) {
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
                                if (ch === ts.CharacterCodes.at) {
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
                        // If this is the start of another tag, continue with the loop in seach of param tag with symbol name
                        if (sourceFile.text.charCodeAt(pos) === ts.CharacterCodes.at) {
                            continue;
                        }
                    }
                    // Next character
                    pos++;
                }
                return paramDocComments;
                function consumeWhiteSpaces(pos) {
                    while (pos < end && ts.isWhiteSpace(sourceFile.text.charCodeAt(pos))) {
                        pos++;
                    }
                    return pos;
                }
                function setPosForParamHelpStringOnNextLine(firstLineParamHelpStringPos) {
                    // Get the pos after consuming line breaks
                    pos = consumeLineBreaks(pos, end, sourceFile);
                    if (pos >= end) {
                        return;
                    }
                    if (paramHelpStringMargin === undefined) {
                        paramHelpStringMargin = sourceFile.getLineAndCharacterFromPosition(firstLineParamHelpStringPos).character - 1;
                    }
                    // Now consume white spaces max 
                    var startOfLinePos = pos;
                    pos = consumeWhiteSpacesOnTheLine(pos, end, sourceFile, paramHelpStringMargin);
                    if (pos >= end) {
                        return;
                    }
                    var consumedSpaces = pos - startOfLinePos;
                    if (consumedSpaces < paramHelpStringMargin) {
                        var ch = sourceFile.text.charCodeAt(pos);
                        if (ch === ts.CharacterCodes.asterisk) {
                            // Consume more spaces after asterisk
                            pos = consumeWhiteSpacesOnTheLine(pos + 1, end, sourceFile, paramHelpStringMargin - consumedSpaces - 1);
                        }
                    }
                }
            }
        }
    }
    var TypeObject = (function () {
        function TypeObject(checker, flags) {
            this.checker = checker;
            this.flags = flags;
        }
        TypeObject.prototype.getFlags = function () {
            return this.flags;
        };
        TypeObject.prototype.getSymbol = function () {
            return this.symbol;
        };
        TypeObject.prototype.getProperties = function () {
            return this.checker.getPropertiesOfType(this);
        };
        TypeObject.prototype.getProperty = function (propertyName) {
            return this.checker.getPropertyOfType(this, propertyName);
        };
        TypeObject.prototype.getApparentProperties = function () {
            return this.checker.getAugmentedPropertiesOfType(this);
        };
        TypeObject.prototype.getCallSignatures = function () {
            return this.checker.getSignaturesOfType(this, ts.SignatureKind.Call);
        };
        TypeObject.prototype.getConstructSignatures = function () {
            return this.checker.getSignaturesOfType(this, ts.SignatureKind.Construct);
        };
        TypeObject.prototype.getStringIndexType = function () {
            return this.checker.getIndexTypeOfType(this, ts.IndexKind.String);
        };
        TypeObject.prototype.getNumberIndexType = function () {
            return this.checker.getIndexTypeOfType(this, ts.IndexKind.Number);
        };
        return TypeObject;
    })();
    var SignatureObject = (function () {
        function SignatureObject(checker) {
            this.checker = checker;
        }
        SignatureObject.prototype.getDeclaration = function () {
            return this.declaration;
        };
        SignatureObject.prototype.getTypeParameters = function () {
            return this.typeParameters;
        };
        SignatureObject.prototype.getParameters = function () {
            return this.parameters;
        };
        SignatureObject.prototype.getReturnType = function () {
            return this.checker.getReturnTypeOfSignature(this);
        };
        SignatureObject.prototype.getDocumentationComment = function () {
            if (this.documentationComment === undefined) {
                this.documentationComment = this.declaration ? getJsDocCommentsFromDeclarations([this.declaration], undefined, false) : [];
            }
            return this.documentationComment;
        };
        return SignatureObject;
    })();
    var SourceFileObject = (function (_super) {
        __extends(SourceFileObject, _super);
        function SourceFileObject() {
            _super.apply(this, arguments);
        }
        SourceFileObject.prototype.getNamedDeclarations = function () {
            if (!this.namedDeclarations) {
                var sourceFile = this;
                var namedDeclarations = [];
                ts.forEachChild(sourceFile, function visit(node) {
                    switch (node.kind) {
                        case ts.SyntaxKind.FunctionDeclaration:
                        case ts.SyntaxKind.MethodDeclaration:
                        case ts.SyntaxKind.MethodSignature:
                            var functionDeclaration = node;
                            if (functionDeclaration.name && functionDeclaration.name.getFullWidth() > 0) {
                                var lastDeclaration = namedDeclarations.length > 0 ? namedDeclarations[namedDeclarations.length - 1] : undefined;
                                // Check whether this declaration belongs to an "overload group".
                                if (lastDeclaration && functionDeclaration.symbol === lastDeclaration.symbol) {
                                    // Overwrite the last declaration if it was an overload
                                    // and this one is an implementation.
                                    if (functionDeclaration.body && !lastDeclaration.body) {
                                        namedDeclarations[namedDeclarations.length - 1] = functionDeclaration;
                                    }
                                }
                                else {
                                    namedDeclarations.push(functionDeclaration);
                                }
                                ts.forEachChild(node, visit);
                            }
                            break;
                        case ts.SyntaxKind.ClassDeclaration:
                        case ts.SyntaxKind.InterfaceDeclaration:
                        case ts.SyntaxKind.TypeAliasDeclaration:
                        case ts.SyntaxKind.EnumDeclaration:
                        case ts.SyntaxKind.ModuleDeclaration:
                        case ts.SyntaxKind.ImportDeclaration:
                        case ts.SyntaxKind.GetAccessor:
                        case ts.SyntaxKind.SetAccessor:
                        case ts.SyntaxKind.TypeLiteral:
                            if (node.name) {
                                namedDeclarations.push(node);
                            }
                        case ts.SyntaxKind.Constructor:
                        case ts.SyntaxKind.VariableStatement:
                        case ts.SyntaxKind.VariableDeclarationList:
                        case ts.SyntaxKind.ObjectBindingPattern:
                        case ts.SyntaxKind.ArrayBindingPattern:
                        case ts.SyntaxKind.ModuleBlock:
                            ts.forEachChild(node, visit);
                            break;
                        case ts.SyntaxKind.Block:
                            if (ts.isFunctionBlock(node)) {
                                ts.forEachChild(node, visit);
                            }
                            break;
                        case ts.SyntaxKind.Parameter:
                            // Only consider properties defined as constructor parameters
                            if (!(node.flags & ts.NodeFlags.AccessibilityModifier)) {
                                break;
                            }
                        case ts.SyntaxKind.VariableDeclaration:
                        case ts.SyntaxKind.BindingElement:
                            if (ts.isBindingPattern(node.name)) {
                                ts.forEachChild(node.name, visit);
                                break;
                            }
                        case ts.SyntaxKind.EnumMember:
                        case ts.SyntaxKind.PropertyDeclaration:
                        case ts.SyntaxKind.PropertySignature:
                            namedDeclarations.push(node);
                            break;
                    }
                });
                this.namedDeclarations = namedDeclarations;
            }
            return this.namedDeclarations;
        };
        return SourceFileObject;
    })(NodeObject);
    var TextChange = (function () {
        function TextChange() {
        }
        return TextChange;
    })();
    ts.TextChange = TextChange;
    (function (SymbolDisplayPartKind) {
        SymbolDisplayPartKind[SymbolDisplayPartKind["aliasName"] = 0] = "aliasName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["className"] = 1] = "className";
        SymbolDisplayPartKind[SymbolDisplayPartKind["enumName"] = 2] = "enumName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["fieldName"] = 3] = "fieldName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["interfaceName"] = 4] = "interfaceName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["keyword"] = 5] = "keyword";
        SymbolDisplayPartKind[SymbolDisplayPartKind["lineBreak"] = 6] = "lineBreak";
        SymbolDisplayPartKind[SymbolDisplayPartKind["numericLiteral"] = 7] = "numericLiteral";
        SymbolDisplayPartKind[SymbolDisplayPartKind["stringLiteral"] = 8] = "stringLiteral";
        SymbolDisplayPartKind[SymbolDisplayPartKind["localName"] = 9] = "localName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["methodName"] = 10] = "methodName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["moduleName"] = 11] = "moduleName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["operator"] = 12] = "operator";
        SymbolDisplayPartKind[SymbolDisplayPartKind["parameterName"] = 13] = "parameterName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["propertyName"] = 14] = "propertyName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["punctuation"] = 15] = "punctuation";
        SymbolDisplayPartKind[SymbolDisplayPartKind["space"] = 16] = "space";
        SymbolDisplayPartKind[SymbolDisplayPartKind["text"] = 17] = "text";
        SymbolDisplayPartKind[SymbolDisplayPartKind["typeParameterName"] = 18] = "typeParameterName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["enumMemberName"] = 19] = "enumMemberName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["functionName"] = 20] = "functionName";
        SymbolDisplayPartKind[SymbolDisplayPartKind["regularExpressionLiteral"] = 21] = "regularExpressionLiteral";
    })(ts.SymbolDisplayPartKind || (ts.SymbolDisplayPartKind = {}));
    var SymbolDisplayPartKind = ts.SymbolDisplayPartKind;
    (function (TokenClass) {
        TokenClass[TokenClass["Punctuation"] = 0] = "Punctuation";
        TokenClass[TokenClass["Keyword"] = 1] = "Keyword";
        TokenClass[TokenClass["Operator"] = 2] = "Operator";
        TokenClass[TokenClass["Comment"] = 3] = "Comment";
        TokenClass[TokenClass["Whitespace"] = 4] = "Whitespace";
        TokenClass[TokenClass["Identifier"] = 5] = "Identifier";
        TokenClass[TokenClass["NumberLiteral"] = 6] = "NumberLiteral";
        TokenClass[TokenClass["StringLiteral"] = 7] = "StringLiteral";
        TokenClass[TokenClass["RegExpLiteral"] = 8] = "RegExpLiteral";
    })(ts.TokenClass || (ts.TokenClass = {}));
    var TokenClass = ts.TokenClass;
    // TODO: move these to enums
    var ScriptElementKind = (function () {
        function ScriptElementKind() {
        }
        ScriptElementKind.unknown = "";
        // predefined type (void) or keyword (class)
        ScriptElementKind.keyword = "keyword";
        // top level script node
        ScriptElementKind.scriptElement = "script";
        // module foo {}
        ScriptElementKind.moduleElement = "module";
        // class X {}
        ScriptElementKind.classElement = "class";
        // interface Y {}
        ScriptElementKind.interfaceElement = "interface";
        // type T = ...
        ScriptElementKind.typeElement = "type";
        // enum E
        ScriptElementKind.enumElement = "enum";
        // Inside module and script only
        // var v = ..
        ScriptElementKind.variableElement = "var";
        // Inside function
        ScriptElementKind.localVariableElement = "local var";
        // Inside module and script only
        // function f() { }
        ScriptElementKind.functionElement = "function";
        // Inside function
        ScriptElementKind.localFunctionElement = "local function";
        // class X { [public|private]* foo() {} }
        ScriptElementKind.memberFunctionElement = "method";
        // class X { [public|private]* [get|set] foo:number; }
        ScriptElementKind.memberGetAccessorElement = "getter";
        ScriptElementKind.memberSetAccessorElement = "setter";
        // class X { [public|private]* foo:number; }
        // interface Y { foo:number; }
        ScriptElementKind.memberVariableElement = "property";
        // class X { constructor() { } }
        ScriptElementKind.constructorImplementationElement = "constructor";
        // interface Y { ():number; }
        ScriptElementKind.callSignatureElement = "call";
        // interface Y { []:number; }
        ScriptElementKind.indexSignatureElement = "index";
        // interface Y { new():Y; }
        ScriptElementKind.constructSignatureElement = "construct";
        // function foo(*Y*: string)
        ScriptElementKind.parameterElement = "parameter";
        ScriptElementKind.typeParameterElement = "type parameter";
        ScriptElementKind.primitiveType = "primitive type";
        ScriptElementKind.label = "label";
        ScriptElementKind.alias = "alias";
        ScriptElementKind.constElement = "const";
        ScriptElementKind.letElement = "let";
        return ScriptElementKind;
    })();
    ts.ScriptElementKind = ScriptElementKind;
    var ScriptElementKindModifier = (function () {
        function ScriptElementKindModifier() {
        }
        ScriptElementKindModifier.none = "";
        ScriptElementKindModifier.publicMemberModifier = "public";
        ScriptElementKindModifier.privateMemberModifier = "private";
        ScriptElementKindModifier.protectedMemberModifier = "protected";
        ScriptElementKindModifier.exportedModifier = "export";
        ScriptElementKindModifier.ambientModifier = "declare";
        ScriptElementKindModifier.staticModifier = "static";
        return ScriptElementKindModifier;
    })();
    ts.ScriptElementKindModifier = ScriptElementKindModifier;
    var ClassificationTypeNames = (function () {
        function ClassificationTypeNames() {
        }
        ClassificationTypeNames.comment = "comment";
        ClassificationTypeNames.identifier = "identifier";
        ClassificationTypeNames.keyword = "keyword";
        ClassificationTypeNames.numericLiteral = "number";
        ClassificationTypeNames.operator = "operator";
        ClassificationTypeNames.stringLiteral = "string";
        ClassificationTypeNames.whiteSpace = "whitespace";
        ClassificationTypeNames.text = "text";
        ClassificationTypeNames.punctuation = "punctuation";
        ClassificationTypeNames.className = "class name";
        ClassificationTypeNames.enumName = "enum name";
        ClassificationTypeNames.interfaceName = "interface name";
        ClassificationTypeNames.moduleName = "module name";
        ClassificationTypeNames.typeParameterName = "type parameter name";
        ClassificationTypeNames.typeAlias = "type alias name";
        return ClassificationTypeNames;
    })();
    ts.ClassificationTypeNames = ClassificationTypeNames;
    var MatchKind;
    (function (MatchKind) {
        MatchKind[MatchKind["none"] = 0] = "none";
        MatchKind[MatchKind["exact"] = 1] = "exact";
        MatchKind[MatchKind["substring"] = 2] = "substring";
        MatchKind[MatchKind["prefix"] = 3] = "prefix";
    })(MatchKind || (MatchKind = {}));
    function displayPartsToString(displayParts) {
        if (displayParts) {
            return ts.map(displayParts, function (displayPart) { return displayPart.text; }).join("");
        }
        return "";
    }
    ts.displayPartsToString = displayPartsToString;
    function isLocalVariableOrFunction(symbol) {
        if (symbol.parent) {
            return false; // This is exported symbol
        }
        return ts.forEach(symbol.declarations, function (declaration) {
            // Function expressions are local
            if (declaration.kind === ts.SyntaxKind.FunctionExpression) {
                return true;
            }
            if (declaration.kind !== ts.SyntaxKind.VariableDeclaration && declaration.kind !== ts.SyntaxKind.FunctionDeclaration) {
                return false;
            }
            for (var parent = declaration.parent; !ts.isFunctionBlock(parent); parent = parent.parent) {
                // Reached source file or module block
                if (parent.kind === ts.SyntaxKind.SourceFile || parent.kind === ts.SyntaxKind.ModuleBlock) {
                    return false;
                }
            }
            // parent is in function block
            return true;
        });
    }
    function getDefaultCompilerOptions() {
        // Set "ScriptTarget.Latest" target by default for language service
        return {
            target: ts.ScriptTarget.Latest,
            module: ts.ModuleKind.None,
        };
    }
    ts.getDefaultCompilerOptions = getDefaultCompilerOptions;
    var OperationCanceledException = (function () {
        function OperationCanceledException() {
        }
        return OperationCanceledException;
    })();
    ts.OperationCanceledException = OperationCanceledException;
    var CancellationTokenObject = (function () {
        function CancellationTokenObject(cancellationToken) {
            this.cancellationToken = cancellationToken;
        }
        CancellationTokenObject.prototype.isCancellationRequested = function () {
            return this.cancellationToken && this.cancellationToken.isCancellationRequested();
        };
        CancellationTokenObject.prototype.throwIfCancellationRequested = function () {
            if (this.isCancellationRequested()) {
                throw new OperationCanceledException();
            }
        };
        CancellationTokenObject.None = new CancellationTokenObject(null);
        return CancellationTokenObject;
    })();
    ts.CancellationTokenObject = CancellationTokenObject;
    // Cache host information about scrip Should be refreshed 
    // at each language service public entry point, since we don't know when 
    // set of scripts handled by the host changes.
    var HostCache = (function () {
        function HostCache(host) {
            this.host = host;
            // script id => script index
            this.filenameToEntry = {};
            var filenames = host.getScriptFileNames();
            for (var i = 0, n = filenames.length; i < n; i++) {
                var filename = filenames[i];
                this.filenameToEntry[ts.normalizeSlashes(filename)] = {
                    filename: filename,
                    version: host.getScriptVersion(filename)
                };
            }
            this._compilationSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        }
        HostCache.prototype.compilationSettings = function () {
            return this._compilationSettings;
        };
        HostCache.prototype.getEntry = function (filename) {
            filename = ts.normalizeSlashes(filename);
            return ts.lookUp(this.filenameToEntry, filename);
        };
        HostCache.prototype.contains = function (filename) {
            return !!this.getEntry(filename);
        };
        HostCache.prototype.getHostfilename = function (filename) {
            var hostCacheEntry = this.getEntry(filename);
            if (hostCacheEntry) {
                return hostCacheEntry.filename;
            }
            return filename;
        };
        HostCache.prototype.getFilenames = function () {
            var _this = this;
            var fileNames = [];
            ts.forEachKey(this.filenameToEntry, function (key) {
                if (ts.hasProperty(_this.filenameToEntry, key))
                    fileNames.push(key);
            });
            return fileNames;
        };
        HostCache.prototype.getVersion = function (filename) {
            return this.getEntry(filename).version;
        };
        HostCache.prototype.getScriptSnapshot = function (filename) {
            var file = this.getEntry(filename);
            if (!file.sourceText) {
                file.sourceText = this.host.getScriptSnapshot(file.filename);
            }
            return file.sourceText;
        };
        HostCache.prototype.getChangeRange = function (filename, lastKnownVersion, oldScriptSnapshot) {
            var currentVersion = this.getVersion(filename);
            if (lastKnownVersion === currentVersion) {
                return ts.unchangedTextChangeRange; // "No changes"
            }
            var scriptSnapshot = this.getScriptSnapshot(filename);
            return scriptSnapshot.getChangeRange(oldScriptSnapshot);
        };
        return HostCache;
    })();
    var SyntaxTreeCache = (function () {
        function SyntaxTreeCache(host) {
            this.host = host;
            // For our syntactic only features, we also keep a cache of the syntax tree for the 
            // currently edited file.  
            this.currentFilename = "";
            this.currentFileVersion = null;
            this.currentSourceFile = null;
        }
        SyntaxTreeCache.prototype.log = function (message) {
            if (this.host.log) {
                this.host.log(message);
            }
        };
        SyntaxTreeCache.prototype.initialize = function (filename) {
            // ensure that both source file and syntax tree are either initialized or not initialized
            var start = new Date().getTime();
            this.hostCache = new HostCache(this.host);
            this.log("SyntaxTreeCache.Initialize: new HostCache: " + (new Date().getTime() - start));
            var version = this.hostCache.getVersion(filename);
            var sourceFile;
            if (this.currentFilename !== filename) {
                var scriptSnapshot = this.hostCache.getScriptSnapshot(filename);
                var start = new Date().getTime();
                sourceFile = createLanguageServiceSourceFile(filename, scriptSnapshot, ts.ScriptTarget.Latest, version, true);
                this.log("SyntaxTreeCache.Initialize: createSourceFile: " + (new Date().getTime() - start));
            }
            else if (this.currentFileVersion !== version) {
                var scriptSnapshot = this.hostCache.getScriptSnapshot(filename);
                var editRange = this.hostCache.getChangeRange(filename, this.currentFileVersion, this.currentSourceFile.scriptSnapshot);
                var start = new Date().getTime();
                sourceFile = updateLanguageServiceSourceFile(this.currentSourceFile, scriptSnapshot, version, editRange);
                this.log("SyntaxTreeCache.Initialize: updateSourceFile: " + (new Date().getTime() - start));
            }
            if (sourceFile) {
                // All done, ensure state is up to date
                this.currentFileVersion = version;
                this.currentFilename = filename;
                this.currentSourceFile = sourceFile;
            }
        };
        SyntaxTreeCache.prototype.getCurrentSourceFile = function (filename) {
            this.initialize(filename);
            return this.currentSourceFile;
        };
        SyntaxTreeCache.prototype.getCurrentScriptSnapshot = function (filename) {
            return this.getCurrentSourceFile(filename).scriptSnapshot;
        };
        return SyntaxTreeCache;
    })();
    function setSourceFileFields(sourceFile, scriptSnapshot, version) {
        sourceFile.version = version;
        sourceFile.scriptSnapshot = scriptSnapshot;
    }
    function createLanguageServiceSourceFile(filename, scriptSnapshot, scriptTarget, version, setNodeParents) {
        var sourceFile = ts.createSourceFile(filename, scriptSnapshot.getText(0, scriptSnapshot.getLength()), scriptTarget, setNodeParents);
        setSourceFileFields(sourceFile, scriptSnapshot, version);
        return sourceFile;
    }
    ts.createLanguageServiceSourceFile = createLanguageServiceSourceFile;
    ts.disableIncrementalParsing = false;
    function updateLanguageServiceSourceFile(sourceFile, scriptSnapshot, version, textChangeRange) {
        if (textChangeRange && ts.Debug.shouldAssert(ts.AssertionLevel.Normal)) {
            var oldText = sourceFile.scriptSnapshot;
            var newText = scriptSnapshot;
            ts.Debug.assert((oldText.getLength() - textChangeRange.span.length + textChangeRange.newLength) === newText.getLength());
            if (ts.Debug.shouldAssert(ts.AssertionLevel.VeryAggressive)) {
                var oldTextPrefix = oldText.getText(0, textChangeRange.span.start);
                var newTextPrefix = newText.getText(0, textChangeRange.span.start);
                ts.Debug.assert(oldTextPrefix === newTextPrefix);
                var oldTextSuffix = oldText.getText(ts.textSpanEnd(textChangeRange.span), oldText.getLength());
                var newTextSuffix = newText.getText(ts.textSpanEnd(ts.textChangeRangeNewSpan(textChangeRange)), newText.getLength());
                ts.Debug.assert(oldTextSuffix === newTextSuffix);
            }
        }
        // If we were given a text change range, and our version or open-ness changed, then 
        // incrementally parse this file.
        if (textChangeRange) {
            if (version !== sourceFile.version) {
                // Once incremental parsing is ready, then just call into this function.
                if (!ts.disableIncrementalParsing) {
                    var newSourceFile = sourceFile.update(scriptSnapshot.getText(0, scriptSnapshot.getLength()), textChangeRange);
                    setSourceFileFields(newSourceFile, scriptSnapshot, version);
                    return newSourceFile;
                }
            }
        }
        // Otherwise, just create a new source file.
        return createLanguageServiceSourceFile(sourceFile.filename, scriptSnapshot, sourceFile.languageVersion, version, true);
    }
    ts.updateLanguageServiceSourceFile = updateLanguageServiceSourceFile;
    function createDocumentRegistry() {
        var buckets = {};
        function getKeyFromCompilationSettings(settings) {
            return "_" + settings.target; //  + "|" + settings.propagateEnumConstantoString()
        }
        function getBucketForCompilationSettings(settings, createIfMissing) {
            var key = getKeyFromCompilationSettings(settings);
            var bucket = ts.lookUp(buckets, key);
            if (!bucket && createIfMissing) {
                buckets[key] = bucket = {};
            }
            return bucket;
        }
        function reportStats() {
            var bucketInfoArray = Object.keys(buckets).filter(function (name) { return name && name.charAt(0) === '_'; }).map(function (name) {
                var entries = ts.lookUp(buckets, name);
                var sourceFiles = [];
                for (var i in entries) {
                    var entry = entries[i];
                    sourceFiles.push({
                        name: i,
                        refCount: entry.refCount,
                        references: entry.owners.slice(0)
                    });
                }
                sourceFiles.sort(function (x, y) { return y.refCount - x.refCount; });
                return {
                    bucket: name,
                    sourceFiles
                };
            });
            return JSON.stringify(bucketInfoArray, null, 2);
        }
        function acquireDocument(filename, compilationSettings, scriptSnapshot, version) {
            var bucket = getBucketForCompilationSettings(compilationSettings, true);
            var entry = ts.lookUp(bucket, filename);
            if (!entry) {
                var sourceFile = createLanguageServiceSourceFile(filename, scriptSnapshot, compilationSettings.target, version, false);
                bucket[filename] = entry = {
                    sourceFile: sourceFile,
                    refCount: 0,
                    owners: []
                };
            }
            entry.refCount++;
            return entry.sourceFile;
        }
        function updateDocument(sourceFile, filename, compilationSettings, scriptSnapshot, version, textChangeRange) {
            var bucket = getBucketForCompilationSettings(compilationSettings, false);
            ts.Debug.assert(bucket !== undefined);
            var entry = ts.lookUp(bucket, filename);
            ts.Debug.assert(entry !== undefined);
            entry.sourceFile = updateLanguageServiceSourceFile(entry.sourceFile, scriptSnapshot, version, textChangeRange);
            return entry.sourceFile;
        }
        function releaseDocument(filename, compilationSettings) {
            var bucket = getBucketForCompilationSettings(compilationSettings, false);
            ts.Debug.assert(bucket !== undefined);
            var entry = ts.lookUp(bucket, filename);
            entry.refCount--;
            ts.Debug.assert(entry.refCount >= 0);
            if (entry.refCount === 0) {
                delete bucket[filename];
            }
        }
        return {
            acquireDocument,
            updateDocument,
            releaseDocument,
            reportStats
        };
    }
    ts.createDocumentRegistry = createDocumentRegistry;
    function preProcessFile(sourceText, readImportFiles = true) {
        var referencedFiles = [];
        var importedFiles = [];
        var isNoDefaultLib = false;
        function processTripleSlashDirectives() {
            var commentRanges = ts.getLeadingCommentRanges(sourceText, 0);
            ts.forEach(commentRanges, function (commentRange) {
                var comment = sourceText.substring(commentRange.pos, commentRange.end);
                var referencePathMatchResult = ts.getFileReferenceFromReferencePath(comment, commentRange);
                if (referencePathMatchResult) {
                    isNoDefaultLib = referencePathMatchResult.isNoDefaultLib;
                    var fileReference = referencePathMatchResult.fileReference;
                    if (fileReference) {
                        referencedFiles.push(fileReference);
                    }
                }
            });
        }
        function processImport() {
            scanner.setText(sourceText);
            var token = scanner.scan();
            while (token !== ts.SyntaxKind.EndOfFileToken) {
                if (token === ts.SyntaxKind.ImportKeyword) {
                    token = scanner.scan();
                    if (token === ts.SyntaxKind.Identifier) {
                        token = scanner.scan();
                        if (token === ts.SyntaxKind.EqualsToken) {
                            token = scanner.scan();
                            if (token === ts.SyntaxKind.RequireKeyword) {
                                token = scanner.scan();
                                if (token === ts.SyntaxKind.OpenParenToken) {
                                    token = scanner.scan();
                                    if (token === ts.SyntaxKind.StringLiteral) {
                                        var importPath = scanner.getTokenValue();
                                        var pos = scanner.getTokenPos();
                                        importedFiles.push({
                                            filename: importPath,
                                            pos: pos,
                                            end: pos + importPath.length
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                token = scanner.scan();
            }
            scanner.setText(undefined);
        }
        if (readImportFiles) {
            processImport();
        }
        processTripleSlashDirectives();
        return { referencedFiles, importedFiles, isLibFile: isNoDefaultLib };
    }
    ts.preProcessFile = preProcessFile;
    /// Helpers
    function getTargetLabel(referenceNode, labelName) {
        while (referenceNode) {
            if (referenceNode.kind === ts.SyntaxKind.LabeledStatement && referenceNode.label.text === labelName) {
                return referenceNode.label;
            }
            referenceNode = referenceNode.parent;
        }
        return undefined;
    }
    function isJumpStatementTarget(node) {
        return node.kind === ts.SyntaxKind.Identifier && (node.parent.kind === ts.SyntaxKind.BreakStatement || node.parent.kind === ts.SyntaxKind.ContinueStatement) && node.parent.label === node;
    }
    function isLabelOfLabeledStatement(node) {
        return node.kind === ts.SyntaxKind.Identifier && node.parent.kind === ts.SyntaxKind.LabeledStatement && node.parent.label === node;
    }
    /**
     * Whether or not a 'node' is preceded by a label of the given string.
     * Note: 'node' cannot be a SourceFile.
     */
    function isLabeledBy(node, labelName) {
        for (var owner = node.parent; owner.kind === ts.SyntaxKind.LabeledStatement; owner = owner.parent) {
            if (owner.label.text === labelName) {
                return true;
            }
        }
        return false;
    }
    function isLabelName(node) {
        return isLabelOfLabeledStatement(node) || isJumpStatementTarget(node);
    }
    function isRightSideOfQualifiedName(node) {
        return node.parent.kind === ts.SyntaxKind.QualifiedName && node.parent.right === node;
    }
    function isRightSideOfPropertyAccess(node) {
        return node && node.parent && node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && node.parent.name === node;
    }
    function isCallExpressionTarget(node) {
        if (isRightSideOfPropertyAccess(node)) {
            node = node.parent;
        }
        return node && node.parent && node.parent.kind === ts.SyntaxKind.CallExpression && node.parent.expression === node;
    }
    function isNewExpressionTarget(node) {
        if (isRightSideOfPropertyAccess(node)) {
            node = node.parent;
        }
        return node && node.parent && node.parent.kind === ts.SyntaxKind.NewExpression && node.parent.expression === node;
    }
    function isNameOfModuleDeclaration(node) {
        return node.parent.kind === ts.SyntaxKind.ModuleDeclaration && node.parent.name === node;
    }
    function isNameOfFunctionDeclaration(node) {
        return node.kind === ts.SyntaxKind.Identifier && ts.isAnyFunction(node.parent) && node.parent.name === node;
    }
    /** Returns true if node is a name of an object literal property, e.g. "a" in x = { "a": 1 } */
    function isNameOfPropertyAssignment(node) {
        return (node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.StringLiteral || node.kind === ts.SyntaxKind.NumericLiteral) && (node.parent.kind === ts.SyntaxKind.PropertyAssignment || node.parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment) && node.parent.name === node;
    }
    function isLiteralNameOfPropertyDeclarationOrIndexAccess(node) {
        if (node.kind === ts.SyntaxKind.StringLiteral || node.kind === ts.SyntaxKind.NumericLiteral) {
            switch (node.parent.kind) {
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.PropertyAssignment:
                case ts.SyntaxKind.EnumMember:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.ModuleDeclaration:
                    return node.parent.name === node;
                case ts.SyntaxKind.ElementAccessExpression:
                    return node.parent.argumentExpression === node;
            }
        }
        return false;
    }
    function isNameOfExternalModuleImportOrDeclaration(node) {
        if (node.kind === ts.SyntaxKind.StringLiteral) {
            return isNameOfModuleDeclaration(node) || (ts.isExternalModuleImportDeclaration(node.parent.parent) && ts.getExternalModuleImportDeclarationExpression(node.parent.parent) === node);
        }
        return false;
    }
    /** Returns true if the position is within a comment */
    function isInsideComment(sourceFile, token, position) {
        // The position has to be: 1. in the leading trivia (before token.getStart()), and 2. within a comment
        return position <= token.getStart(sourceFile) && (isInsideCommentRange(ts.getTrailingCommentRanges(sourceFile.text, token.getFullStart())) || isInsideCommentRange(ts.getLeadingCommentRanges(sourceFile.text, token.getFullStart())));
        function isInsideCommentRange(comments) {
            return ts.forEach(comments, function (comment) {
                // either we are 1. completely inside the comment, or 2. at the end of the comment
                if (comment.pos < position && position < comment.end) {
                    return true;
                }
                else if (position === comment.end) {
                    var text = sourceFile.text;
                    var width = comment.end - comment.pos;
                    // is single line comment or just /*
                    if (width <= 2 || text.charCodeAt(comment.pos + 1) === ts.CharacterCodes.slash) {
                        return true;
                    }
                    else {
                        // is unterminated multi-line comment
                        return !(text.charCodeAt(comment.end - 1) === ts.CharacterCodes.slash && text.charCodeAt(comment.end - 2) === ts.CharacterCodes.asterisk);
                    }
                }
                return false;
            });
        }
    }
    // A cache of completion entries for keywords, these do not change between sessions
    var keywordCompletions = [];
    for (var i = ts.SyntaxKind.FirstKeyword; i <= ts.SyntaxKind.LastKeyword; i++) {
        keywordCompletions.push({
            name: ts.tokenToString(i),
            kind: ScriptElementKind.keyword,
            kindModifiers: ScriptElementKindModifier.none
        });
    }
    function createLanguageService(host, documentRegistry) {
        var syntaxTreeCache = new SyntaxTreeCache(host);
        var ruleProvider;
        var hostCache; // A cache of all the information about the files on the host side.
        var program;
        // this checker is used to answer all LS questions except errors 
        var typeInfoResolver;
        var useCaseSensitivefilenames = false;
        var sourceFilesByName = {};
        var documentRegistry = documentRegistry;
        var cancellationToken = new CancellationTokenObject(host.getCancellationToken && host.getCancellationToken());
        var activeCompletionSession; // The current active completion session, used to get the completion entry details
        // Check if the localized messages json is set, otherwise query the host for it
        if (!ts.localizedDiagnosticMessages && host.getLocalizedDiagnosticMessages) {
            ts.localizedDiagnosticMessages = host.getLocalizedDiagnosticMessages();
        }
        function log(message) {
            if (host.log) {
                host.log(message);
            }
        }
        function getCanonicalFileName(filename) {
            return useCaseSensitivefilenames ? filename : filename.toLowerCase();
        }
        function getSourceFile(filename) {
            return ts.lookUp(sourceFilesByName, getCanonicalFileName(filename));
        }
        function getDiagnosticsProducingTypeChecker() {
            return program.getTypeChecker(true);
        }
        function getRuleProvider(options) {
            // Ensure rules are initialized and up to date wrt to formatting options
            if (!ruleProvider) {
                ruleProvider = new ts.formatting.RulesProvider();
            }
            ruleProvider.ensureUpToDate(options);
            return ruleProvider;
        }
        function sourceFileUpToDate(sourceFile) {
            return sourceFile && sourceFile.version === hostCache.getVersion(sourceFile.filename);
        }
        function programUpToDate() {
            // If we haven't create a program yet, then it is not up-to-date
            if (!program) {
                return false;
            }
            // If number of files in the program do not match, it is not up-to-date
            var hostFilenames = hostCache.getFilenames();
            if (program.getSourceFiles().length !== hostFilenames.length) {
                return false;
            }
            for (var i = 0, n = hostFilenames.length; i < n; i++) {
                if (!sourceFileUpToDate(program.getSourceFile(hostFilenames[i]))) {
                    return false;
                }
            }
            // If the compilation settings do no match, then the program is not up-to-date
            return ts.compareDataObjects(program.getCompilerOptions(), hostCache.compilationSettings());
        }
        function synchronizeHostData() {
            // Reset the cache at start of every refresh
            hostCache = new HostCache(host);
            // If the program is already up-to-date, we can reuse it
            if (programUpToDate()) {
                return;
            }
            var compilationSettings = hostCache.compilationSettings();
            // Now, remove any files from the compiler that are no longer in the host.
            var oldProgram = program;
            if (oldProgram) {
                var oldSettings = program.getCompilerOptions();
                // If the language version changed, then that affects what types of things we parse. So
                // we have to dump all syntax trees.
                // TODO: handle propagateEnumConstants
                // TODO: is module still needed
                var settingsChangeAffectsSyntax = oldSettings.target !== compilationSettings.target || oldSettings.module !== compilationSettings.module;
                var changesInCompilationSettingsAffectSyntax = oldSettings && compilationSettings && !ts.compareDataObjects(oldSettings, compilationSettings) && settingsChangeAffectsSyntax;
                var oldSourceFiles = program.getSourceFiles();
                for (var i = 0, n = oldSourceFiles.length; i < n; i++) {
                    cancellationToken.throwIfCancellationRequested();
                    var filename = oldSourceFiles[i].filename;
                    if (!hostCache.contains(filename) || changesInCompilationSettingsAffectSyntax) {
                        documentRegistry.releaseDocument(filename, oldSettings);
                        delete sourceFilesByName[getCanonicalFileName(filename)];
                    }
                }
            }
            // Now, for every file the host knows about, either add the file (if the compiler
            // doesn't know about it.).  Or notify the compiler about any changes (if it does
            // know about it.)
            var hostfilenames = hostCache.getFilenames();
            for (var i = 0, n = hostfilenames.length; i < n; i++) {
                var filename = hostfilenames[i];
                var version = hostCache.getVersion(filename);
                var scriptSnapshot = hostCache.getScriptSnapshot(filename);
                var sourceFile = getSourceFile(filename);
                if (sourceFile) {
                    //
                    // If the sourceFile is the same, assume no update
                    //
                    if (sourceFileUpToDate(sourceFile)) {
                        continue;
                    }
                    var textChangeRange = null;
                    textChangeRange = hostCache.getChangeRange(filename, sourceFile.version, sourceFile.scriptSnapshot);
                    sourceFile = documentRegistry.updateDocument(sourceFile, filename, compilationSettings, scriptSnapshot, version, textChangeRange);
                }
                else {
                    sourceFile = documentRegistry.acquireDocument(filename, compilationSettings, scriptSnapshot, version);
                }
                // Remember the new sourceFile
                sourceFilesByName[getCanonicalFileName(filename)] = sourceFile;
            }
            // Now create a new compiler
            program = ts.createProgram(hostfilenames, compilationSettings, {
                getSourceFile: getSourceFile,
                getCancellationToken: function () { return cancellationToken; },
                getCanonicalFileName: function (filename) { return useCaseSensitivefilenames ? filename : filename.toLowerCase(); },
                useCaseSensitiveFileNames: function () { return useCaseSensitivefilenames; },
                getNewLine: function () { return host.getNewLine ? host.getNewLine() : "\r\n"; },
                getDefaultLibFilename: ts.getDefaultLibraryFilename,
                writeFile: function (filename, data, writeByteOrderMark) {
                },
                getCurrentDirectory: function () { return host.getCurrentDirectory(); }
            });
            typeInfoResolver = program.getTypeChecker(false);
        }
        /**
         * Clean up any semantic caches that are not needed.
         * The host can call this method if it wants to jettison unused memory.
         * We will just dump the typeChecker and recreate a new one. this should have the effect of destroying all the semantic caches.
         */
        function cleanupSemanticCache() {
            if (program) {
                typeInfoResolver = program.getTypeChecker(false);
            }
        }
        function dispose() {
            if (program) {
                ts.forEach(program.getSourceFiles(), function (f) {
                    documentRegistry.releaseDocument(f.filename, program.getCompilerOptions());
                });
            }
        }
        /// Diagnostics
        function getSyntacticDiagnostics(filename) {
            synchronizeHostData();
            filename = ts.normalizeSlashes(filename);
            return program.getDiagnostics(getSourceFile(filename));
        }
        /**
         * getSemanticDiagnostiscs return array of Diagnostics. If '-d' is not enabled, only report semantic errors
         * If '-d' enabled, report both semantic and emitter errors
         */
        function getSemanticDiagnostics(filename) {
            synchronizeHostData();
            filename = ts.normalizeSlashes(filename);
            var compilerOptions = program.getCompilerOptions();
            var checker = getDiagnosticsProducingTypeChecker();
            var targetSourceFile = getSourceFile(filename);
            // Only perform the action per file regardless of '-out' flag as LanguageServiceHost is expected to call this function per file.
            // Therefore only get diagnostics for given file.
            var allDiagnostics = checker.getDiagnostics(targetSourceFile);
            if (compilerOptions.declaration) {
                // If '-d' is enabled, check for emitter error. One example of emitter error is export class implements non-export interface
                allDiagnostics = allDiagnostics.concat(program.getDeclarationDiagnostics(targetSourceFile));
            }
            return allDiagnostics;
        }
        function getCompilerOptionsDiagnostics() {
            synchronizeHostData();
            return program.getGlobalDiagnostics();
        }
        /// Completion
        function getValidCompletionEntryDisplayName(symbol, target) {
            var displayName = symbol.getName();
            if (displayName && displayName.length > 0) {
                var firstCharCode = displayName.charCodeAt(0);
                // First check of the displayName is not external module; if it is an external module, it is not valid entry
                if ((symbol.flags & ts.SymbolFlags.Namespace) && (firstCharCode === ts.CharacterCodes.singleQuote || firstCharCode === ts.CharacterCodes.doubleQuote)) {
                    // If the symbol is external module, don't show it in the completion list
                    // (i.e declare module "http" { var x; } | // <= request completion here, "http" should not be there)
                    return undefined;
                }
                if (displayName && displayName.length >= 2 && firstCharCode === displayName.charCodeAt(displayName.length - 1) && (firstCharCode === ts.CharacterCodes.singleQuote || firstCharCode === ts.CharacterCodes.doubleQuote)) {
                    // If the user entered name for the symbol was quoted, removing the quotes is not enough, as the name could be an
                    // invalid identifier name. We need to check if whatever was inside the quotes is actually a valid identifier name.
                    displayName = displayName.substring(1, displayName.length - 1);
                }
                var isValid = ts.isIdentifierStart(displayName.charCodeAt(0), target);
                for (var i = 1, n = displayName.length; isValid && i < n; i++) {
                    isValid = ts.isIdentifierPart(displayName.charCodeAt(i), target);
                }
                if (isValid) {
                    return ts.unescapeIdentifier(displayName);
                }
            }
            return undefined;
        }
        function createCompletionEntry(symbol, typeChecker, location) {
            // Try to get a valid display name for this symbol, if we could not find one, then ignore it. 
            // We would like to only show things that can be added after a dot, so for instance numeric properties can
            // not be accessed with a dot (a.1 <- invalid)
            var displayName = getValidCompletionEntryDisplayName(symbol, program.getCompilerOptions().target);
            if (!displayName) {
                return undefined;
            }
            // TODO(drosen): Right now we just permit *all* semantic meanings when calling 'getSymbolKind'
            //               which is permissible given that it is backwards compatible; but really we should consider
            //               passing the meaning for the node so that we don't report that a suggestion for a value is an interface.
            //               We COULD also just do what 'getSymbolModifiers' does, which is to use the first declaration.
            return {
                name: displayName,
                kind: getSymbolKind(symbol, typeChecker, location),
                kindModifiers: getSymbolModifiers(symbol)
            };
        }
        function getCompletionsAtPosition(filename, position) {
            synchronizeHostData();
            filename = ts.normalizeSlashes(filename);
            var syntacticStart = new Date().getTime();
            var sourceFile = getSourceFile(filename);
            var start = new Date().getTime();
            var currentToken = ts.getTokenAtPosition(sourceFile, position);
            log("getCompletionsAtPosition: Get current token: " + (new Date().getTime() - start));
            var start = new Date().getTime();
            // Completion not allowed inside comments, bail out if this is the case
            var insideComment = isInsideComment(sourceFile, currentToken, position);
            log("getCompletionsAtPosition: Is inside comment: " + (new Date().getTime() - start));
            if (insideComment) {
                log("Returning an empty list because completion was inside a comment.");
                return undefined;
            }
            // The decision to provide completion depends on the previous token, so find it
            // Note: previousToken can be undefined if we are the beginning of the file
            var start = new Date().getTime();
            var previousToken = ts.findPrecedingToken(position, sourceFile);
            log("getCompletionsAtPosition: Get previous token 1: " + (new Date().getTime() - start));
            // The caret is at the end of an identifier; this is a partial identifier that we want to complete: e.g. a.toS|
            // Skip this partial identifier to the previous token
            if (previousToken && position <= previousToken.end && previousToken.kind === ts.SyntaxKind.Identifier) {
                var start = new Date().getTime();
                previousToken = ts.findPrecedingToken(previousToken.pos, sourceFile);
                log("getCompletionsAtPosition: Get previous token 2: " + (new Date().getTime() - start));
            }
            // Check if this is a valid completion location
            if (previousToken && isCompletionListBlocker(previousToken)) {
                log("Returning an empty list because completion was requested in an invalid position.");
                return undefined;
            }
            // Find the node where completion is requested on, in the case of a completion after a dot, it is the member access expression
            // other wise, it is a request for all visible symbols in the scope, and the node is the current location
            var node;
            var isRightOfDot;
            if (previousToken && previousToken.kind === ts.SyntaxKind.DotToken && previousToken.parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
                node = previousToken.parent.expression;
                isRightOfDot = true;
            }
            else if (previousToken && previousToken.kind === ts.SyntaxKind.DotToken && previousToken.parent.kind === ts.SyntaxKind.QualifiedName) {
                node = previousToken.parent.left;
                isRightOfDot = true;
            }
            else {
                node = currentToken;
                isRightOfDot = false;
            }
            // Clear the current activeCompletionSession for this session
            activeCompletionSession = {
                filename: filename,
                position: position,
                entries: [],
                symbols: {},
                typeChecker: typeInfoResolver
            };
            log("getCompletionsAtPosition: Syntactic work: " + (new Date().getTime() - syntacticStart));
            var location = ts.getTouchingPropertyName(sourceFile, position);
            // Populate the completion list
            var semanticStart = new Date().getTime();
            if (isRightOfDot) {
                // Right of dot member completion list
                var symbols = [];
                var isMemberCompletion = true;
                if (node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.QualifiedName || node.kind === ts.SyntaxKind.PropertyAccessExpression) {
                    var symbol = typeInfoResolver.getSymbolAtLocation(node);
                    // This is an alias, follow what it aliases
                    if (symbol && symbol.flags & ts.SymbolFlags.Import) {
                        symbol = typeInfoResolver.getAliasedSymbol(symbol);
                    }
                    if (symbol && symbol.flags & ts.SymbolFlags.HasExports) {
                        // Extract module or enum members
                        ts.forEachValue(symbol.exports, function (symbol) {
                            if (typeInfoResolver.isValidPropertyAccess((node.parent), symbol.name)) {
                                symbols.push(symbol);
                            }
                        });
                    }
                }
                var type = typeInfoResolver.getTypeAtLocation(node);
                if (type) {
                    // Filter private properties
                    ts.forEach(type.getApparentProperties(), function (symbol) {
                        if (typeInfoResolver.isValidPropertyAccess((node.parent), symbol.name)) {
                            symbols.push(symbol);
                        }
                    });
                }
                getCompletionEntriesFromSymbols(symbols, activeCompletionSession);
            }
            else {
                var containingObjectLiteral = getContainingObjectLiteralApplicableForCompletion(previousToken);
                if (containingObjectLiteral) {
                    // Object literal expression, look up possible property names from contextual type
                    isMemberCompletion = true;
                    var contextualType = typeInfoResolver.getContextualType(containingObjectLiteral);
                    if (!contextualType) {
                        return undefined;
                    }
                    var contextualTypeMembers = typeInfoResolver.getPropertiesOfType(contextualType);
                    if (contextualTypeMembers && contextualTypeMembers.length > 0) {
                        // Add filtered items to the completion list
                        var filteredMembers = filterContextualMembersList(contextualTypeMembers, containingObjectLiteral.properties);
                        getCompletionEntriesFromSymbols(filteredMembers, activeCompletionSession);
                    }
                }
                else {
                    // Get scope members
                    isMemberCompletion = false;
                    /// TODO filter meaning based on the current context
                    var symbolMeanings = ts.SymbolFlags.Type | ts.SymbolFlags.Value | ts.SymbolFlags.Namespace | ts.SymbolFlags.Import;
                    var symbols = typeInfoResolver.getSymbolsInScope(node, symbolMeanings);
                    getCompletionEntriesFromSymbols(symbols, activeCompletionSession);
                }
            }
            // Add keywords if this is not a member completion list
            if (!isMemberCompletion) {
                Array.prototype.push.apply(activeCompletionSession.entries, keywordCompletions);
            }
            log("getCompletionsAtPosition: Semantic work: " + (new Date().getTime() - semanticStart));
            return {
                isMemberCompletion,
                entries: activeCompletionSession.entries
            };
            function getCompletionEntriesFromSymbols(symbols, session) {
                var start = new Date().getTime();
                ts.forEach(symbols, function (symbol) {
                    var entry = createCompletionEntry(symbol, session.typeChecker, location);
                    if (entry) {
                        var id = ts.escapeIdentifier(entry.name);
                        if (!ts.lookUp(session.symbols, id)) {
                            session.entries.push(entry);
                            session.symbols[id] = symbol;
                        }
                    }
                });
                log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (new Date().getTime() - start));
            }
            function isCompletionListBlocker(previousToken) {
                var start = new Date().getTime();
                var result = isInStringOrRegularExpressionOrTemplateLiteral(previousToken) || isIdentifierDefinitionLocation(previousToken) || isRightOfIllegalDot(previousToken);
                log("getCompletionsAtPosition: isCompletionListBlocker: " + (new Date().getTime() - start));
                return result;
            }
            function isInStringOrRegularExpressionOrTemplateLiteral(previousToken) {
                if (previousToken.kind === ts.SyntaxKind.StringLiteral || previousToken.kind === ts.SyntaxKind.RegularExpressionLiteral || ts.isTemplateLiteralKind(previousToken.kind)) {
                    // The position has to be either: 1. entirely within the token text, or 
                    // 2. at the end position of an unterminated token.
                    var start = previousToken.getStart();
                    var end = previousToken.getEnd();
                    if (start < position && position < end) {
                        return true;
                    }
                    else if (position === end) {
                        return !!previousToken.isUnterminated;
                    }
                }
                return false;
            }
            function getContainingObjectLiteralApplicableForCompletion(previousToken) {
                // The locations in an object literal expression that are applicable for completion are property name definition locations.
                if (previousToken) {
                    var parent = previousToken.parent;
                    switch (previousToken.kind) {
                        case ts.SyntaxKind.OpenBraceToken:
                        case ts.SyntaxKind.CommaToken:
                            if (parent && parent.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                                return parent;
                            }
                            break;
                    }
                }
                return undefined;
            }
            function isFunction(kind) {
                switch (kind) {
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.ArrowFunction:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                    case ts.SyntaxKind.CallSignature:
                    case ts.SyntaxKind.ConstructSignature:
                    case ts.SyntaxKind.IndexSignature:
                        return true;
                }
                return false;
            }
            function isIdentifierDefinitionLocation(previousToken) {
                if (previousToken) {
                    var containingNodeKind = previousToken.parent.kind;
                    switch (previousToken.kind) {
                        case ts.SyntaxKind.CommaToken:
                            return containingNodeKind === ts.SyntaxKind.VariableDeclaration || containingNodeKind === ts.SyntaxKind.VariableDeclarationList || containingNodeKind === ts.SyntaxKind.VariableStatement || containingNodeKind === ts.SyntaxKind.EnumDeclaration || isFunction(containingNodeKind);
                        case ts.SyntaxKind.OpenParenToken:
                            return containingNodeKind === ts.SyntaxKind.CatchClause || isFunction(containingNodeKind);
                        case ts.SyntaxKind.OpenBraceToken:
                            return containingNodeKind === ts.SyntaxKind.EnumDeclaration || containingNodeKind === ts.SyntaxKind.InterfaceDeclaration;
                        case ts.SyntaxKind.SemicolonToken:
                            return containingNodeKind === ts.SyntaxKind.PropertySignature && previousToken.parent.parent.kind === ts.SyntaxKind.InterfaceDeclaration;
                        case ts.SyntaxKind.PublicKeyword:
                        case ts.SyntaxKind.PrivateKeyword:
                        case ts.SyntaxKind.StaticKeyword:
                        case ts.SyntaxKind.DotDotDotToken:
                            return containingNodeKind === ts.SyntaxKind.Parameter;
                        case ts.SyntaxKind.ClassKeyword:
                        case ts.SyntaxKind.ModuleKeyword:
                        case ts.SyntaxKind.EnumKeyword:
                        case ts.SyntaxKind.InterfaceKeyword:
                        case ts.SyntaxKind.FunctionKeyword:
                        case ts.SyntaxKind.VarKeyword:
                        case ts.SyntaxKind.GetKeyword:
                        case ts.SyntaxKind.SetKeyword:
                        case ts.SyntaxKind.ImportKeyword:
                            return true;
                    }
                    switch (previousToken.getText()) {
                        case "class":
                        case "interface":
                        case "enum":
                        case "module":
                        case "function":
                        case "var":
                            // TODO: add let and const
                            return true;
                    }
                }
                return false;
            }
            function isRightOfIllegalDot(previousToken) {
                if (previousToken && previousToken.kind === ts.SyntaxKind.NumericLiteral) {
                    var text = previousToken.getFullText();
                    return text.charAt(text.length - 1) === ".";
                }
                return false;
            }
            function filterContextualMembersList(contextualMemberSymbols, existingMembers) {
                if (!existingMembers || existingMembers.length === 0) {
                    return contextualMemberSymbols;
                }
                var existingMemberNames = {};
                ts.forEach(existingMembers, function (m) {
                    if (m.kind !== ts.SyntaxKind.PropertyAssignment && m.kind !== ts.SyntaxKind.ShorthandPropertyAssignment) {
                        // Ignore omitted expressions for missing members in the object literal
                        return;
                    }
                    if (m.getStart() <= position && position <= m.getEnd()) {
                        // If this is the current item we are editing right now, do not filter it out
                        return;
                    }
                    // TODO(jfreeman): Account for computed property name
                    existingMemberNames[m.name.text] = true;
                });
                var filteredMembers = [];
                ts.forEach(contextualMemberSymbols, function (s) {
                    if (!existingMemberNames[s.name]) {
                        filteredMembers.push(s);
                    }
                });
                return filteredMembers;
            }
        }
        function getCompletionEntryDetails(filename, position, entryName) {
            // Note: No need to call synchronizeHostData, as we have captured all the data we need
            //       in the getCompletionsAtPosition earlier
            filename = ts.normalizeSlashes(filename);
            var sourceFile = getSourceFile(filename);
            var session = activeCompletionSession;
            // Ensure that the current active completion session is still valid for this request
            if (!session || session.filename !== filename || session.position !== position) {
                return undefined;
            }
            var symbol = ts.lookUp(activeCompletionSession.symbols, ts.escapeIdentifier(entryName));
            if (symbol) {
                var location = ts.getTouchingPropertyName(sourceFile, position);
                var completionEntry = createCompletionEntry(symbol, session.typeChecker, location);
                // TODO(drosen): Right now we just permit *all* semantic meanings when calling 'getSymbolKind'
                //               which is permissible given that it is backwards compatible; but really we should consider
                //               passing the meaning for the node so that we don't report that a suggestion for a value is an interface.
                //               We COULD also just do what 'getSymbolModifiers' does, which is to use the first declaration.
                ts.Debug.assert(session.typeChecker.getTypeOfSymbolAtLocation(symbol, location) !== undefined, "Could not find type for symbol");
                var displayPartsDocumentationsAndSymbolKind = getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, getSourceFile(filename), location, session.typeChecker, location, 7 /* All */);
                return {
                    name: entryName,
                    kind: displayPartsDocumentationsAndSymbolKind.symbolKind,
                    kindModifiers: completionEntry.kindModifiers,
                    displayParts: displayPartsDocumentationsAndSymbolKind.displayParts,
                    documentation: displayPartsDocumentationsAndSymbolKind.documentation
                };
            }
            else {
                // No symbol, it is a keyword
                return {
                    name: entryName,
                    kind: ScriptElementKind.keyword,
                    kindModifiers: ScriptElementKindModifier.none,
                    displayParts: [ts.displayPart(entryName, 5 /* keyword */)],
                    documentation: undefined
                };
            }
        }
        function getContainerNode(node) {
            while (true) {
                node = node.parent;
                if (!node) {
                    return undefined;
                }
                switch (node.kind) {
                    case ts.SyntaxKind.SourceFile:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.InterfaceDeclaration:
                    case ts.SyntaxKind.EnumDeclaration:
                    case ts.SyntaxKind.ModuleDeclaration:
                        return node;
                }
            }
        }
        // TODO(drosen): use contextual SemanticMeaning.
        function getSymbolKind(symbol, typeResolver, location) {
            var flags = symbol.getFlags();
            if (flags & ts.SymbolFlags.Class)
                return ScriptElementKind.classElement;
            if (flags & ts.SymbolFlags.Enum)
                return ScriptElementKind.enumElement;
            if (flags & ts.SymbolFlags.TypeAlias)
                return ScriptElementKind.typeElement;
            if (flags & ts.SymbolFlags.Interface)
                return ScriptElementKind.interfaceElement;
            if (flags & ts.SymbolFlags.TypeParameter)
                return ScriptElementKind.typeParameterElement;
            var result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, flags, typeResolver, location);
            if (result === ScriptElementKind.unknown) {
                if (flags & ts.SymbolFlags.TypeParameter)
                    return ScriptElementKind.typeParameterElement;
                if (flags & ts.SymbolFlags.EnumMember)
                    return ScriptElementKind.variableElement;
                if (flags & ts.SymbolFlags.Import)
                    return ScriptElementKind.alias;
                if (flags & ts.SymbolFlags.Module)
                    return ScriptElementKind.moduleElement;
            }
            return result;
        }
        function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, flags, typeResolver, location) {
            if (typeResolver.isUndefinedSymbol(symbol)) {
                return ScriptElementKind.variableElement;
            }
            if (typeResolver.isArgumentsSymbol(symbol)) {
                return ScriptElementKind.localVariableElement;
            }
            if (flags & ts.SymbolFlags.Variable) {
                if (ts.isFirstDeclarationOfSymbolParameter(symbol)) {
                    return ScriptElementKind.parameterElement;
                }
                else if (symbol.valueDeclaration && ts.isConst(symbol.valueDeclaration)) {
                    return ScriptElementKind.constElement;
                }
                else if (ts.forEach(symbol.declarations, ts.isLet)) {
                    return ScriptElementKind.letElement;
                }
                return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localVariableElement : ScriptElementKind.variableElement;
            }
            if (flags & ts.SymbolFlags.Function)
                return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
            if (flags & ts.SymbolFlags.GetAccessor)
                return ScriptElementKind.memberGetAccessorElement;
            if (flags & ts.SymbolFlags.SetAccessor)
                return ScriptElementKind.memberSetAccessorElement;
            if (flags & ts.SymbolFlags.Method)
                return ScriptElementKind.memberFunctionElement;
            if (flags & ts.SymbolFlags.Constructor)
                return ScriptElementKind.constructorImplementationElement;
            if (flags & ts.SymbolFlags.Property) {
                if (flags & ts.SymbolFlags.UnionProperty) {
                    // If union property is result of union of non method (property/accessors/variables), it is labeled as property
                    var unionPropertyKind = ts.forEach(typeInfoResolver.getRootSymbols(symbol), function (rootSymbol) {
                        var rootSymbolFlags = rootSymbol.getFlags();
                        if (rootSymbolFlags & (ts.SymbolFlags.PropertyOrAccessor | ts.SymbolFlags.Variable)) {
                            return ScriptElementKind.memberVariableElement;
                        }
                        ts.Debug.assert(!!(rootSymbolFlags & ts.SymbolFlags.Method));
                    });
                    if (!unionPropertyKind) {
                        // If this was union of all methods, 
                        //make sure it has call signatures before we can label it as method
                        var typeOfUnionProperty = typeInfoResolver.getTypeOfSymbolAtLocation(symbol, location);
                        if (typeOfUnionProperty.getCallSignatures().length) {
                            return ScriptElementKind.memberFunctionElement;
                        }
                        return ScriptElementKind.memberVariableElement;
                    }
                    return unionPropertyKind;
                }
                return ScriptElementKind.memberVariableElement;
            }
            return ScriptElementKind.unknown;
        }
        function getTypeKind(type) {
            var flags = type.getFlags();
            if (flags & ts.TypeFlags.Enum)
                return ScriptElementKind.enumElement;
            if (flags & ts.TypeFlags.Class)
                return ScriptElementKind.classElement;
            if (flags & ts.TypeFlags.Interface)
                return ScriptElementKind.interfaceElement;
            if (flags & ts.TypeFlags.TypeParameter)
                return ScriptElementKind.typeParameterElement;
            if (flags & ts.TypeFlags.Intrinsic)
                return ScriptElementKind.primitiveType;
            if (flags & ts.TypeFlags.StringLiteral)
                return ScriptElementKind.primitiveType;
            return ScriptElementKind.unknown;
        }
        function getNodeKind(node) {
            switch (node.kind) {
                case ts.SyntaxKind.ModuleDeclaration: return ScriptElementKind.moduleElement;
                case ts.SyntaxKind.ClassDeclaration: return ScriptElementKind.classElement;
                case ts.SyntaxKind.InterfaceDeclaration: return ScriptElementKind.interfaceElement;
                case ts.SyntaxKind.TypeAliasDeclaration: return ScriptElementKind.typeElement;
                case ts.SyntaxKind.EnumDeclaration: return ScriptElementKind.enumElement;
                case ts.SyntaxKind.VariableDeclaration:
                    return ts.isConst(node) ? ScriptElementKind.constElement : ts.isLet(node) ? ScriptElementKind.letElement : ScriptElementKind.variableElement;
                case ts.SyntaxKind.FunctionDeclaration: return ScriptElementKind.functionElement;
                case ts.SyntaxKind.GetAccessor: return ScriptElementKind.memberGetAccessorElement;
                case ts.SyntaxKind.SetAccessor: return ScriptElementKind.memberSetAccessorElement;
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                    return ScriptElementKind.memberFunctionElement;
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                    return ScriptElementKind.memberVariableElement;
                case ts.SyntaxKind.IndexSignature: return ScriptElementKind.indexSignatureElement;
                case ts.SyntaxKind.ConstructSignature: return ScriptElementKind.constructSignatureElement;
                case ts.SyntaxKind.CallSignature: return ScriptElementKind.callSignatureElement;
                case ts.SyntaxKind.Constructor: return ScriptElementKind.constructorImplementationElement;
                case ts.SyntaxKind.TypeParameter: return ScriptElementKind.typeParameterElement;
                case ts.SyntaxKind.EnumMember: return ScriptElementKind.variableElement;
                case ts.SyntaxKind.Parameter: return (node.flags & ts.NodeFlags.AccessibilityModifier) ? ScriptElementKind.memberVariableElement : ScriptElementKind.parameterElement;
            }
            return ScriptElementKind.unknown;
        }
        function getSymbolModifiers(symbol) {
            return symbol && symbol.declarations && symbol.declarations.length > 0 ? ts.getNodeModifiers(symbol.declarations[0]) : ScriptElementKindModifier.none;
        }
        function getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, sourceFile, enclosingDeclaration, typeResolver, location, 
            // TODO(drosen): Currently completion entry details passes the SemanticMeaning.All instead of using semanticMeaning of location
            semanticMeaning = getMeaningFromLocation(location)) {
            var displayParts = [];
            var documentation;
            var symbolFlags = symbol.flags;
            var symbolKind = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, symbolFlags, typeResolver, location);
            var hasAddedSymbolInfo;
            // Class at constructor site need to be shown as constructor apart from property,method, vars
            if (symbolKind !== ScriptElementKind.unknown || symbolFlags & ts.SymbolFlags.Class || symbolFlags & ts.SymbolFlags.Import) {
                // If it is accessor they are allowed only if location is at name of the accessor
                if (symbolKind === ScriptElementKind.memberGetAccessorElement || symbolKind === ScriptElementKind.memberSetAccessorElement) {
                    symbolKind = ScriptElementKind.memberVariableElement;
                }
                var type = typeResolver.getTypeOfSymbolAtLocation(symbol, location);
                if (type) {
                    if (location.parent && location.parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
                        var right = location.parent.name;
                        // Either the location is on the right of a property access, or on the left and the right is missing
                        if (right === location || (right && right.getFullWidth() === 0)) {
                            location = location.parent;
                        }
                    }
                    // try get the call/construct signature from the type if it matches
                    var callExpression;
                    if (location.kind === ts.SyntaxKind.CallExpression || location.kind === ts.SyntaxKind.NewExpression) {
                        callExpression = location;
                    }
                    else if (isCallExpressionTarget(location) || isNewExpressionTarget(location)) {
                        callExpression = location.parent;
                    }
                    if (callExpression) {
                        var candidateSignatures = [];
                        signature = typeResolver.getResolvedSignature(callExpression, candidateSignatures);
                        if (!signature && candidateSignatures.length) {
                            // Use the first candidate:
                            signature = candidateSignatures[0];
                        }
                        var useConstructSignatures = callExpression.kind === ts.SyntaxKind.NewExpression || callExpression.expression.kind === ts.SyntaxKind.SuperKeyword;
                        var allSignatures = useConstructSignatures ? type.getConstructSignatures() : type.getCallSignatures();
                        if (!ts.contains(allSignatures, signature.target || signature)) {
                            // Get the first signature if there 
                            signature = allSignatures.length ? allSignatures[0] : undefined;
                        }
                        if (signature) {
                            if (useConstructSignatures && (symbolFlags & ts.SymbolFlags.Class)) {
                                // Constructor
                                symbolKind = ScriptElementKind.constructorImplementationElement;
                                addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                            }
                            else if (symbolFlags & ts.SymbolFlags.Import) {
                                symbolKind = ScriptElementKind.alias;
                                displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                                displayParts.push(ts.textPart(symbolKind));
                                displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                                displayParts.push(ts.spacePart());
                                if (useConstructSignatures) {
                                    displayParts.push(ts.keywordPart(ts.SyntaxKind.NewKeyword));
                                    displayParts.push(ts.spacePart());
                                }
                                addFullSymbolName(symbol);
                            }
                            else {
                                addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                            }
                            switch (symbolKind) {
                                case ScriptElementKind.memberVariableElement:
                                case ScriptElementKind.variableElement:
                                case ScriptElementKind.constElement:
                                case ScriptElementKind.letElement:
                                case ScriptElementKind.parameterElement:
                                case ScriptElementKind.localVariableElement:
                                    // If it is call or construct signature of lambda's write type name
                                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.ColonToken));
                                    displayParts.push(ts.spacePart());
                                    if (useConstructSignatures) {
                                        displayParts.push(ts.keywordPart(ts.SyntaxKind.NewKeyword));
                                        displayParts.push(ts.spacePart());
                                    }
                                    if (!(type.flags & ts.TypeFlags.Anonymous)) {
                                        displayParts.push.apply(displayParts, ts.symbolToDisplayParts(typeResolver, type.symbol, enclosingDeclaration, undefined, ts.SymbolFormatFlags.WriteTypeParametersOrArguments));
                                    }
                                    addSignatureDisplayParts(signature, allSignatures, ts.TypeFormatFlags.WriteArrowStyleSignature);
                                    break;
                                default:
                                    // Just signature
                                    addSignatureDisplayParts(signature, allSignatures);
                            }
                            hasAddedSymbolInfo = true;
                        }
                    }
                    else if ((isNameOfFunctionDeclaration(location) && !(symbol.flags & ts.SymbolFlags.Accessor)) || (location.kind === ts.SyntaxKind.ConstructorKeyword && location.parent.kind === ts.SyntaxKind.Constructor)) {
                        // get the signature from the declaration and write it
                        var signature;
                        var functionDeclaration = location.parent;
                        var allSignatures = functionDeclaration.kind === ts.SyntaxKind.Constructor ? type.getConstructSignatures() : type.getCallSignatures();
                        if (!typeResolver.isImplementationOfOverload(functionDeclaration)) {
                            signature = typeResolver.getSignatureFromDeclaration(functionDeclaration);
                        }
                        else {
                            signature = allSignatures[0];
                        }
                        if (functionDeclaration.kind === ts.SyntaxKind.Constructor) {
                            // show (constructor) Type(...) signature
                            symbolKind = ScriptElementKind.constructorImplementationElement;
                            addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                        }
                        else {
                            // (function/method) symbol(..signature)
                            addPrefixForAnyFunctionOrVar(functionDeclaration.kind === ts.SyntaxKind.CallSignature && !(type.symbol.flags & ts.SymbolFlags.TypeLiteral || type.symbol.flags & ts.SymbolFlags.ObjectLiteral) ? type.symbol : symbol, symbolKind);
                        }
                        addSignatureDisplayParts(signature, allSignatures);
                        hasAddedSymbolInfo = true;
                    }
                }
            }
            if (symbolFlags & ts.SymbolFlags.Class && !hasAddedSymbolInfo) {
                displayParts.push(ts.keywordPart(ts.SyntaxKind.ClassKeyword));
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
                writeTypeParametersOfSymbol(symbol, sourceFile);
            }
            if ((symbolFlags & ts.SymbolFlags.Interface) && (semanticMeaning & 2 /* Type */)) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(ts.keywordPart(ts.SyntaxKind.InterfaceKeyword));
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
                writeTypeParametersOfSymbol(symbol, sourceFile);
            }
            if (symbolFlags & ts.SymbolFlags.TypeAlias) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(ts.keywordPart(ts.SyntaxKind.TypeKeyword));
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
                displayParts.push(ts.spacePart());
                displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
                displayParts.push(ts.spacePart());
                displayParts.push.apply(displayParts, ts.typeToDisplayParts(typeResolver, typeResolver.getDeclaredTypeOfSymbol(symbol), enclosingDeclaration));
            }
            if (symbolFlags & ts.SymbolFlags.Enum) {
                addNewLineIfDisplayPartsExist();
                if (ts.forEach(symbol.declarations, ts.isConstEnumDeclaration)) {
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.ConstKeyword));
                    displayParts.push(ts.spacePart());
                }
                displayParts.push(ts.keywordPart(ts.SyntaxKind.EnumKeyword));
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
            }
            if (symbolFlags & ts.SymbolFlags.Module) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(ts.keywordPart(ts.SyntaxKind.ModuleKeyword));
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
            }
            if ((symbolFlags & ts.SymbolFlags.TypeParameter) && (semanticMeaning & 2 /* Type */)) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                displayParts.push(ts.textPart("type parameter"));
                displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
                displayParts.push(ts.spacePart());
                displayParts.push(ts.keywordPart(ts.SyntaxKind.InKeyword));
                displayParts.push(ts.spacePart());
                if (symbol.parent) {
                    // Class/Interface type parameter
                    addFullSymbolName(symbol.parent, enclosingDeclaration);
                    writeTypeParametersOfSymbol(symbol.parent, enclosingDeclaration);
                }
                else {
                    // Method/function type parameter
                    var signatureDeclaration = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.TypeParameter).parent;
                    var signature = typeResolver.getSignatureFromDeclaration(signatureDeclaration);
                    if (signatureDeclaration.kind === ts.SyntaxKind.ConstructSignature) {
                        displayParts.push(ts.keywordPart(ts.SyntaxKind.NewKeyword));
                        displayParts.push(ts.spacePart());
                    }
                    else if (signatureDeclaration.kind !== ts.SyntaxKind.CallSignature && signatureDeclaration.name) {
                        addFullSymbolName(signatureDeclaration.symbol);
                    }
                    displayParts.push.apply(displayParts, ts.signatureToDisplayParts(typeResolver, signature, sourceFile, ts.TypeFormatFlags.WriteTypeArgumentsOfSignature));
                }
            }
            if (symbolFlags & ts.SymbolFlags.EnumMember) {
                addPrefixForAnyFunctionOrVar(symbol, "enum member");
                var declaration = symbol.declarations[0];
                if (declaration.kind === ts.SyntaxKind.EnumMember) {
                    var constantValue = typeResolver.getEnumMemberValue(declaration);
                    if (constantValue !== undefined) {
                        displayParts.push(ts.spacePart());
                        displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
                        displayParts.push(ts.spacePart());
                        displayParts.push(ts.displayPart(constantValue.toString(), 7 /* numericLiteral */));
                    }
                }
            }
            if (symbolFlags & ts.SymbolFlags.Import) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(ts.keywordPart(ts.SyntaxKind.ImportKeyword));
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
                ts.forEach(symbol.declarations, function (declaration) {
                    if (declaration.kind === ts.SyntaxKind.ImportDeclaration) {
                        var importDeclaration = declaration;
                        if (ts.isExternalModuleImportDeclaration(importDeclaration)) {
                            displayParts.push(ts.spacePart());
                            displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
                            displayParts.push(ts.spacePart());
                            displayParts.push(ts.keywordPart(ts.SyntaxKind.RequireKeyword));
                            displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                            displayParts.push(ts.displayPart(ts.getTextOfNode(ts.getExternalModuleImportDeclarationExpression(importDeclaration)), 8 /* stringLiteral */));
                            displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                        }
                        else {
                            var internalAliasSymbol = typeResolver.getSymbolAtLocation(importDeclaration.moduleReference);
                            if (internalAliasSymbol) {
                                displayParts.push(ts.spacePart());
                                displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
                                displayParts.push(ts.spacePart());
                                addFullSymbolName(internalAliasSymbol, enclosingDeclaration);
                            }
                        }
                        return true;
                    }
                });
            }
            if (!hasAddedSymbolInfo) {
                if (symbolKind !== ScriptElementKind.unknown) {
                    if (type) {
                        addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                        // For properties, variables and local vars: show the type
                        if (symbolKind === ScriptElementKind.memberVariableElement || symbolFlags & ts.SymbolFlags.Variable || symbolKind === ScriptElementKind.localVariableElement) {
                            displayParts.push(ts.punctuationPart(ts.SyntaxKind.ColonToken));
                            displayParts.push(ts.spacePart());
                            // If the type is type parameter, format it specially
                            if (type.symbol && type.symbol.flags & ts.SymbolFlags.TypeParameter) {
                                var typeParameterParts = ts.mapToDisplayParts(function (writer) {
                                    typeResolver.getSymbolDisplayBuilder().buildTypeParameterDisplay(type, writer, enclosingDeclaration);
                                });
                                displayParts.push.apply(displayParts, typeParameterParts);
                            }
                            else {
                                displayParts.push.apply(displayParts, ts.typeToDisplayParts(typeResolver, type, enclosingDeclaration));
                            }
                        }
                        else if (symbolFlags & ts.SymbolFlags.Function || symbolFlags & ts.SymbolFlags.Method || symbolFlags & ts.SymbolFlags.Constructor || symbolFlags & ts.SymbolFlags.Signature || symbolFlags & ts.SymbolFlags.Accessor || symbolKind === ScriptElementKind.memberFunctionElement) {
                            var allSignatures = type.getCallSignatures();
                            addSignatureDisplayParts(allSignatures[0], allSignatures);
                        }
                    }
                }
                else {
                    symbolKind = getSymbolKind(symbol, typeResolver, location);
                }
            }
            if (!documentation) {
                documentation = symbol.getDocumentationComment();
            }
            return { displayParts, documentation, symbolKind };
            function addNewLineIfDisplayPartsExist() {
                if (displayParts.length) {
                    displayParts.push(ts.lineBreakPart());
                }
            }
            function addFullSymbolName(symbol, enclosingDeclaration) {
                var fullSymbolDisplayParts = ts.symbolToDisplayParts(typeResolver, symbol, enclosingDeclaration || sourceFile, undefined, ts.SymbolFormatFlags.WriteTypeParametersOrArguments | ts.SymbolFormatFlags.UseOnlyExternalAliasing);
                displayParts.push.apply(displayParts, fullSymbolDisplayParts);
            }
            function addPrefixForAnyFunctionOrVar(symbol, symbolKind) {
                addNewLineIfDisplayPartsExist();
                if (symbolKind) {
                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                    displayParts.push(ts.textPart(symbolKind));
                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                    displayParts.push(ts.spacePart());
                    addFullSymbolName(symbol);
                }
            }
            function addSignatureDisplayParts(signature, allSignatures, flags) {
                displayParts.push.apply(displayParts, ts.signatureToDisplayParts(typeResolver, signature, enclosingDeclaration, flags | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature));
                if (allSignatures.length > 1) {
                    displayParts.push(ts.spacePart());
                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                    displayParts.push(ts.operatorPart(ts.SyntaxKind.PlusToken));
                    displayParts.push(ts.displayPart((allSignatures.length - 1).toString(), 7 /* numericLiteral */));
                    displayParts.push(ts.spacePart());
                    displayParts.push(ts.textPart(allSignatures.length === 2 ? "overload" : "overloads"));
                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                }
                documentation = signature.getDocumentationComment();
            }
            function writeTypeParametersOfSymbol(symbol, enclosingDeclaration) {
                var typeParameterParts = ts.mapToDisplayParts(function (writer) {
                    typeResolver.getSymbolDisplayBuilder().buildTypeParameterDisplayFromSymbol(symbol, writer, enclosingDeclaration);
                });
                displayParts.push.apply(displayParts, typeParameterParts);
            }
        }
        function getQuickInfoAtPosition(fileName, position) {
            synchronizeHostData();
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getSourceFile(fileName);
            var node = ts.getTouchingPropertyName(sourceFile, position);
            if (!node) {
                return undefined;
            }
            var symbol = typeInfoResolver.getSymbolAtLocation(node);
            if (!symbol) {
                switch (node.kind) {
                    case ts.SyntaxKind.Identifier:
                    case ts.SyntaxKind.PropertyAccessExpression:
                    case ts.SyntaxKind.QualifiedName:
                    case ts.SyntaxKind.ThisKeyword:
                    case ts.SyntaxKind.SuperKeyword:
                        // For the identifiers/this/super etc get the type at position
                        var type = typeInfoResolver.getTypeAtLocation(node);
                        if (type) {
                            return {
                                kind: ScriptElementKind.unknown,
                                kindModifiers: ScriptElementKindModifier.none,
                                textSpan: ts.createTextSpan(node.getStart(), node.getWidth()),
                                displayParts: ts.typeToDisplayParts(typeInfoResolver, type, getContainerNode(node)),
                                documentation: type.symbol ? type.symbol.getDocumentationComment() : undefined
                            };
                        }
                }
                return undefined;
            }
            var displayPartsDocumentationsAndKind = getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, sourceFile, getContainerNode(node), typeInfoResolver, node);
            return {
                kind: displayPartsDocumentationsAndKind.symbolKind,
                kindModifiers: getSymbolModifiers(symbol),
                textSpan: ts.createTextSpan(node.getStart(), node.getWidth()),
                displayParts: displayPartsDocumentationsAndKind.displayParts,
                documentation: displayPartsDocumentationsAndKind.documentation
            };
        }
        /// Goto definition
        function getDefinitionAtPosition(filename, position) {
            synchronizeHostData();
            filename = ts.normalizeSlashes(filename);
            var sourceFile = getSourceFile(filename);
            var node = ts.getTouchingPropertyName(sourceFile, position);
            if (!node) {
                return undefined;
            }
            // Labels
            if (isJumpStatementTarget(node)) {
                var labelName = node.text;
                var label = getTargetLabel(node.parent, node.text);
                return label ? [getDefinitionInfo(label, ScriptElementKind.label, labelName, undefined)] : undefined;
            }
            /// Triple slash reference comments
            var comment = ts.forEach(sourceFile.referencedFiles, function (r) { return (r.pos <= position && position < r.end) ? r : undefined; });
            if (comment) {
                var referenceFile = ts.tryResolveScriptReference(program, sourceFile, comment);
                if (referenceFile) {
                    return [{
                        fileName: referenceFile.filename,
                        textSpan: ts.createTextSpanFromBounds(0, 0),
                        kind: ScriptElementKind.scriptElement,
                        name: comment.filename,
                        containerName: undefined,
                        containerKind: undefined
                    }];
                }
                return undefined;
            }
            var symbol = typeInfoResolver.getSymbolAtLocation(node);
            // Could not find a symbol e.g. node is string or number keyword,
            // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
            if (!symbol) {
                return undefined;
            }
            var result = [];
            // Because name in short-hand property assignment has two different meanings: property name and property value,
            // using go-to-definition at such position should go to the variable declaration of the property value rather than
            // go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition 
            // is performed at the location of property access, we would like to go to definition of the property in the short-hand
            // assignment. This case and others are handled by the following code.
            if (node.parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                var shorthandSymbol = typeInfoResolver.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
                var shorthandDeclarations = shorthandSymbol.getDeclarations();
                var shorthandSymbolKind = getSymbolKind(shorthandSymbol, typeInfoResolver, node);
                var shorthandSymbolName = typeInfoResolver.symbolToString(shorthandSymbol);
                var shorthandContainerName = typeInfoResolver.symbolToString(symbol.parent, node);
                ts.forEach(shorthandDeclarations, function (declaration) {
                    result.push(getDefinitionInfo(declaration, shorthandSymbolKind, shorthandSymbolName, shorthandContainerName));
                });
                return result;
            }
            var declarations = symbol.getDeclarations();
            var symbolName = typeInfoResolver.symbolToString(symbol); // Do not get scoped name, just the name of the symbol
            var symbolKind = getSymbolKind(symbol, typeInfoResolver, node);
            var containerSymbol = symbol.parent;
            var containerName = containerSymbol ? typeInfoResolver.symbolToString(containerSymbol, node) : "";
            if (!tryAddConstructSignature(symbol, node, symbolKind, symbolName, containerName, result) && !tryAddCallSignature(symbol, node, symbolKind, symbolName, containerName, result)) {
                // Just add all the declarations. 
                ts.forEach(declarations, function (declaration) {
                    result.push(getDefinitionInfo(declaration, symbolKind, symbolName, containerName));
                });
            }
            return result;
            function getDefinitionInfo(node, symbolKind, symbolName, containerName) {
                return {
                    fileName: node.getSourceFile().filename,
                    textSpan: ts.createTextSpanFromBounds(node.getStart(), node.getEnd()),
                    kind: symbolKind,
                    name: symbolName,
                    containerKind: undefined,
                    containerName
                };
            }
            function tryAddSignature(signatureDeclarations, selectConstructors, symbolKind, symbolName, containerName, result) {
                var declarations = [];
                var definition;
                ts.forEach(signatureDeclarations, function (d) {
                    if ((selectConstructors && d.kind === ts.SyntaxKind.Constructor) || (!selectConstructors && (d.kind === ts.SyntaxKind.FunctionDeclaration || d.kind === ts.SyntaxKind.MethodDeclaration || d.kind === ts.SyntaxKind.MethodSignature))) {
                        declarations.push(d);
                        if (d.body)
                            definition = d;
                    }
                });
                if (definition) {
                    result.push(getDefinitionInfo(definition, symbolKind, symbolName, containerName));
                    return true;
                }
                else if (declarations.length) {
                    result.push(getDefinitionInfo(declarations[declarations.length - 1], symbolKind, symbolName, containerName));
                    return true;
                }
                return false;
            }
            function tryAddConstructSignature(symbol, location, symbolKind, symbolName, containerName, result) {
                // Applicable only if we are in a new expression, or we are on a constructor declaration
                // and in either case the symbol has a construct signature definition, i.e. class
                if (isNewExpressionTarget(location) || location.kind === ts.SyntaxKind.ConstructorKeyword) {
                    if (symbol.flags & ts.SymbolFlags.Class) {
                        var classDeclaration = symbol.getDeclarations()[0];
                        ts.Debug.assert(classDeclaration && classDeclaration.kind === ts.SyntaxKind.ClassDeclaration);
                        return tryAddSignature(classDeclaration.members, true, symbolKind, symbolName, containerName, result);
                    }
                }
                return false;
            }
            function tryAddCallSignature(symbol, location, symbolKind, symbolName, containerName, result) {
                if (isCallExpressionTarget(location) || isNewExpressionTarget(location) || isNameOfFunctionDeclaration(location)) {
                    return tryAddSignature(symbol.declarations, false, symbolKind, symbolName, containerName, result);
                }
                return false;
            }
        }
        /// References and Occurrences
        function getOccurrencesAtPosition(filename, position) {
            synchronizeHostData();
            filename = ts.normalizeSlashes(filename);
            var sourceFile = getSourceFile(filename);
            var node = ts.getTouchingWord(sourceFile, position);
            if (!node) {
                return undefined;
            }
            if (node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.ThisKeyword || node.kind === ts.SyntaxKind.SuperKeyword || isLiteralNameOfPropertyDeclarationOrIndexAccess(node) || isNameOfExternalModuleImportOrDeclaration(node)) {
                return getReferencesForNode(node, [sourceFile], false, false);
            }
            switch (node.kind) {
                case ts.SyntaxKind.IfKeyword:
                case ts.SyntaxKind.ElseKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.IfStatement)) {
                        return getIfElseOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.ReturnKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.ReturnStatement)) {
                        return getReturnOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.ThrowKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.ThrowStatement)) {
                        return getThrowOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.CatchKeyword:
                    if (hasKind(parent(parent(node)), ts.SyntaxKind.TryStatement)) {
                        return getTryCatchFinallyOccurrences(node.parent.parent);
                    }
                    break;
                case ts.SyntaxKind.TryKeyword:
                case ts.SyntaxKind.FinallyKeyword:
                    if (hasKind(parent(node), ts.SyntaxKind.TryStatement)) {
                        return getTryCatchFinallyOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.SwitchKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.SwitchStatement)) {
                        return getSwitchCaseDefaultOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.CaseKeyword:
                case ts.SyntaxKind.DefaultKeyword:
                    if (hasKind(parent(parent(node)), ts.SyntaxKind.SwitchStatement)) {
                        return getSwitchCaseDefaultOccurrences(node.parent.parent);
                    }
                    break;
                case ts.SyntaxKind.BreakKeyword:
                case ts.SyntaxKind.ContinueKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.BreakStatement) || hasKind(node.parent, ts.SyntaxKind.ContinueStatement)) {
                        return getBreakOrContinueStatementOccurences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.ForKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.ForStatement) || hasKind(node.parent, ts.SyntaxKind.ForInStatement)) {
                        return getLoopBreakContinueOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.WhileKeyword:
                case ts.SyntaxKind.DoKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.WhileStatement) || hasKind(node.parent, ts.SyntaxKind.DoStatement)) {
                        return getLoopBreakContinueOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.ConstructorKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.Constructor)) {
                        return getConstructorOccurrences(node.parent);
                    }
                    break;
                case ts.SyntaxKind.GetKeyword:
                case ts.SyntaxKind.SetKeyword:
                    if (hasKind(node.parent, ts.SyntaxKind.GetAccessor) || hasKind(node.parent, ts.SyntaxKind.SetAccessor)) {
                        return getGetAndSetOccurrences(node.parent);
                    }
                default:
                    if (ts.isModifier(node.kind) && node.parent && (ts.isDeclaration(node.parent) || node.parent.kind === ts.SyntaxKind.VariableStatement)) {
                        return getModifierOccurrences(node.kind, node.parent);
                    }
            }
            return undefined;
            function getIfElseOccurrences(ifStatement) {
                var keywords = [];
                while (hasKind(ifStatement.parent, ts.SyntaxKind.IfStatement) && ifStatement.parent.elseStatement === ifStatement) {
                    ifStatement = ifStatement.parent;
                }
                while (ifStatement) {
                    var children = ifStatement.getChildren();
                    pushKeywordIf(keywords, children[0], ts.SyntaxKind.IfKeyword);
                    for (var i = children.length - 1; i >= 0; i--) {
                        if (pushKeywordIf(keywords, children[i], ts.SyntaxKind.ElseKeyword)) {
                            break;
                        }
                    }
                    if (!hasKind(ifStatement.elseStatement, ts.SyntaxKind.IfStatement)) {
                        break;
                    }
                    ifStatement = ifStatement.elseStatement;
                }
                var result = [];
                for (var i = 0; i < keywords.length; i++) {
                    if (keywords[i].kind === ts.SyntaxKind.ElseKeyword && i < keywords.length - 1) {
                        var elseKeyword = keywords[i];
                        var ifKeyword = keywords[i + 1]; // this *should* always be an 'if' keyword.
                        var shouldHighlightNextKeyword = true;
                        for (var j = ifKeyword.getStart() - 1; j >= elseKeyword.end; j--) {
                            if (!ts.isWhiteSpace(sourceFile.text.charCodeAt(j))) {
                                shouldHighlightNextKeyword = false;
                                break;
                            }
                        }
                        if (shouldHighlightNextKeyword) {
                            result.push({
                                fileName: filename,
                                textSpan: ts.createTextSpanFromBounds(elseKeyword.getStart(), ifKeyword.end),
                                isWriteAccess: false
                            });
                            i++; // skip the next keyword
                            continue;
                        }
                    }
                    // Ordinary case: just highlight the keyword.
                    result.push(getReferenceEntryFromNode(keywords[i]));
                }
                return result;
            }
            function getReturnOccurrences(returnStatement) {
                var func = ts.getContainingFunction(returnStatement);
                // If we didn't find a containing function with a block body, bail out.
                if (!(func && hasKind(func.body, ts.SyntaxKind.Block))) {
                    return undefined;
                }
                var keywords = [];
                ts.forEachReturnStatement(func.body, function (returnStatement) {
                    pushKeywordIf(keywords, returnStatement.getFirstToken(), ts.SyntaxKind.ReturnKeyword);
                });
                // Include 'throw' statements that do not occur within a try block.
                ts.forEach(aggregateOwnedThrowStatements(func.body), function (throwStatement) {
                    pushKeywordIf(keywords, throwStatement.getFirstToken(), ts.SyntaxKind.ThrowKeyword);
                });
                return ts.map(keywords, getReferenceEntryFromNode);
            }
            function getThrowOccurrences(throwStatement) {
                var owner = getThrowStatementOwner(throwStatement);
                if (!owner) {
                    return undefined;
                }
                var keywords = [];
                ts.forEach(aggregateOwnedThrowStatements(owner), function (throwStatement) {
                    pushKeywordIf(keywords, throwStatement.getFirstToken(), ts.SyntaxKind.ThrowKeyword);
                });
                // If the "owner" is a function, then we equate 'return' and 'throw' statements in their
                // ability to "jump out" of the function, and include occurrences for both.
                if (ts.isFunctionBlock(owner)) {
                    ts.forEachReturnStatement(owner, function (returnStatement) {
                        pushKeywordIf(keywords, returnStatement.getFirstToken(), ts.SyntaxKind.ReturnKeyword);
                    });
                }
                return ts.map(keywords, getReferenceEntryFromNode);
            }
            /**
             * Aggregates all throw-statements within this node *without* crossing
             * into function boundaries and try-blocks with catch-clauses.
             */
            function aggregateOwnedThrowStatements(node) {
                var statementAccumulator = [];
                aggregate(node);
                return statementAccumulator;
                function aggregate(node) {
                    if (node.kind === ts.SyntaxKind.ThrowStatement) {
                        statementAccumulator.push(node);
                    }
                    else if (node.kind === ts.SyntaxKind.TryStatement) {
                        var tryStatement = node;
                        if (tryStatement.catchClause) {
                            aggregate(tryStatement.catchClause);
                        }
                        else {
                            // Exceptions thrown within a try block lacking a catch clause
                            // are "owned" in the current context.
                            aggregate(tryStatement.tryBlock);
                        }
                        if (tryStatement.finallyBlock) {
                            aggregate(tryStatement.finallyBlock);
                        }
                    }
                    else if (!ts.isAnyFunction(node)) {
                        ts.forEachChild(node, aggregate);
                    }
                }
                ;
            }
            /**
             * For lack of a better name, this function takes a throw statement and returns the
             * nearest ancestor that is a try-block (whose try statement has a catch clause),
             * function-block, or source file.
             */
            function getThrowStatementOwner(throwStatement) {
                var child = throwStatement;
                while (child.parent) {
                    var parent = child.parent;
                    if (ts.isFunctionBlock(parent) || parent.kind === ts.SyntaxKind.SourceFile) {
                        return parent;
                    }
                    // A throw-statement is only owned by a try-statement if the try-statement has
                    // a catch clause, and if the throw-statement occurs within the try block.
                    if (parent.kind === ts.SyntaxKind.TryStatement) {
                        var tryStatement = parent;
                        if (tryStatement.tryBlock === child && tryStatement.catchClause) {
                            return child;
                        }
                    }
                    child = parent;
                }
                return undefined;
            }
            function getTryCatchFinallyOccurrences(tryStatement) {
                var keywords = [];
                pushKeywordIf(keywords, tryStatement.getFirstToken(), ts.SyntaxKind.TryKeyword);
                if (tryStatement.catchClause) {
                    pushKeywordIf(keywords, tryStatement.catchClause.getFirstToken(), ts.SyntaxKind.CatchKeyword);
                }
                if (tryStatement.finallyBlock) {
                    var finallyKeyword = ts.findChildOfKind(tryStatement, ts.SyntaxKind.FinallyKeyword, sourceFile);
                    pushKeywordIf(keywords, finallyKeyword, ts.SyntaxKind.FinallyKeyword);
                }
                return ts.map(keywords, getReferenceEntryFromNode);
            }
            function getLoopBreakContinueOccurrences(loopNode) {
                var keywords = [];
                if (pushKeywordIf(keywords, loopNode.getFirstToken(), ts.SyntaxKind.ForKeyword, ts.SyntaxKind.WhileKeyword, ts.SyntaxKind.DoKeyword)) {
                    // If we succeeded and got a do-while loop, then start looking for a 'while' keyword.
                    if (loopNode.kind === ts.SyntaxKind.DoStatement) {
                        var loopTokens = loopNode.getChildren();
                        for (var i = loopTokens.length - 1; i >= 0; i--) {
                            if (pushKeywordIf(keywords, loopTokens[i], ts.SyntaxKind.WhileKeyword)) {
                                break;
                            }
                        }
                    }
                }
                var breaksAndContinues = aggregateAllBreakAndContinueStatements(loopNode.statement);
                ts.forEach(breaksAndContinues, function (statement) {
                    if (ownsBreakOrContinueStatement(loopNode, statement)) {
                        pushKeywordIf(keywords, statement.getFirstToken(), ts.SyntaxKind.BreakKeyword, ts.SyntaxKind.ContinueKeyword);
                    }
                });
                return ts.map(keywords, getReferenceEntryFromNode);
            }
            function getSwitchCaseDefaultOccurrences(switchStatement) {
                var keywords = [];
                pushKeywordIf(keywords, switchStatement.getFirstToken(), ts.SyntaxKind.SwitchKeyword);
                // Go through each clause in the switch statement, collecting the 'case'/'default' keywords.
                ts.forEach(switchStatement.clauses, function (clause) {
                    pushKeywordIf(keywords, clause.getFirstToken(), ts.SyntaxKind.CaseKeyword, ts.SyntaxKind.DefaultKeyword);
                    var breaksAndContinues = aggregateAllBreakAndContinueStatements(clause);
                    ts.forEach(breaksAndContinues, function (statement) {
                        if (ownsBreakOrContinueStatement(switchStatement, statement)) {
                            pushKeywordIf(keywords, statement.getFirstToken(), ts.SyntaxKind.BreakKeyword);
                        }
                    });
                });
                return ts.map(keywords, getReferenceEntryFromNode);
            }
            function getBreakOrContinueStatementOccurences(breakOrContinueStatement) {
                var owner = getBreakOrContinueOwner(breakOrContinueStatement);
                if (owner) {
                    switch (owner.kind) {
                        case ts.SyntaxKind.ForStatement:
                        case ts.SyntaxKind.ForInStatement:
                        case ts.SyntaxKind.DoStatement:
                        case ts.SyntaxKind.WhileStatement:
                            return getLoopBreakContinueOccurrences(owner);
                        case ts.SyntaxKind.SwitchStatement:
                            return getSwitchCaseDefaultOccurrences(owner);
                    }
                }
                return undefined;
            }
            function aggregateAllBreakAndContinueStatements(node) {
                var statementAccumulator = [];
                aggregate(node);
                return statementAccumulator;
                function aggregate(node) {
                    if (node.kind === ts.SyntaxKind.BreakStatement || node.kind === ts.SyntaxKind.ContinueStatement) {
                        statementAccumulator.push(node);
                    }
                    else if (!ts.isAnyFunction(node)) {
                        ts.forEachChild(node, aggregate);
                    }
                }
                ;
            }
            function ownsBreakOrContinueStatement(owner, statement) {
                var actualOwner = getBreakOrContinueOwner(statement);
                return actualOwner && actualOwner === owner;
            }
            function getBreakOrContinueOwner(statement) {
                for (var node = statement.parent; node; node = node.parent) {
                    switch (node.kind) {
                        case ts.SyntaxKind.SwitchStatement:
                            if (statement.kind === ts.SyntaxKind.ContinueStatement) {
                                continue;
                            }
                        case ts.SyntaxKind.ForStatement:
                        case ts.SyntaxKind.ForInStatement:
                        case ts.SyntaxKind.WhileStatement:
                        case ts.SyntaxKind.DoStatement:
                            if (!statement.label || isLabeledBy(node, statement.label.text)) {
                                return node;
                            }
                            break;
                        default:
                            // Don't cross function boundaries.
                            if (ts.isAnyFunction(node)) {
                                return undefined;
                            }
                            break;
                    }
                }
                return undefined;
            }
            function getConstructorOccurrences(constructorDeclaration) {
                var declarations = constructorDeclaration.symbol.getDeclarations();
                var keywords = [];
                ts.forEach(declarations, function (declaration) {
                    ts.forEach(declaration.getChildren(), function (token) {
                        return pushKeywordIf(keywords, token, ts.SyntaxKind.ConstructorKeyword);
                    });
                });
                return ts.map(keywords, getReferenceEntryFromNode);
            }
            function getGetAndSetOccurrences(accessorDeclaration) {
                var keywords = [];
                tryPushAccessorKeyword(accessorDeclaration.symbol, ts.SyntaxKind.GetAccessor);
                tryPushAccessorKeyword(accessorDeclaration.symbol, ts.SyntaxKind.SetAccessor);
                return ts.map(keywords, getReferenceEntryFromNode);
                function tryPushAccessorKeyword(accessorSymbol, accessorKind) {
                    var accessor = ts.getDeclarationOfKind(accessorSymbol, accessorKind);
                    if (accessor) {
                        ts.forEach(accessor.getChildren(), function (child) { return pushKeywordIf(keywords, child, ts.SyntaxKind.GetKeyword, ts.SyntaxKind.SetKeyword); });
                    }
                }
            }
            function getModifierOccurrences(modifier, declaration) {
                var container = declaration.parent;
                // Make sure we only highlight the keyword when it makes sense to do so.
                if (declaration.flags & ts.NodeFlags.AccessibilityModifier) {
                    if (!(container.kind === ts.SyntaxKind.ClassDeclaration || (declaration.kind === ts.SyntaxKind.Parameter && hasKind(container, ts.SyntaxKind.Constructor)))) {
                        return undefined;
                    }
                }
                else if (declaration.flags & ts.NodeFlags.Static) {
                    if (container.kind !== ts.SyntaxKind.ClassDeclaration) {
                        return undefined;
                    }
                }
                else if (declaration.flags & (ts.NodeFlags.Export | ts.NodeFlags.Ambient)) {
                    if (!(container.kind === ts.SyntaxKind.ModuleBlock || container.kind === ts.SyntaxKind.SourceFile)) {
                        return undefined;
                    }
                }
                else {
                    // unsupported modifier
                    return undefined;
                }
                var keywords = [];
                var modifierFlag = getFlagFromModifier(modifier);
                var nodes;
                switch (container.kind) {
                    case ts.SyntaxKind.ModuleBlock:
                    case ts.SyntaxKind.SourceFile:
                        nodes = container.statements;
                        break;
                    case ts.SyntaxKind.Constructor:
                        nodes = container.parameters.concat(container.parent.members);
                        break;
                    case ts.SyntaxKind.ClassDeclaration:
                        nodes = container.members;
                        // If we're an accessibility modifier, we're in an instance member and should search
                        // the constructor's parameter list for instance members as well.
                        if (modifierFlag & ts.NodeFlags.AccessibilityModifier) {
                            var constructor = ts.forEach(container.members, function (member) {
                                return member.kind === ts.SyntaxKind.Constructor && member;
                            });
                            if (constructor) {
                                nodes = nodes.concat(constructor.parameters);
                            }
                        }
                        break;
                    default:
                        ts.Debug.fail("Invalid container kind.");
                }
                ts.forEach(nodes, function (node) {
                    if (node.modifiers && node.flags & modifierFlag) {
                        ts.forEach(node.modifiers, function (child) { return pushKeywordIf(keywords, child, modifier); });
                    }
                });
                return ts.map(keywords, getReferenceEntryFromNode);
                function getFlagFromModifier(modifier) {
                    switch (modifier) {
                        case ts.SyntaxKind.PublicKeyword:
                            return ts.NodeFlags.Public;
                        case ts.SyntaxKind.PrivateKeyword:
                            return ts.NodeFlags.Private;
                        case ts.SyntaxKind.ProtectedKeyword:
                            return ts.NodeFlags.Protected;
                        case ts.SyntaxKind.StaticKeyword:
                            return ts.NodeFlags.Static;
                        case ts.SyntaxKind.ExportKeyword:
                            return ts.NodeFlags.Export;
                        case ts.SyntaxKind.DeclareKeyword:
                            return ts.NodeFlags.Ambient;
                        default:
                            ts.Debug.fail();
                    }
                }
            }
            // returns true if 'node' is defined and has a matching 'kind'.
            function hasKind(node, kind) {
                return node !== undefined && node.kind === kind;
            }
            // Null-propagating 'parent' function.
            function parent(node) {
                return node && node.parent;
            }
            function pushKeywordIf(keywordList, token, ...expected) {
                if (token && ts.contains(expected, token.kind)) {
                    keywordList.push(token);
                    return true;
                }
                return false;
            }
        }
        function findRenameLocations(fileName, position, findInStrings, findInComments) {
            return findReferences(fileName, position, findInStrings, findInComments);
        }
        function getReferencesAtPosition(fileName, position) {
            return findReferences(fileName, position, false, false);
        }
        function findReferences(fileName, position, findInStrings, findInComments) {
            synchronizeHostData();
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getSourceFile(fileName);
            var node = ts.getTouchingPropertyName(sourceFile, position);
            if (!node) {
                return undefined;
            }
            if (node.kind !== ts.SyntaxKind.Identifier && !isLiteralNameOfPropertyDeclarationOrIndexAccess(node) && !isNameOfExternalModuleImportOrDeclaration(node)) {
                return undefined;
            }
            ts.Debug.assert(node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.NumericLiteral || node.kind === ts.SyntaxKind.StringLiteral);
            return getReferencesForNode(node, program.getSourceFiles(), findInStrings, findInComments);
        }
        function getReferencesForNode(node, sourceFiles, findInStrings, findInComments) {
            // Labels
            if (isLabelName(node)) {
                if (isJumpStatementTarget(node)) {
                    var labelDefinition = getTargetLabel(node.parent, node.text);
                    // if we have a label definition, look within its statement for references, if not, then
                    // the label is undefined, just return a set of one for the current node.
                    return labelDefinition ? getLabelReferencesInNode(labelDefinition.parent, labelDefinition) : [getReferenceEntryFromNode(node)];
                }
                else {
                    // it is a label definition and not a target, search within the parent labeledStatement
                    return getLabelReferencesInNode(node.parent, node);
                }
            }
            if (node.kind === ts.SyntaxKind.ThisKeyword) {
                return getReferencesForThisKeyword(node, sourceFiles);
            }
            if (node.kind === ts.SyntaxKind.SuperKeyword) {
                return getReferencesForSuperKeyword(node);
            }
            var symbol = typeInfoResolver.getSymbolAtLocation(node);
            // Could not find a symbol e.g. unknown identifier
            if (!symbol) {
                // Even if we did not find a symbol, we have an identifier, so there is at least
                // one reference that we know of. return that instead of undefined.
                return [getReferenceEntryFromNode(node)];
            }
            var declarations = symbol.declarations;
            // The symbol was an internal symbol and does not have a declaration e.g.undefined symbol
            if (!declarations || !declarations.length) {
                return undefined;
            }
            var result;
            // Compute the meaning from the location and the symbol it references
            var searchMeaning = getIntersectingMeaningFromDeclarations(getMeaningFromLocation(node), declarations);
            // Get the text to search for, we need to normalize it as external module names will have quote
            var declaredName = getDeclaredName(symbol);
            // Try to get the smallest valid scope that we can limit our search to;
            // otherwise we'll need to search globally (i.e. include each file).
            var scope = getSymbolScope(symbol);
            if (scope) {
                result = [];
                getReferencesInNode(scope, symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result);
            }
            else {
                var internedName = getInternedName(symbol, declarations);
                ts.forEach(sourceFiles, function (sourceFile) {
                    cancellationToken.throwIfCancellationRequested();
                    if (ts.lookUp(sourceFile.identifiers, internedName)) {
                        result = result || [];
                        getReferencesInNode(sourceFile, symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result);
                    }
                });
            }
            return result;
            function getDeclaredName(symbol) {
                var name = typeInfoResolver.symbolToString(symbol);
                return stripQuotes(name);
            }
            function getInternedName(symbol, declarations) {
                // Special case for function expressions, whose names are solely local to their bodies.
                var functionExpression = ts.forEach(declarations, function (d) { return d.kind === ts.SyntaxKind.FunctionExpression ? d : undefined; });
                // When a name gets interned into a SourceFile's 'identifiers' Map,
                // its name is escaped and stored in the same way its symbol name/identifier
                // name should be stored. Function expressions, however, are a special case,
                // because despite sometimes having a name, the binder unconditionally binds them
                // to a symbol with the name "__function".
                if (functionExpression && functionExpression.name) {
                    var name = functionExpression.name.text;
                }
                else {
                    var name = symbol.name;
                }
                return stripQuotes(name);
            }
            function stripQuotes(name) {
                var length = name.length;
                if (length >= 2 && name.charCodeAt(0) === ts.CharacterCodes.doubleQuote && name.charCodeAt(length - 1) === ts.CharacterCodes.doubleQuote) {
                    return name.substring(1, length - 1);
                }
                ;
                return name;
            }
            function getSymbolScope(symbol) {
                // If this is private property or method, the scope is the containing class
                if (symbol.getFlags() && (ts.SymbolFlags.Property | ts.SymbolFlags.Method)) {
                    var privateDeclaration = ts.forEach(symbol.getDeclarations(), function (d) { return (d.flags & ts.NodeFlags.Private) ? d : undefined; });
                    if (privateDeclaration) {
                        return ts.getAncestor(privateDeclaration, ts.SyntaxKind.ClassDeclaration);
                    }
                }
                // if this symbol is visible from its parent container, e.g. exported, then bail out
                if (symbol.parent) {
                    return undefined;
                }
                var scope = undefined;
                var declarations = symbol.getDeclarations();
                if (declarations) {
                    for (var i = 0, n = declarations.length; i < n; i++) {
                        var container = getContainerNode(declarations[i]);
                        if (!container) {
                            return undefined;
                        }
                        if (scope && scope !== container) {
                            // Different declarations have different containers, bail out
                            return undefined;
                        }
                        if (container.kind === ts.SyntaxKind.SourceFile && !ts.isExternalModule(container)) {
                            // This is a global variable and not an external module, any declaration defined
                            // within this scope is visible outside the file
                            return undefined;
                        }
                        // The search scope is the container node
                        scope = container;
                    }
                }
                return scope;
            }
            function getPossibleSymbolReferencePositions(sourceFile, symbolName, start, end) {
                var positions = [];
                /// TODO: Cache symbol existence for files to save text search
                // Also, need to make this work for unicode escapes.
                // Be resilient in the face of a symbol with no name or zero length name
                if (!symbolName || !symbolName.length) {
                    return positions;
                }
                var text = sourceFile.text;
                var sourceLength = text.length;
                var symbolNameLength = symbolName.length;
                var position = text.indexOf(symbolName, start);
                while (position >= 0) {
                    cancellationToken.throwIfCancellationRequested();
                    // If we are past the end, stop looking
                    if (position > end)
                        break;
                    // We found a match.  Make sure it's not part of a larger word (i.e. the char 
                    // before and after it have to be a non-identifier char).
                    var endPosition = position + symbolNameLength;
                    if ((position === 0 || !ts.isIdentifierPart(text.charCodeAt(position - 1), ts.ScriptTarget.Latest)) && (endPosition === sourceLength || !ts.isIdentifierPart(text.charCodeAt(endPosition), ts.ScriptTarget.Latest))) {
                        // Found a real match.  Keep searching.  
                        positions.push(position);
                    }
                    position = text.indexOf(symbolName, position + symbolNameLength + 1);
                }
                return positions;
            }
            function getLabelReferencesInNode(container, targetLabel) {
                var result = [];
                var sourceFile = container.getSourceFile();
                var labelName = targetLabel.text;
                var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, labelName, container.getStart(), container.getEnd());
                ts.forEach(possiblePositions, function (position) {
                    cancellationToken.throwIfCancellationRequested();
                    var node = ts.getTouchingWord(sourceFile, position);
                    if (!node || node.getWidth() !== labelName.length) {
                        return;
                    }
                    // Only pick labels that are either the target label, or have a target that is the target label
                    if (node === targetLabel || (isJumpStatementTarget(node) && getTargetLabel(node, labelName) === targetLabel)) {
                        result.push(getReferenceEntryFromNode(node));
                    }
                });
                return result;
            }
            function isValidReferencePosition(node, searchSymbolName) {
                if (node) {
                    switch (node.kind) {
                        case ts.SyntaxKind.Identifier:
                            return node.getWidth() === searchSymbolName.length;
                        case ts.SyntaxKind.StringLiteral:
                            if (isLiteralNameOfPropertyDeclarationOrIndexAccess(node) || isNameOfExternalModuleImportOrDeclaration(node)) {
                                // For string literals we have two additional chars for the quotes
                                return node.getWidth() === searchSymbolName.length + 2;
                            }
                            break;
                        case ts.SyntaxKind.NumericLiteral:
                            if (isLiteralNameOfPropertyDeclarationOrIndexAccess(node)) {
                                return node.getWidth() === searchSymbolName.length;
                            }
                            break;
                    }
                }
                return false;
            }
            /** Search within node "container" for references for a search value, where the search value is defined as a
              * tuple of(searchSymbol, searchText, searchLocation, and searchMeaning).
              * searchLocation: a node where the search value
              */
            function getReferencesInNode(container, searchSymbol, searchText, searchLocation, searchMeaning, findInStrings, findInComments, result) {
                var sourceFile = container.getSourceFile();
                var tripleSlashDirectivePrefixRegex = /^\/\/\/\s*</;
                var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, searchText, container.getStart(), container.getEnd());
                if (possiblePositions.length) {
                    // Build the set of symbols to search for, initially it has only the current symbol
                    var searchSymbols = populateSearchSymbolSet(searchSymbol, searchLocation);
                    ts.forEach(possiblePositions, function (position) {
                        cancellationToken.throwIfCancellationRequested();
                        var referenceLocation = ts.getTouchingPropertyName(sourceFile, position);
                        if (!isValidReferencePosition(referenceLocation, searchText)) {
                            // This wasn't the start of a token.  Check to see if it might be a 
                            // match in a comment or string if that's what the caller is asking
                            // for.
                            if ((findInStrings && isInString(position)) || (findInComments && isInComment(position))) {
                                result.push({
                                    fileName: sourceFile.filename,
                                    textSpan: ts.createTextSpan(position, searchText.length),
                                    isWriteAccess: false
                                });
                            }
                            return;
                        }
                        if (!(getMeaningFromLocation(referenceLocation) & searchMeaning)) {
                            return;
                        }
                        var referenceSymbol = typeInfoResolver.getSymbolAtLocation(referenceLocation);
                        if (referenceSymbol) {
                            var referenceSymbolDeclaration = referenceSymbol.valueDeclaration;
                            var shorthandValueSymbol = typeInfoResolver.getShorthandAssignmentValueSymbol(referenceSymbolDeclaration);
                            if (isRelatableToSearchSet(searchSymbols, referenceSymbol, referenceLocation)) {
                                result.push(getReferenceEntryFromNode(referenceLocation));
                            }
                            else if (!(referenceSymbol.flags & ts.SymbolFlags.Transient) && searchSymbols.indexOf(shorthandValueSymbol) >= 0) {
                                result.push(getReferenceEntryFromNode(referenceSymbolDeclaration.name));
                            }
                        }
                    });
                }
                function isInString(position) {
                    var token = ts.getTokenAtPosition(sourceFile, position);
                    return token && token.kind === ts.SyntaxKind.StringLiteral && position > token.getStart();
                }
                function isInComment(position) {
                    var token = ts.getTokenAtPosition(sourceFile, position);
                    if (token && position < token.getStart()) {
                        // First, we have to see if this position actually landed in a comment.
                        var commentRanges = ts.getLeadingCommentRanges(sourceFile.text, token.pos);
                        // Then we want to make sure that it wasn't in a "///<" directive comment
                        // We don't want to unintentionally update a file name.
                        return ts.forEach(commentRanges, function (c) {
                            if (c.pos < position && position < c.end) {
                                var commentText = sourceFile.text.substring(c.pos, c.end);
                                if (!tripleSlashDirectivePrefixRegex.test(commentText)) {
                                    return true;
                                }
                            }
                        });
                    }
                    return false;
                }
            }
            function getReferencesForSuperKeyword(superKeyword) {
                var searchSpaceNode = ts.getSuperContainer(superKeyword);
                if (!searchSpaceNode) {
                    return undefined;
                }
                // Whether 'super' occurs in a static context within a class.
                var staticFlag = ts.NodeFlags.Static;
                switch (searchSpaceNode.kind) {
                    case ts.SyntaxKind.PropertyDeclaration:
                    case ts.SyntaxKind.PropertySignature:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                        staticFlag &= searchSpaceNode.flags;
                        searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                        break;
                    default:
                        return undefined;
                }
                var result = [];
                var sourceFile = searchSpaceNode.getSourceFile();
                var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "super", searchSpaceNode.getStart(), searchSpaceNode.getEnd());
                ts.forEach(possiblePositions, function (position) {
                    cancellationToken.throwIfCancellationRequested();
                    var node = ts.getTouchingWord(sourceFile, position);
                    if (!node || node.kind !== ts.SyntaxKind.SuperKeyword) {
                        return;
                    }
                    var container = ts.getSuperContainer(node);
                    // If we have a 'super' container, we must have an enclosing class.
                    // Now make sure the owning class is the same as the search-space
                    // and has the same static qualifier as the original 'super's owner.
                    if (container && (ts.NodeFlags.Static & container.flags) === staticFlag && container.parent.symbol === searchSpaceNode.symbol) {
                        result.push(getReferenceEntryFromNode(node));
                    }
                });
                return result;
            }
            function getReferencesForThisKeyword(thisOrSuperKeyword, sourceFiles) {
                var searchSpaceNode = ts.getThisContainer(thisOrSuperKeyword, false);
                // Whether 'this' occurs in a static context within a class.
                var staticFlag = ts.NodeFlags.Static;
                switch (searchSpaceNode.kind) {
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                        if (ts.isObjectLiteralMethod(searchSpaceNode)) {
                            break;
                        }
                    case ts.SyntaxKind.PropertyDeclaration:
                    case ts.SyntaxKind.PropertySignature:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                        staticFlag &= searchSpaceNode.flags;
                        searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                        break;
                    case ts.SyntaxKind.SourceFile:
                        if (ts.isExternalModule(searchSpaceNode)) {
                            return undefined;
                        }
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.FunctionExpression:
                        break;
                    default:
                        return undefined;
                }
                var result = [];
                if (searchSpaceNode.kind === ts.SyntaxKind.SourceFile) {
                    ts.forEach(sourceFiles, function (sourceFile) {
                        var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "this", sourceFile.getStart(), sourceFile.getEnd());
                        getThisReferencesInFile(sourceFile, sourceFile, possiblePositions, result);
                    });
                }
                else {
                    var sourceFile = searchSpaceNode.getSourceFile();
                    var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "this", searchSpaceNode.getStart(), searchSpaceNode.getEnd());
                    getThisReferencesInFile(sourceFile, searchSpaceNode, possiblePositions, result);
                }
                return result;
                function getThisReferencesInFile(sourceFile, searchSpaceNode, possiblePositions, result) {
                    ts.forEach(possiblePositions, function (position) {
                        cancellationToken.throwIfCancellationRequested();
                        var node = ts.getTouchingWord(sourceFile, position);
                        if (!node || node.kind !== ts.SyntaxKind.ThisKeyword) {
                            return;
                        }
                        var container = ts.getThisContainer(node, false);
                        switch (searchSpaceNode.kind) {
                            case ts.SyntaxKind.FunctionExpression:
                            case ts.SyntaxKind.FunctionDeclaration:
                                if (searchSpaceNode.symbol === container.symbol) {
                                    result.push(getReferenceEntryFromNode(node));
                                }
                                break;
                            case ts.SyntaxKind.MethodDeclaration:
                            case ts.SyntaxKind.MethodSignature:
                                if (ts.isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol) {
                                    result.push(getReferenceEntryFromNode(node));
                                }
                                break;
                            case ts.SyntaxKind.ClassDeclaration:
                                // Make sure the container belongs to the same class
                                // and has the appropriate static modifier from the original container.
                                if (container.parent && searchSpaceNode.symbol === container.parent.symbol && (container.flags & ts.NodeFlags.Static) === staticFlag) {
                                    result.push(getReferenceEntryFromNode(node));
                                }
                                break;
                            case ts.SyntaxKind.SourceFile:
                                if (container.kind === ts.SyntaxKind.SourceFile && !ts.isExternalModule(container)) {
                                    result.push(getReferenceEntryFromNode(node));
                                }
                                break;
                        }
                    });
                }
            }
            function populateSearchSymbolSet(symbol, location) {
                // The search set contains at least the current symbol
                var result = [symbol];
                // If the location is in a context sensitive location (i.e. in an object literal) try
                // to get a contextual type for it, and add the property symbol from the contextual
                // type to the search set
                if (isNameOfPropertyAssignment(location)) {
                    ts.forEach(getPropertySymbolsFromContextualType(location), function (contextualSymbol) {
                        result.push.apply(result, typeInfoResolver.getRootSymbols(contextualSymbol));
                    });
                    /* Because in short-hand property assignment, location has two meaning : property name and as value of the property
                     * When we do findAllReference at the position of the short-hand property assignment, we would want to have references to position of
                     * property name and variable declaration of the identifier.
                     * Like in below example, when querying for all references for an identifier 'name', of the property assignment, the language service
                     * should show both 'name' in 'obj' and 'name' in variable declaration
                     *      var name = "Foo";
                     *      var obj = { name };
                     * In order to do that, we will populate the search set with the value symbol of the identifier as a value of the property assignment
                     * so that when matching with potential reference symbol, both symbols from property declaration and variable declaration
                     * will be included correctly.
                     */
                    var shorthandValueSymbol = typeInfoResolver.getShorthandAssignmentValueSymbol(location.parent);
                    if (shorthandValueSymbol) {
                        result.push(shorthandValueSymbol);
                    }
                }
                // If this is a union property, add all the symbols from all its source symbols in all unioned types.
                // If the symbol is an instantiation from a another symbol (e.g. widened symbol) , add the root the list
                ts.forEach(typeInfoResolver.getRootSymbols(symbol), function (rootSymbol) {
                    if (rootSymbol !== symbol) {
                        result.push(rootSymbol);
                    }
                    // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
                    if (rootSymbol.parent && rootSymbol.parent.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface)) {
                        getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result);
                    }
                });
                return result;
            }
            function getPropertySymbolsFromBaseTypes(symbol, propertyName, result) {
                if (symbol && symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface)) {
                    ts.forEach(symbol.getDeclarations(), function (declaration) {
                        if (declaration.kind === ts.SyntaxKind.ClassDeclaration) {
                            getPropertySymbolFromTypeReference(ts.getClassBaseTypeNode(declaration));
                            ts.forEach(ts.getClassImplementedTypeNodes(declaration), getPropertySymbolFromTypeReference);
                        }
                        else if (declaration.kind === ts.SyntaxKind.InterfaceDeclaration) {
                            ts.forEach(ts.getInterfaceBaseTypeNodes(declaration), getPropertySymbolFromTypeReference);
                        }
                    });
                }
                return;
                function getPropertySymbolFromTypeReference(typeReference) {
                    if (typeReference) {
                        var type = typeInfoResolver.getTypeAtLocation(typeReference);
                        if (type) {
                            var propertySymbol = typeInfoResolver.getPropertyOfType(type, propertyName);
                            if (propertySymbol) {
                                result.push(propertySymbol);
                            }
                            // Visit the typeReference as well to see if it directly or indirectly use that property
                            getPropertySymbolsFromBaseTypes(type.symbol, propertyName, result);
                        }
                    }
                }
            }
            function isRelatableToSearchSet(searchSymbols, referenceSymbol, referenceLocation) {
                if (searchSymbols.indexOf(referenceSymbol) >= 0) {
                    return true;
                }
                // If the reference location is in an object literal, try to get the contextual type for the 
                // object literal, lookup the property symbol in the contextual type, and use this symbol to
                // compare to our searchSymbol
                if (isNameOfPropertyAssignment(referenceLocation)) {
                    return ts.forEach(getPropertySymbolsFromContextualType(referenceLocation), function (contextualSymbol) {
                        return ts.forEach(typeInfoResolver.getRootSymbols(contextualSymbol), function (s) { return searchSymbols.indexOf(s) >= 0; });
                    });
                }
                // Unwrap symbols to get to the root (e.g. transient symbols as a result of widening)
                // Or a union property, use its underlying unioned symbols
                return ts.forEach(typeInfoResolver.getRootSymbols(referenceSymbol), function (rootSymbol) {
                    // if it is in the list, then we are done
                    if (searchSymbols.indexOf(rootSymbol) >= 0) {
                        return true;
                    }
                    // Finally, try all properties with the same name in any type the containing type extended or implemented, and 
                    // see if any is in the list
                    if (rootSymbol.parent && rootSymbol.parent.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface)) {
                        var result = [];
                        getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result);
                        return ts.forEach(result, function (s) { return searchSymbols.indexOf(s) >= 0; });
                    }
                    return false;
                });
            }
            function getPropertySymbolsFromContextualType(node) {
                if (isNameOfPropertyAssignment(node)) {
                    var objectLiteral = node.parent.parent;
                    var contextualType = typeInfoResolver.getContextualType(objectLiteral);
                    var name = node.text;
                    if (contextualType) {
                        if (contextualType.flags & ts.TypeFlags.Union) {
                            // This is a union type, first see if the property we are looking for is a union property (i.e. exists in all types)
                            // if not, search the constituent types for the property
                            var unionProperty = contextualType.getProperty(name);
                            if (unionProperty) {
                                return [unionProperty];
                            }
                            else {
                                var result = [];
                                ts.forEach(contextualType.types, function (t) {
                                    var symbol = t.getProperty(name);
                                    if (symbol) {
                                        result.push(symbol);
                                    }
                                });
                                return result;
                            }
                        }
                        else {
                            var symbol = contextualType.getProperty(name);
                            if (symbol) {
                                return [symbol];
                            }
                        }
                    }
                }
                return undefined;
            }
            /** Given an initial searchMeaning, extracted from a location, widen the search scope based on the declarations
              * of the corresponding symbol. e.g. if we are searching for "Foo" in value position, but "Foo" references a class
              * then we need to widen the search to include type positions as well.
              * On the contrary, if we are searching for "Bar" in type position and we trace bar to an interface, and an uninstantiated
              * module, we want to keep the search limited to only types, as the two declarations (interface and uninstantiated module)
              * do not intersect in any of the three spaces.
              */
            function getIntersectingMeaningFromDeclarations(meaning, declarations) {
                if (declarations) {
                    do {
                        // The result is order-sensitive, for instance if initialMeaning === Namespace, and declarations = [class, instantiated module]
                        // we need to consider both as they initialMeaning intersects with the module in the namespace space, and the module
                        // intersects with the class in the value space.
                        // To achieve that we will keep iterating until the result stabilizes.
                        // Remember the last meaning
                        var lastIterationMeaning = meaning;
                        for (var i = 0, n = declarations.length; i < n; i++) {
                            var declarationMeaning = getMeaningFromDeclaration(declarations[i]);
                            if (declarationMeaning & meaning) {
                                meaning |= declarationMeaning;
                            }
                        }
                    } while (meaning !== lastIterationMeaning);
                }
                return meaning;
            }
        }
        function getReferenceEntryFromNode(node) {
            var start = node.getStart();
            var end = node.getEnd();
            if (node.kind === ts.SyntaxKind.StringLiteral) {
                start += 1;
                end -= 1;
            }
            return {
                fileName: node.getSourceFile().filename,
                textSpan: ts.createTextSpanFromBounds(start, end),
                isWriteAccess: isWriteAccess(node)
            };
        }
        /** A node is considered a writeAccess iff it is a name of a declaration or a target of an assignment */
        function isWriteAccess(node) {
            if (node.kind === ts.SyntaxKind.Identifier && ts.isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                return true;
            }
            var parent = node.parent;
            if (parent) {
                if (parent.kind === ts.SyntaxKind.PostfixUnaryExpression || parent.kind === ts.SyntaxKind.PrefixUnaryExpression) {
                    return true;
                }
                else if (parent.kind === ts.SyntaxKind.BinaryExpression && parent.left === node) {
                    var operator = parent.operator;
                    return ts.SyntaxKind.FirstAssignment <= operator && operator <= ts.SyntaxKind.LastAssignment;
                }
            }
            return false;
        }
        /// NavigateTo
        function getNavigateToItems(searchValue) {
            synchronizeHostData();
            // Split search value in terms array
            var terms = searchValue.split(" ");
            // default NavigateTo approach: if search term contains only lower-case chars - use case-insensitive search, otherwise switch to case-sensitive version
            var searchTerms = ts.map(terms, function (t) { return ({ caseSensitive: hasAnyUpperCaseCharacter(t), term: t }); });
            var items = [];
            // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[] 
            ts.forEach(program.getSourceFiles(), function (sourceFile) {
                cancellationToken.throwIfCancellationRequested();
                var filename = sourceFile.filename;
                var declarations = sourceFile.getNamedDeclarations();
                for (var i = 0, n = declarations.length; i < n; i++) {
                    var declaration = declarations[i];
                    // TODO(jfreeman): Skip this declaration if it has a computed name
                    var name = declaration.name.text;
                    var matchKind = getMatchKind(searchTerms, name);
                    if (matchKind !== 0 /* none */) {
                        var container = getContainerNode(declaration);
                        items.push({
                            name: name,
                            kind: getNodeKind(declaration),
                            kindModifiers: ts.getNodeModifiers(declaration),
                            matchKind: MatchKind[matchKind],
                            fileName: filename,
                            textSpan: ts.createTextSpanFromBounds(declaration.getStart(), declaration.getEnd()),
                            // TODO(jfreeman): What should be the containerName when the container has a computed name?
                            containerName: container && container.name ? container.name.text : "",
                            containerKind: container && container.name ? getNodeKind(container) : ""
                        });
                    }
                }
            });
            return items;
            function hasAnyUpperCaseCharacter(s) {
                for (var i = 0, n = s.length; i < n; i++) {
                    var c = s.charCodeAt(i);
                    if ((ts.CharacterCodes.A <= c && c <= ts.CharacterCodes.Z) || (c >= ts.CharacterCodes.maxAsciiCharacter && s.charAt(i).toLocaleLowerCase() !== s.charAt(i))) {
                        return true;
                    }
                }
                return false;
            }
            function getMatchKind(searchTerms, name) {
                var matchKind = 0 /* none */;
                if (name) {
                    for (var j = 0, n = searchTerms.length; j < n; j++) {
                        var searchTerm = searchTerms[j];
                        var nameToSearch = searchTerm.caseSensitive ? name : name.toLocaleLowerCase();
                        // in case of case-insensitive search searchTerm.term will already be lower-cased
                        var index = nameToSearch.indexOf(searchTerm.term);
                        if (index < 0) {
                            // Didn't match.
                            return 0 /* none */;
                        }
                        var termKind = 2 /* substring */;
                        if (index === 0) {
                            // here we know that match occur at the beginning of the string.
                            // if search term and declName has the same length - we have an exact match, otherwise declName have longer length and this will be prefix match
                            termKind = name.length === searchTerm.term.length ? 1 /* exact */ : 3 /* prefix */;
                        }
                        // Update our match kind if we don't have one, or if this match is better.
                        if (matchKind === 0 /* none */ || termKind < matchKind) {
                            matchKind = termKind;
                        }
                    }
                }
                return matchKind;
            }
        }
        function containErrors(diagnostics) {
            return ts.forEach(diagnostics, function (diagnostic) { return diagnostic.category === ts.DiagnosticCategory.Error; });
        }
        function getEmitOutput(filename) {
            synchronizeHostData();
            filename = ts.normalizeSlashes(filename);
            var sourceFile = getSourceFile(filename);
            var outputFiles = [];
            function writeFile(filename, data, writeByteOrderMark) {
                outputFiles.push({
                    name: filename,
                    writeByteOrderMark: writeByteOrderMark,
                    text: data
                });
            }
            // Get an emit host from our program, but override the writeFile functionality to
            // call our local writer function.
            var emitHost = ts.createEmitHostFromProgram(program);
            emitHost.writeFile = writeFile;
            var emitOutput = ts.emitFiles(getDiagnosticsProducingTypeChecker().getEmitResolver(), emitHost, sourceFile);
            return {
                outputFiles,
                emitOutputStatus: emitOutput.emitResultStatus
            };
        }
        function getMeaningFromDeclaration(node) {
            switch (node.kind) {
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.BindingElement:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.PropertyAssignment:
                case ts.SyntaxKind.ShorthandPropertyAssignment:
                case ts.SyntaxKind.EnumMember:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.CatchClause:
                    return 1 /* Value */;
                case ts.SyntaxKind.TypeParameter:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.TypeAliasDeclaration:
                case ts.SyntaxKind.TypeLiteral:
                    return 2 /* Type */;
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                    return 1 /* Value */ | 2 /* Type */;
                case ts.SyntaxKind.ModuleDeclaration:
                    if (node.name.kind === ts.SyntaxKind.StringLiteral) {
                        return 4 /* Namespace */ | 1 /* Value */;
                    }
                    else if (ts.getModuleInstanceState(node) === ts.ModuleInstanceState.Instantiated) {
                        return 4 /* Namespace */ | 1 /* Value */;
                    }
                    else {
                        return 4 /* Namespace */;
                    }
                case ts.SyntaxKind.ImportDeclaration:
                    return 1 /* Value */ | 2 /* Type */ | 4 /* Namespace */;
                case ts.SyntaxKind.SourceFile:
                    return 4 /* Namespace */ | 1 /* Value */;
            }
            ts.Debug.fail("Unknown declaration type");
        }
        function isTypeReference(node) {
            if (isRightSideOfQualifiedName(node)) {
                node = node.parent;
            }
            return node.parent.kind === ts.SyntaxKind.TypeReference;
        }
        function isNamespaceReference(node) {
            var root = node;
            var isLastClause = true;
            if (root.parent.kind === ts.SyntaxKind.QualifiedName) {
                while (root.parent && root.parent.kind === ts.SyntaxKind.QualifiedName)
                    root = root.parent;
                isLastClause = root.right === node;
            }
            return root.parent.kind === ts.SyntaxKind.TypeReference && !isLastClause;
        }
        function isInRightSideOfImport(node) {
            while (node.parent.kind === ts.SyntaxKind.QualifiedName) {
                node = node.parent;
            }
            return ts.isInternalModuleImportDeclaration(node.parent) && node.parent.moduleReference === node;
        }
        function getMeaningFromRightHandSideOfImport(node) {
            ts.Debug.assert(node.kind === ts.SyntaxKind.Identifier);
            //     import a = |b|; // Namespace
            //     import a = |b.c|; // Value, type, namespace
            //     import a = |b.c|.d; // Namespace
            if (node.parent.kind === ts.SyntaxKind.QualifiedName && node.parent.right === node && node.parent.parent.kind === ts.SyntaxKind.ImportDeclaration) {
                return 1 /* Value */ | 2 /* Type */ | 4 /* Namespace */;
            }
            return 4 /* Namespace */;
        }
        function getMeaningFromLocation(node) {
            if (node.parent.kind === ts.SyntaxKind.ExportAssignment) {
                return 1 /* Value */ | 2 /* Type */ | 4 /* Namespace */;
            }
            else if (isInRightSideOfImport(node)) {
                return getMeaningFromRightHandSideOfImport(node);
            }
            else if (ts.isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                return getMeaningFromDeclaration(node.parent);
            }
            else if (isTypeReference(node)) {
                return 2 /* Type */;
            }
            else if (isNamespaceReference(node)) {
                return 4 /* Namespace */;
            }
            else {
                return 1 /* Value */;
            }
        }
        // Signature help
        /**
         * This is a semantic operation.
         */
        function getSignatureHelpItems(fileName, position) {
            synchronizeHostData();
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getSourceFile(fileName);
            return ts.SignatureHelp.getSignatureHelpItems(sourceFile, position, typeInfoResolver, cancellationToken);
        }
        /// Syntactic features
        function getCurrentSourceFile(filename) {
            filename = ts.normalizeSlashes(filename);
            var currentSourceFile = syntaxTreeCache.getCurrentSourceFile(filename);
            return currentSourceFile;
        }
        function getNameOrDottedNameSpan(filename, startPos, endPos) {
            filename = ts.normalizeSlashes(filename);
            // Get node at the location
            var node = ts.getTouchingPropertyName(getCurrentSourceFile(filename), startPos);
            if (!node) {
                return;
            }
            switch (node.kind) {
                case ts.SyntaxKind.PropertyAccessExpression:
                case ts.SyntaxKind.QualifiedName:
                case ts.SyntaxKind.StringLiteral:
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.TrueKeyword:
                case ts.SyntaxKind.NullKeyword:
                case ts.SyntaxKind.SuperKeyword:
                case ts.SyntaxKind.ThisKeyword:
                case ts.SyntaxKind.Identifier:
                    break;
                default:
                    return;
            }
            var nodeForStartPos = node;
            while (true) {
                if (isRightSideOfPropertyAccess(nodeForStartPos) || isRightSideOfQualifiedName(nodeForStartPos)) {
                    // If on the span is in right side of the the property or qualified name, return the span from the qualified name pos to end of this node
                    nodeForStartPos = nodeForStartPos.parent;
                }
                else if (isNameOfModuleDeclaration(nodeForStartPos)) {
                    // If this is name of a module declarations, check if this is right side of dotted module name
                    // If parent of the module declaration which is parent of this node is module declaration and its body is the module declaration that this node is name of 
                    // Then this name is name from dotted module
                    if (nodeForStartPos.parent.parent.kind === ts.SyntaxKind.ModuleDeclaration && nodeForStartPos.parent.parent.body === nodeForStartPos.parent) {
                        // Use parent module declarations name for start pos
                        nodeForStartPos = nodeForStartPos.parent.parent.name;
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            return ts.createTextSpanFromBounds(nodeForStartPos.getStart(), node.getEnd());
        }
        function getBreakpointStatementAtPosition(filename, position) {
            // doesn't use compiler - no need to synchronize with host
            filename = ts.normalizeSlashes(filename);
            return ts.BreakpointResolver.spanInSourceFileAtLocation(getCurrentSourceFile(filename), position);
        }
        function getNavigationBarItems(filename) {
            filename = ts.normalizeSlashes(filename);
            return ts.NavigationBar.getNavigationBarItems(getCurrentSourceFile(filename));
        }
        function getSemanticClassifications(fileName, span) {
            synchronizeHostData();
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getSourceFile(fileName);
            var result = [];
            processNode(sourceFile);
            return result;
            function classifySymbol(symbol, meaningAtPosition) {
                var flags = symbol.getFlags();
                if (flags & ts.SymbolFlags.Class) {
                    return ClassificationTypeNames.className;
                }
                else if (flags & ts.SymbolFlags.Enum) {
                    return ClassificationTypeNames.enumName;
                }
                else if (flags & ts.SymbolFlags.TypeAlias) {
                    return ClassificationTypeNames.typeAlias;
                }
                else if (meaningAtPosition & 2 /* Type */) {
                    if (flags & ts.SymbolFlags.Interface) {
                        return ClassificationTypeNames.interfaceName;
                    }
                    else if (flags & ts.SymbolFlags.TypeParameter) {
                        return ClassificationTypeNames.typeParameterName;
                    }
                }
                else if (flags & ts.SymbolFlags.Module) {
                    // Only classify a module as such if
                    //  - It appears in a namespace context.
                    //  - There exists a module declaration which actually impacts the value side.
                    if (meaningAtPosition & 4 /* Namespace */ || (meaningAtPosition & 1 /* Value */ && hasValueSideModule(symbol))) {
                        return ClassificationTypeNames.moduleName;
                    }
                }
                return undefined;
                /**
                 * Returns true if there exists a module that introduces entities on the value side.
                 */
                function hasValueSideModule(symbol) {
                    return ts.forEach(symbol.declarations, function (declaration) {
                        return declaration.kind === ts.SyntaxKind.ModuleDeclaration && ts.getModuleInstanceState(declaration) == ts.ModuleInstanceState.Instantiated;
                    });
                }
            }
            function processNode(node) {
                // Only walk into nodes that intersect the requested span.
                if (node && ts.textSpanIntersectsWith(span, node.getStart(), node.getWidth())) {
                    if (node.kind === ts.SyntaxKind.Identifier && node.getWidth() > 0) {
                        var symbol = typeInfoResolver.getSymbolAtLocation(node);
                        if (symbol) {
                            var type = classifySymbol(symbol, getMeaningFromLocation(node));
                            if (type) {
                                result.push({
                                    textSpan: ts.createTextSpan(node.getStart(), node.getWidth()),
                                    classificationType: type
                                });
                            }
                        }
                    }
                    ts.forEachChild(node, processNode);
                }
            }
        }
        function getSyntacticClassifications(fileName, span) {
            // doesn't use compiler - no need to synchronize with host
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getCurrentSourceFile(fileName);
            // Make a scanner we can get trivia from.
            var triviaScanner = ts.createScanner(ts.ScriptTarget.Latest, false, sourceFile.text);
            var mergeConflictScanner = ts.createScanner(ts.ScriptTarget.Latest, false, sourceFile.text);
            var result = [];
            processElement(sourceFile);
            return result;
            function classifyLeadingTrivia(token) {
                var tokenStart = ts.skipTrivia(sourceFile.text, token.pos, false);
                if (tokenStart === token.pos) {
                    return;
                }
                // token has trivia.  Classify them appropriately.
                triviaScanner.setTextPos(token.pos);
                while (true) {
                    var start = triviaScanner.getTextPos();
                    var kind = triviaScanner.scan();
                    var end = triviaScanner.getTextPos();
                    var width = end - start;
                    if (ts.textSpanIntersectsWith(span, start, width)) {
                        if (!ts.isTrivia(kind)) {
                            return;
                        }
                        if (ts.isComment(kind)) {
                            // Simple comment.  Just add as is.
                            result.push({
                                textSpan: ts.createTextSpan(start, width),
                                classificationType: ClassificationTypeNames.comment
                            });
                            continue;
                        }
                        if (kind === ts.SyntaxKind.ConflictMarkerTrivia) {
                            var text = sourceFile.text;
                            var ch = text.charCodeAt(start);
                            // for the <<<<<<< and >>>>>>> markers, we just add them in as comments
                            // in the classification stream.
                            if (ch === ts.CharacterCodes.lessThan || ch === ts.CharacterCodes.greaterThan) {
                                result.push({
                                    textSpan: ts.createTextSpan(start, width),
                                    classificationType: ClassificationTypeNames.comment
                                });
                                continue;
                            }
                            // for the ======== add a comment for the first line, and then lex all
                            // subsequent lines up until the end of the conflict marker.
                            ts.Debug.assert(ch === ts.CharacterCodes.equals);
                            classifyDisabledMergeCode(text, start, end);
                        }
                    }
                }
            }
            function classifyDisabledMergeCode(text, start, end) {
                for (var i = start; i < end; i++) {
                    if (ts.isLineBreak(text.charCodeAt(i))) {
                        break;
                    }
                }
                result.push({
                    textSpan: ts.createTextSpanFromBounds(start, i),
                    classificationType: ClassificationTypeNames.comment
                });
                mergeConflictScanner.setTextPos(i);
                while (mergeConflictScanner.getTextPos() < end) {
                    classifyDisabledCodeToken();
                }
            }
            function classifyDisabledCodeToken() {
                var start = mergeConflictScanner.getTextPos();
                var tokenKind = mergeConflictScanner.scan();
                var end = mergeConflictScanner.getTextPos();
                var type = classifyTokenType(tokenKind);
                if (type) {
                    result.push({
                        textSpan: ts.createTextSpanFromBounds(start, end),
                        classificationType: type
                    });
                }
            }
            function classifyToken(token) {
                classifyLeadingTrivia(token);
                if (token.getWidth() > 0) {
                    var type = classifyTokenType(token.kind, token);
                    if (type) {
                        result.push({
                            textSpan: ts.createTextSpan(token.getStart(), token.getWidth()),
                            classificationType: type
                        });
                    }
                }
            }
            // for accurate classification, the actual token should be passed in.  however, for 
            // cases like 'disabled merge code' classification, we just get the token kind and
            // classify based on that instead.
            function classifyTokenType(tokenKind, token) {
                if (ts.isKeyword(tokenKind)) {
                    return ClassificationTypeNames.keyword;
                }
                // Special case < and >  If they appear in a generic context they are punctuation,
                // not operators.
                if (tokenKind === ts.SyntaxKind.LessThanToken || tokenKind === ts.SyntaxKind.GreaterThanToken) {
                    // If the node owning the token has a type argument list or type parameter list, then
                    // we can effectively assume that a '<' and '>' belong to those lists.
                    if (token && ts.getTypeArgumentOrTypeParameterList(token.parent)) {
                        return ClassificationTypeNames.punctuation;
                    }
                }
                if (ts.isPunctuation(tokenKind)) {
                    if (token) {
                        if (tokenKind === ts.SyntaxKind.EqualsToken) {
                            // the '=' in a variable declaration is special cased here.
                            if (token.parent.kind === ts.SyntaxKind.VariableDeclaration || token.parent.kind === ts.SyntaxKind.PropertyDeclaration || token.parent.kind === ts.SyntaxKind.Parameter) {
                                return ClassificationTypeNames.operator;
                            }
                        }
                        if (token.parent.kind === ts.SyntaxKind.BinaryExpression || token.parent.kind === ts.SyntaxKind.PrefixUnaryExpression || token.parent.kind === ts.SyntaxKind.PostfixUnaryExpression || token.parent.kind === ts.SyntaxKind.ConditionalExpression) {
                            return ClassificationTypeNames.operator;
                        }
                    }
                    return ClassificationTypeNames.punctuation;
                }
                else if (tokenKind === ts.SyntaxKind.NumericLiteral) {
                    return ClassificationTypeNames.numericLiteral;
                }
                else if (tokenKind === ts.SyntaxKind.StringLiteral) {
                    return ClassificationTypeNames.stringLiteral;
                }
                else if (tokenKind === ts.SyntaxKind.RegularExpressionLiteral) {
                    // TODO: we should get another classification type for these literals.
                    return ClassificationTypeNames.stringLiteral;
                }
                else if (ts.isTemplateLiteralKind(tokenKind)) {
                    // TODO (drosen): we should *also* get another classification type for these literals.
                    return ClassificationTypeNames.stringLiteral;
                }
                else if (tokenKind === ts.SyntaxKind.Identifier) {
                    if (token) {
                        switch (token.parent.kind) {
                            case ts.SyntaxKind.ClassDeclaration:
                                if (token.parent.name === token) {
                                    return ClassificationTypeNames.className;
                                }
                                return;
                            case ts.SyntaxKind.TypeParameter:
                                if (token.parent.name === token) {
                                    return ClassificationTypeNames.typeParameterName;
                                }
                                return;
                            case ts.SyntaxKind.InterfaceDeclaration:
                                if (token.parent.name === token) {
                                    return ClassificationTypeNames.interfaceName;
                                }
                                return;
                            case ts.SyntaxKind.EnumDeclaration:
                                if (token.parent.name === token) {
                                    return ClassificationTypeNames.enumName;
                                }
                                return;
                            case ts.SyntaxKind.ModuleDeclaration:
                                if (token.parent.name === token) {
                                    return ClassificationTypeNames.moduleName;
                                }
                                return;
                        }
                    }
                    return ClassificationTypeNames.text;
                }
            }
            function processElement(element) {
                // Ignore nodes that don't intersect the original span to classify.
                if (ts.textSpanIntersectsWith(span, element.getFullStart(), element.getFullWidth())) {
                    var children = element.getChildren();
                    for (var i = 0, n = children.length; i < n; i++) {
                        var child = children[i];
                        if (ts.isToken(child)) {
                            classifyToken(child);
                        }
                        else {
                            // Recurse into our child nodes.
                            processElement(child);
                        }
                    }
                }
            }
        }
        function getOutliningSpans(filename) {
            // doesn't use compiler - no need to synchronize with host
            filename = ts.normalizeSlashes(filename);
            var sourceFile = getCurrentSourceFile(filename);
            return ts.OutliningElementsCollector.collectElements(sourceFile);
        }
        function getBraceMatchingAtPosition(filename, position) {
            var sourceFile = getCurrentSourceFile(filename);
            var result = [];
            var token = ts.getTouchingToken(sourceFile, position);
            if (token.getStart(sourceFile) === position) {
                var matchKind = getMatchingTokenKind(token);
                // Ensure that there is a corresponding token to match ours.
                if (matchKind) {
                    var parentElement = token.parent;
                    var childNodes = parentElement.getChildren(sourceFile);
                    for (var i = 0, n = childNodes.length; i < n; i++) {
                        33;
                        var current = childNodes[i];
                        if (current.kind === matchKind) {
                            var range1 = ts.createTextSpan(token.getStart(sourceFile), token.getWidth(sourceFile));
                            var range2 = ts.createTextSpan(current.getStart(sourceFile), current.getWidth(sourceFile));
                            // We want to order the braces when we return the result.
                            if (range1.start < range2.start) {
                                result.push(range1, range2);
                            }
                            else {
                                result.push(range2, range1);
                            }
                            break;
                        }
                    }
                }
            }
            return result;
            function getMatchingTokenKind(token) {
                switch (token.kind) {
                    case ts.SyntaxKind.OpenBraceToken: return ts.SyntaxKind.CloseBraceToken;
                    case ts.SyntaxKind.OpenParenToken: return ts.SyntaxKind.CloseParenToken;
                    case ts.SyntaxKind.OpenBracketToken: return ts.SyntaxKind.CloseBracketToken;
                    case ts.SyntaxKind.LessThanToken: return ts.SyntaxKind.GreaterThanToken;
                    case ts.SyntaxKind.CloseBraceToken: return ts.SyntaxKind.OpenBraceToken;
                    case ts.SyntaxKind.CloseParenToken: return ts.SyntaxKind.OpenParenToken;
                    case ts.SyntaxKind.CloseBracketToken: return ts.SyntaxKind.OpenBracketToken;
                    case ts.SyntaxKind.GreaterThanToken: return ts.SyntaxKind.LessThanToken;
                }
                return undefined;
            }
        }
        function getIndentationAtPosition(filename, position, editorOptions) {
            filename = ts.normalizeSlashes(filename);
            var start = new Date().getTime();
            var sourceFile = getCurrentSourceFile(filename);
            log("getIndentationAtPosition: getCurrentSourceFile: " + (new Date().getTime() - start));
            var start = new Date().getTime();
            var result = ts.formatting.SmartIndenter.getIndentation(position, sourceFile, editorOptions);
            log("getIndentationAtPosition: computeIndentation  : " + (new Date().getTime() - start));
            return result;
        }
        function getFormattingEditsForRange(fileName, start, end, options) {
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getCurrentSourceFile(fileName);
            return ts.formatting.formatSelection(start, end, sourceFile, getRuleProvider(options), options);
        }
        function getFormattingEditsForDocument(fileName, options) {
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getCurrentSourceFile(fileName);
            return ts.formatting.formatDocument(sourceFile, getRuleProvider(options), options);
        }
        function getFormattingEditsAfterKeystroke(fileName, position, key, options) {
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getCurrentSourceFile(fileName);
            if (key === "}") {
                return ts.formatting.formatOnClosingCurly(position, sourceFile, getRuleProvider(options), options);
            }
            else if (key === ";") {
                return ts.formatting.formatOnSemicolon(position, sourceFile, getRuleProvider(options), options);
            }
            else if (key === "\n") {
                return ts.formatting.formatOnEnter(position, sourceFile, getRuleProvider(options), options);
            }
            return [];
        }
        function getTodoComments(filename, descriptors) {
            // Note: while getting todo comments seems like a syntactic operation, we actually 
            // treat it as a semantic operation here.  This is because we expect our host to call
            // this on every single file.  If we treat this syntactically, then that will cause
            // us to populate and throw away the tree in our syntax tree cache for each file.  By
            // treating this as a semantic operation, we can access any tree without throwing 
            // anything away.
            synchronizeHostData();
            filename = ts.normalizeSlashes(filename);
            var sourceFile = getSourceFile(filename);
            cancellationToken.throwIfCancellationRequested();
            var fileContents = sourceFile.text;
            cancellationToken.throwIfCancellationRequested();
            var result = [];
            if (descriptors.length > 0) {
                var regExp = getTodoCommentsRegExp();
                var matchArray;
                while (matchArray = regExp.exec(fileContents)) {
                    cancellationToken.throwIfCancellationRequested();
                    // If we got a match, here is what the match array will look like.  Say the source text is:
                    //
                    //      "    // hack   1"
                    //
                    // The result array with the regexp:    will be:
                    //
                    //      ["// hack   1", "// ", "hack   1", undefined, "hack"]
                    //
                    // Here are the relevant capture groups:
                    //  0) The full match for the entire regexp.
                    //  1) The preamble to the message portion.
                    //  2) The message portion.
                    //  3...N) The descriptor that was matched - by index.  'undefined' for each 
                    //         descriptor that didn't match.  an actual value if it did match.
                    //
                    //  i.e. 'undefined' in position 3 above means TODO(jason) didn't match.
                    //       "hack"      in position 4 means HACK did match.
                    var firstDescriptorCaptureIndex = 3;
                    ts.Debug.assert(matchArray.length === descriptors.length + firstDescriptorCaptureIndex);
                    var preamble = matchArray[1];
                    var matchPosition = matchArray.index + preamble.length;
                    // OK, we have found a match in the file.  This is only an acceptable match if
                    // it is contained within a comment.
                    var token = ts.getTokenAtPosition(sourceFile, matchPosition);
                    if (!isInsideComment(sourceFile, token, matchPosition)) {
                        continue;
                    }
                    var descriptor = undefined;
                    for (var i = 0, n = descriptors.length; i < n; i++) {
                        if (matchArray[i + firstDescriptorCaptureIndex]) {
                            descriptor = descriptors[i];
                        }
                    }
                    ts.Debug.assert(descriptor !== undefined);
                    // We don't want to match something like 'TODOBY', so we make sure a non 
                    // letter/digit follows the match.
                    if (isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                        continue;
                    }
                    var message = matchArray[2];
                    result.push({
                        descriptor: descriptor,
                        message: message,
                        position: matchPosition
                    });
                }
            }
            return result;
            function escapeRegExp(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
            function getTodoCommentsRegExp() {
                // NOTE: ?:  means 'non-capture group'.  It allows us to have groups without having to
                // filter them out later in the final result array.
                // TODO comments can appear in one of the following forms:
                //
                //  1)      // TODO     or  /////////// TODO
                //
                //  2)      /* TODO     or  /********** TODO
                //
                //  3)      /*
                //           *   TODO
                //           */
                //
                // The following three regexps are used to match the start of the text up to the TODO
                // comment portion.
                var singleLineCommentStart = /(?:\/\/+\s*)/.source;
                var multiLineCommentStart = /(?:\/\*+\s*)/.source;
                var anyNumberOfSpacesAndAsterixesAtStartOfLine = /(?:^(?:\s|\*)*)/.source;
                // Match any of the above three TODO comment start regexps.
                // Note that the outermost group *is* a capture group.  We want to capture the preamble
                // so that we can determine the starting position of the TODO comment match.
                var preamble = "(" + anyNumberOfSpacesAndAsterixesAtStartOfLine + "|" + singleLineCommentStart + "|" + multiLineCommentStart + ")";
                // Takes the descriptors and forms a regexp that matches them as if they were literals.
                // For example, if the descriptors are "TODO(jason)" and "HACK", then this will be:
                //
                //      (?:(TODO\(jason\))|(HACK))
                //
                // Note that the outermost group is *not* a capture group, but the innermost groups
                // *are* capture groups.  By capturing the inner literals we can determine after 
                // matching which descriptor we are dealing with.
                var literals = "(?:" + ts.map(descriptors, function (d) { return "(" + escapeRegExp(d.text) + ")"; }).join("|") + ")";
                // After matching a descriptor literal, the following regexp matches the rest of the 
                // text up to the end of the line (or */).
                var endOfLineOrEndOfComment = /(?:$|\*\/)/.source;
                var messageRemainder = /(?:.*?)/.source;
                // This is the portion of the match we'll return as part of the TODO comment result. We
                // match the literal portion up to the end of the line or end of comment.
                var messagePortion = "(" + literals + messageRemainder + ")";
                var regExpString = preamble + messagePortion + endOfLineOrEndOfComment;
                // The final regexp will look like this:
                // /((?:\/\/+\s*)|(?:\/\*+\s*)|(?:^(?:\s|\*)*))((?:(TODO\(jason\))|(HACK))(?:.*?))(?:$|\*\/)/gim
                // The flags of the regexp are important here.
                //  'g' is so that we are doing a global search and can find matches several times
                //  in the input.
                //
                //  'i' is for case insensitivity (We do this to match C# TODO comment code).
                //
                //  'm' is so we can find matches in a multi-line input.
                return new RegExp(regExpString, "gim");
            }
            function isLetterOrDigit(char) {
                return (char >= ts.CharacterCodes.a && char <= ts.CharacterCodes.z) || (char >= ts.CharacterCodes.A && char <= ts.CharacterCodes.Z) || (char >= ts.CharacterCodes._0 && char <= ts.CharacterCodes._9);
            }
        }
        function getRenameInfo(fileName, position) {
            synchronizeHostData();
            fileName = ts.normalizeSlashes(fileName);
            var sourceFile = getSourceFile(fileName);
            var node = ts.getTouchingWord(sourceFile, position);
            // Can only rename an identifier.
            if (node && node.kind === ts.SyntaxKind.Identifier) {
                var symbol = typeInfoResolver.getSymbolAtLocation(node);
                // Only allow a symbol to be renamed if it actually has at least one declaration.
                if (symbol && symbol.getDeclarations() && symbol.getDeclarations().length > 0) {
                    var kind = getSymbolKind(symbol, typeInfoResolver, node);
                    if (kind) {
                        return getRenameInfo(symbol.name, typeInfoResolver.getFullyQualifiedName(symbol), kind, getSymbolModifiers(symbol), ts.createTextSpan(node.getStart(), node.getWidth()));
                    }
                }
            }
            return getRenameInfoError(ts.getLocaleSpecificMessage(ts.Diagnostics.You_cannot_rename_this_element.key));
            function getRenameInfoError(localizedErrorMessage) {
                return {
                    canRename: false,
                    localizedErrorMessage: ts.getLocaleSpecificMessage(ts.Diagnostics.You_cannot_rename_this_element.key),
                    displayName: undefined,
                    fullDisplayName: undefined,
                    kind: undefined,
                    kindModifiers: undefined,
                    triggerSpan: undefined
                };
            }
            function getRenameInfo(displayName, fullDisplayName, kind, kindModifiers, triggerSpan) {
                return {
                    canRename: true,
                    localizedErrorMessage: undefined,
                    displayName,
                    fullDisplayName,
                    kind,
                    kindModifiers,
                    triggerSpan
                };
            }
        }
        return {
            dispose,
            cleanupSemanticCache,
            getSyntacticDiagnostics,
            getSemanticDiagnostics,
            getCompilerOptionsDiagnostics,
            getSyntacticClassifications,
            getSemanticClassifications,
            getCompletionsAtPosition,
            getCompletionEntryDetails,
            getSignatureHelpItems,
            getQuickInfoAtPosition,
            getDefinitionAtPosition,
            getReferencesAtPosition,
            getOccurrencesAtPosition,
            getNameOrDottedNameSpan,
            getBreakpointStatementAtPosition,
            getNavigateToItems,
            getRenameInfo,
            findRenameLocations,
            getNavigationBarItems,
            getOutliningSpans,
            getTodoComments,
            getBraceMatchingAtPosition,
            getIndentationAtPosition,
            getFormattingEditsForRange,
            getFormattingEditsForDocument,
            getFormattingEditsAfterKeystroke,
            getEmitOutput,
            getSourceFile: getCurrentSourceFile,
        };
    }
    ts.createLanguageService = createLanguageService;
    /// Classifier
    function createClassifier() {
        var scanner = ts.createScanner(ts.ScriptTarget.Latest, false);
        /// We do not have a full parser support to know when we should parse a regex or not
        /// If we consider every slash token to be a regex, we could be missing cases like "1/2/3", where
        /// we have a series of divide operator. this list allows us to be more accurate by ruling out 
        /// locations where a regexp cannot exist.
        var noRegexTable = [];
        noRegexTable[ts.SyntaxKind.Identifier] = true;
        noRegexTable[ts.SyntaxKind.StringLiteral] = true;
        noRegexTable[ts.SyntaxKind.NumericLiteral] = true;
        noRegexTable[ts.SyntaxKind.RegularExpressionLiteral] = true;
        noRegexTable[ts.SyntaxKind.ThisKeyword] = true;
        noRegexTable[ts.SyntaxKind.PlusPlusToken] = true;
        noRegexTable[ts.SyntaxKind.MinusMinusToken] = true;
        noRegexTable[ts.SyntaxKind.CloseParenToken] = true;
        noRegexTable[ts.SyntaxKind.CloseBracketToken] = true;
        noRegexTable[ts.SyntaxKind.CloseBraceToken] = true;
        noRegexTable[ts.SyntaxKind.TrueKeyword] = true;
        noRegexTable[ts.SyntaxKind.FalseKeyword] = true;
        function isAccessibilityModifier(kind) {
            switch (kind) {
                case ts.SyntaxKind.PublicKeyword:
                case ts.SyntaxKind.PrivateKeyword:
                case ts.SyntaxKind.ProtectedKeyword:
                    return true;
            }
            return false;
        }
        /** Returns true if 'keyword2' can legally follow 'keyword1' in any language construct. */
        function canFollow(keyword1, keyword2) {
            if (isAccessibilityModifier(keyword1)) {
                if (keyword2 === ts.SyntaxKind.GetKeyword || keyword2 === ts.SyntaxKind.SetKeyword || keyword2 === ts.SyntaxKind.ConstructorKeyword || keyword2 === ts.SyntaxKind.StaticKeyword) {
                    // Allow things like  "public get", "public constructor" and "public static".  
                    // These are all legal.
                    return true;
                }
                // Any other keyword following "public" is actually an identifier an not a real
                // keyword.
                return false;
            }
            // Assume any other keyword combination is legal.  This can be refined in the future
            // if there are more cases we want the classifier to be better at.
            return true;
        }
        // 'classifyKeywordsInGenerics' should be 'true' when a syntactic classifier is not present.
        function getClassificationsForLine(text, lexState, classifyKeywordsInGenerics) {
            var offset = 0;
            var token = ts.SyntaxKind.Unknown;
            var lastNonTriviaToken = ts.SyntaxKind.Unknown;
            switch (lexState) {
                case 3 /* InDoubleQuoteStringLiteral */:
                    text = '"\\\n' + text;
                    offset = 3;
                    break;
                case 2 /* InSingleQuoteStringLiteral */:
                    text = "'\\\n" + text;
                    offset = 3;
                    break;
                case 1 /* InMultiLineCommentTrivia */:
                    text = "/*\n" + text;
                    offset = 3;
                    break;
            }
            scanner.setText(text);
            var result = {
                finalLexState: 0 /* Start */,
                entries: []
            };
            // We can run into an unfortunate interaction between the lexical and syntactic classifier
            // when the user is typing something generic.  Consider the case where the user types:
            //
            //      Foo<number
            //
            // From the lexical classifier's perspective, 'number' is a keyword, and so the word will
            // be classified as such.  However, from the syntactic classifier's tree-based perspective
            // this is simply an expression with the identifier 'number' on the RHS of the less than
            // token.  So the classification will go back to being an identifier.  The moment the user
            // types again, number will become a keyword, then an identifier, etc. etc.
            //
            // To try to avoid this problem, we avoid classifying contextual keywords as keywords 
            // when the user is potentially typing something generic.  We just can't do a good enough
            // job at the lexical level, and so well leave it up to the syntactic classifier to make
            // the determination.
            //
            // In order to determine if the user is potentially typing something generic, we use a 
            // weak heuristic where we track < and > tokens.  It's a weak heuristic, but should
            // work well enough in practice.
            var angleBracketStack = 0;
            do {
                token = scanner.scan();
                if (!ts.isTrivia(token)) {
                    if ((token === ts.SyntaxKind.SlashToken || token === ts.SyntaxKind.SlashEqualsToken) && !noRegexTable[lastNonTriviaToken]) {
                        if (scanner.reScanSlashToken() === ts.SyntaxKind.RegularExpressionLiteral) {
                            token = ts.SyntaxKind.RegularExpressionLiteral;
                        }
                    }
                    else if (lastNonTriviaToken === ts.SyntaxKind.DotToken && isKeyword(token)) {
                        token = ts.SyntaxKind.Identifier;
                    }
                    else if (isKeyword(lastNonTriviaToken) && isKeyword(token) && !canFollow(lastNonTriviaToken, token)) {
                        // We have two keywords in a row.  Only treat the second as a keyword if 
                        // it's a sequence that could legally occur in the language.  Otherwise
                        // treat it as an identifier.  This way, if someone writes "private var"
                        // we recognize that 'var' is actually an identifier here.
                        token = ts.SyntaxKind.Identifier;
                    }
                    else if (lastNonTriviaToken === ts.SyntaxKind.Identifier && token === ts.SyntaxKind.LessThanToken) {
                        // Could be the start of something generic.  Keep track of that by bumping 
                        // up the current count of generic contexts we may be in.
                        angleBracketStack++;
                    }
                    else if (token === ts.SyntaxKind.GreaterThanToken && angleBracketStack > 0) {
                        // If we think we're currently in something generic, then mark that that
                        // generic entity is complete.
                        angleBracketStack--;
                    }
                    else if (token === ts.SyntaxKind.AnyKeyword || token === ts.SyntaxKind.StringKeyword || token === ts.SyntaxKind.NumberKeyword || token === ts.SyntaxKind.BooleanKeyword) {
                        if (angleBracketStack > 0 && !classifyKeywordsInGenerics) {
                            // If it looks like we're could be in something generic, don't classify this 
                            // as a keyword.  We may just get overwritten by the syntactic classifier,
                            // causing a noisy experience for the user.
                            token = ts.SyntaxKind.Identifier;
                        }
                    }
                    lastNonTriviaToken = token;
                }
                processToken();
            } while (token !== ts.SyntaxKind.EndOfFileToken);
            return result;
            function processToken() {
                var start = scanner.getTokenPos();
                var end = scanner.getTextPos();
                addResult(end - start, classFromKind(token));
                if (end >= text.length) {
                    if (token === ts.SyntaxKind.StringLiteral) {
                        // Check to see if we finished up on a multiline string literal.
                        var tokenText = scanner.getTokenText();
                        if (scanner.isUnterminated()) {
                            var lastCharIndex = tokenText.length - 1;
                            var numBackslashes = 0;
                            while (tokenText.charCodeAt(lastCharIndex - numBackslashes) === ts.CharacterCodes.backslash) {
                                numBackslashes++;
                            }
                            // If we have an odd number of backslashes, then the multiline string is unclosed
                            if (numBackslashes & 1) {
                                var quoteChar = tokenText.charCodeAt(0);
                                result.finalLexState = quoteChar === ts.CharacterCodes.doubleQuote ? 3 /* InDoubleQuoteStringLiteral */ : 2 /* InSingleQuoteStringLiteral */;
                            }
                        }
                    }
                    else if (token === ts.SyntaxKind.MultiLineCommentTrivia) {
                        // Check to see if the multiline comment was unclosed.
                        if (scanner.isUnterminated()) {
                            result.finalLexState = 1 /* InMultiLineCommentTrivia */;
                        }
                    }
                }
            }
            function addResult(length, classification) {
                if (length > 0) {
                    // If this is the first classification we're adding to the list, then remove any 
                    // offset we have if we were continuing a construct from the previous line.
                    if (result.entries.length === 0) {
                        length -= offset;
                    }
                    result.entries.push({ length: length, classification: classification });
                }
            }
        }
        function isBinaryExpressionOperatorToken(token) {
            switch (token) {
                case ts.SyntaxKind.AsteriskToken:
                case ts.SyntaxKind.SlashToken:
                case ts.SyntaxKind.PercentToken:
                case ts.SyntaxKind.PlusToken:
                case ts.SyntaxKind.MinusToken:
                case ts.SyntaxKind.LessThanLessThanToken:
                case ts.SyntaxKind.GreaterThanGreaterThanToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case ts.SyntaxKind.LessThanToken:
                case ts.SyntaxKind.GreaterThanToken:
                case ts.SyntaxKind.LessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanEqualsToken:
                case ts.SyntaxKind.InstanceOfKeyword:
                case ts.SyntaxKind.InKeyword:
                case ts.SyntaxKind.EqualsEqualsToken:
                case ts.SyntaxKind.ExclamationEqualsToken:
                case ts.SyntaxKind.EqualsEqualsEqualsToken:
                case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                case ts.SyntaxKind.AmpersandToken:
                case ts.SyntaxKind.CaretToken:
                case ts.SyntaxKind.BarToken:
                case ts.SyntaxKind.AmpersandAmpersandToken:
                case ts.SyntaxKind.BarBarToken:
                case ts.SyntaxKind.BarEqualsToken:
                case ts.SyntaxKind.AmpersandEqualsToken:
                case ts.SyntaxKind.CaretEqualsToken:
                case ts.SyntaxKind.LessThanLessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.PlusEqualsToken:
                case ts.SyntaxKind.MinusEqualsToken:
                case ts.SyntaxKind.AsteriskEqualsToken:
                case ts.SyntaxKind.SlashEqualsToken:
                case ts.SyntaxKind.PercentEqualsToken:
                case ts.SyntaxKind.EqualsToken:
                case ts.SyntaxKind.CommaToken:
                    return true;
                default: return false;
            }
        }
        function isPrefixUnaryExpressionOperatorToken(token) {
            switch (token) {
                case ts.SyntaxKind.PlusToken:
                case ts.SyntaxKind.MinusToken:
                case ts.SyntaxKind.TildeToken:
                case ts.SyntaxKind.ExclamationToken:
                case ts.SyntaxKind.PlusPlusToken:
                case ts.SyntaxKind.MinusMinusToken:
                    return true;
                default:
                    return false;
            }
        }
        function isKeyword(token) {
            return token >= ts.SyntaxKind.FirstKeyword && token <= ts.SyntaxKind.LastKeyword;
        }
        function classFromKind(token) {
            if (isKeyword(token)) {
                return 1 /* Keyword */;
            }
            else if (isBinaryExpressionOperatorToken(token) || isPrefixUnaryExpressionOperatorToken(token)) {
                return 2 /* Operator */;
            }
            else if (token >= ts.SyntaxKind.FirstPunctuation && token <= ts.SyntaxKind.LastPunctuation) {
                return 0 /* Punctuation */;
            }
            switch (token) {
                case ts.SyntaxKind.NumericLiteral:
                    return 6 /* NumberLiteral */;
                case ts.SyntaxKind.StringLiteral:
                    return 7 /* StringLiteral */;
                case ts.SyntaxKind.RegularExpressionLiteral:
                    return 8 /* RegExpLiteral */;
                case ts.SyntaxKind.ConflictMarkerTrivia:
                case ts.SyntaxKind.MultiLineCommentTrivia:
                case ts.SyntaxKind.SingleLineCommentTrivia:
                    return 3 /* Comment */;
                case ts.SyntaxKind.WhitespaceTrivia:
                    return 4 /* Whitespace */;
                case ts.SyntaxKind.Identifier:
                default:
                    return 5 /* Identifier */;
            }
        }
        return { getClassificationsForLine };
    }
    ts.createClassifier = createClassifier;
    /**
      * Get the path of the default library file (lib.d.ts) as distributed with the typescript
      * node package.
      * The functionality is not supported if the ts module is consumed outside of a node module.
      */
    function getDefaultLibraryFilePath(options) {
        if (typeof module !== "undefined" && module.exports) {
            return __dirname + ts.directorySeparator + ts.getDefaultLibraryFilename(options);
        }
        throw new Error("getDefaultLibraryFilename is only supported when consumed as a node module. ");
    }
    ts.getDefaultLibraryFilePath = getDefaultLibraryFilePath;
    function initializeServices() {
        ts.objectAllocator = {
            getNodeConstructor: function (kind) {
                function Node() {
                }
                var proto = kind === ts.SyntaxKind.SourceFile ? new SourceFileObject() : new NodeObject();
                proto.kind = kind;
                proto.pos = 0;
                proto.end = 0;
                proto.flags = 0;
                proto.parent = undefined;
                Node.prototype = proto;
                return Node;
            },
            getSymbolConstructor: function () { return SymbolObject; },
            getTypeConstructor: function () { return TypeObject; },
            getSignatureConstructor: function () { return SignatureObject; },
        };
    }
    initializeServices();
})(ts || (ts = {}));
