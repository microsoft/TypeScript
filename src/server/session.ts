/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="editorServices.ts" />

namespace ts.server {
    interface StackTraceError extends Error {
        stack?: string;
    }

    export interface CompressedData {
        length: number;
        compressionKind: string;
        data: any;
    }

    function hrTimeToMilliseconds(time: number[]): number {
        const seconds = time[0];
        const nanoseconds = time[1];
        return ((1e9 * seconds) + nanoseconds) / 1000000.0;
    }

    export interface ServerHost extends System {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
        clearImmediate(timeoutId: any): void;
        writeCompressedData(prefix: string, data: CompressedData, suffix: string): void;
    }

    interface FileStart {
        file: string;
        start: ILineInfo;
    }

    function compareNumber(a: number, b: number) {
        return a - b;
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

    function formatDiag(fileName: NormalizedPath, project: Project, diag: ts.Diagnostic): protocol.Diagnostic {
        const scriptInfo = project.getScriptInfoForNormalizedPath(fileName);
        return {
            start: scriptInfo.positionToLineOffset(diag.start),
            end: scriptInfo.positionToLineOffset(diag.start + diag.length),
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
        fileName: NormalizedPath;
        project: Project;
    }

    function allEditsBeforePos(edits: ts.TextChange[], pos: number) {
        for (const edit of edits) {
            if (textSpanEnd(edit.span) >= pos) {
                return false;
            }
        }
        return true;
    }

    export namespace CommandNames {
        export const Brace = "brace";
        export const BraceFull = "brace-full";
        export const BraceCompletion = "braceCompletion";
        export const Change = "change";
        export const Close = "close";
        export const Completions = "completions";
        export const CompletionsFull = "completions-full";
        export const CompletionDetails = "completionEntryDetails";
        export const CompileOnSaveAffectedFileList = "compileOnSaveAffectedFileList";
        export const CompileOnSaveEmitFile = "compileOnSaveEmitFile";
        export const Configure = "configure";
        export const Definition = "definition";
        export const DefinitionFull = "definition-full";
        export const Exit = "exit";
        export const Format = "format";
        export const Formatonkey = "formatonkey";
        export const FormatFull = "format-full";
        export const FormatonkeyFull = "formatonkey-full";
        export const FormatRangeFull = "formatRange-full";
        export const Geterr = "geterr";
        export const GeterrForProject = "geterrForProject";
        export const SemanticDiagnosticsSync = "semanticDiagnosticsSync";
        export const SyntacticDiagnosticsSync = "syntacticDiagnosticsSync";
        export const NavBar = "navbar";
        export const NavBarFull = "navbar-full";
        export const Navto = "navto";
        export const NavtoFull = "navto-full";
        export const Occurrences = "occurrences";
        export const DocumentHighlights = "documentHighlights";
        export const DocumentHighlightsFull = "documentHighlights-full";
        export const Open = "open";
        export const Quickinfo = "quickinfo";
        export const QuickinfoFull = "quickinfo-full";
        export const References = "references";
        export const ReferencesFull = "references-full";
        export const Reload = "reload";
        export const Rename = "rename";
        export const RenameInfoFull = "rename-full";
        export const RenameLocationsFull = "renameLocations-full";
        export const Saveto = "saveto";
        export const SignatureHelp = "signatureHelp";
        export const SignatureHelpFull = "signatureHelp-full";
        export const TypeDefinition = "typeDefinition";
        export const ProjectInfo = "projectInfo";
        export const ReloadProjects = "reloadProjects";
        export const Unknown = "unknown";
        export const OpenExternalProject = "openExternalProject";
        export const OpenExternalProjects = "openExternalProjects";
        export const CloseExternalProject = "closeExternalProject";
        export const SynchronizeProjectList = "synchronizeProjectList";
        export const ApplyChangedToOpenFiles = "applyChangedToOpenFiles";
        export const EncodedSemanticClassificationsFull = "encodedSemanticClassifications-full";
        export const Cleanup = "cleanup";
        export const OutliningSpans = "outliningSpans";
        export const TodoComments = "todoComments";
        export const Indentation = "indentation";
        export const DocCommentTemplate = "docCommentTemplate";
        export const CompilerOptionsDiagnosticsFull = "compilerOptionsDiagnostics-full";
        export const NameOrDottedNameSpan = "nameOrDottedNameSpan";
        export const BreakpointStatement = "breakpointStatement";
        export const CompilerOptionsForInferredProjects = "compilerOptionsForInferredProjects";
    }

    export class Session {
        protected projectService: ProjectService;
        private errorTimer: any; /*NodeJS.Timer | number*/
        private immediateId: any;
        private changeSeq = 0;

        constructor(
            private host: ServerHost,
            cancellationToken: HostCancellationToken,
            useSingleInferredProject: boolean,
            private byteLength: (buf: string, encoding?: string) => number,
            private maxUncompressedMessageSize: number,
            private compress: (s: string) => CompressedData,
            private hrtime: (start?: number[]) => number[],
            protected logger: Logger) {
            this.projectService =
                new ProjectService(host, logger, cancellationToken, useSingleInferredProject, (eventName, project, fileName) => {
                    this.handleEvent(eventName, project, fileName);
                });
        }

        private handleEvent(eventName: string, project: Project, fileName: NormalizedPath) {
            if (eventName == "context") {
                this.logger.info("got context event, updating diagnostics for" + fileName);
                this.updateErrorCheck([{ fileName, project }], this.changeSeq,
                    (n) => n === this.changeSeq, 100);
            }
        }

        public logError(err: Error, cmd: string) {
            let msg = "Exception on executing command " + cmd;
            if (err.message) {
                msg += ":\n" + err.message;
                if ((<StackTraceError>err).stack) {
                    msg += "\n" + (<StackTraceError>err).stack;
                }
            }
            this.logger.msg(msg, Msg.Err);
        }

        public send(msg: protocol.Message, canCompressResponse: boolean) {
            const verboseLogging = this.logger.hasLevel(LogLevel.verbose);

            const json = JSON.stringify(msg);
            if (verboseLogging) {
                this.logger.info(msg.type + ": " + json);
            }

            const len = this.byteLength(json, "utf8");
            if (len < this.maxUncompressedMessageSize || !canCompressResponse) {
                this.host.write(`Content-Length: ${1 + this.byteLength(json, "utf8")}\r\n\r\n${json}${this.host.newLine}`);
            }
            else {
                const start = verboseLogging && this.hrtime();
                const compressed = this.compress(json);
                if (verboseLogging) {
                    const elapsed = this.hrtime(start);
                    this.logger.info(`compressed message ${json.length} to ${compressed.length} in ${hrTimeToMilliseconds(elapsed)} ms using ${compressed.compressionKind}`);
                }
                this.host.writeCompressedData(`Content-Length: ${compressed.length + 1} ${compressed.compressionKind}\r\n\r\n`, compressed, this.host.newLine);
            }
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
            this.send(ev, /*canCompressResponse*/ false);
        }

        public event(info: any, eventName: string) {
            const ev: protocol.Event = {
                seq: 0,
                type: "event",
                event: eventName,
                body: info,
            };
            this.send(ev, /*canCompressResponse*/ false);
        }

        public output(info: any, cmdName: string, canCompressResponse: boolean, reqSeq = 0, errorMsg?: string) {
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
            this.send(res, canCompressResponse);
        }

        private getLocation(position: number, scriptInfo: ScriptInfo): protocol.Location {
            const { line, offset } = scriptInfo.positionToLineOffset(position);
            return { line, offset: offset + 1 };
        }

        private semanticCheck(file: NormalizedPath, project: Project) {
            try {
                const diags = project.getLanguageService().getSemanticDiagnostics(file);

                if (diags) {
                    const bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "semanticDiag");
                }
            }
            catch (err) {
                this.logError(err, "semantic check");
            }
        }

        private syntacticCheck(file: NormalizedPath, project: Project) {
            try {
                const diags = project.getLanguageService().getSyntacticDiagnostics(file);
                if (diags) {
                    const bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "syntaxDiag");
                }
            }
            catch (err) {
                this.logError(err, "syntactic check");
            }
        }

        private updateProjectStructure(seq: number, matchSeq: (seq: number) => boolean, ms = 1500) {
            this.host.setTimeout(() => {
                if (matchSeq(seq)) {
                    this.projectService.refreshInferredProjects();
                }
            }, ms);
        }

        private updateErrorCheck(checkList: PendingErrorCheck[], seq: number,
            matchSeq: (seq: number) => boolean, ms = 1500, followMs = 200, requireOpen = true) {
            if (followMs > ms) {
                followMs = ms;
            }
            if (this.errorTimer) {
                this.host.clearTimeout(this.errorTimer);
            }
            if (this.immediateId) {
                this.host.clearImmediate(this.immediateId);
                this.immediateId = undefined;
            }
            let index = 0;
            const checkOne = () => {
                if (matchSeq(seq)) {
                    const checkSpec = checkList[index];
                    index++;
                    if (checkSpec.project.containsFile(checkSpec.fileName, requireOpen)) {
                        this.syntacticCheck(checkSpec.fileName, checkSpec.project);
                        this.immediateId = this.host.setImmediate(() => {
                            this.semanticCheck(checkSpec.fileName, checkSpec.project);
                            this.immediateId = undefined;
                            if (checkList.length > index) {
                                this.errorTimer = this.host.setTimeout(checkOne, followMs);
                            }
                            else {
                                this.errorTimer = undefined;
                            }
                        });
                    }
                }
            };
            if ((checkList.length > index) && (matchSeq(seq))) {
                this.errorTimer = this.host.setTimeout(checkOne, ms);
            }
        }

        private cleanProjects(caption: string, projects: Project[]) {
            if (!projects) {
                return;
            }
            this.logger.info(`cleaning ${caption}`);
            for (const p of projects) {
                p.getLanguageService(/*ensureSynchronized*/ false).cleanupSemanticCache();
            }
        }

        private cleanup() {
            this.cleanProjects("inferred projects", this.projectService.inferredProjects);
            this.cleanProjects("configured projects", this.projectService.configuredProjects);
            this.cleanProjects("external projects", this.projectService.externalProjects);
            if (typeof global !== "undefined" && global.gc) {
                this.logger.info(`global.gc()`);
                global.gc();
                global.gc();
                global.gc();
            }
        }

        private getEncodedSemanticClassifications(args: protocol.FileSpanRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.getLanguageService().getEncodedSemanticClassifications(file, args);
        }

        private getProject(projectFileName: string) {
            return projectFileName && this.projectService.findProject(projectFileName);
        }

        private getCompilerOptionsDiagnostics(args: protocol.ProjectRequestArgs) {
            const project = this.getProject(args.projectFileName);
            return this.convertToDiagnosticsWithLinePosition(project.getLanguageService().getCompilerOptionsDiagnostics(), /*scriptInfo*/ undefined);
        }

        private convertToDiagnosticsWithLinePosition(diagnostics: Diagnostic[], scriptInfo: ScriptInfo) {
            return diagnostics.map(d => <protocol.DiagnosticWithLinePosition>{
                message: flattenDiagnosticMessageText(d.messageText, this.host.newLine),
                start: d.start,
                length: d.length,
                category: DiagnosticCategory[d.category].toLowerCase(),
                code: d.code,
                startLocation: scriptInfo && this.getLocation(d.start, scriptInfo),
                endLocation: scriptInfo && this.getLocation(d.start + d.length, scriptInfo)
            });
        }

        private getDiagnosticsWorker(args: protocol.FileRequestArgs, selector: (project: Project, file: string) => Diagnostic[], includeLinePosition: boolean) {
            const { project, file } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const diagnostics = selector(project, file);
            return includeLinePosition
                ? this.convertToDiagnosticsWithLinePosition(diagnostics, scriptInfo)
                : diagnostics.map(d => formatDiag(file, project, d));
        }

        private getDefinition(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.FileSpan[] | DefinitionInfo[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);

            const definitions = project.getLanguageService().getDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            if (simplifiedResult) {
                return definitions.map(def => {
                    const defScriptInfo = project.getScriptInfo(def.fileName);
                    return {
                        file: def.fileName,
                        start: defScriptInfo.positionToLineOffset(def.textSpan.start),
                        end: defScriptInfo.positionToLineOffset(ts.textSpanEnd(def.textSpan))
                    };
                });
            }
            else {
                return definitions;
            }
        }

        private getTypeDefinition(args: protocol.FileLocationRequestArgs): protocol.FileSpan[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);

            const definitions = project.getLanguageService().getTypeDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            return definitions.map(def => {
                const defScriptInfo = project.getScriptInfo(def.fileName);
                return {
                    file: def.fileName,
                    start: defScriptInfo.positionToLineOffset(def.textSpan.start),
                    end: defScriptInfo.positionToLineOffset(ts.textSpanEnd(def.textSpan))
                };
            });
        }

