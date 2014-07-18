///<reference path='references.ts' />

module TypeScript {
    export interface IncrementalParse { 
        (oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, newText: ISimpleText): SyntaxTree
    }


    export class Document {
        private _bloomFilter: BloomFilter = null;

        // By default, our Document class doesn't support incremental update of its contents.
        // However, we enable other layers (like teh services layer) to inject the capability
        // into us by setting this function.
        public static incrementalParse: IncrementalParse = null;

        constructor(private compilationSettings: ts.CompilerOptions,
                    public filename: string,
                    public referencedFiles: string[],
                    private _scriptSnapshot: IScriptSnapshot,
                    public byteOrderMark: ByteOrderMark,
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

        public static create(compilationSettings: ts.CompilerOptions, fileName: string, scriptSnapshot: IScriptSnapshot, byteOrderMark: ByteOrderMark, version: number, isOpen: boolean, referencedFiles: string[]): Document {
            return new Document(compilationSettings, fileName, referencedFiles, scriptSnapshot, byteOrderMark, version, isOpen, /*syntaxTree:*/ null, /*soruceFile*/ null);
        }
    }
}