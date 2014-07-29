/// <reference path='..\services\services.ts' />
/// <reference path='..\services\shims.ts' />

module Harness.LanguageService {
    export class ScriptInfo {
        public version: number = 1;
        public editRanges: { length: number; textChangeRange: TypeScript.TextChangeRange; }[] = [];
        public lineMap: TypeScript.LineMap = null;

        constructor(public fileName: string, public content: string, public isOpen = true, public byteOrderMark: ts.ByteOrderMark = ts.ByteOrderMark.None) {
            this.setContent(content);
        }

        private setContent(content: string): void {
            this.content = content;
            this.lineMap = TypeScript.LineMap1.fromString(content);
        }

        public updateContent(content: string): void {
            this.editRanges = [];
            this.setContent(content);
            this.version++;
        }

        public editContent(minChar: number, limChar: number, newText: string): void {
            // Apply edits
            var prefix = this.content.substring(0, minChar);
            var middle = newText;
            var suffix = this.content.substring(limChar);
            this.setContent(prefix + middle + suffix);

            // Store edit range + new length of script
            this.editRanges.push({
                length: this.content.length,
                textChangeRange: new TypeScript.TextChangeRange(
                    TypeScript.TextSpan.fromBounds(minChar, limChar), newText.length)
            });

            // Update version #
            this.version++;
        }

        public getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): TypeScript.TextChangeRange {
            if (startVersion === endVersion) {
                // No edits!
                return TypeScript.TextChangeRange.unchanged;
            }

            var initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
            var lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);

