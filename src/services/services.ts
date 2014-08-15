/// <reference path="..\compiler\types.ts"/>
/// <reference path="..\compiler\core.ts"/>
/// <reference path="..\compiler\scanner.ts"/>
/// <reference path="..\compiler\parser.ts"/>
/// <reference path="..\compiler\checker.ts"/>

/// <reference path='syntax\incrementalParser.ts' />
/// <reference path='outliningElementsCollector.ts' />
/// <reference path='getScriptLexicalStructureWalker.ts' />
/// <reference path='braceMatcher.ts' />
/// <reference path='breakpoints.ts' />
/// <reference path='indentation.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='compiler\bloomFilter.ts' />

/// <reference path='core\references.ts' />
/// <reference path='resources\references.ts' />
/// <reference path='text\references.ts' />
/// <reference path='syntax\references.ts' />
/// <reference path='compiler\diagnostics.ts' />
/// <reference path='compiler\hashTable.ts' />
/// <reference path='compiler\ast.ts' />
/// <reference path='compiler\astWalker.ts' />
/// <reference path='compiler\astHelpers.ts' />
/// <reference path='compiler\types.ts' />
/// <reference path='compiler\pathUtils.ts' />

module ts {
    export interface Node {
        getSourceFile(): SourceFile;
        getChildCount(): number;
        getChildAt(index: number): Node;
        getChildren(): Node[];
        getStart(): number;
        getFullStart(): number;
        getEnd(): number;
        getWidth(): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(): number;
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
    }

    export interface SourceFile {
        getSourceUnit(): TypeScript.SourceUnitSyntax;
        getSyntaxTree(): TypeScript.SyntaxTree;
        getBloomFilter(): TypeScript.BloomFilter;
        getScriptSnapshot(): TypeScript.IScriptSnapshot;
        update(scriptSnapshot: TypeScript.IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TypeScript.TextChangeRange): SourceFile;
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

        public getStart(): number {
            return getTokenPosOfNode(this);
        }

        public getFullStart(): number {
            return this.pos;
        }

        public getEnd(): number {
            return this.end;
        }

        public getWidth(): number {
            return this.getEnd() - this.getStart();
        }

        public getFullWidth(): number {
            return this.end - this.getFullStart();
        }

