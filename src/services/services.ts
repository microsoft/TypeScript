/// <reference path="..\compiler\types.ts"/>
/// <reference path="..\compiler\core.ts"/>
/// <reference path="..\compiler\scanner.ts"/>
/// <reference path="..\compiler\parser.ts"/>
/// <reference path="..\compiler\checker.ts"/>

/// <reference path='syntax\incrementalParser.ts' />
/// <reference path='outliningElementsCollector.ts' />
/// <reference path='GetScriptLexicalStructureWalker.ts' />
/// <reference path='BraceMatcher.ts' />
/// <reference path='Breakpoints.ts' />
/// <reference path='indentation.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='completionHelpers.ts' />
/// <reference path='keywordCompletions.ts' />
/// <reference path='compiler\bloomFilter.ts' />

/// <reference path='core\references.ts' />
/// <reference path='resources\references.ts' />
/// <reference path='text\references.ts' />
/// <reference path='syntax\references.ts' />
/// <reference path='compiler\diagnostics.ts' />
/// <reference path='compiler\hashTable.ts' />
/// <reference path='compiler\ast.ts' />
/// <reference path='compiler\astWalker.ts' />
/// <reference path='compiler\asthelpers.ts' />
/// <reference path='compiler\types.ts' />
/// <reference path='compiler\pathUtils.ts' />

module ts {

    export interface Node {
        getSourceFile(): SourceFile;
        getChildCount(): number;
        getChildAt(index: number): Node;
        getChildren(): Node[];
        getFullWidth(): number;
        getTriviaWidth(): number;
        getFullText(): string;
        getFirstToken(): Node;
        getLastToken(): Node;
    }

    export interface Symbol {
        getFlags(): SymbolFlags;
        getName(): string;
        getDeclarations(): Declaration[];
    }

    export interface Type {
        getFlags(): TypeFlags;
        getSymbol(): Symbol;
        getProperties(): Symbol[];
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
    }

    var scanner: Scanner = createScanner(ScriptTarget.ES5);

