/// <reference path='..\services\services.ts' />
/// <reference path='..\services\shims.ts' />

module Harness.LanguageService {
    export class ScriptInfo {
        public version: number = 1;
        public editRanges: { length: number; textChangeRange: ts.TextChangeRange; }[] = [];
        public lineMap: number[] = null;

        constructor(public fileName: string, public content: string, public isOpen = true) {
            this.setContent(content);
        }

        private setContent(content: string): void {
            this.content = content;
            this.lineMap = ts.computeLineStarts(content);
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
                textChangeRange: new ts.TextChangeRange(
                    ts.TextSpan.fromBounds(minChar, limChar), newText.length)
            });

            // Update version #
            this.version++;
        }

        public getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange {
            if (startVersion === endVersion) {
                // No edits!
                return ts.TextChangeRange.unchanged;
            }

            var initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
            var lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);

            var entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
            return ts.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
        }
    }

    class ScriptSnapshotShim implements ts.ScriptSnapshotShim {
        private lineMap: number[] = null;
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
                this.lineMap = ts.computeLineStarts(this.textSnapshot);
            }

            return JSON.stringify(this.lineMap);
        }

        public getChangeRange(oldScript: ts.ScriptSnapshotShim): string {
            var oldShim = <ScriptSnapshotShim>oldScript;
            var range = this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
            if (range === null) {
                return null;
            }

            return JSON.stringify({ span: { start: range.span().start(), length: range.span().length() }, newLength: range.newLength() });
        }
    }

    class CancellationToken {
        public static None: CancellationToken = new CancellationToken(null);

        constructor(private cancellationToken: ts.CancellationToken) {
        }

        public isCancellationRequested() {
            return this.cancellationToken && this.cancellationToken.isCancellationRequested();
        }
    }

    export class NonCachingDocumentRegistry implements ts.DocumentRegistry {
        public static Instance: ts.DocumentRegistry = new NonCachingDocumentRegistry();

        public acquireDocument(
            fileName: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: ts.IScriptSnapshot,
            version: string,
            isOpen: boolean): ts.SourceFile {
            return ts.createSourceFile(fileName, scriptSnapshot.getText(0, scriptSnapshot.getLength()), compilationSettings.target, version, isOpen);
        }

        public updateDocument(
            document: ts.SourceFile,
            fileName: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: ts.IScriptSnapshot,
            version: string,
            isOpen: boolean,
            textChangeRange: ts.TextChangeRange
            ): ts.SourceFile {
            return document.update(scriptSnapshot, version, isOpen, textChangeRange);
        }

        public releaseDocument(fileName: string, compilationSettings: ts.CompilerOptions): void {
            // no op since this class doesn't cache anything
        }
    }
    export class TypeScriptLS implements ts.LanguageServiceShimHost {
        private ls: ts.LanguageServiceShim = null;

        private fileNameToScript: ts.Map<ScriptInfo> = {};
        private settings: ts.CompilationSettings = {};

        constructor(private cancellationToken: ts.CancellationToken = CancellationToken.None) {
        }

        public addDefaultLibrary() {
            this.addScript(Harness.Compiler.defaultLibFileName, Harness.Compiler.defaultLibSourceFile.text);
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
            return JSON.stringify(this.settings);
        }

        public getCancellationToken(): ts.CancellationToken {
            return this.cancellationToken;
        }

        public getCurrentDirectory(): string {
            return "";
        }

        public getDefaultLibFilename(): string {
            return "";
        }

        public getScriptFileNames(): string {
            var fileNames: string[] = [];
            ts.forEachKey(this.fileNameToScript, (fileName) => { fileNames.push(fileName); });
            return JSON.stringify(fileNames);
        }

        public getScriptSnapshot(fileName: string): ts.ScriptSnapshotShim {
            return new ScriptSnapshotShim(this.getScriptInfo(fileName));
        }

        public getScriptVersion(fileName: string): string {
            return this.getScriptInfo(fileName).version.toString();
        }

        public getScriptIsOpen(fileName: string): boolean {
            return this.getScriptInfo(fileName).isOpen;
        }

        public getLocalizedDiagnosticMessages(): string {
            return JSON.stringify({});
        }

        /** Return a new instance of the language service shim, up-to-date wrt to typecheck.
         *  To access the non-shim (i.e. actual) language service, use the "ls.languageService" property.
         */
        public getLanguageService(): ts.LanguageServiceShim {
            this.ls = new TypeScript.Services.TypeScriptServicesFactory().createLanguageServiceShim(this);
            return this.ls;
        }

        public setCompilationSettings(settings: ts.CompilationSettings) {
            for (var key in settings) {
                if (settings.hasOwnProperty(key)) {
                    this.settings[key] = settings[key];
                }
            }
        }

        /** Return a new instance of the classifier service shim */
        public getClassifier(): ts.ClassifierShim {
            return new TypeScript.Services.TypeScriptServicesFactory().createClassifierShim(this);
        }

        public getCoreService(): ts.CoreServicesShim {
            return new TypeScript.Services.TypeScriptServicesFactory().createCoreServicesShim(this);
        }

        /** Parse file given its source text */
        public parseSourceText(fileName: string, sourceText: ts.IScriptSnapshot): ts.SourceFile {
            return ts.createSourceFile(fileName, sourceText.getText(0, sourceText.getLength()), ts.ScriptTarget.Latest, "1", true);
        }

        /** Parse a file on disk given its fileName */
        public parseFile(fileName: string) {
            var sourceText = ts.ScriptSnapshot.fromString(Harness.IO.readFile(fileName));
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

            return ts.getPositionFromLineAndCharacter(script.lineMap, line, col);
        }

        /**
         * @param line 0 based index
         * @param col 0 based index
        */
        public positionToZeroBasedLineCol(fileName: string, position: number): ts.LineAndCharacter {
            var script: ScriptInfo = this.fileNameToScript[fileName];
            assert.isNotNull(script);

            var result = ts.getLineAndCharacterOfPosition(script.lineMap, position);

            assert.isTrue(result.line >= 1);
            assert.isTrue(result.character >= 1);
            return { line: result.line - 1, character: result.character - 1 };
        }

        /** Verify that applying edits to sourceFileName result in the content of the file baselineFileName */
        public checkEdits(sourceFileName: string, baselineFileName: string, edits: ts.TextChange[]) {
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
        public applyEdits(content: string, edits: ts.TextChange[]): string {
            var result = content;
            edits = this.normalizeEdits(edits);

            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.span.start());
                var middle = edit.newText;
                var suffix = result.substring(edit.span.end());
                result = prefix + middle + suffix;
            }
            return result;
        }

        /** Normalize an array of edits by removing overlapping entries and sorting entries on the minChar position. */
        private normalizeEdits(edits: ts.TextChange[]): ts.TextChange[] {
            var result: ts.TextChange[] = [];

            function mapEdits(edits: ts.TextChange[]): { edit: ts.TextChange; index: number; }[] {
                var result: { edit: ts.TextChange; index: number; }[] = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }

            var temp = mapEdits(edits).sort(function (a, b) {
                var result = a.edit.span.start() - b.edit.span.start();
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

                var gap = nextEdit.span.start() - currentEdit.span.end();

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }
 
                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (currentEdit.span.end() >= nextEdit.span.end()) {
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
 