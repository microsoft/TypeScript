/// <reference path="..\compiler\types.ts"/>
/// <reference path="..\compiler\core.ts"/>
/// <reference path="..\compiler\scanner.ts"/>
/// <reference path="..\compiler\parser.ts"/>
/// <reference path="..\compiler\checker.ts"/>

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

    interface HostFileInformation {
        version: string;
        isOpen: boolean;
        byteOrderMark: ByteOrderMark;
        sourceText?: IScriptSnapshot;
    }

    //
    // Public services of a language service instance associated
    // with a language service host instance
    //
    export interface LanguageService {
        getSyntacticDiagnostics(filename: string): Diagnostic[];
        getSemanticDiagnostics(filename: string): Diagnostic[];
    }

    //
    // Public interface of the host of a language service instance.
    //
    export interface LanguageServiceHost {
        log(s: string): void;

        getCompilationSettings(): CompilerOptions;

        getScriptFileNames(): string[];
        getScriptVersion(filename: string): string;
        getScriptIsOpen(filename: string): boolean;
        getScriptByteOrderMark(filename: string): ByteOrderMark;
        getScriptSnapshot(filename: string): IScriptSnapshot;
        getLocalizedDiagnosticMessages(): any;
        //getCancellationToken(): CancellationToken;
    }

    // Represents an immutable snapshot of a script at a specified time.  Once acquired, the 
    // snapshot is observably immutable.  i.e. the same calls with the same parameters will return
    // the same values.
    export interface IScriptSnapshot {
        // Get's a portion of the script snapshot specified by [start, end).  
        getText(start: number, end: number): string;

        // Get's the length of this script snapshot.
        getLength(): number;

        // This call returns the array containing the start position of every line.  
        // i.e."[0, 10, 55]".  TODO: consider making this optional.  The language service could
        // always determine this (albeit in a more expensive manner).
        getLineStartPositions(): number[];

        // Gets the TextChangeRange that describe how the text changed between this text and 
        // an older version.  This informatoin is used by the incremental parser to determine
        // what sections of the script need to be reparsed.  'null' can be returned if the 
        // change range cannot be determined.  However, in that case, incremental parsing will
        // not happen and the entire document will be reparsed.
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange;
    }

    export interface Span {
        start(): number;
        end(): number;
    }

    export interface TextChange {
        span: Span;
        newText: string;
    }

    export interface TextChangeRange {
        span(): Span;
        newLength(): number;
    }

    export enum ByteOrderMark {
        None = 0,
        Utf8 = 1,
        Utf16BigEndian = 2,
        Utf16LittleEndian = 3,
    }

    export interface CancellationToken {
        isCancellationRequested(): boolean;
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

    export function createLanguageService(host: LanguageServiceHost): LanguageService {

        var program: Program;
        var typeChecker: TypeChecker;
        var filesByName: Map<HostFileInformation>;

        function createCompilerHost(): CompilerHost {
            return {
                getSourceFile: (filename, languageVersion) => {
                    var hostFile = filesByName[filename];

                    // TODO use the document registry to get or update

                    if (!hostFile.sourceText) {
                        hostFile.sourceText = host.getScriptSnapshot(filename);
                    }

                    // TODO add support for IScriptSnapshot in the parser
                    return createSourceFile(filename, hostFile.sourceText.getText(0, hostFile.sourceText.getLength()), languageVersion);
                },
                // Need something that doesn't depend on sys.ts here
                getDefaultLibFilename: () => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), "lib.d.ts"),
                getCancellationToken: (): CancellationToken => undefined,
                writeFile: (fileName, data) => {
                    throw Error("TODO: write file");
                },
                getCurrentDirectory: (): string => {
                    throw Error("TODO: getCurrentDirectory");
                },
                getCanonicalFileName: getCanonicalFileName,
                useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames
            };
        }

        function synchronizeHostData(): void {
            // Build the cache
            filesByName = {};
            var files = host.getScriptFileNames();
            forEach(files, (f) => {
                filesByName[f] = {
                    version: host.getScriptVersion(f),
                    isOpen: host.getScriptIsOpen(f),
                    byteOrderMark: host.getScriptByteOrderMark(f)
                };
            });

            var currentProgram = program;

            var options = host.getCompilationSettings();

            // update the program
            program = createProgram(files, options, createCompilerHost());

            // Update the typeChecker
            typeChecker = program.getTypeChecker();

            // TODO release old sources from the registry
            if (currentProgram) {

            }
        }

        function getSyntacticDiagnostics(filename: string): Diagnostic[] {
            synchronizeHostData();
            var sourceFile = program.getSourceFile(filename);
            return sourceFile ? program.getDiagnostics(sourceFile) : [];
        }

        function getSemanticDiagnostics(filename: string): Diagnostic[] {
            synchronizeHostData();
            var sourceFile = program.getSourceFile(filename);
            return sourceFile ? typeChecker.getDiagnostics(sourceFile) : [];
        }

        return {
            getSyntacticDiagnostics: getSyntacticDiagnostics,
            getSemanticDiagnostics: getSemanticDiagnostics,
        };
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