    var emptyArray: any [] = [];

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
            var node: Node = this;
            while (node.kind !== SyntaxKind.SourceFile) node = node.parent;
            return <SourceFile>node;
        }

        public getTextPos(): number {
            return getTokenPosOfNode(this);
        }
    
        public getFullWidth(): number {
            return this.end - this.pos;
        }

        public getTriviaWidth(): number {
            return getTokenPosOfNode(this) - this.pos;
        }

        public getFullText(): string {
            return this.getSourceFile().text.substring(this.pos, this.end);
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

        private createChildren() {
            if (this.kind > SyntaxKind.Missing) {
                scanner.setText(this.getSourceFile().text);
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

        public getChildCount(): number {
            if (!this._children) this.createChildren();
            return this._children.length;
        }

        public getChildAt(index: number): Node {
            if (!this._children) this.createChildren();
            return this._children[index];
        }

        public getChildren(): Node[] {
            if (!this._children) this.createChildren();
            return this._children;
        }

        public getFirstToken(): Node {
            var children = this.getChildren();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.kind < SyntaxKind.Missing) return child;
                if (child.kind > SyntaxKind.Missing) return child.getFirstToken();
            }
        }

        public getLastToken(): Node {
            var children = this.getChildren();
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.kind < SyntaxKind.Missing) return child;
                if (child.kind > SyntaxKind.Missing) return child.getLastToken();
            }
        }
    }

    class SymbolObject implements Symbol {
        flags: SymbolFlags;
        name: string;
        declarations: Declaration[];
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
        getApparentProperties(): Symbol[]{
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
    }

    function initializeServices() {
        objectAllocator = {
            getNodeConstructor: kind => {
                function Node() {
                }
                var proto = new NodeObject();
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


module TypeScript.Services {
    export interface Logger {
        information(): boolean;
        debug(): boolean;
        warning(): boolean;
        error(): boolean;
        fatal(): boolean;
        log(s: string): void;
    }

    //
    // Public interface of the host of a language service instance.
    //
    export interface LanguageServiceHost extends Logger {
        getCompilationSettings(): ts.CompilerOptions;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): number;
        getScriptIsOpen(fileName: string): boolean;
        getScriptByteOrderMark(fileName: string): ts.ByteOrderMark;
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot;
        getLocalizedDiagnosticMessages(): any;
        getCancellationToken(): ts.CancellationToken;
    }

    //
    // Public services of a language service instance associated
    // with a language service host instance
    //
    export interface LanguageService {
        // Note: refresh is a no-op now.  It is only around for back compat purposes.
        refresh(): void;

        cleanupSemanticCache(): void;

        getSyntacticDiagnostics(fileName: string): ts.Diagnostic[];
        getSemanticDiagnostics(fileName: string): ts.Diagnostic[];
        getCompilerOptionsDiagnostics(): ts.Diagnostic[];

        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;

        getTypeAtPosition(fileName: string, position: number): TypeInfo;

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): SpanInfo;

        getBreakpointStatementAtPosition(fileName: string, position: number): SpanInfo;

        getSignatureAtPosition(fileName: string, position: number): SignatureInfo;

        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getImplementorsAtPosition(fileName: string, position: number): ReferenceEntry[];

        getNavigateToItems(searchValue: string): NavigateToItem[];
        getScriptLexicalStructure(fileName: string): NavigateToItem[];

        getOutliningRegions(fileName: string): TypeScript.TextSpan[];
        getBraceMatchingAtPosition(fileName: string, position: number): TypeScript.TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: TypeScript.Services.EditorOptions): number;

        getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextEdit[];

        getEmitOutput(fileName: string): EmitOutput;

        //getSyntaxTree(fileName: string): TypeScript.SyntaxTree;

        dispose(): void;
    }

    export interface ReferenceEntry {
        fileName: string;
        minChar: number;
        limChar: number;
        isWriteAccess: boolean;
    }

    export interface NavigateToItem {
        name: string;
        kind: string;            // see ScriptElementKind
        kindModifiers: string;   // see ScriptElementKindModifier, comma separated
        matchKind: string;
        fileName: string;
        minChar: number;
        limChar: number;
        additionalSpans?: SpanInfo[];
        containerName: string;
        containerKind: string;  // see ScriptElementKind
    }

    export interface TextEdit {
        minChar: number;
        limChar: number;
        text: string;
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
        minChar: number;
        limChar: number;
        kind: string;
        name: string;
        containerKind: string;
        containerName: string;
    }

    export interface TypeInfo {
        memberName: TypeScript.MemberName;
        docComment: string;
        fullSymbolName: string;
        kind: string;
        minChar: number;
        limChar: number;
    }

    export interface SpanInfo {
        minChar: number;
        limChar: number;
        // text?: string;
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
        type: string;
        fullSymbolName: string;
        docComment: string;
    }

    export enum EmitOutputResult {
        Succeeded,
        FailedBecauseOfSyntaxErrors,
        FailedBecauseOfCompilerOptionsErrors,
        FailedToGenerateDeclarationsBecauseOfSemanticErrors
    }

    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitOutputResult: EmitOutputResult;
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
        fileType: OutputFileType;
        sourceMapOutput: any;
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

    export interface IDocumentRegistry {
        acquireDocument(
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            byteOrderMark: ts.ByteOrderMark,
            version: number,
            isOpen: boolean,
            referencedFiles: string[]): Document;

        updateDocument(
            document: Document,
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: number,
            isOpen: boolean,
            textChangeRange: TextChangeRange
            ): Document;

        releaseDocument(filename: string, compilationSettings: ts.CompilerOptions): void
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
    }

    export class ScriptElementKindModifier {
        static none = "";
        static publicMemberModifier = "public";
        static privateMemberModifier = "private";
        static exportedModifier = "export";
        static ambientModifier = "declare";
        static staticModifier = "static";
    }

    export class MatchKind {
        static none: string = null;
        static exact = "exact";
        static subString = "substring";
        static prefix = "prefix";
    }

    export class DiagnosticCategory {
        static none = "";
        static error = "error";
        static warning = "warning";
        static message = "message";
    }

    export interface IncrementalParse {
        (oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, newText: ISimpleText): SyntaxTree
    }

    export class Document {
        private _bloomFilter: BloomFilter = null;

        // By default, our Document class doesn't support incremental update of its contents.
        // However, we enable other layers (like teh services layer) to inject the capability
        // into us by setting this function.
        public static incrementalParse: IncrementalParse = IncrementalParser.parse;

        constructor(private compilationSettings: ts.CompilerOptions,
            public filename: string,
            public referencedFiles: string[],
            private _scriptSnapshot: IScriptSnapshot,
            public byteOrderMark: ts.ByteOrderMark,
            public version: number,
            public isOpen: boolean,
            private _syntaxTree: SyntaxTree,
            private _soruceFile: ts.SourceFile) {
        }

        public isDeclareFile(): boolean {
            return isDTSFile(this.filename);
        }

        public sourceUnit(): SourceUnitSyntax {
            // If we don't have a script, create one from our parse tree.
            return this.syntaxTree().sourceUnit();
        }

        public diagnostics(): Diagnostic[] {
            return this.syntaxTree().diagnostics();
        }

        public lineMap(): LineMap {
            return this.syntaxTree().lineMap();
        }

        public syntaxTree(): SyntaxTree {
            if (!this._syntaxTree) {
                var start = new Date().getTime();

                this._syntaxTree = Parser.parse(
                    this.filename, SimpleText.fromScriptSnapshot(this._scriptSnapshot), this.compilationSettings.target, this.isDeclareFile());

                var time = new Date().getTime() - start;

                //TypeScript.syntaxTreeParseTime += time;
            }

            return this._syntaxTree;
        }

        public sourceFile(): ts.SourceFile {
            if (!this._soruceFile) {
                var start = new Date().getTime();

                this._soruceFile = ts.createSourceFile(this.filename, this._scriptSnapshot.getText(0, this._scriptSnapshot.getLength()), this.compilationSettings.target);

                var time = new Date().getTime() - start;

                //TypeScript.astParseTime += time;
            }

            return this._soruceFile;
        }

        public bloomFilter(): BloomFilter {
            if (!this._bloomFilter) {
                var identifiers = createIntrinsicsObject<boolean>();
                var pre = function (cur: TypeScript.ISyntaxElement) {
                    if (ASTHelpers.isValidAstNode(cur)) {
                        if (cur.kind() === SyntaxKind.IdentifierName) {
                            var nodeText = tokenValueText((<TypeScript.ISyntaxToken>cur));

                            identifiers[nodeText] = true;
                        }
                    }
                };

                TypeScript.getAstWalkerFactory().simpleWalk(this.sourceUnit(), pre, null, identifiers);

                var identifierCount = 0;
                for (var name in identifiers) {
                    if (identifiers[name]) {
                        identifierCount++;
                    }
                }

                this._bloomFilter = new BloomFilter(identifierCount);
                this._bloomFilter.addKeys(identifiers);
            }
            return this._bloomFilter;
        }

        // Returns true if this file should get emitted into its own unique output file.  
        // Otherwise, it should be written into a single output file along with the rest of hte
        // documents in the compilation.
        public emitToOwnOutputFile(): boolean {
            // If we haven't specified an output file in our settings, then we're definitely 
            // emitting to our own file.  Also, if we're an external module, then we're 
            // definitely emitting to our own file.
            return !this.compilationSettings.out || this.syntaxTree().isExternalModule();
        }

        public update(scriptSnapshot: IScriptSnapshot, version: number, isOpen: boolean, textChangeRange: TextChangeRange): Document {
            // See if we are currently holding onto a syntax tree.  We may not be because we're 
            // either a closed file, or we've just been lazy and haven't had to create the syntax
            // tree yet.  Access the field instead of the method so we don't accidently realize
            // the old syntax tree.
            var oldSyntaxTree = this._syntaxTree;

            if (textChangeRange !== null && Debug.shouldAssert(AssertionLevel.Normal)) {
                var oldText = this._scriptSnapshot;
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

            var text = SimpleText.fromScriptSnapshot(scriptSnapshot);

            // If we don't have a text change, or we don't have an old syntax tree, then do a full
            // parse.  Otherwise, do an incremental parse.
            var newSyntaxTree = textChangeRange === null || oldSyntaxTree === null || Document.incrementalParse === null
                ? TypeScript.Parser.parse(this.filename, text, this.compilationSettings.target, TypeScript.isDTSFile(this.filename))
                : Document.incrementalParse(oldSyntaxTree, textChangeRange, text);

            return new Document(this.compilationSettings, this.filename, this.referencedFiles, scriptSnapshot, this.byteOrderMark, version, isOpen, newSyntaxTree, /*soruceFile*/ null);
        }

        public static create(compilationSettings: ts.CompilerOptions, fileName: string, scriptSnapshot: IScriptSnapshot, byteOrderMark: ts.ByteOrderMark, version: number, isOpen: boolean, referencedFiles: string[]): Document {
            return new Document(compilationSettings, fileName, referencedFiles, scriptSnapshot, byteOrderMark, version, isOpen, /*syntaxTree:*/ null, /*soruceFile*/ null);
        }
    }

    /// Language Service

    interface CompletionSession {
        filename: string;           // the file where the completion was requested
        position: number;           // position in the file where the completion was requested
        entries: CompletionEntry[]; // entries for this completion
        symbols: ts.Map<ts.Symbol>; // symbols by entry name map
        location: ts.Node;          // the node where the completion was requested
        typeChecker: ts.TypeChecker;// the typeChecker used to generate this completion
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
        version: number;
        isOpen: boolean;
        byteOrderMark: ts.ByteOrderMark;
        _sourceText?: TypeScript.IScriptSnapshot;
    }

    interface DocumentRegistryEntry {
        document: Document;
        refCount: number;
        owners: string[];
    }

    export function getDefaultCompilerOptions(): ts.CompilerOptions {
        // Set "ES5" target by default for language service
        return {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.None,
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

    class CancellationToken {

        public static None: CancellationToken = new CancellationToken(null)

        constructor(private cancellationToken: ts.CancellationToken) {
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

    // Cache host information about scripts. Should be refreshed 
    // at each language service public entry point, since we don't know when 
    // set of scripts handled by the host changes.
    class HostCache {
        private _filenameToEntry: ts.Map<HostFileInformation>;
        private _compilationSettings: ts.CompilerOptions;

        constructor(private host: LanguageServiceHost) {
            // script id => script index
            this._filenameToEntry = {};

            var filenames = host.getScriptFileNames();
            for (var i = 0, n = filenames.length; i < n; i++) {
                var filename = filenames[i];
                this._filenameToEntry[TypeScript.switchToForwardSlashes(filename)] = {
                    filename: filename,
                    version: host.getScriptVersion(filename),
                    isOpen: host.getScriptIsOpen(filename),
                    byteOrderMark: host.getScriptByteOrderMark(filename)
                };
            }

            this._compilationSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        }

        public compilationSettings() {
            return this._compilationSettings;
        }

        public contains(filename: string): boolean {
            return !!this._filenameToEntry[TypeScript.switchToForwardSlashes(filename)];
        }

        public getHostfilename(filename: string) {
            var hostCacheEntry = this._filenameToEntry[TypeScript.switchToForwardSlashes(filename)];
            if (hostCacheEntry) {
                return hostCacheEntry.filename;
            }
            return filename;
        }

        public getfilenames(): string[] {
            var fileNames: string[] = [];
            for (var id in this._filenameToEntry) {
                fileNames.push(id);
            }
            return fileNames;
        }

        public getVersion(filename: string): number {
            return this._filenameToEntry[TypeScript.switchToForwardSlashes(filename)].version;
        }

        public isOpen(filename: string): boolean {
            return this._filenameToEntry[TypeScript.switchToForwardSlashes(filename)].isOpen;
        }

        public getByteOrderMark(filename: string): ts.ByteOrderMark {
            return this._filenameToEntry[TypeScript.switchToForwardSlashes(filename)].byteOrderMark;
        }

        public getScriptSnapshot(filename: string): TypeScript.IScriptSnapshot {
            var file = this._filenameToEntry[TypeScript.switchToForwardSlashes(filename)];
            if (!file._sourceText) {
                file._sourceText = this.host.getScriptSnapshot(file.filename);
            }
            return file._sourceText;
        }

        public getScriptTextChangeRangeSinceVersion(filename: string, lastKnownVersion: number): TypeScript.TextChangeRange {
            var currentVersion = this.getVersion(filename);
            if (lastKnownVersion === currentVersion) {
                return TypeScript.TextChangeRange.unchanged; // "No changes"
            }

            var scriptSnapshot = this.getScriptSnapshot(filename);
            return scriptSnapshot.getTextChangeRangeSinceVersion(lastKnownVersion);
        }
    }

    class SyntaxTreeCache {
        private _hostCache: HostCache;

        // For our syntactic only features, we also keep a cache of the syntax tree for the 
        // currently edited file.  
        private _currentfilename: string = "";
        private _currentFileVersion: number = -1;
        private _currentFileSyntaxTree: TypeScript.SyntaxTree = null;
        private _currentFileScriptSnapshot: TypeScript.IScriptSnapshot = null;

        constructor(private _host: LanguageServiceHost) {
            this._hostCache = new HostCache(_host);
        }

        public getCurrentFileSyntaxTree(filename: string): TypeScript.SyntaxTree {
            this._hostCache = new HostCache(this._host);

            var version = this._hostCache.getVersion(filename);
            var syntaxTree: TypeScript.SyntaxTree = null;

            if (this._currentFileSyntaxTree === null || this._currentfilename !== filename) {
                var scriptSnapshot = this._hostCache.getScriptSnapshot(filename);
                syntaxTree = this.createSyntaxTree(filename, scriptSnapshot);
            }
            else if (this._currentFileVersion !== version) {
                var scriptSnapshot = this._hostCache.getScriptSnapshot(filename);
                syntaxTree = this.updateSyntaxTree(filename, scriptSnapshot, this._currentFileSyntaxTree, this._currentFileVersion);
            }

            if (syntaxTree !== null) {
                // All done, ensure state is up to date
                this._currentFileScriptSnapshot = scriptSnapshot;
                this._currentFileVersion = version;
                this._currentfilename = filename;
                this._currentFileSyntaxTree = syntaxTree;
            }

            return this._currentFileSyntaxTree;
        }

        public getCurrentScriptSnapshot(filename: string): IScriptSnapshot {
            // update _currentFileScriptSnapshot as a part of 'getCurrentFileSyntaxTree' call
            this.getCurrentFileSyntaxTree(filename);
            return this._currentFileScriptSnapshot;
        }

        private createSyntaxTree(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot): TypeScript.SyntaxTree {
            var text = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);

            // For the purposes of features that use this syntax tree, we can just use the default
            // compilation settings.  The features only use the syntax (and not the diagnostics),
            // and the syntax isn't affected by the compilation settings.
            var syntaxTree = TypeScript.Parser.parse(filename, text, getDefaultCompilerOptions().target, TypeScript.isDTSFile(filename));

            return syntaxTree;
        }

        private updateSyntaxTree(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot, previousSyntaxTree: TypeScript.SyntaxTree, previousFileVersion: number): TypeScript.SyntaxTree {
            var editRange = this._hostCache.getScriptTextChangeRangeSinceVersion(filename, previousFileVersion);

            // Debug.assert(newLength >= 0);

            // The host considers the entire buffer changed.  So parse a completely new tree.
            if (editRange === null) {
                return this.createSyntaxTree(filename, scriptSnapshot);
            }

            var nextSyntaxTree = IncrementalParser.parse(
                previousSyntaxTree, editRange, SimpleText.fromScriptSnapshot(scriptSnapshot));

            this.ensureInvariants(filename, editRange, nextSyntaxTree, this._currentFileScriptSnapshot, scriptSnapshot);

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
                var incrementalTreeText = fullText(incrementalTree.sourceUnit());
                var actualSnapshotText = newScriptSnapshot.getText(0, newScriptSnapshot.getLength());
                Debug.assert(incrementalTreeText === actualSnapshotText, 'Expected full texts to be equal');
            }
        }
    }

    export class DocumentRegistry implements IDocumentRegistry {
        private buckets: ts.Map<ts.Map<DocumentRegistryEntry>> = {};

        private getKeyFromCompilationSettings(settings: ts.CompilerOptions): string {
            return "_" + ts.ScriptTarget[settings.target]; //  + "|" + settings.propagateEnumConstants.toString()
        }

        private getBucketForCompilationSettings(settings: ts.CompilerOptions, createIfMissing: boolean): ts.Map<DocumentRegistryEntry> {
            var key = this.getKeyFromCompilationSettings(settings);
            var bucket = this.buckets[key];
            if (!bucket && createIfMissing) {
                this.buckets[key] = bucket = {};
            }
            return bucket;
        }

        public reportStats() {
            var bucketInfoArray = Object.keys(this.buckets).filter(name => name && name.charAt(0) === '_').map(name => {
                var entries = this.buckets[name];
                var documents = [];
                for (var i in entries) {
                    var entry = entries[i];
                    documents.push({
                        name: i,
                        refCount: entry.refCount,
                        references: entry.owners.slice(0)
                    });
                }
                documents.sort((x, y) => y.refCount - x.refCount);
                return { bucket: name, documents: documents }
            });
            return JSON.stringify(bucketInfoArray, null, 2);
        }

        public acquireDocument(
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            byteOrderMark: ts.ByteOrderMark,
            version: number,
            isOpen: boolean,
            referencedFiles: string[]= []): Document {

            var bucket = this.getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ true);
            var entry = bucket[filename];
            if (!entry) {
                var document = Document.create(compilationSettings, filename, scriptSnapshot, byteOrderMark, version, isOpen, referencedFiles);

                bucket[filename] = entry = {
                    document: document,
                    refCount: 0,
                    owners: []
                };
            }
            entry.refCount++;

            return entry.document;
        }

        public updateDocument(
            document: Document,
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: number,
            isOpen: boolean,
            textChangeRange: TextChangeRange
            ): Document {

            var bucket = this.getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ false);
            Debug.assert(bucket);
            var entry = bucket[filename];
            Debug.assert(entry);

            if (entry.document.isOpen === isOpen && entry.document.version === version) {
                return entry.document;
            }

            entry.document = entry.document.update(scriptSnapshot, version, isOpen, textChangeRange);
            return entry.document;
        }

        public releaseDocument(filename: string, compilationSettings: ts.CompilerOptions): void {
            var bucket = this.getBucketForCompilationSettings(compilationSettings, false);
            Debug.assert(bucket);

            var entry = bucket[filename];
            entry.refCount--;

            Debug.assert(entry.refCount >= 0);
            if (entry.refCount === 0) {
                delete bucket[filename];
            }
        }
    }

    export function createLanguageService(host: LanguageServiceHost, documentRegistry: IDocumentRegistry): LanguageService {
        var _syntaxTreeCache: SyntaxTreeCache = new SyntaxTreeCache(host);
        var formattingRulesProvider: Formatting.RulesProvider;
        var hostCache: HostCache; // A cache of all the information about the files on the host side.
        var program: ts.Program;
        var typeChecker: ts.TypeChecker;
        var useCaseSensitivefilenames = false;
        var documentsByName: ts.Map<Document> = {};
        var documentRegistry = documentRegistry;
        var cancellationToken = new CancellationToken(host.getCancellationToken());
        var activeCompletionSession: CompletionSession;

        // Check if the localized messages json is set, otherwise query the host for it
        if (!TypeScript.LocalizedDiagnosticMessages) {
            TypeScript.LocalizedDiagnosticMessages = host.getLocalizedDiagnosticMessages();
        }

        function createCompilerHost(): ts.CompilerHost {
            return {
                getSourceFile: (filename, languageVersion) => {
                    var document = documentsByName[filename];

                    Debug.assert(!!document, "document can not be undefined");

                    return document.sourceFile();
                },
                getCancellationToken: () => cancellationToken,
                getCanonicalFileName: (filename) => useCaseSensitivefilenames ? filename : filename.toLowerCase(),
                useCaseSensitiveFileNames: () => useCaseSensitivefilenames,
                getNewLine: () => "\n",
                // Need something that doesn't depend on sys.ts here
                getDefaultLibFilename: (): string => {
                    throw Error("TOD:: getDefaultLibfilename");
                },
                writeFile: (filename, data) => {
                    throw Error("TODO: write file");
                },
                getCurrentDirectory: (): string => {
                    throw Error("TODO: getCurrentDirectory");
                }
            };
        }

        function synchronizeHostData(): void {
            // Reset the cache at start of every refresh
            hostCache = new HostCache(host);

            var compilationSettings = hostCache.compilationSettings();

            // TODO: check if we need to create a new compiler to start with
            //       1. files are identical
            //       2. compilation settings are identical

            // Now, remove any files from the compiler that are no longer in the host.
            var oldProgram = program;
            if (oldProgram) {
                var oldSettings = program.getCompilerOptions();

                // If the language version changed, then that affects what types of things we parse. So
                // we have to dump all syntax trees.
                // TODO: handle propagateEnumConstants
                var settingsChangeAffectsSyntax = oldSettings.target !== compilationSettings.target;

                var changesInCompilationSettingsAffectSyntax =
                    oldSettings && compilationSettings && !compareDataObjects(oldSettings, compilationSettings) && settingsChangeAffectsSyntax;
                var oldSourceFiles = program.getSourceFiles();

                for (var i = 0, n = oldSourceFiles.length; i < n; i++) {
                    cancellationToken.throwIfCancellationRequested();
                    var filename = oldSourceFiles[i].filename;
                    if (!hostCache.contains(filename) || changesInCompilationSettingsAffectSyntax) {
                        documentRegistry.releaseDocument(filename, oldSettings);
                        delete documentsByName[filename];
                    }
                }
            }

            // Now, for every file the host knows about, either add the file (if the compiler
            // doesn't know about it.).  Or notify the compiler about any changes (if it does
            // know about it.)
            var hostfilenames = hostCache.getfilenames();

            for (var i = 0, n = hostfilenames.length; i < n; i++) {
                var filename = hostfilenames[i];

                var version = hostCache.getVersion(filename);
                var isOpen = hostCache.isOpen(filename);
                var scriptSnapshot = hostCache.getScriptSnapshot(filename);

                var document: Document = documentsByName[filename];
                if (document) {
                    //
                    // If the document is the same, assume no update
                    //
                    if (document.version === version && document.isOpen === isOpen) {
                        continue;
                    }

                    // Only perform incremental parsing on open files that are being edited.  If a file was
                    // open, but is now closed, we want to reparse entirely so we don't have any tokens that
                    // are holding onto expensive script snapshot instances on the host.  Similarly, if a 
                    // file was closed, then we always want to reparse.  This is so our tree doesn't keep 
                    // the old buffer alive that represented the file on disk (as the host has moved to a 
                    // new text buffer).
                    var textChangeRange: TextChangeRange = null;
                    if (document.isOpen && isOpen) {
                        textChangeRange = hostCache.getScriptTextChangeRangeSinceVersion(filename, document.version);
                    }

                    document = documentRegistry.updateDocument(document, filename, compilationSettings, scriptSnapshot, version, isOpen, textChangeRange);
                }
                else {
                    document = documentRegistry.acquireDocument(filename, compilationSettings, scriptSnapshot, hostCache.getByteOrderMark(filename), version, isOpen, []);
                }

                // Remeber the new document
                documentsByName[filename] = document;
            }

            // Now create a new compiler
            program = ts.createProgram(hostfilenames, compilationSettings, createCompilerHost());
            typeChecker = program.getTypeChecker();
        }

        function dispose(): void {
            if (program) {
                ts.forEach(program.getSourceFiles(),
                    (f) => documentRegistry.releaseDocument(f.filename, program.getCompilerOptions()));
            }
        }

        /// Diagnostics
        function getSyntacticDiagnostics(filename: string) {
            synchronizeHostData();
            return program.getDiagnostics(program.getSourceFile(filename));
        }

        function getSemanticDiagnostics(filename: string) {
            synchronizeHostData();
            return typeChecker.getDiagnostics(program.getSourceFile(filename));
        }

        function getCompilerOptionsDiagnostics() {
            synchronizeHostData();
            return program.getGlobalDiagnostics();
        }

        /// Completion
        function createCompletionEntry(symbol: ts.Symbol): CompletionEntry {
            // Try to get a valid display name for this symbol, if we could not find one, then ignore it. 
            // We would like to only show things that can be added after a dot, so for instance numeric properties can
            // not be accessed with a dot (a.1 <- invalid)
            var displayName = CompletionHelpers.getValidCompletionEntryDisplayName(symbol.getName(), program.getCompilerOptions().target);
            if (!displayName) {
                return undefined;
            }

            var declarations = symbol.getDeclarations();
            var firstDeclaration = [0];
            return {
                name: displayName,
                kind: getSymbolKind(symbol),
                kindModifiers: declarations ? getNodeModifiers(declarations[0]) : ScriptElementKindModifier.none
            };
        }

        function getCompletionsAtPosition(filename: string, position: number, isMemberCompletion: boolean) {
            function getCompletionEntriesFromSymbols(symbols: ts.Symbol[], session: CompletionSession): void {
                ts.forEach(symbols, (symbol) => {
                    var entry = createCompletionEntry(symbol);
                    if (entry) {
                        session.entries.push(entry);
                        session.symbols[entry.name] = symbol;
                    }
                });
            }

            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);

            var document = documentsByName[filename];
            var sourceUnit = document.sourceUnit();

            if (CompletionHelpers.isCompletionListBlocker(document.syntaxTree().sourceUnit(), position)) {
                host.log("Returning an empty list because completion was blocked.");
                return null;
            }

            var node = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position, /*useTrailingTriviaAsLimChar*/ true, /*forceInclusive*/ true);

            if (node && node.kind() === TypeScript.SyntaxKind.IdentifierName &&
                start(node) === end(node)) {
                // Ignore missing name nodes
                node = node.parent;
            }

            var isRightOfDot = false;
            if (node &&
                node.kind() === TypeScript.SyntaxKind.MemberAccessExpression &&
                end((<TypeScript.MemberAccessExpressionSyntax>node).expression) < position) {

                isRightOfDot = true;
                node = (<TypeScript.MemberAccessExpressionSyntax>node).expression;
            }
            else if (node &&
                node.kind() === TypeScript.SyntaxKind.QualifiedName &&
                end((<TypeScript.QualifiedNameSyntax>node).left) < position) {

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
            var mappedNode = getNodeAtPosition(document.sourceFile(), end(node) - 1);

            Debug.assert(mappedNode, "Could not map a Fidelity node to an AST node");

            // Get the completions
            activeCompletionSession = {
                filename: filename,
                position: position,
                entries: [],
                symbols: {},
                location: mappedNode,
                typeChecker: typeChecker
            };

            // Right of dot member completion list
            if (isRightOfDot) {
                var type: ts.Type = typeChecker.getTypeOfExpression(mappedNode);
                if (!type) {
                    return undefined;
                }

                var symbols = type.getApparentProperties();
                isMemberCompletion = true;
                getCompletionEntriesFromSymbols(symbols, activeCompletionSession);
            }
            else {
                var containingObjectLiteral = CompletionHelpers.getContainingObjectLiteralApplicableForCompletion(document.syntaxTree().sourceUnit(), position);

                // Object literal expression, look up possible property names from contextual type
                if (containingObjectLiteral) {
                    var searchPosition = Math.min(position, end(containingObjectLiteral));
                    var path = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, searchPosition);
                    // Get the object literal node

                    while (node && node.kind() !== TypeScript.SyntaxKind.ObjectLiteralExpression) {
                        node = node.parent;
                    }

                    if (!node || node.kind() !== TypeScript.SyntaxKind.ObjectLiteralExpression) {
                        // AST Path look up did not result in the same node as Fidelity Syntax Tree look up.
                        // Once we remove AST this will no longer be a problem.
                        return null;
                    }

                    isMemberCompletion = true;

                    //// Try to get the object members form contextual typing
                    //var contextualMembers = compiler.getContextualMembersFromAST(node, document);
                    //if (contextualMembers && contextualMembers.symbols && contextualMembers.symbols.length > 0) {
                    //    // get existing members
                    //    var existingMembers = compiler.getVisibleMemberSymbolsFromAST(node, document);

                    //    // Add filtterd items to the completion list
                    //    getCompletionEntriesFromSymbols({
                    //        symbols: CompletionHelpers.filterContextualMembersList(contextualMembers.symbols, existingMembers, filename, position),
                    //        enclosingScopeSymbol: contextualMembers.enclosingScopeSymbol
                    //    }, entries);
                    //}
                }
                // Get scope memebers
                else {
                    isMemberCompletion = false;
                    /// TODO filter meaning based on the current context
                    var symbolMeanings = ts.SymbolFlags.Type | ts.SymbolFlags.Value | ts.SymbolFlags.Namespace;
                    var symbols = typeChecker.getSymbolsInScope(mappedNode, symbolMeanings);

                    getCompletionEntriesFromSymbols(symbols, activeCompletionSession);
                }
            }

            // Add keywords if this is not a member completion list
            if (!isMemberCompletion) {
                Array.prototype.push.apply(activeCompletionSession.entries, KeywordCompletions.getKeywordCompltions());
            }

            return {
                isMemberCompletion: isMemberCompletion,
                entries: activeCompletionSession.entries
            };
        }

        function getCompletionEntryDetails(filename: string, position: number, entryName: string) {
            // Note: No need to call synchronizeHostData, as we have captured all the data we need
            //       in the getCompletionsAtPosition erlier
            filename = TypeScript.switchToForwardSlashes(filename);

            var session = activeCompletionSession;

            // Ensure that the current active completion session is still valid for this request
            if (!session || session.filename !== filename || session.position !== position) {
                return undefined;
            }

            var symbol = activeCompletionSession.symbols[entryName];
            if (symbol) {
                var type = session.typeChecker.getTypeOfSymbol(symbol);
                Debug.assert(type, "Could not find type for symbol");
                var completionEntry = createCompletionEntry(symbol);
                return {
                    name: entryName,
                    kind: completionEntry.kind,
                    kindModifiers: completionEntry.kindModifiers,
                    type: session.typeChecker.typeToString(type, session.location),
                    fullSymbolName: typeChecker.symbolToString(symbol, session.location),
                    docComment: ""
                };
            }
            else {
                // No symbol, it is a keyword
                return {
                    name: entryName,
                    kind: ScriptElementKind.keyword,
                    kindModifiers: ScriptElementKindModifier.none,
                    type: undefined,
                    fullSymbolName: entryName,
                    docComment: undefined
                };
            }
        }

        function getNodeAtPosition(sourceFile: ts.SourceFile, position: number) {
            var current: ts.Node = sourceFile;
            outer: while (true) {
                // find the child that has this
                for (var i = 0, n = current.getChildCount(); i < n; i++) {
                    var child = current.getChildAt(i);
                    if (ts.getTokenPosOfNode(child) <= position && position < child.end) {
                        current = child;
                        continue outer;
                    }
                    if (child.end > position) break;
                }
                return current;
            }
        }

        function getEnclosingDeclaration(node: ts.Node): ts.Node {
            while (true) {
                node = node.parent;
                if (!node) {
                    return node;
                }
                switch (node.kind) {
                    case ts.SyntaxKind.Method:
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

        function getSymbolKind(symbol: ts.Symbol): string {
            var flags = symbol.getFlags();

            if (flags & ts.SymbolFlags.Module) return ScriptElementKind.moduleElement;
            if (flags & ts.SymbolFlags.Class) return ScriptElementKind.classElement;
            if (flags & ts.SymbolFlags.Interface) return ScriptElementKind.interfaceElement;
            if (flags & ts.SymbolFlags.Enum) return ScriptElementKind.enumElement;
            if (flags & ts.SymbolFlags.Variable) return ScriptElementKind.variableElement;
            if (flags & ts.SymbolFlags.Function) return ScriptElementKind.functionElement;
            if (flags & ts.SymbolFlags.GetAccessor) return ScriptElementKind.memberGetAccessorElement;
            if (flags & ts.SymbolFlags.SetAccessor) return ScriptElementKind.memberSetAccessorElement;
            if (flags & ts.SymbolFlags.Method) return ScriptElementKind.memberFunctionElement;
            if (flags & ts.SymbolFlags.Property) return ScriptElementKind.memberVariableElement;
            if (flags & ts.SymbolFlags.IndexSignature) return ScriptElementKind.indexSignatureElement;
            if (flags & ts.SymbolFlags.ConstructSignature) return ScriptElementKind.constructSignatureElement;
            if (flags & ts.SymbolFlags.CallSignature) return ScriptElementKind.callSignatureElement;
            if (flags & ts.SymbolFlags.Constructor) return ScriptElementKind.constructorImplementationElement;
            if (flags & ts.SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
            if (flags & ts.SymbolFlags.EnumMember) return ScriptElementKind.variableElement;

            return ScriptElementKind.unknown;
        }

        function getTypeKind(type: ts.Type): string {
            var flags = type.getFlags();

            if (flags & ts.TypeFlags.Enum) return ScriptElementKind.enumElement;
            if (flags & ts.TypeFlags.Class) return ScriptElementKind.classElement;
            if (flags & ts.TypeFlags.Interface) return ScriptElementKind.interfaceElement;
            if (flags & ts.TypeFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
            if (flags & ts.TypeFlags.Intrinsic) return ScriptElementKind.primitiveType;
            if (flags & ts.TypeFlags.StringLiteral) return ScriptElementKind.primitiveType;

            return ScriptElementKind.unknown;
        }

        function getNodeModifiers(node: ts.Node): string {
            var flags = node.flags;
            var result: string[] = [];

            if (flags & ts.NodeFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
            if (flags & ts.NodeFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
            if (flags & ts.NodeFlags.Static) result.push(ScriptElementKindModifier.staticModifier);
            if (flags & ts.NodeFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
            if (ts.isInAmbientContext(node)) result.push(ScriptElementKindModifier.ambientModifier);

            return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
        }

        /// QuickInfo
        function getTypeAtPosition(filename: string, position: number): TypeInfo {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);
            var document = documentsByName[filename];
            var node = getNodeAtPosition(document.sourceFile(), position);
            if (!node) return undefined;

            switch (node.kind) {
                // A declaration
                case ts.SyntaxKind.Identifier:
                    if (node.parent.kind === ts.SyntaxKind.CallExpression || node.parent.kind === ts.SyntaxKind.NewExpression) {
                        // TODO: handle new and call expressions
                    }

                    var symbol = typeChecker.getSymbolOfIdentifier(<ts.Identifier>node);
                    Debug.assert(symbol, "getTypeAtPosition: Could not find symbol for node");
                    var type = typeChecker.getTypeOfSymbol(symbol);

                    return {
                        memberName: new MemberNameString(typeChecker.typeToString(type)),
                        docComment: "",
                        fullSymbolName: typeChecker.symbolToString(symbol, getEnclosingDeclaration(node)),
                        kind: getSymbolKind(symbol),
                        minChar: node.pos,
                        limChar: node.end
                    };

                // An Expression
                case ts.SyntaxKind.ThisKeyword:
                case ts.SyntaxKind.QualifiedName:
                case ts.SyntaxKind.SuperKeyword:
                case ts.SyntaxKind.StringLiteral:
                    var type = typeChecker.getTypeOfExpression(node);
                    Debug.assert(type, "getTypeAtPosition: Could not find type for node");
                    return {
                        memberName: new MemberNameString(""),
                        docComment: "",
                        fullSymbolName: typeChecker.typeToString(type, getEnclosingDeclaration(node)),
                        kind: getTypeKind(type),
                        minChar: node.pos,
                        limChar: node.end
                    };
                    break;
            }
        }

        /// Syntactic features
        function getSyntaxTree(filename: string): TypeScript.SyntaxTree {
            filename = TypeScript.switchToForwardSlashes(filename);
            return _syntaxTreeCache.getCurrentFileSyntaxTree(filename);
        }

        function getNameOrDottedNameSpan(filename: string, startPos: number, endPos: number): SpanInfo {
            function getTypeInfoEligiblePath(filename: string, position: number, isConstructorValidPosition: boolean) {
                var sourceUnit = _syntaxTreeCache.getCurrentFileSyntaxTree(filename).sourceUnit();

                var ast = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position, /*useTrailingTriviaAsLimChar*/ false, /*forceInclusive*/ true);
                if (ast === null) {
                    return null;
                }

                if (ast.kind() === SyntaxKind.ParameterList && ast.parent.kind() === SyntaxKind.CallSignature && ast.parent.parent.kind() === SyntaxKind.ConstructorDeclaration) {
                    ast = ast.parent.parent;
                }

                switch (ast.kind()) {
                    default:
                        return null;
                    case TypeScript.SyntaxKind.ConstructorDeclaration:
                        var constructorAST = <TypeScript.ConstructorDeclarationSyntax>ast;
                        if (!isConstructorValidPosition || !(position >= start(constructorAST) && position <= start(constructorAST) + "constructor".length)) {
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

            return {
                minChar: start(node),
                limChar: end(node)
            };
        }

        function getBreakpointStatementAtPosition(filename: string, position: number) {
            // doesn't use compiler - no need to synchronize with host
            filename = TypeScript.switchToForwardSlashes(filename);

            var syntaxtree = getSyntaxTree(filename);
            return TypeScript.Services.Breakpoints.getBreakpointLocation(syntaxtree, position);
        }

        function getScriptLexicalStructure(filename: string) {
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = getSyntaxTree(filename);
            var items: NavigateToItem[] = [];
            GetScriptLexicalStructureWalker.getListsOfAllScriptLexicalStructure(items, filename, syntaxTree.sourceUnit());
            return items;
        }

        function getOutliningRegions(filename: string) {
            // doesn't use compiler - no need to synchronize with host
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = getSyntaxTree(filename);
            return OutliningElementsCollector.collectElements(syntaxTree.sourceUnit());
        }

        function getBraceMatchingAtPosition(filename: string, position: number) {
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = getSyntaxTree(filename);
            return BraceMatcher.getMatchSpans(syntaxTree, position);
        }

        function getIndentationAtPosition(filename: string, position: number, editorOptions: EditorOptions) {
            filename = TypeScript.switchToForwardSlashes(filename);

            var syntaxTree = getSyntaxTree(filename);

            var scriptSnapshot = _syntaxTreeCache.getCurrentScriptSnapshot(filename);
            var scriptText = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(scriptText);
            var options = new FormattingOptions(!editorOptions.ConvertTabsToSpaces, editorOptions.TabSize, editorOptions.IndentSize, editorOptions.NewLineCharacter)

            return TypeScript.Services.Formatting.SingleTokenIndenter.getIndentationAmount(position, syntaxTree.sourceUnit(), textSnapshot, options);
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
            var scriptSnapshot = _syntaxTreeCache.getCurrentScriptSnapshot(filename);
            var scriptText = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(scriptText);

            var manager = new TypeScript.Services.Formatting.FormattingManager(syntaxTree, textSnapshot, formattingRulesProvider, options);

            return manager;
        }

        function getFormattingEditsForRange(filename: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = getFormattingManager(filename, options);
            return manager.formatSelection(minChar, limChar);
        }

        function getFormattingEditsForDocument(filename: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = getFormattingManager(filename, options);
            return manager.formatDocument(minChar, limChar);
        }

        function getFormattingEditsOnPaste(filename: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = getFormattingManager(filename, options);
            return manager.formatOnPaste(minChar, limChar);
        }

        function getFormattingEditsAfterKeystroke(filename: string, position: number, key: string, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = getFormattingManager(filename, options);
            if (key === "}") return manager.formatOnClosingCurlyBrace(position);
            else if (key === ";") return manager.formatOnSemicolon(position);
            else if (key === "\n") return manager.formatOnEnter(position);
            else return [];
        }


        return {
            dispose: dispose,
            refresh: () => { },
            cleanupSemanticCache: () => { },
            getSyntacticDiagnostics: getSyntacticDiagnostics,
            getSemanticDiagnostics: getSemanticDiagnostics,
            getCompilerOptionsDiagnostics: getCompilerOptionsDiagnostics,
            getCompletionsAtPosition: getCompletionsAtPosition,
            getCompletionEntryDetails: getCompletionEntryDetails,
            getTypeAtPosition: getTypeAtPosition,
            getSignatureAtPosition: (filename, position) => undefined,
            getDefinitionAtPosition: (filename, position) => [],
            getReferencesAtPosition: (filename, position) => [],
            getOccurrencesAtPosition: (filename, position) => [],
            getImplementorsAtPosition: (filename, position) => [],
            getNameOrDottedNameSpan: getNameOrDottedNameSpan,
            getBreakpointStatementAtPosition: getBreakpointStatementAtPosition,
            getNavigateToItems: (searchValue) => [],
            getScriptLexicalStructure: getScriptLexicalStructure,
            getOutliningRegions: getOutliningRegions,
            getBraceMatchingAtPosition: getBraceMatchingAtPosition,
            getIndentationAtPosition: getIndentationAtPosition,
            getFormattingEditsForRange: getFormattingEditsForRange,
            getFormattingEditsForDocument: getFormattingEditsForDocument,
            getFormattingEditsOnPaste: getFormattingEditsOnPaste,
            getFormattingEditsAfterKeystroke: getFormattingEditsAfterKeystroke,
            getEmitOutput: (filename) => undefined,
        };
    }

    /// Classifier

    export function createClassifier(host: Logger): Classifier {
        var scanner: TypeScript.Scanner.IScanner;
        var lastDiagnosticKey: string = null;
        var noRegexTable: boolean[];
        var reportDiagnostic = (position: number, fullWidth: number, key: string, args: any[]) => {
            lastDiagnosticKey = key;
        };

        if (!noRegexTable) {
            noRegexTable = [];
            noRegexTable[TypeScript.SyntaxKind.IdentifierName] = true;
            noRegexTable[TypeScript.SyntaxKind.StringLiteral] = true;
            noRegexTable[TypeScript.SyntaxKind.NumericLiteral] = true;
            noRegexTable[TypeScript.SyntaxKind.RegularExpressionLiteral] = true;
            noRegexTable[TypeScript.SyntaxKind.ThisKeyword] = true;
            noRegexTable[TypeScript.SyntaxKind.PlusPlusToken] = true;
            noRegexTable[TypeScript.SyntaxKind.MinusMinusToken] = true;
            noRegexTable[TypeScript.SyntaxKind.CloseParenToken] = true;
            noRegexTable[TypeScript.SyntaxKind.CloseBracketToken] = true;
            noRegexTable[TypeScript.SyntaxKind.CloseBraceToken] = true;
            noRegexTable[TypeScript.SyntaxKind.TrueKeyword] = true;
            noRegexTable[TypeScript.SyntaxKind.FalseKeyword] = true;
        }

        function getClassificationsForLine(text: string, lexState: EndOfLineState): ClassificationResult {
            var offset = 0;
            if (lexState !== EndOfLineState.Start) {
                // If we're in a string literal, then prepend: "\
                // (and a newline).  That way when we lex we'll think we're still in a string literal.
                //
                // If we're in a multiline comment, then prepend: /*
                // (and a newline).  That way when we lex we'll think we're still in a multiline comment.
                if (lexState === EndOfLineState.InDoubleQuoteStringLiteral) {
                    text = '"\\\n' + text;
                }
                else if (lexState === EndOfLineState.InSingleQuoteStringLiteral) {
                    text = "'\\\n" + text;
                }
                else if (lexState === EndOfLineState.InMultiLineCommentTrivia) {
                    text = "/*\n" + text;
                }

                offset = 3;
            }

            var result = {
                finalLexState: EndOfLineState.Start,
                entries: []
            };

            var simpleText = TypeScript.SimpleText.fromString(text);
            scanner = Scanner.createScanner(ts.ScriptTarget.ES5, simpleText, reportDiagnostic);

            var lastTokenKind = TypeScript.SyntaxKind.None;
            var token: ISyntaxToken = null;
            do {
                lastDiagnosticKey = null;

                token = scanner.scan(!noRegexTable[lastTokenKind]);
                lastTokenKind = token.kind();

                processToken(text, simpleText, offset, token, result);
            }
            while (token.kind() !== SyntaxKind.EndOfFileToken);

            lastDiagnosticKey = null;
            return result;
        }

        function processToken(text: string, simpleText: ISimpleText, offset: number, token: TypeScript.ISyntaxToken, result: ClassificationResult): void {
            processTriviaList(text, offset, token.leadingTrivia(simpleText), result);
            addResult(text, offset, result, width(token), token.kind());
            processTriviaList(text, offset, token.trailingTrivia(simpleText), result);

            if (fullEnd(token) >= text.length) {
                // We're at the end.
                if (lastDiagnosticKey === TypeScript.DiagnosticCode.AsteriskSlash_expected) {
                    result.finalLexState = EndOfLineState.InMultiLineCommentTrivia;
                    return;
                }

                if (token.kind() === TypeScript.SyntaxKind.StringLiteral) {
                    var tokenText = token.text();
                    if (tokenText.length > 0 && tokenText.charCodeAt(tokenText.length - 1) === TypeScript.CharacterCodes.backslash) {
                        var quoteChar = tokenText.charCodeAt(0);
                        result.finalLexState = quoteChar === TypeScript.CharacterCodes.doubleQuote
                        ? EndOfLineState.InDoubleQuoteStringLiteral
                        : EndOfLineState.InSingleQuoteStringLiteral;
                        return;
                    }
                }
            }
        }

        function processTriviaList(text: string, offset: number, triviaList: TypeScript.ISyntaxTriviaList, result: ClassificationResult): void {
            for (var i = 0, n = triviaList.count(); i < n; i++) {
                var trivia = triviaList.syntaxTriviaAt(i);
                addResult(text, offset, result, trivia.fullWidth(), trivia.kind());
            }
        }

        function addResult(text: string, offset: number, result: ClassificationResult, length: number, kind: TypeScript.SyntaxKind): void {
            if (length > 0) {
                // If this is the first classification we're adding to the list, then remove any 
                // offset we have if we were continuing a construct from the previous line.
                if (result.entries.length === 0) {
                    length -= offset;
                }

                result.entries.push({ length: length, classification: classFromKind(kind) });
            }
        }

        function classFromKind(kind: TypeScript.SyntaxKind) {
            if (TypeScript.SyntaxFacts.isAnyKeyword(kind)) {
                return TokenClass.Keyword;
            }
            else if (TypeScript.SyntaxFacts.isBinaryExpressionOperatorToken(kind) ||
                TypeScript.SyntaxFacts.isPrefixUnaryExpressionOperatorToken(kind)) {
                return TokenClass.Operator;
            }
            else if (TypeScript.SyntaxFacts.isAnyPunctuation(kind)) {
                return TokenClass.Punctuation;
            }

            switch (kind) {
                case TypeScript.SyntaxKind.WhitespaceTrivia:
                    return TokenClass.Whitespace;
                case TypeScript.SyntaxKind.MultiLineCommentTrivia:
                case TypeScript.SyntaxKind.SingleLineCommentTrivia:
                    return TokenClass.Comment;
                case TypeScript.SyntaxKind.NumericLiteral:
                    return TokenClass.NumberLiteral;
                case TypeScript.SyntaxKind.StringLiteral:
                    return TokenClass.StringLiteral;
                case TypeScript.SyntaxKind.RegularExpressionLiteral:
                    return TokenClass.RegExpLiteral;
                case TypeScript.SyntaxKind.IdentifierName:
                default:
                    return TokenClass.Identifier;
            }
        }

        return {
            getClassificationsForLine: getClassificationsForLine
        };
    }
}