        public getLeadingTriviaWidth(): number {
            return this.getStart() - this.pos;
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
        getProperty(propertyName: string): Symbol {
            return this.checker.getPropertyOfType(this, propertyName);
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

     var incrementalParse: IncrementalParse = TypeScript.IncrementalParser.parse;

    class SourceFileObject extends NodeObject implements SourceFile {
        public filename: string;
        public text: string;
        public getLineAndCharacterFromPosition(position: number): { line: number; character: number } { return null; }
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

        private bloomFilter: TypeScript.BloomFilter;
        private syntaxTree: TypeScript.SyntaxTree;
        private scriptSnapshot: TypeScript.IScriptSnapshot;

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

        public getBloomFilter(): TypeScript.BloomFilter {
            if (!this.bloomFilter) {
                var identifiers = TypeScript.createIntrinsicsObject<boolean>();
                var pre = function (cur: TypeScript.ISyntaxElement) {
                    if (TypeScript.ASTHelpers.isValidAstNode(cur)) {
                        if (cur.kind() === TypeScript.SyntaxKind.IdentifierName) {
                            var nodeText = TypeScript.tokenValueText((<TypeScript.ISyntaxToken>cur));

                            identifiers[nodeText] = true;
                        }
                    }
                };

                TypeScript.getAstWalkerFactory().simpleWalk(this.getSourceUnit(), pre, null, identifiers);

                var identifierCount = 0;
                for (var name in identifiers) {
                    if (identifiers[name]) {
                        identifierCount++;
                    }
                }

                this.bloomFilter = new TypeScript.BloomFilter(identifierCount);
                this.bloomFilter.addKeys(identifiers);
            }
            return this.bloomFilter;
        }

        public update(scriptSnapshot: TypeScript.IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TypeScript.TextChangeRange): SourceFile {
            // See if we are currently holding onto a syntax tree.  We may not be because we're 
            // either a closed file, or we've just been lazy and haven't had to create the syntax
            // tree yet.  Access the field instead of the method so we don't accidently realize
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
        getCompilationSettings(): CompilerOptions;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot;
        getLocalizedDiagnosticMessages(): any;
        getCancellationToken(): CancellationToken;
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

        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;

        getTypeAtPosition(fileName: string, position: number): TypeInfo;

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TypeScript.TextSpan;

        getBreakpointStatementAtPosition(fileName: string, position: number): TypeScript.TextSpan;

        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;
        getSignatureHelpCurrentArgumentState(fileName: string, position: number, applicableSpanStart: number): SignatureHelpState;

        getRenameInfo(fileName: string, position: number): RenameInfo;
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

    export class NavigationBarItem {
        constructor(public text: string,
                    public kind: string,
                    public kindModifiers: string,
                    public spans: TypeScript.TextSpan[],
                    public childItems: NavigationBarItem[] = null,
                    public indent = 0,
                    public bolded = false,
                    public grayed = false) {
        }
    }

    export class TodoCommentDescriptor {
        constructor(public text: string,
                    public priority: number) {
        }
    }

    export class TodoComment {
        constructor(public descriptor: TodoCommentDescriptor,
                    public message: string,
                    public position: number) {
        }
    }

    export class TextChange {
        constructor(public span: TypeScript.TextSpan, public newText: string) {
        }

        static createInsert(pos: number, newText: string): TextChange {
            return new TextChange(new TypeScript.TextSpan(pos, 0), newText);
        }
        static createDelete(start: number, end: number): TextChange {
            return new TextChange(TypeScript.TextSpan.fromBounds(start, end), "");
        }
        static createReplace(start: number, end: number, newText: string): TextChange {
            return new TextChange(TypeScript.TextSpan.fromBounds(start, end), newText);
        }
    }

    export class ReferenceEntry {
        public fileName: string = "";
        public textSpan: TypeScript.TextSpan;
        public isWriteAccess: boolean = false;

        constructor(fileName: string, textSpan: TypeScript.TextSpan, isWriteAccess: boolean) {
            this.fileName = fileName;
            this.textSpan = textSpan;
            this.isWriteAccess = isWriteAccess;
        }
    }

    export class NavigateToItem {
        constructor(public name: string,
                    public kind: string,
                    public kindModifiers: string,
                    public matchKind: string,
                    public fileName: string,
                    public textSpan: TypeScript.TextSpan,
                    public containerName: string,
                    public containerKind: string) {
        }
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

    export class DefinitionInfo {
        constructor(public fileName: string,
                    public textSpan: TypeScript.TextSpan,
                    public kind: string,
                    public name: string,
                    public containerKind: string,
                    public containerName: string) {
        }
    }

    export interface MemberName {
        prefix: string;
        suffix: string;
        text: string;
    }

    export class TypeInfo {
        constructor(
            public memberName: TypeScript.MemberName,
            public docComment: string,
            public fullSymbolName: string,
            public kind: string,
            public textSpan: TypeScript.TextSpan) {
        }
    }

    export class RenameInfo {
        constructor(public canRename: boolean,
                    public localizedErrorMessage: string,
                    public displayName: string,
                    public fullDisplayName: string,
                    public kind: string,
                    public kindModifiers: string,
                    public triggerSpan: TypeScript.TextSpan) {
        }

        public static CreateError(localizedErrorMessage: string) {
            return new RenameInfo(/*canRename:*/ false, localizedErrorMessage,
                                  /*displayName:*/ null, /*fullDisplayName:*/ null,
                                  /*kind:*/ null, /*kindModifiers:*/ null, /*triggerSpan:*/ null);
        }

        public static Create(displayName: string,
                             fullDisplayName: string,
                             kind: string,
                             kindModifiers: string,
                             triggerSpan: TypeScript.TextSpan) {
            return new RenameInfo(/*canRename:*/ true, /*localizedErrorMessage:*/ null, displayName, fullDisplayName, kind, kindModifiers, triggerSpan);
        }
    }

    export class SignatureHelpParameter {
        constructor(public name: string,
                    public documentation: string,
                    public display: string,
                    public isOptional: boolean) {
        }
    }

    /**
     * Represents a single signature to show in signature help.
     * The id is used for subsequent calls into the language service to ask questions about the
     * signature help item in the context of any documents that have been updated.  i.e. after
     * an edit has happened, while signature help is still active, the host can ask important 
     * questions like 'what parameter is the user currently contained within?'.
     */
    export class SignatureHelpItem {
        constructor(public isVariadic: boolean,
                    public prefix: string,
                    public suffix: string,
                    public separator: string,
                    public parameters: SignatureHelpParameter[],
                    public documentation: string) {
        }
    }

    /**
     * Represents a set of signature help items, and the preferred item that should be selected.
     */
    export class SignatureHelpItems {
        constructor(public items: SignatureHelpItem[],
                    public applicableSpan: TypeScript.TextSpan,
                    public selectedItemIndex: number) {
        }
    }

    export class SignatureHelpState {
        constructor(public argumentIndex: number,
                    public argumentCount: number) {
        }
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

    export interface DocumentRegistry {
        acquireDocument(
            filename: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: TypeScript.IScriptSnapshot,
            version: string,
            isOpen: boolean,
            referencedFiles: string[]): SourceFile;

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

    interface IncrementalParse {
        (oldSyntaxTree: TypeScript.SyntaxTree, textChangeRange: TypeScript.TextChangeRange, newText: TypeScript.ISimpleText): TypeScript.SyntaxTree
    }

    /// Language Service

    interface CompletionSession {
        filename: string;           // the file where the completion was requested
        position: number;           // position in the file where the completion was requested
        entries: CompletionEntry[]; // entries for this completion
        symbols: Map<Symbol>; // symbols by entry name map
        location: Node;          // the node where the completion was requested
        typeChecker: TypeChecker;// the typeChecker used to generate this completion
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

    class CancellationTokenObject {

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
        var typeChecker: TypeChecker;
        var useCaseSensitivefilenames = false;
        var sourceFilesByName: Map<SourceFile> = {};
        var documentRegistry = documentRegistry;
        var cancellationToken = new CancellationTokenObject(host.getCancellationToken());
        var activeCompletionSession: CompletionSession;         // The current active completion session, used to get the completion entry details

        // Check if the localized messages json is set, otherwise query the host for it
        if (!TypeScript.LocalizedDiagnosticMessages) {
            TypeScript.LocalizedDiagnosticMessages = host.getLocalizedDiagnosticMessages();
        }

        function getSourceFile(filename: string): SourceFile {
            return lookUp(sourceFilesByName, filename);
        }

        function createCompilerHost(): CompilerHost {
            return {
                getSourceFile: (filename, languageVersion) => {
                    var sourceFile = getSourceFile(filename);

                    Debug.assert(!!sourceFile, "sourceFile can not be undefined");

                    return sourceFile.getSourceFile();
                },
                getCancellationToken: () => cancellationToken,
                getCanonicalFileName: (filename) => useCaseSensitivefilenames ? filename : filename.toLowerCase(),
                useCaseSensitiveFileNames: () => useCaseSensitivefilenames,
                getNewLine: () => "\r\n",
                // Need something that doesn't depend on sys.ts here
                getDefaultLibFilename: (): string => {
                    throw Error("TOD:: getDefaultLibfilename");
                },
                writeFile: (filename, data, writeByteOrderMark) => {
                    throw Error("TODO: write file");
                },
                getCurrentDirectory: (): string => {
                    throw Error("TODO: getCurrentDirectory");
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
                    // open, but is now closed, we want to reparse entirely so we don't have any tokens that
                    // are holding onto expensive script snapshot instances on the host.  Similarly, if a 
                    // file was closed, then we always want to reparse.  This is so our tree doesn't keep 
                    // the old buffer alive that represented the file on disk (as the host has moved to a 
                    // new text buffer).
                    var textChangeRange: TypeScript.TextChangeRange = null;
                    if (sourceFile.isOpen && isOpen) {
                        textChangeRange = hostCache.getChangeRange(filename, sourceFile.version, sourceFile.getScriptSnapshot());
                    }

                    sourceFile = documentRegistry.updateDocument(sourceFile, filename, compilationSettings, scriptSnapshot, version, isOpen, textChangeRange);
                }
                else {
                    sourceFile = documentRegistry.acquireDocument(filename, compilationSettings, scriptSnapshot, version, isOpen, []);
                }

                // Remeber the new sourceFile
                sourceFilesByName[filename] = sourceFile;
            }

            // Now create a new compiler
            program = createProgram(hostfilenames, compilationSettings, createCompilerHost());
            typeChecker = program.getTypeChecker();
        }

        /// Clean up any semantic caches that are not needed. 
        /// The host can call this method if it wants to jettison unused memory.
        /// We will just dump the typeChecker and recreate a new one. this should have the effect of destroying all the semantic caches.
        function cleanupSemanticCache(): void {
            if (program) {
                typeChecker = program.getTypeChecker();
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

        function getSemanticDiagnostics(filename: string) {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename)

            return typeChecker.getDiagnostics(getSourceFile(filename).getSourceFile());
        }

        function getCompilerOptionsDiagnostics() {
            synchronizeHostData();
            return program.getGlobalDiagnostics();
        }

        /// Completion
        function getValidCompletionEntryDisplayName(displayName: string, target: ScriptTarget): string {
            if (displayName && displayName.length > 0) {
                var firstChar = displayName.charCodeAt(0);
                if (firstChar === TypeScript.CharacterCodes.singleQuote || firstChar === TypeScript.CharacterCodes.doubleQuote) {
                    // If the user entered name for the symbol was quoted, removing the quotes is not enough, as the name could be an
                    // invalid identifer name. We need to check if whatever was inside the quotes is actually a valid identifier name.
                    displayName = TypeScript.stripStartAndEndQuotes(displayName);
                }

                if (TypeScript.Scanner.isValidIdentifier(TypeScript.SimpleText.fromString(displayName), target)) {
                    return displayName;
                }
            }

            return undefined;
        }

        function createCompletionEntry(symbol: Symbol): CompletionEntry {
            // Try to get a valid display name for this symbol, if we could not find one, then ignore it. 
            // We would like to only show things that can be added after a dot, so for instance numeric properties can
            // not be accessed with a dot (a.1 <- invalid)
            var displayName = getValidCompletionEntryDisplayName(symbol.getName(), program.getCompilerOptions().target);
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
            function getCompletionEntriesFromSymbols(symbols: Symbol[], session: CompletionSession): void {
                forEach(symbols, (symbol) => {
                    var entry = createCompletionEntry(symbol);
                    if (entry) {
                        session.entries.push(entry);
                        session.symbols[entry.name] = symbol;
                    }
                });
            }

            function isCompletionListBlocker(sourceUnit: TypeScript.SourceUnitSyntax, position: number): boolean {
                // We shouldn't be getting a possition that is outside the file because
                // isEntirelyInsideComment can't handle when the position is out of bounds, 
                // callers should be fixed, however we should be resiliant to bad inputs
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
                    // EndOfFile token is not intresting, get the one before it
                    positionedToken = TypeScript. previousToken(positionedToken, /*includeSkippedTokens*/true);
                }

                if (positionedToken && position === TypeScript.end(positionedToken) && positionedToken.kind() === TypeScript.SyntaxKind.IdentifierName) {
                    // The caret is at the end of an identifier, the decession to provide completion depends on the previous token
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
            var mappedNode = getNodeAtPosition(sourceFile.getSourceFile(), TypeScript.end(node) - 1);

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
                var type: Type = typeChecker.getTypeOfExpression(mappedNode);
                if (!type) {
                    return undefined;
                }

                var symbols = type.getApparentProperties();
                isMemberCompletion = true;
                getCompletionEntriesFromSymbols(symbols, activeCompletionSession);
            }
            else {
                var containingObjectLiteral = getContainingObjectLiteralApplicableForCompletion(sourceFile.getSyntaxTree().sourceUnit(), position);

                // Object literal expression, look up possible property names from contextual type
                if (containingObjectLiteral) {
                    var searchPosition = Math.min(position, TypeScript.end(containingObjectLiteral));
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
                    //        symbols: filterContextualMembersList(contextualMembers.symbols, existingMembers, filename, position),
                    //        enclosingScopeSymbol: contextualMembers.enclosingScopeSymbol
                    //    }, entries);
                    //}
                }
                // Get scope memebers
                else {
                    isMemberCompletion = false;
                    /// TODO filter meaning based on the current context
                    var symbolMeanings = SymbolFlags.Type | SymbolFlags.Value | SymbolFlags.Namespace;
                    var symbols = typeChecker.getSymbolsInScope(mappedNode, symbolMeanings);

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

        function getCompletionEntryDetails(filename: string, position: number, entryName: string) {
            // Note: No need to call synchronizeHostData, as we have captured all the data we need
            //       in the getCompletionsAtPosition erlier
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

        function getNodeAtPosition(sourceFile: SourceFile, position: number) {
            var current: Node = sourceFile;
            outer: while (true) {
                // find the child that has this
                for (var i = 0, n = current.getChildCount(); i < n; i++) {
                    var child = current.getChildAt(i);
                    if (child.getStart() <= position && position < child.getEnd()) {
                        current = child;
                        continue outer;
                    }
                    if (child.end > position) break;
                }
                return current;
            }
        }

        function getContainerNode(node: Node): Node {
            while (true) {
                node = node.parent;
                if (!node) {
                    return node;
                }
                switch (node.kind) {
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

        function getSymbolKind(symbol: Symbol): string {
            var flags = symbol.getFlags();

            if (flags & SymbolFlags.Module) return ScriptElementKind.moduleElement;
            if (flags & SymbolFlags.Class) return ScriptElementKind.classElement;
            if (flags & SymbolFlags.Interface) return ScriptElementKind.interfaceElement;
            if (flags & SymbolFlags.Enum) return ScriptElementKind.enumElement;
            if (flags & SymbolFlags.Variable) return ScriptElementKind.variableElement;
            if (flags & SymbolFlags.Function) return ScriptElementKind.functionElement;
            if (flags & SymbolFlags.GetAccessor) return ScriptElementKind.memberGetAccessorElement;
            if (flags & SymbolFlags.SetAccessor) return ScriptElementKind.memberSetAccessorElement;
            if (flags & SymbolFlags.Method) return ScriptElementKind.memberFunctionElement;
            if (flags & SymbolFlags.Property) return ScriptElementKind.memberVariableElement;
            if (flags & SymbolFlags.IndexSignature) return ScriptElementKind.indexSignatureElement;
            if (flags & SymbolFlags.ConstructSignature) return ScriptElementKind.constructSignatureElement;
            if (flags & SymbolFlags.CallSignature) return ScriptElementKind.callSignatureElement;
            if (flags & SymbolFlags.Constructor) return ScriptElementKind.constructorImplementationElement;
            if (flags & SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
            if (flags & SymbolFlags.EnumMember) return ScriptElementKind.variableElement;

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

        function getNodeModifiers(node: Node): string {
            var flags = node.flags;
            var result: string[] = [];

            if (flags & NodeFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
            if (flags & NodeFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
            if (flags & NodeFlags.Static) result.push(ScriptElementKindModifier.staticModifier);
            if (flags & NodeFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
            if (isInAmbientContext(node)) result.push(ScriptElementKindModifier.ambientModifier);

            return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
        }

        /// QuickInfo
        function getTypeAtPosition(fileName: string, position: number): TypeInfo {
            synchronizeHostData();

            fileName = TypeScript.switchToForwardSlashes(fileName);
            var sourceFile = getSourceFile(fileName);
            var node = getNodeAtPosition(sourceFile.getSourceFile(), position);
            if (!node) return undefined;

            var symbol = typeChecker.getSymbolInfo(node);
            var type = symbol && typeChecker.getTypeOfSymbol(symbol);
            if (type) {
                return new TypeInfo(
                    new TypeScript.MemberNameString(typeChecker.typeToString(type)),
                    "", typeChecker.symbolToString(symbol, getContainerNode(node)),
                    getSymbolKind(symbol), TypeScript.TextSpan.fromBounds(node.pos, node.end));
            }

            return undefined;
        }

        /// Goto definition
        function getDefinitionAtPosition(filename: string, position: number): DefinitionInfo[]{
            function getTargetLabel(node: Node, labelName: string): Identifier {
                while (node) {
                    if (node.kind === SyntaxKind.LabelledStatement && (<LabelledStatement>node).label.text === labelName) {
                        return (<LabelledStatement>node).label;
                    }
                    node = node.parent;
                }
                return undefined;
            }

            function isJumpStatementTarget(node: Node): boolean {
                return node.kind === SyntaxKind.Identifier &&
                    (node.parent.kind === SyntaxKind.BreakStatement || node.parent.kind === SyntaxKind.ContinueStatement) &&
                    (<BreakOrContinueStatement>node.parent).label === node;
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

            function isFunctionDeclaration(node: Node): boolean {
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.Method:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.ArrowFunction:
                        return true;
                }
                return false;
            }

            function isNameOfFunctionDeclaration(node: Node): boolean {
                return node.kind === SyntaxKind.Identifier &&
                    isFunctionDeclaration(node.parent) && (<FunctionDeclaration>node.parent).name === node;
            }

            function getDefinitionInfo(node: Node, symbolKind: string, symbolName: string, containerName: string): DefinitionInfo {
                return new DefinitionInfo(
                    node.getSourceFile().filename,
                    TypeScript.TextSpan.fromBounds(node.getStart(), node.getEnd()),
                    symbolKind,
                    symbolName,
                    undefined,
                    containerName);
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

            var node = getNodeAtPosition(sourceFile.getSourceFile(), position);
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
            var comment = forEach(sourceFile.getSourceFile().referencedFiles, r => (r.pos <= position && position < r.end) ? r : undefined);
            if (comment) {
                var targetFilename = normalizePath(combinePaths(getDirectoryPath(filename), comment.filename));
                if (program.getSourceFile(targetFilename)) {
                    return [new DefinitionInfo(
                        targetFilename, TypeScript.TextSpan.fromBounds(0, 0),
                        ScriptElementKind.scriptElement,
                        comment.filename, undefined, undefined)];
                }
                return undefined;
            }

            var symbol = typeChecker.getSymbolInfo(node);

            // Could not find a symbol e.g. node is string or number keyword,
            // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
            if (!symbol || !(symbol.getDeclarations())) {
                return undefined;
            }

            var result: DefinitionInfo[] = [];

            var declarations = symbol.getDeclarations();
            var symbolName = typeChecker.symbolToString(symbol, node);
            var symbolKind = getSymbolKind(symbol);
            var containerSymbol = symbol.parent;
            var containerName = containerSymbol ? typeChecker.symbolToString(containerSymbol, node) : "";
            var containerKind = containerSymbol ? getSymbolKind(symbol) : "";

            if (!tryAddConstructSignature(symbol, node, symbolKind, symbolName, containerName, result) &&
                !tryAddCallSignature(symbol, node, symbolKind, symbolName, containerName, result)) {
                // Just add all the declarations. 
                forEach(declarations, declaration => {
                    result.push(getDefinitionInfo(declaration, symbolKind, symbolName, containerName));
                });
            }

            return result;
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

        function getNavigationBarItems(filename: string) {
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = getSyntaxTree(filename);
            return new TypeScript.Services.NavigationBarItemGetter().getItems(syntaxTree.sourceUnit());
        }

        function getOutliningSpans(filename: string): OutliningSpan[] {
            // doesn't use compiler - no need to synchronize with host
            filename = TypeScript.switchToForwardSlashes(filename);
            var sourceFile = getCurrentSourceFile(filename);
            return OutliningElementsCollector.collectElements(sourceFile);
        }

        function getBraceMatchingAtPosition(filename: string, position: number) {
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = getSyntaxTree(filename);
            return TypeScript.Services.BraceMatcher.getMatchSpans(syntaxTree, position);
        }

        function getIndentationAtPosition(filename: string, position: number, editorOptions: EditorOptions) {
            filename = TypeScript.switchToForwardSlashes(filename);

            var syntaxTree = getSyntaxTree(filename);

            var scriptSnapshot = syntaxTreeCache.getCurrentScriptSnapshot(filename);
            var scriptText = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(scriptText);
            var options = new TypeScript.FormattingOptions(!editorOptions.ConvertTabsToSpaces, editorOptions.TabSize, editorOptions.IndentSize, editorOptions.NewLineCharacter)

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

        function getTodoCommentsRegExp(descriptors: TodoCommentDescriptor[]): RegExp {
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
            var literals = "(?:" + descriptors.map(d => "(" + this.escapeRegExp(d.text) + ")").join("|") + ")";

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
            //  'm' is so we can find matches in a multiline input.
            return new RegExp(regExpString, "gim");
        }

        function getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var syntaxTree = this.compiler.getDocument(fileName).syntaxTree();
            this.cancellationToken.throwIfCancellationRequested();

            var text = syntaxTree.text;
            var fileContents = text.substr(0, text.length());
            this.cancellationToken.throwIfCancellationRequested();

            var result: TodoComment[] = [];

            if (descriptors.length > 0) {
                var regExp = this.getTodoCommentsRegExp(descriptors);

                var matchArray: RegExpExecArray;
                while (matchArray = regExp.exec(fileContents)) {
                    this.cancellationToken.throwIfCancellationRequested();

                    // If we got a match, here is what the match array will look like.  Say the source text is:
                    //
                    //      "    // hack   1"
                    //
                    // The result array with the regexp:    will be:
                    //
                    //      ["// hack   1", "// ", "hack   1", undefined, "hack"]
                    //
                    // Here are the relevant capture groups:
                    //  0) The full match for hte entire regex.
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

                    // Ok, we have found a match in the file.  This is ony an acceptable match if
                    // it is contained within a comment.
                    var token = TypeScript.findToken(syntaxTree.sourceUnit(), matchPosition);

                    if (matchPosition >= TypeScript.start(token) && matchPosition < TypeScript.end(token)) {
                        // match was within the token itself.  Not in the comment.  Keep searching
                        // descriptor.
                        continue;
                    }

                    // Looks to be within the trivia.  See if we can find hte comment containing it.
                    var triviaList = matchPosition < TypeScript.start(token) ? token.leadingTrivia(syntaxTree.text) : token.trailingTrivia(syntaxTree.text);
                    var trivia = this.findContainingComment(triviaList, matchPosition);
                    if (trivia === null) {
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
                    if (this.isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                        continue;
                    }

                    var message = matchArray[2];
                    result.push(new TodoComment(descriptor, message, matchPosition));
                }
            }

            return result;
        }

        function findContainingComment(triviaList: TypeScript.ISyntaxTriviaList, position: number): TypeScript.ISyntaxTrivia {
            for (var i = 0, n = triviaList.count(); i < n; i++) {
                var trivia = triviaList.syntaxTriviaAt(i);
                var fullEnd = trivia.fullStart() + trivia.fullWidth();
                if (trivia.isComment() && trivia.fullStart() <= position && position < fullEnd) {
                    return trivia;
                }
            }

            return null;
        }

        return {
            dispose: dispose,
            cleanupSemanticCache: cleanupSemanticCache,
            getSyntacticDiagnostics: getSyntacticDiagnostics,
            getSemanticDiagnostics: getSemanticDiagnostics,
            getCompilerOptionsDiagnostics: getCompilerOptionsDiagnostics,
            getCompletionsAtPosition: getCompletionsAtPosition,
            getCompletionEntryDetails: getCompletionEntryDetails,
            getTypeAtPosition: getTypeAtPosition,
            getSignatureHelpItems: (filename, position): SignatureHelpItems => null,
            getSignatureHelpCurrentArgumentState: (fileName, position, applicableSpanStart): SignatureHelpState => null,
            getDefinitionAtPosition: getDefinitionAtPosition,
            getReferencesAtPosition: (filename, position) => [],
            getOccurrencesAtPosition: (filename, position) => [],
            getImplementorsAtPosition: (filename, position) => [],
            getNameOrDottedNameSpan: getNameOrDottedNameSpan,
            getBreakpointStatementAtPosition: getBreakpointStatementAtPosition,
            getNavigateToItems: (searchValue) => [],
            getRenameInfo: (fileName, position): RenameInfo => null,
            getNavigationBarItems: getNavigationBarItems,
            getOutliningSpans: getOutliningSpans,
            getTodoComments: getTodoComments,
            getBraceMatchingAtPosition: getBraceMatchingAtPosition,
            getIndentationAtPosition: getIndentationAtPosition,
            getFormattingEditsForRange: getFormattingEditsForRange,
            getFormattingEditsForDocument: getFormattingEditsForDocument,
            getFormattingEditsAfterKeystroke: getFormattingEditsAfterKeystroke,
            getEmitOutput: (filename): EmitOutput => null,
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

            var result: ClassificationResult = {
                finalLexState: EndOfLineState.Start,
                entries: []
            };

            var simpleText = TypeScript.SimpleText.fromString(text);
            scanner = TypeScript.Scanner.createScanner(ScriptTarget.ES5, simpleText, reportDiagnostic);

            var lastTokenKind = TypeScript.SyntaxKind.None;
            var token: TypeScript.ISyntaxToken = null;
            do {
                lastDiagnosticKey = null;

                token = scanner.scan(!noRegexTable[lastTokenKind]);
                lastTokenKind = token.kind();

                processToken(text, simpleText, offset, token, result);
            }
            while (token.kind() !== TypeScript.SyntaxKind.EndOfFileToken);

            lastDiagnosticKey = null;
            return result;
        }

        function processToken(text: string, simpleText: TypeScript.ISimpleText, offset: number, token: TypeScript.ISyntaxToken, result: ClassificationResult): void {
            processTriviaList(text, offset, token.leadingTrivia(simpleText), result);
            addResult(text, offset, result, TypeScript.width(token), token.kind());
            processTriviaList(text, offset, token.trailingTrivia(simpleText), result);

            if (TypeScript.fullEnd(token) >= text.length) {
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
