/// <reference path="..\compiler\program.ts"/>

/// <reference path='breakpoints.ts' />
/// <reference path='outliningElementsCollector.ts' />
/// <reference path='navigationBar.ts' />
/// <reference path='signatureHelp.ts' />
/// <reference path='utilities.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='formatting\smartIndenter.ts' />

module ts {

    export var servicesVersion = "0.5"

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
        getText(sourceFile?: SourceFile): string;
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
        version: string;
        scriptSnapshot: IScriptSnapshot;
        nameTable: Map<string>;
        getNamedDeclarations(): Declaration[];
    }

    /**
     * Represents an immutable snapshot of a script at a specified time.Once acquired, the 
     * snapshot is observably immutable. i.e. the same calls with the same parameters will return
     * the same values.
     */
    export interface IScriptSnapshot {
        /** Gets a portion of the script snapshot specified by [start, end). */
        getText(start: number, end: number): string;

        /** Gets the length of this script snapshot. */
        getLength(): number;

        /**
         * Gets the TextChangeRange that describe how the text changed between this text and 
         * an older version.  This information is used by the incremental parser to determine
         * what sections of the script need to be re-parsed.  'undefined' can be returned if the 
         * change range cannot be determined.  However, in that case, incremental parsing will
         * not happen and the entire document will be re - parsed.
         */
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange;
    }

    export module ScriptSnapshot {
        class StringScriptSnapshot implements IScriptSnapshot {
            private _lineStartPositions: number[] = undefined;

            constructor(private text: string) {
            }

            public getText(start: number, end: number): string {
                return this.text.substring(start, end);
            }

            public getLength(): number {
                return this.text.length;
            }

            public getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange {
                // Text-based snapshots do not support incremental parsing. Return undefined
                // to signal that to the caller.
                return undefined;
            }
        }

        export function fromString(text: string): IScriptSnapshot {
            return new StringScriptSnapshot(text);
        }
    }
    export interface PreProcessedFileInfo {
        referencedFiles: FileReference[];
        importedFiles: FileReference[];
        isLibFile: boolean
    }

    var scanner: Scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);

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

        public getText(sourceFile?: SourceFile): string {
            return (sourceFile || this.getSourceFile()).text.substring(this.getStart(), this.getEnd());
        }

        private addSyntheticNodes(nodes: Node[], pos: number, end: number): number {
            scanner.setTextPos(pos);
            while (pos < end) {
                var token = scanner.scan();
                var textPos = scanner.getTextPos();
                nodes.push(createNode(token, pos, textPos, NodeFlags.Synthetic, this));
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
            if (this.kind >= SyntaxKind.FirstNode) {
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
                if (child.kind < SyntaxKind.FirstNode) {
                    return child;
                }

                return child.getFirstToken(sourceFile);
            }
        }

        public getLastToken(sourceFile?: SourceFile): Node {
            var children = this.getChildren(sourceFile);
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.kind < SyntaxKind.FirstNode) {
                    return child;
                }

                return child.getLastToken(sourceFile);
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

            ts.forEach(declarations, (declaration, indexOfDeclaration) => {
                // Make sure we are collecting doc comment from declaration once,
                // In case of union property there might be same declaration multiple times 
                // which only varies in type parameter
                // Eg. var a: Array<string> | Array<number>; a.length
                // The property length will have two declarations of property length coming 
                // from Array<T> - Array<string> and Array<number>
                if (indexOf(declarations, declaration) === indexOfDeclaration) {
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
                        declaration = <ModuleDeclaration>declaration.parent;
                    } 

                    // Get the cleaned js doc comment text from the declaration
                    ts.forEach(getJsDocCommentTextRange(
                        declaration.kind === SyntaxKind.VariableDeclaration ? declaration.parent.parent : declaration, sourceFileOfDeclaration), jsDocCommentTextRange => {
                            var cleanedJsDocComment = getCleanedJsDocComment(jsDocCommentTextRange.pos, jsDocCommentTextRange.end, sourceFileOfDeclaration);
                            if (cleanedJsDocComment) {
                                jsDocCommentParts.push.apply(jsDocCommentParts, cleanedJsDocComment);
                            }
                        });
                }
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
                    (isWhiteSpace(sourceFile.text.charCodeAt(pos + name.length)) ||
                    isLineBreak(sourceFile.text.charCodeAt(pos + name.length)));
            }

            function isParamTag(pos: number, end: number, sourceFile: SourceFile) {
                // If it is @param tag
                return isName(pos, end, sourceFile, paramTag);
            }

            function pushDocCommentLineText(docComments: SymbolDisplayPart[], text: string, blankLineCount: number) {
                // Add the empty lines in between texts
                while (blankLineCount--) docComments.push(textPart(""));
                docComments.push(textPart(text));
            }

            function getCleanedJsDocComment(pos: number, end: number, sourceFile: SourceFile) {
                var spacesToRemoveAfterAsterisk: number;
                var docComments: SymbolDisplayPart[] = [];
                var blankLineCount = 0;
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
                var paramHelpStringMargin: number;
                var paramDocComments: SymbolDisplayPart[] = [];
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
            return this.checker.getAugmentedPropertiesOfType(this);
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
                    /*name*/ undefined,
                    /*canUseParsedParamTagComments*/ false) : [];
            }

            return this.documentationComment;
        }
    }

    class SourceFileObject extends NodeObject implements SourceFile {
        public _declarationBrand: any;
        public filename: string;
        public text: string;
        public scriptSnapshot: IScriptSnapshot;

        public statements: NodeArray<Statement>;
        public endOfFileToken: Node;

        // These methods will have their implementation provided by the implementation the 
        // compiler actually exports off of SourceFile.
        public getLineAndCharacterFromPosition: (position: number) => LineAndCharacter;
        public getPositionFromLineAndCharacter: (line: number, character: number) => number;
        public getLineStarts: () => number[];
        public getSyntacticDiagnostics: () => Diagnostic[];
        public update: (newText: string, textChangeRange: TextChangeRange) => SourceFile;

        public amdDependencies: string[];
        public amdModuleName: string;
        public referencedFiles: FileReference[];

        public referenceDiagnostics: Diagnostic[];
        public parseDiagnostics: Diagnostic[];
        public semanticDiagnostics: Diagnostic[];

        public hasNoDefaultLib: boolean;
        public externalModuleIndicator: Node; // The first node that causes this file to be an external module
        public nodeCount: number;
        public identifierCount: number;
        public symbolCount: number;
        public version: string;
        public languageVersion: ScriptTarget;
        public identifiers: Map<string>;
        public nameTable: Map<string>;

        private namedDeclarations: Declaration[];

        public getNamedDeclarations() {
            if (!this.namedDeclarations) {
                var sourceFile = this;
                var namedDeclarations: Declaration[] = [];

                forEachChild(sourceFile, function visit(node: Node): void {
                    switch (node.kind) {
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
                            var functionDeclaration = <FunctionLikeDeclaration>node;

                            if (functionDeclaration.name && functionDeclaration.name.getFullWidth() > 0) {
                                var lastDeclaration = namedDeclarations.length > 0 ?
                                    namedDeclarations[namedDeclarations.length - 1] :
                                    undefined;

                                // Check whether this declaration belongs to an "overload group".
                                if (lastDeclaration && functionDeclaration.symbol === lastDeclaration.symbol) {
                                    // Overwrite the last declaration if it was an overload
                                    // and this one is an implementation.
                                    if (functionDeclaration.body && !(<FunctionLikeDeclaration>lastDeclaration).body) {
                                        namedDeclarations[namedDeclarations.length - 1] = functionDeclaration;
                                    }
                                }
                                else {
                                    namedDeclarations.push(functionDeclaration);
                                }

                                forEachChild(node, visit);
                            }
                            break;

                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                        case SyntaxKind.TypeAliasDeclaration:
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
                        case SyntaxKind.VariableDeclarationList:
                        case SyntaxKind.ObjectBindingPattern:
                        case SyntaxKind.ArrayBindingPattern:
                        case SyntaxKind.ModuleBlock:
                            forEachChild(node, visit);
                            break;

                        case SyntaxKind.Block:
                            if (isFunctionBlock(node)) {
                                forEachChild(node, visit);
                            }
                            break;

                        case SyntaxKind.Parameter:
                            // Only consider properties defined as constructor parameters
                            if (!(node.flags & NodeFlags.AccessibilityModifier)) {
                                break;
                            }
                            // fall through
                        case SyntaxKind.VariableDeclaration:
                        case SyntaxKind.BindingElement:
                            if (isBindingPattern((<VariableDeclaration>node).name)) {
                                forEachChild((<VariableDeclaration>node).name, visit);
                                break;
                            }
                        case SyntaxKind.EnumMember:
                        case SyntaxKind.PropertyDeclaration:
                        case SyntaxKind.PropertySignature:
                            namedDeclarations.push(<Declaration>node);
                            break;
                    }
                });

                this.namedDeclarations = namedDeclarations;
            }

            return this.namedDeclarations;
        }
    }

    //
    // Public interface of the host of a language service instance.
    //
    export interface LanguageServiceHost {
        getCompilationSettings(): CompilerOptions;
        getNewLine?(): string;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): string;
        getScriptSnapshot(fileName: string): IScriptSnapshot;
        getLocalizedDiagnosticMessages?(): any;
        getCancellationToken?(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFilename(options: CompilerOptions): string;
        log? (s: string): void;
        trace? (s: string): void;
        error? (s: string): void;
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

        getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
        getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];

        getCompletionsAtPosition(fileName: string, position: number): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;

        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan;

        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan;

        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;

        getRenameInfo(fileName: string, position: number): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[];
        
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];

        getNavigateToItems(searchValue: string): NavigateToItem[];
        getNavigationBarItems(fileName: string): NavigationBarItem[];

        getOutliningSpans(fileName: string): OutliningSpan[];
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number;

        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[];

        getEmitOutput(fileName: string): EmitOutput;

        getProgram(): Program;

        getSourceFile(filename: string): SourceFile;

        dispose(): void;
    }
 
    export interface ClassifiedSpan {
        textSpan: TextSpan;
        classificationType: string; // ClassificationTypeNames
    }

    export interface NavigationBarItem {
        text: string;
        kind: string;
        kindModifiers: string;
        spans: TextSpan[];
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
        span: TextSpan;
        newText: string;
    }

    export interface RenameLocation {
        textSpan: TextSpan;
        fileName: string;
    }

    export interface ReferenceEntry {
        textSpan: TextSpan;
        fileName: string;
        isWriteAccess: boolean;
    }

    export interface NavigateToItem {
        name: string;
        kind: string;
        kindModifiers: string;
        matchKind: string;
        fileName: string;
        textSpan: TextSpan;
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
        textSpan: TextSpan;
        kind: string;
        name: string;
        containerKind: string;
        containerName: string;
    }

    export enum SymbolDisplayPartKind {
        aliasName,
        className,
        enumName,
        fieldName,
        interfaceName,
        keyword,
        lineBreak,
        numericLiteral,
        stringLiteral,
        localName,
        methodName,
        moduleName,
        operator,
        parameterName,
        propertyName,
        punctuation,
        space,
        text,
        typeParameterName,
        enumMemberName,
        functionName,
        regularExpressionLiteral,
    }

    export interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    
    export interface QuickInfo {
        kind: string;
        kindModifiers: string;
        textSpan: TextSpan;
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
        triggerSpan: TextSpan;
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
        applicableSpan: TextSpan;
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

    export interface OutliningSpan {
        /** The span of the document to actually collapse. */
        textSpan: TextSpan;

        /** The span of the document to display when the user hovers over the collapsed span. */
        hintSpan: TextSpan;

        /** The text to display in the editor for the collapsed region. */
        bannerText: string;

        /** 
          * Whether or not this region should be automatically collapsed when 
          * the 'Collapse to Definitions' command is invoked.
          */
        autoCollapse: boolean;
    }

    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitOutputStatus: EmitReturnStatus;
    }

    export const enum OutputFileType {
        JavaScript,
        SourceMap,
        Declaration
    }

    export interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }

    export const enum EndOfLineState {
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
        getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics?: boolean): ClassificationResult;
    }

    /**
      * The document registry represents a store of SourceFile objects that can be shared between 
      * multiple LanguageService instances. A LanguageService instance holds on the SourceFile (AST)
      * of files in the context. 
      * SourceFile objects account for most of the memory usage by the language service. Sharing 
      * the same DocumentRegistry instance between different instances of LanguageService allow 
      * for more efficient memory utilization since all projects will share at least the library 
      * file (lib.d.ts).
      *
      * A more advanced use of the document registry is to serialize sourceFile objects to disk 
      * and re-hydrate them when needed.
      *
      * To create a default DocumentRegistry, use createDocumentRegistry to create one, and pass it 
      * to all subsequent createLanguageService calls.
      */
    export interface DocumentRegistry {
        /**
          * Request a stored SourceFile with a given filename and compilationSettings.
          * The first call to acquire will call createLanguageServiceSourceFile to generate
          * the SourceFile if was not found in the registry.
          *
          * @param filename The name of the file requested
          * @param compilationSettings Some compilation settings like target affects the 
          * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
          * multiple copies of the same file for different compilation settings.
          * @parm scriptSnapshot Text of the file. Only used if the file was not found
          * in the registry and a new one was created.
          * @parm version Current version of the file. Only used if the file was not found
          * in the registry and a new one was created.
          */
        acquireDocument(
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: string): SourceFile;

        /**
          * Request an updated version of an already existing SourceFile with a given filename
          * and compilationSettings. The update will intern call updateLanguageServiceSourceFile
          * to get an updated SourceFile.
          *
          * Note: It is not allowed to call update on a SourceFile that was not acquired from this
          * registry originally.
          *
          * @param sourceFile The original sourceFile object to update
          * @param filename The name of the file requested
          * @param compilationSettings Some compilation settings like target affects the 
          * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
          * multiple copies of the same file for different compilation settings.
          * @parm scriptSnapshot Text of the file. Only used if the file was not found
          * in the registry and a new one was created.
          * @parm version Current version of the file. Only used if the file was not found
          * in the registry and a new one was created.
          * @parm textChangeRange Change ranges since the last snapshot. Only used if the file 
          * was not found in the registry and a new one was created.
          */
        updateDocument(
            sourceFile: SourceFile,
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: string,
            textChangeRange: TextChangeRange): SourceFile;

        /**
          * Informs the DocumentRegistry that a file is not needed any longer.
          *
          * Note: It is not allowed to call release on a SourceFile that was not acquired from
          * this registry originally.
          *
          * @param filename The name of the file to be released
          * @param compilationSettings The compilation settings used to acquire the file
          */
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

        // type T = ...
        static typeElement = "type";

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

        static alias = "alias";

        static constElement = "const";

        static letElement = "let";
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
        public static typeAlias = "type alias name";
    }

    enum MatchKind {
        none = 0,
        exact = 1,
        substring = 2,
        prefix = 3
    }

    /// Language Service

    interface CompletionSession {
        filename: string;           // the file where the completion was requested
        position: number;           // position in the file where the completion was requested
        entries: CompletionEntry[]; // entries for this completion
        symbols: Map<Symbol>;       // symbols by entry name map
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
        hostFilename: string;
        version: string;
        scriptSnapshot: IScriptSnapshot;
    }

    interface DocumentRegistryEntry {
        sourceFile: SourceFile;
        refCount: number;
        owners: string[];
    }

    export interface DisplayPartsSymbolWriter extends SymbolWriter {
        displayParts(): SymbolDisplayPart[];
    }

    export function displayPartsToString(displayParts: SymbolDisplayPart[]) {
        if (displayParts) {
            return map(displayParts, displayPart => displayPart.text).join("");
        }

        return "";
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
            for (var parent = declaration.parent; !isFunctionBlock(parent); parent = parent.parent) {
                // Reached source file or module block
                if (parent.kind === SyntaxKind.SourceFile || parent.kind === SyntaxKind.ModuleBlock) {
                    return false;
                }
            }

            // parent is in function block
            return true;
        });
    }

    export function getDefaultCompilerOptions(): CompilerOptions {
        // Set "ScriptTarget.Latest" target by default for language service
        return {
            target: ScriptTarget.Latest,
            module: ModuleKind.None,
        };
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

            // Initialize the list with the root file names
            var rootFilenames = host.getScriptFileNames();
            for (var i = 0, n = rootFilenames.length; i < n; i++) {
                this.createEntry(rootFilenames[i]);
            }

            // store the compilation settings
            this._compilationSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        }

        public compilationSettings() {
            return this._compilationSettings;
        }

        private createEntry(filename: string) {
            var entry: HostFileInformation;
            var scriptSnapshot = this.host.getScriptSnapshot(filename);
            if (scriptSnapshot) {
                entry = {
                    hostFilename: filename,
                    version: this.host.getScriptVersion(filename),
                    scriptSnapshot: scriptSnapshot
                };
            }

            return this.filenameToEntry[normalizeSlashes(filename)] = entry;
        }

        public getEntry(filename: string): HostFileInformation {
            return lookUp(this.filenameToEntry, normalizeSlashes(filename));
        }

        public contains(filename: string): boolean {
            return hasProperty(this.filenameToEntry, normalizeSlashes(filename));
        }

        public getOrCreateEntry(filename: string): HostFileInformation {
            if (this.contains(filename)) {
                return this.getEntry(filename);
            }

            return this.createEntry(filename);
        }

        public getRootFilenames(): string[] {
            var fileNames: string[] = [];

            forEachKey(this.filenameToEntry, key => {
                if (hasProperty(this.filenameToEntry, key) && this.filenameToEntry[key])
                    fileNames.push(key);
            });

            return fileNames;
        }

        public getVersion(filename: string): string {
            var file = this.getEntry(filename);
            return file && file.version;
        }

        public getScriptSnapshot(filename: string): IScriptSnapshot {
            var file = this.getEntry(filename);
            return file && file.scriptSnapshot;
        }

        public getChangeRange(filename: string, lastKnownVersion: string, oldScriptSnapshot: IScriptSnapshot): TextChangeRange {
            var currentVersion = this.getVersion(filename);
            if (lastKnownVersion === currentVersion) {
                return unchangedTextChangeRange; // "No changes"
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

        constructor(private host: LanguageServiceHost) {
        }

        private log(message: string) {
            if (this.host.log) {
                this.host.log(message);
            }
        }

        private initialize(filename: string) {
            // ensure that both source file and syntax tree are either initialized or not initialized
            var start = new Date().getTime();
            this.hostCache = new HostCache(this.host);
            this.log("SyntaxTreeCache.Initialize: new HostCache: " + (new Date().getTime() - start));

            var version = this.hostCache.getVersion(filename);
            var sourceFile: SourceFile;

            if (this.currentFilename !== filename) {
                var scriptSnapshot = this.hostCache.getScriptSnapshot(filename);

                var start = new Date().getTime();
                sourceFile = createLanguageServiceSourceFile(filename, scriptSnapshot, ScriptTarget.Latest, version, /*setNodeParents:*/ true);
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
        }

        public getCurrentSourceFile(filename: string): SourceFile {
            this.initialize(filename);
            return this.currentSourceFile;
        }

        public getCurrentScriptSnapshot(filename: string): IScriptSnapshot {
            return this.getCurrentSourceFile(filename).scriptSnapshot;
        }
    }

    function setSourceFileFields(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string) {
        sourceFile.version = version;
        sourceFile.scriptSnapshot = scriptSnapshot;
    } 

    export function createLanguageServiceSourceFile(filename: string, scriptSnapshot: IScriptSnapshot, scriptTarget: ScriptTarget, version: string, setNodeParents: boolean): SourceFile {
        var sourceFile = createSourceFile(filename, scriptSnapshot.getText(0, scriptSnapshot.getLength()), scriptTarget, setNodeParents);
        setSourceFileFields(sourceFile, scriptSnapshot, version);
        // after full parsing we can use table with interned strings as name table
        sourceFile.nameTable = sourceFile.identifiers;
        return sourceFile;
    }

    export var disableIncrementalParsing = false;

    export function updateLanguageServiceSourceFile(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string, textChangeRange: TextChangeRange): SourceFile {
        if (textChangeRange && Debug.shouldAssert(AssertionLevel.Normal)) {
            var oldText = sourceFile.scriptSnapshot;
            var newText = scriptSnapshot;

            Debug.assert((oldText.getLength() - textChangeRange.span.length + textChangeRange.newLength) === newText.getLength());

            if (Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
                var oldTextPrefix = oldText.getText(0, textChangeRange.span.start);
                var newTextPrefix = newText.getText(0, textChangeRange.span.start);
                Debug.assert(oldTextPrefix === newTextPrefix);

                var oldTextSuffix = oldText.getText(textSpanEnd(textChangeRange.span), oldText.getLength());
                var newTextSuffix = newText.getText(textSpanEnd(textChangeRangeNewSpan(textChangeRange)), newText.getLength());
                Debug.assert(oldTextSuffix === newTextSuffix);
            }
        }

        // If we were given a text change range, and our version or open-ness changed, then 
        // incrementally parse this file.
        if (textChangeRange) {
            if (version !== sourceFile.version) {
                // Once incremental parsing is ready, then just call into this function.
                if (!disableIncrementalParsing) {
                    var newSourceFile = sourceFile.update(scriptSnapshot.getText(0, scriptSnapshot.getLength()), textChangeRange);
                    setSourceFileFields(newSourceFile, scriptSnapshot, version);
                    // after incremental parsing nameTable might not be up-to-date
                    // drop it so it can be lazily recreated later
                    newSourceFile.nameTable = undefined;
                    return newSourceFile;
                }
            }
        }

        // Otherwise, just create a new source file.
        return createLanguageServiceSourceFile(sourceFile.filename, scriptSnapshot, sourceFile.languageVersion, version, /*setNodeParents:*/ true);
    }

    export function createDocumentRegistry(): DocumentRegistry {
        var buckets: Map<Map<DocumentRegistryEntry>> = {};

        function getKeyFromCompilationSettings(settings: CompilerOptions): string {
            return "_" + settings.target; //  + "|" + settings.propagateEnumConstantoString()
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
                    sourceFiles
                };
            });
            return JSON.stringify(bucketInfoArray, null, 2);
        }

        function acquireDocument(
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: string): SourceFile {

            var bucket = getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ true);
            var entry = lookUp(bucket, filename);
            if (!entry) {
                var sourceFile = createLanguageServiceSourceFile(filename, scriptSnapshot, compilationSettings.target, version, /*setNodeParents:*/ false);

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
            scriptSnapshot: IScriptSnapshot,
            version: string,
            textChangeRange: TextChangeRange
            ): SourceFile {

            var bucket = getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ false);
            Debug.assert(bucket !== undefined);
            var entry = lookUp(bucket, filename);
            Debug.assert(entry !== undefined);

            entry.sourceFile = updateLanguageServiceSourceFile(entry.sourceFile, scriptSnapshot, version, textChangeRange);
            return entry.sourceFile;
        }

        function releaseDocument(filename: string, compilationSettings: CompilerOptions): void {
            var bucket = getBucketForCompilationSettings(compilationSettings, false);
            Debug.assert(bucket !== undefined);

            var entry = lookUp(bucket, filename);
            entry.refCount--;

            Debug.assert(entry.refCount >= 0);
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

    export function preProcessFile(sourceText: string, readImportFiles = true): PreProcessedFileInfo {
        var referencedFiles: FileReference[] = [];
        var importedFiles: FileReference[] = [];
        var isNoDefaultLib = false;

        function processTripleSlashDirectives(): void {
            var commentRanges = getLeadingCommentRanges(sourceText, 0);
            forEach(commentRanges, commentRange => {
                var comment = sourceText.substring(commentRange.pos, commentRange.end);
                var referencePathMatchResult = getFileReferenceFromReferencePath(comment, commentRange);
                if (referencePathMatchResult) {
                    isNoDefaultLib = referencePathMatchResult.isNoDefaultLib;
                    var fileReference = referencePathMatchResult.fileReference;
                    if (fileReference) {
                        referencedFiles.push(fileReference);
                    }
                }
            });
        }

        function processImport(): void {
            scanner.setText(sourceText);
            var token = scanner.scan();
            // Look for:
            // import foo = module("foo");
            while (token !== SyntaxKind.EndOfFileToken) {
                if (token === SyntaxKind.ImportKeyword) {
                    token = scanner.scan();
                    if (token === SyntaxKind.Identifier) {
                        token = scanner.scan();
                        if (token === SyntaxKind.EqualsToken) {
                            token = scanner.scan();
                            if (token === SyntaxKind.RequireKeyword) {
                                token = scanner.scan();
                                if (token === SyntaxKind.OpenParenToken) {
                                    token = scanner.scan();
                                    if (token === SyntaxKind.StringLiteral) {
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

    /// Helpers
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

    function isRightSideOfQualifiedName(node: Node) {
        return node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node;
    }

    function isRightSideOfPropertyAccess(node: Node) {
        return node && node.parent && node.parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>node.parent).name === node;
    }

    function isCallExpressionTarget(node: Node): boolean {
        if (isRightSideOfPropertyAccess(node)) {
            node = node.parent;
        }
        return node && node.parent && node.parent.kind === SyntaxKind.CallExpression && (<CallExpression>node.parent).expression === node;
    }

    function isNewExpressionTarget(node: Node): boolean {
        if (isRightSideOfPropertyAccess(node)) {
            node = node.parent;
        }
        return node && node.parent && node.parent.kind === SyntaxKind.NewExpression && (<CallExpression>node.parent).expression === node;
    }

    function isNameOfModuleDeclaration(node: Node) {
        return node.parent.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node.parent).name === node;
    }

    function isNameOfFunctionDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            isAnyFunction(node.parent) && (<FunctionLikeDeclaration>node.parent).name === node;
    }

    /** Returns true if node is a name of an object literal property, e.g. "a" in x = { "a": 1 } */
    function isNameOfPropertyAssignment(node: Node): boolean {
        return (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NumericLiteral) &&
            (node.parent.kind === SyntaxKind.PropertyAssignment || node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) && (<PropertyDeclaration>node.parent).name === node;
    }

    function isLiteralNameOfPropertyDeclarationOrIndexAccess(node: Node): boolean {
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
                    return (<Declaration>node.parent).name === node;
                case SyntaxKind.ElementAccessExpression:
                    return (<ElementAccessExpression>node.parent).argumentExpression === node;
            }
        }

        return false;
    }

    function isNameOfExternalModuleImportOrDeclaration(node: Node): boolean {
        if (node.kind === SyntaxKind.StringLiteral) {
            return isNameOfModuleDeclaration(node) ||
                (isExternalModuleImportDeclaration(node.parent.parent) && getExternalModuleImportDeclarationExpression(node.parent.parent) === node);
        }

        return false;
    }

    /** Returns true if the position is within a comment */
    function isInsideComment(sourceFile: SourceFile, token: Node, position: number): boolean {
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
                    var text = sourceFile.text;
                    var width = comment.end - comment.pos;
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

    const enum SemanticMeaning {
        None = 0x0,
        Value = 0x1,
        Type = 0x2,
        Namespace = 0x4,
        All = Value | Type | Namespace
    }

    const enum BreakContinueSearchType {
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

    export function createLanguageService(host: LanguageServiceHost, documentRegistry: DocumentRegistry = createDocumentRegistry()): LanguageService {
        var syntaxTreeCache: SyntaxTreeCache = new SyntaxTreeCache(host);
        var ruleProvider: formatting.RulesProvider;
        var program: Program;

        // this checker is used to answer all LS questions except errors 
        var typeInfoResolver: TypeChecker;
        var useCaseSensitivefilenames = false;
        var cancellationToken = new CancellationTokenObject(host.getCancellationToken && host.getCancellationToken());
        var activeCompletionSession: CompletionSession;         // The current active completion session, used to get the completion entry details

        // Check if the localized messages json is set, otherwise query the host for it
        if (!localizedDiagnosticMessages && host.getLocalizedDiagnosticMessages) {
            localizedDiagnosticMessages = host.getLocalizedDiagnosticMessages();
        }

        function log(message: string) {
            if (host.log) {
                host.log(message);
            }
        }

        function getCanonicalFileName(filename: string) {
            return useCaseSensitivefilenames ? filename : filename.toLowerCase();
        }

        function getValidSourceFile(filename: string): SourceFile {
            var sourceFile = program.getSourceFile(getCanonicalFileName(filename));
            if (!sourceFile) {
                throw new Error("Could not find file: '" + filename + "'.");
            }
            return sourceFile;
        }

        function getDiagnosticsProducingTypeChecker() {
            return program.getTypeChecker(/*produceDiagnostics:*/ true);
        }

        function getRuleProvider(options: FormatCodeOptions) {
            // Ensure rules are initialized and up to date wrt to formatting options
            if (!ruleProvider) {
                ruleProvider = new formatting.RulesProvider();
            }

            ruleProvider.ensureUpToDate(options);
            return ruleProvider;
        }

        function synchronizeHostData(): void {
            // Get a fresh cache of the host information
            var hostCache = new HostCache(host);

            // If the program is already up-to-date, we can reuse it
            if (programUpToDate()) {
                return;
            }

            var oldSettings = program && program.getCompilerOptions();
            var newSettings = hostCache.compilationSettings();
            var changesInCompilationSettingsAffectSyntax = oldSettings && oldSettings.target !== newSettings.target;

            // Now create a new compiler
            var newProgram = createProgram(hostCache.getRootFilenames(), newSettings, {
                getSourceFile: getOrCreateSourceFile,
                getCancellationToken: () => cancellationToken,
                getCanonicalFileName: (filename) => useCaseSensitivefilenames ? filename : filename.toLowerCase(),
                useCaseSensitiveFileNames: () => useCaseSensitivefilenames,
                getNewLine: () => host.getNewLine ? host.getNewLine() : "\r\n",
                getDefaultLibFilename: (options) => host.getDefaultLibFilename(options),
                writeFile: (filename, data, writeByteOrderMark) => { },
                getCurrentDirectory: () => host.getCurrentDirectory()
            });

            // Release any files we have acquired in the old program but are 
            // not part of the new program.
            if (program) {
                var oldSourceFiles = program.getSourceFiles();
                for (var i = 0, n = oldSourceFiles.length; i < n; i++) {
                    var filename = oldSourceFiles[i].filename;
                    if (!newProgram.getSourceFile(filename) || changesInCompilationSettingsAffectSyntax) {
                        documentRegistry.releaseDocument(filename, oldSettings);
                    }
                }
            }

            program = newProgram;
            typeInfoResolver = program.getTypeChecker(/*produceDiagnostics*/ false);

            return;

            function getOrCreateSourceFile(filename: string): SourceFile {
                cancellationToken.throwIfCancellationRequested();

                // The program is asking for this file, check first if the host can locate it.
                // If the host can not locate the file, then it does not exist. return undefined
                // to the program to allow reporting of errors for missing files.
                var hostFileInformation = hostCache.getOrCreateEntry(filename);
                if (!hostFileInformation) {
                    return undefined;
                }

                // Check if the language version has changed since we last created a program; if they are the same,
                // it is safe to reuse the souceFiles; if not, then the shape of the AST can change, and the oldSourceFile
                // can not be reused. we have to dump all syntax trees and create new ones.
                if (!changesInCompilationSettingsAffectSyntax) {

                    // Check if the old program had this file already
                    var oldSourceFile = program && program.getSourceFile(filename);
                    if (oldSourceFile) {
                        // This SourceFile is safe to reuse, return it
                        if (sourceFileUpToDate(oldSourceFile)) {
                            return oldSourceFile;
                        }

                        // We have an older version of the sourceFile, incrementally parse the changes
                        var textChangeRange = hostCache.getChangeRange(filename, oldSourceFile.version, oldSourceFile.scriptSnapshot);
                        return documentRegistry.updateDocument(oldSourceFile, filename, newSettings, hostFileInformation.scriptSnapshot, hostFileInformation.version, textChangeRange);
                    }
                }

                // Could not find this file in the old program, create a new SourceFile for it.
                return documentRegistry.acquireDocument(filename, newSettings, hostFileInformation.scriptSnapshot, hostFileInformation.version);
            }

            function sourceFileUpToDate(sourceFile: SourceFile): boolean {
                return sourceFile && sourceFile.version === hostCache.getVersion(sourceFile.filename);
            }

            function programUpToDate(): boolean {
                // If we haven't create a program yet, then it is not up-to-date
                if (!program) {
                    return false;
                }

                // If number of files in the program do not match, it is not up-to-date
                var rootFilenames = hostCache.getRootFilenames();
                if (program.getSourceFiles().length !== rootFilenames.length) {
                    return false;
                }

                // If any file is not up-to-date, then the whole program is not up-to-date
                for (var i = 0, n = rootFilenames.length; i < n; i++) {
                    if (!sourceFileUpToDate(program.getSourceFile(rootFilenames[i]))) {
                        return false;
                    }
                }

                // If the compilation settings do no match, then the program is not up-to-date
                return compareDataObjects(program.getCompilerOptions(), hostCache.compilationSettings());
            }
        }

        function getProgram(): Program {
            synchronizeHostData();

            return program;
        }

        /**
         * Clean up any semantic caches that are not needed. 
         * The host can call this method if it wants to jettison unused memory.
         * We will just dump the typeChecker and recreate a new one. this should have the effect of destroying all the semantic caches.
         */
        function cleanupSemanticCache(): void {
            if (program) {
                typeInfoResolver = program.getTypeChecker(/*produceDiagnostics*/ false);
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

            filename = normalizeSlashes(filename);

            return program.getDiagnostics(getValidSourceFile(filename));
        }

        /**
         * getSemanticDiagnostiscs return array of Diagnostics. If '-d' is not enabled, only report semantic errors
         * If '-d' enabled, report both semantic and emitter errors  
         */
        function getSemanticDiagnostics(filename: string) {
            synchronizeHostData();

            filename = normalizeSlashes(filename)
            var compilerOptions = program.getCompilerOptions();
            var checker = getDiagnosticsProducingTypeChecker();
            var targetSourceFile = getValidSourceFile(filename);

            // Only perform the action per file regardless of '-out' flag as LanguageServiceHost is expected to call this function per file.
            // Therefore only get diagnostics for given file.

            var allDiagnostics = checker.getDiagnostics(targetSourceFile);
            if (compilerOptions.declaration) {
                // If '-d' is enabled, check for emitter error. One example of emitter error is export class implements non-export interface
                allDiagnostics = allDiagnostics.concat(program.getDeclarationDiagnostics(targetSourceFile));
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
                    return unescapeIdentifier(displayName);
                }
            }

            return undefined;
        }

        function createCompletionEntry(symbol: Symbol, typeChecker: TypeChecker, location: Node): CompletionEntry {
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

        function getCompletionsAtPosition(filename: string, position: number) {
            synchronizeHostData();

            filename = normalizeSlashes(filename);

            var syntacticStart = new Date().getTime();
            var sourceFile = getValidSourceFile(filename);

            var start = new Date().getTime();
            var currentToken = getTokenAtPosition(sourceFile, position);
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
            var previousToken = findPrecedingToken(position, sourceFile);
            log("getCompletionsAtPosition: Get previous token 1: " + (new Date().getTime() - start));

            // The caret is at the end of an identifier; this is a partial identifier that we want to complete: e.g. a.toS|
            // Skip this partial identifier to the previous token
            if (previousToken && position <= previousToken.end && previousToken.kind === SyntaxKind.Identifier) {
                var start = new Date().getTime();
                previousToken = findPrecedingToken(previousToken.pos, sourceFile);
                log("getCompletionsAtPosition: Get previous token 2: " + (new Date().getTime() - start));
            }

            // Check if this is a valid completion location
            if (previousToken && isCompletionListBlocker(previousToken)) {
                log("Returning an empty list because completion was requested in an invalid position.");
                return undefined;
            }

            // Find the node where completion is requested on, in the case of a completion after a dot, it is the member access expression
            // other wise, it is a request for all visible symbols in the scope, and the node is the current location
            var node: Node;
            var isRightOfDot: boolean;
            if (previousToken && previousToken.kind === SyntaxKind.DotToken && previousToken.parent.kind === SyntaxKind.PropertyAccessExpression) {
                node = (<PropertyAccessExpression>previousToken.parent).expression;
                isRightOfDot = true;
            }
            else if (previousToken && previousToken.kind === SyntaxKind.DotToken && previousToken.parent.kind === SyntaxKind.QualifiedName) {
                node = (<QualifiedName>previousToken.parent).left;
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

            var location = getTouchingPropertyName(sourceFile, position);
            // Populate the completion list
            var semanticStart = new Date().getTime();
            if (isRightOfDot) {
                // Right of dot member completion list
                var symbols: Symbol[] = [];
                var isMemberCompletion = true;

                if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression) {
                    var symbol = typeInfoResolver.getSymbolAtLocation(node);

                    // This is an alias, follow what it aliases
                    if (symbol && symbol.flags & SymbolFlags.Import) {
                        symbol = typeInfoResolver.getAliasedSymbol(symbol);
                    }

                    if (symbol && symbol.flags & SymbolFlags.HasExports) {
                        // Extract module or enum members
                        forEachValue(symbol.exports, symbol => {
                            if (typeInfoResolver.isValidPropertyAccess(<PropertyAccessExpression>(node.parent), symbol.name)) {
                                symbols.push(symbol);
                            }
                        });
                    }
                }

                var type = typeInfoResolver.getTypeAtLocation(node);
                if (type) {
                    // Filter private properties
                    forEach(type.getApparentProperties(), symbol => {
                        if (typeInfoResolver.isValidPropertyAccess(<PropertyAccessExpression>(node.parent), symbol.name)) {
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
                    var symbolMeanings = SymbolFlags.Type | SymbolFlags.Value | SymbolFlags.Namespace | SymbolFlags.Import;
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

            function getCompletionEntriesFromSymbols(symbols: Symbol[], session: CompletionSession): void {
                var start = new Date().getTime();
                forEach(symbols, symbol => {
                    var entry = createCompletionEntry(symbol, session.typeChecker, location);
                    if (entry) {
                        var id = escapeIdentifier(entry.name);
                        if (!lookUp(session.symbols, id)) {
                            session.entries.push(entry);
                            session.symbols[id] = symbol;
                        }
                    }
                });
                log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (new Date().getTime() - start));
            }

            function isCompletionListBlocker(previousToken: Node): boolean {
                var start = new Date().getTime();
                var result = isInStringOrRegularExpressionOrTemplateLiteral(previousToken) ||
                    isIdentifierDefinitionLocation(previousToken) ||
                    isRightOfIllegalDot(previousToken);
                log("getCompletionsAtPosition: isCompletionListBlocker: " + (new Date().getTime() - start));
                return result;
            }

            function isInStringOrRegularExpressionOrTemplateLiteral(previousToken: Node): boolean {
                if (previousToken.kind === SyntaxKind.StringLiteral
                    || previousToken.kind === SyntaxKind.RegularExpressionLiteral
                    || isTemplateLiteralKind(previousToken.kind)) {
                    // The position has to be either: 1. entirely within the token text, or 
                    // 2. at the end position of an unterminated token.
                    var start = previousToken.getStart();
                    var end = previousToken.getEnd();

                    if (start < position && position < end) {
                        return true;
                    }
                    else if (position === end) {
                        return !!(<LiteralExpression>previousToken).isUnterminated;
                    }
                }

                return false;
            }

            function getContainingObjectLiteralApplicableForCompletion(previousToken: Node): ObjectLiteralExpression {
                // The locations in an object literal expression that are applicable for completion are property name definition locations.

                if (previousToken) {
                    var parent = previousToken.parent;

                    switch (previousToken.kind) {
                        case SyntaxKind.OpenBraceToken:  // var x = { |
                        case SyntaxKind.CommaToken:      // var x = { a: 0, |
                            if (parent && parent.kind === SyntaxKind.ObjectLiteralExpression) {
                                return <ObjectLiteralExpression>parent;
                            }
                            break;
                    }
                }

                return undefined;
            }

            function isFunction(kind: SyntaxKind): boolean {
                switch (kind) {
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.IndexSignature:
                        return true;
                }
                return false;
            }

            function isIdentifierDefinitionLocation(previousToken: Node): boolean {
                if (previousToken) {
                    var containingNodeKind = previousToken.parent.kind;
                    switch (previousToken.kind) {
                        case SyntaxKind.CommaToken:
                            return containingNodeKind === SyntaxKind.VariableDeclaration ||
                                containingNodeKind === SyntaxKind.VariableDeclarationList ||
                                containingNodeKind === SyntaxKind.VariableStatement ||
                                containingNodeKind === SyntaxKind.EnumDeclaration ||           // enum a { foo, |
                                isFunction(containingNodeKind);

                        case SyntaxKind.OpenParenToken:
                            return containingNodeKind === SyntaxKind.CatchClause ||
                                isFunction(containingNodeKind);

                        case SyntaxKind.OpenBraceToken:
                            return containingNodeKind === SyntaxKind.EnumDeclaration ||       // enum a { |
                                containingNodeKind === SyntaxKind.InterfaceDeclaration;        // interface a { |

                        case SyntaxKind.SemicolonToken:
                            return containingNodeKind === SyntaxKind.PropertySignature &&
                                previousToken.parent.parent.kind === SyntaxKind.InterfaceDeclaration;    // interface a { f; |

                        case SyntaxKind.PublicKeyword:
                        case SyntaxKind.PrivateKeyword:
                        case SyntaxKind.StaticKeyword:
                        case SyntaxKind.DotDotDotToken:
                            return containingNodeKind === SyntaxKind.Parameter;

                        case SyntaxKind.ClassKeyword:
                        case SyntaxKind.ModuleKeyword:
                        case SyntaxKind.EnumKeyword:
                        case SyntaxKind.InterfaceKeyword:
                        case SyntaxKind.FunctionKeyword:
                        case SyntaxKind.VarKeyword:
                        case SyntaxKind.GetKeyword:
                        case SyntaxKind.SetKeyword:
                        case SyntaxKind.ImportKeyword:
                            return true;
                    }

                    // Previous token may have been a keyword that was converted to an identifier.
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

            function isRightOfIllegalDot(previousToken: Node): boolean {
                if (previousToken && previousToken.kind === SyntaxKind.NumericLiteral) {
                    var text = previousToken.getFullText();
                    return text.charAt(text.length - 1) === ".";
                }

                return false;
            }

            function filterContextualMembersList(contextualMemberSymbols: Symbol[], existingMembers: Declaration[]): Symbol[] {
                if (!existingMembers || existingMembers.length === 0) {
                    return contextualMemberSymbols;
                }

                var existingMemberNames: Map<boolean> = {};
                forEach(existingMembers, m => {
                    if (m.kind !== SyntaxKind.PropertyAssignment && m.kind !== SyntaxKind.ShorthandPropertyAssignment) {
                        // Ignore omitted expressions for missing members in the object literal
                        return;
                    }

                    if (m.getStart() <= position && position <= m.getEnd()) {
                        // If this is the current item we are editing right now, do not filter it out
                        return;
                    }

                    // TODO(jfreeman): Account for computed property name
                    existingMemberNames[(<Identifier>m.name).text] = true;
                });

                var filteredMembers: Symbol[] = [];
                forEach(contextualMemberSymbols, s => {
                    if (!existingMemberNames[s.name]) {
                        filteredMembers.push(s);
                    }
                });

                return filteredMembers;
            }
        }

        function getCompletionEntryDetails(filename: string, position: number, entryName: string): CompletionEntryDetails {
            // Note: No need to call synchronizeHostData, as we have captured all the data we need
            //       in the getCompletionsAtPosition earlier
            filename = normalizeSlashes(filename);

            var sourceFile = getValidSourceFile(filename);

            var session = activeCompletionSession;

            // Ensure that the current active completion session is still valid for this request
            if (!session || session.filename !== filename || session.position !== position) {
                return undefined;
            }

            var symbol = lookUp(activeCompletionSession.symbols, escapeIdentifier(entryName));
            if (symbol) {
                var location = getTouchingPropertyName(sourceFile, position);
                var completionEntry = createCompletionEntry(symbol, session.typeChecker, location);
                // TODO(drosen): Right now we just permit *all* semantic meanings when calling 'getSymbolKind'
                //               which is permissible given that it is backwards compatible; but really we should consider
                //               passing the meaning for the node so that we don't report that a suggestion for a value is an interface.
                //               We COULD also just do what 'getSymbolModifiers' does, which is to use the first declaration.
                Debug.assert(session.typeChecker.getTypeOfSymbolAtLocation(symbol, location) !== undefined, "Could not find type for symbol");
                var displayPartsDocumentationsAndSymbolKind = getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, getValidSourceFile(filename), location, session.typeChecker, location, SemanticMeaning.All);
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
                        return node;
                }
            }
        }

        // TODO(drosen): use contextual SemanticMeaning.
        function getSymbolKind(symbol: Symbol, typeResolver: TypeChecker, location: Node): string {
            var flags = symbol.getFlags();

            if (flags & SymbolFlags.Class) return ScriptElementKind.classElement;
            if (flags & SymbolFlags.Enum) return ScriptElementKind.enumElement;
            if (flags & SymbolFlags.TypeAlias) return ScriptElementKind.typeElement;
            if (flags & SymbolFlags.Interface) return ScriptElementKind.interfaceElement;
            if (flags & SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;

            var result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, flags, typeResolver, location);
            if (result === ScriptElementKind.unknown) {
                if (flags & SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
                if (flags & SymbolFlags.EnumMember) return ScriptElementKind.variableElement;
                if (flags & SymbolFlags.Import) return ScriptElementKind.alias;
                if (flags & SymbolFlags.Module) return ScriptElementKind.moduleElement;
            }

            return result;
        }

        function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol: Symbol, flags: SymbolFlags, typeResolver: TypeChecker, location: Node) {
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
                else if (symbol.valueDeclaration && isConst(symbol.valueDeclaration)) {
                    return ScriptElementKind.constElement;
                }
                else if (forEach(symbol.declarations, isLet)) {
                    return ScriptElementKind.letElement;
                }
                return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localVariableElement : ScriptElementKind.variableElement;
            }
            if (flags & SymbolFlags.Function) return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
            if (flags & SymbolFlags.GetAccessor) return ScriptElementKind.memberGetAccessorElement;
            if (flags & SymbolFlags.SetAccessor) return ScriptElementKind.memberSetAccessorElement;
            if (flags & SymbolFlags.Method) return ScriptElementKind.memberFunctionElement;
            if (flags & SymbolFlags.Constructor) return ScriptElementKind.constructorImplementationElement;

            if (flags & SymbolFlags.Property) {
                if (flags & SymbolFlags.UnionProperty) {
                    // If union property is result of union of non method (property/accessors/variables), it is labeled as property
                    var unionPropertyKind = forEach(typeInfoResolver.getRootSymbols(symbol), rootSymbol => {
                        var rootSymbolFlags = rootSymbol.getFlags();
                        if (rootSymbolFlags & (SymbolFlags.PropertyOrAccessor | SymbolFlags.Variable)) {
                            return ScriptElementKind.memberVariableElement;
                        }
                        Debug.assert(!!(rootSymbolFlags & SymbolFlags.Method));
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
                case SyntaxKind.TypeAliasDeclaration: return ScriptElementKind.typeElement;
                case SyntaxKind.EnumDeclaration: return ScriptElementKind.enumElement;
                case SyntaxKind.VariableDeclaration:
                    return isConst(node)
                        ? ScriptElementKind.constElement
                        : isLet(node)
                            ? ScriptElementKind.letElement
                            : ScriptElementKind.variableElement;
                case SyntaxKind.FunctionDeclaration: return ScriptElementKind.functionElement;
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
                case SyntaxKind.EnumMember: return ScriptElementKind.variableElement;
                case SyntaxKind.Parameter: return (node.flags & NodeFlags.AccessibilityModifier) ? ScriptElementKind.memberVariableElement : ScriptElementKind.parameterElement;
            }
            return ScriptElementKind.unknown;
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
            var symbolFlags = symbol.flags;
            var symbolKind = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, symbolFlags, typeResolver, location);
            var hasAddedSymbolInfo: boolean;
            // Class at constructor site need to be shown as constructor apart from property,method, vars
            if (symbolKind !== ScriptElementKind.unknown || symbolFlags & SymbolFlags.Class || symbolFlags & SymbolFlags.Import) {
                // If it is accessor they are allowed only if location is at name of the accessor
                if (symbolKind === ScriptElementKind.memberGetAccessorElement || symbolKind === ScriptElementKind.memberSetAccessorElement) {
                    symbolKind = ScriptElementKind.memberVariableElement;
                }

                var type = typeResolver.getTypeOfSymbolAtLocation(symbol, location);
                if (type) {
                    if (location.parent && location.parent.kind === SyntaxKind.PropertyAccessExpression) {
                        var right = (<PropertyAccessExpression>location.parent).name;
                        // Either the location is on the right of a property access, or on the left and the right is missing
                        if (right === location || (right && right.getFullWidth() === 0)) {
                            location = location.parent;
                        }
                    }

                    // try get the call/construct signature from the type if it matches
                    var callExpression: CallExpression;
                    if (location.kind === SyntaxKind.CallExpression || location.kind === SyntaxKind.NewExpression) {
                        callExpression = <CallExpression> location;
                    }
                    else if (isCallExpressionTarget(location) || isNewExpressionTarget(location)) {
                        callExpression = <CallExpression>location.parent;
                    }

                    if (callExpression) {
                        var candidateSignatures: Signature[] = [];
                        signature = typeResolver.getResolvedSignature(callExpression, candidateSignatures);
                        if (!signature && candidateSignatures.length) {
                            // Use the first candidate:
                            signature = candidateSignatures[0];
                        }

                        var useConstructSignatures = callExpression.kind === SyntaxKind.NewExpression || callExpression.expression.kind === SyntaxKind.SuperKeyword;
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
                                case ScriptElementKind.constElement:
                                case ScriptElementKind.letElement:
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
                        var functionDeclaration = <FunctionLikeDeclaration>location.parent;
                        var allSignatures = functionDeclaration.kind === SyntaxKind.Constructor ? type.getConstructSignatures() : type.getCallSignatures();
                        if (!typeResolver.isImplementationOfOverload(functionDeclaration)) {
                            signature = typeResolver.getSignatureFromDeclaration(functionDeclaration);
                        }
                        else {
                            signature = allSignatures[0];
                        }

                        if (functionDeclaration.kind === SyntaxKind.Constructor) {
                            // show (constructor) Type(...) signature
                            symbolKind = ScriptElementKind.constructorImplementationElement;
                            addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
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
            if (symbolFlags & SymbolFlags.TypeAlias) {
                addNewLineIfDisplayPartsExist();
                displayParts.push(keywordPart(SyntaxKind.TypeKeyword));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                displayParts.push(spacePart());
                displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                displayParts.push(spacePart());
                displayParts.push.apply(displayParts, typeToDisplayParts(typeResolver, typeResolver.getDeclaredTypeOfSymbol(symbol), enclosingDeclaration));
            }
            if (symbolFlags & SymbolFlags.Enum) {
                addNewLineIfDisplayPartsExist();
                if (forEach(symbol.declarations, isConstEnumDeclaration)) {
                    displayParts.push(keywordPart(SyntaxKind.ConstKeyword));
                    displayParts.push(spacePart());
                }
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
                ts.forEach(symbol.declarations, declaration => {
                    if (declaration.kind === SyntaxKind.ImportDeclaration) {
                        var importDeclaration = <ImportDeclaration>declaration;
                        if (isExternalModuleImportDeclaration(importDeclaration)) {
                            displayParts.push(spacePart());
                            displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                            displayParts.push(spacePart());
                            displayParts.push(keywordPart(SyntaxKind.RequireKeyword));
                            displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                            displayParts.push(displayPart(getTextOfNode(getExternalModuleImportDeclarationExpression(importDeclaration)), SymbolDisplayPartKind.stringLiteral));
                            displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                        }
                        else {
                            var internalAliasSymbol = typeResolver.getSymbolAtLocation(importDeclaration.moduleReference);
                            if (internalAliasSymbol) {
                                displayParts.push(spacePart());
                                displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                                displayParts.push(spacePart());
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
                        if (symbolKind === ScriptElementKind.memberVariableElement ||
                            symbolFlags & SymbolFlags.Variable ||
                            symbolKind === ScriptElementKind.localVariableElement) {
                            displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                            displayParts.push(spacePart());
                            // If the type is type parameter, format it specially
                            if (type.symbol && type.symbol.flags & SymbolFlags.TypeParameter) {
                                var typeParameterParts = mapToDisplayParts(writer => {
                                    typeResolver.getSymbolDisplayBuilder().buildTypeParameterDisplay(<TypeParameter>type, writer, enclosingDeclaration);
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
                            symbolFlags & SymbolFlags.Accessor ||
                            symbolKind === ScriptElementKind.memberFunctionElement) {
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
                    typeResolver.getSymbolDisplayBuilder().buildTypeParameterDisplayFromSymbol(symbol, writer, enclosingDeclaration);
                });
                displayParts.push.apply(displayParts, typeParameterParts);
            }
        }

        function getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            synchronizeHostData();

            fileName = normalizeSlashes(fileName);
            var sourceFile = getValidSourceFile(fileName);
            var node = getTouchingPropertyName(sourceFile, position);
            if (!node) {
                return undefined;
            }

            var symbol = typeInfoResolver.getSymbolAtLocation(node);
            if (!symbol) {
                // Try getting just type at this position and show
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                    case SyntaxKind.PropertyAccessExpression:
                    case SyntaxKind.QualifiedName:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.SuperKeyword:
                        // For the identifiers/this/super etc get the type at position
                        var type = typeInfoResolver.getTypeAtLocation(node);
                        if (type) {
                            return {
                                kind: ScriptElementKind.unknown,
                                kindModifiers: ScriptElementKindModifier.none,
                                textSpan: createTextSpan(node.getStart(), node.getWidth()),
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
                textSpan: createTextSpan(node.getStart(), node.getWidth()),
                displayParts: displayPartsDocumentationsAndKind.displayParts,
                documentation: displayPartsDocumentationsAndKind.documentation
            };
        }

        /// Goto definition
        function getDefinitionAtPosition(filename: string, position: number): DefinitionInfo[] {
            synchronizeHostData();

            filename = normalizeSlashes(filename);
            var sourceFile = getValidSourceFile(filename);

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
                var referenceFile = tryResolveScriptReference(program, sourceFile, comment);
                if (referenceFile) {
                    return [{
                        fileName: referenceFile.filename,
                        textSpan: createTextSpanFromBounds(0, 0),
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

            var result: DefinitionInfo[] = [];

            // Because name in short-hand property assignment has two different meanings: property name and property value,
            // using go-to-definition at such position should go to the variable declaration of the property value rather than
            // go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition 
            // is performed at the location of property access, we would like to go to definition of the property in the short-hand
            // assignment. This case and others are handled by the following code.
            if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
                var shorthandSymbol = typeInfoResolver.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
                var shorthandDeclarations = shorthandSymbol.getDeclarations();
                var shorthandSymbolKind = getSymbolKind(shorthandSymbol, typeInfoResolver, node);
                var shorthandSymbolName = typeInfoResolver.symbolToString(shorthandSymbol);
                var shorthandContainerName = typeInfoResolver.symbolToString(symbol.parent, node);
                forEach(shorthandDeclarations, declaration => {
                    result.push(getDefinitionInfo(declaration, shorthandSymbolKind, shorthandSymbolName, shorthandContainerName));
                });
                return result
            }

            var declarations = symbol.getDeclarations();
            var symbolName = typeInfoResolver.symbolToString(symbol); // Do not get scoped name, just the name of the symbol
            var symbolKind = getSymbolKind(symbol, typeInfoResolver, node);
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

            function getDefinitionInfo(node: Node, symbolKind: string, symbolName: string, containerName: string): DefinitionInfo {
                return {
                    fileName: node.getSourceFile().filename,
                    textSpan: createTextSpanFromBounds(node.getStart(), node.getEnd()),
                    kind: symbolKind,
                    name: symbolName,
                    containerKind: undefined,
                    containerName
                };
            }

            function tryAddSignature(signatureDeclarations: Declaration[], selectConstructors: boolean, symbolKind: string, symbolName: string, containerName: string, result: DefinitionInfo[]) {
                var declarations: Declaration[] = [];
                var definition: Declaration;

                forEach(signatureDeclarations, d => {
                    if ((selectConstructors && d.kind === SyntaxKind.Constructor) ||
                        (!selectConstructors && (d.kind === SyntaxKind.FunctionDeclaration || d.kind === SyntaxKind.MethodDeclaration || d.kind === SyntaxKind.MethodSignature))) {
                        declarations.push(d);
                        if ((<FunctionLikeDeclaration>d).body) definition = d;
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
        }

        /// References and Occurrences
        function getOccurrencesAtPosition(filename: string, position: number): ReferenceEntry[] {
            synchronizeHostData();

            filename = normalizeSlashes(filename);
            var sourceFile = getValidSourceFile(filename);

            var node = getTouchingWord(sourceFile, position);
            if (!node) {
                return undefined;
            }

            if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ThisKeyword || node.kind === SyntaxKind.SuperKeyword ||
                isLiteralNameOfPropertyDeclarationOrIndexAccess(node) || isNameOfExternalModuleImportOrDeclaration(node)) {
                return getReferencesForNode(node, [sourceFile], /*searchOnlyInCurrentFile*/ true, /*findInStrings:*/ false, /*findInComments:*/ false);
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
                case SyntaxKind.CatchKeyword:
                    if (hasKind(parent(parent(node)), SyntaxKind.TryStatement)) {
                        return getTryCatchFinallyOccurrences(<TryStatement>node.parent.parent);
                    }
                    break;
                case SyntaxKind.TryKeyword:
                case SyntaxKind.FinallyKeyword:
                    if (hasKind(parent(node), SyntaxKind.TryStatement)) {
                        return getTryCatchFinallyOccurrences(<TryStatement>node.parent);
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
                default:
                    if (isModifier(node.kind) && node.parent &&
                        (isDeclaration(node.parent) || node.parent.kind === SyntaxKind.VariableStatement)) {
                        return getModifierOccurrences(node.kind, node.parent);
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
                                textSpan: createTextSpanFromBounds(elseKeyword.getStart(), ifKeyword.end),
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
                var func = <FunctionLikeDeclaration>getContainingFunction(returnStatement);

                // If we didn't find a containing function with a block body, bail out.
                if (!(func && hasKind(func.body, SyntaxKind.Block))) {
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
                if (isFunctionBlock(owner)) {
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

                    if (isFunctionBlock(parent) || parent.kind === SyntaxKind.SourceFile) {
                        return parent;
                    }
                    
                    // A throw-statement is only owned by a try-statement if the try-statement has
                    // a catch clause, and if the throw-statement occurs within the try block.
                    if (parent.kind === SyntaxKind.TryStatement) {
                        var tryStatement = <TryStatement>parent;

                        if (tryStatement.tryBlock === child && tryStatement.catchClause) {
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

                if (tryStatement.catchClause) {
                    pushKeywordIf(keywords, tryStatement.catchClause.getFirstToken(), SyntaxKind.CatchKeyword);
                }

                if (tryStatement.finallyBlock) {
                    var finallyKeyword = findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile);
                    pushKeywordIf(keywords, finallyKeyword, SyntaxKind.FinallyKeyword);
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

            function getBreakOrContinueStatementOccurences(breakOrContinueStatement: BreakOrContinueStatement): ReferenceEntry[] {
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
                        statementAccumulator.push(<BreakOrContinueStatement>node);
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

            function getModifierOccurrences(modifier: SyntaxKind, declaration: Node) {
                var container = declaration.parent;

                // Make sure we only highlight the keyword when it makes sense to do so.
                if (declaration.flags & NodeFlags.AccessibilityModifier) {
                    if (!(container.kind === SyntaxKind.ClassDeclaration ||
                        (declaration.kind === SyntaxKind.Parameter && hasKind(container, SyntaxKind.Constructor)))) {
                        return undefined;
                    }
                }
                else if (declaration.flags & NodeFlags.Static) {
                    if (container.kind !== SyntaxKind.ClassDeclaration) {
                        return undefined;
                    }
                }
                else if (declaration.flags & (NodeFlags.Export | NodeFlags.Ambient)) {
                    if (!(container.kind === SyntaxKind.ModuleBlock || container.kind === SyntaxKind.SourceFile)) {
                        return undefined;
                    }
                }
                else { 
                    // unsupported modifier
                    return undefined;
                }

                var keywords: Node[] = [];
                var modifierFlag: NodeFlags = getFlagFromModifier(modifier);

                var nodes: Node[];
                switch (container.kind) {
                    case SyntaxKind.ModuleBlock:
                    case SyntaxKind.SourceFile:
                        nodes = (<Block>container).statements;
                        break;
                    case SyntaxKind.Constructor:
                        nodes = (<Node[]>(<ConstructorDeclaration>container).parameters).concat(
                            (<ClassDeclaration>container.parent).members);
                        break;
                    case SyntaxKind.ClassDeclaration:
                        nodes = (<ClassDeclaration>container).members;

                        // If we're an accessibility modifier, we're in an instance member and should search
                        // the constructor's parameter list for instance members as well.
                        if (modifierFlag & NodeFlags.AccessibilityModifier) {
                            var constructor = forEach((<ClassDeclaration>container).members, member => {
                                return member.kind === SyntaxKind.Constructor && <ConstructorDeclaration>member;
                            });

                            if (constructor) {
                                nodes = nodes.concat(constructor.parameters);
                            }
                        }
                        break;
                    default:
                        Debug.fail("Invalid container kind.")
                }

                forEach(nodes, node => {
                    if (node.modifiers && node.flags & modifierFlag) {
                        forEach(node.modifiers, child => pushKeywordIf(keywords, child, modifier));
                    }
                });

                return map(keywords, getReferenceEntryFromNode);

                function getFlagFromModifier(modifier: SyntaxKind) {
                    switch (modifier) {
                        case SyntaxKind.PublicKeyword:
                            return NodeFlags.Public;
                        case SyntaxKind.PrivateKeyword:
                            return NodeFlags.Private;
                        case SyntaxKind.ProtectedKeyword:
                            return NodeFlags.Protected;
                        case SyntaxKind.StaticKeyword:
                            return NodeFlags.Static;
                        case SyntaxKind.ExportKeyword:
                            return NodeFlags.Export;
                        case SyntaxKind.DeclareKeyword:
                            return NodeFlags.Ambient;
                        default:
                            Debug.fail();
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

            fileName = normalizeSlashes(fileName);
            var sourceFile = getValidSourceFile(fileName);

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
            return getReferencesForNode(node, program.getSourceFiles(), /*searchOnlyInCurrentFile*/ false, findInStrings, findInComments);
        }

        function initializeNameTable(sourceFile: SourceFile): void {
            var nameTable: Map<string> = {};

            walk(sourceFile);
            sourceFile.nameTable = nameTable;

            function walk(node: Node) {
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                        nameTable[(<Identifier>node).text] = (<Identifier>node).text;
                        break;
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.NumericLiteral:
                        nameTable[(<LiteralExpression>node).text] = (<LiteralExpression>node).text;
                        break;
                    default:
                        forEachChild(node, walk);
                }
            } 
        }

        function getReferencesForNode(node: Node, sourceFiles: SourceFile[], searchOnlyInCurrentFile: boolean, findInStrings: boolean, findInComments: boolean): ReferenceEntry[] {
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

            var result: ReferenceEntry[];

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
                if (searchOnlyInCurrentFile) {
                    Debug.assert(sourceFiles.length === 1);
                    result = [];
                    getReferencesInNode(sourceFiles[0], symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result);
                }
                else {
                    var internedName = getInternedName(symbol, declarations)
                    forEach(sourceFiles, sourceFile => {
                        cancellationToken.throwIfCancellationRequested();

                        if (!sourceFile.nameTable) {
                            initializeNameTable(sourceFile)
                        }

                        Debug.assert(sourceFile.nameTable !== undefined);

                        if (lookUp(sourceFile.nameTable, internedName)) {
                            result = result || [];
                            getReferencesInNode(sourceFile, symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result);
                        }
                    });
                }
            }

            return result;

            function getDeclaredName(symbol: Symbol) {
                var name = typeInfoResolver.symbolToString(symbol);

                return stripQuotes(name);
            }

            function getInternedName(symbol: Symbol, declarations: Declaration[]): string {
                // Special case for function expressions, whose names are solely local to their bodies.
                var functionExpression = forEach(declarations, d => d.kind === SyntaxKind.FunctionExpression ? <FunctionExpression>d : undefined);

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

            function stripQuotes(name: string) {
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
                        return getAncestor(privateDeclaration, SyntaxKind.ClassDeclaration);
                    }
                }

                // if this symbol is visible from its parent container, e.g. exported, then bail out
                // if symbol correspond to the union property - bail out
                if (symbol.parent || (symbol.getFlags() & SymbolFlags.UnionProperty)) {
                    return undefined;
                }

                var scope: Node = undefined;

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

                    if ((position === 0 || !isIdentifierPart(text.charCodeAt(position - 1), ScriptTarget.Latest)) &&
                        (endPosition === sourceLength || !isIdentifierPart(text.charCodeAt(endPosition), ScriptTarget.Latest))) {
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
                                    textSpan: createTextSpan(position, searchText.length),
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
                            /* Because in short-hand property assignment, an identifier which stored as name of the short-hand property assignment
                             * has two meaning : property name and property value. Therefore when we do findAllReference at the position where
                             * an identifier is declared, the language service should return the position of the variable declaration as well as
                             * the position in short-hand property assignment excluding property accessing. However, if we do findAllReference at the
                             * position of property accessing, the referenceEntry of such position will be handled in the first case.
                             */
                            else if (!(referenceSymbol.flags & SymbolFlags.Transient) && searchSymbols.indexOf(shorthandValueSymbol) >= 0) {
                                result.push(getReferenceEntryFromNode(referenceSymbolDeclaration.name));
                            }
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

            function getReferencesForSuperKeyword(superKeyword: Node): ReferenceEntry[] {
                var searchSpaceNode = getSuperContainer(superKeyword, /*includeFunctions*/ false);
                if (!searchSpaceNode) {
                    return undefined;
                }
                // Whether 'super' occurs in a static context within a class.
                var staticFlag = NodeFlags.Static;

                switch (searchSpaceNode.kind) {
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
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

                    var container = getSuperContainer(node, /*includeFunctions*/ false);

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
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        if (isObjectLiteralMethod(searchSpaceNode)) {
                            break;
                        }
                    // fall through
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
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
                    // Computed properties in classes are not handled here because references to this are illegal,
                    // so there is no point finding references to them.
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
                            case SyntaxKind.MethodDeclaration:
                            case SyntaxKind.MethodSignature:
                                if (isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol) {
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
                            getPropertySymbolFromTypeReference(getClassBaseTypeNode(<ClassDeclaration>declaration));
                            forEach(getClassImplementedTypeNodes(<ClassDeclaration>declaration), getPropertySymbolFromTypeReference);
                        }
                        else if (declaration.kind === SyntaxKind.InterfaceDeclaration) {
                            forEach(getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration), getPropertySymbolFromTypeReference);
                        }
                    });
                }
                return;

                function getPropertySymbolFromTypeReference(typeReference: TypeReferenceNode) {
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
                    var objectLiteral = <ObjectLiteralExpression>node.parent.parent;
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
                textSpan: createTextSpanFromBounds(start, end),
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
                if (parent.kind === SyntaxKind.PostfixUnaryExpression || parent.kind === SyntaxKind.PrefixUnaryExpression) {
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
                    // TODO(jfreeman): Skip this declaration if it has a computed name
                    var name = (<Identifier>declaration.name).text;
                    var matchKind = getMatchKind(searchTerms, name);
                    if (matchKind !== MatchKind.none) {
                        var container = <Declaration>getContainerNode(declaration);
                        items.push({
                            name: name,
                            kind: getNodeKind(declaration),
                            kindModifiers: getNodeModifiers(declaration),
                            matchKind: MatchKind[matchKind],
                            fileName: filename,
                            textSpan: createTextSpanFromBounds(declaration.getStart(), declaration.getEnd()),
                            // TODO(jfreeman): What should be the containerName when the container has a computed name?
                            containerName: container && container.name ? (<Identifier>container.name).text : "",
                            containerKind: container && container.name ? getNodeKind(container) : ""
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

            filename = normalizeSlashes(filename);
            var sourceFile = getValidSourceFile(filename);

            var outputFiles: OutputFile[] = [];

            function writeFile(filename: string, data: string, writeByteOrderMark: boolean) {
                outputFiles.push({
                    name: filename,
                    writeByteOrderMark: writeByteOrderMark,
                    text: data
                });
            }

            // Get an emit host from our program, but override the writeFile functionality to
            // call our local writer function.
            var emitHost = createEmitHostFromProgram(program);
            emitHost.writeFile = writeFile;

            var emitOutput = emitFiles(getDiagnosticsProducingTypeChecker().getEmitResolver(), emitHost, sourceFile);

            return {
                outputFiles,
                emitOutputStatus: emitOutput.emitResultStatus
            };
        }

        function getMeaningFromDeclaration(node: Node): SemanticMeaning {
            switch (node.kind) {
                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.EnumMember:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.CatchClause:
                    return SemanticMeaning.Value;

                case SyntaxKind.TypeParameter:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.TypeLiteral:
                    return SemanticMeaning.Type;

                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return SemanticMeaning.Value | SemanticMeaning.Type;

                case SyntaxKind.ModuleDeclaration:
                    if ((<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral) {
                        return SemanticMeaning.Namespace | SemanticMeaning.Value;
                    }
                    else if (getModuleInstanceState(node) === ModuleInstanceState.Instantiated) {
                        return SemanticMeaning.Namespace | SemanticMeaning.Value;
                    }
                    else {
                        return SemanticMeaning.Namespace;
                    }

                case SyntaxKind.ImportDeclaration:
                    return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;

                // An external module can be a Value
                case SyntaxKind.SourceFile:
                    return SemanticMeaning.Namespace | SemanticMeaning.Value;
            }
            Debug.fail("Unknown declaration type");
        }

        function isTypeReference(node: Node): boolean {
            if (isRightSideOfQualifiedName(node)) {
                node = node.parent;
            }

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

        function isInRightSideOfImport(node: Node) {
            while (node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            }
            return isInternalModuleImportDeclaration(node.parent) && (<ImportDeclaration>node.parent).moduleReference === node;
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

            fileName = normalizeSlashes(fileName);
            var sourceFile = getValidSourceFile(fileName);

            return SignatureHelp.getSignatureHelpItems(sourceFile, position, typeInfoResolver, cancellationToken);
        }

        /// Syntactic features
        function getCurrentSourceFile(filename: string): SourceFile {
            filename = normalizeSlashes(filename);
            var currentSourceFile = syntaxTreeCache.getCurrentSourceFile(filename);
            return currentSourceFile;
        }

        function getNameOrDottedNameSpan(filename: string, startPos: number, endPos: number): TextSpan {
            filename = ts.normalizeSlashes(filename);
            // Get node at the location
            var node = getTouchingPropertyName(getCurrentSourceFile(filename), startPos);

            if (!node) {
                return;
            }

            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.QualifiedName:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.Identifier:
                    break;

                // Cant create the text span
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
                    if (nodeForStartPos.parent.parent.kind === SyntaxKind.ModuleDeclaration &&
                        (<ModuleDeclaration>nodeForStartPos.parent.parent).body === nodeForStartPos.parent) {
                        // Use parent module declarations name for start pos
                        nodeForStartPos = (<ModuleDeclaration>nodeForStartPos.parent.parent).name;
                    }
                    else {
                        // We have to use this name for start pos
                        break;
                    }
                }
                else {
                    // Is not a member expression so we have found the node for start pos
                    break;
                }
            }

            return createTextSpanFromBounds(nodeForStartPos.getStart(), node.getEnd());
        }

        function getBreakpointStatementAtPosition(filename: string, position: number) {
            // doesn't use compiler - no need to synchronize with host
            filename = ts.normalizeSlashes(filename);
            return BreakpointResolver.spanInSourceFileAtLocation(getCurrentSourceFile(filename), position);
        }

        function getNavigationBarItems(filename: string): NavigationBarItem[] {
            filename = normalizeSlashes(filename);

            return NavigationBar.getNavigationBarItems(getCurrentSourceFile(filename));
        }

        function getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            synchronizeHostData();
            fileName = normalizeSlashes(fileName);

            var sourceFile = getValidSourceFile(fileName);

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
                else if (flags & SymbolFlags.TypeAlias) {
                    return ClassificationTypeNames.typeAlias;
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
                        return declaration.kind === SyntaxKind.ModuleDeclaration && getModuleInstanceState(declaration) == ModuleInstanceState.Instantiated;
                    });
                }
            }

            function processNode(node: Node) {
                // Only walk into nodes that intersect the requested span.
                if (node && textSpanIntersectsWith(span, node.getStart(), node.getWidth())) {
                    if (node.kind === SyntaxKind.Identifier && node.getWidth() > 0) {
                        var symbol = typeInfoResolver.getSymbolAtLocation(node);
                        if (symbol) {
                            var type = classifySymbol(symbol, getMeaningFromLocation(node));
                            if (type) {
                                result.push({
                                    textSpan: createTextSpan(node.getStart(), node.getWidth()),
                                    classificationType: type
                                });
                            }
                        }
                    }

                    forEachChild(node, processNode);
                }
            }
        }

        function getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            // doesn't use compiler - no need to synchronize with host
            fileName = normalizeSlashes(fileName);
            var sourceFile = getCurrentSourceFile(fileName);

            // Make a scanner we can get trivia from.
            var triviaScanner = createScanner(ScriptTarget.Latest, /*skipTrivia:*/ false, sourceFile.text);
            var mergeConflictScanner = createScanner(ScriptTarget.Latest, /*skipTrivia:*/ false, sourceFile.text);

            var result: ClassifiedSpan[] = [];
            processElement(sourceFile);

            return result;

            function classifyLeadingTrivia(token: Node): void {
                var tokenStart = skipTrivia(sourceFile.text, token.pos, /*stopAfterLineBreak:*/ false);
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

                    if (textSpanIntersectsWith(span, start, width)) {
                        if (!isTrivia(kind)) {
                            return;
                        }

                        if (isComment(kind)) {
                            // Simple comment.  Just add as is.
                            result.push({
                                textSpan: createTextSpan(start, width),
                                classificationType: ClassificationTypeNames.comment
                            })
                            continue;
                        }

                        if (kind === SyntaxKind.ConflictMarkerTrivia) {
                            var text = sourceFile.text;
                            var ch = text.charCodeAt(start);

                            // for the <<<<<<< and >>>>>>> markers, we just add them in as comments
                            // in the classification stream.
                            if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
                                result.push({
                                    textSpan: createTextSpan(start, width),
                                    classificationType: ClassificationTypeNames.comment
                                });
                                continue;
                            }

                            // for the ======== add a comment for the first line, and then lex all
                            // subsequent lines up until the end of the conflict marker.
                            Debug.assert(ch === CharacterCodes.equals);
                            classifyDisabledMergeCode(text, start, end);
                        }
                    }
                }
            }

            function classifyDisabledMergeCode(text: string, start: number, end: number) {
                // Classify the line that the ======= marker is on as a comment.  Then just lex 
                // all further tokens and add them to the result.
                for (var i = start; i < end; i++) {
                    if (isLineBreak(text.charCodeAt(i))) {
                        break;
                    }
                }
                result.push({
                    textSpan: createTextSpanFromBounds(start, i),
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
                        textSpan: createTextSpanFromBounds(start, end),
                        classificationType: type
                    });
                }
            }

            function classifyToken(token: Node): void {
                classifyLeadingTrivia(token);

                if (token.getWidth() > 0) {
                    var type = classifyTokenType(token.kind, token);
                    if (type) {
                        result.push({
                            textSpan: createTextSpan(token.getStart(), token.getWidth()),
                            classificationType: type
                        });
                    }
                }
            }

            // for accurate classification, the actual token should be passed in.  however, for 
            // cases like 'disabled merge code' classification, we just get the token kind and
            // classify based on that instead.
            function classifyTokenType(tokenKind: SyntaxKind, token?: Node): string {
                if (isKeyword(tokenKind)) {
                    return ClassificationTypeNames.keyword;
                }

                // Special case < and >  If they appear in a generic context they are punctuation,
                // not operators.
                if (tokenKind === SyntaxKind.LessThanToken || tokenKind === SyntaxKind.GreaterThanToken) {
                    // If the node owning the token has a type argument list or type parameter list, then
                    // we can effectively assume that a '<' and '>' belong to those lists.
                    if (token && getTypeArgumentOrTypeParameterList(token.parent)) {
                        return ClassificationTypeNames.punctuation;
                    }
                }

                if (isPunctuation(tokenKind)) {
                    if (token) {
                        if (tokenKind === SyntaxKind.EqualsToken) {
                            // the '=' in a variable declaration is special cased here.
                            if (token.parent.kind === SyntaxKind.VariableDeclaration ||
                                token.parent.kind === SyntaxKind.PropertyDeclaration ||
                                token.parent.kind === SyntaxKind.Parameter) {
                                return ClassificationTypeNames.operator;
                            }
                        }

                        if (token.parent.kind === SyntaxKind.BinaryExpression ||
                            token.parent.kind === SyntaxKind.PrefixUnaryExpression ||
                            token.parent.kind === SyntaxKind.PostfixUnaryExpression ||
                            token.parent.kind === SyntaxKind.ConditionalExpression) {
                            return ClassificationTypeNames.operator;
                        }
                    }

                    return ClassificationTypeNames.punctuation;
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
                else if (isTemplateLiteralKind(tokenKind)) {
                    // TODO (drosen): we should *also* get another classification type for these literals.
                    return ClassificationTypeNames.stringLiteral;
                }
                else if (tokenKind === SyntaxKind.Identifier) {
                    if (token) {
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
                        }
                    }

                    return ClassificationTypeNames.text;
                }
            }

            function processElement(element: Node) {
                // Ignore nodes that don't intersect the original span to classify.
                if (textSpanIntersectsWith(span, element.getFullStart(), element.getFullWidth())) {
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
            filename = normalizeSlashes(filename);
            var sourceFile = getCurrentSourceFile(filename);
            return OutliningElementsCollector.collectElements(sourceFile);
        }

        function getBraceMatchingAtPosition(filename: string, position: number) {
            var sourceFile = getCurrentSourceFile(filename);
            var result: TextSpan[] = [];

            var token = getTouchingToken(sourceFile, position);

            if (token.getStart(sourceFile) === position) {
                var matchKind = getMatchingTokenKind(token);

                // Ensure that there is a corresponding token to match ours.
                if (matchKind) {
                    var parentElement = token.parent;

                    var childNodes = parentElement.getChildren(sourceFile);
                    for (var i = 0, n = childNodes.length; i < n; i++) {33
                        var current = childNodes[i];

                        if (current.kind === matchKind) {
                            var range1 = createTextSpan(token.getStart(sourceFile), token.getWidth(sourceFile));
                            var range2 = createTextSpan(current.getStart(sourceFile), current.getWidth(sourceFile));

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
            filename = normalizeSlashes(filename);

            var start = new Date().getTime();
            var sourceFile = getCurrentSourceFile(filename);
            log("getIndentationAtPosition: getCurrentSourceFile: " + (new Date().getTime() - start));

            var start = new Date().getTime();

            var result = formatting.SmartIndenter.getIndentation(position, sourceFile, editorOptions);
            log("getIndentationAtPosition: computeIndentation  : " + (new Date().getTime() - start));

            return result;
        }

        function getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[] {
            fileName = normalizeSlashes(fileName);
            var sourceFile = getCurrentSourceFile(fileName);
            return formatting.formatSelection(start, end, sourceFile, getRuleProvider(options), options);
        }

        function getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[] {
            fileName = normalizeSlashes(fileName);

            var sourceFile = getCurrentSourceFile(fileName);
            return formatting.formatDocument(sourceFile, getRuleProvider(options), options);
        }

        function getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[] {
            fileName = normalizeSlashes(fileName);

            var sourceFile = getCurrentSourceFile(fileName);

            if (key === "}") {
                return formatting.formatOnClosingCurly(position, sourceFile, getRuleProvider(options), options);
            }
            else if (key === ";") {
                return formatting.formatOnSemicolon(position, sourceFile, getRuleProvider(options), options);
            }
            else if (key === "\n") {
                return formatting.formatOnEnter(position, sourceFile, getRuleProvider(options), options);
            }

            return [];
        }

        function getTodoComments(filename: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
            // Note: while getting todo comments seems like a syntactic operation, we actually 
            // treat it as a semantic operation here.  This is because we expect our host to call
            // this on every single file.  If we treat this syntactically, then that will cause
            // us to populate and throw away the tree in our syntax tree cache for each file.  By
            // treating this as a semantic operation, we can access any tree without throwing 
            // anything away.
            synchronizeHostData();

            filename = normalizeSlashes(filename);

            var sourceFile = getValidSourceFile(filename);

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
                    if (!isInsideComment(sourceFile, token, matchPosition)) {
                        continue;
                    }

                    var descriptor: TodoCommentDescriptor = undefined;
                    for (var i = 0, n = descriptors.length; i < n; i++) {
                        if (matchArray[i + firstDescriptorCaptureIndex]) {
                            descriptor = descriptors[i];
                        }
                    }
                    Debug.assert(descriptor !== undefined);

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

            function isLetterOrDigit(char: number): boolean {
                return (char >= CharacterCodes.a && char <= CharacterCodes.z) ||
                    (char >= CharacterCodes.A && char <= CharacterCodes.Z) ||
                    (char >= CharacterCodes._0 && char <= CharacterCodes._9);
            }
        }


        function getRenameInfo(fileName: string, position: number): RenameInfo {
            synchronizeHostData();

            fileName = normalizeSlashes(fileName);
            var sourceFile = getValidSourceFile(fileName);

            var node = getTouchingWord(sourceFile, position);

            // Can only rename an identifier.
            if (node && node.kind === SyntaxKind.Identifier) {
                var symbol = typeInfoResolver.getSymbolAtLocation(node);

                // Only allow a symbol to be renamed if it actually has at least one declaration.
                if (symbol && symbol.getDeclarations() && symbol.getDeclarations().length > 0) {
                    var kind = getSymbolKind(symbol, typeInfoResolver, node);
                    if (kind) {
                        return getRenameInfo(symbol.name, typeInfoResolver.getFullyQualifiedName(symbol), kind,
                            getSymbolModifiers(symbol),
                            createTextSpan(node.getStart(), node.getWidth()));
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

            function getRenameInfo(displayName: string, fullDisplayName: string, kind: string, kindModifiers: string, triggerSpan: TextSpan): RenameInfo {
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
            getProgram
        };
    }

    /// Classifier
    export function createClassifier(): Classifier {
        var scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false);

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

        // 'classifyKeywordsInGenerics' should be 'true' when a syntactic classifier is not present.
        function getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics?: boolean): ClassificationResult {
            var offset = 0;
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
                        if (angleBracketStack > 0 && !classifyKeywordsInGenerics) {
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

                addResult(end - start, classFromKind(token));

                if (end >= text.length) {
                    if (token === SyntaxKind.StringLiteral) {
                        // Check to see if we finished up on a multiline string literal.
                        var tokenText = scanner.getTokenText();
                        if (scanner.isUnterminated()) {
                            var lastCharIndex = tokenText.length - 1;

                            var numBackslashes = 0;
                            while (tokenText.charCodeAt(lastCharIndex - numBackslashes) === CharacterCodes.backslash) {
                                numBackslashes++;
                            }

                            // If we have an odd number of backslashes, then the multiline string is unclosed
                            if (numBackslashes & 1) {
                                var quoteChar = tokenText.charCodeAt(0);
                                result.finalLexState = quoteChar === CharacterCodes.doubleQuote
                                    ? EndOfLineState.InDoubleQuoteStringLiteral
                                    : EndOfLineState.InSingleQuoteStringLiteral;
                            }
                        }
                    }
                    else if (token === SyntaxKind.MultiLineCommentTrivia) {
                        // Check to see if the multiline comment was unclosed.
                        if (scanner.isUnterminated()) {
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
                case SyntaxKind.ConflictMarkerTrivia:
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

        return { getClassificationsForLine };
    }

    /// getDefaultLibraryFilePath
    declare var __dirname: string;
    
    /**
      * Get the path of the default library file (lib.d.ts) as distributed with the typescript
      * node package.
      * The functionality is not supported if the ts module is consumed outside of a node module. 
      */
    export function getDefaultLibFilePath(options: CompilerOptions): string {
        // Check __dirname is defined and that we are on a node.js system.
        if (typeof __dirname !== "undefined") {
            return __dirname + directorySeparator + getDefaultLibFilename(options);
        }

        throw new Error("getDefaultLibFilePath is only supported when consumed as a node module. ");
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