        private getOccurrences(args: protocol.FileLocationRequestArgs): protocol.OccurrencesResponseItem[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);

            const occurrences = project.getLanguageService().getOccurrencesAtPosition(file, position);

            if (!occurrences) {
                return undefined;
            }

            return occurrences.map(occurrence => {
                const { fileName, isWriteAccess, textSpan } = occurrence;
                const scriptInfo = project.getScriptInfo(fileName);
                const start = scriptInfo.positionToLineOffset(textSpan.start);
                const end = scriptInfo.positionToLineOffset(ts.textSpanEnd(textSpan));
                return {
                    start,
                    end,
                    file: fileName,
                    isWriteAccess,
                };
            });
        }

        private getSyntacticDiagnosticsSync(args: protocol.SyntacticDiagnosticsSyncRequestArgs): protocol.Diagnostic[] | protocol.DiagnosticWithLinePosition[] {
            return this.getDiagnosticsWorker(args, (project, file) => project.getLanguageService().getSyntacticDiagnostics(file), args.includeLinePosition);
        }

        private getSemanticDiagnosticsSync(args: protocol.SemanticDiagnosticsSyncRequestArgs): protocol.Diagnostic[] | protocol.DiagnosticWithLinePosition[] {
            return this.getDiagnosticsWorker(args, (project, file) => project.getLanguageService().getSemanticDiagnostics(file), args.includeLinePosition);
        }

        private getDocumentHighlights(args: protocol.DocumentHighlightsRequestArgs, simplifiedResult: boolean): protocol.DocumentHighlightsItem[] | DocumentHighlights[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);
            const documentHighlights = project.getLanguageService().getDocumentHighlights(file, position, args.filesToSearch);

            if (!documentHighlights) {
                return undefined;
            }

            if (simplifiedResult) {
                return documentHighlights.map(convertToDocumentHighlightsItem);
            }
            else {
                return documentHighlights;
            }

            function convertToDocumentHighlightsItem(documentHighlights: ts.DocumentHighlights): ts.server.protocol.DocumentHighlightsItem {
                const { fileName, highlightSpans } = documentHighlights;

                const scriptInfo = project.getScriptInfo(fileName);
                return {
                    file: fileName,
                    highlightSpans: highlightSpans.map(convertHighlightSpan)
                };

                function convertHighlightSpan(highlightSpan: ts.HighlightSpan): ts.server.protocol.HighlightSpan {
                    const { textSpan, kind } = highlightSpan;
                    const start = scriptInfo.positionToLineOffset(textSpan.start);
                    const end = scriptInfo.positionToLineOffset(ts.textSpanEnd(textSpan));
                    return { start, end, kind };
                }
            }
        }

        private setCompilerOptionsForInferredProjects(args: protocol.SetCompilerOptionsForInferredProjectsArgs): void {
            this.projectService.setCompilerOptionsForInferredProjects(args.options);
        }

        private getProjectInfo(args: protocol.ProjectInfoRequestArgs): protocol.ProjectInfo {
            return this.getProjectInfoWorker(args.file, args.projectFileName, args.needFileNameList);
        }

        private getProjectInfoWorker(uncheckedFileName: string, projectFileName: string, needFileNameList: boolean) {
            const { file, project } = this.getFileAndProjectWorker(uncheckedFileName, projectFileName, /*refreshInferredProjects*/ true, /*errorOnMissingProject*/ true);
            const projectInfo = {
                configFileName: project.getProjectName(),
                languageServiceDisabled: !project.languageServiceEnabled,
                fileNames: needFileNameList ? project.getFileNames() : undefined
            };
            return projectInfo;
        }

        private getRenameInfo(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);
            return project.getLanguageService().getRenameInfo(file, position);
        }

        private getProjects(args: protocol.FileRequestArgs) {
            let projects: Project[];
            if (args.projectFileName) {
                const project = this.getProject(args.projectFileName);
                if (project) {
                    projects = [project];
                }
            }
            else {
                const scriptInfo = this.projectService.getScriptInfo(args.file);
                projects = scriptInfo.containingProjects;
            }
            // ts.filter handles case when 'projects' is undefined 
            projects = filter(projects, p => p.languageServiceEnabled);
            if (!projects || !projects.length) {
                throw Errors.NoProject;
            }
            return projects;
        }

        private getRenameLocations(args: protocol.RenameRequestArgs, simplifiedResult: boolean): protocol.RenameResponseBody | RenameLocation[] {
            const file = toNormalizedPath(args.file);
            const info = this.projectService.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, info);
            const projects = this.getProjects(args);
            if (simplifiedResult) {

                const defaultProject = projects[0];
                // The rename info should be the same for every project
                const renameInfo = defaultProject.getLanguageService().getRenameInfo(file, position);
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
                    projects,
                    (project: Project) => {
                        const renameLocations = project.getLanguageService().findRenameLocations(file, position, args.findInStrings, args.findInComments);
                        if (!renameLocations) {
                            return [];
                        }

                        return renameLocations.map(location => {
                            const locationScriptInfo = project.getScriptInfo(location.fileName);
                            return <protocol.FileSpan>{
                                file: location.fileName,
                                start: locationScriptInfo.positionToLineOffset(location.textSpan.start),
                                end: locationScriptInfo.positionToLineOffset(ts.textSpanEnd(location.textSpan)),
                            };
                        });
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
            }
            else {
                return combineProjectOutput(
                    projects,
                    p => p.getLanguageService().findRenameLocations(file, position, args.findInStrings, args.findInComments),
                    /*comparer*/ undefined,
                    renameLocationIsEqualTo
                );
            }

            function renameLocationIsEqualTo(a: RenameLocation, b: RenameLocation) {
                if (a === b) {
                    return true;
                }
                if (!a || !b) {
                    return false;
                }
                return a.fileName === b.fileName &&
                    a.textSpan.start === b.textSpan.start &&
                    a.textSpan.length === b.textSpan.length;
            }

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

        private getReferences(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.ReferencesResponseBody | ReferencedSymbol[] {
            const file = toNormalizedPath(args.file);
            const projects = this.getProjects(args);

            const defaultProject = projects[0];
            const scriptInfo = defaultProject.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);
            if (simplifiedResult) {
                const nameInfo = defaultProject.getLanguageService().getQuickInfoAtPosition(file, position);
                if (!nameInfo) {
                    return undefined;
                }

                const displayString = ts.displayPartsToString(nameInfo.displayParts);
                const nameSpan = nameInfo.textSpan;
                const nameColStart = scriptInfo.positionToLineOffset(nameSpan.start).offset;
                const nameText = scriptInfo.snap().getText(nameSpan.start, ts.textSpanEnd(nameSpan));
                const refs = combineProjectOutput<protocol.ReferencesResponseItem>(
                    projects,
                    (project: Project) => {
                        const references = project.getLanguageService().getReferencesAtPosition(file, position);
                        if (!references) {
                            return [];
                        }

                        return references.map(ref => {
                            const refScriptInfo = project.getScriptInfo(ref.fileName);
                            const start = refScriptInfo.positionToLineOffset(ref.textSpan.start);
                            const refLineSpan = refScriptInfo.lineToTextSpan(start.line - 1);
                            const lineText = refScriptInfo.snap().getText(refLineSpan.start, ts.textSpanEnd(refLineSpan)).replace(/\r|\n/g, "");
                            return {
                                file: ref.fileName,
                                start: start,
                                lineText: lineText,
                                end: refScriptInfo.positionToLineOffset(ts.textSpanEnd(ref.textSpan)),
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
            }
            else {
                return combineProjectOutput(
                    projects,
                    project => project.getLanguageService().findReferences(file, position),
                    undefined,
                    // TODO: fixme
                    undefined
                );
            }

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
        private openClientFile(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind) {
            const { configFileName, configFileErrors } = this.projectService.openClientFileWithNormalizedPath(fileName, fileContent, scriptKind);
            if (configFileErrors) {
                this.configFileDiagnosticEvent(fileName, configFileName, configFileErrors);
            }
        }

        private getPosition(args: protocol.FileLocationRequestArgs, scriptInfo: ScriptInfo): number {
            return args.position !== undefined ? args.position : scriptInfo.lineOffsetToPosition(args.line, args.offset);
        }

        private getFileAndProject(args: protocol.FileRequestArgs, errorOnMissingProject = true) {
            return this.getFileAndProjectWorker(args.file, args.projectFileName, /*refreshInferredProjects*/ true, errorOnMissingProject);
        }

        private getFileAndProjectWithoutRefreshingInferredProjects(args: protocol.FileRequestArgs, errorOnMissingProject = true) {
            return this.getFileAndProjectWorker(args.file, args.projectFileName, /*refreshInferredProjects*/ false, errorOnMissingProject);
        }

        private getFileAndProjectWorker(uncheckedFileName: string, projectFileName: string, refreshInferredProjects: boolean,  errorOnMissingProject: boolean) {
            const file = toNormalizedPath(uncheckedFileName);
            const project: Project = this.getProject(projectFileName) || this.projectService.getDefaultProjectForFile(file, refreshInferredProjects);
            if (!project && errorOnMissingProject) {
                throw Errors.NoProject;
            }
            return { file, project };
        }

        private getOutliningSpans(args: protocol.FileRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            return project.getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file);
        }

        private getTodoComments(args: protocol.TodoCommentRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            return project.getLanguageService().getTodoComments(file, args.descriptors);
        }

        private getDocCommentTemplate(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);
            return project.getLanguageService(/*ensureSynchronized*/ false).getDocCommentTemplateAtPosition(file, position);
        }

        private getIndentation(args: protocol.IndentationRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const position = this.getPosition(args, project.getScriptInfoForNormalizedPath(file));
            const options = args.options || this.projectService.getFormatCodeOptions(file);
            const indentation = project.getLanguageService(/*ensureSynchronized*/ false).getIndentationAtPosition(file, position, options);
            return { position, indentation };
        }

        private getBreakpointStatement(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const position = this.getPosition(args, project.getScriptInfoForNormalizedPath(file));
            return project.getLanguageService(/*ensureSynchronized*/ false).getBreakpointStatementAtPosition(file, position);
        }

        private getNameOrDottedNameSpan(args: protocol.FileLocationRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const position = this.getPosition(args, project.getScriptInfoForNormalizedPath(file));
            return project.getLanguageService(/*ensureSynchronized*/ false).getNameOrDottedNameSpan(file, position, position);
        }

        private isValidBraceCompletion(args: protocol.BraceCompletionRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const position = this.getPosition(args, project.getScriptInfoForNormalizedPath(file));
            return project.getLanguageService(/*ensureSynchronized*/ false).isValidBraceCompletionAtPosition(file, position, args.openingBrace.charCodeAt(0));
        }

        private getQuickInfoWorker(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.QuickInfoResponseBody | QuickInfo {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file, this.getPosition(args, scriptInfo));
            if (!quickInfo) {
                return undefined;
            }

            if (simplifiedResult) {
                const displayString = ts.displayPartsToString(quickInfo.displayParts);
                const docString = ts.displayPartsToString(quickInfo.documentation);
                return {
                    kind: quickInfo.kind,
                    kindModifiers: quickInfo.kindModifiers,
                    start: scriptInfo.positionToLineOffset(quickInfo.textSpan.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(quickInfo.textSpan)),
                    displayString: displayString,
                    documentation: docString,
                };
            }
            else {
                return quickInfo;
            }
        }

        private getFormattingEditsForRange(args: protocol.FormatRequestArgs): protocol.CodeEdit[] {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);

            const startPosition = scriptInfo.lineOffsetToPosition(args.line, args.offset);
            const endPosition = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);

            // TODO: avoid duplicate code (with formatonkey)
            const edits = project.getLanguageService(/*ensureSynchronized*/ false).getFormattingEditsForRange(file, startPosition, endPosition,
                this.projectService.getFormatCodeOptions(file));
            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: scriptInfo.positionToLineOffset(edit.span.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getFormattingEditsForRangeFull(args: protocol.FormatRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const options = args.options || this.projectService.getFormatCodeOptions(file);
            return project.getLanguageService(/*ensureSynchronized*/ false).getFormattingEditsForRange(file, args.position, args.endPosition, options);
        }

        private getFormattingEditsForDocumentFull(args: protocol.FormatRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const options = args.options || this.projectService.getFormatCodeOptions(file);
            return project.getLanguageService(/*ensureSynchronized*/ false).getFormattingEditsForDocument(file, options);
        }

        private getFormattingEditsAfterKeystrokeFull(args: protocol.FormatOnKeyRequestArgs) {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const options = args.options || this.projectService.getFormatCodeOptions(file);
            return project.getLanguageService(/*ensureSynchronized*/ false).getFormattingEditsAfterKeystroke(file, args.position, args.key, options);
        }

        private getFormattingEditsAfterKeystroke(args: protocol.FormatOnKeyRequestArgs): protocol.CodeEdit[] {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = scriptInfo.lineOffsetToPosition(args.line, args.offset);
            const formatOptions = this.projectService.getFormatCodeOptions(file);
            const edits = project.getLanguageService(/*ensureSynchronized*/ false).getFormattingEditsAfterKeystroke(file, position, args.key,
                formatOptions);
            // Check whether we should auto-indent. This will be when
            // the position is on a line containing only whitespace.
            // This should leave the edits returned from
            // getFormattingEditsAfterKeystroke either empty or pertaining
            // only to the previous line.  If all this is true, then
            // add edits necessary to properly indent the current line.
            if ((args.key == "\n") && ((!edits) || (edits.length === 0) || allEditsBeforePos(edits, position))) {
                const lineInfo = scriptInfo.getLineInfo(args.line);
                if (lineInfo && (lineInfo.leaf) && (lineInfo.leaf.text)) {
                    const lineText = lineInfo.leaf.text;
                    if (lineText.search("\\S") < 0) {
                        const preferredIndent = project.getLanguageService(/*ensureSynchronized*/ false).getIndentationAtPosition(file, position, formatOptions);
                        let hasIndent = 0;
                        let i: number, len: number;
                        for (i = 0, len = lineText.length; i < len; i++) {
                            if (lineText.charAt(i) == " ") {
                                hasIndent++;
                            }
                            else if (lineText.charAt(i) == "\t") {
                                hasIndent += formatOptions.tabSize;
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
                                newText: formatting.getIndentationString(preferredIndent, formatOptions)
                            });
                        }
                    }
                }
            }

            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: scriptInfo.positionToLineOffset(edit.span.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getCompletions(args: protocol.CompletionsRequestArgs, simplifiedResult: boolean): protocol.CompletionEntry[] | CompletionInfo {
            const prefix = args.prefix || "";
            const { file, project } = this.getFileAndProject(args);

            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);

            const completions = project.getLanguageService().getCompletionsAtPosition(file, position);
            if (!completions) {
                return undefined;
            }
            if (simplifiedResult) {
                return completions.entries.reduce((result: protocol.CompletionEntry[], entry: ts.CompletionEntry) => {
                    if (completions.isMemberCompletion || (entry.name.toLowerCase().indexOf(prefix.toLowerCase()) === 0)) {
                        result.push(entry);
                    }
                    return result;
                }, []).sort((a, b) => a.name.localeCompare(b.name));
            }
            else {
                return completions;
            }
        }

        private getCompletionEntryDetails(args: protocol.CompletionDetailsRequestArgs): protocol.CompletionEntryDetails[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);

            return args.entryNames.reduce((accum: protocol.CompletionEntryDetails[], entryName: string) => {
                const details = project.getLanguageService().getCompletionEntryDetails(file, position, entryName);
                if (details) {
                    accum.push(details);
                }
                return accum;
            }, []);
        }

        private getCompileOnSaveAffectedFileList(args: protocol.FileRequestArgs) {
            const info = this.projectService.getScriptInfo(args.file);
            let result: string[] = [];
            for (const project of info.containingProjects) {
                result = concatenate(result, project.getCompileOnSaveAffectedFileList(info.fileName));
            }
            return result;
        }

        private emitFile(args: protocol.CompileOnSaveEmitFileRequestArgs) {
            const { file, project } = this.getFileAndProject(args);
            if (!project) {
                throw Errors.NoProject;
            }
            return project.builder.emitFile(file, (path, data, writeByteOrderMark) => this.host.writeFile(path, data, writeByteOrderMark), !!args.forced);
        }

        private getSignatureHelpItems(args: protocol.SignatureHelpRequestArgs, simplifiedResult: boolean): protocol.SignatureHelpItems | SignatureHelpItems {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);
            const helpItems = project.getLanguageService().getSignatureHelpItems(file, position);
            if (!helpItems) {
                return undefined;
            }

            if (simplifiedResult) {
                const span = helpItems.applicableSpan;
                return {
                    items: helpItems.items,
                    applicableSpan: {
                        start: scriptInfo.positionToLineOffset(span.start),
                        end: scriptInfo.positionToLineOffset(span.start + span.length)
                    },
                    selectedItemIndex: helpItems.selectedItemIndex,
                    argumentIndex: helpItems.argumentIndex,
                    argumentCount: helpItems.argumentCount,
                };
            }
            else {
                return helpItems;
            }
        }

        private getDiagnostics(delay: number, fileNames: string[]) {
            const checkList = fileNames.reduce((accum: PendingErrorCheck[], uncheckedFileName: string) => {
                const fileName = toNormalizedPath(uncheckedFileName);
                const project = this.projectService.getDefaultProjectForFile(fileName, /*refreshInferredProjects*/ true);
                if (project) {
                    accum.push({ fileName, project });
                }
                return accum;
            }, []);

            if (checkList.length > 0) {
                this.updateErrorCheck(checkList, this.changeSeq, (n) => n === this.changeSeq, delay);
            }
        }

        private change(args: protocol.ChangeRequestArgs) {
            const { file, project } = this.getFileAndProject(args, /*errorOnMissingProject*/ false);
            if (project) {
                const scriptInfo = project.getScriptInfoForNormalizedPath(file);
                const start = scriptInfo.lineOffsetToPosition(args.line, args.offset);
                const end = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);
                if (start >= 0) {
                    scriptInfo.editContent(start, end, args.insertString);
                    this.changeSeq++;
                }
                this.updateProjectStructure(this.changeSeq, n => n === this.changeSeq);
            }
        }

        private reload(args: protocol.ReloadRequestArgs, reqSeq: number) {
            const file = toNormalizedPath(args.file);
            const project = this.projectService.getDefaultProjectForFile(file, /*refreshInferredProjects*/ true);
            if (project) {
                this.changeSeq++;
                // make sure no changes happen before this one is finished
                if (project.reloadScript(file)) {
                    this.output(undefined, CommandNames.Reload, /*canCompressResponse*/ false, reqSeq);
                }
            }
        }

        private saveToTmp(fileName: string, tempFileName: string) {
            const scriptInfo = this.projectService.getScriptInfo(fileName);
            if (scriptInfo) {
                scriptInfo.saveTo(tempFileName);
            }
        }

        private closeClientFile(fileName: string) {
            if (!fileName) {
                return;
            }
            const file = ts.normalizePath(fileName);
            this.projectService.closeClientFile(file);
        }

        private decorateNavigationBarItem(project: Project, fileName: NormalizedPath, items: ts.NavigationBarItem[]): protocol.NavigationBarItem[] {
            if (!items) {
                return undefined;
            }

            const scriptInfo = project.getScriptInfoForNormalizedPath(fileName);

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers,
                spans: item.spans.map(span => ({
                    start: scriptInfo.positionToLineOffset(span.start),
                    end: scriptInfo.positionToLineOffset(ts.textSpanEnd(span))
                })),
                childItems: this.decorateNavigationBarItem(project, fileName, item.childItems),
                indent: item.indent
            }));
        }

        private getNavigationBarItems(args: protocol.FileRequestArgs, simplifiedResult: boolean): protocol.NavigationBarItem[] | NavigationBarItem[] {
            const { file, project } = this.getFileAndProject(args);
            const items = project.getLanguageService().getNavigationBarItems(file);
            if (!items) {
                return undefined;
            }

            return simplifiedResult
                ? this.decorateNavigationBarItem(project, file, items)
                : items;
        }

        private getNavigateToItems(args: protocol.NavtoRequestArgs, simplifiedResult: boolean): protocol.NavtoItem[] | NavigateToItem[] {
            const projects = this.getProjects(args);

            if (simplifiedResult) {
                return combineProjectOutput(
                    projects,
                    project => {
                        const navItems = project.getLanguageService().getNavigateToItems(args.searchValue, args.maxResultCount);
                        if (!navItems) {
                            return [];
                        }

                        return navItems.map((navItem) => {
                            const scriptInfo = project.getScriptInfo(navItem.fileName);
                            const start = scriptInfo.positionToLineOffset(navItem.textSpan.start);
                            const end = scriptInfo.positionToLineOffset(ts.textSpanEnd(navItem.textSpan));
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
            }
            else {
                return combineProjectOutput(
                    projects,
                    project => project.getLanguageService().getNavigateToItems(args.searchValue, args.maxResultCount),
                    /*comparer*/ undefined,
                    navigateToItemIsEqualTo);
            }

            function navigateToItemIsEqualTo(a: NavigateToItem, b: NavigateToItem): boolean {
                if (a === b) {
                    return true;
                }
                if (!a || !b) {
                    return false;
                }
                return a.containerKind === b.containerKind &&
                    a.containerName === b.containerName &&
                    a.fileName === b.fileName &&
                    a.isCaseSensitive === b.isCaseSensitive &&
                    a.kind === b.kind &&
                    a.kindModifiers === b.containerName &&
                    a.matchKind === b.matchKind &&
                    a.name === b.name &&
                    a.textSpan.start === b.textSpan.start &&
                    a.textSpan.length === b.textSpan.length;
            }

            function areNavToItemsForTheSameLocation(a: protocol.NavtoItem, b: protocol.NavtoItem) {
                if (a && b) {
                    return a.file === b.file &&
                        a.start === b.start &&
                        a.end === b.end;
                }
                return false;
            }
        }

        private getBraceMatching(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.TextSpan[] | TextSpan[] {
            const { file, project } = this.getFileAndProjectWithoutRefreshingInferredProjects(args);

            const scriptInfo = project.getScriptInfoForNormalizedPath(file);
            const position = this.getPosition(args, scriptInfo);

            const spans = project.getLanguageService(/*ensureSynchronized*/ false).getBraceMatchingAtPosition(file, position);
            if (!spans) {
                return undefined;
            }
            if (simplifiedResult) {

                return spans.map(span => ({
                    start: scriptInfo.positionToLineOffset(span.start),
                    end: scriptInfo.positionToLineOffset(span.start + span.length)
                }));
            }
            else {
                return spans;
            }
        }

        getDiagnosticsForProject(delay: number, fileName: string) {
            const { fileNames, languageServiceDisabled } = this.getProjectInfoWorker(fileName, /*projectFileName*/ undefined, /*needFileNameList*/ true);
            if (languageServiceDisabled) {
                return;
            }

            // No need to analyze lib.d.ts
            let fileNamesInProject = fileNames.filter((value, index, array) => value.indexOf("lib.d.ts") < 0);

            // Sort the file name list to make the recently touched files come first
            const highPriorityFiles: NormalizedPath[] = [];
            const mediumPriorityFiles: NormalizedPath[] = [];
            const lowPriorityFiles: NormalizedPath[] = [];
            const veryLowPriorityFiles: NormalizedPath[] = [];
            const normalizedFileName = toNormalizedPath(fileName);
            const project = this.projectService.getDefaultProjectForFile(normalizedFileName, /*refreshInferredProjects*/ true);
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
                const checkList = fileNamesInProject.map(fileName => ({ fileName, project }));
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

        private notRequired() {
            return { responseRequired: false };
        }

        private requiredResponse(response: any) {
            return { response, responseRequired: true };
        }

        private handlers: Map<(request: protocol.Request) => { response?: any, responseRequired?: boolean }> = {
            [CommandNames.OpenExternalProject]: (request: protocol.OpenExternalProjectRequest) => {
                this.projectService.openExternalProject(request.arguments);
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.OpenExternalProjects]: (request: protocol.OpenExternalProjectsRequest) => {
                for (const proj of request.arguments.projects) {
                    this.projectService.openExternalProject(proj);
                }
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.CloseExternalProject]: (request: protocol.CloseExternalProjectRequest) => {
                this.projectService.closeExternalProject(request.arguments.projectFileName);
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.SynchronizeProjectList]: (request: protocol.SynchronizeProjectListRequest) => {
                const result = this.projectService.synchronizeProjectList(request.arguments.knownProjects);
                return this.requiredResponse(result);
            },
            [CommandNames.ApplyChangedToOpenFiles]: (request: protocol.ApplyChangedToOpenFilesRequest) => {
                this.projectService.applyChangesInOpenFiles(request.arguments.openFiles, request.arguments.changedFiles, request.arguments.closedFiles);
                this.changeSeq++;
                // TODO: report errors
                return this.requiredResponse(true);
            },
            [CommandNames.Exit]: () => {
                this.exit();
                return this.notRequired();
            },
            [CommandNames.Definition]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.DefinitionFull]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.TypeDefinition]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getTypeDefinition(request.arguments));
            },
            [CommandNames.References]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.ReferencesFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Rename]: (request: protocol.Request) => {
                return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.RenameLocationsFull]: (request: protocol.RenameRequest) => {
                return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.RenameInfoFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getRenameInfo(request.arguments));
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
                this.openClientFile(toNormalizedPath(openArgs.file), openArgs.fileContent, scriptKind);
                return this.notRequired();
            },
            [CommandNames.Quickinfo]: (request: protocol.QuickInfoRequest) => {
                return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.QuickinfoFull]: (request: protocol.QuickInfoRequest) => {
                return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.OutliningSpans]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getOutliningSpans(request.arguments));
            },
            [CommandNames.TodoComments]: (request: protocol.TodoCommentRequest) => {
                return this.requiredResponse(this.getTodoComments(request.arguments));
            },
            [CommandNames.Indentation]: (request: protocol.IndentationRequest) => {
                return this.requiredResponse(this.getIndentation(request.arguments));
            },
            [CommandNames.NameOrDottedNameSpan]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getNameOrDottedNameSpan(request.arguments));
            },
            [CommandNames.BreakpointStatement]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBreakpointStatement(request.arguments));
            },
            [CommandNames.BraceCompletion]: (request: protocol.BraceCompletionRequest) => {
                return this.requiredResponse(this.isValidBraceCompletion(request.arguments));
            },
            [CommandNames.DocCommentTemplate]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getDocCommentTemplate(request.arguments));
            },
            [CommandNames.Format]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForRange(request.arguments));
            },
            [CommandNames.Formatonkey]: (request: protocol.FormatOnKeyRequest) => {
                return this.requiredResponse(this.getFormattingEditsAfterKeystroke(request.arguments));
            },
            [CommandNames.FormatFull]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForDocumentFull(request.arguments));
            },
            [CommandNames.FormatonkeyFull]: (request: protocol.FormatOnKeyRequest) => {
                return this.requiredResponse(this.getFormattingEditsAfterKeystrokeFull(request.arguments));
            },
            [CommandNames.FormatRangeFull]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForRangeFull(request.arguments));
            },
            [CommandNames.Completions]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletions(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.CompletionsFull]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletions(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.CompletionDetails]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletionEntryDetails(request.arguments));
            },
            [CommandNames.CompileOnSaveAffectedFileList]: (request: protocol.CompileOnSaveAffectedFileListRequest) => {
                return this.requiredResponse(this.getCompileOnSaveAffectedFileList(request.arguments));
            },
            [CommandNames.CompileOnSaveEmitFile]: (request: protocol.CompileOnSaveEmitFileRequest) => {
                return this.requiredResponse(this.emitFile(request.arguments));
            },
            [CommandNames.SignatureHelp]: (request: protocol.SignatureHelpRequest) => {
                return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.SignatureHelpFull]: (request: protocol.SignatureHelpRequest) => {
                return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.CompilerOptionsDiagnosticsFull]: (request: protocol.ProjectRequest) => {
                return this.requiredResponse(this.getCompilerOptionsDiagnostics(request.arguments));
            },
            [CommandNames.EncodedSemanticClassificationsFull]: (request: protocol.FileSpanRequest) => {
                return this.requiredResponse(this.getEncodedSemanticClassifications(request.arguments));
            },
            [CommandNames.Cleanup]: (request: protocol.Request) => {
                this.cleanup();
                return this.requiredResponse(true);
            },
            [CommandNames.SemanticDiagnosticsSync]: (request: protocol.SemanticDiagnosticsSyncRequest) => {
                return this.requiredResponse(this.getSemanticDiagnosticsSync(request.arguments));
            },
            [CommandNames.SyntacticDiagnosticsSync]: (request: protocol.SyntacticDiagnosticsSyncRequest) => {
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
            [CommandNames.Change]: (request: protocol.ChangeRequest) => {
                this.change(request.arguments);
                return this.notRequired();
            },
            [CommandNames.Configure]: (request: protocol.ConfigureRequest) => {
                this.projectService.setHostConfiguration(request.arguments);
                this.output(undefined, CommandNames.Configure, /*canCompressResponse*/ false, request.seq);
                return this.notRequired();
            },
            [CommandNames.Reload]: (request: protocol.ReloadRequest) => {
                this.reload(request.arguments, request.seq);
                return this.requiredResponse({ reloadFinished: true });
            },
            [CommandNames.Saveto]: (request: protocol.Request) => {
                const savetoArgs = <protocol.SavetoRequestArgs>request.arguments;
                this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
                return this.notRequired();
            },
            [CommandNames.Close]: (request: protocol.Request) => {
                const closeArgs = <protocol.FileRequestArgs>request.arguments;
                this.closeClientFile(closeArgs.file);
                return this.notRequired();
            },
            [CommandNames.Navto]: (request: protocol.NavtoRequest) => {
                return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.NavtoFull]: (request: protocol.NavtoRequest) => {
                return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Brace]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.BraceFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.NavBar]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.NavBarFull]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Occurrences]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getOccurrences(request.arguments));
            },
            [CommandNames.DocumentHighlights]: (request: protocol.DocumentHighlightsRequest) => {
                return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.DocumentHighlightsFull]: (request: protocol.DocumentHighlightsRequest) => {
                return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.CompilerOptionsForInferredProjects]: (request: protocol.SetCompilerOptionsForInferredProjectsRequest) => {
                return this.requiredResponse(this.setCompilerOptionsForInferredProjects(request.arguments));
            },
            [CommandNames.ProjectInfo]: (request: protocol.ProjectInfoRequest) => {
                return this.requiredResponse(this.getProjectInfo(request.arguments));
            },
            [CommandNames.ReloadProjects]: (request: protocol.ReloadProjectsRequest) => {
                this.projectService.reloadProjects();
                return this.notRequired();
            }
        };
        public addProtocolHandler(command: string, handler: (request: protocol.Request) => { response?: any, responseRequired: boolean }) {
            if (this.handlers[command]) {
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
                this.logger.msg(`Unrecognized JSON command: ${JSON.stringify(request)}`, Msg.Err);
                this.output(undefined, CommandNames.Unknown, /*canCompressResponse*/ false, request.seq, `Unrecognized JSON command: ${request.command}`);
                return { responseRequired: false };
            }
        }

        public onMessage(message: string) {
            let start: number[];
            if (this.logger.hasLevel(LogLevel.requestTime)) {
                start = this.hrtime();
                if (this.logger.hasLevel(LogLevel.verbose)) {
                    this.logger.info(`request: ${message}`);
                }
            }

            let request: protocol.Request;
            try {
                request = <protocol.Request>JSON.parse(message);
                const {response, responseRequired} = this.executeCommand(request);

                if (this.logger.hasLevel(LogLevel.requestTime)) {
                    const elapsedTime = hrTimeToMilliseconds(this.hrtime(start)).toFixed(4);
                    if (responseRequired) {
                        this.logger.perftrc(`${request.seq}::${request.command}: elapsed time (in milliseconds) ${elapsedTime}`);
                    }
                    else {
                        this.logger.perftrc(`${request.seq}::${request.command}: async elapsed time (in milliseconds) ${elapsedTime}`);
                    }
                }

                if (response) {
                    this.output(response, request.command, request.canCompressResponse, request.seq);
                }
                else if (responseRequired) {
                    this.output(undefined, request.command, /*canCompressResponse*/ false, request.seq, "No content available.");
                }
            }
            catch (err) {
                if (err instanceof OperationCanceledException) {
                    // Handle cancellation exceptions
                    this.output({ canceled: true }, request.command, /*canCompressResponse*/ false, request.seq);
                    return;
                }
                this.logError(err, message);
                this.output(
                    undefined,
                    request ? request.command : CommandNames.Unknown,
                    /*canCompressResponse*/ false,
                    request ? request.seq : 0,
                    "Error processing request. " + (<StackTraceError>err).message + "\n" + (<StackTraceError>err).stack);
            }
        }
    }
}
