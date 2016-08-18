/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="editorServices.ts" />

namespace ts.server {
    const spaceCache: string[] = [];

    interface StackTraceError extends Error {
        stack?: string;
    }

    export function generateSpaces(n: number): string {
        if (!spaceCache[n]) {
            let strBuilder = "";
            for (let i = 0; i < n; i++) {
                strBuilder += " ";
            }
            spaceCache[n] = strBuilder;
        }
        return spaceCache[n];
    }

    export function generateIndentString(n: number, editorOptions: EditorOptions): string {
        if (editorOptions.ConvertTabsToSpaces) {
            return generateSpaces(n);
        }
        else {
            let result = "";
            for (let i = 0; i < Math.floor(n / editorOptions.TabSize); i++) {
                result += "\t";
            }
            for (let i = 0; i < n % editorOptions.TabSize; i++) {
                result += " ";
            }
            return result;
        }
    }

    interface FileStart {
        file: string;
        start: ILineInfo;
    }

    function compareNumber(a: number, b: number) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else return 1;
    }

    function compareFileStart(a: FileStart, b: FileStart) {
        if (a.file < b.file) {
            return -1;
        }
        else if (a.file == b.file) {
            const n = compareNumber(a.start.line, b.start.line);
            if (n === 0) {
                return compareNumber(a.start.offset, b.start.offset);
            }
            else return n;
        }
        else {
            return 1;
        }
    }

    function formatDiag(fileName: string, project: Project, diag: ts.Diagnostic): protocol.Diagnostic {
        return {
            start: project.compilerService.host.positionToLineOffset(fileName, diag.start),
            end: project.compilerService.host.positionToLineOffset(fileName, diag.start + diag.length),
            text: ts.flattenDiagnosticMessageText(diag.messageText, "\n")
        };
    }

    function formatConfigFileDiag(diag: ts.Diagnostic): protocol.Diagnostic {
        return {
            start: undefined,
            end: undefined,
            text: ts.flattenDiagnosticMessageText(diag.messageText, "\n")
        };
    }

    export interface PendingErrorCheck {
        fileName: string;
        project: Project;
    }

    function allEditsBeforePos(edits: ts.TextChange[], pos: number) {
        for (let i = 0, len = edits.length; i < len; i++) {
            if (ts.textSpanEnd(edits[i].span) >= pos) {
                return false;
            }
        }
        return true;
    }

    export namespace CommandNames {
        export const Brace = "brace";
        export const Change = "change";
        export const Close = "close";
        export const Completions = "completions";
        export const CompletionDetails = "completionEntryDetails";
        export const Configure = "configure";
        export const Definition = "definition";
        export const Exit = "exit";
        export const Format = "format";
        export const Formatonkey = "formatonkey";
        export const Geterr = "geterr";
        export const GeterrForProject = "geterrForProject";
        export const SemanticDiagnosticsSync = "semanticDiagnosticsSync";
        export const SyntacticDiagnosticsSync = "syntacticDiagnosticsSync";
        export const NavBar = "navbar";
        export const Navto = "navto";
        export const Occurrences = "occurrences";
        export const DocumentHighlights = "documentHighlights";
        export const Open = "open";
        export const Quickinfo = "quickinfo";
        export const References = "references";
        export const Reload = "reload";
        export const Rename = "rename";
        export const Saveto = "saveto";
        export const SignatureHelp = "signatureHelp";
        export const TypeDefinition = "typeDefinition";
        export const ProjectInfo = "projectInfo";
        export const ReloadProjects = "reloadProjects";
        export const Unknown = "unknown";
    }

    namespace Errors {
        export const NoProject = new Error("No Project.");
        export const ProjectLanguageServiceDisabled = new Error("The project's language service is disabled.");
    }

    export interface ServerHost extends ts.System {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
    }

    export class Session {
        protected projectService: ProjectService;
        private errorTimer: any; /*NodeJS.Timer | number*/
        private immediateId: any;
        private changeSeq = 0;

        constructor(
            private host: ServerHost,
            private byteLength: (buf: string, encoding?: string) => number,
            private hrtime: (start?: number[]) => number[],
            private logger: Logger
        ) {
            this.projectService =
                new ProjectService(host, logger, (eventName, project, fileName) => {
                    this.handleEvent(eventName, project, fileName);
                });
        }

        private handleEvent(eventName: string, project: Project, fileName: string) {
            if (eventName == "context") {
                this.projectService.log("got context event, updating diagnostics for" + fileName, "Info");
                this.updateErrorCheck([{ fileName, project }], this.changeSeq,
                    (n) => n === this.changeSeq, 100);
            }
        }

        public logError(err: Error, cmd: string) {
            const typedErr = <StackTraceError>err;
            let msg = "Exception on executing command " + cmd;
            if (typedErr.message) {
                msg += ":\n" + typedErr.message;
                if (typedErr.stack) {
                    msg += "\n" + typedErr.stack;
                }
            }
            this.projectService.log(msg);
        }

        private sendLineToClient(line: string) {
            this.host.write(line + this.host.newLine);
        }

        public send(msg: protocol.Message) {
            const json = JSON.stringify(msg);
            if (this.logger.isVerbose()) {
                this.logger.info(msg.type + ": " + json);
            }
            this.sendLineToClient("Content-Length: " + (1 + this.byteLength(json, "utf8")) +
                "\r\n\r\n" + json);
        }

        public configFileDiagnosticEvent(triggerFile: string, configFile: string, diagnostics: ts.Diagnostic[]) {
            const bakedDiags = ts.map(diagnostics, formatConfigFileDiag);
            const ev: protocol.ConfigFileDiagnosticEvent = {
                seq: 0,
                type: "event",
                event: "configFileDiag",
                body: {
                    triggerFile,
                    configFile,
                    diagnostics: bakedDiags
                }
            };
            this.send(ev);
        }

        public event(info: any, eventName: string) {
            const ev: protocol.Event = {
                seq: 0,
                type: "event",
                event: eventName,
                body: info,
            };
            this.send(ev);
        }

        private response(info: any, cmdName: string, reqSeq = 0, errorMsg?: string) {
            const res: protocol.Response = {
                seq: 0,
                type: "response",
                command: cmdName,
                request_seq: reqSeq,
                success: !errorMsg,
            };
            if (!errorMsg) {
                res.body = info;
            }
            else {
                res.message = errorMsg;
            }
            this.send(res);
        }

        public output(body: any, commandName: string, requestSequence = 0, errorMessage?: string) {
            this.response(body, commandName, requestSequence, errorMessage);
        }

        private semanticCheck(file: string, project: Project) {
            try {
                const diags = project.compilerService.languageService.getSemanticDiagnostics(file);

                if (diags) {
                    const bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "semanticDiag");
                }
            }
            catch (err) {
                this.logError(err, "semantic check");
            }
        }

        private syntacticCheck(file: string, project: Project) {
            try {
                const diags = project.compilerService.languageService.getSyntacticDiagnostics(file);
                if (diags) {
                    const bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "syntaxDiag");
                }
            }
            catch (err) {
                this.logError(err, "syntactic check");
            }
        }

        private reloadProjects() {
            this.projectService.reloadProjects();
        }

        private updateProjectStructure(seq: number, matchSeq: (seq: number) => boolean, ms = 1500) {
            setTimeout(() => {
                if (matchSeq(seq)) {
                    this.projectService.updateProjectStructure();
                }
            }, ms);
        }

        private updateErrorCheck(checkList: PendingErrorCheck[], seq: number,
            matchSeq: (seq: number) => boolean, ms = 1500, followMs = 200, requireOpen = true) {
            if (followMs > ms) {
                followMs = ms;
            }
            if (this.errorTimer) {
                clearTimeout(this.errorTimer);
            }
            if (this.immediateId) {
                clearImmediate(this.immediateId);
                this.immediateId = undefined;
            }
            let index = 0;
            const checkOne = () => {
                if (matchSeq(seq)) {
                    const checkSpec = checkList[index];
                    index++;
                    if (checkSpec.project.getSourceFileFromName(checkSpec.fileName, requireOpen)) {
                        this.syntacticCheck(checkSpec.fileName, checkSpec.project);
                        this.immediateId = setImmediate(() => {
                            this.semanticCheck(checkSpec.fileName, checkSpec.project);
                            this.immediateId = undefined;
                            if (checkList.length > index) {
                                this.errorTimer = setTimeout(checkOne, followMs);
                            }
                            else {
                                this.errorTimer = undefined;
                            }
                        });
                    }
                }
            };
            if ((checkList.length > index) && (matchSeq(seq))) {
                this.errorTimer = setTimeout(checkOne, ms);
            }
        }

        private getDefinition(line: number, offset: number, fileName: string): protocol.FileSpan[] {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);

            const definitions = compilerService.languageService.getDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            return definitions.map(def => ({
                file: def.fileName,
                start: compilerService.host.positionToLineOffset(def.fileName, def.textSpan.start),
                end: compilerService.host.positionToLineOffset(def.fileName, ts.textSpanEnd(def.textSpan))
            }));
        }

        private getTypeDefinition(line: number, offset: number, fileName: string): protocol.FileSpan[] {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);

            const definitions = compilerService.languageService.getTypeDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            return definitions.map(def => ({
                file: def.fileName,
                start: compilerService.host.positionToLineOffset(def.fileName, def.textSpan.start),
                end: compilerService.host.positionToLineOffset(def.fileName, ts.textSpanEnd(def.textSpan))
            }));
        }

        private getOccurrences(line: number, offset: number, fileName: string): protocol.OccurrencesResponseItem[] {
            fileName = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(fileName);

            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const { compilerService } = project;
            const position = compilerService.host.lineOffsetToPosition(fileName, line, offset);

            const occurrences = compilerService.languageService.getOccurrencesAtPosition(fileName, position);

            if (!occurrences) {
                return undefined;
            }

            return occurrences.map(occurrence => {
                const { fileName, isWriteAccess, textSpan } = occurrence;
                const start = compilerService.host.positionToLineOffset(fileName, textSpan.start);
                const end = compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(textSpan));
                return {
                    start,
                    end,
                    file: fileName,
                    isWriteAccess,
                };
            });
        }

        private getDiagnosticsWorker(args: protocol.FileRequestArgs, selector: (project: Project, file: string) => Diagnostic[]) {
            const file = normalizePath(args.file);
            const project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }
            if (project.languageServiceDiabled) {
                throw Errors.ProjectLanguageServiceDisabled;
            }
            const diagnostics = selector(project, file);
            return ts.map(diagnostics, originalDiagnostic => formatDiag(file, project, originalDiagnostic));
        }

        private getSyntacticDiagnosticsSync(args: protocol.FileRequestArgs): protocol.Diagnostic[] {
            return this.getDiagnosticsWorker(args, (project, file) => project.compilerService.languageService.getSyntacticDiagnostics(file));
        }

        private getSemanticDiagnosticsSync(args: protocol.FileRequestArgs): protocol.Diagnostic[] {
            return this.getDiagnosticsWorker(args, (project, file) => project.compilerService.languageService.getSemanticDiagnostics(file));
        }

        private getDocumentHighlights(line: number, offset: number, fileName: string, filesToSearch: string[]): protocol.DocumentHighlightsItem[] {
            fileName = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(fileName);

            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const { compilerService } = project;
            const position = compilerService.host.lineOffsetToPosition(fileName, line, offset);

            const documentHighlights = compilerService.languageService.getDocumentHighlights(fileName, position, filesToSearch);

            if (!documentHighlights) {
                return undefined;
            }

            return documentHighlights.map(convertToDocumentHighlightsItem);

            function convertToDocumentHighlightsItem(documentHighlights: ts.DocumentHighlights): ts.server.protocol.DocumentHighlightsItem {
                const { fileName, highlightSpans } = documentHighlights;

                return {
                    file: fileName,
                    highlightSpans: highlightSpans.map(convertHighlightSpan)
                };

                function convertHighlightSpan(highlightSpan: ts.HighlightSpan): ts.server.protocol.HighlightSpan {
                    const { textSpan, kind } = highlightSpan;
                    const start = compilerService.host.positionToLineOffset(fileName, textSpan.start);
                    const end = compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(textSpan));
                    return { start, end, kind };
                }
            }
        }

        private getProjectInfo(fileName: string, needFileNameList: boolean): protocol.ProjectInfo {
            fileName = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(fileName);
            if (!project) {
                throw Errors.NoProject;
            }

            const projectInfo: protocol.ProjectInfo = {
                configFileName: project.projectFilename,
                languageServiceDisabled: project.languageServiceDiabled
            };

            if (needFileNameList) {
                projectInfo.fileNames = project.getFileNames();
            }
            return projectInfo;
        }

        private getRenameLocations(line: number, offset: number, fileName: string, findInComments: boolean, findInStrings: boolean): protocol.RenameResponseBody {
            const file = ts.normalizePath(fileName);
            const info = this.projectService.getScriptInfo(file);
            const projects = this.projectService.findReferencingProjects(info);
            const projectsWithLanguageServiceEnabeld = ts.filter(projects, p => !p.languageServiceDiabled);
            if (projectsWithLanguageServiceEnabeld.length === 0) {
                throw Errors.NoProject;
            }

            const defaultProject = projectsWithLanguageServiceEnabeld[0];
            // The rename info should be the same for every project
            const defaultProjectCompilerService = defaultProject.compilerService;
            const position = defaultProjectCompilerService.host.lineOffsetToPosition(file, line, offset);
            const renameInfo = defaultProjectCompilerService.languageService.getRenameInfo(file, position);
            if (!renameInfo) {
                return undefined;
            }

            if (!renameInfo.canRename) {
                return {
                    info: renameInfo,
                    locs: []
                };
            }

            const fileSpans = combineProjectOutput(
                projectsWithLanguageServiceEnabeld,
                (project: Project) => {
                    const compilerService = project.compilerService;
                    const renameLocations = compilerService.languageService.findRenameLocations(file, position, findInStrings, findInComments);
                    if (!renameLocations) {
                        return [];
                    }

                    return renameLocations.map(location => (<protocol.FileSpan>{
                        file: location.fileName,
                        start: compilerService.host.positionToLineOffset(location.fileName, location.textSpan.start),
                        end: compilerService.host.positionToLineOffset(location.fileName, ts.textSpanEnd(location.textSpan)),
                    }));
                },
                compareRenameLocation,
                (a, b) => a.file === b.file && a.start.line === b.start.line && a.start.offset === b.start.offset
            );
            const locs = fileSpans.reduce<protocol.SpanGroup[]>((accum, cur) => {
                let curFileAccum: protocol.SpanGroup;
                if (accum.length > 0) {
                    curFileAccum = accum[accum.length - 1];
                    if (curFileAccum.file !== cur.file) {
                        curFileAccum = undefined;
                    }
                }
                if (!curFileAccum) {
                    curFileAccum = { file: cur.file, locs: [] };
                    accum.push(curFileAccum);
                }
                curFileAccum.locs.push({ start: cur.start, end: cur.end });
                return accum;
            }, []);

            return { info: renameInfo, locs };

            function compareRenameLocation(a: protocol.FileSpan, b: protocol.FileSpan) {
                if (a.file < b.file) {
                    return -1;
                }
                else if (a.file > b.file) {
                    return 1;
                }
                else {
                    // reverse sort assuming no overlap
                    if (a.start.line < b.start.line) {
                        return 1;
                    }
                    else if (a.start.line > b.start.line) {
                        return -1;
                    }
                    else {
                        return b.start.offset - a.start.offset;
                    }
                }
            }
        }

        private getReferences(line: number, offset: number, fileName: string): protocol.ReferencesResponseBody {
            const file = ts.normalizePath(fileName);
            const info = this.projectService.getScriptInfo(file);
            const projects = this.projectService.findReferencingProjects(info);
            const projectsWithLanguageServiceEnabeld = ts.filter(projects, p => !p.languageServiceDiabled);
            if (projectsWithLanguageServiceEnabeld.length === 0) {
                throw Errors.NoProject;
            }

            const defaultProject = projectsWithLanguageServiceEnabeld[0];
            const position = defaultProject.compilerService.host.lineOffsetToPosition(file, line, offset);
            const nameInfo = defaultProject.compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!nameInfo) {
                return undefined;
            }

            const displayString = ts.displayPartsToString(nameInfo.displayParts);
            const nameSpan = nameInfo.textSpan;
            const nameColStart = defaultProject.compilerService.host.positionToLineOffset(file, nameSpan.start).offset;
            const nameText = defaultProject.compilerService.host.getScriptSnapshot(file).getText(nameSpan.start, ts.textSpanEnd(nameSpan));
            const refs = combineProjectOutput<protocol.ReferencesResponseItem>(
                projectsWithLanguageServiceEnabeld,
                (project: Project) => {
                    const compilerService = project.compilerService;
                    const references = compilerService.languageService.getReferencesAtPosition(file, position);
                    if (!references) {
                        return [];
                    }

                    return references.map(ref => {
                        const start = compilerService.host.positionToLineOffset(ref.fileName, ref.textSpan.start);
                        const refLineSpan = compilerService.host.lineToTextSpan(ref.fileName, start.line - 1);
                        const snap = compilerService.host.getScriptSnapshot(ref.fileName);
                        const lineText = snap.getText(refLineSpan.start, ts.textSpanEnd(refLineSpan)).replace(/\r|\n/g, "");
                        return {
                            file: ref.fileName,
                            start: start,
                            lineText: lineText,
                            end: compilerService.host.positionToLineOffset(ref.fileName, ts.textSpanEnd(ref.textSpan)),
                            isWriteAccess: ref.isWriteAccess,
                            isDefinition: ref.isDefinition
                        };
                    });
                },
                compareFileStart,
                areReferencesResponseItemsForTheSameLocation
            );

            return {
                refs,
                symbolName: nameText,
                symbolStartOffset: nameColStart,
                symbolDisplayString: displayString
            };

            function areReferencesResponseItemsForTheSameLocation(a: protocol.ReferencesResponseItem, b: protocol.ReferencesResponseItem) {
                if (a && b) {
                    return a.file === b.file &&
                        a.start === b.start &&
                        a.end === b.end;
                }
                return false;
            }
        }

        /**
         * @param fileName is the name of the file to be opened
         * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
         */
        private openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind) {
            const file = ts.normalizePath(fileName);
            const { configFileName, configFileErrors } = this.projectService.openClientFile(file, fileContent, scriptKind);
            if (configFileErrors) {
                this.configFileDiagnosticEvent(fileName, configFileName, configFileErrors);
            }
        }

        private getQuickInfo(line: number, offset: number, fileName: string): protocol.QuickInfoResponseBody {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);
            const quickInfo = compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!quickInfo) {
                return undefined;
            }

            const displayString = ts.displayPartsToString(quickInfo.displayParts);
            const docString = ts.displayPartsToString(quickInfo.documentation);
            return {
                kind: quickInfo.kind,
                kindModifiers: quickInfo.kindModifiers,
                start: compilerService.host.positionToLineOffset(file, quickInfo.textSpan.start),
                end: compilerService.host.positionToLineOffset(file, ts.textSpanEnd(quickInfo.textSpan)),
                displayString: displayString,
                documentation: docString,
            };
        }

        private getFormattingEditsForRange(line: number, offset: number, endLine: number, endOffset: number, fileName: string): protocol.CodeEdit[] {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const startPosition = compilerService.host.lineOffsetToPosition(file, line, offset);
            const endPosition = compilerService.host.lineOffsetToPosition(file, endLine, endOffset);

            // TODO: avoid duplicate code (with formatonkey)
            const edits = compilerService.languageService.getFormattingEditsForRange(file, startPosition, endPosition,
                this.projectService.getFormatCodeOptions(file));
            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineOffset(file, edit.span.start),
                    end: compilerService.host.positionToLineOffset(file, ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getFormattingEditsAfterKeystroke(line: number, offset: number, key: string, fileName: string): protocol.CodeEdit[] {
            const file = ts.normalizePath(fileName);

            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);
            const formatOptions = this.projectService.getFormatCodeOptions(file);
            const edits = compilerService.languageService.getFormattingEditsAfterKeystroke(file, position, key,
                formatOptions);
            // Check whether we should auto-indent. This will be when
            // the position is on a line containing only whitespace.
            // This should leave the edits returned from
            // getFormattingEditsAfterKeystroke either empty or pertaining
            // only to the previous line.  If all this is true, then
            // add edits necessary to properly indent the current line.
            if ((key == "\n") && ((!edits) || (edits.length === 0) || allEditsBeforePos(edits, position))) {
                const scriptInfo = compilerService.host.getScriptInfo(file);
                if (scriptInfo) {
                    const lineInfo = scriptInfo.getLineInfo(line);
                    if (lineInfo && (lineInfo.leaf) && (lineInfo.leaf.text)) {
                        const lineText = lineInfo.leaf.text;
                        if (lineText.search("\\S") < 0) {
                            // TODO: get these options from host
                            const editorOptions: ts.EditorOptions = {
                                BaseIndentSize: formatOptions.BaseIndentSize,
                                IndentSize: formatOptions.IndentSize,
                                TabSize: formatOptions.TabSize,
                                NewLineCharacter: formatOptions.NewLineCharacter,
                                ConvertTabsToSpaces: formatOptions.ConvertTabsToSpaces,
                                IndentStyle: ts.IndentStyle.Smart,
                            };
                            const preferredIndent = compilerService.languageService.getIndentationAtPosition(file, position, editorOptions);
                            let hasIndent = 0;
                            let i: number, len: number;
                            for (i = 0, len = lineText.length; i < len; i++) {
                                if (lineText.charAt(i) == " ") {
                                    hasIndent++;
                                }
                                else if (lineText.charAt(i) == "\t") {
                                    hasIndent += editorOptions.TabSize;
                                }
                                else {
                                    break;
                                }
                            }
                            // i points to the first non whitespace character
                            if (preferredIndent !== hasIndent) {
                                const firstNoWhiteSpacePosition = lineInfo.offset + i;
                                edits.push({
                                    span: ts.createTextSpanFromBounds(lineInfo.offset, firstNoWhiteSpacePosition),
                                    newText: generateIndentString(preferredIndent, editorOptions)
                                });
                            }
                        }
                    }
                }
            }

            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineOffset(file,
                        edit.span.start),
                    end: compilerService.host.positionToLineOffset(file,
                        ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getCompletions(line: number, offset: number, prefix: string, fileName: string): protocol.CompletionEntry[] {
            if (!prefix) {
                prefix = "";
            }
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);

            const completions = compilerService.languageService.getCompletionsAtPosition(file, position);
            if (!completions) {
                return undefined;
            }

            return completions.entries.reduce((result: protocol.CompletionEntry[], entry: ts.CompletionEntry) => {
                if (completions.isMemberCompletion || (entry.name.toLowerCase().indexOf(prefix.toLowerCase()) === 0)) {
                    result.push(entry);
                }
                return result;
            }, []).sort((a, b) => a.name.localeCompare(b.name));
        }

        private getCompletionEntryDetails(line: number, offset: number,
            entryNames: string[], fileName: string): protocol.CompletionEntryDetails[] {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);

            return entryNames.reduce((accum: protocol.CompletionEntryDetails[], entryName: string) => {
                const details = compilerService.languageService.getCompletionEntryDetails(file, position, entryName);
                if (details) {
                    accum.push(details);
                }
                return accum;
            }, []);
        }

        private getSignatureHelpItems(line: number, offset: number, fileName: string): protocol.SignatureHelpItems {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);
            const helpItems = compilerService.languageService.getSignatureHelpItems(file, position);
            if (!helpItems) {
                return undefined;
            }

            const span = helpItems.applicableSpan;
            const result: protocol.SignatureHelpItems = {
                items: helpItems.items,
                applicableSpan: {
                    start: compilerService.host.positionToLineOffset(file, span.start),
                    end: compilerService.host.positionToLineOffset(file, span.start + span.length)
                },
                selectedItemIndex: helpItems.selectedItemIndex,
                argumentIndex: helpItems.argumentIndex,
                argumentCount: helpItems.argumentCount,
            };

            return result;
        }

        private getDiagnostics(delay: number, fileNames: string[]) {
            const checkList = fileNames.reduce((accum: PendingErrorCheck[], fileName: string) => {
                fileName = ts.normalizePath(fileName);
                const project = this.projectService.getProjectForFile(fileName);
                if (project && !project.languageServiceDiabled) {
                    accum.push({ fileName, project });
                }
                return accum;
            }, []);

            if (checkList.length > 0) {
                this.updateErrorCheck(checkList, this.changeSeq, (n) => n === this.changeSeq, delay);
            }
        }

        private change(line: number, offset: number, endLine: number, endOffset: number, insertString: string, fileName: string) {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (project && !project.languageServiceDiabled) {
                const compilerService = project.compilerService;
                const start = compilerService.host.lineOffsetToPosition(file, line, offset);
                const end = compilerService.host.lineOffsetToPosition(file, endLine, endOffset);
                if (start >= 0) {
                    compilerService.host.editScript(file, start, end, insertString);
                    this.changeSeq++;
                }
                this.updateProjectStructure(this.changeSeq, (n) => n === this.changeSeq);
            }
        }

        private reload(fileName: string, tempFileName: string, reqSeq = 0) {
            const file = ts.normalizePath(fileName);
            const tmpfile = ts.normalizePath(tempFileName);
            const project = this.projectService.getProjectForFile(file);
            if (project && !project.languageServiceDiabled) {
                this.changeSeq++;
                // make sure no changes happen before this one is finished
                project.compilerService.host.reloadScript(file, tmpfile, () => {
                    this.output(undefined, CommandNames.Reload, reqSeq);
                });
            }
        }

        private saveToTmp(fileName: string, tempFileName: string) {
            const file = ts.normalizePath(fileName);
            const tmpfile = ts.normalizePath(tempFileName);

            const project = this.projectService.getProjectForFile(file);
            if (project && !project.languageServiceDiabled) {
                project.compilerService.host.saveTo(file, tmpfile);
            }
        }

        private closeClientFile(fileName: string) {
            if (!fileName) {
                return;
            }
            const file = ts.normalizePath(fileName);
            this.projectService.closeClientFile(file);
        }

        private decorateNavigationBarItem(project: Project, fileName: string, items: ts.NavigationBarItem[], lineIndex: LineIndex): protocol.NavigationBarItem[] {
            if (!items) {
                return undefined;
            }

            const compilerService = project.compilerService;

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers,
                spans: item.spans.map(span => ({
                    start: compilerService.host.positionToLineOffset(fileName, span.start, lineIndex),
                    end: compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(span), lineIndex)
                })),
                childItems: this.decorateNavigationBarItem(project, fileName, item.childItems, lineIndex),
                indent: item.indent
            }));
        }

        private getNavigationBarItems(fileName: string): protocol.NavigationBarItem[] {
            const file = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const items = compilerService.languageService.getNavigationBarItems(file);
            if (!items) {
                return undefined;
            }

            return this.decorateNavigationBarItem(project, fileName, items, compilerService.host.getLineIndex(fileName));
        }

        private getNavigateToItems(searchValue: string, fileName: string, maxResultCount?: number): protocol.NavtoItem[] {
            const file = ts.normalizePath(fileName);
            const info = this.projectService.getScriptInfo(file);
            const projects = this.projectService.findReferencingProjects(info);
            const projectsWithLanguageServiceEnabeld = ts.filter(projects, p => !p.languageServiceDiabled);
            if (projectsWithLanguageServiceEnabeld.length === 0) {
                throw Errors.NoProject;
            }

            const allNavToItems = combineProjectOutput(
                projectsWithLanguageServiceEnabeld,
                (project: Project) => {
                    const compilerService = project.compilerService;
                    const navItems = compilerService.languageService.getNavigateToItems(searchValue, maxResultCount);
                    if (!navItems) {
                        return [];
                    }

                    return navItems.map((navItem) => {
                        const start = compilerService.host.positionToLineOffset(navItem.fileName, navItem.textSpan.start);
                        const end = compilerService.host.positionToLineOffset(navItem.fileName, ts.textSpanEnd(navItem.textSpan));
                        const bakedItem: protocol.NavtoItem = {
                            name: navItem.name,
                            kind: navItem.kind,
                            file: navItem.fileName,
                            start: start,
                            end: end,
                        };
                        if (navItem.kindModifiers && (navItem.kindModifiers !== "")) {
                            bakedItem.kindModifiers = navItem.kindModifiers;
                        }
                        if (navItem.matchKind !== "none") {
                            bakedItem.matchKind = navItem.matchKind;
                        }
                        if (navItem.containerName && (navItem.containerName.length > 0)) {
                            bakedItem.containerName = navItem.containerName;
                        }
                        if (navItem.containerKind && (navItem.containerKind.length > 0)) {
                            bakedItem.containerKind = navItem.containerKind;
                        }
                        return bakedItem;
                    });
                },
                /*comparer*/ undefined,
                areNavToItemsForTheSameLocation
            );
            return allNavToItems;

            function areNavToItemsForTheSameLocation(a: protocol.NavtoItem, b: protocol.NavtoItem) {
                if (a && b) {
                    return a.file === b.file &&
                        a.start === b.start &&
                        a.end === b.end;
                }
                return false;
            }
        }

        private getBraceMatching(line: number, offset: number, fileName: string): protocol.TextSpan[] {
            const file = ts.normalizePath(fileName);

            const project = this.projectService.getProjectForFile(file);
            if (!project || project.languageServiceDiabled) {
                throw Errors.NoProject;
            }

            const compilerService = project.compilerService;
            const position = compilerService.host.lineOffsetToPosition(file, line, offset);

            const spans = compilerService.languageService.getBraceMatchingAtPosition(file, position);
            if (!spans) {
                return undefined;
            }

            return spans.map(span => ({
                start: compilerService.host.positionToLineOffset(file, span.start),
                end: compilerService.host.positionToLineOffset(file, span.start + span.length)
            }));
        }

        getDiagnosticsForProject(delay: number, fileName: string) {
            const { fileNames, languageServiceDisabled } = this.getProjectInfo(fileName, /*needFileNameList*/ true);
            if (languageServiceDisabled) {
                return;
            }

            // No need to analyze lib.d.ts
            let fileNamesInProject = fileNames.filter((value, index, array) => value.indexOf("lib.d.ts") < 0);

            // Sort the file name list to make the recently touched files come first
            const highPriorityFiles: string[] = [];
            const mediumPriorityFiles: string[] = [];
            const lowPriorityFiles: string[] = [];
            const veryLowPriorityFiles: string[] = [];
            const normalizedFileName = ts.normalizePath(fileName);
            const project = this.projectService.getProjectForFile(normalizedFileName);
            for (const fileNameInProject of fileNamesInProject) {
                if (this.getCanonicalFileName(fileNameInProject) == this.getCanonicalFileName(fileName))
                    highPriorityFiles.push(fileNameInProject);
                else {
                    const info = this.projectService.getScriptInfo(fileNameInProject);
                    if (!info.isOpen) {
                        if (fileNameInProject.indexOf(".d.ts") > 0)
                            veryLowPriorityFiles.push(fileNameInProject);
                        else
                            lowPriorityFiles.push(fileNameInProject);
                    }
                    else
                        mediumPriorityFiles.push(fileNameInProject);
                }
            }

            fileNamesInProject = highPriorityFiles.concat(mediumPriorityFiles).concat(lowPriorityFiles).concat(veryLowPriorityFiles);

            if (fileNamesInProject.length > 0) {
                const checkList = fileNamesInProject.map<PendingErrorCheck>((fileName: string) => {
                    const normalizedFileName = ts.normalizePath(fileName);
                    return { fileName: normalizedFileName, project };
                });
                // Project level error analysis runs on background files too, therefore
                // doesn't require the file to be opened
                this.updateErrorCheck(checkList, this.changeSeq, (n) => n == this.changeSeq, delay, 200, /*requireOpen*/ false);
            }
        }

        getCanonicalFileName(fileName: string) {
            const name = this.host.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            return ts.normalizePath(name);
        }

        exit() {
        }

        private requiredResponse(response: any) {
            return { response, responseRequired: true };
        }

        private handlers = createMap<(request: protocol.Request) => { response?: any, responseRequired?: boolean }>({
            [CommandNames.Exit]: () => {
                this.exit();
                return { responseRequired: false };
            },
            [CommandNames.Definition]: (request: protocol.Request) => {
                const defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return { response: this.getDefinition(defArgs.line, defArgs.offset, defArgs.file), responseRequired: true };
            },
            [CommandNames.TypeDefinition]: (request: protocol.Request) => {
                const defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return { response: this.getTypeDefinition(defArgs.line, defArgs.offset, defArgs.file), responseRequired: true };
            },
            [CommandNames.References]: (request: protocol.Request) => {
                const defArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return { response: this.getReferences(defArgs.line, defArgs.offset, defArgs.file), responseRequired: true };
            },
            [CommandNames.Rename]: (request: protocol.Request) => {
                const renameArgs = <protocol.RenameRequestArgs>request.arguments;
                return { response: this.getRenameLocations(renameArgs.line, renameArgs.offset, renameArgs.file, renameArgs.findInComments, renameArgs.findInStrings), responseRequired: true };
            },
            [CommandNames.Open]: (request: protocol.Request) => {
                const openArgs = <protocol.OpenRequestArgs>request.arguments;
                let scriptKind: ScriptKind;
                switch (openArgs.scriptKindName) {
                    case "TS":
                        scriptKind = ScriptKind.TS;
                        break;
                    case "JS":
                        scriptKind = ScriptKind.JS;
                        break;
                    case "TSX":
                        scriptKind = ScriptKind.TSX;
                        break;
                    case "JSX":
                        scriptKind = ScriptKind.JSX;
                        break;
                }
                this.openClientFile(openArgs.file, openArgs.fileContent, scriptKind);
                return { responseRequired: false };
            },
            [CommandNames.Quickinfo]: (request: protocol.Request) => {
                const quickinfoArgs = <protocol.FileLocationRequestArgs>request.arguments;
                return { response: this.getQuickInfo(quickinfoArgs.line, quickinfoArgs.offset, quickinfoArgs.file), responseRequired: true };
            },
            [CommandNames.Format]: (request: protocol.Request) => {
                const formatArgs = <protocol.FormatRequestArgs>request.arguments;
                return { response: this.getFormattingEditsForRange(formatArgs.line, formatArgs.offset, formatArgs.endLine, formatArgs.endOffset, formatArgs.file), responseRequired: true };
            },
            [CommandNames.Formatonkey]: (request: protocol.Request) => {
                const formatOnKeyArgs = <protocol.FormatOnKeyRequestArgs>request.arguments;
                return { response: this.getFormattingEditsAfterKeystroke(formatOnKeyArgs.line, formatOnKeyArgs.offset, formatOnKeyArgs.key, formatOnKeyArgs.file), responseRequired: true };
            },
            [CommandNames.Completions]: (request: protocol.Request) => {
                const completionsArgs = <protocol.CompletionsRequestArgs>request.arguments;
                return { response: this.getCompletions(completionsArgs.line, completionsArgs.offset, completionsArgs.prefix, completionsArgs.file), responseRequired: true };
            },
            [CommandNames.CompletionDetails]: (request: protocol.Request) => {
                const completionDetailsArgs = <protocol.CompletionDetailsRequestArgs>request.arguments;
                return {
                    response: this.getCompletionEntryDetails(completionDetailsArgs.line, completionDetailsArgs.offset,
                        completionDetailsArgs.entryNames, completionDetailsArgs.file), responseRequired: true
                };
            },
            [CommandNames.SignatureHelp]: (request: protocol.Request) => {
                const signatureHelpArgs = <protocol.SignatureHelpRequestArgs>request.arguments;
                return { response: this.getSignatureHelpItems(signatureHelpArgs.line, signatureHelpArgs.offset, signatureHelpArgs.file), responseRequired: true };
            },
            [CommandNames.SemanticDiagnosticsSync]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getSemanticDiagnosticsSync(request.arguments));
            },
            [CommandNames.SyntacticDiagnosticsSync]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getSyntacticDiagnosticsSync(request.arguments));
            },
            [CommandNames.Geterr]: (request: protocol.Request) => {
                const geterrArgs = <protocol.GeterrRequestArgs>request.arguments;
                return { response: this.getDiagnostics(geterrArgs.delay, geterrArgs.files), responseRequired: false };
            },
            [CommandNames.GeterrForProject]: (request: protocol.Request) => {
                const { file, delay } = <protocol.GeterrForProjectRequestArgs>request.arguments;
                return { response: this.getDiagnosticsForProject(delay, file), responseRequired: false };
            },
            [CommandNames.Change]: (request: protocol.Request) => {
                const changeArgs = <protocol.ChangeRequestArgs>request.arguments;
                this.change(changeArgs.line, changeArgs.offset, changeArgs.endLine, changeArgs.endOffset,
                    changeArgs.insertString, changeArgs.file);
                return { responseRequired: false };
            },
            [CommandNames.Configure]: (request: protocol.Request) => {
                const configureArgs = <protocol.ConfigureRequestArguments>request.arguments;
                this.projectService.setHostConfiguration(configureArgs);
                this.output(undefined, CommandNames.Configure, request.seq);
                return { responseRequired: false };
            },
            [CommandNames.Reload]: (request: protocol.Request) => {
                const reloadArgs = <protocol.ReloadRequestArgs>request.arguments;
                this.reload(reloadArgs.file, reloadArgs.tmpfile, request.seq);
                return { response: { reloadFinished: true }, responseRequired: true };
            },
            [CommandNames.Saveto]: (request: protocol.Request) => {
                const savetoArgs = <protocol.SavetoRequestArgs>request.arguments;
                this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
                return { responseRequired: false };
            },
            [CommandNames.Close]: (request: protocol.Request) => {
                const closeArgs = <protocol.FileRequestArgs>request.arguments;
                this.closeClientFile(closeArgs.file);
                return { responseRequired: false };
            },
            [CommandNames.Navto]: (request: protocol.Request) => {
                const navtoArgs = <protocol.NavtoRequestArgs>request.arguments;
                return { response: this.getNavigateToItems(navtoArgs.searchValue, navtoArgs.file, navtoArgs.maxResultCount), responseRequired: true };
            },
            [CommandNames.Brace]: (request: protocol.Request) => {
                const braceArguments = <protocol.FileLocationRequestArgs>request.arguments;
                return { response: this.getBraceMatching(braceArguments.line, braceArguments.offset, braceArguments.file), responseRequired: true };
            },
            [CommandNames.NavBar]: (request: protocol.Request) => {
                const navBarArgs = <protocol.FileRequestArgs>request.arguments;
                return { response: this.getNavigationBarItems(navBarArgs.file), responseRequired: true };
            },
            [CommandNames.Occurrences]: (request: protocol.Request) => {
                const { line, offset, file: fileName } = <protocol.FileLocationRequestArgs>request.arguments;
                return { response: this.getOccurrences(line, offset, fileName), responseRequired: true };
            },
            [CommandNames.DocumentHighlights]: (request: protocol.Request) => {
                const { line, offset, file: fileName, filesToSearch } = <protocol.DocumentHighlightsRequestArgs>request.arguments;
                return { response: this.getDocumentHighlights(line, offset, fileName, filesToSearch), responseRequired: true };
            },
            [CommandNames.ProjectInfo]: (request: protocol.Request) => {
                const { file, needFileNameList } = <protocol.ProjectInfoRequestArgs>request.arguments;
                return { response: this.getProjectInfo(file, needFileNameList), responseRequired: true };
            },
            [CommandNames.ReloadProjects]: (request: protocol.ReloadProjectsRequest) => {
                this.reloadProjects();
                return { responseRequired: false };
            }
        });

        public addProtocolHandler(command: string, handler: (request: protocol.Request) => { response?: any, responseRequired: boolean }) {
            if (command in this.handlers) {
                throw new Error(`Protocol handler already exists for command "${command}"`);
            }
            this.handlers[command] = handler;
        }

        public executeCommand(request: protocol.Request): { response?: any, responseRequired?: boolean } {
            const handler = this.handlers[request.command];
            if (handler) {
                return handler(request);
            }
            else {
                this.projectService.log("Unrecognized JSON command: " + JSON.stringify(request));
                this.output(undefined, CommandNames.Unknown, request.seq, "Unrecognized JSON command: " + request.command);
                return { responseRequired: false };
            }
        }

        public onMessage(message: string) {
            let start: number[];
            if (this.logger.isVerbose()) {
                this.logger.info("request: " + message);
                start = this.hrtime();
            }
            let request: protocol.Request;
            try {
                request = <protocol.Request>JSON.parse(message);
                const {response, responseRequired} = this.executeCommand(request);

                if (this.logger.isVerbose()) {
                    const elapsed = this.hrtime(start);
                    const seconds = elapsed[0];
                    const nanoseconds = elapsed[1];
                    const elapsedMs = ((1e9 * seconds) + nanoseconds) / 1000000.0;
                    let leader = "Elapsed time (in milliseconds)";
                    if (!responseRequired) {
                        leader = "Async elapsed time (in milliseconds)";
                    }
                    this.logger.msg(leader + ": " + elapsedMs.toFixed(4).toString(), "Perf");
                }
                if (response) {
                    this.output(response, request.command, request.seq);
                }
                else if (responseRequired) {
                    this.output(undefined, request.command, request.seq, "No content available.");
                }
            }
            catch (err) {
                if (err instanceof OperationCanceledException) {
                    // Handle cancellation exceptions
                }
                this.logError(err, message);
                this.output(
                    undefined,
                    request ? request.command : CommandNames.Unknown,
                    request ? request.seq : 0,
                    "Error processing request. " + (<StackTraceError>err).message + "\n" + (<StackTraceError>err).stack);
            }
        }
    }
}
