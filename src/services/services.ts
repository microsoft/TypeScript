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
        EndingWithDotToken,
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

    /// Helpers
    function getTargetLabel(referenceNode: Node, labelName: string): Identifier {
        while (referenceNode) {
            if (referenceNode.kind === SyntaxKind.LabelledStatement && (<LabelledStatement>referenceNode).label.text === labelName) {
                return (<LabelledStatement>referenceNode).label;
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
            node.parent.kind === SyntaxKind.LabelledStatement &&
            (<LabelledStatement>node.parent).label === node;
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

    /// Returns true if node is a name of an object literal property, e.g. "a" in x = { "a": 1 }
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

    enum SearchMeaning {
        Value = 0x1,
        Type = 0x2,
        Namespace = 0x4
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
        // the sole purpose of this checkes is to reutrn semantic diagnostics
        // creation is deferred - use getFullTypeCheckChecker to get instance
        var fullTypeCheckChecker_doNotAccessDirectly: TypeChecker;
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
                    sourceFile = documentRegistry.acquireDocument(filename, compilationSettings, scriptSnapshot, version, isOpen);
                }

                // Remeber the new sourceFile
                sourceFilesByName[filename] = sourceFile;
            }

            // Now create a new compiler
            program = createProgram(hostfilenames, compilationSettings, createCompilerHost());
            typeInfoResolver = program.getTypeChecker(/*fullTypeCheckMode*/ false);
            fullTypeCheckChecker_doNotAccessDirectly = undefined;
        }

        /// Clean up any semantic caches that are not needed. 
        /// The host can call this method if it wants to jettison unused memory.
        /// We will just dump the typeChecker and recreate a new one. this should have the effect of destroying all the semantic caches.
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

        function getSemanticDiagnostics(filename: string) {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename)

            return getFullTypeCheckChecker().getDiagnostics(getSourceFile(filename));
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

            function isToken(kind: SyntaxKind) {
                return (SyntaxKind.FirstPunctuation <= kind && kind <= SyntaxKind.LastPunctuation);
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
            var mappedNode = getNodeAtPosition(sourceFile, TypeScript.end(node) - 1);
            if (isToken(mappedNode.kind)) {
                mappedNode = mappedNode.parent;
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
                var type = typeInfoResolver.getTypeOfNode(mappedNode);
                var apparentType: ApparentType = type && typeInfoResolver.getApparentType(type);
                if (!apparentType) {
                    return undefined;
                }

                var symbols = apparentType.getApparentProperties();
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
                    fullSymbolName: typeInfoResolver.symbolToString(symbol, session.location),
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
                    if (child.end > position) {
                        break;
                    }
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

        function getSymbolKind(symbol: Symbol): string {
            var flags = typeInfoResolver.getRootSymbol(symbol).getFlags();

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
            var node = getNodeAtPosition(sourceFile, position);
            if (!node) {
                return undefined;
            }

            var symbol = typeInfoResolver.getSymbolInfo(node);
            var type = symbol && typeInfoResolver.getTypeOfSymbol(symbol);
            if (type) {
                return new TypeInfo(
                    new TypeScript.MemberNameString(typeInfoResolver.typeToString(type)),
                    "", typeInfoResolver.symbolToString(symbol, getContainerNode(node)),
                    getSymbolKind(symbol), TypeScript.TextSpan.fromBounds(node.pos, node.end));
            }

            return undefined;
        }

        /// Goto definition
        function getDefinitionAtPosition(filename: string, position: number): DefinitionInfo[]{
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

            var node = getNodeAtPosition(sourceFile, position);
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
                var targetFilename = normalizePath(combinePaths(getDirectoryPath(filename), comment.filename));
                if (program.getSourceFile(targetFilename)) {
                    return [new DefinitionInfo(
                        targetFilename, TypeScript.TextSpan.fromBounds(0, 0),
                        ScriptElementKind.scriptElement,
                        comment.filename, undefined, undefined)];
                }
                return undefined;
            }

            var symbol = typeInfoResolver.getSymbolInfo(node);

            // Could not find a symbol e.g. node is string or number keyword,
            // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
            if (!symbol || !(symbol.getDeclarations())) {
                return undefined;
            }

            var result: DefinitionInfo[] = [];

            var declarations = symbol.getDeclarations();
            var symbolName = typeInfoResolver.symbolToString(symbol, node);
            var symbolKind = getSymbolKind(symbol);
            var containerSymbol = symbol.parent;
            var containerName = containerSymbol ? typeInfoResolver.symbolToString(containerSymbol, node) : "";
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

        function getOccurrencesAtPosition(filename: string, position: number): ReferenceEntry[] {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);
            var sourceFile = getSourceFile(filename);

            var node = getNodeAtPosition(sourceFile, position);
            if (!node) {
                return undefined;
            }

            if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ThisKeyword || node.kind === SyntaxKind.SuperKeyword ||
                isLiteralNameOfPropertyDeclarationOrIndexAccess(node) || isNameOfExternalModuleImportOrDeclaration(node)) {
                return getReferencesForNode(node, [sourceFile]);
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
                    if (hasKind(node.parent, SyntaxKind.BreakStatement)) {
                        return getBreakStatementOccurences(<BreakOrContinueStatement>node.parent);
                    }
                    break;
                case SyntaxKind.ConstructorKeyword:
                    if (hasKind(node.parent, SyntaxKind.Constructor)) {
                        return getConstructorOccurrences(<ConstructorDeclaration>node.parent);
                    }
                    break;
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
                            result.push(new ReferenceEntry(filename, TypeScript.TextSpan.fromBounds(elseKeyword.getStart(), ifKeyword.end), /* isWriteAccess */ false));
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
                forEachReturnStatement(<Block>(<FunctionDeclaration>func).body, returnStatement => {
                    pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
                });

                return map(keywords, getReferenceEntryFromNode);
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

            function getSwitchCaseDefaultOccurrences(switchStatement: SwitchStatement) {
                var keywords: Node[] = [];

                pushKeywordIf(keywords, switchStatement.getFirstToken(), SyntaxKind.SwitchKeyword);

                // Go through each clause in the switch statement, collecting the clause keywords.
                forEach(switchStatement.clauses, clause => {
                    pushKeywordIf(keywords, clause.getFirstToken(), SyntaxKind.CaseKeyword, SyntaxKind.DefaultKeyword);

                    // For each clause, also recursively traverse the statements where we can find analogous breaks.
                    forEachChild(clause, function aggregateBreakKeywords(node: Node): void {
                        switch (node.kind) {
                            case SyntaxKind.BreakStatement:
                                // If the break statement has a label, it cannot be part of a switch block.
                                if (!(<BreakOrContinueStatement>node).label) {
                                    pushKeywordIf(keywords, node.getFirstToken(), SyntaxKind.BreakKeyword);
                                }
                            // Fall through
                            case SyntaxKind.ForStatement:
                            case SyntaxKind.ForInStatement:
                            case SyntaxKind.DoStatement:
                            case SyntaxKind.WhileStatement:
                            case SyntaxKind.SwitchStatement:
                                return;
                        }

                        // Do not cross function boundaries.
                        if (!isAnyFunction(node)) {
                            forEachChild(node, aggregateBreakKeywords);
                        }
                    });
                });

                return map(keywords, getReferenceEntryFromNode);
            }

            function getBreakStatementOccurences(breakStatement: BreakOrContinueStatement): ReferenceEntry[] {
                // TODO (drosen): Deal with labeled statements.
                if (breakStatement.label) {
                    return undefined;
                }
                
                for (var owner = node.parent; owner; owner = owner.parent) {
                    switch (owner.kind) {
                        case SyntaxKind.ForStatement:
                        case SyntaxKind.ForInStatement:
                        case SyntaxKind.DoStatement:
                        case SyntaxKind.WhileStatement:
                            // TODO (drosen): Handle loops!
                            return undefined;

                        case SyntaxKind.SwitchStatement:
                            return getSwitchCaseDefaultOccurrences(<SwitchStatement>owner);

                        default:
                            if (isAnyFunction(owner)) {
                                return undefined;
                            }
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

            // returns true if 'node' is defined and has a matching 'kind'.
            function hasKind(node: Node, kind: SyntaxKind) {
                return !!(node && node.kind === kind);
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

        function getReferencesAtPosition(filename: string, position: number): ReferenceEntry[] {
            synchronizeHostData();

            filename = TypeScript.switchToForwardSlashes(filename);
            var sourceFile = getSourceFile(filename);

            var node = getNodeAtPosition(sourceFile, position);
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

            return getReferencesForNode(node, program.getSourceFiles());
        }

        function getReferencesForNode(node: Node, sourceFiles : SourceFile[]): ReferenceEntry[] {
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
                // Even if we did not find a symbol, we have an identifer, so there is at least
                // one reference that we know of. return that instead of undefined.
                return [getReferenceEntryFromNode(node)];
            }

            // the symbol was an internal symbol and does not have a declaration e.g.undefined symbol
            if (!symbol.getDeclarations()) {
                return undefined;
            }

            var result: ReferenceEntry[];

            // Compute the meaning from the location and the symbol it references
            var searchMeaning = getIntersectingMeaningFromDeclarations(getMeaningFromLocation(node), symbol.getDeclarations());

            // Get the text to search for, we need to normalize it as external module names will have quote
            var symbolName = getNormalizedSymbolName(symbol);                

            var scope = getSymbolScope(symbol);

            if (scope) {
                result = [];
                getReferencesInNode(scope, symbol, symbolName, node, searchMeaning, result);
            }
            else {
                forEach(sourceFiles, sourceFile => {
                    cancellationToken.throwIfCancellationRequested();

                    if (lookUp(sourceFile.identifiers, symbolName)) {
                        result = result || [];
                        getReferencesInNode(sourceFile, symbol, symbolName, node, searchMeaning, result);
                    }
                });
            }

            return result;

            function getNormalizedSymbolName(symbol: Symbol): string {
                // Special case for function expressions, whose names are solely local to their bodies.
                var functionExpression = getDeclarationOfKind(symbol, SyntaxKind.FunctionExpression);

                if (functionExpression && functionExpression.name) {
                    var name = functionExpression.name.text;
                }
                else {
                    var name = symbol.name;
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

                    var node = getNodeAtPosition(sourceFile, position);
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

            /// Search within node "container" for references for a search value, where the search value is defined as a 
            /// tuple of(searchSymbol, searchText, searchLocation, and searchMeaning).
            /// searchLocation: a node where the search value 
            function getReferencesInNode(container: Node, searchSymbol: Symbol, searchText: string, searchLocation: Node, searchMeaning: SearchMeaning, result: ReferenceEntry[]): void {
                var sourceFile = container.getSourceFile();

                var possiblePositions = getPossibleSymbolReferencePositions(sourceFile, searchText, container.getStart(), container.getEnd());

                if (possiblePositions.length) {
                    // Build the set of symbols to search for, initially it has only the current symbol
                    var searchSymbols = populateSearchSymbolSet(searchSymbol, searchLocation);

                    forEach(possiblePositions, position => {
                        cancellationToken.throwIfCancellationRequested();

                        var referenceLocation = getNodeAtPosition(sourceFile, position);
                        if (!isValidReferencePosition(referenceLocation, searchText)) {
                            return;
                        }

                        if (!(getMeaningFromLocation(referenceLocation) & searchMeaning)) {
                            return;
                        }

                        var referenceSymbol = typeInfoResolver.getSymbolInfo(referenceLocation);

                        // Could not find a symbol e.g. node is string or number keyword,
                        // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
                        if (!referenceSymbol || !(referenceSymbol.getDeclarations())) {
                            return;
                        }

                        if (isRelatableToSearchSet(searchSymbols, referenceSymbol, referenceLocation)) {
                            result.push(getReferenceEntryFromNode(referenceLocation));
                        }
                    });
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

                    var node = getNodeAtPosition(sourceFile, position);

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

                        var node = getNodeAtPosition(sourceFile, position);
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

                // If the symbol is an instantiation from a another symbol (e.g. widened symbol) , add the root the list
                var rootSymbol = typeInfoResolver.getRootSymbol(symbol);
                if (rootSymbol && rootSymbol !== symbol) {
                    result.push(rootSymbol);
                }

                // If the location is in a context sensitive location (i.e. in an object literal) try
                // to get a contextual type for it, and add the property symbol from the contextual
                // type to the search set
                if (isNameOfPropertyAssignment(location)) {
                    var symbolFromContextualType = getPropertySymbolFromContextualType(location);
                    if (symbolFromContextualType) result.push(typeInfoResolver.getRootSymbol(symbolFromContextualType));
                }

                // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
                if (symbol.parent && symbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    getPropertySymbolsFromBaseTypes(symbol.parent, symbol.getName(), result);
                }

                return result;
            }

            function getPropertySymbolsFromBaseTypes(symbol: Symbol, propertyName: string, result: Symbol[]): void {
                if (symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
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
                        // TODO: move to getTypeOfNode instead
                        var typeReferenceSymbol = typeInfoResolver.getSymbolInfo(typeReference.typeName);
                        if (typeReferenceSymbol) {
                            var propertySymbol = typeReferenceSymbol.members[propertyName];
                            if (propertySymbol) result.push(typeReferenceSymbol.members[propertyName]);

                            // Visit the typeReference as well to see if it directelly or indirectelly use that property
                            getPropertySymbolsFromBaseTypes(typeReferenceSymbol, propertyName, result);
                        }
                    }
                }
            }

            function isRelatableToSearchSet(searchSymbols: Symbol[], referenceSymbol: Symbol, referenceLocation: Node): boolean {
                // Unwrap symbols to get to the root (e.g. triansient symbols as a result of widenning)
                var referenceSymbolTarget = typeInfoResolver.getRootSymbol(referenceSymbol);

                // if it is in the list, then we are done
                if (searchSymbols.indexOf(referenceSymbolTarget) >= 0) {
                    return true;
                }

                // If the reference location is in an object literal, try to get the contextual type for the 
                // object literal, lookup the property symbol in the contextual type, and use this symbol to
                // compare to our searchSymbol
                if (isNameOfPropertyAssignment(referenceLocation)) {
                    var symbolFromContextualType = getPropertySymbolFromContextualType(referenceLocation);
                    if (symbolFromContextualType && searchSymbols.indexOf(typeInfoResolver.getRootSymbol(symbolFromContextualType)) >= 0) {
                        return true;
                    }
                }

                // Finally, try all properties with the same name in any type the containing type extened or implemented, and 
                // see if any is in the list
                if (referenceSymbol.parent && referenceSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    var result: Symbol[] = [];
                    getPropertySymbolsFromBaseTypes(referenceSymbol.parent, referenceSymbol.getName(), result);
                    return forEach(result, s => searchSymbols.indexOf(s) >= 0);
                }

                return false;
            }

            function getPropertySymbolFromContextualType(node: Node): Symbol {
                if (isNameOfPropertyAssignment(node)) {
                    var objectLiteral = node.parent.parent;
                    var contextualType = typeInfoResolver.getContextualType(objectLiteral);
                    if (contextualType) {
                        return typeInfoResolver.getPropertyOfType(contextualType, (<Identifier>node).text);
                    }
                }
                return undefined;
            }

            function getMeaningFromDeclaration(node: Declaration): SearchMeaning {
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
                        return SearchMeaning.Value;

                    case SyntaxKind.TypeParameter:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.TypeLiteral:
                        return SearchMeaning.Type;

                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                        return SearchMeaning.Value | SearchMeaning.Type;

                    case SyntaxKind.ModuleDeclaration:
                        if ((<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral) {
                            return SearchMeaning.Namespace | SearchMeaning.Value;
                        }
                        else if (isInstantiated(node)) {
                            return SearchMeaning.Namespace | SearchMeaning.Value;
                        }
                        else {
                            return SearchMeaning.Namespace;
                        }
                        break;

                    case SyntaxKind.ImportDeclaration:
                        return SearchMeaning.Value | SearchMeaning.Type | SearchMeaning.Namespace;
                }
                Debug.fail("Unkown declaration type");
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
                    return SearchMeaning.Value | SearchMeaning.Type | SearchMeaning.Namespace;
                }
                return SearchMeaning.Namespace;
            }

            function getMeaningFromLocation(node: Node): SearchMeaning {
                if (node.parent.kind === SyntaxKind.ExportAssignment) {
                    return SearchMeaning.Value | SearchMeaning.Type | SearchMeaning.Namespace;
                }
                else if (isInRightSideOfImport(node)) {
                    return getMeaningFromRightHandSideOfImport(node);
                }
                else if (isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                    return getMeaningFromDeclaration(node.parent);
                }
                else if (isTypeReference(node)) {
                    return SearchMeaning.Type;
                }
                else if (isNamespaceReference(node)) {
                    return SearchMeaning.Namespace;
                }
                else {
                    return SearchMeaning.Value;
                }
            }

            /// Given an initial searchMeaning, extracted from a location, widen the search scope based on the declarations
            /// of the corresponding symbol. e.g. if we are searching for "Foo" in value position, but "Foo" references a class
            /// then we need to widen the search to include type positions as well.
            /// On the contrary, if we are searching for "Bar" in type position and we trace bar to an interface, and an uninstantiated
            /// module, we want to keep the search limited to only types, as the two declarations (interface and uninstantiated module)
            /// do not intersect in any of the three spaces.
            function getIntersectingMeaningFromDeclarations(meaning: SearchMeaning, declarations: Declaration[]): SearchMeaning {
                if (declarations) {
                    do {
                        // The result is order-sensitive, for instance if initialMeaning === Namespace, and declarations = [class, instantiated module]
                        // we need to consider both as they initialMeaning intersects with the module in the namespace space, and the module
                        // intersects with the class in the value space.
                        // To achieve that we will keep iterating until the result stabilizes.

                        // Remeber the last meaning
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

            return new ReferenceEntry(node.getSourceFile().filename, TypeScript.TextSpan.fromBounds(start, end), isWriteAccess(node));
        }

        /// A node is considedered a writeAccess iff it is a name of a declaration or a target of an assignment
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

        function escapeRegExp(str: string): string {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
            var literals = "(?:" + descriptors.map(d => "(" + escapeRegExp(d.text) + ")").join("|") + ")";

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

            var sourceFile = getCurrentSourceFile(fileName);
            var syntaxTree = sourceFile.getSyntaxTree();
            cancellationToken.throwIfCancellationRequested();

            var text = syntaxTree.text;
            var fileContents = text.substr(0, text.length());
            cancellationToken.throwIfCancellationRequested();

            var result: TodoComment[] = [];

            if (descriptors.length > 0) {
                var regExp = getTodoCommentsRegExp(descriptors);

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
                    //  0) The full match for the entire regex.
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
                    var trivia = findContainingComment(triviaList, matchPosition);
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
                    if (isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                        continue;
                    }

                    var message = matchArray[2];
                    result.push(new TodoComment(descriptor, message, matchPosition));
                }
            }

            return result;
        }

        function isLetterOrDigit(char: number): boolean {
            return (char >= TypeScript.CharacterCodes.a && char <= TypeScript.CharacterCodes.z) ||
                (char >= TypeScript.CharacterCodes.A && char <= TypeScript.CharacterCodes.Z) ||
                (char >= TypeScript.CharacterCodes._0 && char <= TypeScript.CharacterCodes._9);
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
            getReferencesAtPosition: getReferencesAtPosition,
            getOccurrencesAtPosition: getOccurrencesAtPosition,
            getImplementorsAtPosition: (filename, position) => [],
            getNameOrDottedNameSpan: getNameOrDottedNameSpan,
            getBreakpointStatementAtPosition: getBreakpointStatementAtPosition,
            getNavigateToItems: (searchValue) => [],
            getRenameInfo: (fileName, position): RenameInfo => RenameInfo.CreateError(getLocaleSpecificMessage(Diagnostics.You_cannot_rename_this_element.key)),
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
        var scanner: Scanner;
        var noRegexTable: boolean[];

        /// We do not have a full parser support to know when we should parse a regex or not
        /// If we consider every slash token to be a regex, we could be missing cases like "1/2/3", where
        /// we have a series of divide operator. this list allows us to be more accurate by ruling out 
        /// locations where a regexp cannot exist.
        if (!noRegexTable) {
            noRegexTable = [];
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
        }

        function getClassificationsForLine(text: string, lexState: EndOfLineState): ClassificationResult {
            var offset = 0;
            var lastTokenOrCommentEnd = 0;
            var lastToken = SyntaxKind.Unknown;
            var inUnterminatedMultiLineComment = false;

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
                case EndOfLineState.EndingWithDotToken:
                    lastToken = SyntaxKind.DotToken;
                    break;
            }

            var result: ClassificationResult = {
                finalLexState: EndOfLineState.Start,
                entries: []
            };

            scanner = createScanner(ScriptTarget.ES5, text, onError, processComment);

            var token = SyntaxKind.Unknown;
            do {
                token = scanner.scan();

                if ((token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) && !noRegexTable[lastToken]) {
                    if (scanner.reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                        token = SyntaxKind.RegularExpressionLiteral;
                    }
                }
                else if (lastToken === SyntaxKind.DotToken) {
                    token = SyntaxKind.Identifier;
                }

                lastToken = token;

                processToken();
            }
            while (token !== SyntaxKind.EndOfFileToken);

            return result;


            function onError(message: DiagnosticMessage): void {
                inUnterminatedMultiLineComment = message.key === Diagnostics.Asterisk_Slash_expected.key;
            }

            function processComment(start: number, end: number) {
                // add Leading white spaces
                addLeadingWhiteSpace(start, end);

                // add the comment
                addResult(end - start, TokenClass.Comment);
            }

            function processToken(): void {
                var start = scanner.getTokenPos();
                var end = scanner.getTextPos();

                // add Leading white spaces
                addLeadingWhiteSpace(start, end);

                // add the token
                addResult(end - start, classFromKind(token));

                if (end >= text.length) {
                    // We're at the end.
                    if (inUnterminatedMultiLineComment) {
                        result.finalLexState = EndOfLineState.InMultiLineCommentTrivia;
                    }
                    else if (token === SyntaxKind.StringLiteral) {
                        var tokenText = scanner.getTokenText();
                        if (tokenText.length > 0 && tokenText.charCodeAt(tokenText.length - 1) === CharacterCodes.backslash) {
                            var quoteChar = tokenText.charCodeAt(0);
                            result.finalLexState = quoteChar === CharacterCodes.doubleQuote
                                ? EndOfLineState.InDoubleQuoteStringLiteral
                                : EndOfLineState.InSingleQuoteStringLiteral;
                        }
                    }
                    else if (token === SyntaxKind.DotToken) {
                        result.finalLexState = EndOfLineState.EndingWithDotToken;
                    }
                }
            }

            function addLeadingWhiteSpace(start: number, end: number): void {
                if (start > lastTokenOrCommentEnd) {
                    addResult(start - lastTokenOrCommentEnd, TokenClass.Whitespace);
                }

                // Remeber the end of the last token
                lastTokenOrCommentEnd = end;
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