            var entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
            return TypeScript.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
        }
    }

    class ScriptSnapshotShim implements ts.ScriptSnapshotShim {
        private lineMap: TypeScript.LineMap = null;
        private textSnapshot: string;
        private version: number;

        constructor(private scriptInfo: ScriptInfo) {
            this.textSnapshot = scriptInfo.content;
            this.version = scriptInfo.version;
        }

        public getText(start: number, end: number): string {
            return this.textSnapshot.substring(start, end);
        }

        public getLength(): number {
            return this.textSnapshot.length;
        }

        public getLineStartPositions(): string {
            if (this.lineMap === null) {
                this.lineMap = TypeScript.LineMap1.fromString(this.textSnapshot);
            }

            return JSON.stringify(this.lineMap.lineStarts());
        }

        public getTextChangeRangeSinceVersion(scriptVersion: number): string {
            var range = this.scriptInfo.getTextChangeRangeBetweenVersions(scriptVersion, this.version);
            if (range === null) {
                return null;
            }

            return JSON.stringify({ span: { start: range.span().start(), length: range.span().length() }, newLength: range.newLength() });
        }
    }

    class CancellationToken {
        public static None: CancellationToken = new CancellationToken(null)

        constructor(private cancellationToken: ts.CancellationToken) {
        }

        public isCancellationRequested() {
            return this.cancellationToken && this.cancellationToken.isCancellationRequested();
        }
    }

    class ScriptSnapshotShimAdapter implements TypeScript.IScriptSnapshot {
        private lineStartPositions: number[] = null;
        constructor(private scriptSnapshotShim: ts.ScriptSnapshotShim) {}
        getText(start: number, end: number): string {return this.scriptSnapshotShim.getText(start, end);}
        getLength(): number {return this.scriptSnapshotShim.getLength();}
        getLineStartPositions(): number[] { return JSON.parse(this.scriptSnapshotShim.getLineStartPositions()); }
        getTextChangeRangeSinceVersion(scriptVersion: number): TypeScript.TextChangeRange {
            var encoded = this.scriptSnapshotShim.getTextChangeRangeSinceVersion(scriptVersion);
            if (encoded == null) {
                return null;
            }

            var decoded: { span: { start: number; length: number; }; newLength: number; } = JSON.parse(encoded);
            return new TypeScript.TextChangeRange(
                new TypeScript.TextSpan(decoded.span.start, decoded.span.length), decoded.newLength);
        }
    }

    class LanguageServiceShimHostAdapter implements ts.LanguageServiceHost {
        constructor(private shimHost: ts.LanguageServiceShimHost) { }
        information(): boolean { return this.shimHost.information(); }
        debug(): boolean { return this.shimHost.debug(); }
        warning(): boolean { return this.shimHost.warning();}
        error(): boolean { return this.shimHost.error(); }
        fatal(): boolean { return this.shimHost.fatal(); }
        log(s: string): void { this.shimHost.log(s); }
        getCompilationSettings(): ts.CompilerOptions { return JSON.parse(this.shimHost.getCompilationSettings()); }
        getScriptFileNames(): string[] { return JSON.parse(this.shimHost.getScriptFileNames());}
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot { return new ScriptSnapshotShimAdapter(this.shimHost.getScriptSnapshot(fileName));}
        getScriptVersion(fileName: string): number { return this.shimHost.getScriptVersion(fileName);}
        getScriptIsOpen(fileName: string): boolean { return this.shimHost.getScriptIsOpen(fileName); }
        getScriptByteOrderMark(fileName: string): ts.ByteOrderMark { return this.shimHost.getScriptByteOrderMark(fileName);}
        getLocalizedDiagnosticMessages(): any { JSON.parse(this.shimHost.getLocalizedDiagnosticMessages());}
        getCancellationToken(): ts.CancellationToken { return this.shimHost.getCancellationToken(); }
    }

    export class NonCachingDocumentRegistry implements ts.DocumentRegistry {

        public static Instance: ts.DocumentRegistry = new NonCachingDocumentRegistry();

        public acquireDocument(
            fileName: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: TypeScript.IScriptSnapshot,
            byteOrderMark: ts.ByteOrderMark,
            version: number,
            isOpen: boolean,
            referencedFiles: string[]= []): ts.Document {
            return ts.createDocument(compilationSettings, fileName, scriptSnapshot, byteOrderMark, version, isOpen, referencedFiles);
        }

        public updateDocument(
            document: ts.Document,
            fileName: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: TypeScript.IScriptSnapshot,
            version: number,
            isOpen: boolean,
            textChangeRange: TypeScript.TextChangeRange
            ): ts.Document {
            return document.update(scriptSnapshot, version, isOpen, textChangeRange);
        }

        public releaseDocument(fileName: string, compilationSettings: ts.CompilerOptions): void {
            // no op since this class doesn't cache anything
        }
    }
    export class TypeScriptLS implements ts.LanguageServiceShimHost {
        private ls: ts.LanguageServiceShim = null;
        public newLS: ts.LanguageService;

        private fileNameToScript: ts.Map<ScriptInfo> = {};

        constructor(private cancellationToken: ts.CancellationToken = CancellationToken.None) {
        }

        public addDefaultLibrary() {
            this.addScript("lib.d.ts", Harness.Compiler.libText);
        }

        public getHostIdentifier(): string {
            return "TypeScriptLS";
        }

        public addFile(fileName: string) {
            var code = Harness.IO.readFile(fileName);
            this.addScript(fileName, code);
        }

        private getScriptInfo(fileName: string): ScriptInfo {
            return this.fileNameToScript[fileName];
        }

        public addScript(fileName: string, content: string) {
            this.fileNameToScript[fileName] = new ScriptInfo(fileName, content);
        }

        public updateScript(fileName: string, content: string) {
            var script = this.getScriptInfo(fileName);
            if (script !== null) {
                script.updateContent(content);
                return;
            }

            this.addScript(fileName, content);
        }

        public editScript(fileName: string, minChar: number, limChar: number, newText: string) {
            var script = this.getScriptInfo(fileName);
            if (script !== null) {
                script.editContent(minChar, limChar, newText);
                return;
            }

            throw new Error("No script with name '" + fileName + "'");
        }

        //////////////////////////////////////////////////////////////////////
        // ILogger implementation
        //
        public information(): boolean { return false; }
        public debug(): boolean { return true; }
        public warning(): boolean { return true; }
        public error(): boolean { return true; }
        public fatal(): boolean { return true; }

        public log(s: string): void {
            // For debugging...
            //TypeScript.Environment.standardOut.WriteLine("TypeScriptLS:" + s);
        }

        //////////////////////////////////////////////////////////////////////
        // LanguageServiceShimHost implementation
        //

        /// Returns json for Tools.CompilationSettings
        public getCompilationSettings(): string {
            return JSON.stringify({}); // i.e. default settings
        }

        public getCancellationToken(): ts.CancellationToken {
            return this.cancellationToken;
        }

        public getScriptFileNames(): string {
            var fileNames: string[] = [];
            ts.forEachKey(this.fileNameToScript, (fileName) => { fileNames.push(fileName); });
            return JSON.stringify(fileNames);
        }

        public getScriptSnapshot(fileName: string): ts.ScriptSnapshotShim {
            return new ScriptSnapshotShim(this.getScriptInfo(fileName));
        }

        public getScriptVersion(fileName: string): number {
            return this.getScriptInfo(fileName).version;
        }

        public getScriptIsOpen(fileName: string): boolean {
            return this.getScriptInfo(fileName).isOpen;
        }

        public getScriptByteOrderMark(fileName: string): ts.ByteOrderMark {
            return this.getScriptInfo(fileName).byteOrderMark;
        }

        public getLocalizedDiagnosticMessages(): string {
            return JSON.stringify({});
        }

        /** Return a new instance of the language service shim, up-to-date wrt to typecheck.
         *  To access the non-shim (i.e. actual) language service, use the "ls.languageService" property.
         */
        public getLanguageService(): ts.LanguageServiceShim {
            var ls = new TypeScript.Services.TypeScriptServicesFactory().createLanguageServiceShim(this);
            this.ls = ls;
            var hostAdapter = new LanguageServiceShimHostAdapter(this);

            this.newLS = ts.createLanguageService(hostAdapter, NonCachingDocumentRegistry.Instance);
            return ls;
        }

        /** Parse file given its source text */
        public parseSourceText(fileName: string, sourceText: TypeScript.IScriptSnapshot): TypeScript.SourceUnitSyntax {
            return TypeScript.Parser.parse(fileName, TypeScript.SimpleText.fromScriptSnapshot(sourceText), ts.ScriptTarget.ES5, TypeScript.isDTSFile(fileName)).sourceUnit();
        }

        /** Parse a file on disk given its fileName */
        public parseFile(fileName: string) {
            var sourceText = TypeScript.ScriptSnapshot.fromString(Harness.IO.readFile(fileName))
            return this.parseSourceText(fileName, sourceText);
        }

        /**
         * @param line 1 based index
         * @param col 1 based index
        */
        public lineColToPosition(fileName: string, line: number, col: number): number {
            var script: ScriptInfo = this.fileNameToScript[fileName];
            assert.isNotNull(script);
            assert.isTrue(line >= 1);
            assert.isTrue(col >= 1);

            return script.lineMap.getPosition(line - 1, col - 1);
        }

        /**
         * @param line 0 based index
         * @param col 0 based index
        */
        public positionToZeroBasedLineCol(fileName: string, position: number): TypeScript.ILineAndCharacter {
            var script: ScriptInfo = this.fileNameToScript[fileName];
            assert.isNotNull(script);

            var result = script.lineMap.getLineAndCharacterFromPosition(position);

            assert.isTrue(result.line() >= 0);
            assert.isTrue(result.character() >= 0);
            return { line: result.line(), character: result.character() };
        }

        /** Verify that applying edits to sourceFileName result in the content of the file baselineFileName */
        public checkEdits(sourceFileName: string, baselineFileName: string, edits: ts.TextEdit[]) {
            var script = Harness.IO.readFile(sourceFileName);
            var formattedScript = this.applyEdits(script, edits);
            var baseline = Harness.IO.readFile(baselineFileName);

            function noDiff(text1: string, text2: string) {
                text1 = text1.replace(/^\s+|\s+$/g, "").replace(/\r\n?/g, "\n");
                text2 = text2.replace(/^\s+|\s+$/g, "").replace(/\r\n?/g, "\n");

                if (text1 !== text2) {
                    var errorString = "";
                    var text1Lines = text1.split(/\n/);
                    var text2Lines = text2.split(/\n/);
                    for (var i = 0; i < text1Lines.length; i++) {
                        if (text1Lines[i] !== text2Lines[i]) {
                            errorString += "Difference at line " + (i + 1) + ":\n";
                            errorString += "                  Left File: " + text1Lines[i] + "\n";
                            errorString += "                 Right File: " + text2Lines[i] + "\n\n";
                        }
                    }
                    throw (new Error(errorString));
                }
            }
            assert.isTrue(noDiff(formattedScript, baseline));
            assert.equal(formattedScript, baseline);
        }


        /** Apply an array of text edits to a string, and return the resulting string. */
        public applyEdits(content: string, edits: ts.TextEdit[]): string {
            var result = content;
            edits = this.normalizeEdits(edits);

            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.minChar);
                var middle = edit.text;
                var suffix = result.substring(edit.limChar);
                result = prefix + middle + suffix;
            }
            return result;
        }

        /** Normalize an array of edits by removing overlapping entries and sorting entries on the minChar position. */
        private normalizeEdits(edits: ts.TextEdit[]): ts.TextEdit[] {
            var result: ts.TextEdit[] = [];

            function mapEdits(edits: ts.TextEdit[]): { edit: ts.TextEdit; index: number; }[] {
                var result: { edit: ts.TextEdit; index: number; }[] = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }

            var temp = mapEdits(edits).sort(function (a, b) {
                var result = a.edit.minChar - b.edit.limChar;
                if (result === 0)
                    result = a.index - b.index;
                return result;
            });

            var current = 0;
            var next = 1;
            while (current < temp.length) {
                var currentEdit = temp[current].edit;

                // Last edit
                if (next >= temp.length) {
                    result.push(currentEdit);
                    current++;
                    continue;
                }
                var nextEdit = temp[next].edit;

                var gap = nextEdit.minChar - currentEdit.limChar;

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }

                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (currentEdit.minChar >= nextEdit.limChar) {
                    next++;
                    continue;
                }
                else {
                    throw new Error("Trying to apply overlapping edits");
                }
            }

            return result;
        }
    }
}
 