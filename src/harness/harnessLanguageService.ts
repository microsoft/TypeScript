module Harness.LanguageService {
    export class ScriptInfo {
        public version: number = 1;
        public editRanges: { length: number; textChangeRange: TypeScript.TextChangeRange; }[] = [];
        public lineMap: TypeScript.LineMap = null;

        constructor(public fileName: string, public content: string, public isOpen = true, public byteOrderMark: TypeScript.ByteOrderMark = TypeScript.ByteOrderMark.None) {
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

    class ScriptSnapshotShim implements TypeScript.Services.IScriptSnapshotShim {
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

        public getChangeRange(oldScript: TypeScript.Services.IScriptSnapshotShim): string {
            var oldShim = <ScriptSnapshotShim>oldScript;
            var range = this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
            if (range === null) {
                return null;
            }

            return JSON.stringify({ span: { start: range.span().start(), length: range.span().length() }, newLength: range.newLength() });
        }
    }

    export class TypeScriptLS implements TypeScript.Services.ILanguageServiceShimHost {
        IO = TypeScript.Environment ? TypeScript.Environment : Network.getEnvironment();
        private ls: TypeScript.Services.ILanguageServiceShim = null;
        public newLS: ts.LanguageService;

        private fileNameToScript = new TypeScript.StringHashTable<ScriptInfo>();

        constructor(private cancellationToken: TypeScript.ICancellationToken = TypeScript.CancellationToken.None) {
        }

        public addDefaultLibrary() {
            this.addScript("lib.d.ts", Harness.Compiler.libText);
        }

        public getHostIdentifier(): string {
            return "TypeScriptLS";
        }

        public addFile(fileName: string) {
            var code = Harness.Environment.readFile(fileName);
            this.addScript(fileName, code);
        }

        private getScriptInfo(fileName: string): ScriptInfo {
            return this.fileNameToScript.lookup(fileName);
        }

        public addScript(fileName: string, content: string) {
            var script = new ScriptInfo(fileName, content);
            this.fileNameToScript.add(fileName, script);
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
        // ILanguageServiceShimHost implementation
        //

        /// Returns json for Tools.CompilationSettings
        public getCompilationSettings(): string {
            return ""; // i.e. default settings
        }

        public getCancellationToken(): TypeScript.ICancellationToken {
            return this.cancellationToken;
        }

        public getScriptFileNames(): string {
            return JSON.stringify(this.fileNameToScript.getAllKeys());
        }

        public getScriptSnapshot(fileName: string): TypeScript.Services.IScriptSnapshotShim {
            return new ScriptSnapshotShim(this.getScriptInfo(fileName));
        }

        public getScriptVersion(fileName: string): string {
            return this.getScriptInfo(fileName).version.toString();
        }

        public getScriptIsOpen(fileName: string): boolean {
            return this.getScriptInfo(fileName).isOpen;
        }

        public getScriptByteOrderMark(fileName: string): TypeScript.ByteOrderMark {
            return this.getScriptInfo(fileName).byteOrderMark;
        }

        public getDiagnosticsObject(): TypeScript.Services.ILanguageServicesDiagnostics {
            return new LanguageServicesDiagnostics("");
        }

        public getLocalizedDiagnosticMessages(): string {
            return "";
        }

        public fileExists(s: string) {
            return this.IO.fileExists(s);
        }

        public directoryExists(s: string) {
            return this.IO.directoryExists(s);
        }

        public resolveRelativePath(path: string, directory: string): string {
            if (TypeScript.isRooted(path) || !directory) {
                return this.IO.absolutePath(path);
            }
            else {
                return this.IO.absolutePath(TypeScript.IOUtils.combine(directory, path));
            }
        }

        public getParentDirectory(path: string): string {
            return this.IO.directoryName(path);
        }

        /** Return a new instance of the language service shim, up-to-date wrt to typecheck.
         *  To access the non-shim (i.e. actual) language service, use the "ls.languageService" property.
         */
        public getLanguageService(): TypeScript.Services.ILanguageServiceShim {
            var ls = new TypeScript.Services.TypeScriptServicesFactory().createLanguageServiceShim(this);
            this.ls = ls;
            var hostAdapter = new ts.LanguageServiceShimHostAdapter(this);
            this.newLS = ts.createLanguageService(hostAdapter);
            return ls;
        }

        /** Parse file given its source text */
        public parseSourceText(fileName: string, sourceText: TypeScript.IScriptSnapshot): TypeScript.SourceUnitSyntax {
            var compilationSettings = new TypeScript.CompilationSettings();
            compilationSettings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;

            var settings = TypeScript.ImmutableCompilationSettings.fromCompilationSettings(compilationSettings);
            var parseOptions = settings.codeGenTarget();
            return TypeScript.Parser.parse(fileName, TypeScript.SimpleText.fromScriptSnapshot(sourceText), parseOptions, TypeScript.isDTSFile(fileName)).sourceUnit();
        }

        /** Parse a file on disk given its fileName */
        public parseFile(fileName: string) {
            var sourceText = TypeScript.ScriptSnapshot.fromString(this.IO.readFile(fileName, /*codepage:*/ null).contents)
            return this.parseSourceText(fileName, sourceText);
        }

        /**
         * @param line 1 based index
         * @param col 1 based index
        */
        public lineColToPosition(fileName: string, line: number, col: number): number {
            var script: ScriptInfo = this.fileNameToScript.lookup(fileName);
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
            var script: ScriptInfo = this.fileNameToScript.lookup(fileName);
            assert.isNotNull(script);

            var result = script.lineMap.getLineAndCharacterFromPosition(position);

            assert.isTrue(result.line() >= 0);
            assert.isTrue(result.character() >= 0);
            return { line: result.line(), character: result.character() };
        }

        /** Verify that applying edits to sourceFileName result in the content of the file baselineFileName */
        public checkEdits(sourceFileName: string, baselineFileName: string, edits: TypeScript.Services.TextChange[]) {
            var script = Utils.readFile(sourceFileName);
            var formattedScript = this.applyEdits(script.contents, edits);
            var baseline = Utils.readFile(baselineFileName).contents;

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
        public applyEdits(content: string, edits: TypeScript.Services.TextChange[]): string {
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
        private normalizeEdits(edits: TypeScript.Services.TextChange[]): TypeScript.Services.TextChange[] {
            var result: TypeScript.Services.TextChange[] = [];

            function mapEdits(edits: TypeScript.Services.TextChange[]): { edit: TypeScript.Services.TextChange; index: number; }[] {
                var result: { edit: TypeScript.Services.TextChange; index: number; }[] = [];
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

    export class LanguageServicesDiagnostics implements TypeScript.Services.ILanguageServicesDiagnostics {

        constructor(private destination: string) { }

        public log(content: string): void {
            //Imitates the LanguageServicesDiagnostics object when not in Visual Studio
        }

    }
}
 