/// <reference path="..\compiler\types.ts"/>
/// <reference path="..\compiler\core.ts"/>
/// <reference path="..\compiler\scanner.ts"/>
/// <reference path="..\compiler\parser.ts"/>
/// <reference path="..\compiler\checker.ts"/>

/// <reference path='syntax\incrementalParser.ts' />
/// <reference path='outliningElementsCollector.ts' />
/// <reference path='navigationBar.ts' />
/// <reference path='breakpoints.ts' />
/// <reference path='indentation.ts' />
/// <reference path='signatureHelp.ts' />
/// <reference path='utilities.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='formatting\smartIndenter.ts' />

/// <reference path='core\references.ts' />
/// <reference path='resources\references.ts' />
/// <reference path='text\references.ts' />
/// <reference path='syntax\references.ts' />
/// <reference path='compiler\diagnostics.ts' />
/// <reference path='compiler\hashTable.ts' />
/// <reference path='compiler\ast.ts' />
/// <reference path='compiler\astWalker.ts' />
/// <reference path='compiler\astHelpers.ts' />
/// <reference path='compiler\pathUtils.ts' />

module ts {
    export interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): Node[];
        getStart(sourceFile?: SourceFile): number;
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFile): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node;
        getLastToken(sourceFile?: SourceFile): Node;
    }

    export interface Symbol {
        getFlags(): SymbolFlags;
        getName(): string;
        getDeclarations(): Declaration[];
        getDocumentationComment(): SymbolDisplayPart[];
    }

    export interface Type {
        getFlags(): TypeFlags;
        getSymbol(): Symbol;
        getProperties(): Symbol[];
        getProperty(propertyName: string): Symbol;
        getApparentProperties(): Symbol[];
        getCallSignatures(): Signature[];
        getConstructSignatures(): Signature[];
        getStringIndexType(): Type;
        getNumberIndexType(): Type;
    }

    export interface Signature {
        getDeclaration(): SignatureDeclaration;
        getTypeParameters(): Type[];
        getParameters(): Symbol[];
        getReturnType(): Type;
        getDocumentationComment(): SymbolDisplayPart[];
    }

    export interface SourceFile {
        getSourceUnit(): TypeScript.SourceUnitSyntax;
        getSyntaxTree(): TypeScript.SyntaxTree;
        getScriptSnapshot(): TypeScript.IScriptSnapshot;
        getNamedDeclarations(): Declaration[];
        update(scriptSnapshot: TypeScript.IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TypeScript.TextChangeRange): SourceFile;
    }

    var scanner: Scanner = createScanner(ScriptTarget.ES5, /*skipTrivia*/ true);

    var emptyArray: any[] = [];

    function createNode(kind: SyntaxKind, pos: number, end: number, flags: NodeFlags, parent?: Node): NodeObject {
        var node = <NodeObject> new (getNodeConstructor(kind))();
        node.pos = pos;
        node.end = end;
        node.flags = flags;
        node.parent = parent;
        return node;
    }

    class NodeObject implements Node {
        public kind: SyntaxKind;
        public pos: number;
        public end: number;
        public flags: NodeFlags;
        public parent: Node;
        private _children: Node[];

        public getSourceFile(): SourceFile {
            return getSourceFileOfNode(this);
        }

        public getStart(sourceFile?: SourceFile): number {
            return getTokenPosOfNode(this, sourceFile);
        }

        public getFullStart(): number {
            return this.pos;
        }

        public getEnd(): number {
            return this.end;
        }

        public getWidth(sourceFile?: SourceFile): number {
            return this.getEnd() - this.getStart(sourceFile);
        }

        public getFullWidth(): number {
            return this.end - this.getFullStart();
        }

        public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
            return this.getStart(sourceFile) - this.pos;
        }

        public getFullText(sourceFile?: SourceFile): string {
            return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
        }

        private addSyntheticNodes(nodes: Node[], pos: number, end: number): number {
            scanner.setTextPos(pos);
            while (pos < end) {
                var token = scanner.scan();
                var textPos = scanner.getTextPos();
                var node = nodes.push(createNode(token, pos, textPos, NodeFlags.Synthetic, this));
                pos = textPos;
            }
            return pos;
        }

        private createSyntaxList(nodes: NodeArray<Node>): Node {
            var list = createNode(SyntaxKind.SyntaxList, nodes.pos, nodes.end, NodeFlags.Synthetic, this);
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
        }

        private createChildren(sourceFile?: SourceFile) {
            if (this.kind > SyntaxKind.Missing) {
                scanner.setText((sourceFile || this.getSourceFile()).text);
                var children: Node[] = [];
                var pos = this.pos;
                var processNode = (node: Node) => {
                    if (pos < node.pos) {
                        pos = this.addSyntheticNodes(children, pos, node.pos);
                    }
                    children.push(node);
                    pos = node.end;
                };
                var processNodes = (nodes: NodeArray<Node>) => {
                    if (pos < nodes.pos) {
                        pos = this.addSyntheticNodes(children, pos, nodes.pos);
                    }
                    children.push(this.createSyntaxList(<NodeArray<Node>>nodes));
                    pos = nodes.end;
                };
                forEachChild(this, processNode, processNodes);
                if (pos < this.end) {
                    this.addSyntheticNodes(children, pos, this.end);
                }
                scanner.setText(undefined);
            }
            this._children = children || emptyArray;
        }

        public getChildCount(sourceFile?: SourceFile): number {
            if (!this._children) this.createChildren(sourceFile);
            return this._children.length;
        }

        public getChildAt(index: number, sourceFile?: SourceFile): Node {
            if (!this._children) this.createChildren(sourceFile);
            return this._children[index];
        }

        public getChildren(sourceFile?: SourceFile): Node[] {
            if (!this._children) this.createChildren(sourceFile);
            return this._children;
        }

        public getFirstToken(sourceFile?: SourceFile): Node {
            var children = this.getChildren();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.kind < SyntaxKind.Missing) return child;
                if (child.kind > SyntaxKind.Missing) return child.getFirstToken(sourceFile);
            }
        }

        public getLastToken(sourceFile?: SourceFile): Node {
            var children = this.getChildren(sourceFile);
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.kind < SyntaxKind.Missing) return child;
                if (child.kind > SyntaxKind.Missing) return child.getLastToken(sourceFile);
            }
        }
    }

    class SymbolObject implements Symbol {
        flags: SymbolFlags;
        name: string;
        declarations: Declaration[];

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no doc comment, then the empty string will be returned.
        documentationComment: SymbolDisplayPart[];

        constructor(flags: SymbolFlags, name: string) {
            this.flags = flags;
            this.name = name;
        }

        getFlags(): SymbolFlags {
            return this.flags;
        }

        getName(): string {
            return this.name;
        }

        getDeclarations(): Declaration[] {
            return this.declarations;
        }

        getDocumentationComment(): SymbolDisplayPart[] {
            if (this.documentationComment === undefined) {
                this.documentationComment = getJsDocCommentsFromDeclarations(this.declarations, this.name, !(this.flags & SymbolFlags.Property));
            }

            return this.documentationComment;
        }
    }

    function getJsDocCommentsFromDeclarations(declarations: Declaration[], name: string, canUseParsedParamTagComments: boolean) {
        var documentationComment = <SymbolDisplayPart[]>[];
        var docComments = getJsDocCommentsSeparatedByNewLines();
        ts.forEach(docComments, docComment => {
            if (documentationComment.length) {
                documentationComment.push(lineBreakPart());
            }
            documentationComment.push(docComment);
        });

        return documentationComment;

        function getJsDocCommentsSeparatedByNewLines() {
            var paramTag = "@param";
            var jsDocCommentParts: SymbolDisplayPart[] = [];

            ts.forEach(declarations, declaration => {
                var sourceFileOfDeclaration = getSourceFileOfNode(declaration);
                // If it is parameter - try and get the jsDoc comment with @param tag from function declaration's jsDoc comments
                if (canUseParsedParamTagComments && declaration.kind === SyntaxKind.Parameter) {
                    ts.forEach(getJsDocCommentTextRange(declaration.parent, sourceFileOfDeclaration), jsDocCommentTextRange => {
                        var cleanedParamJsDocComment = getCleanedParamJsDocComment(jsDocCommentTextRange.pos, jsDocCommentTextRange.end, sourceFileOfDeclaration);
                        if (cleanedParamJsDocComment) {
                            jsDocCommentParts.push.apply(jsDocCommentParts, cleanedParamJsDocComment);
                        }
                    });
                }

                // If this is left side of dotted module declaration, there is no doc comments associated with this node
                if (declaration.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>declaration).body.kind === SyntaxKind.ModuleDeclaration) {
                    return;
                }

                // If this is dotted module name, get the doc comments from the parent
                while (declaration.kind === SyntaxKind.ModuleDeclaration && declaration.parent.kind === SyntaxKind.ModuleDeclaration) {
                    declaration = declaration.parent;
                } 

                // Get the cleaned js doc comment text from the declaration
                ts.forEach(getJsDocCommentTextRange(
                    declaration.kind === SyntaxKind.VariableDeclaration ? declaration.parent : declaration, sourceFileOfDeclaration), jsDocCommentTextRange => {
                        var cleanedJsDocComment = getCleanedJsDocComment(jsDocCommentTextRange.pos, jsDocCommentTextRange.end, sourceFileOfDeclaration);
                        if (cleanedJsDocComment) {
                            jsDocCommentParts.push.apply(jsDocCommentParts, cleanedJsDocComment);
                        }
                    });
            });

            return jsDocCommentParts;

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
                    var ch = sourceFile.text.charCodeAt(pos);
                    if (!isWhiteSpace(ch) || isLineBreak(ch)) {
                        // Either found lineBreak or non whiteSpace
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

            function getCleanedJsDocComment(pos: number, end: number, sourceFile: SourceFile) {
                var spacesToRemoveAfterAsterisk: number;
                var docComments: SymbolDisplayPart[] = [];
                var isInParamTag = false;

                while (pos < end) {
                    var docCommentTextOfLine = "";
                    // First consume leading white space
                    pos = consumeWhiteSpacesOnTheLine(pos, end, sourceFile);

                    // If the comment starts with '*' consume the spaces on this line
                    if (pos < end && sourceFile.text.charCodeAt(pos) === CharacterCodes.asterisk) {
                        var lineStartPos = pos + 1;
                        pos = consumeWhiteSpacesOnTheLine(pos + 1, end, sourceFile, spacesToRemoveAfterAsterisk);

                        // Set the spaces to remove after asterisk as margin if not already set
                        if (spacesToRemoveAfterAsterisk === undefined && pos < end && !isLineBreak(sourceFile.text.charCodeAt(pos))) {
                            spacesToRemoveAfterAsterisk = pos - lineStartPos;
                        }
                    }
                    else if (spacesToRemoveAfterAsterisk === undefined) {
                        spacesToRemoveAfterAsterisk = 0;
                    }

                    // Analyse text on this line
                    while (pos < end && !isLineBreak(sourceFile.text.charCodeAt(pos))) {
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
                        docComments.push(textPart(docCommentTextOfLine));
                    }
                }

                return docComments;
            }

            function getCleanedParamJsDocComment(pos: number, end: number, sourceFile: SourceFile) {
                var paramHelpStringMargin: number;
                var paramDocComments: SymbolDisplayPart[] = [];
                while (pos < end) {
                    if (isParamTag(pos, end, sourceFile)) {
                        // Consume leading spaces 
                        pos = consumeWhiteSpaces(pos + paramTag.length);
                        if (pos >= end) {
                            break;
                        }

                        // Ignore type expression
                        if (sourceFile.text.charCodeAt(pos) === CharacterCodes.openBrace) {
                            pos++;
                            for (var curlies = 1; pos < end; pos++) {
                                var charCode = sourceFile.text.charCodeAt(pos);

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

                            var paramHelpString = "";
                            var firstLineParamHelpStringPos = pos;
                            while (pos < end) {
                                var ch = sourceFile.text.charCodeAt(pos);

                                // at line break, set this comment line text and go to next line 
                                if (isLineBreak(ch)) {
                                    if (paramHelpString) {
                                        paramDocComments.push(textPart(paramHelpString));
                                        paramHelpString = "";
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
                                paramDocComments.push(textPart(paramHelpString));
                            }
                            paramHelpStringMargin = undefined;
                        }

                        // If this is the start of another tag, continue with the loop in seach of param tag with symbol name
                        if (sourceFile.text.charCodeAt(pos) === CharacterCodes.at) {
                            continue;
                        }
                    }

                    // Next character
                    pos++;
                }

                return paramDocComments;

                function consumeWhiteSpaces(pos: number) {
                    while (pos < end && isWhiteSpace(sourceFile.text.charCodeAt(pos))) {
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
                        if (ch === CharacterCodes.asterisk) {
                            // Consume more spaces after asterisk
                            pos = consumeWhiteSpacesOnTheLine(pos + 1, end, sourceFile, paramHelpStringMargin - consumedSpaces - 1);
                        }
                    }
                }
            }
        }
    }

    class TypeObject implements Type {
        checker: TypeChecker;
        flags: TypeFlags;
        id: number;
        symbol: Symbol;
        constructor(checker: TypeChecker, flags: TypeFlags) {
            this.checker = checker;
            this.flags = flags;
        }
        getFlags(): TypeFlags {
            return this.flags;
        }
        getSymbol(): Symbol {
            return this.symbol;
        }
        getProperties(): Symbol[] {
            return this.checker.getPropertiesOfType(this);
        }
        getProperty(propertyName: string): Symbol {
            return this.checker.getPropertyOfType(this, propertyName);
        }
        getApparentProperties(): Symbol[] {
            return this.checker.getAugmentedPropertiesOfApparentType(this);
        }
        getCallSignatures(): Signature[] {
            return this.checker.getSignaturesOfType(this, SignatureKind.Call);
        }
        getConstructSignatures(): Signature[] {
            return this.checker.getSignaturesOfType(this, SignatureKind.Construct);
        }
        getStringIndexType(): Type {
            return this.checker.getIndexTypeOfType(this, IndexKind.String);
        }
        getNumberIndexType(): Type {
            return this.checker.getIndexTypeOfType(this, IndexKind.Number);
        }
    }

    class SignatureObject implements Signature {
        checker: TypeChecker;
        declaration: SignatureDeclaration;
        typeParameters: TypeParameter[];
        parameters: Symbol[];
        resolvedReturnType: Type;
        minArgumentCount: number;
        hasRestParameter: boolean;
        hasStringLiterals: boolean;

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no doc comment, then the empty string will be returned.
        documentationComment: SymbolDisplayPart[];

        constructor(checker: TypeChecker) {
            this.checker = checker;
        }
        getDeclaration(): SignatureDeclaration {
            return this.declaration;
        }
        getTypeParameters(): Type[] {
            return this.typeParameters;
        }
        getParameters(): Symbol[] {
            return this.parameters;
        }
        getReturnType(): Type {
            return this.checker.getReturnTypeOfSignature(this);
        }

        getDocumentationComment(): SymbolDisplayPart[] {
            if (this.documentationComment === undefined) {
                this.documentationComment = this.declaration ? getJsDocCommentsFromDeclarations(
                    [this.declaration],
                    this.declaration.name ? this.declaration.name.text : "",
                    /*canUseParsedParamTagComments*/ false) : [];
            }

            return this.documentationComment;
        }
    }

    var incrementalParse: IncrementalParse = TypeScript.IncrementalParser.parse;

    class SourceFileObject extends NodeObject implements SourceFile {
        public filename: string;
        public text: string;
        public getLineAndCharacterFromPosition(position: number): { line: number; character: number } { return null; }
        public getPositionFromLineAndCharacter(line: number, character: number): number { return -1; }
        public amdDependencies: string[];
        public referencedFiles: FileReference[];
        public syntacticErrors: Diagnostic[];
        public semanticErrors: Diagnostic[];
        public hasNoDefaultLib: boolean;
        public externalModuleIndicator: Node; // The first node that causes this file to be an external module
        public nodeCount: number;
        public identifierCount: number;
        public symbolCount: number;
        public statements: NodeArray<Statement>;
        public version: string;
        public isOpen: boolean;
        public languageVersion: ScriptTarget;
        public identifiers: Map<string>;

        private syntaxTree: TypeScript.SyntaxTree;
        private scriptSnapshot: TypeScript.IScriptSnapshot;
        private namedDeclarations: Declaration[];

        public getSourceUnit(): TypeScript.SourceUnitSyntax {
            // If we don't have a script, create one from our parse tree.
            return this.getSyntaxTree().sourceUnit();
        }

        public getScriptSnapshot(): TypeScript.IScriptSnapshot {
            return this.scriptSnapshot;
        }

        public getLineMap(): TypeScript.LineMap {
            return this.getSyntaxTree().lineMap();
        }

        public getNamedDeclarations() {
            if (!this.namedDeclarations) {
                var sourceFile = this;
                var namedDeclarations: Declaration[] = [];

                forEachChild(sourceFile, function visit(node: Node): void {
                    switch (node.kind) {
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.Method:
                            var functionDeclaration = <FunctionDeclaration>node;

                            if (functionDeclaration.name && functionDeclaration.name.kind !== SyntaxKind.Missing) {
                                var lastDeclaration = namedDeclarations.length > 0 ?
                                    namedDeclarations[namedDeclarations.length - 1] :
                                    undefined;

                                // Check whether this declaration belongs to an "overload group".
                                if (lastDeclaration && functionDeclaration.symbol === lastDeclaration.symbol) {
                                    // Overwrite the last declaration if it was an overload
                                    // and this one is an implementation.
                                    if (functionDeclaration.body && !(<FunctionDeclaration>lastDeclaration).body) {
                                        namedDeclarations[namedDeclarations.length - 1] = functionDeclaration;
                                    }
                                }
                                else {
                                    namedDeclarations.push(node);
                                }

                                forEachChild(node, visit);
                            }
                            break;

                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                        case SyntaxKind.EnumDeclaration:
                        case SyntaxKind.ModuleDeclaration:
                        case SyntaxKind.ImportDeclaration:
                        case SyntaxKind.GetAccessor:
                        case SyntaxKind.SetAccessor:
                        case SyntaxKind.TypeLiteral:
                            if ((<Declaration>node).name) {
                                namedDeclarations.push(<Declaration>node);
                            }
                            // fall through
                        case SyntaxKind.Constructor:
                        case SyntaxKind.VariableStatement:
                        case SyntaxKind.ModuleBlock:
                        case SyntaxKind.FunctionBlock:
                            forEachChild(node, visit);
                            break;

                        case SyntaxKind.Parameter:
                            // Only consider properties defined as constructor parameters
                            if (!(node.flags & NodeFlags.AccessibilityModifier)) {
                                break;
                            }
                            // fall through
                        case SyntaxKind.VariableDeclaration:
                        case SyntaxKind.EnumMember:
                        case SyntaxKind.Property:
                            namedDeclarations.push(<Declaration>node);
                            break;
                    }
                });

                this.namedDeclarations = namedDeclarations;
            }

            return this.namedDeclarations;
        }

        public getSyntaxTree(): TypeScript.SyntaxTree {
            if (!this.syntaxTree) {
                var start = new Date().getTime();

                this.syntaxTree = TypeScript.Parser.parse(
                    this.filename, TypeScript.SimpleText.fromScriptSnapshot(this.scriptSnapshot), this.languageVersion, this.isDeclareFile());

                var time = new Date().getTime() - start;

                //TypeScript.syntaxTreeParseTime += time;
            }

            return this.syntaxTree;
        }

        private isDeclareFile(): boolean {
            return TypeScript.isDTSFile(this.filename);
        }

        public update(scriptSnapshot: TypeScript.IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TypeScript.TextChangeRange): SourceFile {
            // See if we are currently holding onto a syntax tree.  We may not be because we're 
            // either a closed file, or we've just been lazy and haven't had to create the syntax
            // tree yet.  Access the field instead of the method so we don't accidentally realize
            // the old syntax tree.
            var oldSyntaxTree = this.syntaxTree;

            if (textChangeRange && Debug.shouldAssert(AssertionLevel.Normal)) {
                var oldText = this.scriptSnapshot;
                var newText = scriptSnapshot;

                TypeScript.Debug.assert((oldText.getLength() - textChangeRange.span().length() + textChangeRange.newLength()) === newText.getLength());

                if (Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
                    var oldTextPrefix = oldText.getText(0, textChangeRange.span().start());
                    var newTextPrefix = newText.getText(0, textChangeRange.span().start());
                    TypeScript.Debug.assert(oldTextPrefix === newTextPrefix);

                    var oldTextSuffix = oldText.getText(textChangeRange.span().end(), oldText.getLength());
                    var newTextSuffix = newText.getText(textChangeRange.newSpan().end(), newText.getLength());
                    TypeScript.Debug.assert(oldTextSuffix === newTextSuffix);
                }
            }

            var text = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);

            // If we don't have a text change, or we don't have an old syntax tree, then do a full
            // parse.  Otherwise, do an incremental parse.
            var newSyntaxTree = !textChangeRange || !oldSyntaxTree
                ? TypeScript.Parser.parse(this.filename, text, this.languageVersion, TypeScript.isDTSFile(this.filename))
                : TypeScript.IncrementalParser.parse(oldSyntaxTree, textChangeRange, text);

            return SourceFileObject.createSourceFileObject(this.filename, scriptSnapshot, this.languageVersion, version, isOpen, newSyntaxTree);
        }

        public static createSourceFileObject(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot, languageVersion: ScriptTarget, version: string, isOpen: boolean, syntaxTree?: TypeScript.SyntaxTree) {
            var newSourceFile = <SourceFileObject><any>createSourceFile(filename, scriptSnapshot.getText(0, scriptSnapshot.getLength()), languageVersion, version, isOpen);
            newSourceFile.scriptSnapshot = scriptSnapshot;
            newSourceFile.syntaxTree = syntaxTree;
            return newSourceFile;
        }
    }

    export interface Logger {
        log(s: string): void;
    }

    //
    // Public interface of the host of a language service instance.
    //
    export interface LanguageServiceHost extends Logger {
        getCompilationSettings(): CompilerOptions;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot;
        getLocalizedDiagnosticMessages(): any;
        getCancellationToken(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFilename(): string;
    }

    //
    // Public services of a language service instance associated
    // with a language service host instance
    //
    export interface LanguageService {
        cleanupSemanticCache(): void;

        getSyntacticDiagnostics(fileName: string): Diagnostic[];
        getSemanticDiagnostics(fileName: string): Diagnostic[];
        getCompilerOptionsDiagnostics(): Diagnostic[];

        getSyntacticClassifications(fileName: string, span: TypeScript.TextSpan): ClassifiedSpan[];
        getSemanticClassifications(fileName: string, span: TypeScript.TextSpan): ClassifiedSpan[];

        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;

        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TypeScript.TextSpan;

        getBreakpointStatementAtPosition(fileName: string, position: number): TypeScript.TextSpan;

        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;

        // Obsolete.  Use getSignatureHelpItems instead.
        getSignatureAtPosition(fileName: string, position: number): SignatureInfo;

        getRenameInfo(fileName: string, position: number): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[];
        
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getImplementorsAtPosition(fileName: string, position: number): ReferenceEntry[];

        getNavigateToItems(searchValue: string): NavigateToItem[];
        getNavigationBarItems(fileName: string): NavigationBarItem[];

        getOutliningSpans(fileName: string): OutliningSpan[];
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
        getBraceMatchingAtPosition(fileName: string, position: number): TypeScript.TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number;

        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[];

        getEmitOutput(fileName: string): EmitOutput;

        //getSyntaxTree(fileName: string): TypeScript.SyntaxTree;

        dispose(): void;
    }

    export interface SignatureInfo {
        actual: ActualSignatureInfo;
        formal: FormalSignatureItemInfo[]; // Formal signatures
        activeFormal: number; // Index of the "best match" formal signature
    }

    export interface FormalSignatureItemInfo {
        signatureInfo: string;
        typeParameters: FormalTypeParameterInfo[];
        parameters: FormalParameterInfo[];   // Array of parameters
        docComment: string; // Help for the signature
    }

    export interface FormalTypeParameterInfo {
        name: string;        // Type parameter name
        docComment: string;  // Comments that contain help for the parameter
        minChar: number;     // minChar for parameter info in the formal signature info string
        limChar: number;     // lim char for parameter info in the formal signature info string
    }

    export interface FormalParameterInfo {
        name: string;        // Parameter name
        isVariable: boolean; // true if parameter is var args
        docComment: string;  // Comments that contain help for the parameter
        minChar: number;     // minChar for parameter info in the formal signature info string
        limChar: number;     // lim char for parameter info in the formal signature info string
    }

    export interface ActualSignatureInfo {
        parameterMinChar: number;
        parameterLimChar: number;
        currentParameterIsTypeParameter: boolean; // current parameter is a type argument or a normal argument
        currentParameter: number;        // Index of active parameter in "parameters" or "typeParamters" array
    }

    export interface ClassifiedSpan {
        textSpan: TypeScript.TextSpan;
        classificationType: string; // ClassificationTypeNames
    }

    export interface NavigationBarItem {
        text: string;
        kind: string;
        kindModifiers: string;
        spans: TypeScript.TextSpan[];
        childItems: NavigationBarItem[];
        indent: number;
        bolded: boolean;
        grayed: boolean;
    }

    export interface TodoCommentDescriptor {
        text: string;
        priority: number;
    }

    export interface TodoComment {
        descriptor: TodoCommentDescriptor;
        message: string;
        position: number;
    }

    export class TextChange {
        span: TypeScript.TextSpan;
        newText: string;
    }

    export interface RenameLocation {
        textSpan: TypeScript.TextSpan;
        fileName: string;
    }

    export interface ReferenceEntry {
        textSpan: TypeScript.TextSpan;
        fileName: string;
        isWriteAccess: boolean;
    }

    export interface NavigateToItem {
        name: string;
        kind: string;
        kindModifiers: string;
        matchKind: string;
        fileName: string;
        textSpan: TypeScript.TextSpan;
        containerName: string;
        containerKind: string;
    }

    export interface EditorOptions {
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
    }

    export interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
    }

    export interface DefinitionInfo {
        fileName: string;
        textSpan: TypeScript.TextSpan;
        kind: string;
        name: string;
        containerKind: string;
        containerName: string;
    }
    
    export interface SymbolDisplayPart {
        text: string;
        kind: string;
    }

    export interface QuickInfo {
        kind: string;
        kindModifiers: string;
        textSpan: TypeScript.TextSpan;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }

    export interface RenameInfo {
        canRename: boolean;
        localizedErrorMessage: string;
        displayName: string;
        fullDisplayName: string;
        kind: string;
        kindModifiers: string;
        triggerSpan: TypeScript.TextSpan;
    }

    export interface SignatureHelpParameter {
        name: string;
        documentation: SymbolDisplayPart[];
        displayParts: SymbolDisplayPart[];
        isOptional: boolean;
    }

    /**
     * Represents a single signature to show in signature help.
     * The id is used for subsequent calls into the language service to ask questions about the
     * signature help item in the context of any documents that have been updated.  i.e. after
     * an edit has happened, while signature help is still active, the host can ask important 
     * questions like 'what parameter is the user currently contained within?'.
     */
    export interface SignatureHelpItem {
        isVariadic: boolean;
        prefixDisplayParts: SymbolDisplayPart[];
        suffixDisplayParts: SymbolDisplayPart[];
        separatorDisplayParts: SymbolDisplayPart[];
        parameters: SignatureHelpParameter[];
        documentation: SymbolDisplayPart[];
    }

    /**
     * Represents a set of signature help items, and the preferred item that should be selected.
     */
    export interface SignatureHelpItems {
        items: SignatureHelpItem[];
        applicableSpan: TypeScript.TextSpan;
        selectedItemIndex: number;
        argumentIndex: number;
        argumentCount: number;
    }

    export interface CompletionInfo {
        isMemberCompletion: boolean;
        entries: CompletionEntry[];
    }

    export interface CompletionEntry {
        name: string;
        kind: string;            // see ScriptElementKind
        kindModifiers: string;   // see ScriptElementKindModifier, comma separated
    }

    export interface CompletionEntryDetails {
        name: string;
        kind: string;            // see ScriptElementKind
        kindModifiers: string;   // see ScriptElementKindModifier, comma separated
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }

    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitOutputStatus: EmitReturnStatus;
    }

    export enum OutputFileType {
        JavaScript,
        SourceMap,
        Declaration
    }

    export interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }

    export enum EndOfLineState {
        Start,
        InMultiLineCommentTrivia,
        InSingleQuoteStringLiteral,
        InDoubleQuoteStringLiteral,
    }

    export enum TokenClass {
        Punctuation,
        Keyword,
        Operator,
        Comment,
        Whitespace,
        Identifier,
        NumberLiteral,
        StringLiteral,
        RegExpLiteral,
    }

    export interface ClassificationResult {
        finalLexState: EndOfLineState;
        entries: ClassificationInfo[];
    }

    export interface ClassificationInfo {
        length: number;
        classification: TokenClass;
    }

    export interface Classifier {
        getClassificationsForLine(text: string, lexState: EndOfLineState): ClassificationResult;
    }

    export interface DocumentRegistry {
        acquireDocument(
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: TypeScript.IScriptSnapshot,
            version: string,
            isOpen: boolean): SourceFile;

        updateDocument(
            sourceFile: SourceFile,
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: TypeScript.IScriptSnapshot,
            version: string,
            isOpen: boolean,
            textChangeRange: TypeScript.TextChangeRange
            ): SourceFile;

        releaseDocument(filename: string, compilationSettings: CompilerOptions): void
    }

    // TODO: move these to enums
    export class ScriptElementKind {
        static unknown = "";

        // predefined type (void) or keyword (class)
        static keyword = "keyword";

        // top level script node
        static scriptElement = "script";

        // module foo {}
        static moduleElement = "module";

        // class X {}
        static classElement = "class";

        // interface Y {}
        static interfaceElement = "interface";

        // enum E
        static enumElement = "enum";

        // Inside module and script only
        // var v = ..
        static variableElement = "var";

        // Inside function
        static localVariableElement = "local var";

        // Inside module and script only
        // function f() { }
        static functionElement = "function";

        // Inside function
        static localFunctionElement = "local function";

        // class X { [public|private]* foo() {} }
        static memberFunctionElement = "method";

        // class X { [public|private]* [get|set] foo:number; }
        static memberGetAccessorElement = "getter";
        static memberSetAccessorElement = "setter";

        // class X { [public|private]* foo:number; }
        // interface Y { foo:number; }
        static memberVariableElement = "property";

        // class X { constructor() { } }
        static constructorImplementationElement = "constructor";

        // interface Y { ():number; }
        static callSignatureElement = "call";

        // interface Y { []:number; }
        static indexSignatureElement = "index";

        // interface Y { new():Y; }
        static constructSignatureElement = "construct";

        // function foo(*Y*: string)
        static parameterElement = "parameter";

        static typeParameterElement = "type parameter";

        static primitiveType = "primitive type";

        static label = "label";

        static alias = "alias"
    }

    export class ScriptElementKindModifier {
        static none = "";
        static publicMemberModifier = "public";
        static privateMemberModifier = "private";
        static protectedMemberModifier = "protected";
        static exportedModifier = "export";
        static ambientModifier = "declare";
        static staticModifier = "static";
    }

    export class ClassificationTypeNames {
        public static comment = "comment";
        public static identifier = "identifier";
        public static keyword = "keyword";
        public static numericLiteral = "number";
        public static operator = "operator";
        public static stringLiteral = "string";
        public static whiteSpace = "whitespace";
        public static text = "text";

        public static punctuation = "punctuation";

        public static className = "class name";
        public static enumName = "enum name";
        public static interfaceName = "interface name";
        public static moduleName = "module name";
        public static typeParameterName = "type parameter name";
    }

    enum MatchKind {
        none = 0,
        exact = 1,
        substring = 2,
        prefix = 3
    }

    interface IncrementalParse {
        (oldSyntaxTree: TypeScript.SyntaxTree, textChangeRange: TypeScript.TextChangeRange, newText: TypeScript.ISimpleText): TypeScript.SyntaxTree
    }

    /// Language Service

    interface CompletionSession {
        filename: string;           // the file where the completion was requested
        position: number;           // position in the file where the completion was requested
        entries: CompletionEntry[]; // entries for this completion
        symbols: Map<Symbol>;       // symbols by entry name map
        location: Node;             // the node where the completion was requested
        typeChecker: TypeChecker;   // the typeChecker used to generate this completion
    }

    interface FormattingOptions {
        useTabs: boolean;
        spacesPerTab: number;
        indentSpaces: number;
        newLineCharacter: string;
    }

    // Information about a specific host file.
    interface HostFileInformation {
        filename: string;
        version: string;
        isOpen: boolean;
        sourceText?: TypeScript.IScriptSnapshot;
    }

    interface DocumentRegistryEntry {
        sourceFile: SourceFile;
        refCount: number;
        owners: string[];
    }

    export function displayPartsToString(displayParts: SymbolDisplayPart[]) {
        if (displayParts) {
            return map(displayParts, displayPart => displayPart.text).join("");
        }

        return "";
    }

    interface DisplayPartsSymbolWriter extends SymbolWriter {
        displayParts(): SymbolDisplayPart[];
    }

    var displayPartWriter = getDisplayPartWriter();
    function getDisplayPartWriter(): DisplayPartsSymbolWriter {
        var displayParts: SymbolDisplayPart[];
        var lineStart: boolean;
        var indent: number;

        resetWriter();
        return {
            displayParts: () => displayParts,
            writeKind: writeKind,
            writeSymbol: writeSymbol,
            writeLine: writeLine,
            increaseIndent: () => { indent++; },
            decreaseIndent: () => { indent--; },
            clear: resetWriter,
            trackSymbol: () => { }
        };

        function writeIndent() {
            if (lineStart) {
                displayParts.push(displayPart(getIndentString(indent), SymbolDisplayPartKind.space));
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

    function displayPart(text: string, kind: SymbolDisplayPartKind, symbol?: Symbol): SymbolDisplayPart {
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

    function isFirstDeclarationOfSymbolParameter(symbol: Symbol) {
        return symbol.declarations && symbol.declarations.length > 0 && symbol.declarations[0].kind === SyntaxKind.Parameter;
    }

    function isLocalVariableOrFunction(symbol: Symbol) {
        if (symbol.parent) {
            return false; // This is exported symbol
        }

        return ts.forEach(symbol.declarations, declaration => {
            // Function expressions are local
            if (declaration.kind === SyntaxKind.FunctionExpression) {
                return true;
            }

            if (declaration.kind !== SyntaxKind.VariableDeclaration && declaration.kind !== SyntaxKind.FunctionDeclaration) {
                return false;
            }

            // If the parent is not sourceFile or module block it is local variable
            for (var parent = declaration.parent; parent.kind !== SyntaxKind.FunctionBlock; parent = parent.parent) {
                // Reached source file or module block
                if (parent.kind === SyntaxKind.SourceFile || parent.kind === SyntaxKind.ModuleBlock) {
                    return false;
                }
            }

            // parent is in function block
            return true;
        });
    }

    export function symbolPart(text: string, symbol: Symbol) {
        return displayPart(text, displayPartKind(symbol), symbol);

        function displayPartKind(symbol: Symbol): SymbolDisplayPartKind {
            var flags = symbol.flags;

            if (flags & SymbolFlags.Variable) {
                return isFirstDeclarationOfSymbolParameter(symbol) ? SymbolDisplayPartKind.parameterName : SymbolDisplayPartKind.localName;
            }
            else if (flags & SymbolFlags.Property) { return SymbolDisplayPartKind.propertyName; }
            else if (flags & SymbolFlags.EnumMember) { return SymbolDisplayPartKind.enumMemberName; }
            else if (flags & SymbolFlags.Function) { return SymbolDisplayPartKind.functionName; }
            else if (flags & SymbolFlags.Class) { return SymbolDisplayPartKind.className; }
            else if (flags & SymbolFlags.Interface) { return SymbolDisplayPartKind.interfaceName; }
            else if (flags & SymbolFlags.Enum) { return SymbolDisplayPartKind.enumName; }
            else if (flags & SymbolFlags.Module) { return SymbolDisplayPartKind.moduleName; }
            else if (flags & SymbolFlags.Method) { return SymbolDisplayPartKind.methodName; }
            else if (flags & SymbolFlags.TypeParameter) { return SymbolDisplayPartKind.typeParameterName; }

            return SymbolDisplayPartKind.text;
        }
    }

    function mapToDisplayParts(writeDisplayParts: (writer: DisplayPartsSymbolWriter) => void): SymbolDisplayPart[] {
        writeDisplayParts(displayPartWriter);
        var result = displayPartWriter.displayParts();
        displayPartWriter.clear();
        return result;
    }

    export function typeToDisplayParts(typechecker: TypeChecker, type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[] {
        return mapToDisplayParts(writer => {
            typechecker.writeType(type, writer, enclosingDeclaration, flags);
        });
    }

    export function symbolToDisplayParts(typeChecker: TypeChecker, symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): SymbolDisplayPart[] {
        return mapToDisplayParts(writer => {
            typeChecker.writeSymbol(symbol, writer, enclosingDeclaration, meaning, flags);
        });
    }

    function signatureToDisplayParts(typechecker: TypeChecker, signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[]{
        return mapToDisplayParts(writer => {
            typechecker.writeSignature(signature, writer, enclosingDeclaration, flags);
        });
    }

    export function getDefaultCompilerOptions(): CompilerOptions {
        // Set "ES5" target by default for language service
        return {
            target: ScriptTarget.ES5,
            module: ModuleKind.None,
        };
    }

    export function compareDataObjects(dst: any, src: any): boolean {
        for (var e in dst) {
            if (typeof dst[e] === "object") {
                if (!compareDataObjects(dst[e], src[e]))
                    return false;
            }
            else if (typeof dst[e] !== "function") {
                if (dst[e] !== src[e])
                    return false;
            }
        }
        return true;
    }

    export class OperationCanceledException { }

    export class CancellationTokenObject {

        public static None: CancellationTokenObject = new CancellationTokenObject(null)

        constructor(private cancellationToken: CancellationToken) {
        }

        public isCancellationRequested() {
            return this.cancellationToken && this.cancellationToken.isCancellationRequested();
        }

        public throwIfCancellationRequested(): void {
            if (this.isCancellationRequested()) {
                throw new OperationCanceledException();
            }
        }
    }

    // Cache host information about scrip Should be refreshed 
    // at each language service public entry point, since we don't know when 
    // set of scripts handled by the host changes.
    class HostCache {
        private filenameToEntry: Map<HostFileInformation>;
        private _compilationSettings: CompilerOptions;

        constructor(private host: LanguageServiceHost) {
            // script id => script index
            this.filenameToEntry = {};

            var filenames = host.getScriptFileNames();
            for (var i = 0, n = filenames.length; i < n; i++) {
                var filename = filenames[i];
                this.filenameToEntry[TypeScript.switchToForwardSlashes(filename)] = {
                    filename: filename,
                    version: host.getScriptVersion(filename),
                    isOpen: host.getScriptIsOpen(filename)
                };
            }

            this._compilationSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        }

        public compilationSettings() {
            return this._compilationSettings;
        }

        public getEntry(filename: string): HostFileInformation {
            filename = TypeScript.switchToForwardSlashes(filename);
            return lookUp(this.filenameToEntry, filename);
        }

        public contains(filename: string): boolean {
            return !!this.getEntry(filename);
        }

        public getHostfilename(filename: string) {
            var hostCacheEntry = this.getEntry(filename);
            if (hostCacheEntry) {
                return hostCacheEntry.filename;
            }
            return filename;
        }

        public getFilenames(): string[] {
            var fileNames: string[] = [];

            forEachKey(this.filenameToEntry, key => {
                if (hasProperty(this.filenameToEntry, key))
                    fileNames.push(key);
            });

            return fileNames;
        }

        public getVersion(filename: string): string {
            return this.getEntry(filename).version;
        }

        public isOpen(filename: string): boolean {
            return this.getEntry(filename).isOpen;
        }

        public getScriptSnapshot(filename: string): TypeScript.IScriptSnapshot {
            var file = this.getEntry(filename);
            if (!file.sourceText) {
                file.sourceText = this.host.getScriptSnapshot(file.filename);
            }
            return file.sourceText;
        }

        public getChangeRange(filename: string, lastKnownVersion: string, oldScriptSnapshot: TypeScript.IScriptSnapshot): TypeScript.TextChangeRange {
            var currentVersion = this.getVersion(filename);
            if (lastKnownVersion === currentVersion) {
                return TypeScript.TextChangeRange.unchanged; // "No changes"
            }

            var scriptSnapshot = this.getScriptSnapshot(filename);
            return scriptSnapshot.getChangeRange(oldScriptSnapshot);
        }
    }

    class SyntaxTreeCache {
        private hostCache: HostCache;

        // For our syntactic only features, we also keep a cache of the syntax tree for the 
        // currently edited file.  
        private currentFilename: string = "";
        private currentFileVersion: string = null;
        private currentSourceFile: SourceFile = null;
        private currentFileSyntaxTree: TypeScript.SyntaxTree = null;

        constructor(private host: LanguageServiceHost) {
            this.hostCache = new HostCache(host);
        }

        private initialize(filename: string) {
            // ensure that both source file and syntax tree are either initialized or not initialized
            Debug.assert(!!this.currentFileSyntaxTree === !!this.currentSourceFile);
            this.hostCache = new HostCache(this.host);

            var version = this.hostCache.getVersion(filename);
            var syntaxTree: TypeScript.SyntaxTree = null;
            var sourceFile: SourceFile;

            if (this.currentFileSyntaxTree === null || this.currentFilename !== filename) {
                var scriptSnapshot = this.hostCache.getScriptSnapshot(filename);
                syntaxTree = this.createSyntaxTree(filename, scriptSnapshot);
                sourceFile = createSourceFileFromScriptSnapshot(filename, scriptSnapshot, getDefaultCompilerOptions(), version, /*isOpen*/ true);

                fixupParentReferences(sourceFile);
            }
            else if (this.currentFileVersion !== version) {
                var scriptSnapshot = this.hostCache.getScriptSnapshot(filename);
                syntaxTree = this.updateSyntaxTree(filename, scriptSnapshot,
                    this.currentSourceFile.getScriptSnapshot(), this.currentFileSyntaxTree, this.currentFileVersion);

                var editRange = this.hostCache.getChangeRange(filename, this.currentFileVersion, this.currentSourceFile.getScriptSnapshot());
                sourceFile = !editRange 
                    ? createSourceFileFromScriptSnapshot(filename, scriptSnapshot, getDefaultCompilerOptions(), version, /*isOpen*/ true)
                    : this.currentSourceFile.update(scriptSnapshot, version, /*isOpen*/ true, editRange);

                fixupParentReferences(sourceFile);
            }

            if (syntaxTree !== null) {
                Debug.assert(sourceFile);
                // All done, ensure state is up to date
                this.currentFileVersion = version;
                this.currentFilename = filename;
                this.currentFileSyntaxTree = syntaxTree;
                this.currentSourceFile = sourceFile;
            }

            function fixupParentReferences(sourceFile: SourceFile) {
                // normally parent references are set during binding.
                // however here SourceFile data is used only for syntactic features so running the whole binding process is an overhead.
                // walk over the nodes and set parent references
                var parent: Node = sourceFile;
                function walk(n: Node): void {
                    n.parent = parent;

                    var saveParent = parent;
                    parent = n;
                    forEachChild(n, walk);
                    parent = saveParent;
                }
                forEachChild(sourceFile, walk);
            }
        }

        public getCurrentFileSyntaxTree(filename: string): TypeScript.SyntaxTree {
            this.initialize(filename);
            return this.currentFileSyntaxTree;
        }

        public getCurrentSourceFile(filename: string): SourceFile {
            this.initialize(filename);
            return this.currentSourceFile;
        }

        public getCurrentScriptSnapshot(filename: string): TypeScript.IScriptSnapshot {
            // update currentFileScriptSnapshot as a part of 'getCurrentFileSyntaxTree' call
            this.getCurrentFileSyntaxTree(filename);
            return this.getCurrentSourceFile(filename).getScriptSnapshot();
        }

        private createSyntaxTree(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot): TypeScript.SyntaxTree {
            var text = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);

            // For the purposes of features that use this syntax tree, we can just use the default
            // compilation settings.  The features only use the syntax (and not the diagnostics),
            // and the syntax isn't affected by the compilation settings.
            var syntaxTree = TypeScript.Parser.parse(filename, text, getDefaultCompilerOptions().target, TypeScript.isDTSFile(filename));

            return syntaxTree;
        }

        private updateSyntaxTree(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot, previousScriptSnapshot: TypeScript.IScriptSnapshot, previousSyntaxTree: TypeScript.SyntaxTree, previousFileVersion: string): TypeScript.SyntaxTree {
            var editRange = this.hostCache.getChangeRange(filename, previousFileVersion, previousScriptSnapshot);

            // Debug.assert(newLength >= 0);

            // The host considers the entire buffer changed.  So parse a completely new tree.
            if (editRange === null) {
                return this.createSyntaxTree(filename, scriptSnapshot);
            }

            var nextSyntaxTree = TypeScript.IncrementalParser.parse(
                previousSyntaxTree, editRange, TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot));

            this.ensureInvariants(filename, editRange, nextSyntaxTree, previousScriptSnapshot, scriptSnapshot);

            return nextSyntaxTree;
        }

        private ensureInvariants(filename: string, editRange: TypeScript.TextChangeRange, incrementalTree: TypeScript.SyntaxTree, oldScriptSnapshot: TypeScript.IScriptSnapshot, newScriptSnapshot: TypeScript.IScriptSnapshot) {
            // First, verify that the edit range and the script snapshots make sense.

            // If this fires, then the edit range is completely bogus.  Somehow the lengths of the
            // old snapshot, the change range and the new snapshot aren't in sync.  This is very
            // bad.
            var expectedNewLength = oldScriptSnapshot.getLength() - editRange.span().length() + editRange.newLength();
            var actualNewLength = newScriptSnapshot.getLength();

            function provideMoreDebugInfo() {

                var debugInformation = ["expected length:", expectedNewLength, "and actual length:", actualNewLength, "are not equal\r\n"];

                var oldSpan = editRange.span();

                function prettyPrintString(s: string): string {
                    return '"' + s.replace(/\r/g, '\\r').replace(/\n/g, '\\n') + '"';
                }

                debugInformation.push('Edit range (old text) (start: ' + oldSpan.start() + ', end: ' + oldSpan.end() + ') \r\n');
                debugInformation.push('Old text edit range contents: ' + prettyPrintString(oldScriptSnapshot.getText(oldSpan.start(), oldSpan.end())));

                var newSpan = editRange.newSpan();

                debugInformation.push('Edit range (new text) (start: ' + newSpan.start() + ', end: ' + newSpan.end() + ') \r\n');
                debugInformation.push('New text edit range contents: ' + prettyPrintString(newScriptSnapshot.getText(newSpan.start(), newSpan.end())));

                return debugInformation.join(' ');
            }

            Debug.assert(
                expectedNewLength === actualNewLength,
                "Expected length is different from actual!",
                provideMoreDebugInfo);

            if (Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
                // If this fires, the text change range is bogus.  It says the change starts at point 
                // 'X', but we can see a text difference *before* that point.
                var oldPrefixText = oldScriptSnapshot.getText(0, editRange.span().start());
                var newPrefixText = newScriptSnapshot.getText(0, editRange.span().start());
                Debug.assert(oldPrefixText === newPrefixText, 'Expected equal prefix texts!');

                // If this fires, the text change range is bogus.  It says the change goes only up to
                // point 'X', but we can see a text difference *after* that point.
                var oldSuffixText = oldScriptSnapshot.getText(editRange.span().end(), oldScriptSnapshot.getLength());
                var newSuffixText = newScriptSnapshot.getText(editRange.newSpan().end(), newScriptSnapshot.getLength());
                Debug.assert(oldSuffixText === newSuffixText, 'Expected equal suffix texts!');

                // Ok, text change range and script snapshots look ok.  Let's verify that our 
                // incremental parsing worked properly.
                //var normalTree = this.createSyntaxTree(filename, newScriptSnapshot);
                //Debug.assert(normalTree.structuralEquals(incrementalTree), 'Expected equal incremental and normal trees');

                // Ok, the trees looked good.  So at least our incremental parser agrees with the 
                // normal parser.  Now, verify that the incremental tree matches the contents of the 
                // script snapshot.
                var incrementalTreeText = TypeScript.fullText(incrementalTree.sourceUnit());
                var actualSnapshotText = newScriptSnapshot.getText(0, newScriptSnapshot.getLength());
                Debug.assert(incrementalTreeText === actualSnapshotText, 'Expected full texts to be equal');
            }
        }
    }

    function createSourceFileFromScriptSnapshot(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot, settings: CompilerOptions, version: string, isOpen: boolean) {
        return SourceFileObject.createSourceFileObject(filename, scriptSnapshot, settings.target, version, isOpen);
    }

    export function createDocumentRegistry(): DocumentRegistry {
        var buckets: Map<Map<DocumentRegistryEntry>> = {};

        function getKeyFromCompilationSettings(settings: CompilerOptions): string {
            return "_" + ScriptTarget[settings.target]; //  + "|" + settings.propagateEnumConstantoString()
        }

        function getBucketForCompilationSettings(settings: CompilerOptions, createIfMissing: boolean): Map<DocumentRegistryEntry> {
            var key = getKeyFromCompilationSettings(settings);
            var bucket = lookUp(buckets, key);
            if (!bucket && createIfMissing) {
                buckets[key] = bucket = {};
            }
            return bucket;
        }

        function reportStats() {
            var bucketInfoArray = Object.keys(buckets).filter(name => name && name.charAt(0) === '_').map(name => {
                var entries = lookUp(buckets, name);
                var sourceFiles: { name: string; refCount: number; references: string[]; }[] = [];
                for (var i in entries) {
                    var entry = entries[i];
                    sourceFiles.push({
                        name: i,
                        refCount: entry.refCount,
                        references: entry.owners.slice(0)
                    });
                }
                sourceFiles.sort((x, y) => y.refCount - x.refCount);
                return {
                    bucket: name,
                    sourceFiles: sourceFiles
                };
            });
            return JSON.stringify(bucketInfoArray, null, 2);
        }

        function acquireDocument(
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: TypeScript.IScriptSnapshot,
            version: string,
            isOpen: boolean): SourceFile {

            var bucket = getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ true);
            var entry = lookUp(bucket, filename);
            if (!entry) {
                var sourceFile = createSourceFileFromScriptSnapshot(filename, scriptSnapshot, compilationSettings, version, isOpen);

                bucket[filename] = entry = {
                    sourceFile: sourceFile,
                    refCount: 0,
                    owners: []
                };
            }
            entry.refCount++;

            return entry.sourceFile;
        }

        function updateDocument(
            sourceFile: SourceFile,
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: TypeScript.IScriptSnapshot,
            version: string,
            isOpen: boolean,
            textChangeRange: TypeScript.TextChangeRange
            ): SourceFile {

            var bucket = getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ false);
            Debug.assert(bucket);
            var entry = lookUp(bucket, filename);
            Debug.assert(entry);

            if (entry.sourceFile.isOpen === isOpen && entry.sourceFile.version === version) {
                return entry.sourceFile;
            }

            entry.sourceFile = entry.sourceFile.update(scriptSnapshot, version, isOpen, textChangeRange);
            return entry.sourceFile;
        }

        function releaseDocument(filename: string, compilationSettings: CompilerOptions): void {
            var bucket = getBucketForCompilationSettings(compilationSettings, false);
            Debug.assert(bucket);

            var entry = lookUp(bucket, filename);
            entry.refCount--;

            Debug.assert(entry.refCount >= 0);
            if (entry.refCount === 0) {
                delete bucket[filename];
            }
        }

        return {
            acquireDocument: acquireDocument,
            updateDocument: updateDocument,
            releaseDocument: releaseDocument,
            reportStats: reportStats
        };
    }

    /// Helpers
    export function getNodeModifiers(node: Node): string {
        var flags = node.flags;
        var result: string[] = [];

        if (flags & NodeFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
        if (flags & NodeFlags.Protected) result.push(ScriptElementKindModifier.protectedMemberModifier);
        if (flags & NodeFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
        if (flags & NodeFlags.Static) result.push(ScriptElementKindModifier.staticModifier);
        if (flags & NodeFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
        if (isInAmbientContext(node)) result.push(ScriptElementKindModifier.ambientModifier);

        return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
    }

    function getTargetLabel(referenceNode: Node, labelName: string): Identifier {
        while (referenceNode) {
            if (referenceNode.kind === SyntaxKind.LabeledStatement && (<LabeledStatement>referenceNode).label.text === labelName) {
                return (<LabeledStatement>referenceNode).label;
            }
            referenceNode = referenceNode.parent;
        }
        return undefined;
    }

    function isJumpStatementTarget(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            (node.parent.kind === SyntaxKind.BreakStatement || node.parent.kind === SyntaxKind.ContinueStatement) &&
            (<BreakOrContinueStatement>node.parent).label === node;
    }

    function isLabelOfLabeledStatement(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            node.parent.kind === SyntaxKind.LabeledStatement &&
            (<LabeledStatement>node.parent).label === node;
    }

    /**
     * Whether or not a 'node' is preceded by a label of the given string.
     * Note: 'node' cannot be a SourceFile.
     */
    function isLabeledBy(node: Node, labelName: string) {
        for (var owner = node.parent; owner.kind === SyntaxKind.LabeledStatement; owner = owner.parent) {
            if ((<LabeledStatement>owner).label.text === labelName) {
                return true;
            }
        }

        return false;
    }

    function isLabelName(node: Node): boolean {
        return isLabelOfLabeledStatement(node) || isJumpStatementTarget(node);
    }

    function isCallExpressionTarget(node: Node): boolean {
        if (node.parent.kind === SyntaxKind.PropertyAccess && (<PropertyAccess>node.parent).right === node)
            node = node.parent;
        return node.parent.kind === SyntaxKind.CallExpression && (<CallExpression>node.parent).func === node;
    }

    function isNewExpressionTarget(node: Node): boolean {
        if (node.parent.kind === SyntaxKind.PropertyAccess && (<PropertyAccess>node.parent).right === node)
            node = node.parent;
        return node.parent.kind === SyntaxKind.NewExpression && (<CallExpression>node.parent).func === node;
    }

    function isNameOfFunctionDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            isAnyFunction(node.parent) && (<FunctionDeclaration>node.parent).name === node;
    }

    /** Returns true if node is a name of an object literal property, e.g. "a" in x = { "a": 1 } */
    function isNameOfPropertyAssignment(node: Node): boolean {
        return (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NumericLiteral) &&
            node.parent.kind === SyntaxKind.PropertyAssignment && (<PropertyDeclaration>node.parent).name === node;
    }

    function isLiteralNameOfPropertyDeclarationOrIndexAccess(node: Node): boolean {
        if (node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NumericLiteral) {
            switch (node.parent.kind) {
                case SyntaxKind.Property:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.EnumMember:
                case SyntaxKind.Method:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.ModuleDeclaration:
                    return (<Declaration>node.parent).name === node;
                case SyntaxKind.IndexedAccess:
                    return (<IndexedAccess>node.parent).index === node;
            }
        }

        return false;
    }

    function isNameOfExternalModuleImportOrDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.StringLiteral &&
            ((node.parent.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node.parent).name === node) ||
            (node.parent.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node.parent).externalModuleName === node));
    }

    enum SemanticMeaning {
        None = 0x0,
        Value = 0x1,
        Type = 0x2,
        Namespace = 0x4,
        All = Value | Type | Namespace
    }

    enum BreakContinueSearchType {
        None = 0x0,
        Unlabeled = 0x1,
        Labeled = 0x2,
        All = Unlabeled | Labeled
    }

    // A cache of completion entries for keywords, these do not change between sessions
    var keywordCompletions:CompletionEntry[] = [];
    for (var i = SyntaxKind.FirstKeyword; i <= SyntaxKind.LastKeyword; i++) {
        keywordCompletions.push({
            name: tokenToString(i),
            kind: ScriptElementKind.keyword,
            kindModifiers: ScriptElementKindModifier.none
        });
    }

    export function createLanguageService(host: LanguageServiceHost, documentRegistry: DocumentRegistry): LanguageService {
        var syntaxTreeCache: SyntaxTreeCache = new SyntaxTreeCache(host);
        var formattingRulesProvider: TypeScript.Services.Formatting.RulesProvider;
        var hostCache: HostCache; // A cache of all the information about the files on the host side.
        var program: Program;

        // this checker is used to answer all LS questions except errors 
        var typeInfoResolver: TypeChecker;

        // the sole purpose of this checker is to return semantic diagnostics
        // creation is deferred - use getFullTypeCheckChecker to get instance
        var fullTypeCheckChecker_doNotAccessDirectly: TypeChecker;

        var useCaseSensitivefilenames = false;
        var sourceFilesByName: Map<SourceFile> = {};
        var documentRegistry = documentRegistry;
        var cancellationToken = new CancellationTokenObject(host.getCancellationToken());
        var activeCompletionSession: CompletionSession;         // The current active completion session, used to get the completion entry details
        var writer: (filename: string, data: string, writeByteOrderMark: boolean) => void = undefined;

        // Check if the localized messages json is set, otherwise query the host for it
        if (!localizedDiagnosticMessages) {
            localizedDiagnosticMessages = host.getLocalizedDiagnosticMessages();
        }

        function getSourceFile(filename: string): SourceFile {
            return lookUp(sourceFilesByName, filename);
        }

        function getFullTypeCheckChecker() {
            return fullTypeCheckChecker_doNotAccessDirectly || (fullTypeCheckChecker_doNotAccessDirectly = program.getTypeChecker(/*fullTypeCheck*/ true));
        }

        function createCompilerHost(): CompilerHost {
            return {
                getSourceFile: (filename, languageVersion) => {
                    var sourceFile = getSourceFile(filename);
                    return sourceFile && sourceFile.getSourceFile();
                },
                getCancellationToken: () => cancellationToken,
                getCanonicalFileName: (filename) => useCaseSensitivefilenames ? filename : filename.toLowerCase(),
                useCaseSensitiveFileNames: () => useCaseSensitivefilenames,
                getNewLine: () => "\r\n",
                getDefaultLibFilename: (): string => {
                    return host.getDefaultLibFilename();
                },
                writeFile: (filename, data, writeByteOrderMark) => {
                    writer(filename, data, writeByteOrderMark);
                },
                getCurrentDirectory: (): string => {
                    return host.getCurrentDirectory();
                }
            };
        }

        function sourceFileUpToDate(sourceFile: SourceFile): boolean {
            return sourceFile && sourceFile.version === hostCache.getVersion(sourceFile.filename) && sourceFile.isOpen === hostCache.isOpen(sourceFile.filename);
        }

        function programUpToDate(): boolean {
            // If we haven't create a program yet, then it is not up-to-date
            if (!program) {
                return false;
            }

            // If number of files in the program do not match, it is not up-to-date
            var hostFilenames = hostCache.getFilenames();
            if (program.getSourceFiles().length !== hostFilenames.length) {
                return false;
            }

            // If any file is not up-to-date, then the whole program is not up-to-date
            for (var i = 0, n = hostFilenames.length; i < n; i++) {
                if (!sourceFileUpToDate(program.getSourceFile(hostFilenames[i]))) {
                    return false;
                }
            }

            // If the compilation settings do no match, then the program is not up-to-date
            return compareDataObjects(program.getCompilerOptions(), hostCache.compilationSettings());
        }

        function synchronizeHostData(): void {
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

                var changesInCompilationSettingsAffectSyntax =
                    oldSettings && compilationSettings && !compareDataObjects(oldSettings, compilationSettings) && settingsChangeAffectsSyntax;
                var oldSourceFiles = program.getSourceFiles();

                for (var i = 0, n = oldSourceFiles.length; i < n; i++) {
                    cancellationToken.throwIfCancellationRequested();
                    var filename = oldSourceFiles[i].filename;
                    if (!hostCache.contains(filename) || changesInCompilationSettingsAffectSyntax) {
                        documentRegistry.releaseDocument(filename, oldSettings);
                        delete sourceFilesByName[filename];
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
                var isOpen = hostCache.isOpen(filename);
                var scriptSnapshot = hostCache.getScriptSnapshot(filename);

                var sourceFile: SourceFile = getSourceFile(filename);
                if (sourceFile) {
                    //
                    // If the sourceFile is the same, assume no update
                    //
                    if (sourceFileUpToDate(sourceFile)) {
                        continue;
                    }

                    // Only perform incremental parsing on open files that are being edited.  If a file was
                    // open, but is now closed, we want to re-parse entirely so we don't have any tokens that
                    // are holding onto expensive script snapshot instances on the host.  Similarly, if a 
                    // file was closed, then we always want to re-parse.  This is so our tree doesn't keep 
                    // the old buffer alive that represented the file on disk (as the host has moved to a 
                    // new text buffer).
                    var textChangeRange: TypeScript.TextChangeRange = null;
                    if (sourceFile.isOpen && isOpen) {
                        textChangeRange = hostCache.getChangeRange(filename, sourceFile.version, sourceFile.getScriptSnapshot());
                    }

                    sourceFile = documentRegistry.updateDocument(sourceFile, filename, compilationSettings, scriptSnapshot, version, isOpen, textChangeRange);
                }
                else {
                    sourceFile = documentRegistry.acquireDocument(filename, compilationSettings, scriptSnapshot, version, isOpen);
                }

                // Remember the new sourceFile
                sourceFilesByName[filename] = sourceFile;
            }

            // Now create a new compiler
            program = createProgram(hostfilenames, compilationSettings, createCompilerHost());
            typeInfoResolver = program.getTypeChecker(/*fullTypeCheckMode*/ false);
            fullTypeCheckChecker_doNotAccessDirectly = undefined;
        }

        /**
         * Clean up any semantic caches that are not needed. 
         * The host can call this method if it wants to jettison unused memory.
         * We will just dump the typeChecker and recreate a new one. this should have the effect of destroying all the semantic caches.
         */
        function cleanupSemanticCache(): void {
            if (program) {
                typeInfoResolver = program.getTypeChecker(/*fullTypeCheckMode*/ false);
                fullTypeCheckChecker_doNotAccessDirectly = undefined;
            }
        }

        function dispose(): void {
            if (program) {
                forEach(program.getSourceFiles(),
                    (f) => { documentRegistry.releaseDocument(f.filename, program.getCompilerOptions()); });
            }
        }

        /// Diagnostics
        function getSyntacticDiagnostics(filename: string) {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);

            return program.getDiagnostics(getSourceFile(filename).getSourceFile());
        }

        /**
         * getSemanticDiagnostiscs return array of Diagnostics. If '-d' is not enabled, only report semantic errors
         * If '-d' enabled, report both semantic and emitter errors  
         */
        function getSemanticDiagnostics(filename: string) {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename)
            var compilerOptions = program.getCompilerOptions();
            var checker = getFullTypeCheckChecker();
            var targetSourceFile = getSourceFile(filename);

            // Only perform the action per file regardless of '-out' flag as LanguageServiceHost is expected to call this function per file.
            // Therefore only get diagnostics for given file.

            var allDiagnostics = checker.getDiagnostics(targetSourceFile);
            if (compilerOptions.declaration) {
                // If '-d' is enabled, check for emitter error. One example of emitter error is export class implements non-export interface
                // Get emitter-diagnostics requires calling TypeChecker.emitFiles so we have to define CompilerHost.writer which does nothing because emitFiles function has side effects defined by CompilerHost.writer
                var savedWriter = writer;
                writer = (filename: string, data: string, writeByteOrderMark: boolean) => { };
                allDiagnostics = allDiagnostics.concat(checker.emitFiles(targetSourceFile).errors);
                writer = savedWriter;
            }
            return allDiagnostics
        }

        function getCompilerOptionsDiagnostics() {
            synchronizeHostData();
            return program.getGlobalDiagnostics();
        }

        /// Completion
        function getValidCompletionEntryDisplayName(symbol: Symbol, target: ScriptTarget): string {
            var displayName = symbol.getName();
            if (displayName && displayName.length > 0) {
                var firstCharCode = displayName.charCodeAt(0);
                // First check of the displayName is not external module; if it is an external module, it is not valid entry
                if ((symbol.flags & SymbolFlags.Namespace) && (firstCharCode === CharacterCodes.singleQuote || firstCharCode === CharacterCodes.doubleQuote)) {
                    // If the symbol is external module, don't show it in the completion list
                    // (i.e declare module "http" { var x; } | // <= request completion here, "http" should not be there)
                    return undefined;
                }

                if (displayName && displayName.length >= 2 && firstCharCode === displayName.charCodeAt(displayName.length - 1) &&
                    (firstCharCode === CharacterCodes.singleQuote || firstCharCode === CharacterCodes.doubleQuote)) {
                    // If the user entered name for the symbol was quoted, removing the quotes is not enough, as the name could be an
                    // invalid identifier name. We need to check if whatever was inside the quotes is actually a valid identifier name.
                    displayName = displayName.substring(1, displayName.length - 1);
                }
                
                var isValid = isIdentifierStart(displayName.charCodeAt(0), target);
                for (var i = 1, n = displayName.length; isValid && i < n; i++) {
                    isValid = isIdentifierPart(displayName.charCodeAt(i), target);
                }


                if (isValid) {
                    return displayName;
                }
            }

            return undefined;
        }

        function createCompletionEntry(symbol: Symbol, typeChecker: TypeChecker): CompletionEntry {
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
                kind: getSymbolKind(symbol, typeChecker),
                kindModifiers: getSymbolModifiers(symbol)
            };
        }

        function getCompletionsAtPosition(filename: string, position: number, isMemberCompletion: boolean) {
            function getCompletionEntriesFromSymbols(symbols: Symbol[], session: CompletionSession): void {
                forEach(symbols, symbol => {
                    var entry = createCompletionEntry(symbol, session.typeChecker);
                    if (entry && !lookUp(session.symbols, entry.name)) {
                        session.entries.push(entry);
                        session.symbols[entry.name] = symbol;
                    }
                });
            }

            function isCompletionListBlocker(sourceUnit: TypeScript.SourceUnitSyntax, position: number): boolean {
                // We shouldn't be getting a position that is outside the file because
                // isEntirelyInsideComment can't handle when the position is out of bounds, 
                // callers should be fixed, however we should be resilient to bad inputs
                // so we return true (this position is a blocker for getting completions)
                if (position < 0 || position > TypeScript.fullWidth(sourceUnit)) {
                    return true;
                }

                // This method uses Fidelity completely. Some information can be reached using the AST, but not everything.
                return TypeScript.Syntax.isEntirelyInsideComment(sourceUnit, position) ||
                    TypeScript.Syntax.isEntirelyInStringOrRegularExpressionLiteral(sourceUnit, position) ||
                    isIdentifierDefinitionLocation(sourceUnit, position) ||
                    isRightOfIllegalDot(sourceUnit, position);
            }

            function getContainingObjectLiteralApplicableForCompletion(sourceUnit: TypeScript.SourceUnitSyntax, position: number): TypeScript.ISyntaxElement {
                // The locations in an object literal expression that are applicable for completion are property name definition locations.
                var previousToken = getNonIdentifierCompleteTokenOnLeft(sourceUnit, position);

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

                return undefined;
            }

            function isIdentifierDefinitionLocation(sourceUnit: TypeScript.SourceUnitSyntax, position: number): boolean {
                var positionedToken = getNonIdentifierCompleteTokenOnLeft(sourceUnit, position);

                if (positionedToken) {
                    var containingNodeKind = TypeScript.Syntax.containingNode(positionedToken) && TypeScript.Syntax.containingNode(positionedToken).kind();
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

            function getNonIdentifierCompleteTokenOnLeft(sourceUnit: TypeScript.SourceUnitSyntax, position: number): TypeScript.ISyntaxToken {
                var positionedToken = TypeScript.Syntax.findCompleteTokenOnLeft(sourceUnit, position, /*includeSkippedTokens*/true);

                if (positionedToken && position === TypeScript.end(positionedToken) && positionedToken.kind() == TypeScript.SyntaxKind.EndOfFileToken) {
                    // EndOfFile token is not interesting, get the one before it
                    positionedToken = TypeScript. previousToken(positionedToken, /*includeSkippedTokens*/true);
                }

                if (positionedToken && position === TypeScript.end(positionedToken) && positionedToken.kind() === TypeScript.SyntaxKind.IdentifierName) {
                    // The caret is at the end of an identifier, the decision to provide completion depends on the previous token
                    positionedToken = TypeScript.previousToken(positionedToken, /*includeSkippedTokens*/true);
                }

                return positionedToken;
            }

            function isRightOfIllegalDot(sourceUnit: TypeScript.SourceUnitSyntax, position: number): boolean {
                var positionedToken = getNonIdentifierCompleteTokenOnLeft(sourceUnit, position);

                if (positionedToken) {
                    switch (positionedToken.kind()) {
                        case TypeScript.SyntaxKind.DotToken:
                            var leftOfDotPositionedToken = TypeScript.previousToken(positionedToken, /*includeSkippedTokens*/true);
                            return leftOfDotPositionedToken && leftOfDotPositionedToken.kind() === TypeScript.SyntaxKind.NumericLiteral;

                        case TypeScript.SyntaxKind.NumericLiteral:
                            var text = positionedToken.text();
                            return text.charAt(text.length - 1) === ".";
                    }
                }

                return false;
            }

            function isPunctuation(kind: SyntaxKind) {
                return (SyntaxKind.FirstPunctuation <= kind && kind <= SyntaxKind.LastPunctuation);
            }

            function filterContextualMembersList(contextualMemberSymbols: Symbol[], existingMembers: Declaration[]): Symbol[] {
                if (!existingMembers || existingMembers.length === 0) {
                    return contextualMemberSymbols;
                }

                var existingMemberNames: Map<boolean> = {};
                forEach(existingMembers, m => {
                    if (m.kind !== SyntaxKind.PropertyAssignment) {
                        // Ignore omitted expressions for missing members in the object literal
                        return;
                    }

                    if (m.getStart() <= position && position <= m.getEnd()) {
                        // If this is the current item we are editing right now, do not filter it out
                        return;
                    }

                    existingMemberNames[m.name.text] = true;
                });

                var filteredMembers: Symbol[] = [];
                forEach(contextualMemberSymbols, s => {
                    if (!existingMemberNames[s.name]) {
                        filteredMembers.push(s);
                    }
                });

                return filteredMembers;
            }

            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);

            var sourceFile = getSourceFile(filename);
            var sourceUnit = sourceFile.getSourceUnit();

            if (isCompletionListBlocker(sourceFile.getSyntaxTree().sourceUnit(), position)) {
                host.log("Returning an empty list because completion was blocked.");
                return null;
            }

            var node = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position, /*useTrailingTriviaAsLimChar*/ true, /*forceInclusive*/ true);

            if (node && node.kind() === TypeScript.SyntaxKind.IdentifierName &&
                TypeScript.start(node) === TypeScript.end(node)) {
                // Ignore missing name nodes
                node = node.parent;
            }

            var isRightOfDot = false;
            if (node &&
                node.kind() === TypeScript.SyntaxKind.MemberAccessExpression &&
                TypeScript.end((<TypeScript.MemberAccessExpressionSyntax>node).expression) < position) {

                isRightOfDot = true;
                node = (<TypeScript.MemberAccessExpressionSyntax>node).expression;
            }
            else if (node &&
                node.kind() === TypeScript.SyntaxKind.QualifiedName &&
                TypeScript.end((<TypeScript.QualifiedNameSyntax>node).left) < position) {

                isRightOfDot = true;
                node = (<TypeScript.QualifiedNameSyntax>node).left;
            }
            else if (node && node.parent &&
                node.kind() === TypeScript.SyntaxKind.IdentifierName &&
                node.parent.kind() === TypeScript.SyntaxKind.MemberAccessExpression &&
                (<TypeScript.MemberAccessExpressionSyntax>node.parent).name === node) {

                isRightOfDot = true;
                node = (<TypeScript.MemberAccessExpressionSyntax>node.parent).expression;
            }
            else if (node && node.parent &&
                node.kind() === TypeScript.SyntaxKind.IdentifierName &&
                node.parent.kind() === TypeScript.SyntaxKind.QualifiedName &&
                (<TypeScript.QualifiedNameSyntax>node.parent).right === node) {

                isRightOfDot = true;
                node = (<TypeScript.QualifiedNameSyntax>node.parent).left;
            }

            // TODO: this is a hack for now, we need a proper walking mechanism to verify that we have the correct node
            var precedingToken = findTokenOnLeftOfPosition(sourceFile, TypeScript.end(node));
            var mappedNode: Node;
            if (!precedingToken) {
                mappedNode = sourceFile;
            }
            else if (isPunctuation(precedingToken.kind)) {
                mappedNode = precedingToken.parent;
            }
            else {
                mappedNode = precedingToken;
            }

            Debug.assert(mappedNode, "Could not map a Fidelity node to an AST node");

            // Get the completions
            activeCompletionSession = {
                filename: filename,
                position: position,
                entries: [],
                symbols: {},
                location: mappedNode,
                typeChecker: typeInfoResolver
            };

            // Right of dot member completion list
            if (isRightOfDot) {
                var symbols: Symbol[] = [];
                isMemberCompletion = true;

                if (mappedNode.kind === SyntaxKind.Identifier || mappedNode.kind === SyntaxKind.QualifiedName || mappedNode.kind === SyntaxKind.PropertyAccess) {
                    var symbol = typeInfoResolver.getSymbolInfo(mappedNode);

                    // This is an alias, follow what it aliases
                    if (symbol && symbol.flags & SymbolFlags.Import) {
                        symbol = typeInfoResolver.getAliasedSymbol(symbol);
                    }

                    if (symbol && symbol.flags & SymbolFlags.HasExports) {
                        // Extract module or enum members
                        forEachValue(symbol.exports, symbol => {
                            if (typeInfoResolver.isValidPropertyAccess(<PropertyAccess>(mappedNode.parent), symbol.name)) {
                                symbols.push(symbol);
                            }
                        });
                    }
                }

                var type = typeInfoResolver.getTypeOfNode(mappedNode);
                var apparentType = type && typeInfoResolver.getApparentType(type);
                if (apparentType) {
                    // Filter private properties
                    forEach(apparentType.getApparentProperties(), symbol => {
                        if (typeInfoResolver.isValidPropertyAccess(<PropertyAccess>(mappedNode.parent), symbol.name)) {
                            symbols.push(symbol);
                        }
                    });
                }

                getCompletionEntriesFromSymbols(symbols, activeCompletionSession);
            }
            else {
                var containingObjectLiteral = getContainingObjectLiteralApplicableForCompletion(sourceFile.getSyntaxTree().sourceUnit(), position);

                // Object literal expression, look up possible property names from contextual type
                if (containingObjectLiteral) {
                    var objectLiteral = <ObjectLiteral>(mappedNode.kind === SyntaxKind.ObjectLiteral ? mappedNode : getAncestor(mappedNode, SyntaxKind.ObjectLiteral));

                    Debug.assert(objectLiteral);

                    isMemberCompletion = true;

                    var contextualType = typeInfoResolver.getContextualType(objectLiteral);
                    if (!contextualType) {
                        return undefined;
                    }

                    var contextualTypeMembers = typeInfoResolver.getPropertiesOfType(contextualType);
                    if (contextualTypeMembers && contextualTypeMembers.length > 0) {
                        // Add filtered items to the completion list
                        var filteredMembers = filterContextualMembersList(contextualTypeMembers, objectLiteral.properties);
                        getCompletionEntriesFromSymbols(filteredMembers, activeCompletionSession);
                    }
                }
                // Get scope members
                else {
                    isMemberCompletion = false;
                    /// TODO filter meaning based on the current context
                    var symbolMeanings = SymbolFlags.Type | SymbolFlags.Value | SymbolFlags.Namespace | SymbolFlags.Import;
                    var symbols = typeInfoResolver.getSymbolsInScope(mappedNode, symbolMeanings);

                    getCompletionEntriesFromSymbols(symbols, activeCompletionSession);
                }
            }

            // Add keywords if this is not a member completion list
            if (!isMemberCompletion) {
                Array.prototype.push.apply(activeCompletionSession.entries, keywordCompletions);
            }

            return {
                isMemberCompletion: isMemberCompletion,
                entries: activeCompletionSession.entries
            };
        }

        function getCompletionEntryDetails(filename: string, position: number, entryName: string): CompletionEntryDetails {
            // Note: No need to call synchronizeHostData, as we have captured all the data we need
            //       in the getCompletionsAtPosition earlier
            filename = TypeScript.switchToForwardSlashes(filename);

            var session = activeCompletionSession;

            // Ensure that the current active completion session is still valid for this request
            if (!session || session.filename !== filename || session.position !== position) {
                return undefined;
            }

            var symbol = lookUp(activeCompletionSession.symbols, entryName);
            if (symbol) {
                var type = session.typeChecker.getTypeOfSymbol(symbol);
                Debug.assert(type, "Could not find type for symbol");
                var completionEntry = createCompletionEntry(symbol, session.typeChecker);
                // TODO(drosen): Right now we just permit *all* semantic meanings when calling 'getSymbolKind'
                //               which is permissible given that it is backwards compatible; but really we should consider
                //               passing the meaning for the node so that we don't report that a suggestion for a value is an interface.
                //               We COULD also just do what 'getSymbolModifiers' does, which is to use the first declaration.
                var displayPartsDocumentationsAndSymbolKind = getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, getSourceFile(filename), session.location, session.typeChecker, session.location, SemanticMeaning.All);
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
                    displayParts: [displayPart(entryName, SymbolDisplayPartKind.keyword)],
                    documentation: undefined
                };
            }
        }

        function getContainerNode(node: Node): Node {
            while (true) {
                node = node.parent;
                if (!node) {
                    return node;
                }
                switch (node.kind) {
                    case SyntaxKind.SourceFile:
                    case SyntaxKind.Method:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                        return node;
                }
            }
        }

        // TODO(drosen): use contextual SemanticMeaning.
        function getSymbolKind(symbol: Symbol, typeResolver: TypeChecker): string {
            var flags = typeInfoResolver.getRootSymbols(symbol)[0].getFlags();

            if (flags & SymbolFlags.Class) return ScriptElementKind.classElement;
            if (flags & SymbolFlags.Enum) return ScriptElementKind.enumElement;
            if (flags & SymbolFlags.Interface) return ScriptElementKind.interfaceElement;
            if (flags & SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
            
            var result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, flags, typeResolver);
            if (result === ScriptElementKind.unknown) {
                if (flags & SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
                if (flags & SymbolFlags.EnumMember) return ScriptElementKind.variableElement;
                if (flags & SymbolFlags.Import) return ScriptElementKind.alias;
            }

            return result;
        }

        function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol: Symbol, flags: SymbolFlags, typeResolver: TypeChecker) {
            if (typeResolver.isUndefinedSymbol(symbol)) {
                return ScriptElementKind.variableElement;
            }
            if (typeResolver.isArgumentsSymbol(symbol)) {
                return ScriptElementKind.localVariableElement;
            }
            if (flags & SymbolFlags.Variable) {
                if (isFirstDeclarationOfSymbolParameter(symbol)) {
                    return ScriptElementKind.parameterElement;
                }
                return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localVariableElement : ScriptElementKind.variableElement;
            }
            if (flags & SymbolFlags.Function) return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
            if (flags & SymbolFlags.GetAccessor) return ScriptElementKind.memberGetAccessorElement;
            if (flags & SymbolFlags.SetAccessor) return ScriptElementKind.memberSetAccessorElement;
            if (flags & SymbolFlags.Method) return ScriptElementKind.memberFunctionElement;
            if (flags & SymbolFlags.Property) return ScriptElementKind.memberVariableElement;
            if (flags & SymbolFlags.Constructor) return ScriptElementKind.constructorImplementationElement;

            return ScriptElementKind.unknown;
        }
        
        function getTypeKind(type: Type): string {
            var flags = type.getFlags();

            if (flags & TypeFlags.Enum) return ScriptElementKind.enumElement;
            if (flags & TypeFlags.Class) return ScriptElementKind.classElement;
            if (flags & TypeFlags.Interface) return ScriptElementKind.interfaceElement;
            if (flags & TypeFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
            if (flags & TypeFlags.Intrinsic) return ScriptElementKind.primitiveType;
            if (flags & TypeFlags.StringLiteral) return ScriptElementKind.primitiveType;

            return ScriptElementKind.unknown;
        }

        function getNodeKind(node: Node): string {
            switch (node.kind) {
                case SyntaxKind.ModuleDeclaration: return ScriptElementKind.moduleElement;
                case SyntaxKind.ClassDeclaration: return ScriptElementKind.classElement;
                case SyntaxKind.InterfaceDeclaration: return ScriptElementKind.interfaceElement;
                case SyntaxKind.EnumDeclaration: return ScriptElementKind.enumElement;
                case SyntaxKind.VariableDeclaration: return ScriptElementKind.variableElement;
                case SyntaxKind.FunctionDeclaration: return ScriptElementKind.functionElement;
                case SyntaxKind.GetAccessor: return ScriptElementKind.memberGetAccessorElement;
                case SyntaxKind.SetAccessor: return ScriptElementKind.memberSetAccessorElement;
                case SyntaxKind.Method: return ScriptElementKind.memberFunctionElement;
                case SyntaxKind.Property: return ScriptElementKind.memberVariableElement;
                case SyntaxKind.IndexSignature: return ScriptElementKind.indexSignatureElement;
                case SyntaxKind.ConstructSignature: return ScriptElementKind.constructSignatureElement;
                case SyntaxKind.CallSignature: return ScriptElementKind.callSignatureElement;
                case SyntaxKind.Constructor: return ScriptElementKind.constructorImplementationElement;
                case SyntaxKind.TypeParameter: return ScriptElementKind.typeParameterElement;
                case SyntaxKind.EnumMember: return ScriptElementKind.variableElement;
                case SyntaxKind.Parameter: return (node.flags & NodeFlags.AccessibilityModifier) ? ScriptElementKind.memberVariableElement : ScriptElementKind.parameterElement;
                    return ScriptElementKind.unknown;
            }
        }

        function getSymbolModifiers(symbol: Symbol): string {
            return symbol && symbol.declarations && symbol.declarations.length > 0
                ? getNodeModifiers(symbol.declarations[0])
                : ScriptElementKindModifier.none;
        }

        function getSymbolDisplayPartsDocumentationAndSymbolKind(symbol: Symbol, sourceFile: SourceFile, enclosingDeclaration: Node,
            typeResolver: TypeChecker, location: Node,
            // TODO(drosen): Currently completion entry details passes the SemanticMeaning.All instead of using semanticMeaning of location
            semanticMeaning = getMeaningFromLocation(location)) {
            var displayParts: SymbolDisplayPart[] = [];
            var documentation: SymbolDisplayPart[];
            var symbolFlags = typeResolver.getRootSymbols(symbol)[0].flags;
            var symbolKind = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, symbolFlags, typeResolver);
            var hasAddedSymbolInfo: boolean;
            // Class at constructor site need to be shown as constructor apart from property,method, vars
            if (symbolKind !== ScriptElementKind.unknown || symbolFlags & SymbolFlags.Class || symbolFlags & SymbolFlags.Import) {
                // If it is accessor they are allowed only if location is at name of the accessor
                if (symbolKind === ScriptElementKind.memberGetAccessorElement || symbolKind === ScriptElementKind.memberSetAccessorElement) {
                    symbolKind = ScriptElementKind.memberVariableElement;
                }

                var type = typeResolver.getTypeOfSymbol(symbol);
                if (type) {
                    if (isCallExpressionTarget(location) || isNewExpressionTarget(location)) {
                        // try get the call/construct signature from the type if it matches
                        var callExpression: CallExpression;
                        if (location.parent.kind === SyntaxKind.PropertyAccess && (<PropertyAccess>location.parent).right === location) {
                            location = location.parent;
                        }
                        callExpression = <CallExpression>location.parent;

                        var candidateSignatures: Signature[] = [];
                        signature = typeResolver.getResolvedSignature(callExpression, candidateSignatures);
                        if (!signature && candidateSignatures.length) {
                            // Use the first candidate:
                            signature = candidateSignatures[0];
                        }

                        var useConstructSignatures = callExpression.kind === SyntaxKind.NewExpression || callExpression.func.kind === SyntaxKind.SuperKeyword;
                        var allSignatures = useConstructSignatures ? type.getConstructSignatures() : type.getCallSignatures();

                        if (!contains(allSignatures, signature.target || signature)) {
                            // Get the first signature if there 
                            signature = allSignatures.length ? allSignatures[0] : undefined;
                        }

                        if (signature) {
                            if (useConstructSignatures && (symbolFlags & SymbolFlags.Class)) {
                                // Constructor
                                symbolKind = ScriptElementKind.constructorImplementationElement;
                                addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                            }
                            else if (symbolFlags & SymbolFlags.Import) {
                                symbolKind = ScriptElementKind.alias;
                                displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                                displayParts.push(textPart(symbolKind));
                                displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                                displayParts.push(spacePart());
                                if (useConstructSignatures) {
                                    displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                                    displayParts.push(spacePart());
                                }
                                addFullSymbolName(symbol);
                            }
                            else {
                                addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                            }

                            switch (symbolKind) {
                                case ScriptElementKind.memberVariableElement:
                                case ScriptElementKind.variableElement:
                                case ScriptElementKind.parameterElement:
                                case ScriptElementKind.localVariableElement:
                                    // If it is call or construct signature of lambda's write type name
                                    displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                                    displayParts.push(spacePart());
                                    if (useConstructSignatures) {
                                        displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                                        displayParts.push(spacePart());
                                    }
                                    if (!(type.flags & TypeFlags.Anonymous)) {
                                        displayParts.push.apply(displayParts, symbolToDisplayParts(typeResolver, type.symbol, enclosingDeclaration, /*meaning*/ undefined, SymbolFormatFlags.WriteTypeParametersOrArguments));
                                    }
                                    addSignatureDisplayParts(signature, allSignatures, TypeFormatFlags.WriteArrowStyleSignature);
                                    break;

                                default:
                                    // Just signature
                                    addSignatureDisplayParts(signature, allSignatures);
                            }
                            hasAddedSymbolInfo = true;
                        }
                    }
                    else if ((isNameOfFunctionDeclaration(location) && !(symbol.flags & SymbolFlags.Accessor)) || // name of function declaration
                        (location.kind === SyntaxKind.ConstructorKeyword && location.parent.kind === SyntaxKind.Constructor)) { // At constructor keyword of constructor declaration
                        // get the signature from the declaration and write it
                        var signature: Signature;
                        var functionDeclaration = <FunctionDeclaration>location.parent;
                        var allSignatures = functionDeclaration.kind === SyntaxKind.Constructor ? type.getConstructSignatures() : type.getCallSignatures();
                        if (!typeResolver.isImplementationOfOverload(functionDeclaration)) {
                            signature = typeResolver.getSignatureFromDeclaration(functionDeclaration);
                        }
                        else {
                            signature = allSignatures[0];
                        }

                        if (functionDeclaration.kind === SyntaxKind.Constructor) {
                            // show (constructor) Type(...) signature
                            addPrefixForAnyFunctionOrVar(type.symbol, ScriptElementKind.constructorImplementationElement);
                        }
                        else {
                            // (function/method) symbol(..signature)
                            addPrefixForAnyFunctionOrVar(functionDeclaration.kind === SyntaxKind.CallSignature &&
                                !(type.symbol.flags & SymbolFlags.TypeLiteral || type.symbol.flags & SymbolFlags.ObjectLiteral) ? type.symbol : symbol, symbolKind);
                        }

                        addSignatureDisplayParts(signature, allSignatures);
                        hasAddedSymbolInfo = true;
                    }
                }
            }
            if (symbolFlags & SymbolFlags.Class && !hasAddedSymbolInfo) {
                displayParts.push(keywordPart(SyntaxKind.ClassKeyword));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                writeTypeParametersOfSymbol(symbol, sourceFile);
            }
            if ((symbolFlags & SymbolFlags.Interface) && (semanticMeaning & SemanticMeaning.Type)) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(keywordPart(SyntaxKind.InterfaceKeyword));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                writeTypeParametersOfSymbol(symbol, sourceFile);
            }
            if (symbolFlags & SymbolFlags.Enum) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(keywordPart(SyntaxKind.EnumKeyword));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
            }
            if (symbolFlags & SymbolFlags.Module) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(keywordPart(SyntaxKind.ModuleKeyword));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
            }
            if ((symbolFlags & SymbolFlags.TypeParameter) && (semanticMeaning & SemanticMeaning.Type)) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                displayParts.push(textPart("type parameter"));
                displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                displayParts.push(spacePart());
                displayParts.push(keywordPart(SyntaxKind.InKeyword));
                displayParts.push(spacePart());
                if (symbol.parent) {
                    // Class/Interface type parameter
                    addFullSymbolName(symbol.parent, enclosingDeclaration);
                    writeTypeParametersOfSymbol(symbol.parent, enclosingDeclaration);
                }
                else {
                    // Method/function type parameter
                    var signatureDeclaration = <SignatureDeclaration>getDeclarationOfKind(symbol, SyntaxKind.TypeParameter).parent;
                    var signature = typeResolver.getSignatureFromDeclaration(signatureDeclaration);
                    if (signatureDeclaration.kind === SyntaxKind.ConstructSignature) {
                        displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                        displayParts.push(spacePart());
                    }
                    else if (signatureDeclaration.kind !== SyntaxKind.CallSignature && signatureDeclaration.name) {
                        addFullSymbolName(signatureDeclaration.symbol);
                    }
                    displayParts.push.apply(displayParts, signatureToDisplayParts(typeResolver, signature, sourceFile, TypeFormatFlags.WriteTypeArgumentsOfSignature));
                }
            }
            if (symbolFlags & SymbolFlags.EnumMember) {
                addPrefixForAnyFunctionOrVar(symbol, "enum member");
                var declaration = symbol.declarations[0];
                if (declaration.kind === SyntaxKind.EnumMember) {
                    var constantValue = typeResolver.getEnumMemberValue(<EnumMember>declaration);
                    if (constantValue !== undefined) {
                        displayParts.push(spacePart());
                        displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                        displayParts.push(spacePart());
                        displayParts.push(displayPart(constantValue.toString(), SymbolDisplayPartKind.numericLiteral));
                    }
                }
            }
            if (symbolFlags & SymbolFlags.Import) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(keywordPart(SyntaxKind.ImportKeyword));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                displayParts.push(spacePart());
                displayParts.push(punctuationPart(SyntaxKind.EqualsToken));
                displayParts.push(spacePart());
                ts.forEach(symbol.declarations, declaration => {
                    if (declaration.kind === SyntaxKind.ImportDeclaration) {
                        var importDeclaration = <ImportDeclaration>declaration;
                        if (importDeclaration.externalModuleName) {
                            displayParts.push(keywordPart(SyntaxKind.RequireKeyword));
                            displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                            displayParts.push(displayPart(getTextOfNode(importDeclaration.externalModuleName), SymbolDisplayPartKind.stringLiteral));
                            displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                        }
                        else {
                            var internalAliasSymbol = typeResolver.getSymbolInfo(importDeclaration.entityName);
                            addFullSymbolName(internalAliasSymbol, enclosingDeclaration);
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
                        if (symbolKind === ScriptElementKind.memberVariableElement ||
                            symbolFlags & SymbolFlags.Variable ||
                            symbolKind === ScriptElementKind.localVariableElement) {
                            displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                            displayParts.push(spacePart());
                            // If the type is type parameter, format it specially
                            if (type.symbol && type.symbol.flags & SymbolFlags.TypeParameter) {
                                var typeParameterParts = mapToDisplayParts(writer => {
                                    typeResolver.writeTypeParameter(<TypeParameter>type, writer, enclosingDeclaration);
                                });
                                displayParts.push.apply(displayParts, typeParameterParts);
                            }
                            else {
                                displayParts.push.apply(displayParts, typeToDisplayParts(typeResolver, type, enclosingDeclaration));
                            }
                        }
                        else if (symbolFlags & SymbolFlags.Function ||
                            symbolFlags & SymbolFlags.Method ||
                            symbolFlags & SymbolFlags.Constructor ||
                            symbolFlags & SymbolFlags.Signature ||
                            symbolFlags & SymbolFlags.Accessor) {
                            var allSignatures = type.getCallSignatures();
                            addSignatureDisplayParts(allSignatures[0], allSignatures);
                        }
                    }
                }
                else {
                    symbolKind = getSymbolKind(symbol, typeResolver);
                }
            }

            if (!documentation) {
                documentation = symbol.getDocumentationComment();
            }

            return { displayParts: displayParts, documentation: documentation, symbolKind: symbolKind };

            function addNewLineIfDisplayPartsExist() {
                if (displayParts.length) {
                    displayParts.push(lineBreakPart());
                }
            }

            function addFullSymbolName(symbol: Symbol, enclosingDeclaration?: Node) {
                var fullSymbolDisplayParts = symbolToDisplayParts(typeResolver, symbol, enclosingDeclaration || sourceFile, /*meaning*/ undefined,
                    SymbolFormatFlags.WriteTypeParametersOrArguments | SymbolFormatFlags.UseOnlyExternalAliasing);
                displayParts.push.apply(displayParts, fullSymbolDisplayParts);
            }

            function addPrefixForAnyFunctionOrVar(symbol: Symbol, symbolKind: string) {
                addNewLineIfDisplayPartsExist();
                if (symbolKind) {
                    displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                    displayParts.push(textPart(symbolKind));
                    displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                    displayParts.push(spacePart());
                    addFullSymbolName(symbol);
                }
            }

            function addSignatureDisplayParts(signature: Signature, allSignatures: Signature[], flags?: TypeFormatFlags) {
                displayParts.push.apply(displayParts, signatureToDisplayParts(typeResolver, signature, enclosingDeclaration, flags | TypeFormatFlags.WriteTypeArgumentsOfSignature));
                if (allSignatures.length > 1) {
                    displayParts.push(spacePart());
                    displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                    displayParts.push(operatorPart(SyntaxKind.PlusToken));
                    displayParts.push(displayPart((allSignatures.length - 1).toString(), SymbolDisplayPartKind.numericLiteral));
                    displayParts.push(spacePart());
                    displayParts.push(textPart(allSignatures.length === 2 ? "overload" : "overloads"));
                    displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                }
                documentation = signature.getDocumentationComment();
            }

            function writeTypeParametersOfSymbol(symbol: Symbol, enclosingDeclaration: Node) {
                var typeParameterParts = mapToDisplayParts(writer => {
                    typeResolver.writeTypeParametersOfSymbol(symbol, writer, enclosingDeclaration);
                });
                displayParts.push.apply(displayParts, typeParameterParts);
            }
        }

        function getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            synchronizeHostData();

            fileName = TypeScript.switchToForwardSlashes(fileName);
            var sourceFile = getSourceFile(fileName);
            var node = getTouchingPropertyName(sourceFile, position);
            if (!node) {
                return undefined;
            }

            var symbol = typeInfoResolver.getSymbolInfo(node);
            if (!symbol) {
                // Try getting just type at this position and show
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                    case SyntaxKind.PropertyAccess:
                    case SyntaxKind.QualifiedName:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.SuperKeyword:
                        // For the identifiers/this/super etc get the type at position
                        var type = typeInfoResolver.getTypeOfNode(node);
                        if (type) {
                            return {
                                kind: ScriptElementKind.unknown,
                                kindModifiers: ScriptElementKindModifier.none,
                                textSpan: new TypeScript.TextSpan(node.getStart(), node.getWidth()),
                                displayParts: typeToDisplayParts(typeInfoResolver, type, getContainerNode(node)),
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
                textSpan: new TypeScript.TextSpan(node.getStart(), node.getWidth()),
                displayParts: displayPartsDocumentationsAndKind.displayParts,
                documentation: displayPartsDocumentationsAndKind.documentation
            };
        }

        /// Goto definition
        function getDefinitionAtPosition(filename: string, position: number): DefinitionInfo[] {
            function getDefinitionInfo(node: Node, symbolKind: string, symbolName: string, containerName: string): DefinitionInfo {
                return {
                    fileName: node.getSourceFile().filename,
                    textSpan: TypeScript.TextSpan.fromBounds(node.getStart(), node.getEnd()),
                    kind: symbolKind,
                    name: symbolName,
                    containerKind: undefined,
                    containerName: containerName
                };
            }

            function tryAddSignature(signatureDeclarations: Declaration[], selectConstructors: boolean, symbolKind: string, symbolName: string, containerName: string, result: DefinitionInfo[]) {
                var declarations: Declaration[] = [];
                var definition: Declaration;

                forEach(signatureDeclarations, d => {
                    if ((selectConstructors && d.kind === SyntaxKind.Constructor) ||
                        (!selectConstructors && (d.kind === SyntaxKind.FunctionDeclaration || d.kind === SyntaxKind.Method))) {
                        declarations.push(d);
                        if ((<FunctionDeclaration>d).body) definition = d;
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

            function tryAddConstructSignature(symbol: Symbol, location: Node, symbolKind: string, symbolName: string, containerName: string, result: DefinitionInfo[]) {
                // Applicable only if we are in a new expression, or we are on a constructor declaration
                // and in either case the symbol has a construct signature definition, i.e. class
                if (isNewExpressionTarget(location) || location.kind === SyntaxKind.ConstructorKeyword) {
                    if (symbol.flags & SymbolFlags.Class) {
                        var classDeclaration = <ClassDeclaration>symbol.getDeclarations()[0];
                        Debug.assert(classDeclaration && classDeclaration.kind === SyntaxKind.ClassDeclaration);

                        return tryAddSignature(classDeclaration.members, /*selectConstructors*/ true, symbolKind, symbolName, containerName, result);
                    }
                }
                return false;
            }

            function tryAddCallSignature(symbol: Symbol, location: Node, symbolKind: string, symbolName: string, containerName: string, result: DefinitionInfo[]) {
                if (isCallExpressionTarget(location) || isNewExpressionTarget(location) || isNameOfFunctionDeclaration(location)) {
                    return tryAddSignature(symbol.declarations, /*selectConstructors*/ false, symbolKind, symbolName, containerName, result);
                }
                return false;
            }

            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);
            var sourceFile = getSourceFile(filename);

            var node = getTouchingPropertyName(sourceFile, position);
            if (!node) {
                return undefined;
            }

            // Labels
            if (isJumpStatementTarget(node)) {
                var labelName = (<Identifier>node).text;
                var label = getTargetLabel((<BreakOrContinueStatement>node.parent), (<Identifier>node).text);
                return label ? [getDefinitionInfo(label, ScriptElementKind.label, labelName, /*containerName*/ undefined)] : undefined;
            }

            /// Triple slash reference comments
            var comment = forEach(sourceFile.referencedFiles, r => (r.pos <= position && position < r.end) ? r : undefined);
            if (comment) {
                var targetFilename = isRootedDiskPath(comment.filename) ? comment.filename : combinePaths(getDirectoryPath(filename), comment.filename);
                targetFilename = normalizePath(targetFilename);
                if (program.getSourceFile(targetFilename)) {
                    return [{
                        fileName: targetFilename,
                        textSpan: TypeScript.TextSpan.fromBounds(0, 0),
                        kind: ScriptElementKind.scriptElement,
                        name: comment.filename,
                        containerName: undefined,
                        containerKind: undefined
                    }];
                }
                return undefined;
            }

            var symbol = typeInfoResolver.getSymbolInfo(node);

            // Could not find a symbol e.g. node is string or number keyword,
            // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
            if (!symbol) {
                return undefined;
            }

            var result: DefinitionInfo[] = [];

            var declarations = symbol.getDeclarations();
            var symbolName = typeInfoResolver.symbolToString(symbol); // Do not get scoped name, just the name of the symbol
            var symbolKind = getSymbolKind(symbol, typeInfoResolver);
            var containerSymbol = symbol.parent;
            var containerName = containerSymbol ? typeInfoResolver.symbolToString(containerSymbol, node) : "";

            if (!tryAddConstructSignature(symbol, node, symbolKind, symbolName, containerName, result) &&
                !tryAddCallSignature(symbol, node, symbolKind, symbolName, containerName, result)) {
                // Just add all the declarations. 
                forEach(declarations, declaration => {
                    result.push(getDefinitionInfo(declaration, symbolKind, symbolName, containerName));
                });
            }

            return result;
        }

        /// References and Occurrences
        function getOccurrencesAtPosition(filename: string, position: number): ReferenceEntry[] {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);
            var sourceFile = getSourceFile(filename);

            var node = getTouchingWord(sourceFile, position);
            if (!node) {
                return undefined;
            }

            if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ThisKeyword || node.kind === SyntaxKind.SuperKeyword ||
                isLiteralNameOfPropertyDeclarationOrIndexAccess(node) || isNameOfExternalModuleImportOrDeclaration(node)) {
                return getReferencesForNode(node, [sourceFile], /*findInStrings:*/ false, /*findInComments:*/ false);
            }

            switch (node.kind) {
                case SyntaxKind.IfKeyword:
                case SyntaxKind.ElseKeyword:
                    if (hasKind(node.parent, SyntaxKind.IfStatement)) {
                        return getIfElseOccurrences(<IfStatement>node.parent);
                    }
                    break;
                case SyntaxKind.ReturnKeyword:
                    if (hasKind(node.parent, SyntaxKind.ReturnStatement)) {
                        return getReturnOccurrences(<ReturnStatement>node.parent);
                    }
                    break;
                case SyntaxKind.ThrowKeyword:
                    if (hasKind(node.parent, SyntaxKind.ThrowStatement)) {
                        return getThrowOccurrences(<ThrowStatement>node.parent);
                    }
                    break;
                case SyntaxKind.TryKeyword:
                case SyntaxKind.CatchKeyword:
                case SyntaxKind.FinallyKeyword:
                    if (hasKind(parent(parent(node)), SyntaxKind.TryStatement)) {
                        return getTryCatchFinallyOccurrences(<TryStatement>node.parent.parent);
                    }
                    break;
                case SyntaxKind.SwitchKeyword:
                    if (hasKind(node.parent, SyntaxKind.SwitchStatement)) {
                        return getSwitchCaseDefaultOccurrences(<SwitchStatement>node.parent);
                    }
                    break;
                case SyntaxKind.CaseKeyword:
                case SyntaxKind.DefaultKeyword:
                    if (hasKind(parent(parent(node)), SyntaxKind.SwitchStatement)) {
                        return getSwitchCaseDefaultOccurrences(<SwitchStatement>node.parent.parent);
                    }
                    break;
                case SyntaxKind.BreakKeyword:
                case SyntaxKind.ContinueKeyword:
                    if (hasKind(node.parent, SyntaxKind.BreakStatement) || hasKind(node.parent, SyntaxKind.ContinueStatement)) {
                        return getBreakOrContinueStatementOccurences(<BreakOrContinueStatement>node.parent);
                    }
                    break;
                case SyntaxKind.ForKeyword:
                    if (hasKind(node.parent, SyntaxKind.ForStatement) || hasKind(node.parent, SyntaxKind.ForInStatement)) {
                        return getLoopBreakContinueOccurrences(<IterationStatement>node.parent);
                    }
                    break;
                case SyntaxKind.WhileKeyword:
                case SyntaxKind.DoKeyword:
                    if (hasKind(node.parent, SyntaxKind.WhileStatement) || hasKind(node.parent, SyntaxKind.DoStatement)) {
                        return getLoopBreakContinueOccurrences(<IterationStatement>node.parent);
                    }
                    break;
                case SyntaxKind.ConstructorKeyword:
                    if (hasKind(node.parent, SyntaxKind.Constructor)) {
                        return getConstructorOccurrences(<ConstructorDeclaration>node.parent);
                    }
                    break;
                case SyntaxKind.GetKeyword:
                case SyntaxKind.SetKeyword:
                    if (hasKind(node.parent, SyntaxKind.GetAccessor) || hasKind(node.parent, SyntaxKind.SetAccessor)) {
                        return getGetAndSetOccurrences(<AccessorDeclaration>node.parent);
                    }
            }

            return undefined;

            function getIfElseOccurrences(ifStatement: IfStatement): ReferenceEntry[] {
                var keywords: Node[] = [];

                // Traverse upwards through all parent if-statements linked by their else-branches.
                while (hasKind(ifStatement.parent, SyntaxKind.IfStatement) && (<IfStatement>ifStatement.parent).elseStatement === ifStatement) {
                    ifStatement = <IfStatement>ifStatement.parent;
                }

                // Now traverse back down through the else branches, aggregating if/else keywords of if-statements.
                while (ifStatement) {
                    var children = ifStatement.getChildren();
                    pushKeywordIf(keywords, children[0], SyntaxKind.IfKeyword);

                    // Generally the 'else' keyword is second-to-last, so we traverse backwards.
                    for (var i = children.length - 1; i >= 0; i--) {
                        if (pushKeywordIf(keywords, children[i], SyntaxKind.ElseKeyword)) {
                            break;
                        }
                    }

                    if (!hasKind(ifStatement.elseStatement, SyntaxKind.IfStatement)) {
                        break
                    }
                    
                    ifStatement = <IfStatement>ifStatement.elseStatement;
                }

                var result: ReferenceEntry[] = [];

                // We'd like to highlight else/ifs together if they are only separated by whitespace
                // (i.e. the keywords are separated by no comments, no newlines).
                for (var i = 0; i < keywords.length; i++) {
                    if (keywords[i].kind === SyntaxKind.ElseKeyword && i < keywords.length - 1) {
                        var elseKeyword = keywords[i];
                        var ifKeyword = keywords[i + 1]; // this *should* always be an 'if' keyword.

                        var shouldHighlightNextKeyword = true;

                        // Avoid recalculating getStart() by iterating backwards.
                        for (var j = ifKeyword.getStart() - 1; j >= elseKeyword.end; j--) {
                            if (!isWhiteSpace(sourceFile.text.charCodeAt(j))) {
                                shouldHighlightNextKeyword = false;
                                break;
                            }
                        }
                        
                        if (shouldHighlightNextKeyword) {
                            result.push({
                                fileName: filename,
                                textSpan: TypeScript.TextSpan.fromBounds(elseKeyword.getStart(), ifKeyword.end),
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

            function getReturnOccurrences(returnStatement: ReturnStatement): ReferenceEntry[] {
                var func = <FunctionDeclaration>getContainingFunction(returnStatement);

                // If we didn't find a containing function with a block body, bail out.
                if (!(func && hasKind(func.body, SyntaxKind.FunctionBlock))) {
                    return undefined;
                }

                var keywords: Node[] = []
                forEachReturnStatement(<Block>func.body, returnStatement => {
                    pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
                });

                // Include 'throw' statements that do not occur within a try block.
                forEach(aggregateOwnedThrowStatements(func.body), throwStatement => {
                    pushKeywordIf(keywords, throwStatement.getFirstToken(), SyntaxKind.ThrowKeyword);
                });

                return map(keywords, getReferenceEntryFromNode);
            }
            
            function getThrowOccurrences(throwStatement: ThrowStatement) {
                var owner = getThrowStatementOwner(throwStatement);

                if (!owner) {
                    return undefined;
                }

                var keywords: Node[] = [];
                
                forEach(aggregateOwnedThrowStatements(owner), throwStatement => {
                    pushKeywordIf(keywords, throwStatement.getFirstToken(), SyntaxKind.ThrowKeyword);
                });

                // If the "owner" is a function, then we equate 'return' and 'throw' statements in their
                // ability to "jump out" of the function, and include occurrences for both.
                if (owner.kind === SyntaxKind.FunctionBlock) {
                    forEachReturnStatement(<Block>owner, returnStatement => {
                        pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
                    });
                }
                
                return map(keywords, getReferenceEntryFromNode);
            }

            /**
             * Aggregates all throw-statements within this node *without* crossing
             * into function boundaries and try-blocks with catch-clauses.
             */
            function aggregateOwnedThrowStatements(node: Node): ThrowStatement[] {
                var statementAccumulator: ThrowStatement[] = []
                aggregate(node);
                return statementAccumulator;

                function aggregate(node: Node): void {
                    if (node.kind === SyntaxKind.ThrowStatement) {
                        statementAccumulator.push(<ThrowStatement>node);
                    }
                    else if (node.kind === SyntaxKind.TryStatement) {
                        var tryStatement = <TryStatement>node;

                        if (tryStatement.catchBlock) {
                            aggregate(tryStatement.catchBlock);
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
                    // Do not cross function boundaries.
                    else if (!isAnyFunction(node)) {
                        forEachChild(node, aggregate);
                    }
                };
            }

            /**
             * For lack of a better name, this function takes a throw statement and returns the
             * nearest ancestor that is a try-block (whose try statement has a catch clause),
             * function-block, or source file.
             */
            function getThrowStatementOwner(throwStatement: ThrowStatement): Node {
                var child: Node = throwStatement;

                while (child.parent) {
                    var parent = child.parent;

                    if (parent.kind === SyntaxKind.FunctionBlock || parent.kind === SyntaxKind.SourceFile) {
                        return parent;
                    }
                    
                    // A throw-statement is only owned by a try-statement if the try-statement has
                    // a catch clause, and if the throw-statement occurs within the try block.
                    if (parent.kind === SyntaxKind.TryStatement) {
                        var tryStatement = <TryStatement>parent;

                        if (tryStatement.tryBlock === child && tryStatement.catchBlock) {
                            return child;
                        }
                    }

                    child = parent;
                }

                return undefined;
            }

            function getTryCatchFinallyOccurrences(tryStatement: TryStatement): ReferenceEntry[] {
                var keywords: Node[] = [];

                pushKeywordIf(keywords, tryStatement.getFirstToken(), SyntaxKind.TryKeyword);

                if (tryStatement.catchBlock) {
                    pushKeywordIf(keywords, tryStatement.catchBlock.getFirstToken(), SyntaxKind.CatchKeyword);
                }

                if (tryStatement.finallyBlock) {
                    pushKeywordIf(keywords, tryStatement.finallyBlock.getFirstToken(), SyntaxKind.FinallyKeyword);
                }

                return map(keywords, getReferenceEntryFromNode);
            }

            function getLoopBreakContinueOccurrences(loopNode: IterationStatement): ReferenceEntry[] {
                var keywords: Node[] = [];

                if (pushKeywordIf(keywords, loopNode.getFirstToken(), SyntaxKind.ForKeyword, SyntaxKind.WhileKeyword, SyntaxKind.DoKeyword)) {
                    // If we succeeded and got a do-while loop, then start looking for a 'while' keyword.
                    if (loopNode.kind === SyntaxKind.DoStatement) {
                        var loopTokens = loopNode.getChildren();

                        for (var i = loopTokens.length - 1; i >= 0; i--) {
                            if (pushKeywordIf(keywords, loopTokens[i], SyntaxKind.WhileKeyword)) {
                                break;
                            }
                        }
                    }
                }

                var breaksAndContinues = aggregateAllBreakAndContinueStatements(loopNode.statement);

                forEach(breaksAndContinues, statement => {
                    if (ownsBreakOrContinueStatement(loopNode, statement)) {
                        pushKeywordIf(keywords, statement.getFirstToken(), SyntaxKind.BreakKeyword, SyntaxKind.ContinueKeyword);
                    }
                });

                return map(keywords, getReferenceEntryFromNode);
            }

            function getSwitchCaseDefaultOccurrences(switchStatement: SwitchStatement) {
                var keywords: Node[] = [];

                pushKeywordIf(keywords, switchStatement.getFirstToken(), SyntaxKind.SwitchKeyword);

                // Types of break statements we can grab on to.
                var breakSearchType = BreakContinueSearchType.All;

                // Go through each clause in the switch statement, collecting the 'case'/'default' keywords.
                forEach(switchStatement.clauses, clause => {
                    pushKeywordIf(keywords, clause.getFirstToken(), SyntaxKind.CaseKeyword, SyntaxKind.DefaultKeyword);

                    var breaksAndContinues = aggregateAllBreakAndContinueStatements(clause);

                    forEach(breaksAndContinues, statement => {
                        if (ownsBreakOrContinueStatement(switchStatement, statement)) {
                            pushKeywordIf(keywords, statement.getFirstToken(), SyntaxKind.BreakKeyword);
                        }
                    });
                });

                return map(keywords, getReferenceEntryFromNode);
            }

            function getBreakOrContinueStatementOccurences(breakOrContinueStatement: BreakOrContinueStatement): ReferenceEntry[]{
                var owner = getBreakOrContinueOwner(breakOrContinueStatement);

                if (owner) {
                    switch (owner.kind) {
                        case SyntaxKind.ForStatement:
                        case SyntaxKind.ForInStatement:
                        case SyntaxKind.DoStatement:
                        case SyntaxKind.WhileStatement:
                            return getLoopBreakContinueOccurrences(<IterationStatement>owner)
                        case SyntaxKind.SwitchStatement:
                            return getSwitchCaseDefaultOccurrences(<SwitchStatement>owner);

                    }
                }

                return undefined;
            }

            function aggregateAllBreakAndContinueStatements(node: Node): BreakOrContinueStatement[] {
                var statementAccumulator: BreakOrContinueStatement[] = []
                aggregate(node);
                return statementAccumulator;

                function aggregate(node: Node): void {
                    if (node.kind === SyntaxKind.BreakStatement || node.kind === SyntaxKind.ContinueStatement) {
                        statementAccumulator.push(node);
                    }
                    // Do not cross function boundaries.
                    else if (!isAnyFunction(node)) {
                        forEachChild(node, aggregate);
                    }
                };
            }

            function ownsBreakOrContinueStatement(owner: Node, statement: BreakOrContinueStatement): boolean {
                var actualOwner = getBreakOrContinueOwner(statement);

                return actualOwner && actualOwner === owner;
            }

            function getBreakOrContinueOwner(statement: BreakOrContinueStatement): Node {
                for (var node = statement.parent; node; node = node.parent) {
                    switch (node.kind) {
                        case SyntaxKind.SwitchStatement:
                            if (statement.kind === SyntaxKind.ContinueStatement) {
                                continue;
                            }
                            // Fall through.
                        case SyntaxKind.ForStatement:
                        case SyntaxKind.ForInStatement:
                        case SyntaxKind.WhileStatement:
                        case SyntaxKind.DoStatement:
                            if (!statement.label || isLabeledBy(node, statement.label.text)) {
                                return node;
                            }
                            break;
                        default:
                            // Don't cross function boundaries.
                            if (isAnyFunction(node)) {
                                return undefined;
                            }
                            break;
                    }
                }

                return undefined;
            }

            function getConstructorOccurrences(constructorDeclaration: ConstructorDeclaration): ReferenceEntry[] {
                var declarations = constructorDeclaration.symbol.getDeclarations()

                var keywords: Node[] = [];

                forEach(declarations, declaration => {
                    forEach(declaration.getChildren(), token => {
                        return pushKeywordIf(keywords, token, SyntaxKind.ConstructorKeyword);
                    });
                });

                return map(keywords, getReferenceEntryFromNode);
            }

            function getGetAndSetOccurrences(accessorDeclaration: AccessorDeclaration): ReferenceEntry[] {
                var keywords: Node[] = [];

                tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.GetAccessor);
                tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.SetAccessor);

                return map(keywords, getReferenceEntryFromNode);

                function tryPushAccessorKeyword(accessorSymbol: Symbol, accessorKind: SyntaxKind): void {
                    var accessor = getDeclarationOfKind(accessorSymbol, accessorKind);

                    if (accessor) {
                        forEach(accessor.getChildren(), child => pushKeywordIf(keywords, child, SyntaxKind.GetKeyword, SyntaxKind.SetKeyword));
                    }
                }
            }

            // returns true if 'node' is defined and has a matching 'kind'.
            function hasKind(node: Node, kind: SyntaxKind) {
                return node !== undefined && node.kind === kind;
            }

            // Null-propagating 'parent' function.
            function parent(node: Node): Node {
                return node && node.parent;
            }

            function pushKeywordIf(keywordList: Node[], token: Node, ...expected: SyntaxKind[]): boolean {
                if (token && contains(expected, token.kind)) {
                    keywordList.push(token);
                    return true;
                }

                return false;
            }
        }

        function findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[] {
            return findReferences(fileName, position, findInStrings, findInComments);
        }

        function getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            return findReferences(fileName, position, /*findInStrings:*/ false, /*findInComments:*/ false);
        }

        function findReferences(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): ReferenceEntry[] {
            synchronizeHostData();

            fileName = TypeScript.switchToForwardSlashes(fileName);
            var sourceFile = getSourceFile(fileName);

            var node = getTouchingPropertyName(sourceFile, position);
            if (!node) {
                return undefined;
            }

            if (node.kind !== SyntaxKind.Identifier &&
                // TODO (drosen): This should be enabled in a later release - currently breaks rename.
                //node.kind !== SyntaxKind.ThisKeyword &&
                //node.kind !== SyntaxKind.SuperKeyword &&
                !isLiteralNameOfPropertyDeclarationOrIndexAccess(node) &&
                !isNameOfExternalModuleImportOrDeclaration(node)) {
                return undefined;
            }

            Debug.assert(node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.NumericLiteral || node.kind === SyntaxKind.StringLiteral);
            return getReferencesForNode(node, program.getSourceFiles(), findInStrings, findInComments);
        }

        function getReferencesForNode(node: Node, sourceFiles: SourceFile[], findInStrings: boolean, findInComments: boolean): ReferenceEntry[] {
            // Labels
            if (isLabelName(node)) {
                if (isJumpStatementTarget(node)) {
                    var labelDefinition = getTargetLabel((<BreakOrContinueStatement>node.parent), (<Identifier>node).text);
                    // if we have a label definition, look within its statement for references, if not, then
                    // the label is undefined, just return a set of one for the current node.
                    return labelDefinition ? getLabelReferencesInNode(labelDefinition.parent, labelDefinition) : [getReferenceEntryFromNode(node)];
                }
                else {
                    // it is a label definition and not a target, search within the parent labeledStatement
                    return getLabelReferencesInNode(node.parent, <Identifier>node);
                }
            }

            if (node.kind === SyntaxKind.ThisKeyword) {
                return getReferencesForThisKeyword(node, sourceFiles);
            }

            if (node.kind === SyntaxKind.SuperKeyword) {
                return getReferencesForSuperKeyword(node);
            }

            var symbol = typeInfoResolver.getSymbolInfo(node);

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

            var result: ReferenceEntry[];

            // Compute the meaning from the location and the symbol it references
            var searchMeaning = getIntersectingMeaningFromDeclarations(getMeaningFromLocation(node), declarations);

            // Get the text to search for, we need to normalize it as external module names will have quote
            var symbolName = getNormalizedSymbolName(symbol.name, declarations);

            // Get syntactic diagnostics
            var scope = getSymbolScope(symbol);

            if (scope) {
                result = [];
                getReferencesInNode(scope, symbol, symbolName, node, searchMeaning, findInStrings, findInComments, result);
            }
            else {
                forEach(sourceFiles, sourceFile => {
                    cancellationToken.throwIfCancellationRequested();

                    if (lookUp(sourceFile.identifiers, symbolName)) {
                        result = result || [];
                        getReferencesInNode(sourceFile, symbol, symbolName, node, searchMeaning, findInStrings, findInComments, result);
                    }
                });
            }

            return result;

            function getNormalizedSymbolName(symbolName: string, declarations: Declaration[]): string {
                // Special case for function expressions, whose names are solely local to their bodies.
                var functionExpression = forEach(declarations, d => d.kind === SyntaxKind.FunctionExpression ? d : undefined);

                if (functionExpression && functionExpression.name) {
                    var name = functionExpression.name.text;
                }
                else {
                    var name = symbolName;
                }

                var length = name.length;
                if (length >= 2 && name.charCodeAt(0) === CharacterCodes.doubleQuote && name.charCodeAt(length - 1) === CharacterCodes.doubleQuote) {
                    return name.substring(1, length - 1);
                };
                return name;
            }

            function getSymbolScope(symbol: Symbol): Node {
                // If this is private property or method, the scope is the containing class
                if (symbol.getFlags() && (SymbolFlags.Property | SymbolFlags.Method)) {
                    var privateDeclaration = forEach(symbol.getDeclarations(), d => (d.flags & NodeFlags.Private) ? d : undefined);
                    if (privateDeclaration) {
                        return privateDeclaration.parent;
                    }
                }

                // if this symbol is visible from its parent container, e.g. exported, then bail out
                if (symbol.parent) {
                    return undefined;
                }

                var scope: Node = undefined;

                var declarations = symbol.getDeclarations();
                if (declarations) {
                    for (var i = 0, n = declarations.length; i < n; i++) {
                        var container = getContainerNode(declarations[i]);

                        if (scope && scope !== container) {
                            // Different declarations have different containers, bail out
                            return undefined;
                        }

                        if (container.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>container)) {
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

            function getPossibleSymbolReferencePositions(sourceFile: SourceFile, symbolName: string, start: number, end: number): number[] {
                var positions: number[] = [];

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
                    if (position > end) break;

                    // We found a match.  Make sure it's not part of a larger word (i.e. the char 
                    // before and after it have to be a non-identifier char).
                    var endPosition = position + symbolNameLength;

                    if ((position === 0 || !isIdentifierPart(text.charCodeAt(position - 1), ScriptTarget.ES5)) &&
                        (endPosition === sourceLength || !isIdentifierPart(text.charCodeAt(endPosition), ScriptTarget.ES5))) {
                        // Found a real match.  Keep searching.  
                        positions.push(position);
                    }
                    position = text.indexOf(symbolName, position + symbolNameLength + 1);
                }

                return positions;
            }

            function getLabelReferencesInNode(container: Node, targetLabel: Identifier): ReferenceEntry[] {
                var result: ReferenceEntry[] = [];
                var sourceFile = container.getSourceFile();
                var labelName = targetLabel.text;
                var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, labelName, container.getStart(), container.getEnd());
                forEach(possiblePositions, position => {
                    cancellationToken.throwIfCancellationRequested();

                    var node = getTouchingWord(sourceFile, position);
                    if (!node || node.getWidth() !== labelName.length) {
                        return;
                    }

                    // Only pick labels that are either the target label, or have a target that is the target label
                    if (node === targetLabel ||
                        (isJumpStatementTarget(node) && getTargetLabel(node, labelName) === targetLabel)) {
                        result.push(getReferenceEntryFromNode(node));
                    }
                });
                return result;
            }

            function isValidReferencePosition(node: Node, searchSymbolName: string): boolean {
                if (node) {
                    // Compare the length so we filter out strict superstrings of the symbol we are looking for
                    switch (node.kind) {
                        case SyntaxKind.Identifier:
                            return node.getWidth() === searchSymbolName.length;

                        case SyntaxKind.StringLiteral:
                            if (isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||
                                isNameOfExternalModuleImportOrDeclaration(node)) {
                                // For string literals we have two additional chars for the quotes
                                return node.getWidth() === searchSymbolName.length + 2;
                            }
                            break;

                        case SyntaxKind.NumericLiteral:
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
            function getReferencesInNode(container: Node,
                                         searchSymbol: Symbol,
                                         searchText: string,
                                         searchLocation: Node,
                                         searchMeaning: SemanticMeaning,
                                         findInStrings: boolean,
                                         findInComments: boolean,
                                         result: ReferenceEntry[]): void {
                var sourceFile = container.getSourceFile();
                var tripleSlashDirectivePrefixRegex = /^\/\/\/\s*</

                var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, searchText, container.getStart(), container.getEnd());

                if (possiblePositions.length) {
                    // Build the set of symbols to search for, initially it has only the current symbol
                    var searchSymbols = populateSearchSymbolSet(searchSymbol, searchLocation);

                    forEach(possiblePositions, position => {
                        cancellationToken.throwIfCancellationRequested();

                        var referenceLocation = getTouchingPropertyName(sourceFile, position);
                        if (!isValidReferencePosition(referenceLocation, searchText)) {
                            // This wasn't the start of a token.  Check to see if it might be a 
                            // match in a comment or string if that's what the caller is asking
                            // for.
                            if ((findInStrings && isInString(position)) ||
                                (findInComments && isInComment(position))) {
                                result.push({
                                    fileName: sourceFile.filename,
                                    textSpan: new TypeScript.TextSpan(position, searchText.length),
                                    isWriteAccess: false
                                });
                            }
                            return;
                        }

                        if (!(getMeaningFromLocation(referenceLocation) & searchMeaning)) {
                            return;
                        }

                        var referenceSymbol = typeInfoResolver.getSymbolInfo(referenceLocation);
                        if (referenceSymbol && isRelatableToSearchSet(searchSymbols, referenceSymbol, referenceLocation)) {
                            result.push(getReferenceEntryFromNode(referenceLocation));
                        }
                    });
                }

                function isInString(position: number) {
                    var token = getTokenAtPosition(sourceFile, position);
                    return token && token.kind === SyntaxKind.StringLiteral && position > token.getStart();
                }

                function isInComment(position: number) {
                    var token = getTokenAtPosition(sourceFile, position);
                    if (token && position < token.getStart()) {
                        // First, we have to see if this position actually landed in a comment.
                        var commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);

                        // Then we want to make sure that it wasn't in a "///<" directive comment
                        // We don't want to unintentionally update a file name.
                        return forEach(commentRanges, c => {
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

            function getReferencesForSuperKeyword(superKeyword: Node): ReferenceEntry[]{
                var searchSpaceNode = getSuperContainer(superKeyword);
                if (!searchSpaceNode) {
                    return undefined;
                }
                // Whether 'super' occurs in a static context within a class.
                var staticFlag = NodeFlags.Static;

                switch (searchSpaceNode.kind) {
                    case SyntaxKind.Property:
                    case SyntaxKind.Method:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        staticFlag &= searchSpaceNode.flags;
                        searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                        break;
                    default:
                        return undefined;
                }

                var result: ReferenceEntry[] = [];

                var sourceFile = searchSpaceNode.getSourceFile();
                var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "super", searchSpaceNode.getStart(), searchSpaceNode.getEnd());
                forEach(possiblePositions, position => {
                    cancellationToken.throwIfCancellationRequested();

                    var node = getTouchingWord(sourceFile, position);

                    if (!node || node.kind !== SyntaxKind.SuperKeyword) {
                        return;
                    }

                    var container = getSuperContainer(node);

                    // If we have a 'super' container, we must have an enclosing class.
                    // Now make sure the owning class is the same as the search-space
                    // and has the same static qualifier as the original 'super's owner.
                    if (container && (NodeFlags.Static & container.flags) === staticFlag && container.parent.symbol === searchSpaceNode.symbol) {
                        result.push(getReferenceEntryFromNode(node));
                    }
                });

                return result;
            }

            function getReferencesForThisKeyword(thisOrSuperKeyword: Node, sourceFiles: SourceFile[]): ReferenceEntry[] {
                var searchSpaceNode = getThisContainer(thisOrSuperKeyword, /* includeArrowFunctions */ false);

                // Whether 'this' occurs in a static context within a class.
                var staticFlag = NodeFlags.Static;

                switch (searchSpaceNode.kind) {
                    case SyntaxKind.Property:
                    case SyntaxKind.Method:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        staticFlag &= searchSpaceNode.flags
                        searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                        break;
                    case SyntaxKind.SourceFile:
                        if (isExternalModule(<SourceFile>searchSpaceNode)) {
                            return undefined;
                        }
                        // Fall through
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                        break;
                    default:
                        return undefined;
                }

                var result: ReferenceEntry[] = [];

                if (searchSpaceNode.kind === SyntaxKind.SourceFile) {
                    forEach(sourceFiles, sourceFile => {
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

                function getThisReferencesInFile(sourceFile: SourceFile, searchSpaceNode: Node, possiblePositions: number[], result: ReferenceEntry[]): void {
                    forEach(possiblePositions, position => {
                        cancellationToken.throwIfCancellationRequested();

                        var node = getTouchingWord(sourceFile, position);
                        if (!node || node.kind !== SyntaxKind.ThisKeyword) {
                            return;
                        }

                        var container = getThisContainer(node, /* includeArrowFunctions */ false);

                        switch (searchSpaceNode.kind) {
                            case SyntaxKind.FunctionExpression:
                            case SyntaxKind.FunctionDeclaration:
                                if (searchSpaceNode.symbol === container.symbol) {
                                    result.push(getReferenceEntryFromNode(node));
                                }
                                break;
                            case SyntaxKind.ClassDeclaration:
                                // Make sure the container belongs to the same class
                                // and has the appropriate static modifier from the original container.
                                if (container.parent && searchSpaceNode.symbol === container.parent.symbol && (container.flags & NodeFlags.Static) === staticFlag) {
                                    result.push(getReferenceEntryFromNode(node));
                                }
                                break;
                            case SyntaxKind.SourceFile:
                                if (container.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>container)) {
                                    result.push(getReferenceEntryFromNode(node));
                                }
                                break;
                        }
                    });
                }
            }

            function populateSearchSymbolSet(symbol: Symbol, location: Node): Symbol[] {
                // The search set contains at least the current symbol
                var result = [symbol];

                // If the location is in a context sensitive location (i.e. in an object literal) try
                // to get a contextual type for it, and add the property symbol from the contextual
                // type to the search set
                if (isNameOfPropertyAssignment(location)) {
                    forEach(getPropertySymbolsFromContextualType(location), contextualSymbol => {
                        result.push.apply(result, typeInfoResolver.getRootSymbols(contextualSymbol));
                    });
                }

                // If this is a union property, add all the symbols from all its source symbols in all unioned types.
                // If the symbol is an instantiation from a another symbol (e.g. widened symbol) , add the root the list
                forEach(typeInfoResolver.getRootSymbols(symbol), rootSymbol => {
                    if (rootSymbol !== symbol) {
                        result.push(rootSymbol);
                    }

                    // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
                    if (rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                        getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result);
                    }
                });

                return result;
            }

            function getPropertySymbolsFromBaseTypes(symbol: Symbol, propertyName: string, result: Symbol[]): void {
                if (symbol && symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    forEach(symbol.getDeclarations(), declaration => {
                        if (declaration.kind === SyntaxKind.ClassDeclaration) {
                            getPropertySymbolFromTypeReference((<ClassDeclaration>declaration).baseType);
                            forEach((<ClassDeclaration>declaration).implementedTypes, getPropertySymbolFromTypeReference);
                        }
                        else if (declaration.kind === SyntaxKind.InterfaceDeclaration) {
                            forEach((<InterfaceDeclaration>declaration).baseTypes, getPropertySymbolFromTypeReference);
                        }
                    });
                }
                return;

                function getPropertySymbolFromTypeReference(typeReference: TypeReferenceNode) {
                    if (typeReference) {
                        var type = typeInfoResolver.getTypeOfNode(typeReference);
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

            function isRelatableToSearchSet(searchSymbols: Symbol[], referenceSymbol: Symbol, referenceLocation: Node): boolean {
                if (searchSymbols.indexOf(referenceSymbol) >= 0) {
                    return true;
                }

                // If the reference location is in an object literal, try to get the contextual type for the 
                // object literal, lookup the property symbol in the contextual type, and use this symbol to
                // compare to our searchSymbol
                if (isNameOfPropertyAssignment(referenceLocation)) {
                    return forEach(getPropertySymbolsFromContextualType(referenceLocation), contextualSymbol => {
                        return forEach(typeInfoResolver.getRootSymbols(contextualSymbol), s => searchSymbols.indexOf(s) >= 0);
                    });
                }

                // Unwrap symbols to get to the root (e.g. transient symbols as a result of widening)
                // Or a union property, use its underlying unioned symbols
                return forEach(typeInfoResolver.getRootSymbols(referenceSymbol), rootSymbol => {
                    // if it is in the list, then we are done
                    if (searchSymbols.indexOf(rootSymbol) >= 0) {
                        return true;
                    }

                    // Finally, try all properties with the same name in any type the containing type extended or implemented, and 
                    // see if any is in the list
                    if (rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                        var result: Symbol[] = [];
                        getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result);
                        return forEach(result, s => searchSymbols.indexOf(s) >= 0);
                    }

                    return false;
                });
            }

            function getPropertySymbolsFromContextualType(node: Node): Symbol[] {
                if (isNameOfPropertyAssignment(node)) {
                    var objectLiteral = node.parent.parent;
                    var contextualType = typeInfoResolver.getContextualType(objectLiteral);
                    var name = (<Identifier>node).text;
                    if (contextualType) {
                        if (contextualType.flags & TypeFlags.Union) {
                            // This is a union type, first see if the property we are looking for is a union property (i.e. exists in all types)
                            // if not, search the constituent types for the property
                            var unionProperty = contextualType.getProperty(name)
                            if (unionProperty) {
                                return [unionProperty];
                            }
                            else {
                                var result: Symbol[] = [];
                                forEach((<UnionType>contextualType).types, t => {
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
            function getIntersectingMeaningFromDeclarations(meaning: SemanticMeaning, declarations: Declaration[]): SemanticMeaning {
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

        function getReferenceEntryFromNode(node: Node): ReferenceEntry {
            var start = node.getStart();
            var end = node.getEnd();

            if (node.kind === SyntaxKind.StringLiteral) {
                start += 1;
                end -= 1;
            }

            return {
                fileName: node.getSourceFile().filename,
                textSpan: TypeScript.TextSpan.fromBounds(start, end),
                isWriteAccess: isWriteAccess(node)
            };
        }

        /** A node is considered a writeAccess iff it is a name of a declaration or a target of an assignment */
        function isWriteAccess(node: Node): boolean {
            if (node.kind === SyntaxKind.Identifier && isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                return true;
            }

            var parent = node.parent;
            if (parent) {
                if (parent.kind === SyntaxKind.PostfixOperator || parent.kind === SyntaxKind.PrefixOperator) {
                    return true;
                }
                else if (parent.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>parent).left === node) {
                    var operator = (<BinaryExpression>parent).operator;
                    return SyntaxKind.FirstAssignment <= operator && operator <= SyntaxKind.LastAssignment;
                }
            }

            return false;
        }

        /// NavigateTo
        function getNavigateToItems(searchValue: string): NavigateToItem[] {
            synchronizeHostData();

            // Split search value in terms array
            var terms = searchValue.split(" ");

            // default NavigateTo approach: if search term contains only lower-case chars - use case-insensitive search, otherwise switch to case-sensitive version
            var searchTerms = map(terms, t => ({ caseSensitive: hasAnyUpperCaseCharacter(t), term: t }));

            var items: NavigateToItem[] = [];

            // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[] 
            forEach(program.getSourceFiles(), sourceFile => {
                cancellationToken.throwIfCancellationRequested();

                var filename = sourceFile.filename;
                var declarations = sourceFile.getNamedDeclarations();
                for (var i = 0, n = declarations.length; i < n; i++) {
                    var declaration = declarations[i];
                    var name = declaration.name.text;
                    var matchKind = getMatchKind(searchTerms, name);
                    if (matchKind !== MatchKind.none) {
                        var container = <Declaration>getContainerNode(declaration);
                        items.push({
                            name: name,
                            kind: getNodeKind(declaration),
                            kindModifiers: getNodeModifiers(declaration),
                            matchKind: MatchKind[matchKind],
                            fileName: filename,
                            textSpan: TypeScript.TextSpan.fromBounds(declaration.getStart(), declaration.getEnd()),
                            containerName: container.name ? container.name.text : "",
                            containerKind: container.name ? getNodeKind(container) : ""
                        });
                    }
                }
            });

            return items;

            function hasAnyUpperCaseCharacter(s: string): boolean {
                for (var i = 0, n = s.length; i < n; i++) {
                    var c = s.charCodeAt(i);
                    if ((CharacterCodes.A <= c && c <= CharacterCodes.Z) ||
                        (c >= CharacterCodes.maxAsciiCharacter && s.charAt(i).toLocaleLowerCase() !== s.charAt(i))) {
                        return true;
                    }
                }

                return false;
            }

            function getMatchKind(searchTerms: { caseSensitive: boolean; term: string }[], name: string): MatchKind {
                var matchKind = MatchKind.none;

                if (name) {
                    for (var j = 0, n = searchTerms.length; j < n; j++) {
                        var searchTerm = searchTerms[j];
                        var nameToSearch = searchTerm.caseSensitive ? name : name.toLocaleLowerCase();
                        // in case of case-insensitive search searchTerm.term will already be lower-cased
                        var index = nameToSearch.indexOf(searchTerm.term);
                        if (index < 0) {
                            // Didn't match.
                            return MatchKind.none;
                        }

                        var termKind = MatchKind.substring;
                        if (index === 0) {
                            // here we know that match occur at the beginning of the string.
                            // if search term and declName has the same length - we have an exact match, otherwise declName have longer length and this will be prefix match
                            termKind = name.length === searchTerm.term.length ? MatchKind.exact : MatchKind.prefix;
                        }

                        // Update our match kind if we don't have one, or if this match is better.
                        if (matchKind === MatchKind.none || termKind < matchKind) {
                            matchKind = termKind;
                        }
                    }
                }

                return matchKind;
            }
        }

        function containErrors(diagnostics: Diagnostic[]): boolean {
            return forEach(diagnostics, diagnostic => diagnostic.category === DiagnosticCategory.Error);
        }

        function getEmitOutput(filename: string): EmitOutput {
            synchronizeHostData();
            filename = TypeScript.switchToForwardSlashes(filename);
            var compilerOptions = program.getCompilerOptions();
            var targetSourceFile = program.getSourceFile(filename);  // Current selected file to be output
            // If --out flag is not specified, shouldEmitToOwnFile is true. Otherwise shouldEmitToOwnFile is false.
            var shouldEmitToOwnFile = ts.shouldEmitToOwnFile(targetSourceFile, compilerOptions);
            var emitDeclaration = compilerOptions.declaration;
            var emitOutput: EmitOutput = {
                outputFiles: [],
                emitOutputStatus: undefined,
            };

            function getEmitOutputWriter(filename: string, data: string, writeByteOrderMark: boolean) {
                emitOutput.outputFiles.push({
                    name: filename,
                    writeByteOrderMark: writeByteOrderMark,
                    text: data
                });
            }

            // Initialize writer for CompilerHost.writeFile
            writer = getEmitOutputWriter;

            var syntacticDiagnostics: Diagnostic[] = [];
            var containSyntacticErrors = false;

            if (shouldEmitToOwnFile) {
                // Check only the file we want to emit
                containSyntacticErrors = containErrors(program.getDiagnostics(targetSourceFile));
            } else {
                // Check the syntactic of only sourceFiles that will get emitted into single output
                // Terminate the process immediately if we encounter a syntax error from one of the sourceFiles
                containSyntacticErrors = forEach(program.getSourceFiles(), sourceFile => {
                    if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                        // If emit to a single file then we will check all files that do not have external module
                        return containErrors(program.getDiagnostics(sourceFile));
                    }
                    return false;
                });
            }

            if (containSyntacticErrors) {
                // If there is a syntax error, terminate the process and report outputStatus
                emitOutput.emitOutputStatus = EmitReturnStatus.AllOutputGenerationSkipped;
                // Reset writer back to undefined to make sure that we produce an error message
                // if CompilerHost.writeFile is called when we are not in getEmitOutput
                writer = undefined;
                return emitOutput;
            }

            // Perform semantic and force a type check before emit to ensure that all symbols are updated
            // EmitFiles will report if there is an error from TypeChecker and Emitter
            // Depend whether we will have to emit into a single file or not either emit only selected file in the project, emit all files into a single file
            var emitFilesResult = getFullTypeCheckChecker().emitFiles(targetSourceFile);
            emitOutput.emitOutputStatus = emitFilesResult.emitResultStatus;

            // Reset writer back to undefined to make sure that we produce an error message if CompilerHost.writeFile method is called when we are not in getEmitOutput
            writer = undefined;
            return emitOutput;
        }

        function getMeaningFromDeclaration(node: Declaration): SemanticMeaning {
            switch (node.kind) {
                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.Property:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.EnumMember:
                case SyntaxKind.Method:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.CatchBlock:
                    return SemanticMeaning.Value;

                case SyntaxKind.TypeParameter:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeLiteral:
                    return SemanticMeaning.Type;

                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return SemanticMeaning.Value | SemanticMeaning.Type;

                case SyntaxKind.ModuleDeclaration:
                    if ((<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral) {
                        return SemanticMeaning.Namespace | SemanticMeaning.Value;
                    }
                    else if (isInstantiated(node)) {
                        return SemanticMeaning.Namespace | SemanticMeaning.Value;
                    }
                    else {
                        return SemanticMeaning.Namespace;
                    }
                    break;

                case SyntaxKind.ImportDeclaration:
                    return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
            }
            Debug.fail("Unknown declaration type");
        }

        function isTypeReference(node: Node): boolean {
            if (node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node)
                node = node.parent;

            return node.parent.kind === SyntaxKind.TypeReference;
        }

        function isNamespaceReference(node: Node): boolean {
            var root = node;
            var isLastClause = true;
            if (root.parent.kind === SyntaxKind.QualifiedName) {
                while (root.parent && root.parent.kind === SyntaxKind.QualifiedName)
                    root = root.parent;

                isLastClause = (<QualifiedName>root).right === node;
            }

            return root.parent.kind === SyntaxKind.TypeReference && !isLastClause;
        }

        function isInRightSideOfImport(node: EntityName) {
            while (node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            }

            return node.parent.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node.parent).entityName === node;
        }

        function getMeaningFromRightHandSideOfImport(node: Node) {
            Debug.assert(node.kind === SyntaxKind.Identifier);

            //     import a = |b|; // Namespace
            //     import a = |b.c|; // Value, type, namespace
            //     import a = |b.c|.d; // Namespace

            if (node.parent.kind === SyntaxKind.QualifiedName &&
                (<QualifiedName>node.parent).right === node &&
                node.parent.parent.kind === SyntaxKind.ImportDeclaration) {
                return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
            }
            return SemanticMeaning.Namespace;
        }

        function getMeaningFromLocation(node: Node): SemanticMeaning {
            if (node.parent.kind === SyntaxKind.ExportAssignment) {
                return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
            }
            else if (isInRightSideOfImport(node)) {
                return getMeaningFromRightHandSideOfImport(node);
            }
            else if (isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
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

        // Signature help
        /**
         * This is a semantic operation.
         */
        function getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems {
            synchronizeHostData();

            fileName = TypeScript.switchToForwardSlashes(fileName);
            var sourceFile = getSourceFile(fileName);

            return SignatureHelp.getSignatureHelpItems(sourceFile, position, typeInfoResolver, cancellationToken);
        }

        function getSignatureAtPosition(filename: string, position: number): SignatureInfo {
            var signatureHelpItems = getSignatureHelpItems(filename, position);

            if (!signatureHelpItems) {
                return undefined;
            }

            var currentArgumentState = { argumentIndex: signatureHelpItems.argumentIndex, argumentCount: signatureHelpItems.argumentCount };

            var formalSignatures: FormalSignatureItemInfo[] = [];
            forEach(signatureHelpItems.items, signature => {
                var signatureInfoString = displayPartsToString(signature.prefixDisplayParts);

                var parameters: FormalParameterInfo[] = [];
                if (signature.parameters) {
                    for (var i = 0, n = signature.parameters.length; i < n; i++) {
                        var parameter = signature.parameters[i];

                        // add the parameter to the string
                        if (i) {
                            signatureInfoString += displayPartsToString(signature.separatorDisplayParts);
                        }

                        var start = signatureInfoString.length;
                        signatureInfoString += displayPartsToString(parameter.displayParts);
                        var end = signatureInfoString.length - 1;

                        // add the parameter to the list
                        parameters.push({
                            name: parameter.name,
                            isVariable: i === n - 1 && signature.isVariadic,
                            docComment: displayPartsToString(parameter.documentation),
                            minChar: start,
                            limChar: end
                        });
                    }
                }

                signatureInfoString += displayPartsToString(signature.suffixDisplayParts);

                formalSignatures.push({
                    signatureInfo: signatureInfoString,
                    docComment: displayPartsToString(signature.documentation),
                    parameters: parameters,
                    typeParameters: [],
                });
            });

            var actualSignature: ActualSignatureInfo = {
                parameterMinChar: signatureHelpItems.applicableSpan.start(),
                parameterLimChar: signatureHelpItems.applicableSpan.end(),
                currentParameterIsTypeParameter: false,
                currentParameter: currentArgumentState.argumentIndex
            };

            return {
                actual: actualSignature,
                formal: formalSignatures,
                activeFormal: 0
            };
        }

        /// Syntactic features
        function getSyntaxTree(filename: string): TypeScript.SyntaxTree {
            filename = TypeScript.switchToForwardSlashes(filename);
            return syntaxTreeCache.getCurrentFileSyntaxTree(filename);
        }

        function getCurrentSourceFile(filename: string): SourceFile {
            filename = TypeScript.switchToForwardSlashes(filename);
            var currentSourceFile = syntaxTreeCache.getCurrentSourceFile(filename);
            return currentSourceFile;
        }

        function getNameOrDottedNameSpan(filename: string, startPos: number, endPos: number): TypeScript.TextSpan {
            function getTypeInfoEligiblePath(filename: string, position: number, isConstructorValidPosition: boolean) {
                var sourceUnit = syntaxTreeCache.getCurrentFileSyntaxTree(filename).sourceUnit();

                var ast = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position, /*useTrailingTriviaAsLimChar*/ false, /*forceInclusive*/ true);
                if (ast === null) {
                    return null;
                }

                if (ast.kind() === TypeScript.SyntaxKind.ParameterList && ast.parent.kind() === TypeScript.SyntaxKind.CallSignature && ast.parent.parent.kind() === TypeScript.SyntaxKind.ConstructorDeclaration) {
                    ast = ast.parent.parent;
                }

                switch (ast.kind()) {
                    default:
                        return null;
                    case TypeScript.SyntaxKind.ConstructorDeclaration:
                        var constructorAST = <TypeScript.ConstructorDeclarationSyntax>ast;
                        if (!isConstructorValidPosition || !(position >= TypeScript.start(constructorAST) && position <= TypeScript.start(constructorAST) + "constructor".length)) {
                            return null;
                        }
                        else {
                            return ast;
                        }
                    case TypeScript.SyntaxKind.FunctionDeclaration:
                        return null;
                    case TypeScript.SyntaxKind.MemberAccessExpression:
                    case TypeScript.SyntaxKind.QualifiedName:
                    case TypeScript.SyntaxKind.SuperKeyword:
                    case TypeScript.SyntaxKind.StringLiteral:
                    case TypeScript.SyntaxKind.ThisKeyword:
                    case TypeScript.SyntaxKind.IdentifierName:
                        return ast;
                }
            }

            filename = TypeScript.switchToForwardSlashes(filename);

            var node = getTypeInfoEligiblePath(filename, startPos, false);
            if (!node) return null;

            while (node) {
                if (TypeScript.ASTHelpers.isNameOfMemberAccessExpression(node) ||
                    TypeScript.ASTHelpers.isRightSideOfQualifiedName(node)) {
                    node = node.parent;
                }
                else {
                    break;
                }
            }

            return TypeScript.TextSpan.fromBounds(
                TypeScript.start(node),
                TypeScript.end(node));
        }

        function getBreakpointStatementAtPosition(filename: string, position: number) {
            // doesn't use compiler - no need to synchronize with host
            filename = TypeScript.switchToForwardSlashes(filename);

            var syntaxtree = getSyntaxTree(filename);
            return TypeScript.Services.Breakpoints.getBreakpointLocation(syntaxtree, position);
        }

        function getNavigationBarItems(filename: string): NavigationBarItem[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            return NavigationBar.getNavigationBarItems(getCurrentSourceFile(filename));
        }

        function getSemanticClassifications(fileName: string, span: TypeScript.TextSpan): ClassifiedSpan[] {
            synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var sourceFile = getSourceFile(fileName);

            var result: ClassifiedSpan[] = [];
            processNode(sourceFile);

            return result;

            function classifySymbol(symbol: Symbol, meaningAtPosition: SemanticMeaning) {
                var flags = symbol.getFlags();

                if (flags & SymbolFlags.Class) {
                    return ClassificationTypeNames.className;
                }
                else if (flags & SymbolFlags.Enum) {
                    return ClassificationTypeNames.enumName;
                }
                else if (meaningAtPosition & SemanticMeaning.Type) {
                    if (flags & SymbolFlags.Interface) {
                        return ClassificationTypeNames.interfaceName;
                    }
                    else if (flags & SymbolFlags.TypeParameter) {
                        return ClassificationTypeNames.typeParameterName;
                    }
                }
                else if (flags & SymbolFlags.Module) {
                    // Only classify a module as such if
                    //  - It appears in a namespace context.
                    //  - There exists a module declaration which actually impacts the value side.
                    if (meaningAtPosition & SemanticMeaning.Namespace ||
                        (meaningAtPosition & SemanticMeaning.Value && hasValueSideModule(symbol))) {
                        return ClassificationTypeNames.moduleName;
                    }
                }

                return undefined;

                /**
                 * Returns true if there exists a module that introduces entities on the value side.
                 */
                function hasValueSideModule(symbol: Symbol): boolean {
                    return forEach(symbol.declarations, declaration => {
                        return declaration.kind === SyntaxKind.ModuleDeclaration && isInstantiated(declaration);
                    });
                }
            }

            function processNode(node: Node) {
                // Only walk into nodes that intersect the requested span.
                if (node && span.intersectsWith(node.getStart(), node.getWidth())) {
                    if (node.kind === SyntaxKind.Identifier && node.getWidth() > 0) {
                        var symbol = typeInfoResolver.getSymbolInfo(node);
                        if (symbol) {
                            var type = classifySymbol(symbol, getMeaningFromLocation(node));
                            if (type) {
                                result.push({
                                    textSpan: new TypeScript.TextSpan(node.getStart(), node.getWidth()),
                                    classificationType: type
                                });
                            }
                        }
                    }

                    forEachChild(node, processNode);
                }
            }
        }

        function getSyntacticClassifications(fileName: string, span: TypeScript.TextSpan): ClassifiedSpan[] {
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);
            var sourceFile = getCurrentSourceFile(fileName);

            var result: ClassifiedSpan[] = [];
            processElement(sourceFile);

            return result;

            function classifyComment(comment: CommentRange) {
                var width = comment.end - comment.pos;
                if (span.intersectsWith(comment.pos, width)) {
                    result.push({
                        textSpan: new TypeScript.TextSpan(comment.pos, width),
                        classificationType: ClassificationTypeNames.comment
                    });
                }
            }

            function classifyToken(token: Node): void {
                forEach(getLeadingCommentRanges(sourceFile.text, token.getFullStart()), classifyComment);

                if (token.getWidth() > 0) {
                    var type = classifyTokenType(token);
                    if (type) {
                        result.push({
                            textSpan: new TypeScript.TextSpan(token.getStart(), token.getWidth()),
                            classificationType: type
                        });
                    }
                }

                forEach(getTrailingCommentRanges(sourceFile.text, token.getEnd()), classifyComment);
            }

            function classifyTokenType(token: Node): string {
                var tokenKind = token.kind;
                if (isKeyword(tokenKind)) {
                    return ClassificationTypeNames.keyword;
                }

                // Special case < and >  If they appear in a generic context they are punctuation,
                // not operators.
                if (tokenKind === SyntaxKind.LessThanToken || tokenKind === SyntaxKind.GreaterThanToken) {
                    // If the node owning the token has a type argument list or type parameter list, then
                    // we can effectively assume that a '<' and '>' belong to those lists.
                    if (getTypeArgumentOrTypeParameterList(token.parent)) {
                        return ClassificationTypeNames.punctuation;
                    }
                }

                if (isPunctuation(token)) {
                    // the '=' in a variable declaration is special cased here.
                    if (token.parent.kind === SyntaxKind.BinaryExpression ||
                        token.parent.kind === SyntaxKind.VariableDeclaration ||
                        token.parent.kind === SyntaxKind.PrefixOperator ||
                        token.parent.kind === SyntaxKind.PostfixOperator ||
                        token.parent.kind === SyntaxKind.ConditionalExpression) {
                        return ClassificationTypeNames.operator;
                    }
                    else {
                        return ClassificationTypeNames.punctuation;
                    }
                }
                else if (tokenKind === SyntaxKind.NumericLiteral) {
                    return ClassificationTypeNames.numericLiteral;
                }
                else if (tokenKind === SyntaxKind.StringLiteral) {
                    return ClassificationTypeNames.stringLiteral;
                }
                else if (tokenKind === SyntaxKind.RegularExpressionLiteral) {
                    // TODO: we should get another classification type for these literals.
                    return ClassificationTypeNames.stringLiteral;
                }
                else if (tokenKind === SyntaxKind.Identifier) {
                    switch (token.parent.kind) {
                        case SyntaxKind.ClassDeclaration:
                            if ((<ClassDeclaration>token.parent).name === token) {
                                return ClassificationTypeNames.className;
                            }
                            return;
                        case SyntaxKind.TypeParameter:
                            if ((<TypeParameterDeclaration>token.parent).name === token) {
                                return ClassificationTypeNames.typeParameterName;
                            }
                            return;
                        case SyntaxKind.InterfaceDeclaration:
                            if ((<InterfaceDeclaration>token.parent).name === token) {
                                return ClassificationTypeNames.interfaceName;
                            }
                            return;
                        case SyntaxKind.EnumDeclaration:
                            if ((<EnumDeclaration>token.parent).name === token) {
                                return ClassificationTypeNames.enumName;
                            }
                            return;
                        case SyntaxKind.ModuleDeclaration:
                            if ((<ModuleDeclaration>token.parent).name === token) {
                                return ClassificationTypeNames.moduleName;
                            }
                            return;
                        default:
                            return ClassificationTypeNames.text;
                    }
                }
            }

            function processElement(element: Node) {
                // Ignore nodes that don't intersect the original span to classify.
                if (span.intersectsWith(element.getFullStart(), element.getFullWidth())) {
                    var children = element.getChildren();
                    for (var i = 0, n = children.length; i < n; i++) {
                        var child = children[i];
                        if (isToken(child)) {
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

        function getOutliningSpans(filename: string): OutliningSpan[] {
            // doesn't use compiler - no need to synchronize with host
            filename = TypeScript.switchToForwardSlashes(filename);
            var sourceFile = getCurrentSourceFile(filename);
            return OutliningElementsCollector.collectElements(sourceFile);
        }

        function getBraceMatchingAtPosition(filename: string, position: number) {
            var sourceFile = getCurrentSourceFile(filename);
            var result: TypeScript.TextSpan[] = [];

            var token = getTouchingToken(sourceFile, position);

            if (token.getStart(sourceFile) === position) {
                var matchKind = getMatchingTokenKind(token);

                // Ensure that there is a corresponding token to match ours.
                if (matchKind) {
                    var parentElement = token.parent;

                    var childNodes = parentElement.getChildren(sourceFile);
                    for (var i = 0, n = childNodes.length; i < n; i++) {
                        var current = childNodes[i];

                        if (current.kind === matchKind) {
                            var range1 = new TypeScript.TextSpan(token.getStart(sourceFile), token.getWidth(sourceFile));
                            var range2 = new TypeScript.TextSpan(current.getStart(sourceFile), current.getWidth(sourceFile));

                            // We want to order the braces when we return the result.
                            if (range1.start() < range2.start()) {
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

            function getMatchingTokenKind(token: Node): ts.SyntaxKind {
                switch (token.kind) {
                    case ts.SyntaxKind.OpenBraceToken:    return ts.SyntaxKind.CloseBraceToken
                    case ts.SyntaxKind.OpenParenToken:    return ts.SyntaxKind.CloseParenToken;
                    case ts.SyntaxKind.OpenBracketToken:  return ts.SyntaxKind.CloseBracketToken;
                    case ts.SyntaxKind.LessThanToken:     return ts.SyntaxKind.GreaterThanToken;
                    case ts.SyntaxKind.CloseBraceToken:   return ts.SyntaxKind.OpenBraceToken
                    case ts.SyntaxKind.CloseParenToken:   return ts.SyntaxKind.OpenParenToken;
                    case ts.SyntaxKind.CloseBracketToken: return ts.SyntaxKind.OpenBracketToken;
                    case ts.SyntaxKind.GreaterThanToken:  return ts.SyntaxKind.LessThanToken;
                }

                return undefined;
            }
        }

        function getIndentationAtPosition(filename: string, position: number, editorOptions: EditorOptions) {
            filename = TypeScript.switchToForwardSlashes(filename);

            var sourceFile = getCurrentSourceFile(filename);
            var options = new TypeScript.FormattingOptions(!editorOptions.ConvertTabsToSpaces, editorOptions.TabSize, editorOptions.IndentSize, editorOptions.NewLineCharacter)

            return formatting.SmartIndenter.getIndentation(position, sourceFile, options);
        }

        function getFormattingManager(filename: string, options: FormatCodeOptions) {
            // Ensure rules are initialized and up to date wrt to formatting options
            if (formattingRulesProvider == null) {
                formattingRulesProvider = new TypeScript.Services.Formatting.RulesProvider(host);
            }

            formattingRulesProvider.ensureUpToDate(options);

            // Get the Syntax Tree
            var syntaxTree = getSyntaxTree(filename);

            // Convert IScriptSnapshot to ITextSnapshot
            var scriptSnapshot = syntaxTreeCache.getCurrentScriptSnapshot(filename);
            var scriptText = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(scriptText);

            var manager = new TypeScript.Services.Formatting.FormattingManager(syntaxTree, textSnapshot, formattingRulesProvider, options);

            return manager;
        }

        function getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[] {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var manager = getFormattingManager(fileName, options);
            return manager.formatSelection(start, end);
        }

        function getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[] {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var manager = getFormattingManager(fileName, options);
            return manager.formatDocument();
        }

        function getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[] {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var manager = getFormattingManager(fileName, options);

            if (key === "}") {
                return manager.formatOnClosingCurlyBrace(position);
            }
            else if (key === ";") {
                return manager.formatOnSemicolon(position);
            }
            else if (key === "\n") {
                return manager.formatOnEnter(position);
            }

            return [];
        }

        function getTodoComments(filename: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var sourceFile = getCurrentSourceFile(filename);

            cancellationToken.throwIfCancellationRequested();

            var fileContents = sourceFile.text;

            cancellationToken.throwIfCancellationRequested();

            var result: TodoComment[] = [];

            if (descriptors.length > 0) {
                var regExp = getTodoCommentsRegExp();

                var matchArray: RegExpExecArray;
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
                    Debug.assert(matchArray.length === descriptors.length + firstDescriptorCaptureIndex);

                    var preamble = matchArray[1];
                    var matchPosition = matchArray.index + preamble.length;

                    // OK, we have found a match in the file.  This is only an acceptable match if
                    // it is contained within a comment.
                    var token = getTokenAtPosition(sourceFile, matchPosition);

                    if (token.getStart() <= matchPosition && matchPosition < token.getEnd()) {
                        // match was within the token itself.  Not in the comment.  Keep searching
                        // descriptor.
                        continue;
                    }

                    // Looks to be within the trivia. See if we can find the comment containing it.
                    if (!getContainingComment(getTrailingCommentRanges(fileContents, token.getFullStart()), matchPosition) &&
                        !getContainingComment(getLeadingCommentRanges(fileContents, token.getFullStart()), matchPosition)) {
                        continue;
                    }

                    var descriptor: TodoCommentDescriptor = undefined;
                    for (var i = 0, n = descriptors.length; i < n; i++) {
                        if (matchArray[i + firstDescriptorCaptureIndex]) {
                            descriptor = descriptors[i];
                        }
                    }
                    Debug.assert(descriptor);

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

            function escapeRegExp(str: string): string {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }

            function getTodoCommentsRegExp(): RegExp {
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
                var literals = "(?:" + map(descriptors, d => "(" + escapeRegExp(d.text) + ")").join("|") + ")";

                // After matching a descriptor literal, the following regexp matches the rest of the 
                // text up to the end of the line (or */).
                var endOfLineOrEndOfComment = /(?:$|\*\/)/.source
                var messageRemainder = /(?:.*?)/.source

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

            function getContainingComment(comments: CommentRange[], position: number): CommentRange {
                if (comments) {
                    for (var i = 0, n = comments.length; i < n; i++) {
                        var comment = comments[i];
                        if (comment.pos <= position && position < comment.end) {
                            return comment;
                        }
                    }
                }

                return undefined;
            }

            function isLetterOrDigit(char: number): boolean {
                return (char >= TypeScript.CharacterCodes.a && char <= TypeScript.CharacterCodes.z) ||
                    (char >= TypeScript.CharacterCodes.A && char <= TypeScript.CharacterCodes.Z) ||
                    (char >= TypeScript.CharacterCodes._0 && char <= TypeScript.CharacterCodes._9);
            }
        }


        function getRenameInfo(fileName: string, position: number): RenameInfo {
            synchronizeHostData();

            fileName = TypeScript.switchToForwardSlashes(fileName);
            var sourceFile = getSourceFile(fileName);

            var node = getTouchingWord(sourceFile, position);

            // Can only rename an identifier.
            if (node && node.kind === SyntaxKind.Identifier) {
                var symbol = typeInfoResolver.getSymbolInfo(node);

                // Only allow a symbol to be renamed if it actually has at least one declaration.
                if (symbol && symbol.getDeclarations() && symbol.getDeclarations().length > 0) {
                    var kind = getSymbolKind(symbol, typeInfoResolver);
                    if (kind) {
                        return getRenameInfo(symbol.name, typeInfoResolver.getFullyQualifiedName(symbol), kind,
                            getSymbolModifiers(symbol),
                            new TypeScript.TextSpan(node.getStart(), node.getWidth()));
                    }
                }
            }

            return getRenameInfoError(getLocaleSpecificMessage(Diagnostics.You_cannot_rename_this_element.key));

            function getRenameInfoError(localizedErrorMessage: string): RenameInfo {
                return {
                    canRename: false,
                    localizedErrorMessage: getLocaleSpecificMessage(Diagnostics.You_cannot_rename_this_element.key),
                    displayName: undefined,
                    fullDisplayName: undefined,
                    kind: undefined,
                    kindModifiers: undefined,
                    triggerSpan: undefined
                };
            }

            function getRenameInfo(displayName: string, fullDisplayName: string, kind: string, kindModifiers: string, triggerSpan: TypeScript.TextSpan): RenameInfo {
                return {
                    canRename: true,
                    localizedErrorMessage: undefined,
                    displayName: displayName,
                    fullDisplayName: fullDisplayName,
                    kind: kind,
                    kindModifiers: kindModifiers,
                    triggerSpan: triggerSpan
                };
            }
        }

        return {
            dispose: dispose,
            cleanupSemanticCache: cleanupSemanticCache,
            getSyntacticDiagnostics: getSyntacticDiagnostics,
            getSemanticDiagnostics: getSemanticDiagnostics,
            getCompilerOptionsDiagnostics: getCompilerOptionsDiagnostics,
            getSyntacticClassifications: getSyntacticClassifications,
            getSemanticClassifications: getSemanticClassifications,
            getCompletionsAtPosition: getCompletionsAtPosition,
            getCompletionEntryDetails: getCompletionEntryDetails,
            getSignatureHelpItems: getSignatureHelpItems,
            getQuickInfoAtPosition: getQuickInfoAtPosition,
            getDefinitionAtPosition: getDefinitionAtPosition,
            getReferencesAtPosition: getReferencesAtPosition,
            getOccurrencesAtPosition: getOccurrencesAtPosition,
            getImplementorsAtPosition: (filename, position) => [],
            getNameOrDottedNameSpan: getNameOrDottedNameSpan,
            getBreakpointStatementAtPosition: getBreakpointStatementAtPosition,
            getNavigateToItems: getNavigateToItems,
            getRenameInfo: getRenameInfo,
            findRenameLocations: findRenameLocations,
            getNavigationBarItems: getNavigationBarItems,
            getOutliningSpans: getOutliningSpans,
            getTodoComments: getTodoComments,
            getBraceMatchingAtPosition: getBraceMatchingAtPosition,
            getIndentationAtPosition: getIndentationAtPosition,
            getFormattingEditsForRange: getFormattingEditsForRange,
            getFormattingEditsForDocument: getFormattingEditsForDocument,
            getFormattingEditsAfterKeystroke: getFormattingEditsAfterKeystroke,
            getEmitOutput: getEmitOutput,
            getSignatureAtPosition: getSignatureAtPosition,
        };
    }

    /// Classifier
    export function createClassifier(host: Logger): Classifier {
        var scanner = createScanner(ScriptTarget.ES5, /*skipTrivia*/ false);

        /// We do not have a full parser support to know when we should parse a regex or not
        /// If we consider every slash token to be a regex, we could be missing cases like "1/2/3", where
        /// we have a series of divide operator. this list allows us to be more accurate by ruling out 
        /// locations where a regexp cannot exist.
        var noRegexTable: boolean[] = [];
        noRegexTable[SyntaxKind.Identifier] = true;
        noRegexTable[SyntaxKind.StringLiteral] = true;
        noRegexTable[SyntaxKind.NumericLiteral] = true;
        noRegexTable[SyntaxKind.RegularExpressionLiteral] = true;
        noRegexTable[SyntaxKind.ThisKeyword] = true;
        noRegexTable[SyntaxKind.PlusPlusToken] = true;
        noRegexTable[SyntaxKind.MinusMinusToken] = true;
        noRegexTable[SyntaxKind.CloseParenToken] = true;
        noRegexTable[SyntaxKind.CloseBracketToken] = true;
        noRegexTable[SyntaxKind.CloseBraceToken] = true;
        noRegexTable[SyntaxKind.TrueKeyword] = true;
        noRegexTable[SyntaxKind.FalseKeyword] = true;

        function isAccessibilityModifier(kind: SyntaxKind) {
            switch (kind) {
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                    return true;
            }

            return false;
        }

        /** Returns true if 'keyword2' can legally follow 'keyword1' in any language construct. */
        function canFollow(keyword1: SyntaxKind, keyword2: SyntaxKind) {
            if (isAccessibilityModifier(keyword1)) {
                if (keyword2 === SyntaxKind.GetKeyword ||
                    keyword2 === SyntaxKind.SetKeyword ||
                    keyword2 === SyntaxKind.ConstructorKeyword ||
                    keyword2 === SyntaxKind.StaticKeyword) {

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

        function getClassificationsForLine(text: string, lexState: EndOfLineState): ClassificationResult {
            var offset = 0;
            var lastTokenOrCommentEnd = 0;
            var token = SyntaxKind.Unknown;
            var lastNonTriviaToken = SyntaxKind.Unknown;

            // If we're in a string literal, then prepend: "\
            // (and a newline).  That way when we lex we'll think we're still in a string literal.
            //
            // If we're in a multiline comment, then prepend: /*
            // (and a newline).  That way when we lex we'll think we're still in a multiline comment.
            switch (lexState) {
                case EndOfLineState.InDoubleQuoteStringLiteral:
                    text = '"\\\n' + text;
                    offset = 3;
                    break;
                case EndOfLineState.InSingleQuoteStringLiteral:
                    text = "'\\\n" + text;
                    offset = 3;
                    break;
                case EndOfLineState.InMultiLineCommentTrivia:
                    text = "/*\n" + text;
                    offset = 3;
                    break;
            }

            scanner.setText(text);

            var result: ClassificationResult = {
                finalLexState: EndOfLineState.Start,
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

                if (!isTrivia(token)) {
                    if ((token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) && !noRegexTable[lastNonTriviaToken]) {
                        if (scanner.reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                            token = SyntaxKind.RegularExpressionLiteral;
                        }
                    }
                    else if (lastNonTriviaToken === SyntaxKind.DotToken && isKeyword(token)) {
                        token = SyntaxKind.Identifier;
                    }
                    else if (isKeyword(lastNonTriviaToken) && isKeyword(token) && !canFollow(lastNonTriviaToken, token)) {
                        // We have two keywords in a row.  Only treat the second as a keyword if 
                        // it's a sequence that could legally occur in the language.  Otherwise
                        // treat it as an identifier.  This way, if someone writes "private var"
                        // we recognize that 'var' is actually an identifier here.
                        token = SyntaxKind.Identifier;
                    }
                    else if (lastNonTriviaToken === SyntaxKind.Identifier &&
                             token === SyntaxKind.LessThanToken) {
                        // Could be the start of something generic.  Keep track of that by bumping 
                        // up the current count of generic contexts we may be in.
                        angleBracketStack++;
                    }
                    else if (token === SyntaxKind.GreaterThanToken && angleBracketStack > 0) {
                        // If we think we're currently in something generic, then mark that that
                        // generic entity is complete.
                        angleBracketStack--;
                    }
                    else if (token === SyntaxKind.AnyKeyword ||
                             token === SyntaxKind.StringKeyword ||
                             token === SyntaxKind.NumberKeyword ||
                             token === SyntaxKind.BooleanKeyword) {
                        if (angleBracketStack > 0) {
                            // If it looks like we're could be in something generic, don't classify this 
                            // as a keyword.  We may just get overwritten by the syntactic classifier,
                            // causing a noisy experience for the user.
                            token = SyntaxKind.Identifier;
                        }
                    }

                    lastNonTriviaToken = token;
                }

                processToken();
            }
            while (token !== SyntaxKind.EndOfFileToken);

            return result;

            function processToken(): void {
                var start = scanner.getTokenPos();
                var end = scanner.getTextPos();

                // add the token
                addResult(end - start, classFromKind(token));

                if (end >= text.length) {
                    // We're at the end.
                    if (token === SyntaxKind.StringLiteral) {
                        // Check to see if we finished up on a multiline string literal.
                        var tokenText = scanner.getTokenText();
                        if (tokenText.length > 0 && tokenText.charCodeAt(tokenText.length - 1) === CharacterCodes.backslash) {
                            var quoteChar = tokenText.charCodeAt(0);
                            result.finalLexState = quoteChar === CharacterCodes.doubleQuote
                                ? EndOfLineState.InDoubleQuoteStringLiteral
                                : EndOfLineState.InSingleQuoteStringLiteral;
                        }
                    }
                    else if (token === SyntaxKind.MultiLineCommentTrivia) {
                        // Check to see if the multiline comment was unclosed.
                        var tokenText = scanner.getTokenText()
                        if (!(tokenText.length > 3 && // need to avoid catching '/*/'
                            tokenText.charCodeAt(tokenText.length - 2) === CharacterCodes.asterisk &&
                            tokenText.charCodeAt(tokenText.length - 1) === CharacterCodes.slash)) {
                            result.finalLexState = EndOfLineState.InMultiLineCommentTrivia;
                        }
                    }
                }
            }

            function addResult(length: number, classification: TokenClass): void {
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

        function isBinaryExpressionOperatorToken(token: SyntaxKind): boolean {
            switch (token) {
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.InstanceOfKeyword:
                case SyntaxKind.InKeyword:
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                case SyntaxKind.AmpersandToken:
                case SyntaxKind.CaretToken:
                case SyntaxKind.BarToken:
                case SyntaxKind.AmpersandAmpersandToken:
                case SyntaxKind.BarBarToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.EqualsToken:
                case SyntaxKind.CommaToken:
                    return true;
                default: return false;
            }
        }

        function isPrefixUnaryExpressionOperatorToken(token: SyntaxKind): boolean {
            switch (token) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    return true;
                default:
                    return false;
            }
        }

        function isKeyword(token: SyntaxKind): boolean {
            return token >= SyntaxKind.FirstKeyword && token <= SyntaxKind.LastKeyword;
        }

        function classFromKind(token: SyntaxKind) {
            if (isKeyword(token)) {
                return TokenClass.Keyword;
            }
            else if (isBinaryExpressionOperatorToken(token) || isPrefixUnaryExpressionOperatorToken(token)) {
                return TokenClass.Operator;
            }
            else if (token >= SyntaxKind.FirstPunctuation && token <= SyntaxKind.LastPunctuation) {
                return TokenClass.Punctuation;
            }

            switch (token) {
                case SyntaxKind.NumericLiteral:
                    return TokenClass.NumberLiteral;
                case SyntaxKind.StringLiteral:
                    return TokenClass.StringLiteral;
                case SyntaxKind.RegularExpressionLiteral:
                    return TokenClass.RegExpLiteral;
                case SyntaxKind.MultiLineCommentTrivia:
                case SyntaxKind.SingleLineCommentTrivia:
                    return TokenClass.Comment;
                case SyntaxKind.WhitespaceTrivia:
                    return TokenClass.Whitespace;
                case SyntaxKind.Identifier:
                default:
                    return TokenClass.Identifier;
            }
        }

        return {
            getClassificationsForLine: getClassificationsForLine
        };
    }

    function initializeServices() {
        objectAllocator = {
            getNodeConstructor: kind => {
                function Node() {
                }
                var proto = kind === SyntaxKind.SourceFile ? new SourceFileObject() : new NodeObject();
                proto.kind = kind;
                proto.pos = 0;
                proto.end = 0;
                proto.flags = 0;
                proto.parent = undefined;
                Node.prototype = proto;
                return <any>Node;
            },
            getSymbolConstructor: () => SymbolObject,
            getTypeConstructor: () => TypeObject,
            getSignatureConstructor: () => SignatureObject,
        };
    }

    initializeServices();
}
